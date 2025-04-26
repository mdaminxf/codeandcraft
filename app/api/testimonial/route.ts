import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const testimonial = await prisma.testimonial.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return NextResponse.json(testimonial)
}
