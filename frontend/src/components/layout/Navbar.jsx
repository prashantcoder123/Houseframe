import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "3D Studio", path: "/#design-studio" },
    { name: "Projects", path: "/projects" },
    { name: "Estimator", path: "/estimator" },
    { name: "Contact", path: "/contact" },
  ];

  const checkUserSession = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    checkUserSession();

    // Event listener to react to login/signup/logout events instantly
    window.addEventListener("auth-change", checkUserSession);
    return () => {
      window.removeEventListener("auth-change", checkUserSession);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.dispatchEvent(new Event("auth-change"));
    navigate("/");
  };

  const handleLinkClick = (e, path) => {
    if (path.includes("#")) {
      const parts = path.split("#");
      const pagePath = parts[0];
      const elementId = parts[1];

      if (location.pathname === pagePath || (pagePath === "/" && location.pathname === "/")) {
        e.preventDefault();
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
    setOpen(false);
  };

  return (
    <nav className="relative flex justify-between items-center px-4 md:px-10 py-4 border-b border-white/10 z-50">

      {/* LOGO */}
      <Link
        to="/"
        className="flex items-center gap-2 text-xl md:text-2xl font-bold tracking-wide hover:opacity-90 animate-pulse-subtle"
      >
        🏗️ <span className="bg-gradient-to-r from-yellow-400 via-yellow-200 to-white bg-clip-text text-transparent">Houseframe</span>
      </Link>

      {/* DESKTOP MENU */}
      <div className="hidden md:flex space-x-6 text-xs uppercase items-center font-semibold">
        {links.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            onClick={(e) => handleLinkClick(e, link.path)}
            className={`transition font-semibold ${
              link.name === "3D Studio"
                ? "text-yellow-400 hover:text-yellow-300 px-3 py-1 bg-yellow-400/10 border border-yellow-400/30 rounded-lg hover:bg-yellow-400/20"
                : "hover:text-yellow-400 text-slate-300"
            }`}
          >
            {link.name}
          </Link>
        ))}

        {/* User Session Action */}
        {user ? (
          <div className="flex items-center gap-3.5 pl-3 border-l border-white/15">
            {/* Dashboard Link */}
            <Link
              to="/dashboard"
              className="text-[10px] text-slate-300 hover:text-yellow-400 transition"
            >
              Dashboard
            </Link>
            
            <span className="text-[10px] text-yellow-400 font-bold normal-case bg-yellow-400/10 px-2.5 py-1 rounded-md border border-yellow-400/20 shadow-sm">
              👋 Hi, {user.name.split(" ")[0]}
            </span>
            
            <button
              onClick={handleLogout}
              className="text-[10px] uppercase bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 hover:border-red-500/50 text-red-300 font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="text-[10px] uppercase bg-yellow-400 hover:bg-yellow-500 text-black font-extrabold px-4 py-2 rounded-lg transition shadow-lg hover:shadow-yellow-400/20 cursor-pointer ml-3"
          >
            Sign In
          </Link>
        )}
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
                      : "hover:bg-white/10 hover:text-yellow-400 text-slate-300"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              {/* User Session Action (Mobile) */}
              {user ? (
                <div className="px-6 py-4 flex flex-col gap-3">
                  <Link
                    to="/dashboard"
                    onClick={() => setOpen(false)}
                    className="text-sm font-bold text-slate-300 hover:text-yellow-400 transition py-2"
                  >
                    📈 Client Dashboard
                  </Link>
                  <span className="text-xs text-slate-400">
                    Signed in as <strong className="text-yellow-400">{user.name}</strong>
                  </span>
                  <button
                    onClick={() => {
                      handleLogout();
                      setOpen(false);
                    }}
                    className="w-full text-center py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-xs uppercase transition mt-2"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="px-6 py-4 text-xs font-extrabold bg-yellow-400 text-black hover:bg-yellow-500 transition block text-center uppercase"
                >
                  Sign In
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
