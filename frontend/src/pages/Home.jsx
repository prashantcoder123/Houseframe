import { motion } from "framer-motion";
import Testimonials from "../components/ui/Testimonials";

import About from "./About";
import Services from "./Services";
import Projects from "./Projects";
import Contact from "./Contact";
import Stats from "../components/ui/Stats";

export default function Home() {
  return (
    <>
      {/* ================= PREMIUM HERO ================= */}
      <section className="relative overflow-hidden px-6 md:px-20 py-28">
        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-blue-500/10 blur-3xl"></div>

        <div className="relative grid md:grid-cols-2 gap-16 items-center">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="space-y-6"
          >
            <span className="inline-block px-4 py-1 text-xs rounded-full bg-yellow-400/20 text-yellow-300 tracking-wide">
              Trusted Construction Partner
            </span>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Building Smart <br />
              <span className="text-yellow-400">Future Spaces</span>
            </h1>

            <p className="text-gray-300 max-w-lg">
              HouseFrame delivers premium residential, commercial and government
              infrastructure projects with innovation, precision and trust.
            </p>

            {/* CTA BUTTONS */}
            <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              {/* EXPLORE PROJECTS */}
              <button
                onClick={() => {
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-6 py-3 bg-yellow-500 text-black rounded-lg font-semibold hover:scale-105 transition shadow-lg"
              >
                🚀 Explore Projects
              </button>

              {/* FREE CONSULTATION */}
              <a
                href="https://wa.me/7367055728?text=Hello%20HouseFrame,%20I%20want%20free%20consultation%20for%20construction."
                target="_blank"
                className="px-6 py-3 border border-white/30 rounded-lg hover:bg-white/10 hover:scale-105 transition text-center"
              >
                💬 Get Free Consultation
              </a>
            </div>

            {/* TRUST METRICS */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              {[
                { label: "Projects", value: "120+" },
                { label: "Happy Clients", value: "300+" },
                { label: "Years Experience", value: "8+" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 text-center backdrop-blur hover:scale-105 transition"
                >
                  <p className="text-2xl font-bold text-yellow-400">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT FLOATING IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2 }}
            whileHover={{ rotateY: 12, rotateX: -12, scale: 1.05 }}
            className="relative perspective-1000"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600"
                alt="Modern House"
                className="object-cover w-full h-[320px] md:h-[520px]"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent"></div>
            </div>

            {/* Floating Glass Badge */}
            <div className="absolute -bottom-6 left-6 bg-white/10 backdrop-blur-xl px-5 py-3 rounded-xl border border-white/20 shadow-xl">
              🏗️ Premium Architecture
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section id="about">
        <About />
      </section>

      {/* ================= SERVICES ================= */}
      <section id="services">
        <Services />
      </section>

      {/* ================= PROJECTS ================= */}
      <section id="projects">
        <Projects />
      </section>

      {/* ================= CONTACT ================= */}
      <section id="contact">
        <Contact />
      </section>
      <section id="testimonials">
        <Testimonials />
      </section>
      <section id="stats">
       <Stats />
      </section>
    </>
  );
}
