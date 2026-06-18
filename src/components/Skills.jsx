import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  HiCode,
  HiDeviceMobile,
  HiDatabase,
  HiCog,
  HiUserGroup,
} from 'react-icons/hi'

const skillCategories = [
  {
    title: 'Programming & Web Development',
    icon: HiCode,
    skills: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'Bootstrap'],
  },
  {
    title: 'Mobile App Development',
    icon: HiDeviceMobile,
    skills: ['Android Studio', 'React Native', 'Java', 'TypeScript'],
  },
  {
    title: 'Database & Backend',
    icon: HiDatabase,
    skills: ['MySQL', 'Firebase', 'FastAPI', 'Supabase'],
  },
  {
    title: 'Tools & Platforms',
    icon: HiCog,
    skills: ['Git', 'GitHub', 'VS Code', 'Figma'],
  },
  {
    title: 'Professional Skills',
    icon: HiUserGroup,
    skills: [
      'Problem Solving',
      'Team Collaboration',
      'Adaptability',
      'Communication',
      'Creative Thinking',
    ],
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

const tagVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, delay: i * 0.05 },
  }),
}

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="skills" className="py-20 sm:py-28 px-4">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-sm tracking-widest uppercase">
            Skills
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-800 dark:text-white mt-2">
            What I Bring to the Table
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {skillCategories.map((cat) => (
            <motion.div
              key={cat.title}
              variants={cardVariants}
              className="p-5 sm:p-6 rounded-xl bg-white dark:bg-slate-800/50 border border-stone-200 dark:border-stone-700 hover:border-emerald-300 dark:hover:border-emerald-700 shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform duration-300">
                  <cat.icon size={20} />
                </div>
                <h3 className="font-semibold text-stone-800 dark:text-white text-sm sm:text-base">
                  {cat.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, i) => (
                  <motion.span
                    key={skill}
                    custom={i}
                    variants={tagVariants}
                    className="px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg bg-stone-100 dark:bg-slate-700/60 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-600 hover:border-emerald-400 dark:hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:text-emerald-700 dark:hover:text-emerald-300 transition-all duration-200 cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
