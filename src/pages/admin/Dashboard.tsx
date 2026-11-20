import { motion } from 'framer-motion'
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import { Users, FileText, Clock, UserCheck, XCircle, MessageSquare, TrendingUp } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const monthlyData = [
  { month: 'Mar', applicants: 12, accepted: 3 },
  { month: 'Apr', applicants: 18, accepted: 5 },
  { month: 'Mei', applicants: 24, accepted: 7 },
  { month: 'Jun', applicants: 20, accepted: 6 },
  { month: 'Jul', applicants: 32, accepted: 9 },
  { month: 'Agu', applicants: 41, accepted: 12 },
]

const statusData = [
  { name: 'Submitted', value: 15, color: '#eab308' },
  { name: 'Under Review', value: 23, color: '#3b82f6' },
  { name: 'Interview', value: 8, color: '#a855f7' },
  { name: 'Accepted', value: 12, color: '#22c55e' },
  { name: 'Rejected', value: 7, color: '#ef4444' },
]

const deptData = [
  { dept: 'Engineering', count: 24 },
  { dept: 'Product', count: 11 },
  { dept: 'Marketing', count: 8 },
  { dept: 'HR', count: 6 },
  { dept: 'Finance', count: 4 },
]

const recentApplicants = [
  { name: 'Budi Santoso', position: 'Frontend Dev', date: '11 Agu 2026', status: 'Under Review', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&auto=format' },
  { name: 'Siti Rahayu', position: 'Product Manager', date: '10 Agu 2026', status: 'Interview', photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&auto=format' },
  { name: 'Ahmad Fauzi', position: 'DevOps Engineer', date: '09 Agu 2026', status: 'Submitted', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&auto=format' },
  { name: 'Dewi Lestari', position: 'UI/UX Designer', date: '08 Agu 2026', status: 'Accepted', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&auto=format' },
  { name: 'Rizky Pratama', position: 'Backend Dev', date: '07 Agu 2026', status: 'Rejected', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&auto=format' },
]

const statusColors: Record<string, string> = {
  Submitted: 'status-submitted',
  'Under Review': 'status-review',
  Interview: 'status-interview',
  Accepted: 'status-accepted',
  Rejected: 'status-rejected',
}

const stats = [
  { label: 'Total Users', value: '247', icon: Users, color: 'text-blue-400', bg: 'bg-blue-500/15 border-blue-500/25' },
  { label: 'Total Pelamar', value: '65', icon: FileText, color: 'text-purple-400', bg: 'bg-purple-500/15 border-purple-500/25' },
  { label: 'Pending Review', value: '23', icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-500/15 border-yellow-500/25' },
  { label: 'Diterima', value: '12', icon: UserCheck, color: 'text-green-400', bg: 'bg-green-500/15 border-green-500/25' },
  { label: 'Ditolak', value: '7', icon: XCircle, color: 'text-red-400', bg: 'bg-red-500/15 border-red-500/25' },
  { label: 'Pesan Masuk', value: '18', icon: MessageSquare, color: 'text-cyan-400', bg: 'bg-cyan-500/15 border-cyan-500/25' },
]

const tooltipStyle = {
  backgroundColor: '#0f1f36',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '12px',
  color: '#e2e8f0',
  fontSize: '12px',
}

export default function AdminDashboard() {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display font-bold text-white text-2xl">
            Selamat datang, {user?.name?.split(' ')[0]} 👋
          </h2>
          <p className="text-slate-400 text-sm mt-1">Ringkasan aktivitas rekrutmen hari ini</p>
        </div>
        <div className="text-right text-sm text-slate-500">
          <div>11 Agustus 2026</div>
          <div className="text-slate-600">Senin</div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className={`glass rounded-xl p-4 border ${s.bg}`}
          >
            <div className={`w-9 h-9 rounded-lg bg-current/10 flex items-center justify-center mb-3 ${s.color}`}>
              <s.icon size={18} className={s.color} />
            </div>
            <div className="font-display font-bold text-white text-2xl">{s.value}</div>
            <div className="text-slate-400 text-xs mt-0.5">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts row 1 */}
      <div className="grid lg:grid-cols-3 gap-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 glass rounded-2xl p-5 border border-white/8"
        >
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-display font-semibold text-white">Tren Pelamar</h3>
            <div className="flex items-center gap-1.5 text-green-400 text-xs font-medium">
              <TrendingUp size={13} /> +28% bulan ini
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="gradApplicants" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradAccepted" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="applicants" stroke="#3b82f6" strokeWidth={2} fill="url(#gradApplicants)" name="Pelamar" />
              <Area type="monotone" dataKey="accepted" stroke="#22c55e" strokeWidth={2} fill="url(#gradAccepted)" name="Diterima" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="glass rounded-2xl p-5 border border-white/8"
        >
          <h3 className="font-display font-semibold text-white mb-5">Status Pelamar</h3>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={statusData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                {statusData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {statusData.map(s => (
              <div key={s.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                  <span className="text-slate-400">{s.name}</span>
                </div>
                <span className="text-white font-medium">{s.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Charts row 2 + table */}
      <div className="grid lg:grid-cols-3 gap-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-2xl p-5 border border-white/8"
        >
          <h3 className="font-display font-semibold text-white mb-5">Per Departemen</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={deptData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
              <XAxis type="number" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis dataKey="dept" type="category" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} width={70} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="count" fill="#3b82f6" radius={[0, 6, 6, 0]} name="Pelamar" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="lg:col-span-2 glass rounded-2xl p-5 border border-white/8"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-white">Pelamar Terbaru</h3>
            <a href="/recruitment/admin/applicants" className="text-blue-400 text-xs hover:text-blue-300 transition-colors">
              Lihat Semua →
            </a>
          </div>
          <div className="space-y-3">
            {recentApplicants.map((a, i) => (
              <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-all">
                <img src={a.photo} alt={a.name} className="w-9 h-9 rounded-full object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm font-medium truncate">{a.name}</div>
                  <div className="text-slate-500 text-xs">{a.position} · {a.date}</div>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium shrink-0 ${statusColors[a.status]}`}>
                  {a.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
