import { useState } from "react";
import api from "../services/api";
import { motion, AnimatePresence } from "framer-motion";

function AddDoctor() {
  const [userId, setUserId] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [fee, setFee] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null); // 'success' or 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setStatus(null);

    try {
      await api.post("/doctors", {
        userId,
        specialization,
        availableDays: ["Monday", "Wednesday"], // Default schedule
        consultationFee: fee,
      });

      setMessage("Doctor credentials authorized successfully");
      setStatus("success");
      
      // Reset form
      setUserId("");
      setSpecialization("");
      setFee("");
    } catch (err) {
      console.error("Authorization error:", err);
      setMessage(err.response?.data?.message || "Internal Protocol Error: Failed to add doctor");
      setStatus("error");
    }
  };

  const inputStyles = "w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all backdrop-blur-sm";

  return (
    <div className="relative min-h-[70vh] flex items-center justify-center py-8 px-4">
      
      {/* GLASS CARD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg p-8 md:p-10 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-2xl shadow-2xl relative z-10"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="inline-block p-4 rounded-2xl bg-blue-500/10 text-blue-400 mb-4"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </motion.div>
          <h2 className="text-3xl font-black text-white tracking-tight">Onboard Doctor</h2>
          <p className="text-slate-400 mt-2 text-sm uppercase tracking-widest font-bold italic opacity-70">✦ Medical Staff Registry</p>
        </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <motion.div whileTap={{ scale: 0.99 }}>
          <input
            placeholder="System User ID"
            className={inputStyles}
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </motion.div>

        <motion.div whileTap={{ scale: 0.99 }}>
          <input
            placeholder="Field of Specialization"
            className={inputStyles}
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            required
          />
        </motion.div>

        <motion.div whileTap={{ scale: 0.99 }}>
          <div className="relative">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 font-bold">$</span>
            <input
              type="number"
              placeholder="Consultation Fee"
              className={`${inputStyles} pl-10`}
              value={fee}
              onChange={(e) => setFee(e.target.value)}
              required
            />
          </div>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.02, shadow: "0 0 25px rgba(59,130,246,0.4)" }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-cyan-500 text-white font-black py-4 rounded-2xl transition-all duration-300 uppercase tracking-widest shadow-lg mt-4"
        >
          Authorize Practitioner
        </motion.button>
      </form>

      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`mt-6 p-4 rounded-2xl text-[11px] text-center font-black uppercase tracking-wider backdrop-blur-md border ${
              status === "success" 
                ? "bg-blue-500/10 border-blue-500/20 text-blue-400" 
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

export default AddDoctor;