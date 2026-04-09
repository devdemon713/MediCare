import { motion } from "framer-motion";

function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.2 } 
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="bg-[#0a0f1d] min-h-screen flex flex-col overflow-x-hidden selection:bg-blue-500 selection:text-white">
      
      {/* GLOBAL BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 -left-24 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full" 
        />
        <motion.div 
          animate={{ scale: [1.3, 1, 1.3], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute top-3/4 -right-24 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full" 
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50 contrast-150"></div>
      </div>

      {/* --- HEADER SECTION --- */}
      <section className="relative pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 mb-6 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md"
          >
            <span className="text-blue-400 text-sm font-bold tracking-widest uppercase italic">
              ✦ Discover Our Vision
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black mb-6 text-white tracking-tight"
          >
            About <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">BetterLife</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl max-w-3xl mx-auto text-slate-400 leading-relaxed"
          >
            We are a mission-driven team dedicated to bridging the gap between clinical 
            excellence and digital efficiency through high-performance technology.
          </motion.p>
        </div>
      </section>

      {/* --- CORE CONTENT SECTION --- */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-md shadow-xl"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 text-sm">01</span>
            Our Mission
          </h2>
          <p className="text-slate-400 mb-6 leading-relaxed">
            Our mission is to provide hospitals and clinics with a reliable, 
            secure, and easy-to-use system that enhances efficiency and ensures 
            better patient outcomes.
          </p>
          <p className="text-slate-400 leading-relaxed">
            BetterLife focuses on automation, role-based access, and secure data 
            handling to ensure smooth healthcare operations in an increasingly digital world.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="p-8 rounded-[2.5rem] bg-gradient-to-br from-blue-600/10 to-emerald-500/10 border border-white/10 backdrop-blur-md shadow-xl"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-sm">02</span>
            What We Offer
          </h2>
          <ul className="space-y-4">
            {[
              "Role-based dashboards for all users",
              "Secure appointment lifecycle",
              "Encrypted digital medical records",
              "Integrated staff management",
              "High-performance MERN architecture"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-300">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <svg className="w-3 h-3 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                </div>
                <span className="text-sm font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </section>

      {/* --- VALUES SECTION --- */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Why BetterLife?</h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full mx-auto" />
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { 
                title: "Trust & Security", 
                desc: "Bank-grade JWT encryption and role-based access control to keep patient data private.",
                icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
                color: "text-blue-400"
              },
              { 
                title: "Efficiency", 
                desc: "Advanced scheduling algorithms that minimize wait times and maximize clinical throughput.",
                icon: "M13 10V3L4 14h7v7l9-11h-7z",
                color: "text-emerald-400"
              },
              { 
                title: "Modern Tech", 
                desc: "Leveraging the MERN stack for a lightning-fast, scalable, and future-proof experience.",
                icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
                color: "text-purple-400"
              }
            ].map((value, idx) => (
              <motion.div 
                key={idx}
                variants={fadeInUp}
                className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all backdrop-blur-sm shadow-xl hover:-translate-y-2"
              >
                <div className={`w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 ${value.color} group-hover:scale-110 transition-transform`}>
                   <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={value.icon} />
                   </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{value.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Bottom Spacer */}
      <div className="py-10" />
    </div>
  );
}

export default About;