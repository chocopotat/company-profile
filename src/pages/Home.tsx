import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowRight, Users, Award, Globe, TrendingUp, CheckCircle, Mail } from 'lucide-react'

const slides = [
  {
    id: 1,
    title: 'Welcome to Our Company',
    subtitle: 'Modern Solutions, Professional Excellence',
    description: 'Kami hadir untuk menghadirkan inovasi terbaik bagi kemajuan bisnis Anda di era digital yang terus berkembang.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop&auto=format',
    cta: 'Pelajari Lebih Lanjut',
    ctaTo: '/about',
  },
  {
    id: 2,
    title: 'Bergabunglah Bersama Kami',
    subtitle: 'Karir Impian Dimulai Di Sini',
    description: 'Temukan peluang karir yang sesuai dengan passion dan keahlian Anda bersama tim profesional kami.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=1080&fit=crop&auto=format',
    cta: 'Lamar Sekarang',
    ctaTo: '/recruitment',
  },
  {
    id: 3,
    title: 'Inovasi Tanpa Batas',
    subtitle: 'Technology-Driven Growth',
    description: 'Dengan teknologi mutakhir dan tim ahli berpengalaman, kami siap membawa bisnis Anda ke level berikutnya.',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1920&h=1080&fit=crop&auto=format',
    cta: 'Hubungi Kami',
    ctaTo: '/contact',
  },
]

const stats = [
  { icon: Users, value: '500+', label: 'Karyawan Profesional' },
  { icon: Award, value: '15+', label: 'Tahun Pengalaman' },
  { icon: Globe, value: '30+', label: 'Klien Regional' },
  { icon: TrendingUp, value: '98%', label: 'Tingkat Kepuasan' },
]

const values = [
  { title: 'Integritas', desc: 'Kami menjaga kepercayaan dengan kejujuran dan transparansi dalam setiap langkah.' },
  { title: 'Inovasi', desc: 'Selalu beradaptasi dan menghadirkan solusi kreatif untuk tantangan modern.' },
  { title: 'Kolaborasi', desc: 'Membangun ekosistem kerja yang inklusif dan saling mendukung.' },
  { title: 'Keunggulan', desc: 'Berkomitmen pada standar kualitas tertinggi di setiap layanan kami.' },
]

function useScrollReveal(threshold = 0.15) {
  return {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: threshold },
    transition: { duration: 0.6, ease: 'easeOut' },
  }
}

export default function Home() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const reveal = useScrollReveal()

  const go = useCallback((dir: number) => {
    setDirection(dir)
    setCurrent(c => (c + dir + slides.length) % slides.length)
  }, [])

  useEffect(() => {
    const id = setInterval(() => go(1), 6000)
    return () => clearInterval(id)
  }, [go])

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? '-100%' : '100%', opacity: 0 }),
  }

  return (
    <div>
      {/* Hero Slider */}
      <div className="relative h-screen overflow-hidden bg-navy">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
            className="absolute inset-0"
          >
            <img
              src={slides[current].image}
              alt={slides[current].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/60 to-navy/30" />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, filter: 'blur(4px)' }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="max-w-2xl"
              >
                <div className="glass rounded-2xl p-8 md:p-10">
                  <div className="text-blue-400 text-sm font-medium uppercase tracking-widest mb-3">
                    {slides[current].subtitle}
                  </div>
                  <h1 className="font-display font-bold text-white text-4xl md:text-5xl lg:text-6xl leading-tight mb-4">
                    {slides[current].title}
                  </h1>
                  <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-8">
                    {slides[current].description}
                  </p>
                  <Link
                    to={slides[current].ctaTo}
                    className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25"
                  >
                    {slides[current].cta}
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Controls */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-4">
          <button onClick={() => go(-1)} className="glass rounded-full p-2 text-white hover:bg-white/20 transition-all">
            <ChevronLeft size={20} />
          </button>
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
                className={`transition-all duration-300 rounded-full ${i === current ? 'w-8 h-2 bg-blue-400' : 'w-2 h-2 bg-white/40'}`}
              />
            ))}
          </div>
          <button onClick={() => go(1)} className="glass rounded-full p-2 text-white hover:bg-white/20 transition-all">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-navy-light border-y border-white/8">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(({ icon: Icon, value, label }, i) => (
              <motion.div
                key={i}
                {...reveal}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center mx-auto mb-3">
                  <Icon size={22} className="text-blue-400" />
                </div>
                <div className="font-display font-bold text-3xl text-white">{value}</div>
                <div className="text-slate-400 text-sm mt-1">{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* About Preview */}
      <div className="bg-mesh py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div {...reveal}>
              <div className="text-blue-400 text-sm font-medium uppercase tracking-widest mb-3">About Us</div>
              <h2 className="font-display font-bold text-white text-4xl leading-tight mb-6">
                Perusahaan Teknologi Terdepan di Indonesia
              </h2>
              <p className="text-slate-400 leading-relaxed mb-6">
                PT. Nusantara Maju didirikan pada tahun 2009 dengan visi menjadi perusahaan teknologi terkemuka yang mampu menghadirkan solusi inovatif bagi dunia bisnis Indonesia. Selama lebih dari 15 tahun, kami telah melayani ratusan klien dari berbagai industri.
              </p>
              <ul className="space-y-3 mb-8">
                {['ISO 9001:2015 Certified', 'Top Employer Award 2025', 'Great Place to Work®'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-slate-300">
                    <CheckCircle size={16} className="text-blue-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold transition-colors"
              >
                Selengkapnya <ArrowRight size={16} />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop&auto=format"
                  alt="Office"
                  className="w-full h-80 object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 glass-dark rounded-xl p-4 border border-white/10">
                <div className="font-display font-bold text-white text-2xl">15+</div>
                <div className="text-slate-400 text-sm">Tahun Berpengalaman</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Vision Mission */}
      <div className="bg-navy-light py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...reveal} className="text-center mb-16">
            <div className="text-blue-400 text-sm font-medium uppercase tracking-widest mb-3">Arah Kami</div>
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
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-6">
                <Globe size={24} className="text-blue-400" />
              </div>
              <h3 className="font-display font-bold text-white text-2xl mb-4">Visi</h3>
              <p className="text-slate-300 leading-relaxed">
                Menjadi perusahaan teknologi terkemuka di Asia Tenggara yang mendorong transformasi digital dan memberikan dampak positif bagi masyarakat dan industri.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass rounded-2xl p-8 border border-cyan-500/20"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-6">
                <Award size={24} className="text-cyan-400" />
              </div>
              <h3 className="font-display font-bold text-white text-2xl mb-4">Misi</h3>
              <ul className="space-y-3">
                {['Menghadirkan solusi teknologi berkualitas tinggi', 'Membangun tim profesional yang berdedikasi', 'Mendorong inovasi berkelanjutan', 'Memberikan nilai tambah bagi klien dan mitra'].map(m => (
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

      {/* Values */}
      <div className="bg-mesh py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...reveal} className="text-center mb-16">
            <div className="text-blue-400 text-sm font-medium uppercase tracking-widest mb-3">Core Values</div>
            <h2 className="font-display font-bold text-white text-4xl">Nilai-Nilai Kami</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass rounded-xl p-6 border border-white/10 hover:border-blue-500/30 transition-all group"
              >
                <div className="text-3xl font-display font-bold text-gradient mb-3 group-hover:scale-110 transition-transform origin-left">
                  0{i + 1}
                </div>
                <h3 className="font-display font-semibold text-white mb-2">{v.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Recruitment CTA */}
      <div className="bg-navy-light py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            {...reveal}
            className="glass rounded-2xl p-10 md:p-16 text-center border border-blue-500/20 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5" />
            <div className="relative z-10">
              <div className="text-blue-400 text-sm font-medium uppercase tracking-widest mb-3">Join Our Team</div>
              <h2 className="font-display font-bold text-white text-4xl md:text-5xl mb-5">
                Siap Bergabung Bersama Kami?
              </h2>
              <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-10">
                Jadilah bagian dari tim kami yang dinamis dan inovatif. Kami mencari talenta terbaik yang siap berkembang dan berkontribusi.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/recruitment"
                  className="inline-flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-400 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-blue-500/25"
                >
                  Lihat Lowongan <ArrowRight size={18} />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 glass text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 hover:bg-white/10 border border-white/20"
                >
                  <Mail size={18} /> Hubungi Kami
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
