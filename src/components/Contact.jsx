import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi'
import { FaGithub } from 'react-icons/fa'

const contactInfo = [
  {
    icon: HiMail,
    label: 'Email',
    value: 'Aswingorey36@gmail.com',
    href: 'mailto:Aswingorey36@gmail.com',
  },
  {
    icon: HiPhone,
    label: 'Phone',
    value: '+977 9745285261',
    href: 'tel:+9779745285261',
  },
  {
    icon: HiLocationMarker,
    label: 'Location',
    value: 'Nepal',
    href: null,
  },
  {
    icon: FaGithub,
    label: 'GitHub',
    value: 'github.com/AswinPanta',
    href: 'https://github.com/AswinPanta',
  },
]

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="contact" className="py-20 sm:py-28 px-4 bg-stone-50/50 dark:bg-slate-900/30">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-sm tracking-widest uppercase">
            Contact
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-800 dark:text-white mt-2">
            Let&apos;s Connect
          </h2>
          <p className="text-stone-500 dark:text-stone-400 mt-3 max-w-md mx-auto">
            I&apos;m always open to new opportunities, collaborations, and conversations.
            Feel free to reach out!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid sm:grid-cols-2 gap-4"
        >
          {contactInfo.map((item) => {
            const Icon = item.icon
            const content = (
              <div className="flex items-center gap-4 p-5 rounded-xl bg-white dark:bg-slate-800/50 border border-stone-200 dark:border-stone-700 hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-md transition-all duration-300 group">
                <div className="p-3 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform duration-300">
                  <Icon size={20} />
                </div>
                <div>
                  <p className="text-xs text-stone-500 dark:text-stone-400 font-medium uppercase tracking-wider">
                    {item.label}
                  </p>
                  <p className="text-sm sm:text-base font-medium text-stone-800 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {item.value}
                  </p>
                </div>
              </div>
            )

            if (item.href) {
              return (
                <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer">
                  {content}
                </a>
              )
            }
            return <div key={item.label}>{content}</div>
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 pt-8 border-t border-stone-200 dark:border-stone-700 text-center"
        >
          <p className="text-sm text-stone-500 dark:text-stone-500">
            &copy; {new Date().getFullYear()} Aswin Panta. Built with{' '}
            <span className="text-emerald-500">&hearts;</span> using React & Tailwind CSS.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
