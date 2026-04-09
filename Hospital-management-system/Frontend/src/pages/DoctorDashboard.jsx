import { useState } from "react";
import MyDoctorAppointments from "../components/MyDoctorAppointments";
import DashboardLayout from "../components/DashboardLayout";
import { motion } from "framer-motion";

function DoctorDashboard() {
  const [view, setView] = useState("appointments");

  // Navigation Config
  const tabs = [
    { id: "appointments", label: "Patient Queue", icon: "📋" },
    { id: "schedule", label: "My Schedule", icon: "🗓️" }, // Placeholder for future expansion
    { id: "analytics", label: "Performance", icon: "📈" }, // Placeholder for future expansion
  ];

  return (
    <DashboardLayout title="Clinical Operations">
      <div className="space-y-8">
        
        {/* --- DOCTOR WELCOME & QUICK STATS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:col-span-2 p-8 rounded-[2.5rem] bg-gradient-to-br from-indigo-600 to-blue-700 text-white shadow-2xl shadow-indigo-900/20 relative overflow-hidden"
          >
            <div className="relative z-10">
              <h2 className="text-3xl font-black tracking-tight">Welcome back, Specialist</h2>
              <p className="text-indigo-100 text-sm mt-2 opacity-80 font-medium italic">
                You have active consultations waiting in the queue.
              </p>
            </div>
            {/* Abstract Background Decoration */}
            <div className="absolute right-[-10%] top-[-20%] w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-md flex flex-col justify-center"
          >
            <span className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Status</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-white font-bold text-xl tracking-tight">On Duty</span>
            </div>
          </motion.div>
        </div>

        {/* --- TAB NAVIGATION --- */}
        <div className="flex items-center gap-2 p-1.5 bg-white/5 border border-white/10 rounded-[2rem] w-fit backdrop-blur-xl">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setView(tab.id)}
              className={`relative px-6 py-3 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                view === tab.id 
                ? "text-white" 
                : "text-slate-500 hover:text-slate-300"
              }`}
            >
              {view === tab.id && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute inset-0 bg-indigo-600 rounded-[1.5rem] shadow-lg shadow-indigo-900/40"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <span className="text-sm">{tab.icon}</span>
                {tab.label}
              </span>
            </button>
          ))}
        </div>

        {/* --- VIEW RENDERER --- */}
        <motion.div
          key={view}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.3 }}
          className="min-h-[400px]"
        >
          {view === "appointments" ? (
            <MyDoctorAppointments />
          ) : (
            <div className="py-20 text-center bg-white/5 rounded-[2.5rem] border border-dashed border-white/10">
              <p className="text-slate-600 font-bold uppercase tracking-widest text-xs italic">
                Module "{view}" is currently initializing...
              </p>
            </div>
          )}
        </motion.div>

      </div>
    </DashboardLayout>
  );
}

export default DoctorDashboard;