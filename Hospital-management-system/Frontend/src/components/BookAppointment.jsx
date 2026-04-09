import { useEffect, useState } from "react";
import api from "../services/api";
import { motion, AnimatePresence } from "framer-motion";

function BookAppointment() {
  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await api.get("/doctors");
        setDoctors(res.data);
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    };
    fetchDoctors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setStatus(null);

    try {
      await api.post("/appointments", {
        doctorId,
        appointmentDate: date,
        timeSlot: "10:00 AM", // You can expand this to a state-based picker later
      });
      setMessage("Appointment secured successfully");
      setStatus("success");
      setDoctorId("");
      setDate("");
    } catch (err) {
      console.error(err.response?.data || err.message);
      setMessage(err.response?.data?.message || "Scheduling conflict: Failed to book");
      setStatus("error");
    }
  };

  const inputStyles = "w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all backdrop-blur-sm appearance-none";

  return (
    <div className="relative min-h-[60vh] flex items-center justify-center py-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 md:p-10 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-2xl shadow-2xl relative"
      >
        {/* HEADER */}
        <div className="text-center mb-10">
          <div className="inline-block p-4 rounded-2xl bg-cyan-500/10 text-cyan-400 mb-4 shadow-inner">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight">Schedule Visit</h2>
          <p className="text-slate-400 mt-2 text-[10px] font-black uppercase tracking-[0.2em] italic opacity-60">✦ BetterLife Appointment Protocol</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* DOCTOR SELECT */}
          <div className="relative">
            <select
              value={doctorId}
              onChange={(e) => setDoctorId(e.target.value)}
              className={inputStyles}
              required
            >
              <option value="" className="bg-slate-900 text-slate-500">Select Specialist</option>
              {doctors.map((doc) => (
                <option key={doc._id} value={doc._id} className="bg-slate-900 text-white">
                  Dr. {doc.userId?.name} — {doc.specialization}
                </option>
              ))}
            </select>
            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M19 9l-7 7-7-7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* DATE INPUT */}
          <div className="group">
            <label className="block text-[10px] font-black text-cyan-500 uppercase tracking-widest ml-4 mb-2 opacity-0 group-focus-within:opacity-100 transition-opacity">
              Preferred Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={`${inputStyles} cursor-pointer invert-[0.9] brightness-[1.5] contrast-[0.9]`}
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02, shadow: "0 0 20px rgba(6,182,212,0.3)" }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-black py-4 rounded-2xl transition-all duration-300 uppercase tracking-widest shadow-lg"
          >
            Confirm Slot
          </motion.button>
        </form>

        {/* FEEDBACK MESSAGE */}
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`mt-8 p-4 rounded-2xl text-[10px] text-center font-black uppercase tracking-widest border backdrop-blur-md ${
                status === "success" 
                  ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-400" 
                  : "bg-red-500/10 border-red-500/20 text-red-400"
              }`}
            >
              {message}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default BookAppointment;