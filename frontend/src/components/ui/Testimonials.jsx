import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Amit Kumar",
    city: "Gaya",
    text: "Excellent construction quality and timely delivery. Very professional team.",
  },
  {
    name: "Rohit Sharma",
    city: "Bodhgaya",
    text: "Loved the 3D design preview. Exactly matched final construction.",
  },
  {
    name: "Sunita Devi",
    city: "Tekari",
    text: "Affordable pricing and transparent work process. Highly recommended.",
  },
];

export default function Testimonials() {
  return (
    <section className="px-6 md:px-20 py-24 bg-white/5">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Trusted By Clients ❤️
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05, rotateY: 8 }}
            className="bg-white/10 backdrop-blur-xl p-6 rounded-xl border border-white/10 shadow-xl"
          >
            <p className="text-gray-300 text-sm mb-4">
              "{t.text}"
            </p>

            <div className="text-yellow-400 font-semibold">
              {t.name}
            </div>
            <div className="text-xs text-gray-400">
              {t.city}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
