import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Building, Home, Info, Mail, Users, FileText, ClipboardList,
  Bell, Settings, LogOut, ChevronDown, Briefcase, X, UserCheck, Shield,
  MessageSquare, Send,
} from 'lucide-react'
import { useAuth, type UserRole } from '../../context/AuthContext'
import LoadingScreen from '../LoadingScreen'

const BASE = '/recruitment/admin'

interface NavItem {
  label: string
  to?: string
  icon: React.ReactNode
  roles: UserRole[]
  children?: { label: string; to: string; roles: UserRole[] }[]
}

const nav: NavItem[] = [
  { label: 'Dashboard', to: `${BASE}/dashboard`, icon: <LayoutDashboard size={17} />, roles: ['hr', 'admin', 'super_admin'] },
  {
    label: 'Website', icon: <Building size={17} />, roles: ['admin', 'super_admin'],
    children: [
      { label: 'Company Profile', to: `${BASE}/company`, roles: ['admin', 'super_admin'] },
      { label: 'Home Slides', to: `${BASE}/home`, roles: ['admin', 'super_admin'] },
      { label: 'About', to: `${BASE}/about`, roles: ['admin', 'super_admin'] },
      { label: 'Contact Settings', to: `${BASE}/contact-settings`, roles: ['admin', 'super_admin'] },
    ],
  },
  {
    label: 'Recruitment', icon: <ClipboardList size={17} />, roles: ['hr', 'admin', 'super_admin'],
    children: [
      { label: 'Pelamar', to: `${BASE}/applicants`, roles: ['hr', 'admin', 'super_admin'] },
      { label: 'Status Rekrutmen', to: `${BASE}/recruitment-status`, roles: ['hr', 'admin', 'super_admin'] },
    ],
  },
  {
    label: 'Management', icon: <Users size={17} />, roles: ['admin', 'super_admin'],
    children: [
      { label: 'Users', to: `${BASE}/users`, roles: ['admin', 'super_admin'] },
      { label: 'HR', to: `${BASE}/hr`, roles: ['super_admin'] },
      { label: 'Admin', to: `${BASE}/admin-management`, roles: ['super_admin'] },
    ],
  },
  {
    label: 'Komunikasi', icon: <Send size={17} />, roles: ['admin', 'super_admin'],
    children: [
      { label: 'Pesan Kontak', to: `${BASE}/contact-messages`, roles: ['admin', 'super_admin'] },
      { label: 'Notifikasi', to: `${BASE}/notifications`, roles: ['hr', 'admin', 'super_admin'] },
      { label: 'Email', to: `${BASE}/email`, roles: ['super_admin'] },
      { label: 'WhatsApp', to: `${BASE}/whatsapp`, roles: ['super_admin'] },
    ],
  },
  {
    label: 'Sistem', icon: <Shield size={17} />, roles: ['admin', 'super_admin'],
    children: [
      { label: 'Activity Log', to: `${BASE}/activity-logs`, roles: ['admin', 'super_admin'] },
      { label: 'Settings', to: `${BASE}/settings`, roles: ['super_admin'] },
    ],
  },
]

interface Props {
  open: boolean
  onClose: () => void
}

export default function AdminSidebar({ open, onClose }: Props) {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [expanded, setExpanded] = useState<string[]>(['Recruitment'])
  const [loggingOut, setLoggingOut] = useState(false)

  const hasRole = (roles: UserRole[]) => !!user && roles.includes(user.role)

  const toggleExpand = (label: string) => {
    setExpanded(e => e.includes(label) ? e.filter(x => x !== label) : [...e, label])
  }

  const handleLogout = async () => {
    setLoggingOut(true)
    await new Promise(r => setTimeout(r, 600))
    logout()
    navigate('/')
  }

  const sidebar = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-4 py-5 border-b border-white/8 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
            <Briefcase size={15} className="text-white" />
          </div>
          <div>
            <div className="font-display font-bold text-white text-sm leading-tight">Nusantara Maju</div>
            <div className="text-slate-500 text-xs">Admin Panel</div>
          </div>
        </div>
        <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-white">
          <X size={18} />
        </button>
      </div>

      {/* User */}
      <div className="px-4 py-3 border-b border-white/8 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-blue-500/20 shrink-0">
            {user?.profile_photo ? (
              <img src={user.profile_photo} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <UserCheck size={16} className="text-blue-400 m-auto mt-1" />
            )}
          </div>
          <div className="min-w-0">
            <div className="text-white text-xs font-semibold truncate">{user?.name}</div>
            <div className="text-slate-500 text-[10px] uppercase tracking-wider">{user?.role?.replace('_', ' ')}</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
        {nav.map(item => {
          if (!hasRole(item.roles)) return null
          if (item.to) {
            const active = location.pathname === item.to
            return (
              <Link key={item.to} to={item.to} onClick={onClose} className={`admin-sidebar-link ${active ? 'active' : ''}`}>
                {item.icon}
                <span>{item.label}</span>
              </Link>
            )
          }
          const isOpen = expanded.includes(item.label)
          const visibleChildren = item.children?.filter(c => hasRole(c.roles)) || []
          if (!visibleChildren.length) return null
          return (
            <div key={item.label}>
              <button
                onClick={() => toggleExpand(item.label)}
                className="admin-sidebar-link w-full justify-between"
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown size={14} />
                </motion.div>
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden ml-4 mt-1 space-y-0.5"
                  >
                    {visibleChildren.map(child => {
                      const active = location.pathname === child.to
                      return (
                        <Link
                          key={child.to}
                          to={child.to}
                          onClick={onClose}
                          className={`admin-sidebar-link text-xs py-2 pl-3 ${active ? 'active' : ''}`}
                        >
                          <div className="w-1 h-1 rounded-full bg-current shrink-0" />
                          {child.label}
                        </Link>
                      )
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-3 border-t border-white/8 space-y-1 shrink-0">
        <Link to={`${BASE}/profile`} className="admin-sidebar-link" onClick={onClose}>
          <UserCheck size={17} /> Profil Saya
        </Link>
        <button onClick={handleLogout} className="admin-sidebar-link w-full text-red-400/80 hover:text-red-300 hover:bg-red-500/8">
          <LogOut size={17} /> Keluar
        </button>
      </div>
    </div>
  )

  return (
    <>
      <LoadingScreen isLoading={loggingOut} message="Keluar..." />
      {/* Desktop */}
      <aside className="hidden lg:block w-60 shrink-0 bg-navy-light border-r border-white/8 h-screen sticky top-0 overflow-hidden">
        {sidebar}
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 bottom-0 w-60 bg-navy-light border-r border-white/8 z-50 lg:hidden overflow-hidden"
            >
              {sidebar}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
