import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import { CheckCircle, Clock, FileText, Upload, User, LogOut, Bell, ChevronRight, AlertCircle } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import LoadingScreen from '../../components/LoadingScreen'

const STATUSES = ['Submitted', 'Under Review', 'Interview', 'Accepted']

const statusColors: Record<string, string> = {
  Submitted: 'status-submitted',
  'Under Review': 'status-review',
  Interview: 'status-interview',
  Accepted: 'status-accepted',
  Rejected: 'status-rejected',
}

interface AppForm {
  fullName: string; nik: string; email: string; phone: string; address: string;
  cv: File | null; letter: File | null; photo: File | null;
}

const initApp: AppForm = { fullName: '', nik: '', email: '', phone: '', address: '', cv: null, letter: null, photo: null }

export default function UserDashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [hasApplied, setHasApplied] = useState(false)
  const [currentStatus] = useState('Under Review')
  const [view, setView] = useState<'dashboard' | 'form'>('dashboard')
  const [form, setForm] = useState<AppForm>(initApp)
  const [submitting, setSubmitting] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof AppForm, string>>>({})

  const handleLogout = async () => {
    setLoggingOut(true)
    await new Promise(r => setTimeout(r, 600))
    logout()
    navigate('/')
  }

  const validate = () => {
    const e: Partial<Record<keyof AppForm, string>> = {}
    if (!form.fullName.trim()) e.fullName = 'Nama wajib diisi'
    if (!form.nik.trim()) e.nik = 'NIK wajib diisi'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Email tidak valid'
    if (!form.phone.trim()) e.phone = 'Nomor HP wajib diisi'
    if (!form.address.trim()) e.address = 'Alamat wajib diisi'
    if (!form.cv) e.cv = 'CV wajib diupload'
    if (!form.letter) e.letter = 'Surat lamaran wajib diupload'
    if (!form.photo) e.photo = 'Foto wajib diupload'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    await new Promise(r => setTimeout(r, 1500))
    setSubmitting(false)
    setHasApplied(true)
    setView('dashboard')
  }

  const currentStep = STATUSES.indexOf(currentStatus)

  return (
    <>
      <LoadingScreen isLoading={submitting} message="Mengirim lamaran..." />
      <LoadingScreen isLoading={loggingOut} message="Keluar..." />
      <div className="min-h-screen bg-mesh">
        {/* Topbar */}
        <div className="glass-dark border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-blue-500/20">
              {user?.profile_photo ? (
                <img src={user.profile_photo} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <User size={18} className="text-blue-400 m-auto mt-1" />
              )}
            </div>
            <div>
              <div className="text-white text-sm font-semibold">Selamat datang, {user?.name}</div>
              <div className="text-slate-400 text-xs">{user?.email}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-slate-400 hover:text-white transition-colors">
              <Bell size={18} />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-slate-400 hover:text-red-400 transition-colors text-sm"
            >
              <LogOut size={16} /> Keluar
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-10">
          <AnimatePresence mode="wait">
            {view === 'dashboard' ? (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <h1 className="font-display font-bold text-white text-3xl mb-8">Dashboard Pelamar</h1>

                {!hasApplied ? (
                  <div className="glass rounded-2xl p-10 border border-white/10 text-center">
                    <div className="w-16 h-16 rounded-full bg-blue-500/15 border border-blue-500/30 flex items-center justify-center mx-auto mb-4">
                      <FileText size={28} className="text-blue-400" />
                    </div>
                    <h3 className="font-display font-bold text-white text-xl mb-2">Belum Ada Lamaran</h3>
                    <p className="text-slate-400 text-sm mb-6">Anda belum mengajukan lamaran. Mulai lamar sekarang!</p>
                    <button
                      onClick={() => setView('form')}
                      className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white font-semibold px-6 py-3 rounded-xl transition-all"
                    >
                      Lamar Sekarang <ChevronRight size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Application Card */}
                    <div className="glass rounded-2xl p-6 border border-white/10">
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <h3 className="font-display font-semibold text-white text-lg">Status Lamaran</h3>
                          <p className="text-slate-400 text-sm">Disubmit pada 11 Agustus 2026</p>
                        </div>
                        <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${statusColors[currentStatus]}`}>
                          {currentStatus}
                        </span>
                      </div>

                      {/* Timeline */}
                      <div className="flex items-start gap-0 mb-6 overflow-x-auto">
                        {STATUSES.map((s, i) => {
                          const done = i <= currentStep
                          const active = i === currentStep
                          return (
                            <div key={s} className="flex items-center flex-1 min-w-0">
                              <div className="flex flex-col items-center">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                                  done ? 'bg-blue-500 border-blue-500' : 'bg-navy border-white/20'
                                } ${active ? 'shadow-lg shadow-blue-500/40' : ''}`}>
                                  {done ? <CheckCircle size={14} className="text-white" /> : <Clock size={14} className="text-slate-500" />}
                                </div>
                                <span className={`text-xs mt-2 text-center font-medium ${done ? 'text-blue-400' : 'text-slate-500'}`}>
                                  {s}
                                </span>
                              </div>
                              {i < STATUSES.length - 1 && (
                                <div className={`flex-1 h-0.5 mb-5 mx-1 ${i < currentStep ? 'bg-blue-500' : 'bg-white/10'}`} />
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {/* Documents */}
                    <div className="glass rounded-2xl p-6 border border-white/10">
                      <h3 className="font-display font-semibold text-white mb-4">Dokumen Terkirim</h3>
                      <div className="space-y-3">
                        {[
                          { label: 'Curriculum Vitae', type: 'PDF' },
                          { label: 'Surat Lamaran', type: 'PDF' },
                          { label: 'Foto', type: 'JPG' },
                        ].map(doc => (
                          <div key={doc.label} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                            <div className="flex items-center gap-3">
                              <FileText size={16} className="text-blue-400" />
                              <span className="text-white text-sm">{doc.label}</span>
                              <span className="text-slate-500 text-xs">{doc.type}</span>
                            </div>
                            <CheckCircle size={16} className="text-green-400" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Profile card */}
                <div className="glass rounded-2xl p-6 border border-white/10 mt-6">
                  <h3 className="font-display font-semibold text-white mb-4 flex items-center gap-2">
                    <User size={18} className="text-blue-400" /> Profil Akun
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    {[
                      { label: 'Nama', value: user?.name },
                      { label: 'Email', value: user?.email },
                      { label: 'Telepon', value: user?.phone || '-' },
                      { label: 'Role', value: user?.role },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <div className="text-slate-500 text-xs uppercase tracking-wider mb-1">{label}</div>
                        <div className="text-white">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <Link to="/" className="text-slate-400 hover:text-white text-sm transition-colors">
                    ← Kembali ke Website
                  </Link>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <button onClick={() => setView('dashboard')} className="text-slate-400 hover:text-white transition-colors">←</button>
                  <h1 className="font-display font-bold text-white text-3xl">Form Lamaran</h1>
                </div>

                <div className="glass rounded-2xl p-8 border border-white/10">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      {([
                        ['fullName', 'Nama Lengkap'],
                        ['nik', 'NIK'],
                        ['email', 'Email'],
                        ['phone', 'No. HP / WhatsApp'],
                      ] as [keyof AppForm, string][]).map(([key, label]) => (
                        <div key={key}>
                          <label className="block text-slate-300 text-sm font-medium mb-2">{label}</label>
                          <input
                            type="text"
                            value={form[key] as string}
                            onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                            className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${errors[key] ? 'border-red-500/60' : 'border-white/10'}`}
                            placeholder={label}
                          />
                          {errors[key] && <p className="text-red-400 text-xs mt-1">{errors[key]}</p>}
                        </div>
                      ))}
                    </div>
                    <div>
                      <label className="block text-slate-300 text-sm font-medium mb-2">Alamat</label>
                      <textarea
                        value={form.address}
                        onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                        rows={3}
                        className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none transition-all ${errors.address ? 'border-red-500/60' : 'border-white/10'}`}
                        placeholder="Alamat lengkap"
                      />
                      {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address}</p>}
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                      {([
                        ['cv', 'CV (PDF)', '.pdf'],
                        ['letter', 'Surat Lamaran (PDF)', '.pdf'],
                        ['photo', 'Foto (JPG/PNG)', '.jpg,.jpeg,.png'],
                      ] as [keyof AppForm, string, string][]).map(([key, label, accept]) => (
                        <div key={key}>
                          <label className="block text-slate-300 text-sm font-medium mb-2">{label}</label>
                          <label className={`flex flex-col items-center justify-center gap-2 h-24 border-2 border-dashed rounded-xl cursor-pointer transition-all hover:border-blue-500/50 hover:bg-blue-500/5 ${errors[key] ? 'border-red-500/60' : 'border-white/15'}`}>
                            <Upload size={20} className="text-slate-400" />
                            <span className="text-slate-400 text-xs text-center">
                              {(form[key] as File | null)?.name || 'Upload file'}
                            </span>
                            <input
                              type="file"
                              accept={accept}
                              className="hidden"
                              onChange={e => setForm(f => ({ ...f, [key]: e.target.files?.[0] || null }))}
                            />
                          </label>
                          {errors[key] && <p className="text-red-400 text-xs mt-1">{errors[key]}</p>}
                        </div>
                      ))}
                    </div>

                    <div className="flex items-start gap-3 bg-blue-500/8 border border-blue-500/20 rounded-xl p-4">
                      <AlertCircle size={16} className="text-blue-400 shrink-0 mt-0.5" />
                      <p className="text-slate-300 text-sm leading-relaxed">
                        Pastikan semua dokumen yang Anda upload sudah benar. Lamaran yang telah disubmit tidak dapat diubah.
                      </p>
                    </div>

                    <div className="flex gap-4">
                      <button type="button" onClick={() => setView('dashboard')} className="flex-1 glass border border-white/20 text-white font-medium py-3.5 rounded-xl transition-all hover:bg-white/10">
                        Batal
                      </button>
                      <button type="submit" className="flex-1 bg-blue-500 hover:bg-blue-400 text-white font-semibold py-3.5 rounded-xl transition-all">
                        Kirim Lamaran
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  )
}
