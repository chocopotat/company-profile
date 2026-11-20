import { useState } from 'react'
import { motion } from 'framer-motion'
import { Settings as SettingsIcon, Globe, Mail, MessageCircle, Users, Save } from 'lucide-react'

type Tab = 'general' | 'email' | 'whatsapp' | 'recruitment'

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: 'general', label: 'Umum', icon: <Globe size={15} /> },
  { id: 'email', label: 'Email', icon: <Mail size={15} /> },
  { id: 'whatsapp', label: 'WhatsApp', icon: <MessageCircle size={15} /> },
  { id: 'recruitment', label: 'Rekrutmen', icon: <Users size={15} /> },
]

export default function Settings() {
  const [tab, setTab] = useState<Tab>('general')
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const inputClass = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all"
  const labelClass = "block text-slate-300 text-sm font-medium mb-2"

  return (
    <div className="space-y-5 max-w-3xl">
      <div>
        <h2 className="font-display font-bold text-white text-xl">Pengaturan Sistem</h2>
        <p className="text-slate-400 text-sm">Kelola konfigurasi aplikasi</p>
      </div>

      <div className="flex gap-1 glass rounded-xl p-1.5 border border-white/8 w-fit flex-wrap">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              tab === t.id ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:text-white'
            }`}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      <motion.div
        key={tab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="glass rounded-2xl p-6 border border-white/8 space-y-5"
      >
        {tab === 'general' && (
          <>
            <h3 className="font-display font-semibold text-white text-base border-b border-white/8 pb-3">Pengaturan Umum</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className={labelClass}>Nama Situs</label><input className={inputClass} defaultValue="PT. Nusantara Maju" /></div>
              <div><label className={labelClass}>Tagline</label><input className={inputClass} defaultValue="Modern Solutions, Professional Excellence" /></div>
            </div>
            <div><label className={labelClass}>Deskripsi</label><textarea rows={3} className={inputClass + ' resize-none'} defaultValue="Perusahaan teknologi terdepan yang berkomitmen menghadirkan solusi inovatif." /></div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Logo</label>
                <div className="border-2 border-dashed border-white/15 rounded-xl p-4 text-center text-slate-500 text-sm cursor-pointer hover:border-blue-500/40 transition-all">
                  Upload Logo (PNG/SVG)
                </div>
              </div>
              <div>
                <label className={labelClass}>Favicon</label>
                <div className="border-2 border-dashed border-white/15 rounded-xl p-4 text-center text-slate-500 text-sm cursor-pointer hover:border-blue-500/40 transition-all">
                  Upload Favicon (ICO/PNG)
                </div>
              </div>
            </div>
          </>
        )}

        {tab === 'email' && (
          <>
            <h3 className="font-display font-semibold text-white text-base border-b border-white/8 pb-3">Konfigurasi Email</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className={labelClass}>SMTP Host</label><input className={inputClass} defaultValue="smtp.mailtrap.io" /></div>
              <div><label className={labelClass}>SMTP Port</label><input className={inputClass} defaultValue="2525" type="number" /></div>
              <div><label className={labelClass}>SMTP Username</label><input className={inputClass} defaultValue="username@mailtrap.io" /></div>
              <div><label className={labelClass}>From Email</label><input className={inputClass} defaultValue="noreply@nusantaramaju.co.id" /></div>
            </div>
            <div className="bg-blue-500/8 border border-blue-500/20 rounded-xl p-3 text-blue-300 text-xs">
              Password SMTP tidak ditampilkan untuk alasan keamanan. Kosongkan jika tidak ingin mengubah.
            </div>
            <div><label className={labelClass}>SMTP Password</label><input type="password" className={inputClass} placeholder="••••••••••••" /></div>
          </>
        )}

        {tab === 'whatsapp' && (
          <>
            <h3 className="font-display font-semibold text-white text-base border-b border-white/8 pb-3">Konfigurasi WhatsApp</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className={labelClass}>Provider</label>
                <select className={inputClass}>
                  <option className="bg-navy-light">Fonnte</option>
                  <option className="bg-navy-light">WA Gateway</option>
                  <option className="bg-navy-light">Twilio</option>
                </select>
              </div>
              <div><label className={labelClass}>Nomor WhatsApp Perusahaan</label><input className={inputClass} defaultValue="+62 812-3456-7890" /></div>
            </div>
            <div><label className={labelClass}>API URL</label><input className={inputClass} defaultValue="https://api.fonnte.com/send" /></div>
            <div className="bg-yellow-500/8 border border-yellow-500/20 rounded-xl p-3 text-yellow-300 text-xs">
              API Token tidak pernah dikirim ke frontend. Nilai disimpan terenkripsi di server.
            </div>
            <div><label className={labelClass}>API Token</label><input type="password" className={inputClass} placeholder="Masukkan API token baru untuk memperbarui" /></div>
          </>
        )}

        {tab === 'recruitment' && (
          <>
            <h3 className="font-display font-semibold text-white text-base border-b border-white/8 pb-3">Pengaturan Rekrutmen</h3>
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <div>
                <div className="text-white text-sm font-medium">Rekrutmen Dibuka</div>
                <div className="text-slate-400 text-xs">Aktifkan/nonaktifkan penerimaan lamaran</div>
              </div>
              <button className="w-11 h-6 bg-blue-500 rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1 shadow transition-all" />
              </button>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className={labelClass}>Maks. Ukuran CV (MB)</label><input type="number" className={inputClass} defaultValue={5} /></div>
              <div><label className={labelClass}>Maks. Ukuran Foto (MB)</label><input type="number" className={inputClass} defaultValue={2} /></div>
            </div>
            <div><label className={labelClass}>Tipe File Diizinkan</label><input className={inputClass} defaultValue="pdf,jpg,jpeg,png" /></div>
          </>
        )}

        <div className="flex justify-end pt-2">
          <button
            onClick={handleSave}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium text-sm transition-all ${
              saved ? 'bg-green-500 text-white' : 'bg-blue-500 hover:bg-blue-400 text-white'
            }`}
          >
            <Save size={15} />
            {saved ? 'Tersimpan!' : 'Simpan Pengaturan'}
          </button>
        </div>
      </motion.div>
    </div>
  )
}
