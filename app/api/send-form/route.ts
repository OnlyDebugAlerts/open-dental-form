import { NextResponse } from 'next/server';
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);
// import * as fs from 'fs/promises';

export async function POST(request: Request) {
  try {
    const { pdfBlob, fullName } = await request.json();
    console.log(`${fullName}-${new Date().toISOString().split('T')[0]}.pdf`);

    // fs.writeFile(`./public/${fullName}-${new Date().toISOString().split('T')[0]}.pdf`, Buffer.from(pdfBlob, 'base64'));
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: "openko.dental@gmail.com",
      subject: 'Medical Form Submission',
      text: 'Please find your medical form attached.',
      attachments: [
        {
          filename: `${fullName}-${new Date().toISOString().split('T')[0]}.pdf`,
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