import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/schemas/contact";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          fieldErrors: parsed.error.flatten().fieldErrors,
        },
        { status: 422 }
      );
    }

    const data = parsed.data;

    if (data.website) {
      // Honeypot triggered — silently succeed for bots.
      return NextResponse.json({ success: true });
    }

    console.log("Contact form submission:", {
      name: data.name,
      email: data.email,
      subject: data.subject || "(no subject)",
      message: data.message,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
