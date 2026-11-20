import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, Bell } from 'lucide-react'
import AdminSidebar from '../components/admin/AdminSidebar'
import { useAuth } from '../context/AuthContext'

const pageTitles: Record<string, string> = {
  '/recruitment/admin/dashboard': 'Dashboard',
  '/recruitment/admin/company': 'Company Profile',
  '/recruitment/admin/home': 'Home Slides',
  '/recruitment/admin/about': 'About Management',
  '/recruitment/admin/contact-settings': 'Contact Settings',
  '/recruitment/admin/applicants': 'Pelamar',
  '/recruitment/admin/recruitment-status': 'Status Rekrutmen',
  '/recruitment/admin/users': 'Manajemen User',
  '/recruitment/admin/hr': 'Manajemen HR',
  '/recruitment/admin/admin-management': 'Manajemen Admin',
  '/recruitment/admin/contact-messages': 'Pesan Kontak',
  '/recruitment/admin/notifications': 'Notifikasi',
  '/recruitment/admin/activity-logs': 'Activity Log',
  '/recruitment/admin/settings': 'Pengaturan',
  '/recruitment/admin/profile': 'Profil Saya',
}

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const { user } = useAuth()

  const title = pageTitles[location.pathname] || 'Admin Panel'

  return (
    <div className="flex h-screen bg-navy overflow-hidden">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <div className="glass-dark border-b border-white/8 px-5 h-14 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-slate-400 hover:text-white transition-colors"
            >
              <Menu size={20} />
            </button>
            <h1 className="font-display font-semibold text-white text-base">{title}</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative text-slate-400 hover:text-white transition-colors">
              <Bell size={18} />
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-400 rounded-full" />
            </button>
            <div className="w-7 h-7 rounded-full overflow-hidden bg-blue-500/20">
              {user?.profile_photo ? (
                <img src={user.profile_photo} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-blue-400 text-xs font-bold">
                  {user?.name?.[0]}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="p-5 md:p-7 min-h-full"
          >
            <Outlet />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
