import { Link } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="relative flex justify-between items-center px-4 md:px-10 py-4 border-b border-white/10">

      {/* LOGO */}
      <Link
        to="/"
        className="flex items-center gap-2 text-xl md:text-2xl font-bold tracking-wide hover:opacity-90"
      >
        🏗️ <span>Houseframe Design & Construction Pvt. Ltd.</span>
      </Link>

      {/* DESKTOP MENU */}
      <div className="hidden md:flex space-x-8 text-sm uppercase">
        {links.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className="hover:text-yellow-400 transition"
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* MOBILE TOGGLE */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden text-2xl focus:outline-none"
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
            className="absolute top-full left-0 w-full bg-[#0F172A] border-b border-white/10 md:hidden overflow-hidden z-50"
          >
            <div className="flex flex-col divide-y divide-white/10">
              {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className="px-6 py-4 text-sm uppercase hover:bg-white/10 hover:text-yellow-400 transition"
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
