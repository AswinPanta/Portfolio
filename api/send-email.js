/* eslint-disable no-undef */
import nodemailer from 'nodemailer'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, message, replyTo } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' })
  }

  if (name === 'honeypot' || message.length < 5) {
    return res.status(200).json({ ok: true })
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  })

  const toAddress = process.env.GMAIL_USER
  const subject = replyTo
    ? `Re: ${replyTo}`
    : `New message from ${name}`
  const htmlContent = replyTo
    ? `<p><strong>Reply to:</strong> ${replyTo}</p><p><strong>From:</strong> ${name} (${email})</p><hr/><p>${message.replace(/\n/g, '<br/>')}</p>`
    : `<p><strong>From:</strong> ${name} (${email})</p><hr/><p>${message.replace(/\n/g, '<br/>')}</p>`

  try {
    await transporter.sendMail({
      from: `"${name}" <${process.env.GMAIL_USER}>`,
      to: toAddress,
      replyTo: email,
      subject,
      html: htmlContent,
    })

    return res.status(200).json({
      ok: true,
      message: {
        id: `msg_${Date.now()}`,
        name,
        email,
        message,
        timestamp: new Date().toISOString(),
        replied: false,
      },
    })
  } catch (err) {
    console.error('Email send error:', err)
    return res.status(500).json({ error: 'Failed to send email. Please try again.' })
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
}
