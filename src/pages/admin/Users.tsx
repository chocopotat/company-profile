import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Edit2, Trash2, UserCheck, UserX, Shield } from 'lucide-react'
import { useAuth, type UserRole } from '../../context/AuthContext'

const allUsers = [
  { id: 1, name: 'John Doe', username: 'johndoe', email: 'user@example.com', role: 'user' as UserRole, status: true, createdAt: '01 Jan 2026' },
  { id: 2, name: 'Sarah Admin', username: 'sarahadmin', email: 'admin@example.com', role: 'super_admin' as UserRole, status: true, createdAt: '01 Jan 2026' },
  { id: 3, name: 'HR Manager', username: 'hrmanager', email: 'hr@example.com', role: 'hr' as UserRole, status: true, createdAt: '15 Jan 2026' },
  { id: 4, name: 'Budi Santoso', username: 'budisantoso', email: 'budi@email.com', role: 'user' as UserRole, status: true, createdAt: '20 Feb 2026' },
  { id: 5, name: 'Siti Rahayu', username: 'sitirahayu', email: 'siti@email.com', role: 'user' as UserRole, status: false, createdAt: '10 Mar 2026' },
  { id: 6, name: 'Ahmad Fauzi', username: 'ahmadfauzi', email: 'ahmad@email.com', role: 'user' as UserRole, status: true, createdAt: '05 Apr 2026' },
]

const roleColors: Record<UserRole, string> = {
  user: 'bg-slate-500/15 text-slate-400 border-slate-500/25',
  hr: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/25',
  admin: 'bg-purple-500/15 text-purple-400 border-purple-500/25',
  super_admin: 'bg-blue-500/15 text-blue-400 border-blue-500/25',
}

export default function Users() {
  const { user: me } = useAuth()
  const [search, setSearch] = useState('')
  const [users, setUsers] = useState(allUsers)

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  )

  const toggleStatus = (id: number) => {
    setUsers(us => us.map(u => u.id === id ? { ...u, status: !u.status } : u))
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div>
          <h2 className="font-display font-bold text-white text-xl">Manajemen User</h2>
          <p className="text-slate-400 text-sm">{filtered.length} user terdaftar</p>
        </div>
      </div>

      <div className="glass rounded-xl p-4 border border-white/8">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all"
            placeholder="Cari user..."
          />
        </div>
      </div>

      <div className="glass rounded-2xl border border-white/8 overflow-hidden hidden md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/8">
              {['Nama', 'Username', 'Email', 'Role', 'Status', 'Bergabung', 'Aksi'].map(h => (
                <th key={h} className="text-left px-5 py-3.5 text-slate-400 text-xs font-medium uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.map((u, i) => (
              <motion.tr
                key={u.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="hover:bg-white/5 transition-all"
              >
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-xs font-bold">
                      {u.name[0]}
                    </div>
                    <span className="text-white">{u.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-slate-400">@{u.username}</td>
                <td className="px-5 py-3.5 text-slate-400">{u.email}</td>
                <td className="px-5 py-3.5">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium border ${roleColors[u.role]}`}>
                    {u.role.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${u.status ? 'bg-green-500/15 text-green-400 border border-green-500/25' : 'bg-red-500/15 text-red-400 border border-red-500/25'}`}>
                    {u.status ? 'Aktif' : 'Nonaktif'}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-slate-500">{u.createdAt}</td>
                <td className="px-5 py-3.5">
                  <div className="flex gap-1.5">
                    <button className="p-1.5 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all">
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => toggleStatus(u.id)}
                      className="p-1.5 text-slate-400 hover:text-yellow-400 hover:bg-yellow-500/10 rounded-lg transition-all"
                    >
                      {u.status ? <UserX size={14} /> : <UserCheck size={14} />}
                    </button>
                    {me?.role === 'super_admin' && u.id !== me.id && (
                      <button className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all">
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="md:hidden space-y-3">
        {filtered.map(u => (
          <div key={u.id} className="glass rounded-xl p-4 border border-white/8">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold">
                  {u.name[0]}
                </div>
                <div>
                  <div className="text-white text-sm font-medium">{u.name}</div>
                  <div className="text-slate-500 text-xs">@{u.username}</div>
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full border ${roleColors[u.role]}`}>{u.role.replace('_', ' ')}</span>
            </div>
            <div className="text-slate-400 text-xs">{u.email}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
