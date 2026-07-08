import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// Rotating structural geometry simulating an active construction model
function BuildingStructure() {
  const structureRef = useRef();

  useFrame((state) => {
    if (structureRef.current) {
      // Rotation speed
      structureRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
      structureRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.05;
    }
  });

  return (
    <group ref={structureRef}>
      {/* Golden ground grid helper inside the 3D space */}
      <gridHelper args={[10, 20, "#eab308", "#1e293b"]} position={[0, -1.8, 0]} opacity={0.4} transparent />

      {/* Main Core Columns */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.8, 0.8, 3.2, 8]} />
        <meshStandardMaterial color="#38bdf8" wireframe roughness={0.2} metalness={0.9} />
      </mesh>

      {/* Secondary Structural Girders */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.8, 1.8, 1.8]} />
        <meshStandardMaterial color="#fbbf24" wireframe roughness={0.3} metalness={0.8} />
      </mesh>

      <mesh position={[0, 1.2, 0]} rotation={[0, Math.PI / 4, 0]}>
        <boxGeometry args={[1.2, 1.2, 1.2]} />
        <meshStandardMaterial color="#f472b6" wireframe roughness={0.2} metalness={0.9} />
      </mesh>

      {/* Concrete Foundation block */}
      <mesh position={[0, -1.7, 0]}>
        <boxGeometry args={[3, 0.2, 3]} />
        <meshStandardMaterial color="#475569" roughness={0.9} />
      </mesh>

      {/* Outer ring representing construction outline */}
      <mesh position={[0, -0.8, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.2, 0.04, 8, 32]} />
        <meshStandardMaterial color="#10b981" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.8, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.6, 0.03, 8, 32]} />
        <meshStandardMaterial color="#fbbf24" roughness={0.5} />
      </mesh>
    </group>
  );
}

// Spark/welding dust particles
function SparkParticles() {
  const pointsRef = useRef();

  const [positions, count] = useMemo(() => {
    const particleCount = 120;
    const positionsArr = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      // Random position in a sphere around the building
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 1.2 + Math.random() * 2.2; // radius between 1.2 and 3.4

      positionsArr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positionsArr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positionsArr[i * 3 + 2] = r * Math.cos(phi);
    }
    return [positionsArr, particleCount];
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.03;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#facc15" size={0.06} transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

export default function Auth3D() {
  return (
    <div className="w-full h-full relative overflow-hidden bg-slate-950/20 backdrop-blur-sm">
      <Canvas
        camera={{ position: [0, 1, 4.5], fov: 50 }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 10, 5]} intensity={2.5} color="#38bdf8" />
        <pointLight position={[-5, 5, -5]} intensity={1.5} color="#fbbf24" />

        <BuildingStructure />
        <SparkParticles />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={1.0}
          maxPolarAngle={Math.PI / 2 + 0.1}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>

      {/* Floating Blueprint grid overlay grid details */}
      <div className="absolute top-6 left-6 pointer-events-none border-l-2 border-t-2 border-yellow-400/20 p-4">
        <div className="text-[10px] text-yellow-400 font-bold uppercase tracking-widest">
          SYS.RENDER.ONLINE
        </div>
        <div className="text-[8px] text-slate-400 mt-1 font-mono">
          MODEL: VASTU_GRID_V2.0<br />
          Z-AXIS: COMPLIANT<br />
          ROT: ACTIVE
        </div>
      </div>
      
      <div className="absolute bottom-6 right-6 pointer-events-none border-r-2 border-b-2 border-cyan-400/20 p-4 text-right">
        <div className="text-[8px] text-cyan-400 font-bold uppercase tracking-widest font-mono">
          COORDINATES: CL-91-X
        </div>
      </div>
    </div>
  );
}
