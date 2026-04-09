import { useEffect, useState } from "react";
import api from "../services/api";
import AddMedicalRecord from "./AddMedicalRecord";
import { motion, AnimatePresence } from "framer-motion";

function MyDoctorAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await api.get("/appointments/doctor");
      setAppointments(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError("Failed to synchronize with clinical database");
    } finally {
      setLoading(false);
    }
  };

  const markCompleted = async (appointmentId) => {
    try {
      await api.put(`/appointments/${appointmentId}/complete`);
      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === appointmentId ? { ...appt, status: "completed" } : appt
        )
      );
    } catch (err) {
      alert("System Error: Failed to update status");
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-10 h-10 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Loading Patient Queue...</p>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* --- HEADER --- */}
      <div className="flex justify-between items-end border-b border-white/5 pb-6">
        <div>
          <h3 className="text-3xl font-black text-white tracking-tight">Clinical Queue</h3>
          <p className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] italic">✦ Daily Consultation Triage</p>
        </div>
        {error && <span className="text-red-400 text-[10px] font-black uppercase">{error}</span>}
      </div>

      <div className="grid grid-cols-1 gap-4">
        <AnimatePresence>
          {appointments.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 text-center bg-white/5 rounded-[2.5rem] border border-dashed border-white/10">
              <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">No scheduled patients</p>
            </motion.div>
          ) : (
            appointments.map((appt) => (
              <motion.div
                key={appt._id}
                layout
                className={`relative overflow-hidden transition-all duration-500 rounded-[2rem] border ${
                  expandedId === appt._id ? "bg-indigo-500/10 border-indigo-500/40" : "bg-white/5 border-white/10 hover:border-white/20"
                }`}
              >
                <div className="p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  {/* PATIENT INFO */}
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                      <span className="font-black text-xl">{appt.patientId?.userId?.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h4 className="text-white font-black text-xl leading-tight">{appt.patientId?.userId?.name}</h4>
                      <div className="flex gap-3 items-center mt-1">
                        <span className="text-indigo-400 text-[10px] font-black uppercase tracking-widest">
                          {new Date(appt.appointmentDate).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-slate-700" />
                        <span className={`text-[10px] font-black uppercase tracking-tighter px-2 py-0.5 rounded-md ${
                          appt.status === "completed" ? "bg-emerald-500/20 text-emerald-400" : "bg-orange-500/20 text-orange-400"
                        }`}>
                          {appt.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* QUICK ACTIONS */}
                  <div className="flex items-center gap-3 w-full md:w-auto">
                    <button
                      onClick={() => setExpandedId(expandedId === appt._id ? null : appt._id)}
                      className="flex-1 md:flex-none px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white text-[10px] font-black uppercase tracking-widest border border-white/10 transition-all"
                    >
                      {expandedId === appt._id ? "Close Record" : "Medical Record"}
                    </button>
                    
                    {appt.status !== "completed" && (
                      <button
                        onClick={() => markCompleted(appt._id)}
                        className="flex-1 md:flex-none px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-900/40 transition-all"
                      >
                        Finalize
                      </button>
                    )}
                  </div>
                </div>

                {/* EXPANDABLE MEDICAL RECORD SECTION */}
                <AnimatePresence>
                  {expandedId === appt._id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden border-t border-white/5 bg-slate-900/40"
                    >
                      <div className="p-8">
                        <AddMedicalRecord appointmentId={appt._id} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default MyDoctorAppointments;