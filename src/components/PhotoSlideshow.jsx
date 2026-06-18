import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const photos = [
  '/assets/1.jpeg',
  '/assets/2.jpeg',
  '/assets/3.jpeg',
  '/assets/4.jpeg',
  '/assets/5.jpeg',
  '/assets/6.jpeg',
]

const glows = [
  { from: '#059669', to: '#14b8a6' },
  { from: '#d97706', to: '#f59e0b' },
  { from: '#7c3aed', to: '#a78bfa' },
  { from: '#db2777', to: '#f472b6' },
  { from: '#0284c7', to: '#38bdf8' },
  { from: '#059669', to: '#34d399' },
]

export default function PhotoSlideshow() {
  const [index, setIndex] = useState(0)

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % photos.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(next, 4500)
    return () => clearInterval(timer)
  }, [next])

  const g = glows[index]

  return (
    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            `radial-gradient(circle at 30% 30%, ${g.from}30, transparent 70%)`,
            `radial-gradient(circle at 70% 70%, ${g.to}30, transparent 70%)`,
          ].join(', '),
        }}
        transition={{ duration: 1.2 }}
      />

      <motion.div
        className="absolute -top-8 -right-8 w-48 h-48 rounded-full blur-3xl"
        animate={{ background: g.from, opacity: [0.12, 0.25, 0.12], scale: [1, 1.3, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full blur-3xl"
        animate={{ background: g.to, opacity: [0.15, 0.3, 0.15], scale: [1, 1.4, 1] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      />

      <div className="absolute inset-4">
        <AnimatePresence mode="wait">
          <motion.img
            key={index}
            src={photos[index]}
            alt=""
            className="w-full h-full object-cover rounded-xl shadow-2xl"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          />
        </AnimatePresence>
      </div>

    </div>
  )
}
