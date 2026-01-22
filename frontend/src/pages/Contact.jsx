import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section className="px-6 md:px-20 py-28 bg-gradient-to-b from-white/5 to-black/20">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          Contact Us
        </h1>
        <p className="text-gray-400 text-sm md:text-base">
          Let’s build something great together. Reach out today.
        </p>
      </motion.div>

      {/* GRID */}
      <div className="grid md:grid-cols-2 gap-14 max-w-6xl mx-auto">

        {/* FORM CARD */}
        <motion.div
          whileHover={{ y: -6 }}
          className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl 
                     border border-white/10 shadow-xl space-y-6"
        >
          <FloatingInput label="Your Name" />
          <FloatingInput label="Phone Number" />
          <FloatingInput label="Email Address" />
          <FloatingTextarea label="Your Message" />

          <button
            className="w-full py-3 rounded-lg font-semibold text-black
                       bg-gradient-to-r from-yellow-400 to-yellow-500
                       hover:scale-[1.02] active:scale-95 transition"
          >
            Send Message 🚀
          </button>

          {/* QUICK ACTION */}
          <a
            href="https://wa.me/7367049049"
            target="_blank"
            className="block text-center text-sm text-green-400 hover:underline"
          >
            💬 Chat on WhatsApp
          </a>
        </motion.div>

        {/* MAP CARD */}
        <motion.div
          whileHover={{ y: -6 }}
          className="rounded-2xl overflow-hidden border border-white/10 shadow-xl"
        >
          <iframe
            title="location"
            className="w-full h-[380px] md:h-full"
            src="https://www.google.com/maps?q=Gaya%20Bihar%20India&output=embed"
            loading="lazy"
          ></iframe>
        </motion.div>

      </div>
    </section>
  );
}

/* ----------------------- */
/* Floating Input Components */
/* ----------------------- */

function FloatingInput({ label }) {
  return (
    <div className="relative">
      <input
        required
        placeholder=" "
        className="peer w-full bg-black/30 border border-white/10 rounded-lg
                   px-4 pt-5 pb-2 outline-none text-sm
                   focus:border-yellow-400 transition"
      />
      <label
        className="absolute left-4 top-2 text-xs text-gray-400
                   peer-placeholder-shown:top-4
                   peer-placeholder-shown:text-sm
                   peer-placeholder-shown:text-gray-500
                   peer-focus:top-2 peer-focus:text-xs peer-focus:text-yellow-400
                   transition-all"
      >
        {label}
      </label>
    </div>
  );
}

function FloatingTextarea({ label }) {
  return (
    <div className="relative">
      <textarea
        rows="4"
        required
        placeholder=" "
        className="peer w-full bg-black/30 border border-white/10 rounded-lg
                   px-4 pt-5 pb-2 outline-none text-sm resize-none
                   focus:border-yellow-400 transition"
      />
      <label
        className="absolute left-4 top-2 text-xs text-gray-400
                   peer-placeholder-shown:top-4
                   peer-placeholder-shown:text-sm
                   peer-placeholder-shown:text-gray-500
                   peer-focus:top-2 peer-focus:text-xs peer-focus:text-yellow-400
                   transition-all"
      >
        {label}
      </label>
    </div>
  );
}
