import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { HiStar, HiCode, HiExternalLink } from 'react-icons/hi'
import { VscRepoForked } from 'react-icons/vsc'

const langColors = {
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  Python: '#3776ab',
  Java: '#b07219',
  'Jupyter Notebook': '#da5b0b',
  HTML: '#e34c26',
  CSS: '#563d7c',
  PHP: '#777bb4',
  Dart: '#00b4ab',
  Kotlin: '#A97BFF',
  Swift: '#ffac45',
}

const langGradients = {
  JavaScript: 'from-yellow-400 to-amber-500',
  TypeScript: 'from-blue-500 to-indigo-600',
  Python: 'from-blue-500 to-cyan-500',
  Java: 'from-orange-500 to-red-500',
  'Jupyter Notebook': 'from-orange-600 to-amber-700',
  HTML: 'from-orange-500 to-red-500',
  CSS: 'from-purple-500 to-pink-500',
  PHP: 'from-indigo-500 to-purple-600',
}

const staticProjects = {
  'Online Voting System': {
    description: 'Secure web-based voting system for academic use with authentication, real-time vote counting, and admin management.',
    language: 'PHP',
    stars: 0,
    forks: 0,
    html_url: null,
    pushed_at: null,
  },
  WallpaperHub: {
    description: 'Wallpaper sharing and downloading platform with authentication, image categorization, search, and upload functionality.',
    language: 'PHP',
    stars: 0,
    forks: 0,
    html_url: null,
    pushed_at: null,
  },
}

export default function GitHubProjectCard({ project }) {
  const [repoData, setRepoData] = useState(() => {
    if (!project.repo) return staticProjects[project.title] || null
    return null
  })
  const [loading, setLoading] = useState(() => !project.repo ? false : true)

  useEffect(() => {
    if (!project.repo) return

    fetch(`https://api.github.com/repos/AswinPanta/${project.repo}`)
      .then((res) => {
        if (!res.ok) throw new Error('Not found')
        return res.json()
      })
      .then((data) => {
        setRepoData({
          description: data.description || project.description,
          language: data.language,
          stars: data.stargazers_count,
          forks: data.forks_count,
          html_url: data.html_url,
          pushed_at: data.pushed_at,
        })
      })
      .catch(() => {
        setRepoData(null)
      })
      .finally(() => setLoading(false))
  }, [project.repo, project.description, project.title])

  const lang = repoData?.language || 'JavaScript'
  const gradient = langGradients[lang] || 'from-emerald-400 to-teal-500'
  const color = langColors[lang] || '#34d399'
  const updatedDate = repoData?.pushed_at
    ? new Date(repoData.pushed_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : null

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      }}
      className="group rounded-xl bg-white dark:bg-slate-800/50 border border-stone-200 dark:border-stone-700 overflow-hidden hover:shadow-xl hover:shadow-emerald-500/5 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-500"
    >
      <div
        className={`relative h-48 bg-gradient-to-br ${gradient} flex items-center justify-center overflow-hidden`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]" />

        {loading ? (
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <div className="w-12 h-12 rounded-full border-3 border-white/30 border-t-white/80" />
            <span className="text-white/60 text-xs font-medium">Loading...</span>
          </motion.div>
        ) : (
          <motion.div
            className="flex flex-col items-center gap-1"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <HiCode size={48} className="text-white/80" />
            </motion.div>
            {repoData && (
              <span className="text-white/90 text-sm font-semibold px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm">
                {repoData.language || 'N/A'}
              </span>
            )}
          </motion.div>
        )}

        {repoData?.html_url && (
          <a
            href={repoData.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-3 right-3 p-2 rounded-lg bg-white/15 backdrop-blur-sm text-white hover:bg-white/25 transition-all opacity-0 group-hover:opacity-100"
          >
            <HiExternalLink size={16} />
          </a>
        )}

        <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-semibold bg-white/20 backdrop-blur-sm text-white rounded-full">
          {project.status}
        </span>
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-lg font-bold text-stone-800 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            {project.title}
          </h3>
          {repoData && repoData.html_url && (
            <a
              href={repoData.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 p-1.5 text-stone-400 hover:text-emerald-500 transition-colors"
            >
              <HiExternalLink size={16} />
            </a>
          )}
        </div>

        <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium mb-2">
          {project.subtitle}
        </p>

        <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed mb-3 line-clamp-2">
          {repoData?.description || project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 text-xs font-medium rounded-md bg-stone-100 dark:bg-slate-700/60 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-600"
            >
              {t}
            </span>
          ))}
        </div>

        {repoData && (
          <div className="flex items-center gap-4 text-xs text-stone-400 dark:text-stone-500 pt-2 border-t border-stone-100 dark:border-stone-700">
            <span className="flex items-center gap-1">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: color }}
              />
              {repoData.language || 'N/A'}
            </span>
            <span className="flex items-center gap-1">
              <HiStar size={14} /> {repoData.stars}
            </span>
            <span className="flex items-center gap-1">
              <VscRepoForked size={14} /> {repoData.forks}
            </span>
            {updatedDate && <span className="ml-auto">Updated {updatedDate}</span>}
          </div>
        )}
      </div>
    </motion.div>
  )
}
