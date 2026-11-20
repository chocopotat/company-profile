import { motion } from 'framer-motion'
import { LogIn, LogOut, Upload, Edit, Trash2, Send, Mail, Phone, Shield, Plus } from 'lucide-react'

const actionIcons: Record<string, React.ReactNode> = {
  LOGIN: <LogIn size={14} className="text-green-400" />,
  LOGOUT: <LogOut size={14} className="text-slate-400" />,
  CREATE: <Plus size={14} className="text-blue-400" />,
  UPDATE: <Edit size={14} className="text-yellow-400" />,
  DELETE: <Trash2 size={14} className="text-red-400" />,
  UPLOAD: <Upload size={14} className="text-purple-400" />,
  STATUS_UPDATE: <Shield size={14} className="text-cyan-400" />,
  EMAIL_SENT: <Mail size={14} className="text-orange-400" />,
  WHATSAPP_SENT: <Phone size={14} className="text-green-500" />,
}

const logs = [
  { id: 1, user: 'Sarah Admin', action: 'LOGIN', module: 'Auth', description: 'Login berhasil dari 192.168.1.100', time: '11 Agu 2026, 09:12', ip: '192.168.1.100' },
  { id: 2, user: 'Sarah Admin', action: 'STATUS_UPDATE', module: 'Recruitment', description: 'Status Budi Santoso diubah ke Interview', time: '11 Agu 2026, 09:25', ip: '192.168.1.100' },
  { id: 3, user: 'Sarah Admin', action: 'EMAIL_SENT', module: 'Email', description: 'Email notifikasi interview dikirim ke budi@email.com', time: '11 Agu 2026, 09:25', ip: '192.168.1.100' },
  { id: 4, user: 'HR Manager', action: 'LOGIN', module: 'Auth', description: 'Login berhasil dari 10.0.0.25', time: '11 Agu 2026, 08:45', ip: '10.0.0.25' },
  { id: 5, user: 'HR Manager', action: 'UPDATE', module: 'Applicant', description: 'Catatan ditambahkan pada lamaran Siti Rahayu', time: '11 Agu 2026, 08:50', ip: '10.0.0.25' },
  { id: 6, user: 'Sarah Admin', action: 'CREATE', module: 'User', description: 'Akun HR baru dibuat: hr2@example.com', time: '10 Agu 2026, 16:30', ip: '192.168.1.100' },
  { id: 7, user: 'Sarah Admin', action: 'DELETE', module: 'Hero', description: 'Hero slide #3 dihapus', time: '10 Agu 2026, 15:10', ip: '192.168.1.100' },
  { id: 8, user: 'John Doe', action: 'UPLOAD', module: 'Recruitment', description: 'CV dan surat lamaran diupload', time: '10 Agu 2026, 11:23', ip: '203.0.113.45' },
  { id: 9, user: 'John Doe', action: 'WHATSAPP_SENT', module: 'WhatsApp', description: 'Notifikasi WA dikirim ke +62811111111', time: '10 Agu 2026, 11:23', ip: '203.0.113.45' },
  { id: 10, user: 'HR Manager', action: 'LOGOUT', module: 'Auth', description: 'Logout', time: '09 Agu 2026, 17:01', ip: '10.0.0.25' },
]

const actionColors: Record<string, string> = {
  LOGIN: 'text-green-400',
  LOGOUT: 'text-slate-400',
  CREATE: 'text-blue-400',
  UPDATE: 'text-yellow-400',
  DELETE: 'text-red-400',
  UPLOAD: 'text-purple-400',
  STATUS_UPDATE: 'text-cyan-400',
  EMAIL_SENT: 'text-orange-400',
  WHATSAPP_SENT: 'text-green-500',
}

export default function ActivityLogs() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display font-bold text-white text-xl">Activity Log</h2>
        <p className="text-slate-400 text-sm">Riwayat aktivitas sistem</p>
      </div>

      <div className="glass rounded-2xl border border-white/8 overflow-hidden">
        <div className="divide-y divide-white/5">
          {logs.map((log, i) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className="flex items-start gap-4 px-5 py-4 hover:bg-white/3 transition-all"
            >
              <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center shrink-0 mt-0.5">
                {actionIcons[log.action]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                  <span className="text-white text-sm font-medium">{log.user}</span>
                  <span className={`text-xs font-semibold ${actionColors[log.action]}`}>{log.action}</span>
                  <span className="text-slate-600 text-xs">{log.module}</span>
                </div>
                <div className="text-slate-400 text-xs leading-relaxed">{log.description}</div>
              </div>
              <div className="shrink-0 text-right">
                <div className="text-slate-500 text-xs">{log.time}</div>
                <div className="text-slate-600 text-[10px] mt-0.5 font-mono">{log.ip}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
