import { useState } from "react";
import api from "../services/api";
import { motion, AnimatePresence } from "framer-motion";

function AddMedicalRecord({ appointmentId }) {
  const [diagnosis, setDiagnosis] = useState("");
  const [prescription, setPrescription] = useState("");
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setStatus(null);

    try {
      await api.post("/medical-records", {
        appointmentId,
        diagnosis,
        prescription,
        notes,
      });
      setMessage("Medical record synchronized successfully");
      setStatus("success");
      setDiagnosis("");
      setPrescription("");
      setNotes("");
    } catch (err) {
      setMessage("Protocol Error: Failed to save record");
      setStatus("error");
    }
  };

  const inputStyles = "w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all backdrop-blur-sm";

  return (
    <div className="w-full max-w-lg mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-8 rounded-[2.5rem] bg-slate-900/40 border border-white/10 backdrop-blur-2xl shadow-2xl"
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 rounded-2xl bg-teal-500/10 text-teal-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h4 className="text-xl font-black text-white tracking-tight">Clinical Record</h4>
            <p className="text-teal-500 text-[10px] font-black uppercase tracking-widest italic opacity-80">✦ Session Documentation</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.div whileTap={{ scale: 0.99 }}>
            <input
              placeholder="Primary Diagnosis"
              className={inputStyles}
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              required
            />
          </motion.div>

          <motion.div whileTap={{ scale: 0.99 }}>
            <input
              placeholder="Prescription / Medication"
              className={inputStyles}
              value={prescription}
              onChange={(e) => setPrescription(e.target.value)}
              required
            />
          </motion.div>

          <motion.div whileTap={{ scale: 0.99 }}>
            <textarea
              placeholder="Clinical Notes & Observations"
              rows="4"
              className={`${inputStyles} resize-none`}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.02, shadow: "0 0 20px rgba(20,184,166,0.3)" }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-black py-4 rounded-2xl transition-all duration-300 uppercase tracking-widest shadow-lg mt-2"
          >
            Commit to Ledger
          </motion.button>
        </form>

        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`mt-6 p-4 rounded-2xl text-[10px] text-center font-black uppercase tracking-widest border ${
                status === "success" 
                  ? "bg-teal-500/10 border-teal-500/20 text-teal-400" 
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

export default AddMedicalRecord;