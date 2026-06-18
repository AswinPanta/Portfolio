import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { HiMail } from 'react-icons/hi'
import { FaGithub } from 'react-icons/fa'

const titles = [
  'BIT Student',
  'Full Stack Developer',
  'Mobile App Developer',
  'AI Enthusiast',
]

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = titles[titleIndex]
    let timeout

    if (!deleting && charIndex < current.length) {
      timeout = setTimeout(() => setCharIndex((c) => c + 1), 80)
    } else if (!deleting && charIndex === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((c) => c - 1), 40)
    } else if (deleting && charIndex === 0) {
      setDeleting(false)
      setTitleIndex((i) => (i + 1) % titles.length)
    }

    return () => clearTimeout(timeout)
  }, [charIndex, deleting, titleIndex])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
  }

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 pt-20"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-400/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-center"
      >
        <div className="text-center md:text-left order-2 md:order-1">
          <motion.div variants={itemVariants} className="mb-4">
            <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider uppercase bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 rounded-full">
              Open to Internships
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4"
          >
            <span className="text-stone-800 dark:text-white">Hi, I&apos;m </span>
            <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 bg-clip-text text-transparent">
              Aswin Panta
            </span>
          </motion.h1>

          <motion.div variants={itemVariants} className="h-10 mb-6">
            <span className="text-xl sm:text-2xl font-medium text-stone-500 dark:text-stone-400">
              {titles[titleIndex].substring(0, charIndex)}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
                className="inline-block w-0.5 h-7 ml-1 bg-emerald-500 align-middle"
              />
            </span>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-stone-500 dark:text-stone-400 leading-relaxed mb-8"
          >
            Motivated BIT student at Gandaki University with a passion for building
            innovative tech solutions — from AI-powered apps to real-time multiplayer games.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-3 sm:gap-4"
          >
            <a
              href="#projects"
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105 transition-all duration-300"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="px-6 py-3 border-2 border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-300 font-semibold rounded-xl hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              <HiMail className="inline" /> Contact Me
            </a>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex items-center gap-4 mt-8"
          >
            <a
              href="https://github.com/AswinPanta"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 text-stone-500 dark:text-stone-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 rounded-xl transition-all duration-300"
              aria-label="GitHub"
            >
              <FaGithub size={22} />
            </a>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="order-1 md:order-2 flex justify-center"
        >
          <div className="relative">
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 blur-xl opacity-30"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.img
              src="/assets/1.jpeg"
              alt="Aswin Panta"
              className="relative w-56 h-56 sm:w-64 sm:h-64 object-cover rounded-full border-4 border-white dark:border-slate-800 shadow-2xl"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 w-5 h-8 border-2 border-stone-400 dark:border-stone-500 rounded-full flex justify-center pt-1.5"
      >
        <div className="w-1 h-2 bg-emerald-500 rounded-full" />
      </motion.div>
    </section>
  )
}
