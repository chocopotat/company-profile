import { useState } from 'react'
import { Save, Building, Upload } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Company() {
  const [saved, setSaved] = useState(false)
  const inputClass = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all"
  const labelClass = "block text-slate-300 text-sm font-medium mb-2"

  return (
    <div className="space-y-5 max-w-3xl">
      <div>
        <h2 className="font-display font-bold text-white text-xl">Company Profile</h2>
        <p className="text-slate-400 text-sm">Kelola informasi perusahaan yang ditampilkan di website</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-6 border border-white/8 space-y-5"
      >
        <h3 className="font-display font-semibold text-white border-b border-white/8 pb-3 flex items-center gap-2">
          <Building size={18} className="text-blue-400" /> Informasi Dasar
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div><label className={labelClass}>Nama Perusahaan</label><input className={inputClass} defaultValue="PT. Nusantara Maju" /></div>
          <div><label className={labelClass}>Tagline</label><input className={inputClass} defaultValue="Modern Solutions, Professional Excellence" /></div>
          <div><label className={labelClass}>Email</label><input type="email" className={inputClass} defaultValue="info@nusantaramaju.co.id" /></div>
          <div><label className={labelClass}>Telepon</label><input className={inputClass} defaultValue="(021) 123-4567" /></div>
          <div><label className={labelClass}>WhatsApp</label><input className={inputClass} defaultValue="+62 812-3456-7890" /></div>
          <div><label className={labelClass}>Jam Kerja</label><input className={inputClass} defaultValue="Senin–Jumat, 08:00–17:00 WIB" /></div>
        </div>
        <div><label className={labelClass}>Alamat</label><textarea rows={2} className={inputClass + ' resize-none'} defaultValue="Jl. Sudirman No. 123, Jakarta Pusat 10220" /></div>
        <div><label className={labelClass}>Deskripsi Perusahaan</label><textarea rows={4} className={inputClass + ' resize-none'} defaultValue="Perusahaan teknologi terdepan yang berkomitmen menghadirkan solusi inovatif untuk kemajuan bisnis Anda di era digital." /></div>

        <h3 className="font-display font-semibold text-white border-b border-white/8 pb-3 pt-2">Social Media</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {['Instagram', 'Facebook', 'LinkedIn', 'YouTube'].map(sm => (
            <div key={sm}><label className={labelClass}>{sm}</label><input className={inputClass} placeholder={`URL ${sm}`} /></div>
          ))}
        </div>

        <h3 className="font-display font-semibold text-white border-b border-white/8 pb-3 pt-2">Logo & Favicon</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Logo</label>
            <div className="border-2 border-dashed border-white/15 rounded-xl p-6 text-center cursor-pointer hover:border-blue-500/40 transition-all">
              <Upload size={22} className="text-slate-500 mx-auto mb-2" />
              <span className="text-slate-500 text-sm">Upload Logo</span>
            </div>
          </div>
          <div>
            <label className={labelClass}>Favicon</label>
            <div className="border-2 border-dashed border-white/15 rounded-xl p-6 text-center cursor-pointer hover:border-blue-500/40 transition-all">
              <Upload size={22} className="text-slate-500 mx-auto mb-2" />
              <span className="text-slate-500 text-sm">Upload Favicon</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000) }}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium text-sm transition-all ${saved ? 'bg-green-500 text-white' : 'bg-blue-500 hover:bg-blue-400 text-white'}`}
          >
            <Save size={15} />
            {saved ? 'Tersimpan!' : 'Simpan'}
          </button>
        </div>
      </motion.div>
    </div>
  )
}
