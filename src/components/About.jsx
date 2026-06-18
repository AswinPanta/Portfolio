import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { HiCode, HiLightBulb, HiAcademicCap } from 'react-icons/hi'

const stats = [
  { icon: HiCode, label: 'Projects Built', value: '5+' },
  { icon: HiAcademicCap, label: 'Semester', value: '8th' },
  { icon: HiLightBulb, label: 'Technologies', value: '15+' },
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="py-20 sm:py-28 px-4 relative">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-sm tracking-widest uppercase">
            About Me
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-800 dark:text-white mt-2">
            Who I Am
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-emerald-400 via-teal-400 to-emerald-600 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.15),transparent_60%)]" />
              <HiAcademicCap size={80} className="text-white/80" />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-amber-500/20 rounded-full blur-xl" />
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-emerald-500/20 rounded-full blur-xl" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed mb-6">
              Motivated Bachelor of Information Technology (BIT) student currently in the 8th
              semester at <strong className="text-stone-800 dark:text-white">Gandaki University</strong>{' '}
              with a strong interest in innovative technology solutions and practical
              application development. Experienced in developing academic and practical
              projects using JavaScript, PHP, Firebase, MySQL, React Native, and Android Studio.
            </p>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed mb-8">
              Passionate about problem-solving, learning new technologies, and developing
              user-friendly applications for real-world challenges. Seeking an internship
              opportunity to enhance technical knowledge, practical experience, and
              problem-solving abilities in the IT field.
            </p>

            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                  className="text-center p-4 rounded-xl bg-white dark:bg-slate-800/50 border border-stone-200 dark:border-stone-700"
                >
                  <stat.icon className="mx-auto mb-1.5 text-emerald-500" size={20} />
                  <div className="text-xl sm:text-2xl font-bold text-stone-800 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-xs text-stone-500 dark:text-stone-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
