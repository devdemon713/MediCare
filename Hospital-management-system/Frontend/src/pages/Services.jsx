import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Services() {
  // Animation Variants matching your Home theme
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  const services = [
    {
      title: "Appointment Management",
      desc: "Patients can book appointments easily while doctors manage their schedules with real-time updates.",
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />,
      color: "text-blue-400",
      bg: "bg-blue-500/20",
      border: "group-hover:border-blue-500/50"
    },
    {
      title: "Role-Based Dashboards",
      desc: "Separate dashboards for Admin, Doctors, and Patients ensure controlled access and smooth workflows.",
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />,
      color: "text-emerald-400",
      bg: "bg-emerald-500/20",
      border: "group-hover:border-emerald-500/50"
    },
    {
      title: "Patient Management",
      desc: "Admins can add, deactivate, and restore patients while maintaining complete records securely.",
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />,
      color: "text-purple-400",
      bg: "bg-purple-500/20",
      border: "group-hover:border-purple-500/50"
    },
    {
      title: "Doctor Management",
      desc: "Comprehensive tools to manage medical staff, credentials, and availability without data loss.",
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />,
      color: "text-cyan-400",
      bg: "bg-cyan-500/20",
      border: "group-hover:border-cyan-500/50"
    },
    {
      title: "Medical Records",
      desc: "Secure EMR storage linked directly to appointments, facilitating fast and accurate clinical decisions.",
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />,
      color: "text-rose-400",
      bg: "bg-rose-500/20",
      border: "group-hover:border-rose-500/50"
    },
    {
      title: "Secure Authentication",
      desc: "Advanced JWT encryption and protected routes ensure that sensitive medical data stays private.",
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />,
      color: "text-amber-400",
      bg: "bg-amber-500/20",
      border: "group-hover:border-amber-500/50"
    }
  ];

  return (
    <div className="bg-[#0a0f1d] min-h-screen flex flex-col overflow-x-hidden selection:bg-blue-500 selection:text-white">
      
      {/* GLOBAL BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full" 
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full" 
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50 contrast-150"></div>
      </div>

      {/* --- HEADER SECTION --- */}
      <section className="relative pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 mb-6 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md"
          >
            <span className="text-blue-400 text-sm font-bold tracking-widest uppercase">
              ✦ Professional Solutions
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black mb-6 text-white tracking-tight"
          >
            Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">Services</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl max-w-2xl mx-auto text-slate-400 leading-relaxed"
          >
            BetterLife provides a complete digital ecosystem for managing hospital 
            operations with enterprise-grade security and intuitive workflows.
          </motion.p>
        </div>
      </section>

      {/* --- SERVICES GRID --- */}
      <section className="w-full max-w-7xl mx-auto px-6 py-12 flex-shrink-0">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div 
              key={index}
              variants={fadeInUp} 
              className={`group p-8 rounded-3xl bg-white/5 border border-white/10 ${service.border} transition-all duration-500 hover:-translate-y-2 backdrop-blur-sm shadow-xl`}
            >
              <div className={`w-14 h-14 ${service.bg} rounded-2xl flex items-center justify-center mb-6 ${service.color} group-hover:scale-110 transition-transform duration-500`}>
                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   {service.icon}
                 </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white group-hover:text-blue-400 transition-colors">
                {service.title}
              </h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* --- CALL TO ACTION --- */}
      <section className="relative py-20 px-6 mt-auto">
        <div className="max-w-5xl mx-auto">
          <div className="p-10 md:p-16 rounded-[3rem] bg-gradient-to-br from-blue-600/20 to-blue-900/40 backdrop-blur-md shadow-2xl relative overflow-hidden text-center border border-white/10">
            {/* Subtle light streak effect */}
            <div className="absolute -inset-full top-0 h-full w-1/2 z-0 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/5 opacity-40 group-hover:animate-shine" />
            
            <motion.h2 
              whileInView={{ opacity: 1, y: 0 }} 
              initial={{ opacity: 0, y: 20 }} 
              className="text-3xl md:text-4xl font-black mb-6 text-white"
            >
              Experience the Future Today
            </motion.h2>
            <p className="text-blue-100/70 mb-10 text-lg max-w-2xl mx-auto font-medium">
              Ready to streamline your medical facility? Join our growing network of digital-first hospitals.
            </p>
            <Link to="/contact" className="inline-block bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-blue-500 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(37,99,235,0.4)]">
              Contact Sales Team
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Services;