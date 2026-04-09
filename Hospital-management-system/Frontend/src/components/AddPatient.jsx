import { useState } from "react";
import api from "../services/api";
import { motion, AnimatePresence } from "framer-motion";

function AddPatient() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null); // 'success' or 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setStatus(null);

    try {
      await api.post("/patients", {
        name,
        email,
        password,
        age,
        gender,
      });

      setMessage("Patient added successfully");
      setStatus("success");
      
      // Clear form fields
      setName("");
      setEmail("");
      setPassword("");
      setAge("");
      setGender("");
    } catch (err) {
      console.error("Backend error:", err.response?.data || err.message);
      setMessage(err.response?.data?.message || "Patient creation failed");
      setStatus("error");
    }
  };

  const inputStyles = "w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all backdrop-blur-sm";

  return (
    <div className="relative min-h-[70vh] flex items-center justify-center py-8 px-4">
      
      {/* FORM CARD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg p-8 md:p-10 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-2xl shadow-2xl relative z-10"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="inline-block p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 mb-4"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </motion.div>
          <h2 className="text-3xl font-black text-white tracking-tight">Register Patient</h2>
          <p className="text-slate-400 mt-2 text-sm uppercase tracking-widest font-bold italic opacity-70">✦ New Entry Protocol</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.div whileTap={{ scale: 0.99 }}>
            <input
              placeholder="Full Name"
              className={inputStyles}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div whileTap={{ scale: 0.99 }}>
              <input
                type="email"
                placeholder="Email Address"
                className={inputStyles}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </motion.div>
            <motion.div whileTap={{ scale: 0.99 }}>
              <input
                type="password"
                placeholder="Access Password"
                className={inputStyles}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div whileTap={{ scale: 0.99 }}>
              <input
                type="number"
                placeholder="Age"
                className={inputStyles}
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </motion.div>
            <motion.div whileTap={{ scale: 0.99 }}>
              <input
                placeholder="Gender"
                className={inputStyles}
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              />
            </motion.div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02, shadow: "0 0 20px rgba(16,185,129,0.4)" }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-blue-500 text-white font-black py-4 rounded-2xl transition-all duration-300 uppercase tracking-widest shadow-lg mt-4"
          >
            Finalize Registration
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

export default AddPatient;