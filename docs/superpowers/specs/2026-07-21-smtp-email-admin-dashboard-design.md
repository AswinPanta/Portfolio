# Design: SMTP Email + Admin Dashboard

## Overview

Replace Web3Forms with Gmail SMTP for the contact form, and add an admin dashboard at `/admin` where the portfolio owner can view all submitted messages (stored in localStorage) and reply to them via SMTP.

## Architecture

```
Contact Form → POST /api/send-email → Nodemailer (Gmail SMTP) → Owner's inbox
                ↓
         Response saved to localStorage → Admin Dashboard reads from localStorage
                ↓
Admin Dashboard → POST /api/send-email → Nodemailer (Gmail SMTP) → Reply to visitor
```

## Components

### 1. `api/send-email.js` — Vercel Serverless Function

Single endpoint handling both contact form submissions and admin replies.

**Request body:**
- `name` (string) — sender name
- `email` (string) — sender email
- `message` (string) — message content
- `replyTo` (string, optional) — if present, this is a reply to a previous message

**Behavior:**
- Validates required fields
- Checks honeypot field (if provided)
- Sends email via Gmail SMTP (`smtp.gmail.com:465`, SSL)
- Returns JSON with success/error status and message metadata

**Environment variables (Vercel):**
- `GMAIL_USER` — Gmail address (e.g., `Aswingorey36@gmail.com`)
- `GMAIL_APP_PASSWORD` — 16-character Gmail app password

### 2. Updated `src/components/Contact.jsx`

- Replaces Web3Forms fetch with `POST /api/send-email`
- On success, saves message metadata to localStorage under key `contact_messages`
- localStorage entry format:
  ```json
  {
    "id": "msg_<timestamp>",
    "name": "Visitor Name",
    "email": "visitor@example.com",
    "message": "Hello!",
    "timestamp": "2026-07-21T12:00:00.000Z",
    "replied": false
  }
  ```
- Keeps existing form validation, honeypot, and UI unchanged

### 3. New `src/pages/Admin.jsx` — Admin Dashboard

**Layout:**
- Header with title "Admin Dashboard"
- List of messages (newest first) from localStorage
- Each message card shows: sender name, email, message preview, timestamp
- "Reply" button on each message opens a reply form
- Reply form pre-fills recipient email and subject (`Re: Original subject`)
- Reply sends via same `/api/send-email` endpoint
- On successful reply, marks message as `replied: true` in localStorage
- Empty state when no messages exist

**Styling:** Matches existing portfolio theme (Tailwind, dark mode support)

### 4. Route Integration

- Add `/admin` route in `App.jsx` (simple conditional rendering based on `window.location.pathname`)
- No authentication (this is a personal portfolio, not a public app)

## Security Considerations

- SMTP credentials stay server-side only (environment variables)
- No client-side exposure of Gmail credentials
- Admin page has no authentication (acceptable for personal portfolio)
- Honeypot spam protection retained from existing form

## Testing

- Deploy to Vercel with environment variables set
- Submit contact form → verify email received in Gmail
- Check localStorage for saved message
- Visit `/admin` → verify message appears
- Click Reply → send reply → verify reply email received
- Check dark mode styling

## Files to Create/Modify

| File | Action |
|------|--------|
| `api/send-email.js` | Create (Vercel serverless function) |
| `src/components/Contact.jsx` | Modify (replace Web3Forms with SMTP endpoint) |
| `src/pages/Admin.jsx` | Create (admin dashboard page) |
| `src/App.jsx` | Modify (add /admin route) |
| `package.json` | Modify (add nodemailer dependency) |
| `.env.example` | Create (document required env vars) |
