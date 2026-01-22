"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const specs = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <path
          d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Twin-Turbo V6",
    value: "2,993cc",
    description: "Hybrid powertrain delivering instant torque",
    gradient: "from-[#ff6600] to-[#ff9933]",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "0-100 km/h",
    value: "3.0s",
    description: "Blistering acceleration from standstill",
    gradient: "from-[#00ccff] to-[#0099ff]",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <path
          d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    ),
    title: "Dry Weight",
    value: "1,457kg",
    description: "Carbon fiber construction throughout",
    gradient: "from-[#ff3366] to-[#ff6699]",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <path
          d="M22 12h-4l-3 9L9 3l-3 9H2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Top Speed",
    value: "330 km/h",
    description: "Aerodynamically optimized for speed",
    gradient: "from-[#9933ff] to-[#cc66ff]",
  },
];

function SpecCard({
  spec,
  index,
}: {
  spec: (typeof specs)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative"
    >
      <div className="relative p-8 md:p-10 rounded-3xl h-full overflow-hidden bg-gradient-to-br from-white/[0.03] to-transparent border border-white/[0.05] backdrop-blur-sm transition-all duration-500 group-hover:border-white/10">
        <div
          className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br ${spec.gradient}`}
          style={{ opacity: 0.03 }}
        />

        <div className="absolute top-0 right-0 w-32 h-32 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
          <div className={`w-full h-full bg-gradient-to-br ${spec.gradient} rounded-full blur-3xl`} />
        </div>

        <motion.div
          className={`mb-6 text-transparent bg-clip-text bg-gradient-to-br ${spec.gradient}`}
          style={{ WebkitTextFillColor: "transparent" }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.3 }}
        >
          <div className={`bg-gradient-to-br ${spec.gradient} bg-clip-text`} style={{ color: "transparent" }}>
            {spec.icon}
          </div>
        </motion.div>

        <p className="font-rajdhani text-[10px] tracking-[0.25em] text-zinc-500 uppercase mb-2">
          {spec.title}
        </p>

        <p className={`font-orbitron text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r ${spec.gradient} bg-clip-text text-transparent`}>
          {spec.value}
        </p>

        <p className="font-rajdhani text-sm text-zinc-500 leading-relaxed">
          {spec.description}
        </p>

        <div
          className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${spec.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
        />
      </div>
    </motion.div>
  );
}

export function SpecsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-100px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" });

  return (
    <section ref={containerRef} className="relative py-32 md:py-40 bg-black overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,102,0,0.05)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,204,255,0.03)_0%,transparent_50%)]" />
      </div>

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div ref={titleRef} className="mb-20 md:mb-24">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="font-rajdhani text-xs tracking-[0.5em] text-[#ff6600] uppercase mb-4"
          >
            Engineering Excellence
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-orbitron text-4xl md:text-6xl lg:text-7xl font-bold text-white max-w-3xl leading-tight"
          >
            BORN ON THE{" "}
            <span className="text-gradient-orange">TRACK</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {specs.map((spec, i) => (
            <SpecCard key={spec.title} spec={spec} index={i} />
          ))}
        </div>

        <motion.div
          ref={ctaRef}
          initial={{ opacity: 0, y: 60 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mt-24 md:mt-32 rounded-[2rem] p-10 md:p-14 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(255,102,0,0.1) 0%, rgba(0,0,0,0.8) 100%)",
            border: "1px solid rgba(255,102,0,0.2)",
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,102,0,0.15)_0%,transparent_50%)]" />
          
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#ff6600]/5 rounded-full blur-[100px]" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="text-center lg:text-left">
              <h3 className="font-orbitron text-3xl md:text-4xl font-bold text-white mb-3">
                Experience the Extraordinary
              </h3>
              <p className="font-rajdhani text-lg text-zinc-400 max-w-xl">
                Book your exclusive test drive and feel the power of McLaren engineering firsthand.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group px-10 py-4 rounded-full font-rajdhani font-bold text-sm tracking-[0.2em] uppercase text-black overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#ff6600] to-[#ff9933] transition-opacity duration-300" />
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 whitespace-nowrap">Schedule Test Drive</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
