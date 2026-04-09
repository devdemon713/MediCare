import { useEffect, useState } from "react";
import api from "../services/api";
import { motion, AnimatePresence } from "framer-motion";

function RestoreDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchInactiveDoctors();
  }, []);

  const fetchInactiveDoctors = async () => {
    try {
      const res = await api.get("/doctors/inactive");
      setDoctors(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError("Failed to load inactive doctors");
    } finally {
      setLoading(false);
    }
  };

  const restoreDoctor = async (userId) => {
    if (!window.confirm("Restore this doctor's credentials and system access?")) return;

    try {
      await api.put(`/doctors/${userId}/restore`);
      setDoctors(prev => prev.filter(d => d.userId._id !== userId));
    } catch {
      alert("System Failure: Unable to restore medical profile");
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-10 h-10 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Scanning Archives...</p>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-2">
        <div>
          <h3 className="text-3xl font-black text-white tracking-tight">Staff Recovery</h3>
          <p className="text-purple-400 text-[10px] font-black uppercase tracking-[0.2em] italic">✦ Inactive Medical Professionals</p>
        </div>
        {error && <span className="text-red-400 text-[10px] font-bold uppercase">{error}</span>}
      </div>

      <AnimatePresence mode="popLayout">
        {doctors.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-center py-24 bg-white/5 rounded-[2.5rem] border border-dashed border-white/10"
          >
            <p className="text-slate-600 font-bold uppercase tracking-widest text-xs">No doctor profiles currently archived</p>
          </motion.div>
        ) : (
          <motion.div 
            initial="hidden" animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {doctors.map((d) => (
              <motion.div
                layout
                key={d._id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative group bg-white/5 border border-white/10 p-6 rounded-[2rem] overflow-hidden backdrop-blur-md hover:border-purple-500/40 transition-all"
              >
                {/* Background Decoration */}
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-purple-500/5 blur-3xl group-hover:bg-purple-500/10 transition-all" />
                
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <span className="text-[10px] font-mono text-slate-600 bg-white/5 px-2 py-1 rounded">
                    DOC_{d._id.slice(-4).toUpperCase()}
                  </span>
                </div>

                <h4 className="text-white font-black text-xl mb-1 truncate">{d.userId?.name}</h4>
                <p className="text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6">
                  {d.specialization}
                </p>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => restoreDoctor(d.userId._id)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-purple-900/40 hover:shadow-purple-500/20 transition-all"
                >
                  Restore Access
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default RestoreDoctors;