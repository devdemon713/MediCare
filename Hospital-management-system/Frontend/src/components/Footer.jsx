import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/betterlife-logo.png";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative  border-t border-white/10 bg-[#0a0f1d] overflow-hidden">
      {/* Background Decorative Element - Cyan Glow */}
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-blue-600/10 blur-[120px] rounded-full -z-10" />
      
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="md:col-span-1">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="p-2 bg-blue-600/20 rounded-xl backdrop-blur-md border border-blue-500/30">
                <img src={logo} alt="BetterLife" className="h-8 w-auto" />
              </div>
              <h2 className="text-2xl font-black text-white tracking-tighter">
                Better<span className="text-blue-500">Life</span>
              </h2>
            </motion.div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Leading the digital transformation in healthcare. Providing secure, 
              scalable, and intuitive management solutions for modern medical institutions.
            </p>
            <div className="flex gap-4">
              {['twitter', 'linkedin', 'github'].map((social) => (
                <motion.a
                  key={social}
                  href={`#${social}`}
                  whileHover={{ y: -3, color: '#3b82f6' }}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 transition-colors"
                >
                  <span className="sr-only">{social}</span>
                  <div className="w-5 h-5 bg-current mask-contain" /> {/* Replace with actual icons */}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Navigation</h3>
            <ul className="space-y-4">
              {["Home", "About", "Services", "Contact"].map((item) => (
                <li key={item}>
                  <Link 
                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="text-slate-400 hover:text-blue-400 text-sm transition-all flex items-center group"
                  >
                    <motion.span 
                      className="w-0 h-[1px] bg-blue-500 mr-0 group-hover:w-4 group-hover:mr-2 transition-all"
                    />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Emergency Care</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="mt-1 text-blue-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </div>
                <div>
                  <p className="text-[10px] uppercase text-slate-500 font-bold tracking-tighter">Email Support</p>
                  <p className="text-slate-300 text-sm">emergency@betterlife.com</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 text-emerald-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                </div>
                <div>
                  <p className="text-[10px] uppercase text-slate-500 font-bold tracking-tighter">24/7 Hotline</p>
                  <p className="text-slate-300 text-sm">+91 98765 43210</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter / Badge */}
          <div className="bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-sm">
            <h3 className="text-white font-bold mb-2">Hospital Status</h3>
            <div className="flex items-center gap-2 mb-4">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-emerald-400 text-xs font-mono uppercase">Systems Operational</span>
            </div>
            <p className="text-slate-500 text-xs mb-4">
              Verified secure & HIPAA compliant medical data management.
            </p>
            <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  transition={{ duration: 2 }}
                  className="h-full bg-blue-600"
                />
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-xs">
            © {currentYear} BetterLife Platform. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-slate-500 hover:text-white text-xs transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-slate-500 hover:text-white text-xs transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;