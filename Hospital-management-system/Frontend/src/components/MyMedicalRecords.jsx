import { useEffect, useState } from "react";
import api from "../services/api";
import { motion } from "framer-motion";

function MyMedicalRecords() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const res = await api.get("/medical-records/my");
      setRecords(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError("Protocol Error: Unable to sync health data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-10 h-10 border-2 border-teal-500 border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Decrypting Vault...</p>
    </div>
  );

  if (error) return (
    <div className="p-8 bg-red-500/10 border border-red-500/20 rounded-[2rem] text-center">
      <p className="text-red-400 font-black uppercase text-xs tracking-widest">{error}</p>
    </div>
  );

  return (
    <div className="space-y-10">
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-white/5 pb-8">
        <div>
          <h3 className="text-4xl font-black text-white tracking-tight">Health Vault</h3>
          <p className="text-teal-400 text-[10px] font-black uppercase tracking-[0.2em] italic">✦ Verified Clinical History</p>
        </div>
        <div className="flex items-center gap-2 text-slate-500">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span className="text-[10px] font-black uppercase tracking-widest">End-to-End Encrypted</span>
        </div>
      </div>

      {records.length === 0 ? (
        <div className="text-center py-24 bg-white/5 rounded-[2.5rem] border border-dashed border-white/10">
          <p className="text-slate-600 font-bold uppercase tracking-widest text-xs">No medical documentation found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8">
          {records.map((r, index) => (
            <motion.div
              key={r._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden backdrop-blur-md flex flex-col md:flex-row hover:border-teal-500/30 transition-all"
            >
              {/* DATE SIDEBAR */}
              <div className="w-full md:w-48 bg-teal-500/5 border-b md:border-b-0 md:border-r border-white/5 p-8 flex flex-col justify-center items-center text-center">
                <span className="text-teal-500 text-[10px] font-black uppercase tracking-widest mb-1 opacity-60">Verified Date</span>
                <span className="text-white font-black text-2xl tracking-tighter">
                  {new Date(r.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </span>
                <span className="text-slate-500 text-xs font-bold mt-1">
                  {new Date(r.createdAt).getFullYear()}
                </span>
              </div>

              {/* CONTENT AREA */}
              <div className="flex-1 p-8 md:p-10">
                <div className="flex flex-wrap justify-between items-start gap-4 mb-8">
                  <div>
                    <span className="text-teal-500 text-[9px] font-black uppercase tracking-widest block mb-1">Attending Physician</span>
                    <h4 className="text-white font-black text-xl tracking-tight leading-none">
                      Dr. {r.doctorId?.userId?.name || "Unassigned"}
                    </h4>
                  </div>
                  <div className="bg-slate-900/80 px-4 py-2 rounded-xl border border-white/5">
                    <span className="text-[9px] text-slate-500 font-black uppercase block mb-1">Diagnosis</span>
                    <span className="text-teal-400 text-sm font-bold">{r.diagnosis}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* PRESCRIPTION */}
                  <div className="space-y-2">
                    <h5 className="text-[10px] font-black text-white uppercase tracking-[0.2em] flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                      Prescription
                    </h5>
                    <div className="bg-white/5 rounded-2xl p-4 border border-white/5 text-slate-300 text-sm leading-relaxed italic">
                      "{r.prescription}"
                    </div>
                  </div>

                  {/* CLINICAL NOTES */}
                  <div className="space-y-2">
                    <h5 className="text-[10px] font-black text-white uppercase tracking-[0.2em] flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                      Physician Notes
                    </h5>
                    <p className="text-slate-400 text-sm leading-relaxed px-1">
                      {r.notes || "No additional observations recorded."}
                    </p>
                  </div>
                </div>
              </div>

              {/* ACCENT GLOW */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 blur-[60px] pointer-events-none group-hover:bg-teal-500/10 transition-all" />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyMedicalRecords;