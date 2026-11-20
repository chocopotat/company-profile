import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, Briefcase, AlertCircle } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import LoadingScreen from '../../components/LoadingScreen'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const res = await login(email, password)
    setLoading(false)
    if (!res.success) { setError(res.message || 'Login gagal'); return }
    const user = JSON.parse(localStorage.getItem('auth_user') || '{}')
    navigate(user.role === 'user' ? '/recruitment/dashboard' : '/recruitment/admin/dashboard', { replace: true })
  }

  return (
    <>
      <LoadingScreen isLoading={loading} message="Memverifikasi akun..." />
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
              <h1 className="font-display font-bold text-white text-3xl mb-1">Masuk Recruitment</h1>
              <p className="text-slate-400 text-sm">Masuk untuk mengakses portal rekrutmen</p>
            </div>

            <div className="glass rounded-2xl p-8 border border-white/10">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 rounded-xl p-3 mb-5 text-red-400 text-sm"
                >
                  <AlertCircle size={16} className="shrink-0" />
                  {error}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">Email</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">Password</label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type={showPass ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-10 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                      placeholder="Password"
                    />
                    <button type="button" onClick={() => setShowPass(s => !s)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                      {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="flex justify-end">
                  <a href="#" className="text-blue-400 text-sm hover:text-blue-300 transition-colors">Lupa Password?</a>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-400 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25"
                >
                  Masuk
                </button>
              </form>

              <div className="mt-5 text-center text-sm text-slate-400">
                Belum punya akun?{' '}
                <Link to="/recruitment/register" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                  Daftar
                </Link>
              </div>

              <div className="mt-5 pt-5 border-t border-white/8">
                <p className="text-slate-500 text-xs text-center mb-2">Demo accounts:</p>
                <div className="space-y-1 text-xs text-slate-500 text-center">
                  <div>user@example.com / admin@example.com / hr@example.com</div>
                  <div className="text-slate-600">password: password</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}
