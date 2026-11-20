import { motion } from 'framer-motion'
import { CheckCircle, Globe, Award, Users, Heart } from 'lucide-react'

const timeline = [
  { year: '2009', title: 'Pendirian Perusahaan', desc: 'PT. Nusantara Maju resmi didirikan di Jakarta dengan 12 karyawan awal.' },
  { year: '2013', title: 'Ekspansi Regional', desc: 'Membuka kantor di Surabaya dan Bandung, melayani lebih dari 50 klien.' },
  { year: '2017', title: 'Sertifikasi ISO', desc: 'Meraih sertifikasi ISO 9001:2015 sebagai bukti komitmen kualitas.' },
  { year: '2021', title: 'Digital Transformation', desc: 'Meluncurkan platform digital terpadu dan meraih penghargaan Top Employer.' },
  { year: '2025', title: 'Great Place to Work®', desc: 'Diakui sebagai Great Place to Work® untuk ketiga kalinya secara berturut-turut.' },
]

const culture = [
  { icon: Heart, title: 'Work-Life Balance', desc: 'Kami percaya keseimbangan hidup-kerja adalah kunci produktivitas jangka panjang.' },
  { icon: Users, title: 'Diverse & Inclusive', desc: 'Membangun lingkungan yang merayakan keberagaman dan mendorong setiap suara.' },
  { icon: Globe, title: 'Remote Friendly', desc: 'Fleksibilitas kerja hybrid yang mendukung gaya hidup modern.' },
  { icon: Award, title: 'Growth Mindset', desc: 'Program pengembangan karir dan pembelajaran berkelanjutan untuk semua.' },
]

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6, delay, ease: 'easeOut' },
})

export default function About() {
  return (
    <div>
      {/* Hero */}
      <div className="relative min-h-[60vh] flex items-end bg-navy overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1920&h=800&fit=crop&auto=format"
          alt="Office"
          className="absolute inset-0 w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-navy/20" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.7 }}
          >
            <div className="text-blue-400 text-sm font-medium uppercase tracking-widest mb-3">Who We Are</div>
            <h1 className="font-display font-bold text-white text-5xl md:text-6xl leading-tight">
              Tentang<br />
              <span className="text-gradient">Nusantara Maju</span>
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Introduction */}
      <div className="bg-mesh py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div {...reveal()}>
              <h2 className="font-display font-bold text-white text-3xl mb-6">
                Lebih dari 15 Tahun Menghadirkan Solusi Terbaik
              </h2>
              <p className="text-slate-300 leading-relaxed mb-5">
                PT. Nusantara Maju adalah perusahaan teknologi terkemuka yang berfokus pada pengembangan software, konsultasi IT, dan transformasi digital. Kami melayani klien dari berbagai sektor industri di seluruh Indonesia dan Asia Tenggara.
              </p>
              <p className="text-slate-400 leading-relaxed mb-8">
                Dengan tim lebih dari 500 profesional berpengalaman, kami berkomitmen untuk menghadirkan solusi teknologi yang tidak hanya memenuhi kebutuhan bisnis saat ini, tetapi juga mempersiapkan klien menghadapi tantangan masa depan.
              </p>
              <ul className="space-y-3">
                {['Pengembangan Software Enterprise', 'Konsultasi & Implementasi ERP', 'Cloud Infrastructure Management', 'UI/UX Design & Digital Experience'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-slate-300">
                    <CheckCircle size={16} className="text-blue-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-4"
            >
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=300&fit=crop&auto=format"
                alt="Team"
                className="rounded-2xl w-full h-48 object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=300&fit=crop&auto=format"
                alt="Office"
                className="rounded-2xl w-full h-48 object-cover mt-8"
              />
              <img
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=300&fit=crop&auto=format"
                alt="Meeting"
                className="rounded-2xl w-full h-48 object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop&auto=format"
                alt="Workspace"
                className="rounded-2xl w-full h-48 object-cover mt-8"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Vision Mission */}
      <div className="bg-navy-light py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...reveal()} className="text-center mb-16">
            <div className="text-blue-400 text-sm font-medium uppercase tracking-widest mb-3">Our Direction</div>
            <h2 className="font-display font-bold text-white text-4xl">Visi & Misi</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass rounded-2xl p-8 border border-blue-500/20"
            >
              <h3 className="font-display font-bold text-white text-2xl mb-5 flex items-center gap-3">
                <Globe size={24} className="text-blue-400" /> Visi
              </h3>
              <p className="text-slate-300 leading-relaxed text-lg">
                Menjadi perusahaan teknologi terkemuka di Asia Tenggara yang mendorong transformasi digital, memberikan dampak positif bagi masyarakat, dan memimpin inovasi di era ekonomi digital global.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass rounded-2xl p-8 border border-cyan-500/20"
            >
              <h3 className="font-display font-bold text-white text-2xl mb-5 flex items-center gap-3">
                <Award size={24} className="text-cyan-400" /> Misi
              </h3>
              <ul className="space-y-3">
                {[
                  'Menghadirkan solusi teknologi berkualitas tinggi yang relevan dan berdampak',
                  'Membangun dan mengembangkan tim profesional yang berdedikasi tinggi',
                  'Mendorong budaya inovasi berkelanjutan di seluruh lapisan organisasi',
                  'Memberikan nilai tambah nyata bagi klien, mitra, dan komunitas',
                  'Menjaga kepercayaan stakeholder melalui tata kelola perusahaan yang baik',
                ].map(m => (
                  <li key={m} className="flex items-start gap-3 text-slate-300">
                    <CheckCircle size={15} className="text-cyan-400 mt-0.5 shrink-0" />
                    {m}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-mesh py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...reveal()} className="text-center mb-16">
            <div className="text-blue-400 text-sm font-medium uppercase tracking-widest mb-3">Journey</div>
            <h2 className="font-display font-bold text-white text-4xl">Perjalanan Kami</h2>
          </motion.div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-blue-500/20 hidden md:block" />
            <div className="space-y-8">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex gap-8 items-start"
                >
                  <div className="shrink-0 w-16 h-16 rounded-full glass border border-blue-500/30 flex items-center justify-center relative z-10">
                    <span className="text-blue-400 font-display font-bold text-xs text-center leading-tight">{item.year}</span>
                  </div>
                  <div className="glass rounded-xl p-6 flex-1 border border-white/8">
                    <h3 className="font-display font-semibold text-white text-lg mb-2">{item.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Culture */}
      <div className="bg-navy-light py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...reveal()} className="text-center mb-16">
            <div className="text-blue-400 text-sm font-medium uppercase tracking-widest mb-3">Our Culture</div>
            <h2 className="font-display font-bold text-white text-4xl">Budaya Perusahaan</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {culture.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass rounded-xl p-6 border border-white/8 hover:border-blue-500/30 transition-all"
              >
                <div className="w-11 h-11 rounded-xl bg-blue-500/15 flex items-center justify-center mb-4">
                  <c.icon size={20} className="text-blue-400" />
                </div>
                <h3 className="font-display font-semibold text-white mb-2">{c.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop&auto=format',
              'https://images.unsplash.com/photo-1542744094-24638eff58bb?w=600&h=400&fit=crop&auto=format',
              'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600&h=400&fit=crop&auto=format',
            ].map((src, i) => (
              <motion.img
                key={i}
                src={src}
                alt="Company culture"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="rounded-xl w-full h-52 object-cover"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
