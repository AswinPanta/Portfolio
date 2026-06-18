import { motion } from 'framer-motion'

export default function CartoonIllustration({ variant = 'developer' }) {
  if (variant === 'developer') {
    return (
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="relative w-full h-full min-h-[300px] flex items-center justify-center"
      >
        <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-w-[400px]">
          <defs>
            <linearGradient id="deskGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#34d399" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          <rect x="50" y="200" width="300" height="15" rx="7" fill="#1c1917" opacity="0.1" />

          <rect x="70" y="120" width="260" height="80" rx="8" fill="url(#deskGrad)" stroke="#34d399" strokeWidth="1.5" strokeOpacity="0.3" />

          <rect x="80" y="130" width="80" height="50" rx="4" fill="#1e293b" />
          <rect x="83" y="133" width="74" height="44" rx="2" fill="#0f172a" />

          <motion.rect
            x="88" y="138" width="64" height="34" rx="2"
            fill="#34d399" opacity="0.8"
            animate={{ opacity: [0.8, 0.4, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <rect x="88" y="138" width="12" height="34" rx="1" fill="#065f46" opacity="0.5" />
          <rect x="105" y="145" width="20" height="20" rx="1" fill="#fcd34d" opacity="0.7" />

          <rect x="170" y="135" width="140" height="10" rx="3" fill="#fcd34d" opacity="0.6" />
          <rect x="170" y="150" width="120" height="8" rx="3" fill="#fcd34d" opacity="0.4" />
          <rect x="170" y="163" width="100" height="8" rx="3" fill="#fcd34d" opacity="0.3" />

          <rect x="170" y="178" width="30" height="8" rx="3" fill="#34d399" opacity="0.5" />
          <rect x="205" y="178" width="30" height="8" rx="3" fill="#fcd34d" opacity="0.4" />
          <rect x="240" y="178" width="30" height="8" rx="3" fill="#f87171" opacity="0.4" />

          <motion.circle
            cx="310" cy="140" r="8"
            fill="#fcd34d"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />

          <motion.circle
            cx="335" cy="155" r="5"
            fill="#34d399"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: 0.3 }}
          />

          <motion.circle
            cx="320" cy="172" r="3"
            fill="#f87171"
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 1.3, repeat: Infinity, delay: 0.6 }}
          />

          <motion.rect
            x="245" y="135" rx="2"
            width="8" height="12"
            fill="#34d399" opacity="0.5"
            animate={{ height: [12, 30, 12] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
          <motion.rect
            x="257" y="145" rx="2"
            width="8" height="20"
            fill="#fcd34d" opacity="0.5"
            animate={{ height: [20, 35, 20] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
          />
          <motion.rect
            x="269" y="140" rx="2"
            width="8" height="25"
            fill="#f87171" opacity="0.5"
            animate={{ height: [25, 15, 25] }}
            transition={{ duration: 1.4, repeat: Infinity, delay: 0.5 }}
          />

          <motion.path
            d="M50 210 Q100 220 200 215 Q300 210 350 220"
            stroke="#34d399" strokeWidth="2"
            fill="none" opacity="0.3"
            animate={{ d: ['M50 210 Q100 220 200 215 Q300 210 350 220', 'M50 220 Q100 210 200 218 Q300 225 350 215'] }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          <motion.text
            x="200" y="105" textAnchor="middle"
            fill="#34d399" fontSize="14" fontFamily="monospace" fontWeight="bold"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {'{ code }'}
          </motion.text>
        </svg>
      </motion.div>
    )
  }

  return null
}
