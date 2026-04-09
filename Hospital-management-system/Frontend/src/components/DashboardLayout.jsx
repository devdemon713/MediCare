import { motion } from "framer-motion";

function DashboardLayout({ title, children }) {
  return (
    <div className="min-h-screen flex bg-[#030712] text-slate-200 selection:bg-emerald-500/30">
      
      

      {/* --- MAIN INTERFACE --- */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* TOP HEADER */}
       

        {/* SCROLLABLE CONTENT AREA */}
        <div className="flex-1 mt-20 overflow-y-auto p-6 md:p-10 scrollbar-hide">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-7xl mx-auto"
          >
            {/* The white card container is now replaced with a transparent "Stage" */}
            <section className="relative  overflow-hidden rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md p-8 min-h-[400px]">
              {/* Background Glow Effect */}
             
              
              {children}
            </section>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;