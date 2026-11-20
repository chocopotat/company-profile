import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, Globe, Share2, Link2, ExternalLink, MessageCircle } from 'lucide-react'

interface FormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

const initForm: FormData = { name: '', email: '', phone: '', subject: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState<FormData>(initForm)
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  const validate = () => {
    const e: Partial<FormData> = {}
    if (!form.name.trim()) e.name = 'Nama wajib diisi'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Email tidak valid'
    if (!form.phone.trim()) e.phone = 'Nomor telepon wajib diisi'
    if (!form.subject.trim()) e.subject = 'Subjek wajib diisi'
    if (form.message.length < 10) e.message = 'Pesan minimal 10 karakter'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('loading')
    await new Promise(r => setTimeout(r, 1200))
    setStatus('success')
    setForm(initForm)
  }

  const field = (name: keyof FormData, label: string, type = 'text', rows?: number) => (
    <div>
      <label className="block text-slate-300 text-sm font-medium mb-2">{label}</label>
      {rows ? (
        <textarea
          value={form[name]}
          onChange={e => setForm(f => ({ ...f, [name]: e.target.value }))}
          rows={rows}
          className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none ${errors[name] ? 'border-red-500/60' : 'border-white/10 focus:border-blue-500/50'}`}
          placeholder={`Masukkan ${label.toLowerCase()}`}
        />
      ) : (
        <input
          type={type}
          value={form[name]}
          onChange={e => setForm(f => ({ ...f, [name]: e.target.value }))}
          className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${errors[name] ? 'border-red-500/60' : 'border-white/10 focus:border-blue-500/50'}`}
          placeholder={`Masukkan ${label.toLowerCase()}`}
        />
      )}
      {errors[name] && <p className="text-red-400 text-xs mt-1">{errors[name]}</p>}
    </div>
  )

  return (
    <div>
      {/* Hero */}
      <div className="relative min-h-[45vh] flex items-end bg-navy overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&h=600&fit=crop&auto=format"
          alt="Contact"
          className="absolute inset-0 w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy to-navy/20" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-blue-400 text-sm font-medium uppercase tracking-widest mb-3">Get In Touch</div>
            <h1 className="font-display font-bold text-white text-5xl md:text-6xl">Hubungi Kami</h1>
          </motion.div>
        </div>
      </div>

      <div className="bg-mesh py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display font-bold text-white text-3xl mb-8">Informasi Kontak</h2>
              <div className="space-y-5 mb-10">
                {[
                  { icon: Mail, label: 'Email', value: 'info@nusantaramaju.co.id' },
                  { icon: Phone, label: 'Telepon', value: '(021) 123-4567' },
                  { icon: MessageCircle, label: 'WhatsApp', value: '+62 812-3456-7890' },
                  { icon: MapPin, label: 'Alamat', value: 'Jl. Sudirman No. 123, Jakarta Pusat 10220' },
                  { icon: Clock, label: 'Jam Kerja', value: 'Senin – Jumat, 08:00 – 17:00 WIB' },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-4 glass rounded-xl p-4 border border-white/8">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/15 flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-blue-400" />
                    </div>
                    <div>
                      <div className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-0.5">{label}</div>
                      <div className="text-white text-sm">{value}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <div className="text-slate-400 text-sm font-medium uppercase tracking-widest mb-4">Social Media</div>
                <div className="flex gap-3">
                  {[
                    { icon: Globe, label: 'Instagram' },
                    { icon: Share2, label: 'Facebook' },
                    { icon: Link2, label: 'LinkedIn' },
                    { icon: ExternalLink, label: 'YouTube' },
                  ].map(({ icon: Icon, label }) => (
                    <a
                      key={label}
                      href="#"
                      className="w-11 h-11 glass rounded-xl flex items-center justify-center border border-white/10 hover:border-blue-500/40 hover:bg-blue-500/10 transition-all group"
                      title={label}
                    >
                      <Icon size={18} className="text-slate-400 group-hover:text-blue-400 transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="glass rounded-2xl p-8 border border-white/10">
                <h2 className="font-display font-bold text-white text-2xl mb-6">Kirim Pesan</h2>

                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-10"
                    >
                      <div className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle size={32} className="text-green-400" />
                      </div>
                      <h3 className="font-display font-bold text-white text-xl mb-2">Pesan Terkirim!</h3>
                      <p className="text-slate-400 text-sm mb-6">Terima kasih atas pesan Anda. Tim kami akan merespons dalam 1×24 jam.</p>
                      <button
                        onClick={() => setStatus('idle')}
                        className="text-blue-400 text-sm hover:text-blue-300 transition-colors"
                      >
                        Kirim pesan lain
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form key="form" onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        {field('name', 'Nama Lengkap')}
                        {field('email', 'Email', 'email')}
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {field('phone', 'Nomor Telepon', 'tel')}
                        {field('subject', 'Subjek')}
                      </div>
                      {field('message', 'Pesan', 'text', 4)}
                      <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-400 disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl transition-all duration-200"
                      >
                        {status === 'loading' ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                              className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                            />
                            Mengirim...
                          </>
                        ) : (
                          <><Send size={16} /> Kirim Pesan</>
                        )}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
