import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import GitHubProjectCard from './GitHubProjectCard'

const projects = [
  {
    title: 'PotatoDoc',
    subtitle: 'AI-Powered Potato Disease Diagnosis',
    description:
      'An AI-powered web application for classifying potato leaf diseases using deep learning. Integrated CNN-based machine learning model achieving 95%+ accuracy.',
    tech: ['Python', 'FastAPI', 'TensorFlow/Keras', 'React.js', 'Material-UI', 'Deep Learning'],
    repo: 'Potatodoc',
    status: 'Active',
  },
  {
    title: 'EasyFarm',
    subtitle: 'Farming Management Platform',
    description:
      'A TypeScript-based farming management platform.',
    tech: ['TypeScript', 'React', 'Node.js'],
    repo: 'EasyFarm',
    status: 'Completed',
  },
  {
    title: 'Tato Aalu',
    subtitle: 'Multiplayer Potato Passing Game',
    description:
      'Multiplayer Android game with real-time interaction, score tracking, and interactive gameplay UI.',
    tech: ['Android Studio', 'Java', 'Firebase Realtime Database'],
    repo: 'Tatoaalu',
    status: 'Completed',
  },
  {
    title: 'Treasure Hunt Adventure',
    subtitle: 'Real-Time Multiplayer AR Game',
    description:
      'Real-time multiplayer Android game with location-based and AR treasure hunting features. Includes live chat, leaderboard, and AI-powered challenges.',
    tech: ['Android Studio', 'Java', 'Firebase', 'ARCore', 'TensorFlow Lite', 'osmdroid'],
    repo: 'THA',
    status: 'Completed',
  },
  {
    title: 'Online Voting System',
    subtitle: 'Class Representative Selection',
    description:
      'Secure web-based voting system for academic use with authentication, real-time vote counting, result visualization, and admin management.',
    tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    repo: null,
    status: 'Completed',
  },
  {
    title: 'WallpaperHub',
    subtitle: 'Wallpaper Sharing Platform',
    description:
      'Wallpaper sharing and downloading platform with authentication, image categorization, search, upload, and download functionality.',
    tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'Firebase Storage'],
    repo: null,
    status: 'Completed',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
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
            <GitHubProjectCard key={project.title} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
