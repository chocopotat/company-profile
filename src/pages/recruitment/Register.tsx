import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Mail, Lock, Eye, EyeOff, Briefcase, AlertCircle, CheckCircle } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import LoadingScreen from '../../components/LoadingScreen'

export default function Register() {
  const [form, setForm] = useState({ name: '', username: '', email: '', password: '', confirm: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirm) { setError('Password tidak cocok'); return }
    if (form.password.length < 8) { setError('Password minimal 8 karakter'); return }
    setLoading(true)
    const res = await register({ name: form.name, username: form.username, email: form.email, password: form.password })
    setLoading(false)
    if (!res.success) { setError(res.message || 'Registrasi gagal'); return }
    setSuccess(true)
    setTimeout(() => navigate('/recruitment/login'), 2500)
  }

  const f = (key: keyof typeof form, label: string, type = 'text', icon: React.ReactNode) => (
    <div>
      <label className="block text-slate-300 text-sm font-medium mb-2">{label}</label>
      <div className="relative">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">{icon}</div>
        <input
          type={type}
          value={form[key]}
          onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
          required
          className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
          placeholder={`Masukkan ${label.toLowerCase()}`}
        />
      </div>
    </div>
  )

  return (
    <>
      <LoadingScreen isLoading={loading} message="Membuat akun..." />
      <div className="min-h-screen bg-mesh flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-2xl bg-blue-500 flex items-center justify-center mx-auto mb-4">
                <Briefcase size={26} className="text-white" />
              </div>
              <h1 className="font-display font-bold text-white text-3xl mb-1">Buat Akun</h1>
              <p className="text-slate-400 text-sm">Daftar untuk melamar pekerjaan</p>
            </div>

            <div className="glass rounded-2xl p-8 border border-white/10">
              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={32} className="text-green-400" />
                    </div>
                    <h3 className="font-display font-bold text-white text-xl mb-2">Registrasi Berhasil!</h3>
                    <p className="text-slate-400 text-sm">Akun Anda telah dibuat. Mengalihkan ke halaman login...</p>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                      <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-red-400 text-sm">
                        <AlertCircle size={16} className="shrink-0" />
                        {error}
                      </div>
                    )}
                    {f('name', 'Nama Lengkap', 'text', <User size={16} />)}
                    {f('username', 'Username', 'text', <User size={16} />)}
                    {f('email', 'Email', 'email', <Mail size={16} />)}
                    <div>
                      <label className="block text-slate-300 text-sm font-medium mb-2">Password</label>
                      <div className="relative">
                        <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                          type={showPass ? 'text' : 'password'}
                          value={form.password}
                          onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                          required
                          className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-10 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                          placeholder="Minimal 8 karakter"
                        />
                        <button type="button" onClick={() => setShowPass(s => !s)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                          {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                    {f('confirm', 'Konfirmasi Password', 'password', <Lock size={16} />)}
                    <button type="submit" className="w-full bg-blue-500 hover:bg-blue-400 text-white font-semibold py-3.5 rounded-xl transition-all">
                      Daftar Sekarang
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>

              {!success && (
                <div className="mt-5 text-center text-sm text-slate-400">
                  Sudah punya akun?{' '}
                  <Link to="/recruitment/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                    Masuk
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}
