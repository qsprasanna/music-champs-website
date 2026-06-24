// app/api/lead/route.ts
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import type { LeadPayload } from '@/lib/leads/types';

// ─── Transporter ─────────────────────────────────────────────────────────────
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

const ACTION_LABEL: Record<string, string> = {
  demo: 'Book a Demo',
  trial: 'Book a Trial Class',
  register: 'Course Registration',
  event: 'Event Registration',
  welcome: 'Interest Form (First Visit)',
};

function adminEmail(data: LeadPayload): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>New Lead — MusicChamps</title></head>
<body style="font-family:sans-serif;background:#f9fafb;margin:0;padding:24px;">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #f3f4f6;">
    <div style="background:#ef4444;padding:24px 28px;">
      <h1 style="color:#fff;margin:0;font-size:20px;font-weight:900;">🎵 New Lead — MusicChamps</h1>
      <p style="color:#fecaca;margin:6px 0 0;font-size:13px;">${ACTION_LABEL[data.action] ?? data.action}</p>
    </div>
    <div style="padding:24px 28px;">
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr><td style="padding:8px 0;color:#6b7280;width:120px;">Name</td><td style="padding:8px 0;font-weight:700;color:#111827;">${data.name}</td></tr>
        <tr><td style="padding:8px 0;color:#6b7280;">Email</td><td style="padding:8px 0;font-weight:700;color:#111827;"><a href="mailto:${data.email}" style="color:#ef4444;">${data.email}</a></td></tr>
        <tr><td style="padding:8px 0;color:#6b7280;">Phone</td><td style="padding:8px 0;font-weight:700;color:#111827;"><a href="tel:${data.phone}" style="color:#ef4444;">${data.phone}</a></td></tr>
        <tr><td style="padding:8px 0;color:#6b7280;">Interest</td><td style="padding:8px 0;font-weight:700;color:#111827;">${data.interest}</td></tr>
        ${data.courseSlug ? `<tr><td style="padding:8px 0;color:#6b7280;">Course</td><td style="padding:8px 0;font-weight:700;color:#111827;">${data.courseSlug}</td></tr>` : ''}
        ${data.message ? `<tr><td style="padding:8px 0;color:#6b7280;">Message</td><td style="padding:8px 0;color:#374151;">${data.message}</td></tr>` : ''}
        <tr><td style="padding:8px 0;color:#6b7280;">Source</td><td style="padding:8px 0;color:#374151;">${data.source}</td></tr>
        <tr><td style="padding:8px 0;color:#6b7280;">Time</td><td style="padding:8px 0;color:#374151;">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</td></tr>
      </table>
      <div style="margin-top:20px;">
        <a href="mailto:${data.email}" style="display:inline-block;background:#ef4444;color:#fff;padding:10px 20px;border-radius:8px;font-weight:700;font-size:13px;text-decoration:none;">Reply to ${data.name}</a>
      </div>
    </div>
  </div>
</body>
</html>`;
}

function userEmail(data: LeadPayload): string {
  const isRegister = data.action === 'register' || data.action === 'event';
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>We received your request — MusicChamps</title></head>
<body style="font-family:sans-serif;background:#f9fafb;margin:0;padding:24px;">
  <div style="max-width:540px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #f3f4f6;">
    <div style="background:#ef4444;padding:28px;text-align:center;">
      <h1 style="color:#fff;margin:0;font-size:22px;font-weight:900;">🎵 MusicChamps</h1>
    </div>
    <div style="padding:28px;">
      <h2 style="margin:0 0 12px;font-size:18px;color:#111827;">Hi ${data.name}! 👋</h2>
      <p style="color:#374151;font-size:14px;line-height:1.6;margin:0 0 16px;">
        Thank you for ${isRegister ? 'registering your interest in' : 'reaching out to'} MusicChamps.
        ${data.interest !== 'General' ? `We noted your interest in <strong>${data.interest}</strong>.` : ''}
      </p>
      <p style="color:#374151;font-size:14px;line-height:1.6;margin:0 0 20px;">
        Our team will contact you within <strong>24 hours</strong> to discuss your musical journey and schedule your ${isRegister ? 'session' : 'trial class'}.
      </p>
      <div style="background:#fef2f2;border-radius:12px;padding:16px 20px;margin-bottom:20px;">
        <p style="margin:0;font-size:13px;color:#b91c1c;font-weight:700;">What happens next?</p>
        <ol style="margin:8px 0 0;padding-left:20px;color:#374151;font-size:13px;line-height:1.8;">
          <li>Our team reviews your request</li>
          <li>We call you to understand your goals</li>
          <li>Schedule your free trial class</li>
          <li>Start your musical journey!</li>
        </ol>
      </div>
      <p style="color:#6b7280;font-size:12px;margin:0;">
        Questions? Reply to this email or reach us at
        <a href="mailto:contact@musicchamps.com" style="color:#ef4444;">contact@musicchamps.com</a>
      </p>
    </div>
  </div>
</body>
</html>`;
}

function validate(body: unknown): body is LeadPayload {
  if (!body || typeof body !== 'object') return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.name === 'string' &&
    b.name.trim().length >= 2 &&
    typeof b.email === 'string' &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email) &&
    typeof b.phone === 'string' &&
    b.phone.trim().length >= 7 &&
    typeof b.interest === 'string' &&
    typeof b.action === 'string' &&
    typeof b.source === 'string'
  );
}

// ✅ Single POST export — the duplicate newsletter POST was removed
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!validate(body)) {
      return NextResponse.json({ error: 'Invalid form data' }, { status: 400 });
    }

    const transporter = createTransporter();
    const adminTo = process.env.LEAD_NOTIFY_EMAIL ?? process.env.SMTP_USER!;
    const from = `"MusicChamps" <${process.env.SMTP_FROM ?? process.env.SMTP_USER}>`;

    await Promise.all([
      transporter.sendMail({
        from,
        to: adminTo,
        subject: `🎵 New Lead: ${body.name} — ${ACTION_LABEL[body.action] ?? body.action}`,
        html: adminEmail(body),
      }),
      transporter.sendMail({
        from,
        to: body.email,
        subject: `We received your request — MusicChamps 🎵`,
        html: userEmail(body),
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[/api/lead]', err);
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }
}
