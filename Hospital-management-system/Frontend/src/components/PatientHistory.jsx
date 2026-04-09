import { useEffect, useState } from "react";
import api from "../services/api";
import { motion } from "framer-motion";

function PatientHistory() {
  const [records, setRecords] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get("/medical-records/my");
        setRecords(res.data);
      } catch (err) {
        console.error(err.response?.data || err.message);
        setError("Synchronization Error: Failed to retrieve medical history");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-10 h-10 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Reconstructing History...</p>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-white/5 pb-8">
        <div>
          <h3 className="text-3xl font-black text-white tracking-tight">Clinical History</h3>
          <p className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] italic">✦ Longitudinal Patient Records</p>
        </div>
        {error && (
          <div className="px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-xl">
            <span className="text-red-400 text-[10px] font-black uppercase tracking-widest">{error}</span>
          </div>
        )}
      </div>

      {records.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="text-center py-24 bg-white/5 rounded-[2.5rem] border border-dashed border-white/10"
        >
          <p className="text-slate-600 font-bold uppercase tracking-widest text-xs">No entries found in clinical history</p>
        </motion.div>
      ) : (
        <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-emerald-500/40 before:via-white/5 before:to-transparent">
          {records.map((record, index) => (
            <motion.div
              key={record._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
            >
              {/* Timeline Dot */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-[#030712] text-emerald-500 shadow-xl z-10 absolute left-0 md:left-1/2 md:-translate-x-1/2 group-hover:border-emerald-500 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>

              {/* Content Card */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-md hover:border-emerald-500/30 transition-all shadow-2xl ml-auto md:ml-0">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-emerald-500 text-[10px] font-black uppercase tracking-widest block">Consulting Physician</span>
                    <h4 className="text-white font-bold text-lg leading-tight">Dr. {record.doctorId?.name}</h4>
                  </div>
                  <time className="text-slate-500 text-[10px] font-mono bg-white/5 px-2 py-1 rounded">
                    {new Date(record.createdAt).toLocaleDateString()}
                  </time>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-slate-900/50 border border-white/5">
                    <p className="text-[9px] text-slate-500 font-black uppercase tracking-tighter mb-1">Diagnosis</p>
                    <p className="text-emerald-400 text-sm font-bold tracking-tight">{record.diagnosis}</p>
                  </div>

                  <div className="grid gap-4">
                    <div>
                      <h5 className="text-[9px] font-black text-white uppercase tracking-widest mb-2 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Prescription
                      </h5>
                      <p className="text-slate-300 text-xs leading-relaxed italic border-l-2 border-white/10 pl-3">
                        {record.prescription}
                      </p>
                    </div>

                    {record.notes && (
                      <div>
                        <h5 className="text-[9px] font-black text-white uppercase tracking-widest mb-2 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                          Clinical Notes
                        </h5>
                        <p className="text-slate-400 text-xs leading-relaxed pl-3 italic">
                          {record.notes}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PatientHistory;