import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET a project
export async function GET(req: NextRequest) {
  const { searchParams, pathname } = new URL(req.url);
  const id = pathname.split('/').pop(); // Get the [id] from the URL
  const numericId = parseInt(id ?? '');

  if (isNaN(numericId)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  try {
    const project = await prisma.projects.findUnique({ where: { id: numericId } });
    if (!project) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching project' }, { status: 500 });
  }
}

// PUT to update a project
export async function PUT(req: NextRequest) {
  const { pathname } = new URL(req.url);
  const id = pathname.split('/').pop();
  const numericId = parseInt(id ?? '');

  if (isNaN(numericId)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  try {
    const body = await req.json();
    const updated = await prisma.projects.update({
      where: { id: numericId },
      data: {
        title: body.title,
        description: body.description,
        image: body.image,
        skills: body.skills,
        link: body.link,
      },
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}

// DELETE a project
export async function DELETE(req: NextRequest) {
  const { pathname } = new URL(req.url);
  const id = pathname.split('/').pop();
  const numericId = parseInt(id ?? '');

  if (isNaN(numericId)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  try {
    await prisma.projects.delete({ where: { id: numericId } });
    return NextResponse.json({ message: 'Project deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}
