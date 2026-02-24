import { NextResponse } from "next/server";

interface ContactPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
  website?: string; // honeypot
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;

    // Honeypot check - if filled, it's a bot
    if (body.website) {
      return NextResponse.json({ success: true }); // silently succeed for bots
    }

    // Basic validation
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // TODO: Integrate with email service (Resend, Nodemailer, etc.)
    // For now, log the contact submission
    console.log("Contact form submission:", {
      name: body.name,
      email: body.email,
      subject: body.subject || "(no subject)",
      message: body.message,
      timestamp: new Date().toISOString(),
    });

    // When ready to send emails, install Resend and add:
    // import { Resend } from 'resend';
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'contact@yourdomain.com',
    //   to: process.env.CONTACT_EMAIL!,
    //   subject: `New contact: ${body.subject || body.name}`,
    //   text: `Name: ${body.name}\nEmail: ${body.email}\n\n${body.message}`,
    // });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
