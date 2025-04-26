import { Resend } from 'resend';
import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const resend = new Resend(process.env.RESEND_API); // Ensure you have the correct API key

// Set up jsdom for server-side DOMPurify
const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

export async function POST(req: Request) {
  const body = await req.json();

  // Sanitize user input using DOMPurify
  const name = DOMPurify.sanitize(body.name);
  const email = DOMPurify.sanitize(body.email);
  const message = DOMPurify.sanitize(body.message);

  try {
    // Send the email using Resend API
    await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: 'mdmainjilani313@gmail.com', // Update with your email address
      subject: `New Contact Message from ${name}`,
      replyTo: email,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    // Return success response
    return new Response(JSON.stringify({ status: 'ok' }), { status: 200 });
  } catch (error) {
    console.error('Email failed to send:', error);
    return new Response(JSON.stringify({ error: 'Failed to send email' }), { status: 500 });
  }
}
