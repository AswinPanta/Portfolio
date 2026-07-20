import sgMail from '@sendgrid/mail'

const NOTIFY_TO = 'Aswingorey36@gmail.com'
// This must be a verified Single Sender in SendGrid.
// Go to https://sendgrid.com/settings/sender_auth → Single Sender Verification
// and verify your Gmail address, then put it here.
const FROM_ADDRESS = 'Aswingorey36@gmail.com'
const FROM_NAME = 'Portfolio Contact'

// --- Lightweight per-IP rate limiter -------------------------------------
const WINDOW_MS = 10 * 60 * 1000 // 10 minutes
const MAX_PER_WINDOW = 5
/** @type {Map<string, number[]>} */
const hits = new Map()

function clientIp(req) {
  const xff = req.headers?.['x-forwarded-for']
  if (typeof xff === 'string' && xff.length > 0)
    return xff.split(',')[0].trim()
  return req.socket?.remoteAddress || 'unknown'
}

function rateLimit(ip) {
  const now = Date.now()
  const cutoff = now - WINDOW_MS
  const arr = (hits.get(ip) || []).filter((t) => t > cutoff)
  if (arr.length >= MAX_PER_WINDOW) return false
  arr.push(now)
  hits.set(ip, arr)
  if (hits.size > 500) {
    for (const [key, times] of hits) {
      if (times.every((t) => t <= cutoff)) hits.delete(key)
    }
  }
  return true
}
// -------------------------------------------------------------------------

function isValidEmail(value) {
  if (typeof value !== 'string') return false
  const trimmed = value.trim()
  if (trimmed.length > 254) return false
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!process.env.SENDGRID_API_KEY) {
    console.error('Missing SENDGRID_API_KEY env var')
    return res
      .status(500)
      .json({ error: 'Server is not configured for email.' })
  }

  // Lazy-init so cold checks still return 405 / 500 before initing the client.
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)

  const ip = clientIp(req)
  if (!rateLimit(ip)) {
    res.setHeader('Retry-After', String(Math.ceil(WINDOW_MS / 1000)))
    return res
      .status(429)
      .json({ error: 'Too many requests. Please try again later.' })
  }

  const body = req.body ?? {}
  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const email = typeof body.email === 'string' ? body.email.trim() : ''
  const message = typeof body.message === 'string' ? body.message.trim() : ''
  const honeypot = typeof body._honey === 'string' ? body._honey : ''

  // Honeypot: bots fill hidden fields, real users don't.
  if (honeypot.length > 0) {
    return res.status(200).json({ ok: true })
  }

  if (name.length < 1 || name.length > 120 || !/\S/.test(name)) {
    return res.status(400).json({ error: 'Please enter your name.' })
  }
  if (!isValidEmail(email)) {
    return res
      .status(400)
      .json({ error: 'Please enter a valid email address.' })
  }
  if (message.length < 5 || message.length > 5000) {
    return res
      .status(400)
      .json({ error: 'Message should be between 5 and 5000 characters.' })
  }

  const safeName = escapeHtml(name)
  const safeEmail = escapeHtml(email)
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br/>')
  const firstName = escapeHtml(name.split(/\s+/)[0] || name)

  const from = { email: FROM_ADDRESS, name: FROM_NAME }

  try {
    await Promise.all([
      // 1. Notification email to you.
      sgMail.send({
        to: NOTIFY_TO,
        from,
        replyTo: email,
        subject: `New message from ${name}`,
        text:
          `Name: ${name}\n` +
          `Email: ${email}\n` +
          `Reply-To: ${email}\n\n` +
          `Message:\n${message}\n`,
        html: `
          <div style="font-family:system-ui,Segoe UI,Roboto,sans-serif;line-height:1.55;color:#1c1917">
            <h2 style="margin:0 0 12px 0;color:#059669">New contact-form submission</h2>
            <p style="margin:0 0 4px 0"><strong>Name:</strong> ${safeName}</p>
            <p style="margin:0 0 4px 0"><strong>Email:</strong> ${safeEmail}</p>
            <p style="margin:0 0 16px 0"><strong>Reply-To:</strong> ${safeEmail}</p>
            <div style="white-space:pre-wrap;background:#f5f5f4;border:1px solid #e7e5e4;border-radius:8px;padding:14px">
              ${safeMessage}
            </div>
          </div>
        `,
      }),
      // 2. Auto-reply to the person who filled out the form.
      sgMail.send({
        to: email,
        from,
        subject: `Thanks for reaching out, ${name.split(/\s+/)[0] || name}!`,
        text:
          `Hi ${name.split(/\s+/)[0] || name},\n\n` +
          `Thanks for getting in touch through my portfolio site — I really appreciate it.\n` +
          `I've received your message and will get back to you as soon as possible.\n\n` +
          `Talk soon,\nAswin Panta\n`,
        html: `
          <div style="font-family:system-ui,Segoe UI,Roboto,sans-serif;line-height:1.55;color:#1c1917">
            <p>Hi ${firstName},</p>
            <p>Thanks for getting in touch through my portfolio site — I really appreciate it.</p>
            <p>I've received your message and will get back to you as soon as possible.</p>
            <p style="margin-top:24px">Talk soon,<br/><strong>Aswin Panta</strong></p>
          </div>
        `,
      }),
    ])

    return res.status(200).json({ ok: true })
  } catch (error) {
    console.error('SendGrid send failed:', error)
    return res
      .status(500)
      .json({
        error: 'Sorry, something went wrong while sending your message.',
      })
  }
}
