// app/api/subscribe/route.ts
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// Handle GET requests to fetch newsletters
export async function GET() {
  try {
    // Fetch newsletters from the database
    const newsletters = await prisma.newsletter.findMany({
      select: {
        id: true,
        email: true,
        subscribedAt: true,
      },
    });

    // Return the newsletters as JSON
    return NextResponse.json(newsletters);
  } catch (error) {
    console.error("Error fetching newsletters:", error);
    return NextResponse.json({ error: "Failed to fetch newsletters" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

// Handle POST requests to add a new newsletter subscription
export async function POST(request: Request) {
  try {
    const { email } = await request.json(); // Get email from the request body

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Create a new newsletter subscription in the database
    const newNewsletter = await prisma.newsletter.create({
      data: {
        email: email,
      },
    });

    return NextResponse.json(newNewsletter, { status: 201 });
  } catch (error) {
    console.error("Error adding newsletter:", error);
    return NextResponse.json({ error: "Failed to add newsletter" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
