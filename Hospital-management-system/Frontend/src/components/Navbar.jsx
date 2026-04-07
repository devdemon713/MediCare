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

  const menuVariants = {
    hidden: { opacity: 0, scale: 0.9, y: -20, rotateX: -15 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      rotateX: 0,
      transition: { type: "spring", stiffness: 200, damping: 20, staggerChildren: 0.1 } 
    },
    exit: { opacity: 0, scale: 0.9, y: -20, transition: { duration: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <nav className={`fixed top-0 z-50 w-full px-4 transition-all duration-500 ${scrolled ? "py-3" : "py-6"}`}>
      
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`max-w-7xl mx-auto px-6 py-3 flex justify-between items-center rounded-3xl border transition-all duration-500
          ${scrolled 
            ? "bg-white/40 backdrop-blur-xl border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]" 
            : "bg-blue-600/10 backdrop-blur-md border-white/20 shadow-none"
          }`}
      >
        
        {/* Logo */}
        <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-3 cursor-pointer">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-blue-400/30 blur-xl rounded-full"
              />
              <img src={logo} alt="BetterLife" className="h-10 relative z-10" />
            </div>
            <span className={`text-2xl font-black tracking-tighter transition-colors duration-300 ${scrolled ? "text-slate-800" : "text-white"}`}>
              Better<span className="text-blue-500 group-hover:text-blue-400 transition-colors">Life</span>
            </span>
          </Link>
        </motion.div>

        {/* Desktop Menu */}
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
              <>
                <Link to="/login" className={`text-sm font-bold transition-colors ${scrolled ? "text-slate-700 hover:text-blue-600" : "text-white hover:text-blue-200"}`}>
                  Sign In
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => navigate(`/${role}`)}
                  className="flex items-center gap-2 bg-slate-900/90 hover:bg-black text-white px-5 py-2.5 rounded-2xl font-bold backdrop-blur-md transition-all shadow-lg"
                >
                  Dashboard
                </motion.button>
                <button
                  onClick={handleLogout}
                  className="p-2 group rounded-xl hover:bg-red-50 transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          ☰
        </button>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute top-24 left-4 right-4 md:hidden rounded-[2rem] bg-white p-8"
          >
            <div className="flex flex-col gap-4">
              {["Home", "About", "Services", "Contact"].map((item) => (
                <Link 
                  key={item}
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                >
                  {item}
                </Link>
              ))}

              {!token && (
                <Link to="/login" onClick={() => setOpen(false)}>
                  Login
                </Link>
              )}

              {token && (
                <button onClick={handleLogout}>
                  Logout
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;