import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    // Added flex flex-col to prevent margin collapse "gaps"
    <div className="bg-[#0a0f1d] min-h-screen flex flex-col overflow-x-hidden selection:bg-blue-500 selection:text-white">
      
      {/* GLOBAL BACKGROUND ELEMENTS - Fixed to stay behind all sections */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full" 
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute top-1/2 -right-24 w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full" 
        />
        {/* Subtle Grid Pattern to bridge the gaps visually */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50 contrast-150"></div>
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative w-full pt-32 pb-16 md:pt-48 md:pb-24 px-6 flex-shrink-0">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1.5 mb-6 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md"
          >
            <span className="text-blue-400 text-sm font-bold tracking-widest uppercase italic">
              ✦ The Future of Healthcare Management
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black mb-8 leading-tight text-white tracking-tight"
          >
            Precision Care, <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
              Simplified Operations.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-slate-400 leading-relaxed"
          >
            BetterLife bridges the gap between medical expertise and technological efficiency. 
            Manage patients, schedules, and records in a single, high-performance ecosystem.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <Link to="/login" className="group relative px-8 py-4 rounded-2xl bg-blue-600 text-white font-bold overflow-hidden transition-all hover:shadow-[0_0_30px_-5px_rgba(37,99,235,0.6)]">
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative z-10">Launch Dashboard</span>
            </Link>
            <Link to="/services" className="px-8 py-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md text-white font-bold hover:bg-white/10 transition-all">
              Explore Features
            </Link>
          </motion.div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      {/* Removed excess top margin/padding to close the gap */}
      <section className="w-full max-w-7xl mx-auto px-6 py-10 flex-shrink-0">
        <div className="flex flex-col items-center mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Powerful Core Modules</h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full" />
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <motion.div variants={fadeInUp} className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-all hover:-translate-y-2 backdrop-blur-sm shadow-xl">
            <div className="w-14 h-14 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6 text-blue-400 group-hover:scale-110 transition-transform">
               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            </div>
            <h3 className="text-xl font-bold mb-4 text-white">Smart Scheduling</h3>
            <p className="text-slate-400 leading-relaxed">AI-driven appointment booking that minimizes wait times and optimizes doctor availability.</p>
          </motion.div>

          <motion.div variants={fadeInUp} className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-emerald-500/50 transition-all hover:-translate-y-2 backdrop-blur-sm shadow-xl">
            <div className="w-14 h-14 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-6 text-emerald-400 group-hover:scale-110 transition-transform">
               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
            </div>
            <h3 className="text-xl font-bold mb-4 text-white">Unified Portal</h3>
            <p className="text-slate-400 leading-relaxed">Role-specific interfaces for Admins, Doctors, and Patients with bank-grade security protocols.</p>
          </motion.div>

          <motion.div variants={fadeInUp} className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all hover:-translate-y-2 backdrop-blur-sm shadow-xl">
            <div className="w-14 h-14 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-6 text-purple-400 group-hover:scale-110 transition-transform">
               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>
            </div>
            <h3 className="text-xl font-bold mb-4 text-white">Secure EMR</h3>
            <p className="text-slate-400 leading-relaxed">Instant access to electronic medical records while maintaining HIPAA-compliant data encryption.</p>
          </motion.div>
        </motion.div>
      </section>

      {/* --- CALL TO ACTION --- */}
      <section className="relative py-10 px-6 flex-shrink-0">
        <div className="max-w-5xl mx-auto">
          <div className="p-12 md:p-20 rounded-[3rem] bg-gradient-to-br from-blue-600 to-blue-800 shadow-2xl relative overflow-hidden text-center border border-white/10">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                </svg>
            </div>
            <motion.h2 whileInView={{ opacity: 1, scale: 1 }} initial={{ opacity: 0, scale: 0.9 }} className="text-3xl md:text-5xl font-black mb-6 text-white">
              Ready to Upgrade Your Care?
            </motion.h2>
            <p className="text-blue-100 mb-10 text-lg max-w-2xl mx-auto font-medium">Join 50+ medical centers currently using BetterLife to redefine their patient experience.</p>
            <Link to="/login" className="inline-block bg-white text-blue-700 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-all hover:scale-105 active:scale-95 shadow-xl">
              Sign In to Your Account
            </Link>
          </div>
        </div>
      </section>

    
    </div>
  );
}

export default Home;