import { PrismaClient } from "@prisma/client";
import { Resend } from "resend";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API);

export async function POST(request: Request) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: "You must be logged in to send newsletters" }, { status: 403 });
  }

  const { subject, content } = await request.json();

  if (!subject || !content) {
    return NextResponse.json({ error: "Subject and content are required" }, { status: 400 });
  }

  try {
    const subscribers = await prisma.newsletter.findMany({
      select: { email: true },
    });

    if (!subscribers.length) {
      return NextResponse.json({ error: "No subscribers found" }, { status: 404 });
    }

    // Prepare email batch
    const emailBatch = subscribers.map((subscriber) => ({
      from: 'Acme <onboarding@resend.dev', // Use your verified Resend sender
      to: [subscriber.email],
      subject,
      html: content,
    }));
    console.log(emailBatch);
    await resend.batch.send(emailBatch);

    return NextResponse.json({ message: "Emails sent to all subscribers." }, { status: 200 });
  } catch (error) {
    console.error("Error sending batch emails:", error);
    return NextResponse.json({ error: "Failed to send emails." }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
