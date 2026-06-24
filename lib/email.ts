import nodemailer from 'nodemailer';

// ─── Transporter (singleton) ─────────────────────────────────────────────────
// Created once, reused across all API route invocations in the same process.

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST!,
  port: Number(process.env.SMTP_PORT ?? 587),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER!,
    pass: process.env.SMTP_PASS!,
  },
});

// ─── Types ────────────────────────────────────────────────────────────────────

export interface LeadPayload {
  name: string;
  phone: string;
  email?: string;
  interest: string; // instrument or topic
  course?: string; // pre-filled on course pages
  intent?: string; // 'trial' | 'event' | 'general' | 'first-visit'
  source: string; // which CTA triggered this
  timestamp: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export interface NewsletterPayload {
  email: string;
}

// ─── Lead email ───────────────────────────────────────────────────────────────

export async function sendLeadEmail(data: LeadPayload) {
  const subject = data.course
    ? `🎵 New Registration Interest — ${data.course}`
    : `🎵 New Lead — ${data.interest} (${data.source})`;

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#ef4444;padding:24px 32px;border-radius:12px 12px 0 0">
        <h1 style="color:#fff;margin:0;font-size:20px">New Lead — MusicChamps</h1>
        <p style="color:#fecaca;margin:4px 0 0;font-size:13px">${data.timestamp}</p>
      </div>
      <div style="border:2px solid #fee2e2;border-top:none;padding:24px 32px;border-radius:0 0 12px 12px">
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;width:120px">Name</td>
              <td style="padding:8px 0;font-weight:600;color:#111">${data.name}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;font-size:13px">Phone</td>
              <td style="padding:8px 0;font-weight:600;color:#111">
                <a href="tel:${data.phone}" style="color:#ef4444">${data.phone}</a>
                &nbsp;·&nbsp;
                <a href="https://wa.me/${data.phone.replace(/\D/g, '')}" style="color:#25d366">WhatsApp</a>
              </td></tr>
          ${
            data.email
              ? `<tr><td style="padding:8px 0;color:#6b7280;font-size:13px">Email</td>
              <td style="padding:8px 0;font-weight:600;color:#111"><a href="mailto:${data.email}" style="color:#ef4444">${data.email}</a></td></tr>`
              : ''
          }
          <tr><td style="padding:8px 0;color:#6b7280;font-size:13px">Interest</td>
              <td style="padding:8px 0;font-weight:600;color:#111">${data.interest}</td></tr>
          ${
            data.course
              ? `<tr><td style="padding:8px 0;color:#6b7280;font-size:13px">Course</td>
              <td style="padding:8px 0;font-weight:600;color:#ef4444">${data.course}</td></tr>`
              : ''
          }
          <tr><td style="padding:8px 0;color:#6b7280;font-size:13px">Intent</td>
              <td style="padding:8px 0;font-weight:600;color:#111">${data.intent ?? 'general'}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;font-size:13px">Source CTA</td>
              <td style="padding:8px 0;font-weight:600;color:#111">${data.source}</td></tr>
        </table>
        <div style="margin-top:20px;padding:16px;background:#fef2f2;border-radius:8px;font-size:13px;color:#6b7280">
          Reply to this email or call the lead directly. Response within 2 hours recommended.
        </div>
      </div>
    </div>
  `;

  return transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: process.env.LEAD_TO_EMAIL,
    subject,
    html,
    // plain text fallback
    text: `New lead\nName: ${data.name}\nPhone: ${data.phone}\nInterest: ${data.interest}${data.course ? `\nCourse: ${data.course}` : ''}\nSource: ${data.source}`,
  });
}

// ─── Contact email ────────────────────────────────────────────────────────────

export async function sendContactEmail(data: ContactPayload) {
  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#111;padding:24px 32px;border-radius:12px 12px 0 0">
        <h1 style="color:#fff;margin:0;font-size:20px">Contact Form — MusicChamps</h1>
      </div>
      <div style="border:2px solid #e5e7eb;border-top:none;padding:24px 32px;border-radius:0 0 12px 12px">
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
        <p><strong>Message:</strong></p>
        <div style="background:#f9fafb;padding:16px;border-radius:8px;white-space:pre-wrap;font-size:14px">${data.message}</div>
      </div>
    </div>
  `;

  return transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: process.env.CONTACT_TO_EMAIL,
    replyTo: data.email,
    subject: `✉️ Contact: ${data.name}`,
    html,
    text: `From: ${data.name} <${data.email}>\n\n${data.message}`,
  });
}

// ─── Newsletter email (internal notification) ─────────────────────────────────

export async function sendNewsletterConfirmation(email: string) {
  // Notify admin of new subscriber
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: process.env.LEAD_TO_EMAIL,
    subject: `📬 New Newsletter Subscriber — ${email}`,
    text: `New newsletter subscriber: ${email}`,
  });

  // Send confirmation to subscriber
  return transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: email,
    subject: '🎵 Welcome to MusicChamps updates!',
    html: `
      <div style="font-family:sans-serif;max-width:500px;margin:0 auto;text-align:center;padding:40px 20px">
        <h1 style="color:#ef4444;font-size:28px">You&apos;re subscribed! 🎶</h1>
        <p style="color:#6b7280">Thanks for joining the MusicChamps community. We&apos;ll keep you updated on new courses, events, and tips.</p>
        <a href="https://musicchamps.com/courses" style="display:inline-block;margin-top:20px;padding:12px 28px;background:#ef4444;color:#fff;border-radius:8px;text-decoration:none;font-weight:600">
          Explore Courses
        </a>
      </div>
    `,
  });
}
