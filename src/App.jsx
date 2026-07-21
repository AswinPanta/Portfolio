import { motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Education from './components/Education'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Workshops from './components/Workshops'
import Contact from './components/Contact'
import FloatingElements from './components/FloatingElements'
import Admin from './pages/Admin'

function AdminLayout() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      <Admin />
    </motion.div>
  )
}

function PortfolioLayout() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white dark:bg-slate-900 text-stone-800 dark:text-stone-200 transition-colors duration-300"
    >
      <FloatingElements />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Education />
        <Skills />
        <Projects />
        <Workshops />
        <Contact />
      </main>
    </motion.div>
  )
}

export default function App() {
  const isAdmin = window.location.pathname === '/admin'
  return isAdmin ? <AdminLayout /> : <PortfolioLayout />
}
