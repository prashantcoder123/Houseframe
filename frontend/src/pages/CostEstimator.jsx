import { useState } from "react";
import { motion } from "framer-motion";

export default function CostEstimator() {
  const [area, setArea] = useState(1500); // Built-up area in sq. ft.
  const [quality, setQuality] = useState("premium"); // standard, premium, luxury
  const [floors, setFloors] = useState(1); // 1, 2, 3 floors
  const [addons, setAddons] = useState({
    pool: false,
    solar: false,
    smartHome: false,
  });

  // Cost configurations
  const packageRates = {
    standard: 1500, // ₹ per sq. ft.
    premium: 2200,
    luxury: 3200,
  };

  const floorMultipliers = {
    1: 1.0,
    2: 1.8, // 2 floors has slight discount on shared foundation/roof structure
    3: 2.5,
  };

  const addonPrices = {
    pool: 400000,      // ₹4 Lakhs
    solar: 250000,     // ₹2.5 Lakhs
    smartHome: 180000, // ₹1.8 Lakhs
  };

  // Calculations
  const baseCost = area * packageRates[quality] * floorMultipliers[floors];
  
  const selectedAddonsCost = 
    (addons.pool ? addonPrices.pool : 0) +
    (addons.solar ? addonPrices.solar : 0) +
    (addons.smartHome ? addonPrices.smartHome : 0);

  const totalCost = baseCost + selectedAddonsCost;

  // Breakdown percentages
  const breakdownRatio = {
    labor: 0.30,      // 30%
    finishes: 0.22,   // 22%
    cement: 0.16,     // 16%
    steel: 0.14,      // 14%
    architect: 0.10,  // 10%
    sand: 0.08,       // 8%
  };

  // Formatter helper
  const formatCurrency = (val) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleAddonChange = (key) => {
    setAddons((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // WhatsApp template dispatch
  const getWhatsAppLink = () => {
    const text = `Hello HouseFrame! I just calculated my estimated construction costing using your website Estimator:
- *Area:* ${area} Sq. Ft.
- *Quality Package:* ${quality.toUpperCase()} (${formatCurrency(packageRates[quality])}/sq.ft)
- *Floors:* ${floors} Floor(s)
- *Add-ons:* ${Object.keys(addons).filter(k => addons[k]).map(k => k === 'pool' ? 'Pool' : k === 'solar' ? 'Solar' : 'Smart Home').join(', ') || 'None'}
- *Estimated Construction Cost:* ${formatCurrency(totalCost)}

I'd like to consult with your estimators for a final blueprint and quote.`;

    return `https://wa.me/7367055728?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white py-12 px-6 md:px-12 relative overflow-hidden">
      {/* Glow filters */}
      <div className="absolute top-[-250px] left-[-250px] w-[600px] h-[600px] bg-yellow-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-250px] right-[-250px] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-10">
        
        {/* HEADER SECTION */}
        <div className="text-center">
          <span className="px-3 py-1 text-[11px] rounded-full bg-yellow-400/20 text-yellow-300 font-semibold tracking-wider uppercase">
            Estimator Portal
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold mt-3 text-white tracking-tight">
            Construction <span className="text-yellow-400">Cost Calculator</span>
          </h1>
          <p className="text-sm text-slate-400 mt-2 max-w-xl mx-auto leading-relaxed">
            Get an instant structural and civil costing estimate for your dream project. Custom-tailor your finishes and floors in real-time.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SIDE - CONTROLS (7 COLS) */}
          <div className="lg:col-span-7 bg-slate-900/35 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-md space-y-8">
            
            {/* AREA SLIDER */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-yellow-400 uppercase tracking-wider">
                  1. Total Built-Up Area
                </h3>
                <div className="flex items-center bg-slate-950/80 border border-yellow-400/25 px-3 py-1.5 rounded-xl shadow-inner font-mono text-white">
                  <input
                    type="number"
                    min="100"
                    max="50000"
                    value={area === 0 ? "" : area}
                    onChange={(e) => {
                      const val = e.target.value === "" ? 0 : Math.max(0, Number(e.target.value));
                      setArea(val);
                    }}
                    className="w-16 bg-transparent text-right font-black text-base md:text-lg focus:outline-none border-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-yellow-400"
                  />
                  <span className="text-xs font-medium text-slate-400 ml-1.5 select-none">Sq.Ft.</span>
                </div>
              </div>
              <input
                type="range"
                min="500"
                max="8000"
                step="50"
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-yellow-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>500 SQ.FT</span>
                <span>4,000 SQ.FT</span>
                <span>8,000 SQ.FT</span>
              </div>
            </div>

            {/* QUALITY PACKAGES */}
            <div className="space-y-4 border-t border-white/10 pt-6">
              <h3 className="text-sm font-bold text-yellow-400 uppercase tracking-wider">
                2. Material & Finish Quality Package
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "standard", name: "Standard", rate: "₹1,500" },
                  { id: "premium", name: "Premium", rate: "₹2,200" },
                  { id: "luxury", name: "Luxury", rate: "₹3,200" },
                ].map((pkg) => (
                  <button
                    key={pkg.id}
                    onClick={() => setQuality(pkg.id)}
                    className={`p-4 rounded-xl border text-center transition-all duration-300 cursor-pointer flex flex-col items-center justify-center gap-1 ${
                      quality === pkg.id
                        ? "bg-yellow-400 text-black border-yellow-400 shadow-md shadow-yellow-400/25"
                        : "bg-slate-950/60 border-white/5 hover:bg-slate-950 hover:border-white/20 text-slate-300"
                    }`}
                  >
                    <span className="text-xs font-black uppercase tracking-wider">{pkg.name}</span>
                    <span className="text-[10px] opacity-75 font-mono">{pkg.rate}/sq.ft</span>
                  </button>
                ))}
              </div>

              {/* Package Details Banner */}
              <div className="bg-white/5 border border-white/5 rounded-xl p-4 text-xs leading-relaxed text-slate-300">
                {quality === "standard" && (
                  <p>
                    🔨 **Includes:** Basic structural concrete framework, local brickwork, standard vitrified floor tiles, branded local wiring, and standard PVC plumbing lines.
                  </p>
                )}
                {quality === "premium" && (
                  <p>
                    ✨ **Includes:** High-strength civil framing, Premium Kajaria vitrified floor tiling, modular electrical wiring, branded sanitary fixtures (Jaquar/Cera), and solid seasoned wood doors.
                  </p>
                )}
                {quality === "luxury" && (
                  <p>
                    💎 **Includes:** Premium Italian marble/engineered wood flooring, multi-layered smart security wiring, custom toughened structural glass partitions, VRV central ducting conduits, and luxury sanitary fittings (Kohler/Grohe).
                  </p>
                )}
              </div>
            </div>

            {/* NUMBER OF FLOORS */}
            <div className="space-y-4 border-t border-white/10 pt-6">
              <h3 className="text-sm font-bold text-yellow-400 uppercase tracking-wider">
                3. Total Number of Floors
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3].map((num) => (
                  <button
                    key={num}
                    onClick={() => setFloors(num)}
                    className={`py-3 rounded-xl border text-center font-bold text-xs transition duration-300 cursor-pointer ${
                      floors === num
                        ? "bg-yellow-400 text-black border-yellow-400 shadow-md"
                        : "bg-slate-950/60 border-white/5 hover:bg-slate-950 text-slate-300"
                    }`}
                  >
                    {num === 1 ? "Single (G)" : num === 2 ? "Duplex (G+1)" : "Triplex (G+2)"}
                  </button>
                ))}
              </div>
            </div>

            {/* ADDOB INCLUSIONS */}
            <div className="space-y-4 border-t border-white/10 pt-6">
              <h3 className="text-sm font-bold text-yellow-400 uppercase tracking-wider">
                4. Additional Structural Inclusions
              </h3>
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  { id: "pool", label: "🏊 Swimming Pool", price: addonPrices.pool },
                  { id: "solar", label: "☀️ Eco Solar Grid", price: addonPrices.solar },
                  { id: "smartHome", label: "🔒 Smart Home Sys.", price: addonPrices.smartHome },
                ].map((add) => (
                  <button
                    key={add.id}
                    onClick={() => handleAddonChange(add.id)}
                    className={`p-3 rounded-xl border text-left transition duration-300 flex flex-col justify-between h-[82px] cursor-pointer ${
                      addons[add.id]
                        ? "bg-cyan-500/10 border-cyan-400 text-cyan-200"
                        : "bg-slate-950/60 border-white/5 text-slate-400 hover:border-white/10"
                    }`}
                  >
                    <span className="text-[11px] font-bold">{add.label}</span>
                    <span className="text-[9px] font-mono opacity-85 block mt-2 text-slate-400">
                      +{formatCurrency(add.price)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT SIDE - COST DISPLAY & BREAKDOWN (5 COLS) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* TOTAL COST RESULT CARD */}
            <div className="bg-slate-900/35 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-md relative overflow-hidden shadow-2xl">
              <div className="absolute w-[200px] h-[200px] bg-yellow-500/5 rounded-full blur-[80px] top-[-50px] right-[-50px] pointer-events-none" />

              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">
                Total Estimated Build Cost
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-yellow-400 tracking-tight font-mono mt-2">
                {formatCurrency(totalCost)}
              </h2>

              <p className="text-[10px] text-slate-500 mt-2 leading-relaxed">
                Estimate includes site architecture fees, GST, civil foundation structures, labor rates, and premium finishing.
              </p>

              <div className="border-t border-white/5 mt-6 pt-5 space-y-2.5 text-xs text-slate-400">
                <div className="flex justify-between">
                  <span>Base Civil Structure Cost:</span>
                  <span className="font-mono font-semibold text-slate-200">{formatCurrency(baseCost)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Inclusions/Add-ons:</span>
                  <span className="font-mono font-semibold text-slate-200">{formatCurrency(selectedAddonsCost)}</span>
                </div>
              </div>

              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-yellow-400 hover:bg-yellow-500 text-black font-extrabold text-center block rounded-xl transition-all shadow-md hover:shadow-yellow-400/20 text-xs uppercase mt-6 tracking-wide cursor-pointer"
              >
                💬 Get Final Certified Quotation
              </a>
            </div>

            {/* DETAILED CIVIL MATERIAL BREAKDOWN */}
            <div className="bg-slate-900/35 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5 mb-5">
                <span>📊</span> Material & Labor Cost Breakdown
              </h3>
              
              <div className="space-y-4">
                {[
                  { name: "Labor & Engineering Works", ratio: breakdownRatio.labor, color: "bg-amber-400" },
                  { name: "Finishing & Woodwork", ratio: breakdownRatio.finishes, color: "bg-green-400" },
                  { name: "Cement, Bricks & Masonry", ratio: breakdownRatio.cement, color: "bg-blue-400" },
                  { name: "Steel Reinforcements", ratio: breakdownRatio.steel, color: "bg-rose-400" },
                  { name: "Structural Architecture & Design", ratio: breakdownRatio.architect, color: "bg-pink-400" },
                  { name: "Sand & Stone Aggregates", ratio: breakdownRatio.sand, color: "bg-purple-400" },
                ].map((item, idx) => {
                  const val = totalCost * item.ratio;
                  return (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-slate-300">{item.name}</span>
                        <span className="font-mono font-bold text-slate-200">{formatCurrency(val)}</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${item.color} rounded-full`}
                          style={{ width: `${item.ratio * 100}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
