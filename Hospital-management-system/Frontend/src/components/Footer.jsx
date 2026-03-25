import { Link } from "react-router-dom";
import logo from "../assets/betterlife-logo.png";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <img
              src={logo}
              alt="BetterLife Logo"
              className="h-10 w-auto"
            />
            <h2 className="text-xl font-bold text-white">
              BetterLife
            </h2>
          </div>
          <p className="text-sm text-gray-400">
            BetterLife is a modern healthcare management platform designed
            to simplify hospital operations and improve patient care.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-green-400 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-green-400 transition">
                About
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-green-400 transition">
                Services
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-green-400 transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Contact
          </h3>
          <p className="text-sm text-gray-400">
            Email: support@betterlife.com
          </p>
          <p className="text-sm text-gray-400">
            Phone: +91 98765 43210
          </p>
          <p className="text-sm text-gray-400">
            Location: India
          </p>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()} BetterLife. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
