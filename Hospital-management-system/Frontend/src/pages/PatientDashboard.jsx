import { useState } from "react";
import BookAppointment from "../components/BookAppointment";
import MyAppointments from "../components/MyAppointments";
import DashboardLayout from "../components/DashboardLayout";
import MyMedicalRecords from "../components/MyMedicalRecords";
import { motion, AnimatePresence } from "framer-motion";

function PatientDashboard() {
  const [view, setView] = useState("book");

  const navItems = [
    { id: "book", label: "New Appointment", icon: "➕" },
    { id: "appointments", label: "My Schedule", icon: "📅" },
    { id: "records", label: "Health Vault", icon: "📑" },
  ];

  return (
    <DashboardLayout title="Health Portal">
      <div className="space-y-10">
        
        {/* --- PATIENT WELCOME HEADER --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative p-10 rounded-[3rem] bg-gradient-to-br from-emerald-600 to-teal-700 shadow-2xl shadow-emerald-900/30 overflow-hidden"
        >
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-4xl font-black text-white tracking-tight italic">Hello, Patient</h2>
            <p className="text-emerald-50 text-sm mt-3 font-medium opacity-90 leading-relaxed">
              Welcome to your BetterLife command center. From here, you can manage your consultations, 
              access prescriptions, and track your wellness journey in real-time.
            </p>
          </div>
          
          {/* Abstract Bio-Metric Decoration */}
          <div className="absolute right-[-5%] top-[-20%] opacity-20 pointer-events-none">
            <svg width="300" height="300" viewBox="0 0 200 200" fill="none">
              <path d="M40 100 Q 60 40, 100 100 T 160 100" stroke="white" strokeWidth="2" fill="none" />
              <circle cx="100" cy="100" r="80" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
            </svg>
          </div>
        </motion.div>

        {/* --- NAVIGATION SYSTEM --- */}
        <div className="flex flex-wrap items-center gap-3 p-2 bg-white/5 border border-white/10 rounded-[2.5rem] w-fit backdrop-blur-xl mx-auto md:mx-0">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`relative px-8 py-4 rounded-[2rem] text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${
                view === item.id 
                ? "text-white" 
                : "text-slate-500 hover:text-emerald-400"
              }`}
            >
              {view === item.id && (
                <motion.div 
                  layoutId="patientActiveTab"
                  className="absolute inset-0 bg-emerald-600 rounded-[2rem] shadow-lg shadow-emerald-900/40"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-3">
                <span className="text-base">{item.icon}</span>
                {item.label}
              </span>
            </button>
          ))}
        </div>

        {/* --- DYNAMIC VIEWPORT --- */}
        <motion.div
          key={view}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="min-h-[500px]"
        >
          <div className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-4 md:p-8 backdrop-blur-sm">
            {view === "book" && <BookAppointment />}
            {view === "appointments" && <MyAppointments />}
            {view === "records" && <MyMedicalRecords />}
          </div>
        </motion.div>

      </div>
    </DashboardLayout>
  );
}

export default PatientDashboard;