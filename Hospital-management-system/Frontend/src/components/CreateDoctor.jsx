import { useState } from "react";
import api from "../services/api";
import { motion, AnimatePresence } from "framer-motion";

function CreateDoctor() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [consultationFee, setConsultationFee] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null); // 'success' or 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setStatus(null);

    try {
      const res = await api.post("/doctors/create", {
        name,
        email,
        password,
        specialization,
        consultationFee,
      });

      setMessage(res.data.message);
      setStatus("success");

      // clear form
      setName("");
      setEmail("");
      setPassword("");
      setSpecialization("");
      setConsultationFee("");
    } catch (err) {
      console.error(err.response?.data || err.message);
      setMessage(err.response?.data?.message || "Error creating doctor");
      setStatus("error");
    }
  };

  const inputStyles = "w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all backdrop-blur-sm";

  return (
    <div className="relative min-h-[80vh] flex items-center justify-center py-12 px-4 selection:bg-blue-500">
      
      {/* FORM CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="w-full max-w-lg p-8 md:p-10 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl relative z-10"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ rotate: -10 }}
            animate={{ rotate: 0 }}
            className="inline-block p-3 rounded-2xl bg-blue-500/10 text-blue-400 mb-4"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </motion.div>
          <h2 className="text-3xl font-black text-white tracking-tight">Onboard Doctor</h2>
          <p className="text-slate-400 mt-2 text-sm uppercase tracking-widest font-bold italic opacity-70">✦ Administrative Access</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div whileTap={{ scale: 0.98 }}>
              <input
                type="text"
                placeholder="Doctor Name"
                className={inputStyles}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </motion.div>
            <motion.div whileTap={{ scale: 0.98 }}>
              <input
                type="email"
                placeholder="Email Address"
                className={inputStyles}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </motion.div>
          </div>

          <motion.div whileTap={{ scale: 0.98 }}>
            <input
              type="password"
              placeholder="System Password"
              className={inputStyles}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div whileTap={{ scale: 0.98 }}>
              <input
                type="text"
                placeholder="Specialization"
                className={inputStyles}
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                required
              />
            </motion.div>
            <motion.div whileTap={{ scale: 0.98 }}>
              <input
                type="number"
                placeholder="Consultation Fee (₹)"
                className={inputStyles}
                value={consultationFee}
                onChange={(e) => setConsultationFee(e.target.value)}
                required
              />
            </motion.div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02, shadow: "0 0 20px rgba(37,99,235,0.4)" }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-emerald-500 text-white font-black py-4 rounded-2xl transition-all duration-300 uppercase tracking-widest shadow-lg"
          >
            Create Staff Profile
          </motion.button>
        </form>

        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`mt-6 p-4 rounded-2xl text-sm text-center font-bold backdrop-blur-md border ${
                status === "success" 
                  ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
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

export default CreateDoctor;