import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { HiAcademicCap } from 'react-icons/hi'

const education = [
  {
    degree: 'Bachelor of Information Technology (BIT)',
    school: 'Gandaki University',
    period: '2022 – Present',
    note: 'Currently in 8th Semester',
    icon: HiAcademicCap,
  },
  {
    degree: '+2 Science',
    school: 'Srijana Secondary School',
    period: 'Completed',
    note: 'Passed with B Grade',
    icon: HiAcademicCap,
  },
  {
    degree: 'SEE',
    school: 'Srijana Secondary School',
    period: 'Completed',
    note: 'Passed with A+ Grade',
    icon: HiAcademicCap,
  },
]

export default function Education() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="education" className="py-20 sm:py-28 px-4 bg-stone-50/50 dark:bg-slate-900/30">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-sm tracking-widest uppercase">
            Education
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-800 dark:text-white mt-2">
            My Academic Journey
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-400 via-teal-400 to-emerald-300 hidden sm:block" />

          {education.map((item, i) => (
            <motion.div
              key={item.degree}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="relative flex items-start gap-5 mb-8 last:mb-0"
            >
              <div className="hidden sm:flex w-12 h-12 shrink-0 rounded-full bg-white dark:bg-slate-800 border-2 border-emerald-400 dark:border-emerald-500 items-center justify-center z-10 shadow-md shadow-emerald-500/10">
                <item.icon className="text-emerald-500" size={18} />
              </div>

              <div className="flex-1 p-5 sm:p-6 rounded-xl bg-white dark:bg-slate-800/70 border border-stone-200 dark:border-stone-700 shadow-sm hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300">
                <h3 className="text-lg font-bold text-stone-800 dark:text-white mb-1">
                  {item.degree}
                </h3>
                <p className="text-emerald-600 dark:text-emerald-400 font-medium text-sm mb-1">
                  {item.school}
                </p>
                <div className="flex items-center gap-3 text-sm text-stone-500 dark:text-stone-400">
                  <span>{item.period}</span>
                  <span className="w-1 h-1 rounded-full bg-stone-300 dark:bg-stone-600" />
                  <span>{item.note}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
