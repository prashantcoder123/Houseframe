import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function TiltCard({ children }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 120, damping: 18 });
  const springY = useSpring(y, { stiffness: 120, damping: 18 });

  const rotateX = useTransform(springY, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-12deg", "12deg"]);

  function handleMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative"
    >
      {children}
    </motion.div>
  );
}
