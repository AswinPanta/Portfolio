import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HiMail,
  HiReply,
  HiCheckCircle,
  HiExclamationCircle,
  HiTrash,
} from 'react-icons/hi'

export default function Admin() {
  const [messages, setMessages] = useState(() =>
    JSON.parse(localStorage.getItem('contact_messages') || '[]')
  )
  const [replyingTo, setReplyingTo] = useState(null)
  const [replyMessage, setReplyMessage] = useState('')
  const [status, setStatus] = useState('idle')
  const [statusMessage, setStatusMessage] = useState('')

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
