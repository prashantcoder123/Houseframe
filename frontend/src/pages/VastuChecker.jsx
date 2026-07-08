import { useState } from "react";
import { motion } from "framer-motion";

export default function VastuChecker() {
  const [directions, setDirections] = useState({
    entrance: "ne",
    kitchen: "se",
    bedroom: "sw",
    toilet: "nw",
  });

  const directionsList = [
    { code: "ne", name: "North-East (Ishanya)" },
    { code: "e", name: "East (Purva)" },
    { code: "se", name: "South-East (Agneya)" },
    { code: "s", name: "South (Dakshina)" },
    { code: "sw", name: "South-West (Nairutya)" },
    { code: "w", name: "West (Paschim)" },
    { code: "nw", name: "North-West (Vayavya)" },
    { code: "n", name: "North (Uttara)" },
  ];

  // Scoring mapping rules (max 25 points per room, total 100 points)
  const vastuScores = {
    entrance: {
      ne: 25, e: 25, n: 20, nw: 15, w: 10, s: 5, se: 0, sw: 0
    },
    kitchen: {
      se: 25, nw: 20, e: 15, w: 10, s: 5, n: 0, ne: 0, sw: 0
    },
    bedroom: {
      sw: 25, s: 20, w: 20, nw: 15, n: 10, e: 10, se: 5, ne: 0
    },
    toilet: {
      nw: 25, w: 20, s: 15, se: 10, e: 5, n: 5, sw: 0, ne: 0
    }
  };

  // Advice details based on direction selection
  const vastuAdvice = {
    entrance: {
      ne: "🌟 Excellent! The North-East (Ishanya) entrance is highly favorable. It attracts positive cosmic energy, wealth, and mental clarity.",
      e: "✅ Very Good. An East entrance brings health, prosperity, and power. Excellent for social growth and career opportunities.",
      n: "✅ Good. A North entrance brings wealth and success. Aligned with Kubera, the god of wealth.",
      nw: "⚠️ Neutral. A North-West entrance is moderate. Ensure proper lighting and place brass pyramids on the door frame to optimize stability.",
      w: "⚠️ Moderate. West entrance brings mixed results. Introduce metal windchimes to balance planetary energies.",
      s: "⚠️ Low. A South entrance can cause mixed outcomes. Recommendation: Paint the entrance door warm colors (red/orange) and keep it well-lit.",
      se: "🚨 Poor. South-East entrance triggers minor health or legal issues. Suggestion: Fix a copper helix pyramid on the top frame of the door.",
      sw: "❌ Critical Vastu Defect! A South-West entrance leads to financial drains and relationship issues. Correction: Fix lead helix pyramids and place a yellow threshold stone."
    },
    kitchen: {
      se: "🌟 Ideal! The South-East (Agneya) is the Agni (fire) element corner. Restores digestive health, vitality, and wealth.",
      nw: "✅ Very Good. North-West kitchen is favorable. Represents the air element, supporting general well-being.",
      e: "⚠️ Moderate. East kitchen is acceptable, but ensure the cook faces East while cooking.",
      w: "⚠️ Neutral. West kitchen is acceptable. Place yellow marble under the stove to balance energy.",
      s: "⚠️ Low. South kitchen may lead to minor arguments. Avoid keeping the sink (water) too close to the stove (fire).",
      n: "🚨 Critical. North kitchen affects financial progress. Correction: Place a green marble slab under the stove.",
      ne: "❌ Critical Defect! Kitchen in North-East damages health and peace of mind. Correction: Avoid black colors, paint the kitchen light yellow, and place a yellow marble strip under the stove.",
      sw: "❌ Critical Defect! Kitchen in South-West damages career stability. Correction: Place a yellow marble slab under the gas cylinder and stove."
    },
    bedroom: {
      sw: "🌟 Perfect! The South-West (Nairutya) represents the earth element. Gives stability, leadership, and peaceful sleep to the master of the house.",
      s: "✅ Good. South bedroom represents relaxation and fame. Highly favorable.",
      w: "✅ Good. West bedroom represents gains and stability. Favorable layout.",
      nw: "✅ Favorable. North-West bedroom represents movement. Good for guest rooms.",
      n: "⚠️ Neutral. North bedroom is okay for children or students.",
      e: "⚠️ Neutral. East bedroom is okay for children. Good for intellectual growth.",
      se: "🚨 Poor. South-East bedroom can cause sleep disorders or anger issues. Keep electronic appliances away from the headrest.",
      ne: "❌ Critical Defect! Master bedroom in North-East harms health and family bonding. Use white or cream bedsheets and place a rock salt bowl in the corner."
    },
    toilet: {
      nw: "🌟 Perfect! North-West represents disposal and air. Highly suitable for waste elimination and toilet layouts.",
      w: "✅ Good. West toilet is acceptable. Keeps energies balanced.",
      s: "✅ Favorable. South toilet is acceptable. Keeps aggressive energies grounded.",
      se: "⚠️ Low. South-East toilet conflicts fire with water. Suggestion: Keep a bowl of sea salt inside the toilet.",
      e: "🚨 Poor. East toilet blocks positive morning solar energies. Avoid keeping large mirrors in this bathroom.",
      n: "🚨 Poor. North toilet blocks financial growth. Suggestion: Paint the toilet light blue.",
      sw: "❌ Critical Defect! Toilet in South-West leads to heavy financial leakage. Correction: Keep a bronze pyramid on the toilet door frame.",
      ne: "❌ Critical Defect! Toilet in North-East harms health and spiritual growth. Suggestion: Avoid usage if possible, or place a copper Vastu helix and keep sea salt."
    }
  };

  const handleDirectionChange = (key, val) => {
    setDirections((prev) => ({ ...prev, [key]: val }));
  };

  // Calculate final score
  const score = 
    vastuScores.entrance[directions.entrance] +
    vastuScores.kitchen[directions.kitchen] +
    vastuScores.bedroom[directions.bedroom] +
    vastuScores.toilet[directions.toilet];

  const getScoreColor = () => {
    if (score >= 80) return "text-green-400 border-green-500/30 bg-green-500/5";
    if (score >= 50) return "text-yellow-400 border-yellow-500/30 bg-yellow-500/5";
    return "text-red-400 border-red-500/30 bg-red-500/5";
  };

  const getScoreLabel = () => {
    if (score >= 80) return "Excellent Vastu Layout (Compliant)";
    if (score >= 50) return "Moderate Compliance (Corrections Recommended)";
    return "Critical Vastu Defects (Corrections Required)";
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white py-12 px-6 md:px-12 relative overflow-hidden">
      {/* Background Glow filters */}
      <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-10 relative z-10">
        
        {/* HEADER SECTION */}
        <div className="text-center">
          <span className="px-3 py-1 text-[11px] rounded-full bg-yellow-400/20 text-yellow-300 font-semibold tracking-wider uppercase animate-pulse-subtle">
            Vastu Studio
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold mt-3 text-white tracking-tight">
            Vastu Compliance <span className="text-yellow-400">Scorecard</span>
          </h1>
          <p className="text-sm text-slate-400 mt-2 max-w-xl mx-auto leading-relaxed">
            Quickly check the directional compliance of your floor layout. Align your rooms with cosmic elements to restore positive aura, health, and wealth.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: DIRECTION SELECTORS (7 COLS) */}
          <div className="lg:col-span-7 bg-slate-900/35 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-md space-y-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>🧭</span> Select Room Placements
            </h2>
            <p className="text-xs text-slate-400">
              Pick the direction of your layout rooms relative to the center of your plot.
            </p>

            <div className="space-y-4 pt-2">
              {/* 1. MAIN ENTRANCE */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-yellow-400 uppercase tracking-widest block">
                  1. Main Entrance Direction
                </label>
                <select
                  value={directions.entrance}
                  onChange={(e) => handleDirectionChange("entrance", e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950/80 border border-white/10 rounded-xl focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/30 outline-none text-sm text-slate-300"
                >
                  {directionsList.map((d) => (
                    <option key={d.code} value={d.code}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* 2. KITCHEN LOCATION */}
              <div className="space-y-1.5 pt-2 border-t border-white/5">
                <label className="text-[10px] font-bold text-yellow-400 uppercase tracking-widest block">
                  2. Kitchen Placement
                </label>
                <select
                  value={directions.kitchen}
                  onChange={(e) => handleDirectionChange("kitchen", e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950/80 border border-white/10 rounded-xl focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/30 outline-none text-sm text-slate-300"
                >
                  {directionsList.map((d) => (
                    <option key={d.code} value={d.code}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* 3. MASTER BEDROOM */}
              <div className="space-y-1.5 pt-2 border-t border-white/5">
                <label className="text-[10px] font-bold text-yellow-400 uppercase tracking-widest block">
                  3. Master Bedroom Placement
                </label>
                <select
                  value={directions.bedroom}
                  onChange={(e) => handleDirectionChange("bedroom", e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950/80 border border-white/10 rounded-xl focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/30 outline-none text-sm text-slate-300"
                >
                  {directionsList.map((d) => (
                    <option key={d.code} value={d.code}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* 4. BATHROOM & TOILETS */}
              <div className="space-y-1.5 pt-2 border-t border-white/5">
                <label className="text-[10px] font-bold text-yellow-400 uppercase tracking-widest block">
                  4. Bathroom & Toilet Location
                </label>
                <select
                  value={directions.toilet}
                  onChange={(e) => handleDirectionChange("toilet", e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950/80 border border-white/10 rounded-xl focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/30 outline-none text-sm text-slate-300"
                >
                  {directionsList.map((d) => (
                    <option key={d.code} value={d.code}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: SCORE & SUGGESTIONS (5 COLS) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* SCORE CARD */}
            <div className={`border rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-2xl relative overflow-hidden transition-all duration-500 ${getScoreColor()}`}>
              <span className="text-[9px] font-bold uppercase tracking-widest block opacity-75">
                Overall Vastu Score
              </span>
              <div className="flex items-baseline gap-2 mt-2">
                <h2 className="text-4xl md:text-5xl font-black font-mono">
                  {score}
                </h2>
                <span className="text-sm opacity-60">/ 100</span>
              </div>
              <h4 className="text-xs font-bold mt-3 leading-normal">
                {getScoreLabel()}
              </h4>
              <p className="text-[10px] opacity-75 mt-1 leading-normal">
                Consult with our expert structural planners to refine room layout entries prior to concrete pouring.
              </p>
            </div>

            {/* DIRECTED VASTU ADVICE LOGS */}
            <div className="bg-slate-900/35 border border-white/10 rounded-3xl p-6 backdrop-blur-md space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5 mb-2">
                <span>📋</span> Structural Placement Advice
              </h3>

              <div className="space-y-4 divide-y divide-white/5">
                {/* Entrance Advice */}
                <div className="pt-3 first:pt-0">
                  <span className="text-[8px] font-bold text-yellow-400 tracking-wider block uppercase mb-1">
                    Main Entrance Location
                  </span>
                  <p className="text-[11px] text-slate-300 leading-normal">
                    {vastuAdvice.entrance[directions.entrance]}
                  </p>
                </div>

                {/* Kitchen Advice */}
                <div className="pt-3">
                  <span className="text-[8px] font-bold text-yellow-400 tracking-wider block uppercase mb-1">
                    Kitchen Location
                  </span>
                  <p className="text-[11px] text-slate-300 leading-normal">
                    {vastuAdvice.kitchen[directions.kitchen]}
                  </p>
                </div>

                {/* Bedroom Advice */}
                <div className="pt-3">
                  <span className="text-[8px] font-bold text-yellow-400 tracking-wider block uppercase mb-1">
                    Master Bedroom Placement
                  </span>
                  <p className="text-[11px] text-slate-300 leading-normal">
                    {vastuAdvice.bedroom[directions.bedroom]}
                  </p>
                </div>

                {/* Toilet Advice */}
                <div className="pt-3">
                  <span className="text-[8px] font-bold text-yellow-400 tracking-wider block uppercase mb-1">
                    Toilet Placement
                  </span>
                  <p className="text-[11px] text-slate-300 leading-normal">
                    {vastuAdvice.toilet[directions.toilet]}
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
