import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import TiltCard from "../components/ui/TildCard";

const projects = [
  {
    title: "Nal Jal Pipeline Project",
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1400",
    desc: "Government water pipeline survey & DPR execution project.",
  },
  {
    title: "Luxury Villa Construction",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400",
    desc: "Modern luxury villa planning and turnkey execution.",
  },
  {
    title: "Interior Design Project",
    image:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?w=1400",
    desc: "Premium interior visualization and modular planning.",
  },
  {
    title: "Commercial Building Project",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400",
    desc: "Multi-storey commercial architecture & execution.",
  },
];

export default function Projects() {
  const [active, setActive] = useState(null);

  return (
    <section className="px-6 md:px-20 py-24 bg-gradient-to-b from-black/0 to-black/30">
      
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          Our Projects
        </h1>
        <p className="text-gray-400 text-sm md:text-base">
          Delivering excellence across residential, commercial & government projects
        </p>
      </motion.div>

      {/* TRUST COUNTERS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
        {[
          { label: "Happy Clients", value: "120+" },
          { label: "Projects Delivered", value: "85+" },
          { label: "Years Experience", value: "12+" },
          { label: "Trusted Partners", value: "30+" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 rounded-xl p-6 text-center border border-white/10 backdrop-blur"
          >
            <div className="text-2xl md:text-3xl font-bold text-yellow-400">
              {stat.value}
            </div>
            <p className="text-xs md:text-sm text-gray-300 mt-1">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>

      {/* PROJECT GRID */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {projects.map((project, index) => (
          <TiltCard key={index}>
            <motion.div
              onClick={() => setActive(project)}
              whileHover={{ scale: 1.04 }}
              className="group cursor-pointer rounded-2xl overflow-hidden
                         bg-white/10 border border-white/10 backdrop-blur-xl
                         shadow-xl hover:shadow-yellow-500/30 transition"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover group-hover:scale-110 transition duration-700"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <p className="text-sm font-semibold text-center px-4">
                    Click to Preview
                  </p>
                </div>
              </div>

              <div
                className="p-5"
                style={{ transform: "translateZ(40px)" }}
              >
                <h3 className="font-semibold mb-1">
                  {project.title}
                </h3>
                <p className="text-xs text-gray-400">
                  {project.desc}
                </p>
              </div>
            </motion.div>
          </TiltCard>
        ))}
      </div>

      {/* MODAL PREVIEW */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
              className="max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={active.image}
                alt={active.title}
                className="rounded-xl w-full object-contain"
              />
              <p className="text-center mt-4 text-lg">
                {active.title}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
