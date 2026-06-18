import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  HiLightningBolt,
  HiCollection,
  HiPhotograph,
  HiDesktopComputer,
  HiSparkles,
} from 'react-icons/hi'

const projects = [
  {
    title: 'PotatoDoc',
    subtitle: 'AI-Powered Potato Disease Diagnosis',
    description:
      'Developed an AI-powered web application to help farmers and gardeners instantly identify potato leaf diseases (Early Blight, Late Blight, or Healthy) using deep learning. Integrated CNN-based machine learning model achieving 95%+ accuracy. Built with FastAPI backend and React.js frontend.',
    tech: ['Python', 'FastAPI', 'TensorFlow/Keras', 'React.js', 'Material-UI', 'Deep Learning'],
    icon: HiLightningBolt,
    status: 'Active',
    gradient: 'from-emerald-400 to-teal-500',
  },
  {
    title: 'Online Voting System',
    subtitle: 'Class Representative Selection',
    description:
      'Developed secure web-based voting system for academic use. Implemented authentication and real-time vote counting. Created result visualization and admin management system.',
    tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    icon: HiCollection,
    status: 'Completed',
    gradient: 'from-amber-400 to-orange-500',
  },
  {
    title: 'WallpaperHub',
    subtitle: 'Wallpaper Sharing Platform',
    description:
      'Developed wallpaper sharing and downloading platform. Implemented authentication and image categorization system. Added search, upload, and download functionality.',
    tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'Firebase Storage'],
    icon: HiPhotograph,
    status: 'Completed',
    gradient: 'from-violet-400 to-purple-500',
  },
  {
    title: 'Tato Aalu',
    subtitle: 'Multiplayer Potato Passing Game',
    description:
      'Developed multiplayer Android game with real-time interaction. Added score tracking and interactive gameplay UI. Used Git and GitHub for collaboration and version control.',
    tech: ['Android Studio', 'Java', 'Firebase Realtime Database'],
    icon: HiDesktopComputer,
    status: 'Completed',
    gradient: 'from-rose-400 to-pink-500',
  },
  {
    title: 'Treasure Hunt Adventure',
    subtitle: 'Real-Time Multiplayer AR Game',
    description:
      'Developed a real-time multiplayer Android game with location-based and AR treasure hunting features. Added live chat, leaderboard, player tracking, and personalized AI-powered challenges. Implemented Firebase authentication and real-time data synchronization.',
    tech: ['Android Studio', 'Java', 'Firebase', 'ARCore', 'TensorFlow Lite', 'osmdroid'],
    icon: HiSparkles,
    status: 'Completed',
    gradient: 'from-sky-400 to-blue-500',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="projects" className="py-20 sm:py-28 px-4 bg-stone-50/50 dark:bg-slate-900/30">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-sm tracking-widest uppercase">
            Projects
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-800 dark:text-white mt-2">
            What I&apos;ve Built
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 gap-6"
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={cardVariants}
              className="group rounded-xl bg-white dark:bg-slate-800/50 border border-stone-200 dark:border-stone-700 overflow-hidden hover:shadow-xl hover:shadow-emerald-500/5 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-500"
            >
              <div
                className={`relative h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]" />
                <project.icon
                  size={64}
                  className="text-white/80 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500"
                />
                <span className="absolute top-3 right-3 px-2.5 py-1 text-xs font-semibold bg-white/20 backdrop-blur-sm text-white rounded-full">
                  {project.status}
                </span>
              </div>

              <div className="p-5 sm:p-6">
                <h3 className="text-lg font-bold text-stone-800 dark:text-white mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium mb-3">
                  {project.subtitle}
                </p>
                <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed mb-4 line-clamp-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 text-xs font-medium rounded-md bg-stone-100 dark:bg-slate-700/60 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-600"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
