import { useState } from "react";
import {
  Activity,
  Stethoscope,
  Users,
  UserPlus,
  History,
  Search,
  Bell,
  MoreHorizontal,
  ChevronRight,
  Database,
  Shield
} from "lucide-react";

import CreateDoctor from "../components/CreateDoctor";
import ViewDoctors from "../components/ViewDoctors";
import AddPatient from "../components/AddPatient";
import ViewPatients from "../components/ViewPatients";
import RestorePatient from "../components/RestorePatient";
import RestoreDoctors from "../components/RestoreDoctors";

function AdminDashboard() {
  const [view, setView] = useState("viewDoctors");

  const menuItems = [
    { key: "viewDoctors", label: "Medical Staff", icon: <Stethoscope size={18} />, group: "Operations" },
    { key: "createDoctor", label: "Staff Onboarding", icon: <UserPlus size={18} />, group: "Operations" },
    { key: "viewPatients", label: "Patient Registry", icon: <Users size={18} />, group: "Clinical" },
    { key: "addPatient", label: "New Admission", icon: <Activity size={18} />, group: "Clinical" },
    { key: "restorePatients", label: "Archives: Patients", icon: <History size={18} />, group: "System" },
    { key: "restoreDoctors", label: "Archives: Staff", icon: <History size={18} />, group: "System" },
  ];

  return (
    <div className="flex h-screen bg-[#F4F7F6] text-slate-900 font-sans antialiased overflow-hidden">
      
      {/* NARROW TECHNICAL SIDEBAR */}
      <aside className="w-64 bg-[#1A1F26] flex flex-col border-r border-slate-800">
        <div className="p-5 border-b border-slate-800 flex items-center gap-3">
          <div className="h-8 w-8 bg-blue-600 flex items-center justify-center text-white font-bold rounded-sm">
            H
          </div>
          <div className="leading-tight">
            <h1 className="text-sm font-bold text-white tracking-wide uppercase">City Care</h1>
            <p className="text-[10px] text-slate-500 font-mono tracking-tighter italic">V.4.2.0-STABLE</p>
          </div>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto custom-scrollbar">
          {["Operations", "Clinical", "System"].map((group) => (
            <div key={group} className="mb-6">
              <h3 className="px-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                {group}
              </h3>
              {menuItems
                .filter((item) => item.group === group)
                .map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setView(item.key)}
                    className={`w-full flex items-center gap-3 px-6 py-2.5 text-[13px] transition-all border-l-2 ${
                      view === item.key
                        ? "bg-blue-600/10 text-blue-400 border-blue-500 font-medium"
                        : "text-slate-400 border-transparent hover:text-slate-200 hover:bg-slate-800/50"
                    }`}
                  >
                    <span className={view === item.key ? "text-blue-400" : "text-slate-500"}>
                      {item.icon}
                    </span>
                    {item.label}
                  </button>
                ))}
            </div>
          ))}
        </nav>

        <div className="p-4 bg-black/20 border-t border-slate-800">
          <div className="flex items-center gap-2 text-[11px] text-emerald-500 font-mono mb-2">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            SECURE LINK ACTIVE
          </div>
          <div className="flex items-center justify-between text-slate-500">
            <Shield size={14} />
            <Database size={14} />
            <span className="text-[10px]">DB: 0.1ms</span>
          </div>
        </div>
      </aside>

      {/* WORKSPACE */}
      <main className="flex-1 flex flex-col overflow-hidden">
        
        {/* UTILITY HEADER */}
        <header className="h-14 bg-white border-b border-slate-200 px-6 flex items-center justify-between shadow-sm z-10">
          <div className="flex items-center gap-4 flex-1">
             <div className="relative max-w-sm w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input 
                  type="text" 
                  placeholder="Global system search..." 
                  className="w-full bg-slate-100 border border-slate-200 rounded-sm py-1.5 pl-9 pr-4 text-xs focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                />
             </div>
          </div>

          <div className="flex items-center gap-5">
            <button className="text-slate-400 hover:text-slate-600 transition-colors">
              <Bell size={18} />
            </button>
            <div className="h-6 w-[1px] bg-slate-200" />
            <div className="flex items-center gap-3">
              <div className="text-right leading-none">
                <p className="text-[12px] font-bold text-slate-800">Admin_Peterson</p>
                <p className="text-[10px] text-slate-400 font-mono mt-0.5">UID: 88204-AP</p>
              </div>
              <div className="h-8 w-8 bg-slate-800 text-white rounded-sm flex items-center justify-center text-xs font-bold">
                AP
              </div>
            </div>
          </div>
        </header>

        {/* CONTENT AREA */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* SYSTEM SUMMARY BAR */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "Active Clinicians", value: "24", status: "Nominal" },
              { label: "Patient Occupancy", value: "88%", status: "High" },
              { label: "ER Wait Time", value: "12m", status: "Optimal" },
              { label: "Pending Claims", value: "12", status: "Action Required" },
            ].map((stat, i) => (
              <div key={i} className="bg-white border border-slate-200 p-4 rounded-sm shadow-sm">
                <div className="flex justify-between items-start">
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-tight">{stat.label}</p>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                    stat.status === "High" ? "bg-amber-100 text-amber-700" : 
                    stat.status === "Action Required" ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-700"
                  }`}>
                    {stat.status}
                  </span>
                </div>
                <h4 className="text-2xl font-bold text-slate-800 mt-1">{stat.value}</h4>
              </div>
            ))}
          </div>

          {/* MAIN MODULE LOADER */}
          <section className="bg-white border border-slate-200 rounded-sm shadow-sm flex-1 flex flex-col min-h-[600px]">
            <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-500" />
                <h2 className="text-xs font-bold text-slate-700 uppercase tracking-widest">
                  Active Module: {menuItems.find(i => i.key === view)?.label}
                </h2>
              </div>
              <div className="flex gap-2">
                <button className="text-[10px] font-bold bg-white border border-slate-300 text-slate-600 px-3 py-1 hover:bg-slate-50 rounded-sm transition-all uppercase">
                  Refresh Data
                </button>
                <button className="text-[10px] font-bold bg-slate-800 text-white px-3 py-1 hover:bg-slate-700 rounded-sm transition-all uppercase">
                  Export Log
                </button>
              </div>
            </div>
            
            <div className="p-6">
               {/* Component rendering area */}
               <div className="border border-slate-100 rounded-sm p-4 min-h-[400px]">
                  {view === "viewDoctors" && <ViewDoctors />}
                  {view === "createDoctor" && <CreateDoctor />}
                  {view === "addPatient" && <AddPatient />}
                  {view === "viewPatients" && <ViewPatients />}
                  {view === "restorePatients" && <RestorePatient />}
                  {view === "restoreDoctors" && <RestoreDoctors />}
               </div>
               
            
            </div>
          </section>

          <footer className="flex justify-between items-center text-[10px] text-slate-400 font-mono px-2">
            <span>NETWORK STATUS: 127.0.0.1 (VPN ENCRYPTED)</span>
            <span>SYSTEM TIME: {new Date().toLocaleTimeString()}</span>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;