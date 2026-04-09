import { useEffect, useState } from "react";
import api from "../services/api";
import { motion, AnimatePresence } from "framer-motion";

function RestorePatients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInactive();
  }, []);

  const fetchInactive = async () => {
    try {
      const res = await api.get("/patients?inactive=true");
      setPatients(res.data);
    } catch (err) {
      console.error("Fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  const restorePatient = async (id) => {
    try {
      await api.put(`/patients/${id}/restore`);
      setPatients(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      alert("Failed to restore patient record");
    }
  };

  if (loading) return (
    <div className="flex justify-center py-20">
      <div className="w-10 h-10 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="space-y-8">
      {/* --- HEADER --- */}
      <div className="flex justify-between items-end">
        <div>
          <h3 className="text-3xl font-black text-white tracking-tight">System Archives</h3>
          <p className="text-purple-400 text-[10px] font-black uppercase tracking-[0.2em] italic">✦ Deactivated Patient Registry</p>
        </div>
        <div className="hidden md:block">
           <span className="px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-[10px] font-black uppercase">
             Security Level: Admin
           </span>
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        {patients.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-24 bg-white/5 rounded-[2.5rem] border border-dashed border-white/10 backdrop-blur-sm"
          >
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-600">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            </div>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Archives are currently empty</p>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl"
          >
            <table className="w-full text-left border-collapse">
              <thead className="bg-purple-500/10 border-b border-white/10">
                <tr>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Patient Details</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Contact Info</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Registry Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {patients.map((p) => (
                  <motion.tr 
                    layout
                    key={p._id} 
                    exit={{ opacity: 0, x: -20 }}
                    className="hover:bg-purple-500/5 transition-colors group"
                  >
                    <td className="px-6 py-5">
                      <div className="text-white font-bold">{p.userId?.name}</div>
                      <div className="text-[10px] text-purple-400 font-mono">ARCHIVE_ID: {p._id.slice(-6).toUpperCase()}</div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="text-slate-300 text-sm">{p.userId?.email}</div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => restorePatient(p._id)}
                        className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-purple-900/40 transition-all"
                      >
                        Restore Record
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default RestorePatients;