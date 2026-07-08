import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Villa } from "./House3D";
import { motion } from "framer-motion";

export default function HouseConfigurator() {
  const [config, setConfig] = useState({
    theme: "modern", // modern, scandinavian, industrial
    colorTheme: "alabaster", // alabaster, sand, charcoal, forest
    wireframe: false,
    dayMode: true,
    constructionStage: "completed", // structure, enclosure, completed
  });

  const handleConfigChange = (key, value) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  // Details to show on selected options
  const themesInfo = {
    modern: {
      title: "Modernist Concrete",
      desc: "Clean geometric volumes, high glass-to-wall ratio, raw concrete textures.",
    },
    scandinavian: {
      title: "Scandinavian Cedar",
      desc: "Warm cedar cladding, minimal flat roofing, cozy earth-friendly ambiance.",
    },
    industrial: {
      title: "Industrial Brick & Steel",
      desc: "Exposed metallic framing, rust brick accents, high-strength structural pillars.",
    },
  };

  const colorsInfo = {
    alabaster: { name: "Alabaster White", hex: "#f8fafc" },
    sand: { name: "Desert Sand", hex: "#fef08a" },
    charcoal: { name: "Charcoal Slate", hex: "#334155" },
    forest: { name: "Forest Moss", hex: "#166534" },
  };

  const stagesInfo = {
    structure: {
      title: "Foundation & Framing (Skeleton)",
      desc: "Vastu-aligned compass grid, reinforced base slab, structural columns, ceiling girders, and active tower crane with spotlight.",
    },
    enclosure: {
      title: "Structural Enclosure (Lock-up)",
      desc: "Main wall volumes, garage carport framing, first-floor cantilever slabs, flat roofs, and active site crane.",
    },
    completed: {
      title: "Finished Fit-Out & Landscaping",
      desc: "Cedar facade accents, double-glazed window panels, swimming pool, landscaped trees, solar array, and ambient night lighting.",
    },
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 bg-slate-900/35 border border-white/10 rounded-3xl backdrop-blur-md shadow-2xl">
      <div className="text-center mb-10">
        <span className="px-3 py-1 text-[11px] rounded-full bg-yellow-400/20 text-yellow-300 font-semibold tracking-wider uppercase">
          Design Studio
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mt-2 text-white">
          3D House Configurator
        </h2>
        <p className="text-sm text-slate-400 mt-2 max-w-xl mx-auto">
          Experiment with structures, facades, and lighting in real-time. Craft your custom blueprint prior to construction.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-stretch">
        
        {/* LEFT COLUMN: 3D RENDER CANVAS */}
        <div className="lg:col-span-8 relative h-[380px] md:h-[500px] rounded-2xl bg-[#030712] border border-white/10 overflow-hidden shadow-inner">
          
          {/* Day/Night Sky Background Color overlay */}
          <div
            className={`absolute inset-0 transition-all duration-1000 ${
              config.dayMode
                ? "bg-gradient-to-tr from-sky-950 via-slate-950 to-indigo-950/40"
                : "bg-gradient-to-b from-[#020208] to-[#0a0f24]"
            }`}
          />

          <Canvas
            shadows
            camera={{ position: [5, 4.5, 7.5], fov: 40 }}
            className="w-full h-full cursor-grab active:cursor-grabbing relative z-10"
          >
            {/* Conditional lighting based on Day/Night mode */}
            {config.dayMode ? (
              <>
                <ambientLight intensity={1.1} />
                <directionalLight
                  position={[8, 12, 8]}
                  intensity={1.8}
                  castShadow
                  shadow-mapSize-width={1024}
                  shadow-mapSize-height={1024}
                />
              </>
            ) : (
              <>
                <ambientLight intensity={0.25} />
                <directionalLight position={[5, 10, 5]} intensity={0.4} color="#818cf8" />
                {/* Moon glow */}
                <directionalLight position={[-8, 6, -8]} intensity={0.3} color="#93c5fd" />
              </>
            )}

            <Villa configOptions={config} />

            <OrbitControls
              enableZoom={true}
              enablePan={false}
              minDistance={4}
              maxDistance={12}
              maxPolarAngle={Math.PI / 2 - 0.05}
            />
          </Canvas>

          {/* Vastu Compass indicator in bottom-left */}
          <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-[10px]">
            <span className="text-yellow-400 font-bold animate-pulse">🧭 Vastu Enabled:</span>
            <span className="text-slate-300">Entrance (East-North) • Kitchen (South-East)</span>
          </div>

          {/* Rendering stats badge */}
          <div className="absolute top-4 right-4 z-20 bg-slate-900/80 backdrop-blur px-3 py-1.5 rounded-lg border border-white/10 text-[10px] text-right flex flex-col items-end">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping"></div>
              <span className="text-green-400 font-medium">3D Engine Active</span>
            </div>
            <span className="text-slate-400 mt-0.5">Procedural Rendering Mode</span>
          </div>
        </div>

        {/* RIGHT COLUMN: CONTROLS DASHBOARD */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
          <div className="space-y-6 bg-slate-950/45 p-6 rounded-2xl border border-white/10 h-full flex flex-col justify-between">
            
            {/* ARCHITECTURAL STYLE SECTION */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-yellow-400 uppercase tracking-widest">
                1. Architectural Facade Style
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {Object.keys(themesInfo).map((t) => (
                  <button
                    key={t}
                    onClick={() => handleConfigChange("theme", t)}
                    className={`py-2 px-1 text-xs rounded-lg font-semibold border transition-all duration-300 ${
                      config.theme === t
                        ? "bg-yellow-400 text-black border-yellow-400 shadow-md shadow-yellow-400/25"
                        : "bg-slate-900 border-white/10 hover:bg-slate-800 text-slate-300"
                    }`}
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
              <motion.div
                key={config.theme}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-white/5 rounded-lg border border-white/5"
              >
                <h4 className="text-xs font-bold text-slate-200">
                  {themesInfo[config.theme].title}
                </h4>
                <p className="text-[10px] text-slate-400 mt-1 leading-normal">
                  {themesInfo[config.theme].desc}
                </p>
              </motion.div>
            </div>

            {/* COLOR PALETTE SECTION */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold text-yellow-400 uppercase tracking-widest">
                2. Exterior Surface Finish
              </h3>
              <div className="flex items-center gap-3">
                {Object.keys(colorsInfo).map((c) => (
                  <button
                    key={c}
                    onClick={() => handleConfigChange("colorTheme", c)}
                    title={colorsInfo[c].name}
                    className={`w-8 h-8 rounded-full border-2 transition-all duration-300 relative ${
                      config.colorTheme === c
                        ? "border-yellow-400 scale-110 shadow-lg"
                        : "border-white/15 hover:scale-105"
                    }`}
                    style={{ backgroundColor: colorsInfo[c].hex }}
                  >
                    {config.colorTheme === c && (
                      <span className="absolute inset-0 flex items-center justify-center text-[10px] text-yellow-500 font-bold">
                        ✓
                      </span>
                    )}
                  </button>
                ))}
                <span className="text-xs text-slate-300 font-semibold ml-2">
                  {colorsInfo[config.colorTheme].name}
                </span>
              </div>
            </div>

            {/* INTERACTIVE CONSTRUCTION STAGE SECTION */}
            <div className="space-y-3 pt-2 border-t border-white/10">
              <h3 className="text-xs font-bold text-yellow-400 uppercase tracking-widest">
                3. Construction Progress Stage
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {Object.keys(stagesInfo).map((s) => (
                  <button
                    key={s}
                    onClick={() => handleConfigChange("constructionStage", s)}
                    className={`py-2 px-1 text-[10px] rounded-lg font-semibold border transition-all duration-300 ${
                      config.constructionStage === s
                        ? "bg-yellow-400 text-black border-yellow-400 shadow-md shadow-yellow-400/25"
                        : "bg-slate-900 border-white/10 hover:bg-slate-800 text-slate-300"
                    }`}
                  >
                    {s === "structure" ? "Structure" : s === "enclosure" ? "Enclosure" : "Completed"}
                  </button>
                ))}
              </div>
              <motion.div
                key={config.constructionStage}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-white/5 rounded-lg border border-white/5"
              >
                <h4 className="text-xs font-bold text-slate-200">
                  {stagesInfo[config.constructionStage].title}
                </h4>
                <p className="text-[10px] text-slate-400 mt-1 leading-normal">
                  {stagesInfo[config.constructionStage].desc}
                </p>
              </motion.div>
            </div>

            {/* VISUAL VIEWS CONTROLS */}
            <div className="space-y-4 pt-3 border-t border-white/10">
              <h3 className="text-xs font-bold text-yellow-400 uppercase tracking-widest">
                4. Simulation & Render Settings
              </h3>
              
              {/* Day / Night Toggle */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-300 font-medium">Lighting Cycle (Day/Night)</span>
                <button
                  onClick={() => handleConfigChange("dayMode", !config.dayMode)}
                  className={`w-14 h-7 rounded-full p-1 transition-colors duration-300 flex items-center ${
                    config.dayMode ? "bg-amber-400 justify-end" : "bg-indigo-900 justify-start"
                  }`}
                >
                  <motion.div
                    layout
                    className="w-5 h-5 rounded-full bg-slate-950 flex items-center justify-center text-[10px]"
                  >
                    {config.dayMode ? "☀️" : "🌙"}
                  </motion.div>
                </button>
              </div>

              {/* Wireframe blueprint Toggle */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-300 font-medium">CAD Blueprint (Wireframe)</span>
                <button
                  onClick={() => handleConfigChange("wireframe", !config.wireframe)}
                  className={`w-14 h-7 rounded-full p-1 transition-colors duration-300 flex items-center ${
                    config.wireframe ? "bg-cyan-500 justify-end" : "bg-slate-800 justify-start"
                  }`}
                >
                  <motion.div
                    layout
                    className="w-5 h-5 rounded-full bg-white flex items-center justify-center"
                  />
                </button>
              </div>
            </div>

            {/* CTA BOOKING DETAILS */}
            <div className="pt-4 border-t border-white/10">
              <a
                href={`https://wa.me/7367055728?text=Hi%20HouseFrame!%20I%20just%20configured%20my%20dream%20home%20style%20as%20${themesInfo[config.theme].title}%20in%20${colorsInfo[config.colorTheme].name}%20using%20your%203D%20Studio!%20I'd%2520like%20to%20discuss%20construction%20costing.`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-black text-center block rounded-xl font-bold transition shadow-lg text-xs"
              >
                📋 Book Free Construction Quote
              </a>
              <p className="text-[10px] text-slate-500 text-center mt-2">
                Sends your 3D configuration direct to our structural estimators.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
