import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, Info, Mail, Users } from 'lucide-react'

const items = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/about', label: 'About', icon: Info },
  { to: '/contact', label: 'Contact', icon: Mail },
  { to: '/recruitment', label: 'Recruit', icon: Users },
]

export default function BottomNavbar() {
  const location = useLocation()

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
      <div className="glass-dark rounded-2xl px-2 py-2 shadow-2xl shadow-black/40">
        <div className="flex items-center justify-around">
          {items.map(({ to, label, icon: Icon }) => {
            const active = location.pathname === to
            return (
              <Link key={to} to={to} className="relative flex flex-col items-center gap-1 px-4 py-1.5">
                {active && (
                  <motion.div
                    layoutId="bottom-active"
                    className="absolute inset-0 bg-blue-500/20 rounded-xl border border-blue-500/30"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <motion.div
                  animate={{ scale: active ? 1.1 : 1, y: active ? -1 : 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  <Icon size={20} className={active ? 'text-blue-400' : 'text-slate-400'} />
                </motion.div>
                <span className={`text-[10px] font-medium ${active ? 'text-blue-400' : 'text-slate-500'}`}>
                  {label}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
