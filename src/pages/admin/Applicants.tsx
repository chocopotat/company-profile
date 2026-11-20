import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Download, Eye, Trash2, ChevronLeft, ChevronRight, CheckCircle, Clock } from 'lucide-react'

const allApplicants = [
  { id: 1, name: 'Budi Santoso', email: 'budi@email.com', phone: '08111111111', position: 'Frontend Dev', date: '11 Agu 2026', status: 'Under Review', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&auto=format' },
  { id: 2, name: 'Siti Rahayu', email: 'siti@email.com', phone: '08122222222', position: 'Product Manager', date: '10 Agu 2026', status: 'Interview', photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&auto=format' },
  { id: 3, name: 'Ahmad Fauzi', email: 'ahmad@email.com', phone: '08133333333', position: 'DevOps Engineer', date: '09 Agu 2026', status: 'Submitted', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&auto=format' },
  { id: 4, name: 'Dewi Lestari', email: 'dewi@email.com', phone: '08144444444', position: 'UI/UX Designer', date: '08 Agu 2026', status: 'Accepted', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&auto=format' },
  { id: 5, name: 'Rizky Pratama', email: 'rizky@email.com', phone: '08155555555', position: 'Backend Dev', date: '07 Agu 2026', status: 'Rejected', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&auto=format' },
  { id: 6, name: 'Anisa Putri', email: 'anisa@email.com', phone: '08166666666', position: 'Data Analyst', date: '06 Agu 2026', status: 'Under Review', photo: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=60&h=60&fit=crop&auto=format' },
  { id: 7, name: 'Hendra Wijaya', email: 'hendra@email.com', phone: '08177777777', position: 'Frontend Dev', date: '05 Agu 2026', status: 'Interview', photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=60&h=60&fit=crop&auto=format' },
]

const statusColors: Record<string, string> = {
  Submitted: 'status-submitted',
  'Under Review': 'status-review',
  Interview: 'status-interview',
  Accepted: 'status-accepted',
  Rejected: 'status-rejected',
}

const statusOptions = ['Semua', 'Submitted', 'Under Review', 'Interview', 'Accepted', 'Rejected']

export default function Applicants() {
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('Semua')
  const [selected, setSelected] = useState<number | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null)

  const filtered = allApplicants.filter(a =>
    (filterStatus === 'Semua' || a.status === filterStatus) &&
    (a.name.toLowerCase().includes(search.toLowerCase()) || a.email.toLowerCase().includes(search.toLowerCase()))
  )

  const detail = selected !== null ? allApplicants.find(a => a.id === selected) : null

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div>
          <h2 className="font-display font-bold text-white text-xl">Manajemen Pelamar</h2>
          <p className="text-slate-400 text-sm">{filtered.length} pelamar ditemukan</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-500/15 border border-blue-500/30 text-blue-400 hover:bg-blue-500/25 px-4 py-2 rounded-xl text-sm font-medium transition-all">
          <Download size={15} /> Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="glass rounded-xl p-4 border border-white/8 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all"
            placeholder="Cari nama atau email..."
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {statusOptions.map(s => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                filterStatus === s ? 'bg-blue-500 text-white' : 'bg-white/5 text-slate-400 hover:bg-white/10'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table (desktop) */}
      <div className="glass rounded-2xl border border-white/8 overflow-hidden hidden md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/8">
              {['Pelamar', 'Email', 'Telepon', 'Posisi', 'Tanggal', 'Status', 'Aksi'].map(h => (
                <th key={h} className="text-left px-5 py-3.5 text-slate-400 text-xs font-medium uppercase tracking-wider">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.map((a, i) => (
              <motion.tr
                key={a.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="hover:bg-white/5 transition-all"
              >
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <img src={a.photo} alt={a.name} className="w-8 h-8 rounded-full object-cover" />
                    <span className="text-white font-medium">{a.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-slate-400">{a.email}</td>
                <td className="px-5 py-3.5 text-slate-400">{a.phone}</td>
                <td className="px-5 py-3.5 text-slate-300">{a.position}</td>
                <td className="px-5 py-3.5 text-slate-500">{a.date}</td>
                <td className="px-5 py-3.5">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[a.status]}`}>
                    {a.status}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelected(a.id)}
                      className="p-1.5 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all"
                    >
                      <Eye size={15} />
                    </button>
                    <button
                      onClick={() => setConfirmDelete(a.id)}
                      className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards (mobile) */}
      <div className="md:hidden space-y-3">
        {filtered.map(a => (
          <div key={a.id} className="glass rounded-xl p-4 border border-white/8">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <img src={a.photo} alt={a.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <div className="text-white font-medium text-sm">{a.name}</div>
                  <div className="text-slate-500 text-xs">{a.position}</div>
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[a.status]}`}>{a.status}</span>
            </div>
            <div className="text-slate-400 text-xs mb-2">{a.email} · {a.phone}</div>
            <div className="flex gap-2">
              <button onClick={() => setSelected(a.id)} className="flex-1 text-center py-2 text-blue-400 text-xs border border-blue-500/30 rounded-lg hover:bg-blue-500/10 transition-all">
                Detail
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {detail && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={e => e.stopPropagation()}
            className="bg-navy-light border border-white/10 rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-start gap-4 mb-6">
              <img src={detail.photo} alt={detail.name} className="w-16 h-16 rounded-xl object-cover" />
              <div>
                <h3 className="font-display font-bold text-white text-xl">{detail.name}</h3>
                <p className="text-slate-400">{detail.position}</p>
                <span className={`inline-block mt-2 text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[detail.status]}`}>
                  {detail.status}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm mb-6">
              {[
                ['Email', detail.email],
                ['Telepon', detail.phone],
                ['Tanggal Daftar', detail.date],
              ].map(([k, v]) => (
                <div key={k} className="col-span-2 sm:col-span-1">
                  <div className="text-slate-500 text-xs uppercase tracking-wider mb-1">{k}</div>
                  <div className="text-white">{v}</div>
                </div>
              ))}
            </div>
            <div className="space-y-3 mb-6">
              <div className="text-slate-400 text-xs uppercase tracking-wider mb-2">Dokumen</div>
              {['CV.pdf', 'Surat Lamaran.pdf', 'Foto.jpg'].map(doc => (
                <div key={doc} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                  <span className="text-white text-sm">{doc}</span>
                  <div className="flex gap-2">
                    <button className="text-blue-400 text-xs hover:text-blue-300">Lihat</button>
                    <button className="text-blue-400 text-xs hover:text-blue-300">Unduh</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mb-5">
              <label className="block text-slate-400 text-xs uppercase tracking-wider mb-2">Ubah Status</label>
              <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40">
                {['Submitted', 'Under Review', 'Interview', 'Accepted', 'Rejected'].map(s => (
                  <option key={s} value={s} className="bg-navy-light">{s}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setSelected(null)} className="flex-1 py-2.5 bg-white/5 border border-white/10 text-white rounded-xl text-sm hover:bg-white/10 transition-all">
                Tutup
              </button>
              <button className="flex-1 py-2.5 bg-blue-500 hover:bg-blue-400 text-white rounded-xl text-sm font-medium transition-all">
                Simpan Perubahan
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
