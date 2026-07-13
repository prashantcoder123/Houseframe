import { motion } from "framer-motion";

const features = [
  {
    title: "Quality Construction",
    icon: "🏗️",
    desc: "Premium materials, skilled workforce and strict quality control.",
  },
  {
    title: "Smart Design",
    icon: "📐",
    desc: "2D / 3D design, vastu planning and modern architecture.",
  },
  {
    title: "Trusted Delivery",
    icon: "🤝",
    desc: "On-time delivery and transparent project execution.",
  },
  {
    title: "Government Projects",
    icon: "🚰",
    desc: "Pipeline survey, DPR preparation and PHED norm compliance.",
  },
];

export default function About() {
  return (
    <section className="px-4 md:px-12 py-20">

      {/* TITLE */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl md:text-5xl font-bold mb-6 text-center md:text-left"
      >
        About HouseFrame
      </motion.h1>

      {/* DESCRIPTION */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-gray-300 max-w-4xl leading-relaxed text-sm md:text-base mb-12"
      >
        HouseFrame Design & Construction Pvt. Ltd is a professional construction and design company delivering modern residential, commercial and government infrastructure projects. We specialize in architectural planning, structural execution, interior design and government pipeline projects like Nal Jal Yojana.
      </motion.p>

      {/* GRID */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {features.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{
              rotateX: 6,
              rotateY: -6,
              scale: 1.05,
            }}
            transition={{ type: "spring", stiffness: 200 }}
            className="relative group bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6 cursor-pointer hover:border-yellow-400 hover:shadow-xl hover:shadow-yellow-500/20"
          >
            {/* Glow */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-yellow-500/10 to-transparent pointer-events-none" />

            <div className="relative z-10">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-300">
                {item.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* FOUNDER & CEO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="mt-24 bg-slate-900/35 border border-white/10 rounded-3xl p-8 md:p-12 max-w-5xl mx-auto backdrop-blur-md relative overflow-hidden"
      >
        {/* Glow */}
        <div className="absolute top-[-100px] right-[-100px] w-[300px] h-[300px] bg-yellow-500/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
          {/* IMAGE */}
          <div className="w-48 h-48 md:w-60 md:h-60 rounded-2xl overflow-hidden border border-yellow-400/35 shadow-lg shadow-yellow-500/5 flex-shrink-0 relative group">
            <img 
              src="/founder.png" 
              alt="Sachin Kumar - Founder & CEO" 
              className="w-full h-full object-cover object-top transition duration-500 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end justify-center pb-4">
              <span className="text-[10px] text-yellow-400 font-bold uppercase tracking-widest">Sachin Kumar</span>
            </div>
          </div>

          {/* TEXT CONTENT */}
          <div className="space-y-4 text-center md:text-left flex-1">
            <span className="px-3 py-1 text-[10px] rounded-full bg-yellow-400/20 text-yellow-300 font-bold tracking-wider uppercase">
              Leadership
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              Sachin Kumar
            </h2>
            <p className="text-sm font-semibold text-yellow-400 uppercase tracking-wider">
              Founder & CEO, Houseframe
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">
              Under Sachin Kumar's leadership, HouseFrame Design & Construction Pvt. Ltd. has integrated modern architectural design, vastu compliance, and real-time 3D simulation tools to make premium building planning accessible and transparent across India. He directs the strategic expansion and engineering execution of residential, commercial, and public infrastructure projects.
            </p>
          </div>
        </div>
      </motion.div>

      {/* OPTIONAL 3D EMBED */}
      {/* <div className="mt-20 flex justify-center">
        <iframe
          title="3d-model"
          src="https://sketchfab.com/models/5d94f3c04f5a4d33a19b1c99945d88ab/embed"
          className="w-full max-w-4xl h-[320px] md:h-[420px] rounded-xl border border-white/10"
          allow="autoplay; fullscreen; xr-spatial-tracking"
        ></iframe>
      </div> */}

    </section>
  );
}
