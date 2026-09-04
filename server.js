import 'dotenv/config';
import express from 'express';
import nodemailer from 'nodemailer';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 10000;
const DIST_DIR = path.join(__dirname, 'dist');

// ──────────────────────────────────────────────
// Brevo SMTP Configuration (via environment variables)
//
// Set these in Render Dashboard → Environment:
//   BREVO_SMTP_LOGIN  = your Brevo account email
//   BREVO_SMTP_KEY    = your Brevo SMTP key
//   SENDER_EMAIL      = e.g. noreply@nexushumanrightscoi.com
//   RECEIVER_EMAIL    = your client's Gmail address
const app = express();

// Parse JSON request bodies
app.use(express.json());

// Rate limit the inquiry endpoint: max 5 submissions per 15 minutes per IP
const inquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Too many submissions. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// ─── API: Submit Inquiry ─────────────────────
app.post('/api/inquiry', inquiryLimiter, async (req, res) => {
  try {
    const { name, phone, email, type, state, message } = req.body;

    // Validate required fields
    if (!name || !phone || !message) {
      return res.status(400).json({ error: 'Name, phone, and message are required.' });
    }

    const smtpLogin = process.env.BREVO_SMTP_LOGIN?.trim();
    const smtpKey = process.env.BREVO_SMTP_KEY?.trim();
    const senderEmail = (process.env.SENDER_EMAIL || 'noreply@nexushumanrightscoi.com').trim();
    const receiverEmail = process.env.RECEIVER_EMAIL?.trim();

    console.log('📨 Sending inquiry email...', {
      hasLogin: !!smtpLogin,
      hasKey: !!smtpKey,
      sender: senderEmail,
      receiver: receiverEmail || 'MISSING'
    });

    if (!smtpLogin || !smtpKey) {
      const msg = 'BREVO_SMTP_LOGIN or BREVO_SMTP_KEY is missing in server environment variables. Please check GitHub Secrets.';
      console.error(`❌ ${msg}`);
      return res.status(500).json({ error: 'Email service configuration error.', details: msg });
    }

    if (!receiverEmail) {
      const msg = 'RECEIVER_EMAIL is missing in server environment variables. Please check GitHub Secrets.';
      console.error(`❌ ${msg}`);
      return res.status(500).json({ error: 'Email service configuration error.', details: msg });
    }

    // Configure Nodemailer for Brevo SMTP relay
    const transporter = nodemailer.createTransport({
      host: 'smtp-relay.brevo.com',
      port: 587,
      secure: false, // port 587 uses STARTTLS
      auth: {
        user: smtpLogin,
        pass: smtpKey,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Generate docket reference
    const docketRef = `NHRCI-2026-${(Math.random() * 90000 + 10000).toFixed(0)}`;
    const submittedAt = new Date().toLocaleString('en-IN', {
      dateStyle: 'full',
      timeStyle: 'short',
      timeZone: 'Asia/Kolkata',
    });

    // Build professional HTML email
    const htmlBody = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
        <!-- Header -->
        <div style="background: #1c3e70; padding: 24px 32px; border-radius: 8px 8px 0 0;">
          <h1 style="color: #ffffff; margin: 0; font-size: 20px;">Nexus Human Rights Council of India</h1>
          <p style="color: #e49728; margin: 4px 0 0; font-size: 13px; letter-spacing: 1px;">NEW INQUIRY NOTIFICATION</p>
        </div>

        <!-- Body -->
        <div style="padding: 28px 32px; border: 1px solid #e2e8f0; border-top: none;">
          <p style="color: #4a5568; font-size: 14px; margin: 0 0 20px;">
            A new <strong style="color: #ac3300;">${type || 'General'}</strong> inquiry has been submitted from the website.
          </p>

          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr style="border-bottom: 1px solid #edf2f7;">
              <td style="padding: 12px 0; color: #718096; width: 140px; vertical-align: top;">Docket Ref</td>
              <td style="padding: 12px 0; color: #1c3e70; font-weight: 700;">${docketRef}</td>
            </tr>
            <tr style="border-bottom: 1px solid #edf2f7;">
              <td style="padding: 12px 0; color: #718096; vertical-align: top;">Full Name</td>
              <td style="padding: 12px 0; color: #1a202c; font-weight: 600;">${name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #edf2f7;">
              <td style="padding: 12px 0; color: #718096; vertical-align: top;">Phone</td>
              <td style="padding: 12px 0; color: #1a202c;">${phone}</td>
            </tr>
            <tr style="border-bottom: 1px solid #edf2f7;">
              <td style="padding: 12px 0; color: #718096; vertical-align: top;">Email</td>
              <td style="padding: 12px 0; color: #1a202c;">${email || 'Not provided'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #edf2f7;">
              <td style="padding: 12px 0; color: #718096; vertical-align: top;">Category</td>
              <td style="padding: 12px 0; color: #1a202c;">${type}</td>
            </tr>
            <tr style="border-bottom: 1px solid #edf2f7;">
              <td style="padding: 12px 0; color: #718096; vertical-align: top;">State / Region</td>
              <td style="padding: 12px 0; color: #1a202c;">${state}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #718096; vertical-align: top;">Message</td>
              <td style="padding: 12px 0; color: #1a202c; line-height: 1.6; white-space: pre-wrap;">${message}</td>
            </tr>
          </table>
        </div>

        <!-- Footer -->
        <div style="background: #f7fafc; padding: 16px 32px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
          <p style="color: #a0aec0; font-size: 12px; margin: 0;">
            Submitted at ${submittedAt} · Nexus Human Rights Council of India · nexushumanrightscoi.com
          </p>
        </div>
      </div>
    `;

    // Format category nicely for subject line
    const cleanCategory = type.replace(/\s*Inquiry\s*$/i, '');
    const subjectLine = `New ${cleanCategory} Inquiry — ${name} [${docketRef}]`;

    // Send the email via Brevo SMTP
    await transporter.sendMail({
      from: `"Nexus Human Rights" <${senderEmail}>`,
      to: receiverEmail,
      subject: subjectLine,
      html: htmlBody,
    });

    console.log(`✅ Inquiry sent: ${docketRef} — ${name} (${type})`);
    res.json({ success: true, docketRef });
  } catch (err) {
    console.error('❌ Email send error:', err);
    res.status(500).json({ 
      error: 'Failed to send your inquiry. Please try again.',
      details: err.message || String(err)
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ─── Serve Static Files from dist/ ───────────
app.use(express.static(DIST_DIR, {
  maxAge: '1y',
  immutable: true,
  index: 'index.html',
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache');
    }
  },
}));

// SPA fallback — serve index.html for any unmatched routes (Express 5 compatible)
app.use((req, res) => {
  const indexPath = path.join(DIST_DIR, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err && !res.headersSent) {
      console.error('❌ Error serving index.html:', err);
      res.status(500).send('Server Error: Static build files not found.');
    }
  });
});

// ─── Start Server ────────────────────────────
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

  // Verify SMTP config on startup
  if (!process.env.BREVO_SMTP_LOGIN || !process.env.BREVO_SMTP_KEY || !process.env.RECEIVER_EMAIL) {
    console.warn('⚠️  Missing environment variables! Set BREVO_SMTP_LOGIN, BREVO_SMTP_KEY, and RECEIVER_EMAIL.');
  }
});

