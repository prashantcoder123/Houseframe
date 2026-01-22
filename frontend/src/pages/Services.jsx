import { motion } from "framer-motion";
import TiltCard from "../components/ui/TildCard";

const services = [
  {
    title: "House Design & Construction",
    icon: "🏠",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000",
    points: [
      "Residential Planning (2D / 3D)",
      "Building Construction",
      "Estimate & Material Planning",
      "Site Supervision",
      "Vastu Planning",
      "Turnkey Execution",
    ],
  },
  {
    title: "Nal Jal Yojana – Pipeline Survey",
    icon: "🚰",
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1000",
    points: [
      "Pipeline Route Survey",
      "Village Water Supply Survey",
      "DPR Preparation",
      "Layout Design",
      "Cost Estimation",
      "Govt Compliance",
    ],
  },
  {
    title: "Interior & 3D Visualization",
    icon: "🎨",
    image:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?w=1000",
    points: [
      "3D Elevation Design",
      "Lighting Planning",
      "Modular Kitchen",
      "Virtual Walkthrough",
      "Furniture Layout",
    ],
  },
  {
    title: "Renovation & Remodeling",
    icon: "🔨",
    image:
      "https://images.unsplash.com/photo-1599423300746-b62533397364?w=1000",
    points: [
      "Structural Upgrade",
      "Modern Facade",
      "Interior Refresh",
      "Electrical & Plumbing",
      "Space Optimization",
    ],
  },
];

export default function Services() {
  return (
    <section className="px-6 md:px-20 py-24 bg-white/5">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-16">
        Our Services
      </h1>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {services.map((service, index) => (
          <TiltCard key={index}>
            <motion.div
              whileHover={{ scale: 1.04 }}
              className="group relative rounded-2xl overflow-hidden
                         bg-white/10 backdrop-blur-xl 
                         border border-white/10
                         shadow-xl hover:shadow-yellow-500/30
                         transition-all duration-500"
            >
              {/* IMAGE */}
              <div className="h-56 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-full w-full object-cover 
                             group-hover:scale-110 transition duration-700"
                />
              </div>

              {/* CONTENT */}
              <div
                className="p-6 relative z-10"
                style={{ transform: "translateZ(50px)" }}
              >
                <div className="text-3xl mb-3">{service.icon}</div>

                <h3 className="font-semibold text-lg mb-4">
                  {service.title}
                </h3>

                <ul className="space-y-2 text-sm text-gray-300">
                  {service.points.map((p, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-yellow-400">✔</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              {/* LIGHT GLOW */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition
                           bg-gradient-to-br from-yellow-400/20 via-transparent to-purple-500/20"
              />
            </motion.div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}
