import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { AuthProvider, useAuth } from './context/AuthContext'

import PublicLayout from './layouts/PublicLayout'
import AdminLayout from './layouts/AdminLayout'

import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import RecruitmentPage from './pages/recruitment/RecruitmentPage'

import Login from './pages/recruitment/Login'
import Register from './pages/recruitment/Register'
import UserDashboard from './pages/recruitment/Dashboard'

import AdminDashboard from './pages/admin/Dashboard'
import Applicants from './pages/admin/Applicants'
import Users from './pages/admin/Users'
import Company from './pages/admin/Company'
import ContactMessages from './pages/admin/ContactMessages'
import Settings from './pages/admin/Settings'
import ActivityLogs from './pages/admin/ActivityLogs'
import GenericPage from './pages/admin/GenericPage'

function ProtectedUser({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useAuth()
  if (!isAuthenticated) return <Navigate to="/recruitment/login" replace />
  if (user && user.role !== 'user') return <Navigate to="/recruitment/admin/dashboard" replace />
  return <>{children}</>
}

function ProtectedAdmin({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useAuth()
  if (!isAuthenticated) return <Navigate to="/recruitment/login" replace />
  if (user && user.role === 'user') return <Navigate to="/recruitment/dashboard" replace />
  return <>{children}</>
}

function AuthRedirect({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useAuth()
  if (isAuthenticated) {
    return <Navigate to={user?.role === 'user' ? '/recruitment/dashboard' : '/recruitment/admin/dashboard'} replace />
  }
  return <>{children}</>
}

function AppRoutes() {
  const location = useLocation()

  return (
    <Routes location={location} key={location.pathname}>
      {/* Public */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/recruitment" element={<RecruitmentPage />} />
      </Route>

      {/* Auth */}
      <Route path="/recruitment/login" element={<AuthRedirect><Login /></AuthRedirect>} />
      <Route path="/recruitment/register" element={<AuthRedirect><Register /></AuthRedirect>} />

      {/* User dashboard */}
      <Route path="/recruitment/dashboard" element={<ProtectedUser><UserDashboard /></ProtectedUser>} />

      {/* Admin panel */}
      <Route path="/recruitment/admin" element={<ProtectedAdmin><AdminLayout /></ProtectedAdmin>}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="company" element={<Company />} />
        <Route path="home" element={<GenericPage title="Home Slides" description="Kelola hero slider dan konten halaman beranda" />} />
        <Route path="about" element={<GenericPage title="About Management" description="Kelola konten halaman tentang perusahaan" />} />
        <Route path="contact-settings" element={<GenericPage title="Contact Settings" description="Kelola informasi kontak dan peta" />} />
        <Route path="applicants" element={<Applicants />} />
        <Route path="applicants/:id" element={<GenericPage title="Detail Pelamar" description="Lihat detail lengkap informasi pelamar" />} />
        <Route path="recruitment-status" element={<GenericPage title="Status Rekrutmen" description="Kelola perubahan status rekrutmen" />} />
        <Route path="users" element={<Users />} />
        <Route path="hr" element={<GenericPage title="Manajemen HR" description="Kelola akun HR" />} />
        <Route path="admin-management" element={<GenericPage title="Manajemen Admin" description="Kelola akun admin (Super Admin only)" />} />
        <Route path="contact-messages" element={<ContactMessages />} />
        <Route path="notifications" element={<GenericPage title="Notifikasi" description="Pusat notifikasi sistem" />} />
        <Route path="email" element={<GenericPage title="Email" description="Riwayat email terkirim" />} />
        <Route path="whatsapp" element={<GenericPage title="WhatsApp" description="Riwayat pesan WhatsApp" />} />
        <Route path="activity-logs" element={<ActivityLogs />} />
        <Route path="settings" element={<Settings />} />
        <Route path="profile" element={<GenericPage title="Profil Saya" description="Kelola informasi profil Anda" />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}
