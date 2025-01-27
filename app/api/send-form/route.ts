import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { pdfBlob } = await request.json();

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: "openko.dental@gmail.com",
      subject: 'Medical Form Submission',
      text: 'Please find your medical form attached.',
      attachments: [
        {
          filename: 'medical-form.pdf',
          content: Buffer.from(pdfBlob, 'base64'),
        },
      ],
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
} 