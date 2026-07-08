import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "3D Studio", path: "/#design-studio" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" },
  ];

  const handleLinkClick = (e, path) => {
    if (path.includes("#")) {
      const parts = path.split("#");
      const pagePath = parts[0];
      const elementId = parts[1];

      // If we are already on the target page, scroll smoothly
      if (location.pathname === pagePath || (pagePath === "/" && location.pathname === "/")) {
        e.preventDefault();
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // Let the route change happen, scroll will occur after navigation
        // To handle this, we can listen or just let react-router-dom do normal navigation.
      }
    }
    setOpen(false);
  };

  return (
    <nav className="relative flex justify-between items-center px-4 md:px-10 py-4 border-b border-white/10">

      {/* LOGO */}
      <Link
        to="/"
        className="flex items-center gap-2 text-xl md:text-2xl font-bold tracking-wide hover:opacity-90 animate-pulse-subtle"
      >
        🏗️ <span className="bg-gradient-to-r from-yellow-400 via-yellow-200 to-white bg-clip-text text-transparent">Houseframe</span>
      </Link>

      {/* DESKTOP MENU */}
      <div className="hidden md:flex space-x-8 text-sm uppercase items-center">
        {links.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            onClick={(e) => handleLinkClick(e, link.path)}
            className={`transition font-semibold ${
              link.name === "3D Studio"
                ? "text-yellow-400 hover:text-yellow-300 px-3 py-1 bg-yellow-400/10 border border-yellow-400/30 rounded-lg hover:bg-yellow-400/20"
                : "hover:text-yellow-400"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* MOBILE TOGGLE */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden text-2xl focus:outline-none text-yellow-400"
      >
        {open ? "✖" : "☰"}
      </button>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 w-full bg-[#0F172A]/95 backdrop-blur-md border-b border-white/10 md:hidden overflow-hidden z-50"
          >
            <div className="flex flex-col divide-y divide-white/10">
              {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={(e) => handleLinkClick(e, link.path)}
                  className={`px-6 py-4 text-sm uppercase transition ${
                    link.name === "3D Studio"
                      ? "bg-yellow-400/10 text-yellow-400 font-bold"
                      : "hover:bg-white/10 hover:text-yellow-400"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
