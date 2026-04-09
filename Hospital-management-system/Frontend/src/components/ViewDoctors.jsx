import { useEffect, useState } from "react";
import api from "../services/api";
import { motion, AnimatePresence } from "framer-motion";

function ViewDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("table");
  const [search, setSearch] = useState("");

  useEffect(() => { fetchDoctors(); }, []);

  const fetchDoctors = async () => {
    try {
      const res = await api.get("/doctors");
      setDoctors(res.data);
    } catch (err) { console.error(err); } 
    finally { setLoading(false); }
  };

  const deactivateDoctor = async (userId) => {
    if (!window.confirm("Deactivate this doctor?")) return;
    try {
      await api.put(`/doctors/${userId}/deactivate`);
      setDoctors((prev) => prev.filter((d) => d.userId._id !== userId));
    } catch { alert("Failed to deactivate doctor"); }
  };

  const filteredDoctors = doctors.filter((doc) =>
    doc.userId?.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Accessing Secure Records...</p>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header & Filter Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h3 className="text-2xl font-black text-white tracking-tight">Staff Registry</h3>
        
        <div className="flex w-full md:w-auto gap-2">
          <input
            type="text"
            placeholder="Search Registry..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-grow bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
          <div className="flex bg-slate-900/50 p-1 rounded-xl border border-white/5">
            {['table', 'cards'].map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${
                  view === v ? "bg-blue-600 text-white shadow-lg" : "text-slate-500"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {view === "table" ? (
          <motion.div 
            key="table" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="overflow-x-auto rounded-2xl border border-white/10"
          >
            <table className="w-full text-left">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase">Name</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase">Specialization</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredDoctors.map((d) => (
                  <tr key={d._id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 text-white font-bold">{d.userId?.name}</td>
                    <td className="px-6 py-4">
                      <span className="text-blue-400 text-xs font-bold px-2 py-1 rounded-lg bg-blue-500/10">
                        {d.specialization}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => deactivateDoctor(d.userId._id)}
                        className="text-red-500 text-[10px] font-black uppercase hover:text-red-400"
                      >
                        Deactivate
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        ) : (
          <motion.div 
            key="cards" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {filteredDoctors.map((d) => (
              <div key={d._id} className="bg-white/5 border border-white/10 p-5 rounded-[2rem] hover:border-blue-500/40 transition-all group">
                <h4 className="text-white font-black text-lg mb-1">{d.userId?.name}</h4>
                <p className="text-blue-400 text-[10px] font-black uppercase tracking-widest mb-4">{d.specialization}</p>
                <button
                  onClick={() => deactivateDoctor(d.userId._id)}
                  className="w-full py-2.5 rounded-xl bg-red-500/10 text-red-500 text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all"
                >
                  Deactivate
                </button>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ViewDoctors;