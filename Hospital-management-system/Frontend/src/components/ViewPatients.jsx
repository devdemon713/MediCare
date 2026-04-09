import { useEffect, useState } from "react";
import api from "../services/api";
import { motion, AnimatePresence } from "framer-motion";

function ViewPatients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("table");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const res = await api.get("/patients");
      setPatients(res.data);
    } finally {
      setLoading(false);
    }
  };

  const deactivatePatient = async (patientId) => {
    if (!window.confirm("Are you sure you want to deactivate this patient record?")) return;

    try {
      await api.put(`/patients/${patientId}/deactivate`);
      setPatients((prev) => prev.filter((p) => p._id !== patientId));
    } catch {
      alert("System Error: Failed to deactivate patient");
    }
  };

  const filteredPatients = patients.filter((p) =>
    p.userId?.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mb-4" />
      <p className="text-slate-500 text-xs font-black tracking-widest uppercase italic">Fetching Records...</p>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* --- CONTROL BAR --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-3xl font-black text-white tracking-tight">Patient Directory</h3>
          <p className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] italic">✦ Active Records Database</p>
        </div>

        <div className="flex w-full md:w-auto gap-3">
          <input
            type="text"
            placeholder="Filter by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-grow md:w-64 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
          />
          
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 backdrop-blur-md">
            {['table', 'cards'].map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${
                  view === v ? "bg-emerald-600 text-white shadow-lg" : "text-slate-500 hover:text-slate-300"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {filteredPatients.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-center py-20 bg-white/5 rounded-[2.5rem] border border-dashed border-white/10"
          >
            <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">No Patients Found</p>
          </motion.div>
        ) : view === "table" ? (
          <motion.div 
            key="table" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="overflow-x-auto rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl"
          >
            <table className="w-full text-left border-collapse">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Name</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Age</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Gender</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredPatients.map((p) => (
                  <tr key={p._id} className="hover:bg-emerald-500/5 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="text-white font-bold">{p.userId?.name}</div>
                      <div className="text-[10px] text-slate-500 font-mono">ID: {p._id.slice(-6)}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-300">{p.age}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded-md bg-white/10 text-slate-400 text-[10px] font-black uppercase tracking-tighter">
                        {p.gender}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => deactivatePatient(p._id)}
                        className="text-red-500 text-[10px] font-black uppercase tracking-widest opacity-40 group-hover:opacity-100 hover:text-red-400 transition-all"
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
            key="cards" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredPatients.map((p) => (
              <div key={p._id} className="bg-white/5 border border-white/10 p-6 rounded-[2rem] hover:border-emerald-500/40 transition-all group backdrop-blur-md">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h4 className="text-white font-black text-xl mb-1">{p.userId?.name}</h4>
                <div className="flex gap-3 mb-6">
                  <span className="text-emerald-400 text-[10px] font-black uppercase tracking-widest">{p.gender}</span>
                  <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{p.age} Years</span>
                </div>
                <button
                  onClick={() => deactivatePatient(p._id)}
                  className="w-full py-3 rounded-xl bg-red-500/10 text-red-500 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-red-500 hover:text-white transition-all duration-300"
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

export default ViewPatients;  