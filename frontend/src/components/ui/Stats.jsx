import { motion } from "framer-motion";

const stats = [
  { value: "250+", label: "Happy Clients" },
  { value: "5+", label: "Years Experience" },
  { value: "500+", label: "Projects Completed" },
  { value: "100%", label: "Client Satisfaction" },
];

export default function Stats() {
  return (
    <section className="px-6 py-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {stats.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -8, scale: 1.05 }}
            className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl p-6 text-center shadow-lg hover:shadow-yellow-500/20 transition"
          >
            <h3 className="text-3xl font-bold text-yellow-400">
              {item.value}
            </h3>
            <p className="text-sm text-gray-300 mt-2">
              {item.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
