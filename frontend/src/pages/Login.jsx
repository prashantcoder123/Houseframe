import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Auth3D from "../components/ui/Auth3D";
import { motion } from "framer-motion";
import { API_URL } from "../config";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed. Please try again.");
      }

      // Save token and user details
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Trigger event to notify Navbar of changes
      window.dispatchEvent(new Event("auth-change"));

      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-12 min-h-screen bg-[#020617] text-white">
      {/* LEFT SIDE: 3D GRAPHICS PANEL */}
      <div className="hidden lg:block lg:col-span-6 border-r border-white/10 relative">
        <Auth3D />
      </div>

      {/* RIGHT SIDE: AUTHENTICATION FORM */}
      <div className="col-span-12 lg:col-span-6 flex items-center justify-center p-6 md:p-12 relative">
        {/* Glow behind card */}
        <div className="absolute w-[400px] h-[400px] bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md bg-slate-900/60 border border-white/10 rounded-3xl p-8 backdrop-blur-md shadow-2xl relative z-10"
        >
          <div className="text-center mb-8">
            <span className="px-3 py-1 text-[10px] rounded-full bg-yellow-400/20 text-yellow-300 font-bold uppercase tracking-wider">
              Client Portal
            </span>
            <h2 className="text-3xl font-extrabold mt-3 tracking-tight">
              Welcome <span className="text-yellow-400">Back</span>
            </h2>
            <p className="text-xs text-slate-400 mt-2">
              Log in to manage your 3D blueprints and design consultations.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-950/50 border border-red-500/30 text-red-300 text-xs rounded-xl flex items-center gap-2">
              <span>⚠️</span>
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="name@company.com"
                className="w-full px-4 py-3 bg-slate-950/80 border border-white/10 rounded-xl focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/30 outline-none text-sm transition-all placeholder:text-slate-600"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-slate-950/80 border border-white/10 rounded-xl focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/30 outline-none text-sm transition-all placeholder:text-slate-600"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 disabled:bg-slate-800 disabled:text-slate-500 text-black rounded-xl font-bold transition-all shadow-lg hover:shadow-yellow-400/25 active:scale-[0.98] text-sm flex items-center justify-center gap-2 mt-8 cursor-pointer"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  <span>Connecting...</span>
                </>
              ) : (
                <>
                  <span>🏗️ Authenticate & Enter</span>
                </>
              )}
            </button>
          </form>

          {/* Registration Link */}
          <div className="text-center mt-6">
            <p className="text-xs text-slate-400">
              Don't have an account?{" "}
              <Link to="/signup" className="text-yellow-400 hover:text-yellow-300 font-semibold transition">
                Register here
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
