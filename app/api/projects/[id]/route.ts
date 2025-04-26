import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET a project
export async function GET(req: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;
  const numericId = parseInt(id);
  if (isNaN(numericId)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
try{
    const project = await prisma.projects.findUnique({ where: { id: numericId } });
    if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching project' }, { status: 500 });
  }
}

// PUT to update a project
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  if (isNaN(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  try {
    const body = await req.json();
    const updated = await prisma.projects.update({
      where: { id },
      data: {
        title: body.title,
        description: body.description,
        image: body.image,
        skills: body.skills,
        link: body.link
      },
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}

// DELETE a project
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  if (isNaN(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  try {
    await prisma.projects.delete({ where: { id } });
    return NextResponse.json({ message: 'Project deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}
