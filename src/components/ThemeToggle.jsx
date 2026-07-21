import { motion } from 'framer-motion'
import { HiSun, HiMoon } from 'react-icons/hi'
import useTheme from '../context/useTheme'

export default function ThemeToggle() {
  const { dark, toggle } = useTheme()

  return (
    <motion.button
      whileTap={{ scale: 0.85 }}
      whileHover={{ scale: 1.1 }}
      onClick={toggle}
      className="p-2 rounded-lg text-stone-600 dark:text-stone-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors cursor-pointer"
      aria-label="Toggle theme"
    >
      <motion.div
        key={dark ? 'moon' : 'sun'}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 90, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {dark ? <HiSun size={20} /> : <HiMoon size={20} />}
      </motion.div>
    </motion.button>
  )
}
