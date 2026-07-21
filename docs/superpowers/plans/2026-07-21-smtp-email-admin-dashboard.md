# SMTP Email + Admin Dashboard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace Web3Forms with Gmail SMTP for the contact form and add an admin dashboard at `/admin` to view messages and reply via email.

**Architecture:** A Vercel serverless function (`api/send-email.js`) handles email sending via Nodemailer + Gmail SMTP. The contact form submits to this endpoint and saves messages to localStorage. An admin dashboard page reads messages from localStorage and allows replying via the same endpoint.

**Tech Stack:** React 19, Vite 8, Tailwind CSS 4, Framer Motion, Nodemailer, Vercel Serverless Functions

## Global Constraints

- Gmail SMTP credentials stored as Vercel environment variables (`GMAIL_USER`, `GMAIL_APP_PASSWORD`)
- No client-side exposure of SMTP credentials
- Preserve existing form validation, honeypot spam protection, dark mode support
- Follow existing code style (functional components, framer-motion animations, tailwind classes)

---

### Task 1: Install Nodemailer Dependency

**Files:**
- Modify: `package.json`

**Interfaces:**
- Produces: `nodemailer` available as a dependency for the serverless function

- [ ] **Step 1: Install nodemailer**

Run: `npm install nodemailer`
Expected: `nodemailer` added to `dependencies` in package.json

- [ ] **Step 2: Verify installation**

Run: `npm ls nodemailer`
Expected: `nodemailer@<version>` listed

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: add nodemailer dependency for SMTP email"
```

---

### Task 2: Create Vercel Serverless Function for Email

**Files:**
- Create: `api/send-email.js`

**Interfaces:**
- Consumes: `GMAIL_USER`, `GMAIL_APP_PASSWORD` environment variables
- Produces: `POST /api/send-email` endpoint accepting `{ name, email, message, replyTo? }`

- [ ] **Step 1: Create the serverless function**

Create `api/send-email.js`:

```javascript
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
```

- [ ] **Step 2: Commit**

```bash
git add api/send-email.js
git commit -m "feat: add Vercel serverless function for SMTP email via Gmail"
```

---

### Task 3: Update Contact Form to Use SMTP Endpoint

**Files:**
- Modify: `src/components/Contact.jsx` (lines 137-172)

**Interfaces:**
- Consumes: `POST /api/send-email` endpoint from Task 2
- Produces: Messages saved to localStorage under key `contact_messages`

- [ ] **Step 1: Replace Web3Forms fetch with SMTP endpoint**

In `src/components/Contact.jsx`, replace the try block (lines 137-172) with:

```javascript
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          honeypot: form.honeypot,
        }),
      })
      const data = await res.json().catch(() => ({}))

      if (!res.ok || !data.ok) {
        setStatus('error')
        setStatusMessage(
          data?.error || 'Sorry — something went wrong. Please try again.'
        )
        return
      }

      // Save message to localStorage
      const messages = JSON.parse(localStorage.getItem('contact_messages') || '[]')
      messages.unshift(data.message)
      localStorage.setItem('contact_messages', JSON.stringify(messages))

      setStatus('success')
      setStatusMessage(
        "Thanks! Your message is on its way — I'll reply soon."
      )
      setForm(initialForm)
    } catch {
      setStatus('error')
      setStatusMessage(
        'Network error — please check your connection and try again.'
      )
    }
```

- [ ] **Step 2: Verify form still works locally**

Run: `npm run dev`
Expected: Contact form submits without errors (will fail with network error if no Vercel deployment, which is expected locally)

- [ ] **Step 3: Commit**

```bash
git add src/components/Contact.jsx
git commit -m "feat: replace Web3Forms with SMTP endpoint in contact form"
```

---

### Task 4: Create Admin Dashboard Page

**Files:**
- Create: `src/pages/Admin.jsx`

**Interfaces:**
- Consumes: `localStorage` key `contact_messages`
- Produces: Admin UI with message list and reply form

- [ ] **Step 1: Create the Admin component**

Create `src/pages/Admin.jsx`:

```jsx
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HiMail,
  HiReply,
  HiCheckCircle,
  HiExclamationCircle,
  HiTrash,
} from 'react-icons/hi'
import { FaGithub } from 'react-icons/fa'

export default function Admin() {
  const [messages, setMessages] = useState([])
  const [replyingTo, setReplyingTo] = useState(null)
  const [replyMessage, setReplyMessage] = useState('')
  const [status, setStatus] = useState('idle')
  const [statusMessage, setStatusMessage] = useState('')

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('contact_messages') || '[]')
    setMessages(stored)
  }, [])

  const updateMessages = (updated) => {
    setMessages(updated)
    localStorage.setItem('contact_messages', JSON.stringify(updated))
  }

  const handleReply = async (msg) => {
    if (!replyMessage.trim() || replyMessage.trim().length < 5) {
      setStatus('error')
      setStatusMessage('Reply message should be at least 5 characters.')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Aswin Panta',
          email: msg.email,
          message: replyMessage,
          replyTo: `Original message from ${msg.name}: ${msg.message.substring(0, 100)}`,
        }),
      })
      const data = await res.json().catch(() => ({}))

      if (!res.ok || !data.ok) {
        setStatus('error')
        setStatusMessage(data?.error || 'Failed to send reply.')
        return
      }

      const updated = messages.map((m) =>
        m.id === msg.id ? { ...m, replied: true } : m
      )
      updateMessages(updated)
      setReplyingTo(null)
      setReplyMessage('')
      setStatus('success')
      setStatusMessage('Reply sent successfully!')
    } catch {
      setStatus('error')
      setStatusMessage('Network error — please try again.')
    }
  }

  const handleDelete = (id) => {
    const updated = messages.filter((m) => m.id !== id)
    updateMessages(updated)
  }

  const formatDate = (iso) => {
    return new Date(iso).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-center justify-between">
            <div>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-sm tracking-widest uppercase">
                Admin
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold text-stone-800 dark:text-white mt-1">
                Message Dashboard
              </h1>
              <p className="text-stone-500 dark:text-stone-400 mt-2">
                {messages.length} message{messages.length !== 1 ? 's' : ''} received
              </p>
            </div>
            <a
              href="/"
              className="text-sm text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              ← Back to Portfolio
            </a>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {status === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mb-6 flex items-center gap-2 p-4 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 text-sm"
            >
              <HiCheckCircle size={18} />
              {statusMessage}
            </motion.div>
          )}
          {status === 'error' && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mb-6 flex items-center gap-2 p-4 rounded-lg bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 text-sm"
            >
              <HiExclamationCircle size={18} />
              {statusMessage}
            </motion.div>
          )}
        </AnimatePresence>

        {messages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <HiMail className="mx-auto text-stone-300 dark:text-stone-600" size={64} />
            <p className="mt-4 text-stone-500 dark:text-stone-400 text-lg">
              No messages yet
            </p>
            <p className="text-stone-400 dark:text-stone-500 text-sm mt-1">
              Messages from the contact form will appear here
            </p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-800/50 border border-stone-200 dark:border-stone-700 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-stone-800 dark:text-white">
                        {msg.name}
                      </h3>
                      <span className="text-xs text-stone-400 dark:text-stone-500">
                        {formatDate(msg.timestamp)}
                      </span>
                      {msg.replied && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400">
                          Replied
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-stone-500 dark:text-stone-400 mb-3">
                      {msg.email}
                    </p>
                    <p className="text-stone-700 dark:text-stone-300 whitespace-pre-wrap">
                      {msg.message}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        setReplyingTo(replyingTo === msg.id ? null : msg.id)
                        setReplyMessage('')
                        setStatus('idle')
                      }}
                      className="p-2 rounded-lg text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
                      title="Reply"
                    >
                      <HiReply size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(msg.id)}
                      className="p-2 rounded-lg text-stone-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors"
                      title="Delete"
                    >
                      <HiTrash size={18} />
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {replyingTo === msg.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t border-stone-200 dark:border-stone-700 overflow-hidden"
                    >
                      <p className="text-xs text-stone-500 dark:text-stone-400 mb-2">
                        Replying to <strong>{msg.email}</strong>
                      </p>
                      <textarea
                        rows={4}
                        value={replyMessage}
                        onChange={(e) => setReplyMessage(e.target.value)}
                        placeholder="Type your reply..."
                        className="w-full rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-slate-800/60 px-4 py-2.5 text-sm text-stone-800 dark:text-white placeholder:text-stone-400 dark:placeholder:text-stone-500 outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400 resize-y min-h-[100px]"
                      />
                      <div className="flex items-center gap-3 mt-3">
                        <button
                          onClick={() => handleReply(msg)}
                          disabled={status === 'sending'}
                          className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 disabled:cursor-not-allowed text-white text-sm font-semibold transition-all"
                        >
                          {status === 'sending' ? (
                            <>
                              <span className="inline-block w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                              Sending…
                            </>
                          ) : (
                            'Send Reply'
                          )}
                        </button>
                        <button
                          onClick={() => setReplyingTo(null)}
                          className="px-4 py-2 rounded-lg text-stone-500 hover:text-stone-700 dark:hover:text-stone-300 text-sm transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/Admin.jsx
git commit -m "feat: add admin dashboard page for viewing and replying to messages"
```

---

### Task 5: Add Admin Route to App

**Files:**
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: `Admin` component from Task 4
- Produces: `/admin` route renders Admin page, `/` renders portfolio

- [ ] **Step 1: Add client-side routing for admin**

Replace the entire content of `src/App.jsx`:

```jsx
import { motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Education from './components/Education'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Workshops from './components/Workshops'
import Contact from './components/Contact'
import FloatingElements from './components/FloatingElements'
import Admin from './pages/Admin'

function AdminLayout() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      <Admin />
    </motion.div>
  )
}

function PortfolioLayout() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white dark:bg-slate-900 text-stone-800 dark:text-stone-200 transition-colors duration-300"
    >
      <FloatingElements />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Education />
        <Skills />
        <Projects />
        <Workshops />
        <Contact />
      </main>
    </motion.div>
  )
}

export default function App() {
  const isAdmin = window.location.pathname === '/admin'
  return isAdmin ? <AdminLayout /> : <PortfolioLayout />
}
```

- [ ] **Step 2: Commit**

```bash
git add src/App.jsx
git commit -m "feat: add /admin route for message dashboard"
```

---

### Task 6: Create Environment Variables Example File

**Files:**
- Create: `.env.example`

**Interfaces:**
- Produces: Documentation of required environment variables

- [ ] **Step 1: Create .env.example**

Create `.env.example`:

```
# Gmail SMTP Configuration
# 1. Enable 2FA on your Gmail account
# 2. Generate an App Password at https://myaccount.google.com/apppasswords
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=xxxx-xxxx-xxxx-xxxx
```

- [ ] **Step 2: Commit**

```bash
git add .env.example
git commit -m "docs: add environment variables example file"
```

---

### Task 7: Update Vercel Configuration for Serverless Functions

**Files:**
- Modify: `vercel.json`

**Interfaces:**
- Produces: Vercel config that includes the `api/` directory for serverless functions

- [ ] **Step 1: Update vercel.json**

Replace the content of `vercel.json`:

```json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "functions": {
    "api/**/*.js": {
      "maxDuration": 10
    }
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add vercel.json
git commit -m "feat: configure Vercel serverless functions with timeout"
```

---

### Task 8: Verify Build and Lint

**Files:**
- None (verification only)

**Interfaces:**
- Consumes: All previous tasks
- Produces: Clean build and lint pass

- [ ] **Step 1: Run lint**

Run: `npm run lint`
Expected: No errors

- [ ] **Step 2: Run build**

Run: `npm run build`
Expected: Build succeeds with no errors

- [ ] **Step 3: Commit any fixes if needed**

```bash
git add -A
git commit -m "fix: resolve lint and build issues"
```

---

### Task 9: Deploy and Test on Vercel

**Files:**
- None (deployment and testing)

**Interfaces:**
- Consumes: All previous tasks, Vercel environment variables
- Produces: Working contact form and admin dashboard in production

- [ ] **Step 1: Push to GitHub**

Run: `git push origin main`

- [ ] **Step 2: Set environment variables on Vercel**

In Vercel dashboard → Settings → Environment Variables:
- Add `GMAIL_USER` = your Gmail address
- Add `GMAIL_APP_PASSWORD` = your 16-digit app password

- [ ] **Step 3: Trigger deployment**

Vercel auto-deploys on push. Wait for deployment to complete.

- [ ] **Step 4: Test contact form**

Visit the deployed site → fill out contact form → submit → verify email received in Gmail

- [ ] **Step 5: Test admin dashboard**

Visit `/admin` → verify message appears in the list → click Reply → send reply → verify reply email received

- [ ] **Step 6: Test dark mode**

Toggle dark mode on admin dashboard → verify styling is correct

- [ ] **Step 7: Final commit**

```bash
git add -A
git commit -m "feat: complete SMTP email + admin dashboard feature"
```
