import { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";

// A floating card/annotation indicator
function Annotation({ position, title, description, activeTag, setActiveTag, id }) {
  const isOpen = activeTag === id;
  return (
    <Html position={position} distanceFactor={8} zIndexRange={[100, 0]}>
      <div className="relative select-none pointer-events-auto">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setActiveTag(isOpen ? null : id);
          }}
          className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shadow-lg transition-all duration-300 transform hover:scale-125 ${
            isOpen
              ? "bg-yellow-400 text-black scale-110 ring-4 ring-yellow-400/30"
              : "bg-black/80 text-yellow-400 border border-yellow-400 hover:bg-yellow-400 hover:text-black"
          }`}
        >
          {id}
        </button>
        {isOpen && (
          <div className="absolute left-8 top-1/2 -translate-y-1/2 w-64 bg-slate-900/95 backdrop-blur-md border border-yellow-400/40 p-4 rounded-xl shadow-2xl text-white z-50 animate-fade-in transition-all">
            <h4 className="font-bold text-sm text-yellow-400 flex items-center gap-1.5">
              <span>📍</span> {title}
            </h4>
            <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
              {description}
            </p>
          </div>
        )}
      </div>
    </Html>
  );
}

// Procedural Tree helper
function Tree({ position }) {
  return (
    <group position={position}>
      {/* Trunk */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.06, 0.1, 0.8, 8]} />
        <meshStandardMaterial color="#5c4033" roughness={0.9} />
      </mesh>
      {/* Foliage */}
      <mesh position={[0, 1.1, 0]}>
        <coneGeometry args={[0.35, 0.9, 5]} />
        <meshStandardMaterial color="#1e4620" roughness={0.8} flatShading />
      </mesh>
      <mesh position={[0, 1.5, 0]}>
        <coneGeometry args={[0.25, 0.7, 5]} />
        <meshStandardMaterial color="#2d5a27" roughness={0.8} flatShading />
      </mesh>
    </group>
  );
}

// Interactive Modern Villa Model Group
function Villa({ activeTag, setActiveTag, configOptions = {} }) {
  const groupRef = useRef();

  // Slow rotation when user is not active
  useFrame((state) => {
    if (groupRef.current && !activeTag) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  // Extract config with fallback values (used by Configurator)
  const {
    theme = "modern", // modern, scandinavian, industrial
    colorTheme = "alabaster", // alabaster, sand, charcoal, forest
    wireframe = false,
    dayMode = true,
    constructionStage = "completed", // structure, enclosure, completed
  } = configOptions;

  // Map theme to materials
  let wallColor = "#f1f5f9"; // Alabaster / White
  let woodColor = "#854d0e"; // Warm Oak
  let structureColor = "#475569"; // Slate Concrete

  if (colorTheme === "sand") {
    wallColor = "#f5f5dc";
    structureColor = "#a1a1aa";
  } else if (colorTheme === "charcoal") {
    wallColor = "#1e293b";
    structureColor = "#0f172a";
    woodColor = "#3f2d1a";
  } else if (colorTheme === "forest") {
    wallColor = "#dcfce7";
    structureColor = "#14532d";
    woodColor = "#5c4033";
  }

  // Override accent colors based on architectural theme style
  let secondaryColor = structureColor;
  let panelColor = woodColor;
  if (theme === "scandinavian") {
    panelColor = "#b45309"; // rich cedar
    wallColor = "#fafafa";
    secondaryColor = "#78716c";
  } else if (theme === "industrial") {
    panelColor = "#7f1d1d"; // brick-red / rust
    secondaryColor = "#1e293b"; // steel-gray
    wallColor = "#64748b";
  }

  // Material setup
  const wallMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(wallColor),
    roughness: 0.8,
    wireframe,
  });

  const secondaryMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(secondaryColor),
    roughness: 0.6,
    metalness: 0.2,
    wireframe,
  });

  const woodMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(panelColor),
    roughness: 0.7,
    wireframe,
  });

  const glassMat = new THREE.MeshPhysicalMaterial({
    color: "#a5f3fc",
    transparent: true,
    opacity: 0.35,
    roughness: 0.1,
    transmission: 0.6,
    thickness: 1.2,
    wireframe,
  });

  const metalMat = new THREE.MeshStandardMaterial({
    color: "#0f172a",
    roughness: 0.3,
    metalness: 0.9,
    wireframe,
  });

  const solarMat = new THREE.MeshStandardMaterial({
    color: "#1e1b4b",
    roughness: 0.2,
    metalness: 0.8,
    wireframe,
  });

  const waterMat = new THREE.MeshStandardMaterial({
    color: "#06b6d4",
    roughness: 0.1,
    metalness: 0.1,
    opacity: 0.85,
    transparent: true,
  });

  const steelColMat = new THREE.MeshStandardMaterial({
    color: "#475569",
    metalness: 0.8,
    roughness: 0.2,
    wireframe,
  });

  return (
    <group ref={groupRef} position={[0, -0.6, 0]}>
      {/* Blueprint Grid / Base */}
      <gridHelper args={[12, 24, "#eab308", "#334155"]} position={[0, -0.05, 0]} opacity={0.3} transparent />

      {/* Main Base Deck */}
      <mesh position={[0, -0.02, 0]} receiveShadow>
        <boxGeometry args={[7, 0.1, 6]} />
        <meshStandardMaterial color="#1e293b" roughness={0.9} />
      </mesh>

      {/* ================= VASTU COMPASS RING ================= */}
      <group position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh>
          <ringGeometry args={[3.2, 3.25, 32]} />
          <meshBasicMaterial color="#eab308" opacity={0.4} transparent side={THREE.DoubleSide} />
        </mesh>
      </group>
      <Html position={[0, 0.1, -3.4]} center distanceFactor={8}>
        <span className="text-[10px] font-bold text-yellow-400/90 bg-slate-950/80 px-1 py-0.5 rounded border border-yellow-400/20 shadow-md">N</span>
      </Html>
      <Html position={[3.4, 0.1, 0]} center distanceFactor={8}>
        <span className="text-[10px] font-bold text-yellow-400/90 bg-slate-950/80 px-1.5 py-0.5 rounded border border-yellow-400/20 shadow-md">E (Vastu)</span>
      </Html>
      <Html position={[0, 0.1, 3.4]} center distanceFactor={8}>
        <span className="text-[10px] font-bold text-yellow-400/90 bg-slate-950/80 px-1 py-0.5 rounded border border-yellow-400/20 shadow-md">S</span>
      </Html>
      <Html position={[-3.4, 0.1, 0]} center distanceFactor={8}>
        <span className="text-[10px] font-bold text-yellow-400/90 bg-slate-950/80 px-1 py-0.5 rounded border border-yellow-400/20 shadow-md">W</span>
      </Html>

      {/* ================= STRUCTURAL COLUMNS & FRAMING (All Stages) ================= */}
      <group>
        {/* Living Room Pillars */}
        <mesh position={[-2.7, 0.75, 2.1]} castShadow>
          <cylinderGeometry args={[0.06, 0.06, 1.5, 8]} />
          <primitive object={steelColMat} />
        </mesh>
        <mesh position={[0.3, 0.75, 2.1]} castShadow>
          <cylinderGeometry args={[0.06, 0.06, 1.5, 8]} />
          <primitive object={steelColMat} />
        </mesh>
        <mesh position={[-2.7, 0.75, -0.9]} castShadow>
          <cylinderGeometry args={[0.06, 0.06, 1.5, 8]} />
          <primitive object={steelColMat} />
        </mesh>
        <mesh position={[0.3, 0.75, -0.9]} castShadow>
          <cylinderGeometry args={[0.06, 0.06, 1.5, 8]} />
          <primitive object={steelColMat} />
        </mesh>

        {/* Cantilever support columns */}
        <mesh position={[2.1, 0.75, 1.6]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 1.5, 8]} />
          <primitive object={steelColMat} />
        </mesh>
        <mesh position={[2.1, 0.75, -1.0]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 1.5, 8]} />
          <primitive object={steelColMat} />
        </mesh>

        {/* Carport outer corner pillars */}
        <mesh position={[2.3, 0.65, -1.9]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 1.3, 8]} />
          <primitive object={steelColMat} />
        </mesh>
        <mesh position={[2.3, 0.65, 0.3]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 1.3, 8]} />
          <primitive object={steelColMat} />
        </mesh>

        {/* Ceilings/Floors Outline framing */}
        <mesh position={[-1.2, 1.48, 0.6]}>
          <boxGeometry args={[3.24, 0.08, 3.24]} />
          <primitive object={secondaryMat} />
        </mesh>
        <mesh position={[1.4, 1.28, -0.8]}>
          <boxGeometry args={[2.04, 0.08, 2.44]} />
          <primitive object={secondaryMat} />
        </mesh>
      </group>

      {/* ================= MINIATURE TOWER CRANE (Active during construction) ================= */}
      {(constructionStage === "structure" || constructionStage === "enclosure") && (
        <group position={[-3.8, 0, -2.6]} rotation={[0, Math.PI / 4, 0]}>
          {/* Base */}
          <mesh position={[0, 0.1, 0]}>
            <boxGeometry args={[0.4, 0.2, 0.4]} />
            <meshStandardMaterial color="#334155" roughness={0.8} />
          </mesh>
          {/* Mast */}
          <mesh position={[0, 1.8, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 3.4, 6]} />
            <meshStandardMaterial color="#eab308" roughness={0.5} metalness={0.7} wireframe />
          </mesh>
          {/* Cabin */}
          <mesh position={[0, 3.5, 0.05]}>
            <boxGeometry args={[0.2, 0.2, 0.28]} />
            <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.8} />
          </mesh>
          {/* Jib */}
          <mesh position={[0.7, 3.65, 0]}>
            <boxGeometry args={[1.9, 0.08, 0.08]} />
            <meshStandardMaterial color="#eab308" roughness={0.5} metalness={0.7} wireframe />
          </mesh>
          {/* Counter Jib */}
          <mesh position={[-0.45, 3.65, 0]}>
            <boxGeometry args={[0.7, 0.08, 0.08]} />
            <meshStandardMaterial color="#ef4444" roughness={0.8} />
          </mesh>
          {/* Cable Line */}
          <mesh position={[1.2, 2.4, 0]}>
            <cylinderGeometry args={[0.006, 0.006, 2.4, 4]} />
            <meshStandardMaterial color="#94a3b8" />
          </mesh>
          {/* Cable hook load */}
          <mesh position={[1.2, 1.1, 0]}>
            <boxGeometry args={[0.2, 0.2, 0.2]} />
            <meshStandardMaterial color="#64748b" roughness={0.9} />
          </mesh>
          {/* Night Construction Spotlight */}
          {!dayMode && (
            <pointLight color="#fef08a" intensity={3.5} distance={10} position={[0, 3.7, 0.2]} />
          )}
        </group>
      )}

      {/* ================= ENCLOSURE STAGE (Walls & Roofs) ================= */}
      {(constructionStage === "enclosure" || constructionStage === "completed") && (
        <>
          {/* Living Room Solid block */}
          <mesh position={[-1.2, 0.75, 0.6]} castShadow receiveShadow>
            <boxGeometry args={[3.2, 1.5, 3.2]} />
            <primitive object={wallMat} />
          </mesh>

          {/* Modern Garage / Utility Carport block */}
          <mesh position={[1.4, 0.65, -0.8]} castShadow receiveShadow>
            <boxGeometry args={[2.0, 1.3, 2.4]} />
            <primitive object={secondaryMat} />
          </mesh>

          {/* First Floor Bedroom wing structure block */}
          <mesh position={[0.4, 2.1, 0.25]} castShadow receiveShadow>
            <boxGeometry args={[4.2, 1.2, 3.4]} />
            <primitive object={wallMat} />
          </mesh>

          {/* Flat roof deck */}
          <mesh position={[0.8, 3.35, 0.5]} castShadow receiveShadow>
            <boxGeometry args={[4.4, 0.15, 3.6]} />
            <primitive object={secondaryMat} />
          </mesh>
        </>
      )}

      {/* ================= COMPLETED DESIGN STAGE (Finishing, Glazing, Landscaping, Lights) ================= */}
      {constructionStage === "completed" && (
        <>
          {/* Swimming Pool (Cyan Glow) */}
          <group position={[2.0, 0, 1.25]}>
            <mesh position={[0, -0.03, 0]}>
              <boxGeometry args={[1.6, 0.08, 2.2]} />
              <meshStandardMaterial color="#0f172a" roughness={0.9} />
            </mesh>
            <mesh position={[0, 0.015, 0]}>
              <boxGeometry args={[1.5, 0.02, 2.1]} />
              <primitive object={waterMat} />
            </mesh>
            {!dayMode && (
              <pointLight color="#22d3ee" intensity={1.8} distance={3} position={[0, 0.2, 0]} />
            )}
          </group>

          {/* 3D Ground Landscaping (Minimalist Trees) */}
          <Tree position={[-2.8, 0, -2.2]} />
          <Tree position={[-2.8, 0, -0.8]} />
          <Tree position={[2.8, 0, -2.2]} />

          {/* Massive Glass Sliding Facade on ground floor */}
          <mesh position={[-1.2, 0.75, 2.21]} castShadow>
            <boxGeometry args={[2.4, 1.2, 0.05]} />
            <primitive object={glassMat} />
          </mesh>
          {/* Window Metal Frame */}
          <mesh position={[-1.2, 0.75, 2.22]}>
            <boxGeometry args={[2.5, 1.3, 0.03]} />
            <primitive object={metalMat} />
          </mesh>

          {/* Main Entrance Pivot Door (Vastu East-North Entrance) */}
          <mesh position={[0.7, 0.65, 0.81]} castShadow>
            <boxGeometry args={[0.9, 1.3, 0.08]} />
            <primitive object={woodMat} />
          </mesh>

          {/* First floor decorative facade & balcony items */}
          <group position={[0.4, 2.1, 0.25]}>
            {/* Dynamic wood panel architectural accent facade */}
            <mesh position={[-2.11, 0, 0]} castShadow>
              <boxGeometry args={[0.04, 1.0, 2.4]} />
              <primitive object={woodMat} />
            </mesh>

            {/* Master Bedroom Balcony (Extends forward) */}
            <mesh position={[0.4, -0.55, 1.85]} castShadow receiveShadow>
              <boxGeometry args={[3.0, 0.1, 1.0]} />
              <primitive object={secondaryMat} />
            </mesh>

            {/* Glass railing for balcony */}
            <mesh position={[0.4, -0.2, 2.34]} castShadow>
              <boxGeometry args={[3.0, 0.6, 0.04]} />
              <primitive object={glassMat} />
            </mesh>
            {/* Metal railing rail */}
            <mesh position={[0.4, 0.12, 2.34]}>
              <boxGeometry args={[3.02, 0.04, 0.06]} />
              <primitive object={metalMat} />
            </mesh>

            {/* Master bedroom panoramic window */}
            <mesh position={[0.4, 0.05, 1.71]} castShadow>
              <boxGeometry args={[2.2, 0.9, 0.05]} />
              <primitive object={glassMat} />
            </mesh>
          </group>

          {/* Solar Panel Array on the Roof */}
          <group position={[0.8, 3.48, -0.4]}>
            {/* Support Rack */}
            <mesh position={[0, -0.03, 0]}>
              <boxGeometry args={[2.5, 0.03, 1.4]} />
              <primitive object={metalMat} />
            </mesh>
            {/* Solar Cells */}
            <mesh position={[0, 0.01, 0]} rotation={[-0.1, 0, 0]}>
              <boxGeometry args={[2.4, 0.04, 1.3]} />
              <primitive object={solarMat} />
            </mesh>
          </group>

          {/* ================= INTERIOR LIGHTING (Shows at Night) ================= */}
          {!dayMode && (
            <>
              {/* Ground Floor Interior Glow */}
              <pointLight color="#fef08a" intensity={2.5} distance={5} position={[-1.2, 0.6, 0.8]} />
              {/* First Floor Bedroom Glow */}
              <pointLight color="#fef08a" intensity={2.5} distance={5} position={[0.4, 2.1, 0.25]} />
              {/* Entrance warm light */}
              <pointLight color="#f87171" intensity={1.5} distance={3} position={[0.7, 1.5, 1.1]} />
            </>
          )}

          {/* ================= ANNOTATIONS / DREI LABELS ================= */}
          {!wireframe && (
            <>
              <Annotation
                position={[-1.2, 0.75, 2.3]}
                id="1"
                title="Premium Structural Glass"
                description="Vastu-integrated French glass doors. Restores direct ambient sunlight & optimizes thermal cooling coefficients."
                activeTag={activeTag}
                setActiveTag={setActiveTag}
              />
              <Annotation
                position={[0.7, 0.85, 0.9]}
                id="2"
                title="Vastu Entrance Portal"
                description="Exquisite entrance aligned precisely with directional orientation (Ishanya corner) for positive aura & ventilation."
                activeTag={activeTag}
                setActiveTag={setActiveTag}
              />
              <Annotation
                position={[0.8, 2.1, 2.2]}
                id="3"
                title="Cedar Balcony Deck"
                description="Sustainable timber deck with reinforced glass-steel railings. Features structural cantilevering."
                activeTag={activeTag}
                setActiveTag={setActiveTag}
              />
              <Annotation
                position={[0.8, 3.6, -0.4]}
                id="4"
                title="Eco Solar Array"
                description="High-yield solar roofing grid generating zero-emission electricity to support independent green off-grid living."
                activeTag={activeTag}
                setActiveTag={setActiveTag}
              />
            </>
          )}
        </>
      )}
    </group>
  );
}

// Standard responsive wrapper component with details
export default function House3D() {
  const [activeTag, setActiveTag] = useState(null);
  const [isRotating, setIsRotating] = useState(true);

  return (
    <div className="relative w-full h-[350px] md:h-[580px] rounded-3xl bg-slate-950/40 border border-white/10 backdrop-blur-md overflow-hidden group shadow-2xl">
      
      {/* 3D Canvas */}
      <Canvas
        shadows
        camera={{ position: [6, 4, 8], fov: 42 }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        {/* Lights */}
        <ambientLight intensity={1.2} />
        <directionalLight
          position={[10, 15, 10]}
          intensity={2.0}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-bias={-0.0001}
        />
        <pointLight position={[-10, 8, -10]} intensity={0.5} />

        {/* Villa Model */}
        <Villa activeTag={activeTag} setActiveTag={setActiveTag} />

        {/* Orbit Controls to manipulate camera */}
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={5}
          maxDistance={14}
          maxPolarAngle={Math.PI / 2 - 0.05} // prevent going underground
          makeDefault
          autoRotate={isRotating && !activeTag}
          autoRotateSpeed={1.5}
        />
      </Canvas>

      {/* Interactive Helper Overlay Info */}
      <div className="absolute top-4 left-4 pointer-events-none bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-left">
        <h3 className="text-xs font-bold text-yellow-400 uppercase tracking-wider">
          Interactive 3D Blueprint
        </h3>
        <p className="text-[10px] text-slate-300 mt-0.5">
          Drag to rotate model • Click tags 1-4 for details
        </p>
      </div>

      {/* Rotation Toggle */}
      <button
        onClick={() => setIsRotating(!isRotating)}
        className="absolute bottom-4 right-4 z-20 px-3 py-1.5 text-xs bg-slate-900/80 hover:bg-yellow-400 hover:text-black border border-white/15 rounded-lg transition-all font-semibold flex items-center gap-1.5"
      >
        <span>{isRotating ? "⏸ Pause Autorotate" : "▶ Rotate"}</span>
      </button>

      {/* Active tag banner for mobile when canvas overlays are small */}
      {activeTag && (
        <div className="absolute bottom-4 left-4 right-16 z-15 md:hidden bg-slate-900/95 border border-yellow-400/40 p-3.5 rounded-xl shadow-xl">
          {activeTag === "1" && (
            <div>
              <h4 className="text-xs font-bold text-yellow-400">1. Premium Structural Glass</h4>
              <p className="text-[10px] text-slate-300 mt-1">Vastu-integrated French glass doors. Restores direct ambient sunlight & optimizes thermal cooling.</p>
            </div>
          )}
          {activeTag === "2" && (
            <div>
              <h4 className="text-xs font-bold text-yellow-400">2. Vastu Entrance Portal</h4>
              <p className="text-[10px] text-slate-300 mt-1">Exquisite entrance aligned precisely with directional orientation for positive aura.</p>
            </div>
          )}
          {activeTag === "3" && (
            <div>
              <h4 className="text-xs font-bold text-yellow-400">3. Cedar Balcony Deck</h4>
              <p className="text-[10px] text-slate-300 mt-1">Sustainable timber deck with reinforced glass-steel railings. Features structural cantilevering.</p>
            </div>
          )}
          {activeTag === "4" && (
            <div>
              <h4 className="text-xs font-bold text-yellow-400">4. Eco Solar Array</h4>
              <p className="text-[10px] text-slate-300 mt-1">High-yield solar roofing grid generating zero-emission electricity to support off-grid living.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export { Villa };
