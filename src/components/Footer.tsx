import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Globe, Share2, Link2, ExternalLink, Briefcase } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-navy text-slate-300">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
                <Briefcase size={16} className="text-white" />
              </div>
              <span className="font-display font-bold text-white text-lg">PT. Nusantara Maju</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Perusahaan teknologi terdepan yang berkomitmen menghadirkan solusi inovatif untuk kemajuan bisnis Anda.
            </p>
            <div className="flex gap-3 mt-4">
              {[Globe, Share2, Link2, ExternalLink].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-500/20 hover:border-blue-500/40 transition-all"
                >
                  <Icon size={14} className="text-slate-400 hover:text-blue-400" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white mb-4 text-sm uppercase tracking-widest">Kontak</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <Mail size={15} className="text-blue-400 mt-0.5 shrink-0" />
                <span>info@nusantaramaju.co.id</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone size={15} className="text-blue-400 mt-0.5 shrink-0" />
                <span>(021) 123-4567</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="text-blue-400 mt-0.5 shrink-0" />
                <span>Jl. Sudirman No. 123, Jakarta Pusat 10220</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white mb-4 text-sm uppercase tracking-widest">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { to: '/', label: 'Home' },
                { to: '/about', label: 'About Us' },
                { to: '/contact', label: 'Contact' },
                { to: '/recruitment', label: 'Recruitment' },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="hover:text-blue-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white mb-4 text-sm uppercase tracking-widest">Jam Kerja</h4>
            <ul className="space-y-2 text-sm">
              <li>Senin – Jumat</li>
              <li className="text-blue-400 font-medium">08:00 – 17:00 WIB</li>
              <li className="mt-3 text-slate-500">Sabtu – Minggu</li>
              <li className="text-slate-500">Libur</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <span>© 2026 PT. Nusantara Maju. All Rights Reserved.</span>
          <span>Designed with care & precision</span>
        </div>
      </div>
    </footer>
  )
}
