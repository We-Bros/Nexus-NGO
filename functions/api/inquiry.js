// Cloudflare Pages Function: POST /api/inquiry
// Sends transactional email via Brevo REST API on Cloudflare Edge

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  };

  try {
    let body;
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    const { name, phone, email, type, state, message } = body;

    // Validate required fields
    if (!name || !phone || !message) {
      return new Response(
        JSON.stringify({ error: 'Name, phone, and message are required.' }),
        { status: 400, headers: corsHeaders }
      );
    }

    const apiKey = (env.BREVO_API_KEY || env.BREVO_SMTP_KEY)?.trim();
    const receiverEmail = env.RECEIVER_EMAIL?.trim();
    const senderEmail = (env.SENDER_EMAIL || 'mail@nexushumanrightscoi.com').trim();

    if (!apiKey) {
      const msg = 'BREVO_API_KEY (or BREVO_SMTP_KEY) is missing in Cloudflare Pages Environment Variables.';
      console.error(msg);
      return new Response(
        JSON.stringify({ error: 'Email service configuration error.', details: msg }),
        { status: 500, headers: corsHeaders }
      );
    }

    if (!receiverEmail) {
      const msg = 'RECEIVER_EMAIL is missing in Cloudflare Pages Environment Variables.';
      console.error(msg);
      return new Response(
        JSON.stringify({ error: 'Email service configuration error.', details: msg }),
        { status: 500, headers: corsHeaders }
      );
    }

    // Generate docket reference
    const docketRef = `NHRCI-2026-${(Math.random() * 90000 + 10000).toFixed(0)}`;
    const submittedAt = new Date().toLocaleString('en-IN', {
      dateStyle: 'full',
      timeStyle: 'short',
      timeZone: 'Asia/Kolkata',
    });

    const categoryText = type || 'General Inquiry';
    const cleanCategory = categoryText.replace(/\s*Inquiry\s*$/i, '');
    const subjectLine = `New ${cleanCategory} Inquiry — ${name} [${docketRef}]`;

    // Professional HTML email template
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
            A new <strong style="color: #ac3300;">${categoryText}</strong> has been submitted from the website.
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
              <td style="padding: 12px 0; color: #1a202c;">${categoryText}</td>
            </tr>
            <tr style="border-bottom: 1px solid #edf2f7;">
              <td style="padding: 12px 0; color: #718096; vertical-align: top;">State / Region</td>
              <td style="padding: 12px 0; color: #1a202c;">${state || 'Not provided'}</td>
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

    // Call Brevo Transactional Email REST API
    const brevoPayload = {
      sender: {
        name: 'Nexus Human Rights',
        email: senderEmail,
      },
      to: [
        {
          email: receiverEmail,
        },
      ],
      subject: subjectLine,
      htmlContent: htmlBody,
    };

    const brevoRes = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify(brevoPayload),
    });

    const brevoData = await brevoRes.json().catch(() => ({}));

    if (!brevoRes.ok) {
      console.error('Brevo API error:', brevoData);
      return new Response(
        JSON.stringify({
          error: 'Failed to send inquiry email via Brevo.',
          details: brevoData.message || 'Brevo API error',
        }),
        { status: 500, headers: corsHeaders }
      );
    }

    return new Response(
      JSON.stringify({ success: true, docketRef }),
      { status: 200, headers: corsHeaders }
    );
  } catch (err) {
    console.error('Unhandled inquiry error:', err);
    return new Response(
      JSON.stringify({
        error: 'Failed to send your inquiry. Please try again.',
        details: err.message || String(err),
      }),
      { status: 500, headers: corsHeaders }
    );
  }
}
