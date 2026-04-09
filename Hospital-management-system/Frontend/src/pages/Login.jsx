import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });
      const backendRole = res.data.role;

      if (backendRole !== role) {
        setError(`Access Denied. You are registered as ${backendRole}.`);
        setIsLoading(false);
        return;
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", backendRole);
      navigate(`/${backendRole}`);
    } catch (err) {
      setError(err.response?.data?.message || "Authentication failed");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0f1d] relative overflow-hidden px-4">
      
      {/* --- DYNAMIC BACKGROUND ORBS --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full" 
        />
        <motion.div 
          animate={{ x: [0, -80, 0], y: [0, 100, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-emerald-500/10 blur-[120px] rounded-full" 
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50 contrast-150" />
      </div>

      {/* --- LOGIN CARD --- */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-white/5 md:mt-16 backdrop-blur-2xl border border-white/10 px-8 py-5 md:p-10 rounded-[2.5rem] shadow-2xl">
          
          <div className="text-center mb-8 ">
            
            <h2 className="text-3xl font-black text-white tracking-tight">Welcome Back</h2>
            <p className="text-slate-400 mt-2">Access the <span className="text-blue-400">BetterLife</span> portal</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Role Switcher (Replaces the boring select) */}
            <div className="flex bg-slate-900/50 p-1 rounded-2xl border border-white/5 gap-1">
              {['patient', 'doctor', 'admin'].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 ${
                    role === r ? "bg-blue-600 text-white shadow-lg" : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 ml-1 uppercase">Email Address</label>
              <input
                type="email"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                placeholder="name@hospital.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 ml-1 uppercase">Password</label>
              <input
                type="password"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02, shadow: "0 0 20px rgba(37,99,235,0.4)" }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                "Sign In to Dashboard"
              )}
            </motion.button>
          </form>

          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center font-medium"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-8 text-center">
            <Link to="/" className="text-slate-500 hover:text-blue-400 text-sm transition-colors font-medium">
              ← Back to homepage
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;