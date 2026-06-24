// app/api/newsletter/route.ts
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Self-contained — no lib/email import needed.
// Uses the same SMTP env vars as /api/lead.

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { email?: string };
    const email = body.email?.trim();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const transporter = createTransporter();
    const from = `"MusicChamps" <${process.env.SMTP_FROM ?? process.env.SMTP_USER}>`;
    const adminTo = process.env.LEAD_NOTIFY_EMAIL ?? process.env.SMTP_USER!;

    await Promise.all([
      // 1. Admin notification
      transporter.sendMail({
        from,
        to: adminTo,
        subject: `📬 New Newsletter Subscriber — MusicChamps`,
        html: `
          <div style="font-family:sans-serif;max-width:480px;margin:0 auto;background:#fff;border-radius:12px;border:1px solid #fee2e2;overflow:hidden;">
            <div style="background:#ef4444;padding:20px 24px;">
              <h2 style="color:#fff;margin:0;font-size:16px;">📬 New Newsletter Subscriber</h2>
            </div>
            <div style="padding:20px 24px;">
              <p style="margin:0;font-size:14px;color:#374151;">
                <strong>Email:</strong>
                <a href="mailto:${email}" style="color:#ef4444;">${email}</a>
              </p>
              <p style="margin:8px 0 0;font-size:12px;color:#9ca3af;">
                ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
              </p>
            </div>
          </div>`,
      }),
      // 2. Subscriber confirmation
      transporter.sendMail({
        from,
        to: email,
        subject: `You're subscribed to MusicChamps! 🎵`,
        html: `
          <div style="font-family:sans-serif;max-width:520px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #f3f4f6;">
            <div style="background:#ef4444;padding:28px;text-align:center;">
              <h1 style="color:#fff;margin:0;font-size:22px;font-weight:900;">🎵 MusicChamps</h1>
            </div>
            <div style="padding:28px;">
              <h2 style="margin:0 0 12px;font-size:18px;color:#111827;">You&apos;re all set! 🎉</h2>
              <p style="color:#374151;font-size:14px;line-height:1.6;margin:0 0 16px;">
                Thank you for subscribing to the MusicChamps newsletter. You&apos;ll receive the latest music tips, course updates, and insights from our expert instructors.
              </p>
              <div style="background:#fef2f2;border-radius:12px;padding:16px 20px;margin-bottom:20px;">
                <p style="margin:0;font-size:13px;color:#b91c1c;font-weight:700;">What to expect:</p>
                <ul style="margin:8px 0 0;padding-left:20px;color:#374151;font-size:13px;line-height:1.8;">
                  <li>Music practice tips and techniques</li>
                  <li>New course announcements</li>
                  <li>Student success stories</li>
                  <li>Upcoming events and workshops</li>
                </ul>
              </div>
              <p style="color:#6b7280;font-size:12px;margin:0;">
                To unsubscribe, simply reply to any email with &quot;unsubscribe&quot; in the subject line.
              </p>
            </div>
          </div>`,
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[/api/newsletter]', err);
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    );
  }
}
