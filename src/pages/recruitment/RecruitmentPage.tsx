import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Briefcase, Clock, MapPin, Users, CheckCircle } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const openings = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    department: 'Engineering',
    location: 'Jakarta / Remote',
    type: 'Full-time',
    deadline: '31 Agustus 2026',
    requirements: ['React / Vue.js', 'TypeScript', '4+ tahun pengalaman'],
  },
  {
    id: 2,
    title: 'Product Manager',
    department: 'Product',
    location: 'Jakarta',
    type: 'Full-time',
    deadline: '15 September 2026',
    requirements: ['Agile / Scrum', 'Data-driven', '3+ tahun pengalaman'],
  },
  {
    id: 3,
    title: 'DevOps Engineer',
    department: 'Infrastructure',
    location: 'Jakarta / Remote',
    type: 'Full-time',
    deadline: '20 September 2026',
    requirements: ['AWS / GCP', 'Docker & Kubernetes', 'CI/CD'],
  },
]

export default function RecruitmentPage() {
  const { isAuthenticated, isAdmin, user } = useAuth()

  const dashboardPath = isAdmin ? '/recruitment/admin/dashboard' : '/recruitment/dashboard'

  return (
    <div>
      <div className="relative min-h-[55vh] flex items-end bg-navy overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1920&h=800&fit=crop&auto=format"
          alt="Recruitment"
          className="absolute inset-0 w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy to-navy/20" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 pt-32">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="text-blue-400 text-sm font-medium uppercase tracking-widest mb-3">Karir</div>
            <h1 className="font-display font-bold text-white text-5xl md:text-6xl mb-5">
              Bergabung Bersama Kami
            </h1>
            <p className="text-slate-300 text-lg max-w-2xl mb-8">
              Kami mencari talenta terbaik yang bersemangat, inovatif, dan siap berkembang bersama tim kami yang luar biasa.
            </p>
            {isAuthenticated ? (
              <Link
                to={dashboardPath}
                className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white font-semibold px-7 py-3.5 rounded-xl transition-all"
              >
                Ke Dashboard <ArrowRight size={18} />
              </Link>
            ) : (
              <div className="flex gap-4">
                <Link
                  to="/recruitment/login"
                  className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white font-semibold px-7 py-3.5 rounded-xl transition-all"
                >
                  Masuk & Lamar <ArrowRight size={18} />
                </Link>
                <Link
                  to="/recruitment/register"
                  className="inline-flex items-center gap-2 glass border border-white/20 text-white font-semibold px-7 py-3.5 rounded-xl transition-all hover:bg-white/10"
                >
                  Daftar Dulu
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <div className="bg-mesh py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="text-blue-400 text-sm font-medium uppercase tracking-widest mb-3">Open Positions</div>
            <h2 className="font-display font-bold text-white text-4xl">Lowongan Tersedia</h2>
          </motion.div>

          <div className="grid gap-5">
            {openings.map((job, i) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6 border border-white/10 hover:border-blue-500/30 transition-all group"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/15 flex items-center justify-center">
                        <Briefcase size={18} className="text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-white text-lg group-hover:text-blue-300 transition-colors">
                          {job.title}
                        </h3>
                        <span className="text-slate-400 text-sm">{job.department}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-slate-400 mb-4 ml-13">
                      <span className="flex items-center gap-1.5"><MapPin size={14} />{job.location}</span>
                      <span className="flex items-center gap-1.5"><Clock size={14} />{job.type}</span>
                      <span className="flex items-center gap-1.5"><Users size={14} />Deadline: {job.deadline}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {job.requirements.map(r => (
                        <span key={r} className="flex items-center gap-1.5 text-xs bg-blue-500/10 border border-blue-500/20 text-blue-400 px-3 py-1 rounded-full">
                          <CheckCircle size={11} />{r}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="md:ml-6 shrink-0">
                    {isAuthenticated ? (
                      <Link
                        to="/recruitment/dashboard"
                        className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white font-semibold px-6 py-2.5 rounded-xl transition-all text-sm"
                      >
                        Lamar <ArrowRight size={15} />
                      </Link>
                    ) : (
                      <Link
                        to="/recruitment/login"
                        className="inline-flex items-center gap-2 glass border border-blue-500/30 text-blue-400 hover:bg-blue-500/10 font-semibold px-6 py-2.5 rounded-xl transition-all text-sm"
                      >
                        Login & Lamar <ArrowRight size={15} />
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
