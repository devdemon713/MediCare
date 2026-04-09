import { useEffect, useState } from "react";
import api from "../services/api";
import { motion, AnimatePresence } from "framer-motion";

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await api.get("/appointments/my");
        setAppointments(res.data);
      } catch (err) {
        console.error("Fetch error:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-10 h-10 border-2 border-sky-500 border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Accessing Schedule...</p>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* --- HEADER --- */}
      <div className="flex justify-between items-end">
        <div>
          <h3 className="text-3xl font-black text-white tracking-tight">Your Journey</h3>
          <p className="text-sky-400 text-[10px] font-black uppercase tracking-[0.2em] italic">✦ Upcoming & Past Consultations</p>
        </div>
        <div className="bg-sky-500/10 px-4 py-2 rounded-2xl border border-sky-500/20">
           <span className="text-sky-400 text-xs font-bold">{appointments.length} Total Sessions</span>
        </div>
      </div>

      <AnimatePresence>
        {appointments.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="text-center py-24 bg-white/5 rounded-[2.5rem] border border-dashed border-white/10"
          >
            <div className="text-slate-600 mb-4 flex justify-center">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">No appointments scheduled</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {appointments.map((appt, index) => (
              <motion.div
                key={appt._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden bg-white/5 border border-white/10 p-6 rounded-3xl hover:bg-white/[0.07] transition-all backdrop-blur-md"
              >
                {/* Decorative Timeline Notch */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-sky-500 opacity-30 group-hover:opacity-100 transition-opacity" />

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-sky-500/10 flex flex-col items-center justify-center text-sky-400 border border-sky-500/20">
                      <span className="text-[10px] font-black leading-none uppercase">
                        {new Date(appt.date).toLocaleString('default', { month: 'short' })}
                      </span>
                      <span className="text-xl font-black leading-none">
                        {new Date(appt.date).getDate()}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-white font-bold text-lg leading-tight">
                        Dr. {appt.doctorId?.userId?.name}
                      </h4>
                      <p className="text-sky-500/80 text-[10px] font-black uppercase tracking-widest mt-1">
                        {appt.doctorId?.specialization}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <div className="px-4 py-2 bg-slate-900/50 rounded-xl border border-white/5">
                      <p className="text-[9px] text-slate-500 font-black uppercase tracking-tighter mb-0.5">Reference ID</p>
                      <p className="text-white text-xs font-mono tracking-widest">#{appt._id.slice(-6).toUpperCase()}</p>
                    </div>

                    <div className="px-4 py-2 bg-emerald-500/10 rounded-xl border border-emerald-500/10">
                      <p className="text-[9px] text-emerald-500/70 font-black uppercase tracking-tighter mb-0.5">Status</p>
                      <p className="text-emerald-400 text-xs font-bold uppercase">Confirmed</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MyAppointments;