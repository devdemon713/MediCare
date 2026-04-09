import { motion } from "framer-motion";

function Contact() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  const contactDetails = [
    { label: "Email", value: "support@betterlife.com", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
    { label: "Phone", value: "+91 98765 43210", icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" },
    { label: "Location", value: "Medical Square, India", icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" },
  ];

  return (
    <div className="bg-[#0a0f1d] min-h-screen flex flex-col overflow-x-hidden selection:bg-blue-500 selection:text-white">
      
      {/* GLOBAL BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full" 
        />
        <motion.div 
          animate={{ scale: [1.3, 1, 1.3], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute bottom-0 -right-24 w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full" 
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50"></div>
      </div>

      {/* --- HEADER --- */}
      <section className="relative pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1.5 mb-6 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md"
          >
            <span className="text-blue-400 text-sm font-bold tracking-widest uppercase italic">
              ✦ 24/7 Support Channel
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black mb-6 text-white tracking-tight"
          >
            Get in <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">Touch</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg max-w-2xl mx-auto"
          >
            Have questions about our ecosystem? Our specialized medical-tech support team is ready to assist you.
          </motion.p>
        </div>
      </section>

      {/* --- CONTENT SECTION --- */}
      <section className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start flex-grow">
        
        {/* Contact Info Cards */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="space-y-6"
        >
          <motion.div variants={fadeInUp} className="p-8 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-md shadow-xl">
            <h2 className="text-2xl font-bold text-white mb-4">Contact Information</h2>
            <p className="text-slate-400 mb-8 leading-relaxed">
              We empower healthcare providers with the tools they need to succeed. Reach out via any of these channels.
            </p>
            
            <div className="space-y-6">
              {contactDetails.map((detail, idx) => (
                <div key={idx} className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={detail.icon} />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{detail.label}</p>
                    <p className="text-white font-medium">{detail.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Social or Badge Mockup */}
          <motion.div variants={fadeInUp} className="p-1 text-center bg-gradient-to-r from-blue-500/20 to-emerald-500/20 rounded-2xl border border-white/5 backdrop-blur-sm">
             <p className="text-xs text-slate-500 py-3 font-semibold uppercase tracking-tighter italic">Trusted by 50+ Modern Medical Institutions</p>
          </motion.div>
        </motion.div>

        {/* Contact Form */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="p-8 md:p-10 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl relative overflow-hidden"
        >
          {/* Subtle Form Decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl -z-10" />
          
          <h2 className="text-2xl font-bold text-white mb-8">Send a Message</h2>
          <form className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-400 ml-1">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all shadow-inner"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-400 ml-1">Email Address</label>
              <input
                type="email"
                placeholder="john@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all shadow-inner"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-400 ml-1">Your Inquiry</label>
              <textarea
                rows="4"
                placeholder="How can we help your facility?"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all shadow-inner resize-none"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02, shadow: "0 0 25px rgba(37,99,235,0.4)" }}
              whileTap={{ scale: 0.98 }}
              type="button"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl transition-all duration-300 shadow-xl mt-4"
            >
              Send Secure Message
            </motion.button>
          </form>
        </motion.div>
      </section>

      {/* Simple Footer spacing */}
      <footer className="py-12" />
    </div>
  );
}

export default Contact;