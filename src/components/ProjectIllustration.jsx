import { motion } from 'framer-motion'

const illustrations = {
  potato: (
    <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-24 h-20 sm:w-32 sm:h-24">
      <motion.ellipse cx="100" cy="75" rx="45" ry="35" fill="#fde68a"
        animate={{ rx: [45, 47, 45] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <ellipse cx="100" cy="75" rx="40" ry="30" fill="#fef3c7" />
      <circle cx="85" cy="65" r="3" fill="#1c1917" opacity="0.3" />
      <circle cx="108" cy="70" r="2" fill="#1c1917" opacity="0.2" />
      <circle cx="95" cy="80" r="2.5" fill="#1c1917" opacity="0.25" />

      <motion.path d="M60 55 Q55 35 70 30" stroke="#34d399" strokeWidth="3" strokeLinecap="round" fill="none"
        animate={{ pathLength: [0, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
      />
      <motion.circle cx="70" cy="28" r="4" fill="#34d399"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />

      <path d="M50 72 Q30 70 35 60" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" fill="none" />

      <motion.text x="100" y="115" textAnchor="middle" fill="#34d399" fontSize="11" fontFamily="monospace" fontWeight="bold"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        95% ACC
      </motion.text>
    </svg>
  ),
  voting: (
    <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-24 h-20 sm:w-32 sm:h-24">
      <motion.rect x="55" y="30" width="90" height="85" rx="10" fill="#1e293b"
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <rect x="60" y="35" width="80" height="75" rx="6" fill="#0f172a" />
      <motion.rect x="70" y="45" width="60" height="8" rx="3" fill="#fcd34d" opacity="0.7"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <rect x="70" y="58" width="40" height="6" rx="2" fill="#34d399" opacity="0.5" />
      <rect x="70" y="68" width="50" height="6" rx="2" fill="#34d399" opacity="0.4" />
      <rect x="70" y="78" width="35" height="6" rx="2" fill="#f87171" opacity="0.5" />

      <motion.rect x="85" y="92" width="30" height="15" rx="4" fill="#34d399"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <path d="M95 99 L99 103 L105 95" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

      <motion.circle cx="155" cy="30" r="6" fill="#34d399"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </svg>
  ),
  wallpaper: (
    <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-24 h-20 sm:w-32 sm:h-24">
      <motion.rect x="45" y="25" width="110" height="90" rx="8" fill="#1e293b"
        animate={{ rotate: [0, 2, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <rect x="50" y="30" width="100" height="80" rx="4" fill="#0f172a" />
      <rect x="58" y="38" width="84" height="44" rx="3" fill="#fcd34d" opacity="0.2" />

      <motion.circle cx="100" cy="60" r="12" fill="#34d399" opacity="0.6"
        animate={{ r: [12, 14, 12] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <circle cx="100" cy="60" r="6" fill="#fcd34d" opacity="0.5" />
      <circle cx="100" cy="60" r="2" fill="white" opacity="0.8" />

      <rect x="65" y="78" width="12" height="12" rx="1" fill="#34d399" opacity="0.4" />
      <rect x="82" y="78" width="12" height="12" rx="1" fill="#f87171" opacity="0.4" />
      <rect x="99" y="78" width="12" height="12" rx="1" fill="#fcd34d" opacity="0.4" />
      <rect x="116" y="78" width="12" height="12" rx="1" fill="#a78bfa" opacity="0.4" />
    </svg>
  ),
  gamepad: (
    <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-24 h-20 sm:w-32 sm:h-24">
      <motion.g
        animate={{ rotate: [-3, 3, -3] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <rect x="55" y="50" width="90" height="55" rx="15" fill="#1e293b" />
        <rect x="60" y="55" width="80" height="45" rx="12" fill="#0f172a" />

        <motion.circle cx="85" cy="78" r="8" fill="#34d399"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <circle cx="115" cy="78" r="8" fill="#f87171" />
        <motion.circle cx="115" cy="78" r="8" fill="#f87171"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.75 }}
        />

        <rect x="95" y="72" width="10" height="12" rx="2" fill="#fcd34d" />

        <path d="M70 35 L75 50" stroke="#1e293b" strokeWidth="5" strokeLinecap="round" />
        <path d="M130 35 L125 50" stroke="#1e293b" strokeWidth="5" strokeLinecap="round" />
      </motion.g>

      <motion.circle cx="30" cy="65" r="6" fill="#34d399" opacity="0.4"
        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 1.8, repeat: Infinity, delay: 0.3 }}
      />
      <motion.circle cx="170" cy="55" r="5" fill="#fcd34d" opacity="0.4"
        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 1.8, repeat: Infinity, delay: 0.9 }}
      />
    </svg>
  ),
  treasure: (
    <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-24 h-20 sm:w-32 sm:h-24">
      <motion.path d="M40 100 Q100 60 160 100" stroke="#1e293b" strokeWidth="3" fill="none"
        animate={{ d: ['M40 100 Q100 60 160 100', 'M40 95 Q100 55 160 95'] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      <motion.rect x="85" y="45" width="30" height="35" rx="4" fill="#fcd34d"
        animate={{ rotate: [0, 5, 0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <rect x="88" y="48" width="24" height="29" rx="3" fill="#fbbf24" />
      <rect x="90" y="50" width="20" height="25" rx="2" fill="#f59e0b" />

      <path d="M95 45 L95 40 L105 40 L105 45" stroke="#fcd34d" strokeWidth="3" strokeLinecap="round" />

      <motion.circle cx="100" cy="62" r="4" fill="#f87171"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />

      <motion.circle cx="50" cy="70" r="6" fill="#fcd34d" opacity="0.4"
        animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
      />
      <motion.circle cx="150" cy="75" r="4" fill="#fcd34d" opacity="0.3"
        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      <motion.rect x="120" y="80" width="40" height="20" rx="3" fill="#1e293b" opacity="0.8"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      />
      <rect x="123" y="83" width="8" height="14" rx="1" fill="#34d399" />
      <rect x="134" y="83" width="8" height="14" rx="1" fill="#f87171" />
      <rect x="145" y="83" width="8" height="14" rx="1" fill="#fcd34d" />
    </svg>
  ),
}

export default function ProjectIllustration({ name }) {
  return illustrations[name] || null
}
