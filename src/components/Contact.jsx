import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import {
  HiMail,
  HiPhone,
  HiLocationMarker,
  HiCheckCircle,
  HiExclamationCircle,
} from 'react-icons/hi'
import { FaGithub } from 'react-icons/fa'

const contactInfo = [
  {
    icon: HiMail,
    label: 'Email',
    value: 'Aswingorey36@gmail.com',
    href: 'mailto:Aswingorey36@gmail.com',
  },
  {
    icon: HiPhone,
    label: 'Phone',
    value: '+977 9745285261',
    href: 'tel:+9779745285261',
  },
  {
    icon: HiLocationMarker,
    label: 'Location',
    value: 'Nepal',
    href: null,
  },
  {
    icon: FaGithub,
    label: 'GitHub',
    value: 'github.com/AswinPanta',
    href: 'https://github.com/AswinPanta',
  },
]

const initialForm = { name: '', email: '', message: '', honeypot: '' }

function Field({ id, label, type = 'text', value, onChange, rows, required, error }) {
  const baseInput =
    'w-full rounded-lg border bg-white dark:bg-slate-800/60 px-4 py-2.5 text-sm sm:text-base text-stone-800 dark:text-white placeholder:text-stone-400 dark:placeholder:text-stone-500 outline-none transition-all duration-200 focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400'
  const borderClass = error
    ? 'border-rose-400 dark:border-rose-500'
    : 'border-stone-200 dark:border-stone-700'

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5"
      >
        {label}
      </label>
      {rows ? (
        <textarea
          id={id}
          name={id}
          rows={rows}
          required={required}
          value={value}
          onChange={onChange}
          className={`${baseInput} ${borderClass} resize-y min-h-[140px]`}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          required={required}
          value={value}
          onChange={onChange}
          className={`${baseInput} ${borderClass}`}
        />
      )}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="mt-1.5 text-xs text-rose-500 dark:text-rose-400"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle') // 'idle' | 'sending' | 'success' | 'error'
  const [statusMessage, setStatusMessage] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }))
    }
    // Clear the stale success banner once the user starts typing again.
    if (status === 'success') {
      setStatus('idle')
      setStatusMessage('')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return

    const errors = {}
    if (form.name.trim().length < 1) errors.name = 'Please enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      errors.email = 'Please enter a valid email.'
    if (form.message.trim().length < 5)
      errors.message = 'Message should be at least 5 characters.'

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      setStatus('error')
      setStatusMessage('Please fix the highlighted fields.')
      return
    }

    setStatus('sending')
    setStatusMessage('')
    setFieldErrors({})

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
  }

  const isSending = status === 'sending'

  return (
    <section
      id="contact"
      className="py-20 sm:py-28 px-4 bg-stone-50/50 dark:bg-slate-900/30"
    >
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-sm tracking-widest uppercase">
            Contact
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-800 dark:text-white mt-2">
            Let&apos;s Connect
          </h2>
          <p className="text-stone-500 dark:text-stone-400 mt-3 max-w-md mx-auto">
            I&apos;m always open to new opportunities, collaborations, and
            conversations. Send a message below or reach out directly.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left: existing contact info cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 grid sm:grid-cols-2 lg:grid-cols-1 gap-4 content-start"
          >
            {contactInfo.map((item) => {
              const Icon = item.icon
              const content = (
                <div className="flex items-center gap-4 p-5 rounded-xl bg-white dark:bg-slate-800/50 border border-stone-200 dark:border-stone-700 hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-md transition-all duration-300 group">
                  <div className="p-3 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform duration-300">
                    <Icon size={20} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-stone-500 dark:text-stone-400 font-medium uppercase tracking-wider">
                      {item.label}
                    </p>
                    <p className="text-sm sm:text-base font-medium text-stone-800 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate">
                      {item.value}
                    </p>
                  </div>
                </div>
              )

              if (item.href) {
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {content}
                  </a>
                )
              }
              return <div key={item.label}>{content}</div>
            })}
          </motion.div>

          {/* Right: actual contact form */}
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            onSubmit={handleSubmit}
            noValidate
            className="lg:col-span-3 p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-800/50 border border-stone-200 dark:border-stone-700 shadow-sm"
          >
            <div className="space-y-5">
              <Field
                id="name"
                label="Name"
                value={form.name}
                onChange={handleChange}
                required
                error={fieldErrors.name}
              />
              <Field
                id="email"
                label="Email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                error={fieldErrors.email}
              />
              <Field
                id="message"
                label="Message"
                rows={6}
                value={form.message}
                onChange={handleChange}
                required
                error={fieldErrors.message}
              />

              {/* Honeypot — hidden from real users, attractive to bots */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  left: '-10000px',
                  width: '1px',
                  height: '1px',
                  overflow: 'hidden',
                }}
              >
                <label>
                  Don&apos;t fill this out:
                  <input
                    type="text"
                    name="honeypot"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.honeypot}
                    onChange={handleChange}
                  />
                </label>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-1">
                <button
                  type="submit"
                  disabled={isSending}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 disabled:cursor-not-allowed text-white font-semibold text-sm shadow-sm transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
                >
                  {isSending ? (
                    <>
                      <span
                        className="inline-block w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin"
                        aria-hidden="true"
                      />
                      Sending…
                    </>
                  ) : (
                    'Send message'
                  )}
                </button>

                <AnimatePresence mode="wait">
                  {status === 'success' && (
                    <motion.p
                      key="success"
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -8 }}
                      className="flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-400"
                    >
                      <HiCheckCircle size={18} />
                      {statusMessage}
                    </motion.p>
                  )}
                  {status === 'error' && (
                    <motion.p
                      key="error"
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -8 }}
                      role="alert"
                      className="flex items-center gap-2 text-sm text-rose-600 dark:text-rose-400"
                    >
                      <HiExclamationCircle size={18} />
                      {statusMessage}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.form>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 pt-8 border-t border-stone-200 dark:border-stone-700 text-center"
        >
          <p className="text-sm text-stone-500 dark:text-stone-500">
            &copy; {new Date().getFullYear()} Aswin Panta. Built with{' '}
            <span className="text-emerald-500">&hearts;</span> using React &
            Tailwind CSS.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
