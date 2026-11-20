import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Eye, Trash2, Archive, CheckCheck, MessageSquare } from 'lucide-react'

const messages = [
  { id: 1, name: 'Andi Wijaya', email: 'andi@email.com', phone: '08111111111', subject: 'Pertanyaan tentang kerjasama', message: 'Halo, saya ingin menanyakan lebih lanjut tentang kemungkinan kerjasama antara perusahaan kami dengan PT. Nusantara Maju dalam bidang pengembangan software.', date: '11 Agu 2026', status: 'Unread' },
  { id: 2, name: 'Rina Sari', email: 'rina@email.com', phone: '08122222222', subject: 'Request demo produk', message: 'Kami tertarik untuk melihat demo produk manajemen Anda. Bisakah dijadwalkan untuk minggu depan?', date: '10 Agu 2026', status: 'Read' },
  { id: 3, name: 'Doni Kusuma', email: 'doni@email.com', phone: '08133333333', subject: 'Informasi harga layanan', message: 'Mohon informasikan detail harga untuk paket enterprise dari layanan konsultasi IT Anda.', date: '09 Agu 2026', status: 'Replied' },
  { id: 4, name: 'Maya Putri', email: 'maya@email.com', phone: '08144444444', subject: 'Feedback layanan', message: 'Terima kasih atas pelayanan yang excellent. Kami sangat puas dengan hasil implementasi sistem.', date: '08 Agu 2026', status: 'Archived' },
]

const statusColors: Record<string, string> = {
  Unread: 'bg-blue-500/15 text-blue-400 border-blue-500/25',
  Read: 'bg-slate-500/15 text-slate-400 border-slate-500/25',
  Replied: 'bg-green-500/15 text-green-400 border-green-500/25',
  Archived: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/25',
}

export default function ContactMessages() {
  const [msgs, setMsgs] = useState(messages)
  const [selected, setSelected] = useState<number | null>(null)
  const detail = selected !== null ? msgs.find(m => m.id === selected) : null

  const markRead = (id: number) => setMsgs(ms => ms.map(m => m.id === id ? { ...m, status: 'Read' } : m))

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display font-bold text-white text-xl">Pesan Kontak</h2>
        <p className="text-slate-400 text-sm">{msgs.filter(m => m.status === 'Unread').length} pesan belum dibaca</p>
      </div>

      <div className="grid gap-3">
        {msgs.map((m, i) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className={`glass rounded-xl p-4 border cursor-pointer transition-all hover:border-blue-500/30 ${m.status === 'Unread' ? 'border-blue-500/20 bg-blue-500/3' : 'border-white/8'}`}
            onClick={() => { setSelected(m.id); markRead(m.id) }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-full bg-blue-500/15 flex items-center justify-center shrink-0">
                  <MessageSquare size={18} className="text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={`text-sm font-semibold ${m.status === 'Unread' ? 'text-white' : 'text-slate-300'}`}>{m.name}</span>
                    {m.status === 'Unread' && <div className="w-2 h-2 rounded-full bg-blue-400" />}
                  </div>
                  <div className="text-blue-300 text-sm font-medium truncate">{m.subject}</div>
                  <div className="text-slate-500 text-xs truncate mt-0.5">{m.message}</div>
                </div>
              </div>
              <div className="shrink-0 text-right">
                <div className="text-slate-500 text-xs mb-2">{m.date}</div>
                <span className={`text-xs px-2 py-0.5 rounded-full border ${statusColors[m.status]}`}>{m.status}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {detail && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={e => e.stopPropagation()}
            className="bg-navy-light border border-white/10 rounded-2xl p-6 max-w-lg w-full"
          >
            <div className="flex items-start justify-between mb-5">
              <div>
                <h3 className="font-display font-semibold text-white text-lg">{detail.subject}</h3>
                <div className="text-slate-400 text-sm mt-0.5">{detail.name} · {detail.email} · {detail.phone}</div>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full border ${statusColors[detail.status]}`}>{detail.status}</span>
            </div>
            <div className="bg-white/5 rounded-xl p-4 mb-5">
              <p className="text-slate-300 leading-relaxed">{detail.message}</p>
            </div>
            <div className="mb-4">
              <label className="block text-slate-400 text-sm mb-2">Balas</label>
              <textarea
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 resize-none"
                placeholder="Tulis balasan..."
              />
            </div>
            <div className="flex gap-3">
              <button onClick={() => setSelected(null)} className="flex-1 py-2.5 bg-white/5 border border-white/10 text-white rounded-xl text-sm hover:bg-white/10 transition-all">
                Tutup
              </button>
              <button className="flex-1 py-2.5 bg-blue-500 hover:bg-blue-400 text-white rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2">
                <Mail size={15} /> Kirim Balasan
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
