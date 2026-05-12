import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

// ── Security: HTML sanitizer to prevent XSS in email templates ──
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ── Security: Basic rate limiting (in-memory for serverless) ──
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }

  entry.count++;
  return true;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // ── Security: CORS ──
  const allowedOrigins = ['https://hdev.is-a.dev'];
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // ── Security: Rate limiting ──
  const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || 'unknown';
  if (!checkRateLimit(clientIp)) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }

  const { name, email, message } = req.body;

  // ── Security: Validate presence ──
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  // ── Security: Validate types ──
  if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
    return res.status(400).json({ error: 'Invalid input types.' });
  }

  // ── Security: Validate input lengths ──
  if (name.length > 100) {
    return res.status(400).json({ error: 'Name must be under 100 characters.' });
  }
  if (email.length > 254) {
    return res.status(400).json({ error: 'Email must be under 254 characters.' });
  }
  if (message.length > 5000) {
    return res.status(400).json({ error: 'Message must be under 5000 characters.' });
  }

  // ── Security: Stricter email validation (RFC 5322 subset) ──
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY is not set');
    return res.status(500).json({ error: 'Email service is not configured.' });
  }

  const resend = new Resend(apiKey);

  // ── Security: Sanitize all user inputs before HTML interpolation ──
  const safeName = escapeHtml(name.trim());
  const safeEmail = escapeHtml(email.trim());
  const safeMessage = escapeHtml(message.trim());

  try {
    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'atlaslonewolf00@gmail.com',
      replyTo: email.trim(),
      subject: `New message from ${safeName} — TCHOHLO K. Honore Portfolio`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f9fafb; border-radius: 12px;">
          <h2 style="color: #111; margin-bottom: 4px;">New Contact Message</h2>
          <p style="color: #6b7280; font-size: 14px; margin-top: 0;">From your portfolio contact form</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
          <p style="margin: 0 0 8px;"><strong>Name:</strong> ${safeName}</p>
          <p style="margin: 0 0 8px;"><strong>Email:</strong> <a href="mailto:${safeEmail}" style="color: #2d7a3a;">${safeEmail}</a></p>
          <p style="margin: 0 0 8px;"><strong>Message:</strong></p>
          <p style="background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; white-space: pre-wrap; color: #374151;">${safeMessage}</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
          <p style="color: #9ca3af; font-size: 12px; text-align: center;">hdev.is-a.dev</p>
        </div>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Resend error:', err);
    return res.status(500).json({ error: 'Failed to send message. Please try again.' });
  }
}
