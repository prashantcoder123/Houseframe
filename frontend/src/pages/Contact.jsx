import { motion } from "framer-motion";

const corporateDetails = [
  { label: "Company Name", value: "HOUSEFRAME DESIGNING PRIVATE LIMITED", icon: "🏢" },
  { label: "CIN (Corporate Identification Number)", value: "U43299BR2025PTC075956", icon: "🆔" },
  // { label: "Date of Incorporation", value: "10-05-2025", icon: "📅" },
  // { label: "Registration Number", value: "075956", icon: "🔢" },
  //{ label: "Company Category", value: "Company limited by shares", icon: "📊" },
  //{ label: "Company SubCategory", value: "Non-government company", icon: "🏛️" },
  { label: "Class of Company", value: "Private", icon: "👥" },
  // { label: "Authorised Capital", value: "₹5,00,000", icon: "💰" },
  // { label: "Paid up Capital", value: "₹10,000", icon: "💳" },
  { label: "Official Email ID", value: "hoseframe150@gmail.com", icon: "✉️", link: "mailto:hoseframe150@gmail.com" },
  { label: "Registered Address", value: "Plot No- 321, Gautam Nagar, Mastipur, Bodhgaya, Gaya, Bihar - 824231, India", icon: "📍", colSpan: true },
];

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
            href="https://wa.me/7033822316"
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

      {/* CORPORATE REGISTRATION DETAILS */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto mt-20"
      >
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
          {/* Subtle Glow */}
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-6 mb-8 gap-4">
            <div>
              <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2 text-white">
                <span className="text-yellow-400">🏛️</span> Corporate Registration Details
              </h2>
              <p className="text-gray-400 text-xs md:text-sm mt-1">
                Official Ministry of Corporate Affairs (MCA) verification details
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 text-xs rounded-full bg-green-500/25 text-green-400 border border-green-500/30 font-semibold tracking-wide flex items-center gap-1.5 animate-pulse">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                Active (RoC-Patna)
              </span>
              <span className="text-[10px] md:text-xs text-gray-500 bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
                Last Updated: 05-09-2025
              </span>
            </div>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {corporateDetails.map((detail, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -3, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                className={`bg-white/[0.02] border border-white/5 rounded-2xl p-5 transition-all duration-300 ${detail.colSpan ? "md:col-span-2 lg:col-span-3" : ""
                  }`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-2xl p-2.5 rounded-xl bg-white/5 text-yellow-400 border border-white/10 flex-shrink-0">
                    {detail.icon}
                  </div>
                  <div className="space-y-1 min-w-0">
                    <span className="text-[11px] font-semibold tracking-wider text-gray-500 uppercase block">
                      {detail.label}
                    </span>
                    {detail.link ? (
                      <a
                        href={detail.link}
                        className="text-yellow-400 hover:text-yellow-300 font-medium text-sm md:text-base break-words transition-colors flex items-center gap-1"
                      >
                        {detail.value}
                        <span className="text-xs">↗</span>
                      </a>
                    ) : (
                      <span className="text-gray-200 font-medium text-sm md:text-base break-words block">
                        {detail.value}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
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
