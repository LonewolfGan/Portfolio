import express from 'express';
import { Resend } from 'resend';
import 'dotenv/config';

const app = express();

// ── Security: Limit payload size to prevent DoS ──
app.use(express.json({ limit: '10kb' }));

// ── Security: CORS configuration ──
const ALLOWED_ORIGINS = [
  'https://hdev.is-a.dev',
  'http://localhost:5173',
  'http://localhost:3000',
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Max-Age', '86400');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  next();
});

// ── Security: Basic rate limiting (in-memory) ──
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 5; // 5 requests per window

function rateLimit(req: express.Request, res: express.Response, next: express.NextFunction) {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return next();
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }

  entry.count++;
  next();
}

// ── Security: HTML sanitizer to prevent XSS in email templates ──
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const PORT = 3001;

app.post('/api/contact', rateLimit, async (req, res) => {
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

  // ── Security: Stricter email validation ──
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

  // ── Security: Sanitize all user inputs before interpolation ──
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
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`API server running on port ${PORT}`);
});
