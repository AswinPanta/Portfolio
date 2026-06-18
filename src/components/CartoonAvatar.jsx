import { motion } from 'framer-motion'

export default function CartoonAvatar() {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      className="relative w-56 h-56 sm:w-64 sm:h-64 mx-auto mb-6"
    >
      <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#14b8a6" />
          </linearGradient>
          <linearGradient id="hoodieGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#065f46" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
        </defs>

        <motion.circle
          cx="120" cy="120" r="105"
          fill="url(#bgGrad)"
          opacity="0.15"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />

        <circle cx="120" cy="100" r="60" fill="#fde68a" />

        <circle cx="120" cy="98" r="56" fill="#fef3c7" />

        <circle cx="100" cy="88" r="7" fill="#1c1917" />
        <circle cx="140" cy="88" r="7" fill="#1c1917" />

        <circle cx="102" cy="86" r="2.5" fill="white" />
        <circle cx="142" cy="86" r="2.5" fill="white" />

        <ellipse cx="96" cy="105" rx="6" ry="4" fill="#fcd34d" opacity="0.5" />
        <ellipse cx="144" cy="105" rx="6" ry="4" fill="#fcd34d" opacity="0.5" />

        <circle cx="120" cy="112" r="7" fill="#fca5a5" opacity="0.6" />

        <path d="M110 122 Q120 132 130 122" stroke="#1c1917" strokeWidth="2.5" fill="none" strokeLinecap="round" />

        <path d="M155 118 Q165 100 170 90" stroke="#1c1917" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M85 118 Q75 100 70 90" stroke="#1c1917" strokeWidth="3" fill="none" strokeLinecap="round" />

        <motion.circle
          cx="170" cy="86" r="5"
          fill="#fde68a"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        <motion.circle
          cx="70" cy="86" r="4"
          fill="#fde68a"
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        />

        <rect x="78" y="120" width="84" height="65" rx="12" fill="url(#hoodieGrad)" />

        <path d="M78 135 Q120 150 162 135" stroke="#047857" strokeWidth="1" fill="none" opacity="0.3" />

        <rect x="82" y="130" width="76" height="8" rx="4" fill="#047857" opacity="0.2" />

        <path d="M100 185 L100 220" stroke="#1c1917" strokeWidth="3" strokeLinecap="round" />
        <path d="M140 185 L140 220" stroke="#1c1917" strokeWidth="3" strokeLinecap="round" />

        <circle cx="100" cy="222" r="5" fill="#1c1917" />
        <circle cx="140" cy="222" r="5" fill="#1c1917" />

        <rect x="168" y="98" width="8" height="12" rx="2" fill="#fcd34d" transform="rotate(-20 168 98)" />
        <rect x="64" y="98" width="8" height="12" rx="2" fill="#fcd34d" transform="rotate(20 64 98)" />

        <motion.text
          x="120" y="60"
          textAnchor="middle"
          fill="#fcd34d"
          fontSize="20"
          fontFamily="system-ui"
          fontWeight="bold"
          animate={{ opacity: [1, 0.3, 1], y: [0, -3, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          &lt;/&gt;
        </motion.text>
      </svg>
    </motion.div>
  )
}
