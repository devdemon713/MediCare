import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/betterlife-logo.png";

function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-green-600 to-blue-600 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="BetterLife" className="h-9" />
          <span className="text-xl font-bold">BetterLife</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/contact">Contact</Link>

          {!token ? (
            <Link
              to="/login"
              className="bg-white text-green-700 px-4 py-2 rounded-lg"
            >
              Login
            </Link>
          ) : (
            <>
              <button
                onClick={() => navigate(`/${role}`)}
                className="bg-white text-blue-700 px-4 py-2 rounded-lg"
              >
                Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="border border-white px-4 py-2 rounded-lg"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white text-gray-800 px-6 py-4 space-y-3">
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setOpen(false)}>About</Link>
          <Link to="/services" onClick={() => setOpen(false)}>Services</Link>
          <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>

          {!token ? (
            <Link
              to="/login"
              className="block bg-green-600 text-white text-center py-2 rounded"
              onClick={() => setOpen(false)}
            >
              Login
            </Link>
          ) : (
            <>
              <button
                onClick={() => {
                  navigate(`/${role}`);
                  setOpen(false);
                }}
                className="w-full bg-blue-600 text-white py-2 rounded"
              >
                Dashboard
              </button>

              <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white py-2 rounded"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
