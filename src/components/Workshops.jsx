import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { HiBookOpen } from 'react-icons/hi'

const workshops = [
  'Laravel',
  'Bootstrap',
  'AWS',
  'Django',
  'Figma',
  'Artificial Intelligence & Machine Learning Basics',
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

const tagVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3 },
  },
}

export default function Workshops() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section id="workshops" className="py-20 sm:py-28 px-4">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-sm tracking-widest uppercase">
            Workshops & Learning
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-800 dark:text-white mt-2">
            Always Learning
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="flex flex-wrap gap-3 justify-center"
        >
          {workshops.map((w) => (
            <motion.div
              key={w}
              variants={tagVariants}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800/50 border border-stone-200 dark:border-stone-700 shadow-sm hover:shadow-md hover:border-emerald-400 dark:hover:border-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-all duration-300 cursor-default"
            >
              <HiBookOpen className="text-emerald-500 shrink-0" size={16} />
              <span className="text-sm font-medium text-stone-700 dark:text-stone-300">
                {w}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
