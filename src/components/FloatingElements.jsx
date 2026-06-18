import { motion } from 'framer-motion'

const elements = [
  {
    icon: '✦',
    size: 'text-lg',
    position: 'top-[10%] left-[8%]',
    color: 'text-emerald-400/30 dark:text-emerald-400/20',
    delay: 0,
  },
  {
    icon: '●',
    size: 'text-2xl',
    position: 'top-[20%] right-[12%]',
    color: 'text-teal-400/25 dark:text-teal-400/15',
    delay: 1,
  },
  {
    icon: '◆',
    size: 'text-xl',
    position: 'bottom-[25%] left-[5%]',
    color: 'text-amber-400/25 dark:text-amber-400/15',
    delay: 2,
  },
  {
    icon: '⬡',
    size: 'text-lg',
    position: 'bottom-[15%] right-[8%]',
    color: 'text-emerald-400/20 dark:text-emerald-400/10',
    delay: 0.5,
  },
  {
    icon: '+',
    size: 'text-xl',
    position: 'top-[40%] left-[3%]',
    color: 'text-teal-400/20 dark:text-teal-400/10',
    delay: 1.5,
  },
  {
    icon: '◇',
    size: 'text-base',
    position: 'top-[60%] right-[5%]',
    color: 'text-emerald-400/25 dark:text-emerald-400/15',
    delay: 3,
  },
]

export default function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      {elements.map((el, i) => (
        <motion.span
          key={i}
          className={`absolute ${el.position} ${el.size} ${el.color}`}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            rotate: [0, 10, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            delay: el.delay,
            ease: 'easeInOut',
          }}
        >
          {el.icon}
        </motion.span>
      ))}
    </div>
  )
}
