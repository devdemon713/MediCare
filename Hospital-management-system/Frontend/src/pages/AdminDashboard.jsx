import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CreateDoctor from "../components/CreateDoctor";
import ViewDoctors from "../components/ViewDoctors";
import AddPatient from "../components/AddPatient";
import ViewPatients from "../components/ViewPatients";
import RestorePatient from "../components/RestorePatient";
import DashboardLayout from "../components/DashboardLayout";
import RestoreDoctors from "../components/RestoreDoctors";

function AdminDashboard() {
  const [view, setView] = useState("viewDoctors");

  const menuItems = [
    { id: "viewDoctors", label: "View Doctors" },
    { id: "createDoctor", label: "Create Doctor" },
    { id: "addPatient", label: "Add Patient" },
    { id: "viewPatients", label: "View Patients" },
    { id: "restorePatients", label: "Restore Patients" },
    { id: "restoreDoctors", label: "Restore Doctors" },
  ];

  return (
    <DashboardLayout title="Admin Portal">
      {/* --- BACKGROUND ORBS (Matching Login Theme) --- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-[#0a0f1d]">
        <motion.div 
          animate={{ x: [0, 120, 0], y: [0, 80, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-blue-600/15 blur-[100px] rounded-full" 
        />
        <motion.div 
          animate={{ x: [0, -100, 0], y: [0, 120, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full" 
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50" />
      </div>

      <div className="space-y-6 relative z-10">
        {/* --- ROLE NAVIGATION GRID --- */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 bg-slate-900/40 p-1.5 rounded-[2rem] border border-white/5 backdrop-blur-md gap-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`py-3 px-2 text-[10px] md:text-xs font-bold uppercase tracking-tighter md:tracking-wider rounded-2xl transition-all duration-300 ${
                view === item.id 
                  ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]" 
                  : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* --- CONTENT AREA (Frosted Glass Card) --- */}
        <motion.div 
          key={view}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/5 backdrop-blur-2xl border border-white/10 p-6 md:p-8 rounded-[2.5rem] shadow-2xl min-h-[60vh]"
        >
          <AnimatePresence mode="wait">
            {view === "viewDoctors" && <ViewDoctors />}
            {view === "createDoctor" && <CreateDoctor />}
            {view === "addPatient" && <AddPatient />}
            {view === "viewPatients" && <ViewPatients />}
            {view === "restorePatients" && <RestorePatient />}
            {view === "restoreDoctors" && <RestoreDoctors />}
          </AnimatePresence>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}

export default AdminDashboard;