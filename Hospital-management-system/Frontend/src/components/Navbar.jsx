import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/betterlife-logo.png";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // Modern 3D/Spring variants for the mobile menu
  const menuVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.95, 
      y: -20, 
      rotateX: -10,
      filter: "blur(10px)" 
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      rotateX: 0,
      filter: "blur(0px)",
      transition: { 
        type: "spring", 
        stiffness: 260, 
        damping: 20, 
        staggerChildren: 0.1,
        delayChildren: 0.2
      } 
    },
    exit: { 
      opacity: 0, 
      scale: 0.95, 
      y: -20, 
      transition: { duration: 0.2 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <nav className={`fixed top-0 z-50 w-full px-4 transition-all duration-500 ${scrolled ? "py-4" : "py-8"}`}>
      
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`max-w-7xl mx-auto px-6 py-3 flex justify-between items-center rounded-[2.5rem] border transition-all duration-500 perspective-1000
          ${scrolled 
            ? "bg-white/40 backdrop-blur-2xl border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.1)]" 
            : "bg-blue-600/5 backdrop-blur-md border-white/20 shadow-none"
          }`}
      >
        
        {/* Logo Section with Pulsing Heartbeat effect */}
        <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-3 cursor-pointer">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <motion.div 
                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-blue-400 blur-xl rounded-full"
              />
              <img src={logo} alt="BetterLife" className="h-10 relative z-10 filter drop-shadow-md" />
            </div>
            <span className={`text-2xl font-black tracking-tighter transition-colors duration-300 ${scrolled ? "text-slate-800" : "text-white"}`}>
              Better<span className="text-blue-500 group-hover:text-blue-400 transition-colors">Life</span>
            </span>
          </Link>
        </motion.div>

        {/* Desktop Menu with Glass Hover Pills */}
        <div className="hidden md:flex gap-1 items-center">
          {["Home", "About", "Services", "Contact"].map((item) => (
            <Link 
              key={item} 
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all relative group
                ${scrolled ? "text-slate-600 hover:text-blue-600" : "text-white/80 hover:text-white"}`}
            >
              <span className="relative z-10">{item}</span>
              <motion.span 
                className="absolute inset-0 bg-blue-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                layoutId="hoverBg"
              />
            </Link>
          ))}

          <div className="w-[1px] h-6 bg-slate-400/20 mx-4" />

          <div className="flex items-center gap-4">
            {!token ? (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/login" className={`px-6 py-2.5 rounded-2xl text-sm font-bold transition-all border
                  ${scrolled 
                    ? "bg-slate-900 text-white border-transparent shadow-lg" 
                    : "bg-white/10 text-white border-white/20 backdrop-blur-md"}`}>
                  Sign In
                </Link>
              </motion.div>
            ) : (
              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ y: -2, shadow: "0 10px 30px -10px rgba(0,0,0,0.3)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(`/${role}`)}
                  className="flex items-center gap-2 bg-slate-900/90 hover:bg-black text-white px-6 py-2.5 rounded-2xl font-bold backdrop-blur-xl transition-all border border-white/10"
                >
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  Dashboard
                </motion.button>
                <motion.button
                  whileHover={{ backgroundColor: "rgba(239, 68, 68, 0.1)", color: "#ef4444" }}
                  onClick={handleLogout}
                  className="px-4 py-2.5 rounded-2xl text-sm font-bold transition-all text-slate-500 border border-transparent hover:border-red-500/20"
                >
                  Logout
                </motion.button>
              </div>
            )}
          </div>
        </div>

        {/* Modern Mobile Toggle */}
        <motion.button 
          whileTap={{ scale: 0.9 }}
          className={`md:hidden w-11 h-11 flex flex-col items-center justify-center gap-1.5 rounded-xl border transition-all
            ${scrolled ? "bg-white border-slate-200" : "bg-white/10 border-white/20"}`}
          onClick={() => setOpen(!open)}
        >
          <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 8 : 0 }} className={`w-6 h-0.5 rounded-full ${scrolled ? 'bg-slate-800' : 'bg-white'}`} />
          <motion.span animate={{ opacity: open ? 0 : 1 }} className={`w-6 h-0.5 rounded-full ${scrolled ? 'bg-slate-800' : 'bg-white'}`} />
          <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -8 : 0 }} className={`w-6 h-0.5 rounded-full ${scrolled ? 'bg-slate-800' : 'bg-white'}`} />
        </motion.button>
      </motion.div>

      {/* Mobile Menu - Full Glassmorphism */}
      <AnimatePresence>
        {open && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute top-28 left-4 right-4 md:hidden rounded-[2.5rem] bg-white/70 backdrop-blur-3xl border border-white/50 p-8 shadow-2xl shadow-blue-900/10 origin-top"
          >
            <div className="flex flex-col gap-4">
              {["Home", "About", "Services", "Contact"].map((item) => (
                <motion.div key={item} variants={itemVariants}>
                  <Link 
                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="text-2xl font-black text-slate-800 hover:text-blue-600 transition-colors block"
                    onClick={() => setOpen(false)}
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}

              <motion.div variants={itemVariants} className="h-[1px] bg-slate-200/50 my-2" />

              {!token ? (
                <motion.div variants={itemVariants}>
                  <Link 
                    to="/login" 
                    className="flex items-center justify-center w-full py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-600/30"
                    onClick={() => setOpen(false)}
                  >
                    Get Started
                  </Link>
                </motion.div>
              ) : (
                <motion.button 
                  variants={itemVariants}
                  onClick={handleLogout}
                  className="w-full py-4 bg-red-50 text-red-600 rounded-2xl font-bold border border-red-100"
                >
                  Logout Account
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;