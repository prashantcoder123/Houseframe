import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { API_URL } from "../config";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token || !user) {
      navigate("/login");
      return;
    }

    const fetchProjects = async () => {
      try {
        const response = await fetch(`${API_URL}/api/projects/my-projects`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load saved projects.");
        }

        setProjects(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [token, user, navigate]);

  const handleDelete = async (projectId) => {
    if (!window.confirm("Are you sure you want to delete this saved design?")) return;

    try {
      const response = await fetch(`${API_URL}/api/projects/${projectId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to delete design.");
      }

      setProjects((prev) => prev.filter((p) => p._id !== projectId));
    } catch (err) {
      alert(err.message);
    }
  };

  const loadInConfigurator = (proj) => {
    // Save to temp localstorage and redirect to configurator anchor page
    localStorage.setItem("loaded-config", JSON.stringify(proj));
    navigate("/#design-studio");
    
    // Smooth scroll to studio
    setTimeout(() => {
      const studio = document.getElementById("design-studio");
      if (studio) {
        studio.scrollIntoView({ behavior: "smooth" });
      }
    }, 400);
  };

  // Mock construction milestones status
  const milestones = [
    { name: "Architectural Planning & Blueprints", status: "completed", date: "Apr 12, 2026" },
    { name: "Site Clearance & Excavation", status: "completed", date: "May 04, 2026" },
    { name: "Concrete Foundation Pouring", status: "completed", date: "Jun 18, 2026" },
    { name: "Structural Pillars & Steel Framing", status: "active", date: "In Progress" },
    { name: "Wall Brickwork & Structural Enclosure", status: "pending", date: "July Estimate" },
    { name: "Utility Cabling, HVAC & Piping", status: "pending", date: "August Estimate" },
    { name: "Interior Plastering & Wood Finishes", status: "pending", date: "September Estimate" },
    { name: "Final Structural Inspection & Handover", status: "pending", date: "October Estimate" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center flex-col gap-3">
        <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm text-slate-400">Loading client dashboard details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white py-12 px-6 md:px-12 relative overflow-hidden">
      {/* Background glow filters */}
      <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        
        {/* WELCOME BANNER HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-900/40 p-8 rounded-3xl border border-white/10 backdrop-blur-md">
          <div>
            <span className="px-3 py-1 text-[10px] font-bold rounded-full bg-yellow-400/20 text-yellow-300 uppercase tracking-widest">
              Construction Tracker
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold mt-3 tracking-tight">
              Hi, <span className="text-yellow-400">{user?.name}</span>
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Welcome back to your client console. View your site plan status and saved 3D designs below.
            </p>
          </div>
          <button
            onClick={() => navigate("/#design-studio")}
            className="px-5 py-3 bg-yellow-400 hover:bg-yellow-500 text-black rounded-xl font-bold transition-all shadow-md text-xs tracking-wider uppercase cursor-pointer"
          >
            🚀 Open 3D Design Studio
          </button>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SECTION (TIMELINE TRACKER) - 8 COLS */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* TIMELINE TRACKER CONTAINER */}
            <div className="bg-slate-900/35 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-md">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span>🚧</span> Site Construction Progress Timeline
              </h2>
              <p className="text-xs text-slate-400 mt-1.5 mb-8">
                Your custom building scheduler synced with our structural engineering team.
              </p>

              {/* TIMELINE LIST */}
              <div className="relative border-l border-white/10 pl-6 ml-4 space-y-8">
                {milestones.map((m, idx) => (
                  <div key={idx} className="relative">
                    {/* Circle Node indicator */}
                    <div
                      className={`absolute w-7 h-7 rounded-full -left-[38px] top-0 flex items-center justify-center border text-[10px] transition-all ${
                        m.status === "completed"
                          ? "bg-green-500/20 border-green-500 text-green-400 font-bold"
                          : m.status === "active"
                          ? "bg-yellow-400/20 border-yellow-400 text-yellow-300 font-bold animate-pulse ring-4 ring-yellow-400/20"
                          : "bg-slate-950 border-white/10 text-slate-500"
                      }`}
                    >
                      {m.status === "completed" ? "✓" : m.status === "active" ? "⚙" : "●"}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h4
                          className={`text-sm font-bold ${
                            m.status === "completed"
                              ? "text-slate-300"
                              : m.status === "active"
                              ? "text-yellow-400"
                              : "text-slate-500"
                          }`}
                        >
                          {m.name}
                        </h4>
                        <span className="text-[10px] text-slate-500 block mt-0.5">
                          Milestone Phase {idx + 1}
                        </span>
                      </div>
                      
                      {/* Date Badge */}
                      <span
                        className={`text-[10px] px-2.5 py-1 rounded-md font-semibold tracking-wider font-mono self-start sm:self-center ${
                          m.status === "completed"
                            ? "bg-green-500/10 text-green-400 border border-green-500/20"
                            : m.status === "active"
                            ? "bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 animate-pulse"
                            : "bg-slate-950 text-slate-600 border border-white/5"
                        }`}
                      >
                        {m.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SAVED 3D DESIGNS BLUEPRINT PORTFOLIO */}
            <div className="bg-slate-900/35 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-md">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span>📐</span> Saved 3D Architecture Blueprints
              </h2>
              <p className="text-xs text-slate-400 mt-1 mb-6">
                Your saved custom villa configuration options from our interactive studio editor.
              </p>

              {error && (
                <p className="text-xs text-red-400 mb-4 bg-red-950/20 p-3 rounded-lg border border-red-500/20">
                  {error}
                </p>
              )}

              {projects.length === 0 ? (
                <div className="text-center py-10 border border-dashed border-white/10 rounded-2xl bg-slate-950/25">
                  <span className="text-3xl block">📋</span>
                  <h4 className="text-sm font-bold text-slate-300 mt-2">No designs saved yet</h4>
                  <p className="text-[10px] text-slate-500 mt-1">
                    Configure your dream design inside our 3D Studio and click "Save Design" to see it here!
                  </p>
                  <button
                    onClick={() => navigate("/#design-studio")}
                    className="mt-4 px-4 py-2 bg-yellow-400/10 text-yellow-400 border border-yellow-400/30 rounded-lg hover:bg-yellow-400/20 transition text-xs font-semibold"
                  >
                    Open Configurator
                  </button>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  {projects.map((proj) => (
                    <div
                      key={proj._id}
                      className="bg-slate-950/60 border border-white/10 rounded-2xl p-5 hover:border-yellow-400/40 transition duration-300 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-4">
                          <h4 className="text-sm font-bold text-yellow-400 tracking-tight truncate max-w-[180px]">
                            {proj.name}
                          </h4>
                          <span className="text-[9px] text-slate-500 font-mono">
                            {new Date(proj.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 mt-4 text-[10px] text-slate-400">
                          <div>
                            <span className="text-slate-600 block">Theme:</span>
                            <span className="font-semibold text-slate-300 capitalize">{proj.theme}</span>
                          </div>
                          <div>
                            <span className="text-slate-600 block">Surface:</span>
                            <span className="font-semibold text-slate-300 capitalize">{proj.colorTheme}</span>
                          </div>
                          <div className="mt-1">
                            <span className="text-slate-600 block">Stage:</span>
                            <span className="font-semibold text-slate-300 capitalize">{proj.constructionStage}</span>
                          </div>
                          <div className="mt-1">
                            <span className="text-slate-600 block">Layout:</span>
                            <span className="font-semibold text-slate-300">
                              {proj.wireframe ? "Wireframe" : "Rendered"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2.5 mt-5 border-t border-white/5 pt-4">
                        <button
                          onClick={() => loadInConfigurator(proj)}
                          className="flex-1 py-2 bg-yellow-400 hover:bg-yellow-500 text-black text-xs font-bold rounded-lg transition-all text-center cursor-pointer"
                        >
                          Load Render
                        </button>
                        <button
                          onClick={() => handleDelete(proj._id)}
                          className="px-3 py-2 bg-red-500/10 hover:bg-red-500/25 border border-red-500/30 text-red-300 hover:text-red-100 rounded-lg text-xs font-bold transition-all cursor-pointer"
                          title="Delete design"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* WEEKLY CONSTRUCTION PHOTO LOGGER */}
            <div className="bg-slate-900/35 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-md">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span>📸</span> Weekly Site Progress Logs
              </h2>
              <p className="text-xs text-slate-400 mt-1 mb-6">
                Photographic updates uploaded by your project manager.
              </p>

              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { title: "Excavation & Trenching", week: "Week 02", desc: "Site clearing and laying foundational footprints.", status: "completed" },
                  { title: "Concrete Base Pouring", week: "Week 04", desc: "Pouring concrete footings and curing structure.", status: "completed" },
                  { title: "Column Casing", week: "Week 06", desc: "Setting vertical steel pillars and column concrete.", status: "active" },
                  { title: "Cantilever Casting", week: "Week 08", desc: "Casting the first floor cantilever overhang slabs.", status: "pending" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="relative group bg-slate-950 border border-white/5 hover:border-yellow-400/20 rounded-2xl p-4 transition duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Procedural Visual Card Graphic */}
                      <div className="h-24 rounded-xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-white/10 flex items-center justify-center relative overflow-hidden mb-3">
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f010_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f010_1px,transparent_1px)] bg-[size:10px_10px]" />
                        <span className="text-3xl relative z-10 select-none">
                          {idx === 0 ? "🚜" : idx === 1 ? "🧱" : idx === 2 ? "🏗️" : "🏠"}
                        </span>
                        
                        {/* Status Badge on top of image */}
                        <span
                          className={`absolute top-2 right-2 text-[8px] font-bold px-2 py-0.5 rounded-full ${
                            item.status === "completed"
                              ? "bg-green-500/20 text-green-400 border border-green-500/30"
                              : item.status === "active"
                              ? "bg-yellow-400/20 text-yellow-400 border border-yellow-400/30 animate-pulse"
                              : "bg-slate-900 text-slate-600 border border-white/5"
                          }`}
                        >
                          {item.status.toUpperCase()}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <h4 className="text-xs font-bold text-slate-200">{item.title}</h4>
                        <span className="text-[9px] font-mono text-yellow-400 font-bold">{item.week}</span>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT SECTION (BILLING / SUMMARY INFO) - 4 COLS */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* BILLING / PAYMENT PORTAL */}
            <div className="bg-slate-900/35 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
              <h3 className="text-md font-bold text-white flex items-center gap-1.5">
                <span>💳</span> Billing & Contract Summary
              </h3>
              <p className="text-[10px] text-slate-400 mt-0.5 mb-6">
                Financial summary linked to current construction milestones.
              </p>

              <div className="space-y-4">
                <div className="bg-slate-950/70 p-3.5 rounded-xl border border-white/5">
                  <span className="text-[10px] text-slate-500 block">TOTAL CONTRACT VALUE</span>
                  <span className="text-xl font-black text-white font-mono">₹ 85,00,000</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-950/70 p-3 rounded-xl border border-white/5">
                    <span className="text-[9px] text-slate-500 block">PAID TO DATE</span>
                    <span className="text-sm font-bold text-green-400 font-mono">₹ 35,00,000</span>
                  </div>
                  <div className="bg-slate-950/70 p-3 rounded-xl border border-white/5">
                    <span className="text-[9px] text-slate-500 block">OUTSTANDING BAL.</span>
                    <span className="text-sm font-bold text-slate-400 font-mono">₹ 50,00,000</span>
                  </div>
                </div>

                <div className="bg-yellow-400/5 border border-yellow-400/20 p-4 rounded-xl space-y-1">
                  <span className="text-[9px] text-yellow-400 font-bold uppercase tracking-wider block">
                    Next Payment Milestone Due
                  </span>
                  <h4 className="text-xs font-bold text-slate-200">
                    Milestone 4: Columns & Framing Completion
                  </h4>
                  <span className="text-sm font-black text-yellow-400 font-mono block mt-1">
                    ₹ 15,00,000
                  </span>
                  <p className="text-[9px] text-slate-500 leading-normal pt-1 border-t border-yellow-400/10 mt-1">
                    Invoice will be released automatically by the site engineer upon certification of Phase 4.
                  </p>
                </div>
              </div>
            </div>

            {/* DOWNLOADABLE DOCUMENTS CARD */}
            <div className="bg-slate-900/35 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
              <h3 className="text-md font-bold text-white flex items-center gap-1.5">
                <span>📁</span> Project Blueprint Documents
              </h3>
              <p className="text-[10px] text-slate-400 mt-0.5 mb-4">
                Retrieve architectural files certified by our design team.
              </p>

              <div className="space-y-2">
                {[
                  { name: "Floor_Plan_Approved.pdf", size: "4.8 MB" },
                  { name: "Vastu_Compliance_Report.pdf", size: "1.2 MB" },
                  { name: "Site_Survey_Report.pdf", size: "8.4 MB" },
                  { name: "Structural_Est_Summary.xlsx", size: "720 KB" },
                ].map((doc, idx) => (
                  <button
                    key={idx}
                    onClick={() => alert(`Initiating mock download for: ${doc.name}`)}
                    className="w-full flex items-center justify-between p-3 bg-slate-950/60 hover:bg-slate-950 border border-white/5 hover:border-yellow-400/20 rounded-xl transition text-left cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg">📄</span>
                      <div>
                        <span className="text-xs font-bold text-slate-300 group-hover:text-yellow-400 transition truncate block max-w-[160px]">
                          {doc.name}
                        </span>
                        <span className="text-[9px] text-slate-500 font-mono">{doc.size}</span>
                      </div>
                    </div>
                    <span className="text-xs text-slate-500 group-hover:text-yellow-400 transition">
                      ⬇
                    </span>
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
