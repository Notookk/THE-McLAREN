"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const models = [
  {
    name: "Artura Spider",
    image: "https://images.unsplash.com/photo-1621135802920-133df287f89c?w=800&q=80",
    power: "700 PS",
    acceleration: "3.0s",
    price: "From $265,000",
    type: "Hybrid Supercar",
    color: "#ff6600",
  },
  {
    name: "750S",
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80",
    power: "750 PS",
    acceleration: "2.8s",
    price: "From $324,000",
    type: "Supercar",
    color: "#00ccff",
  },
  {
    name: "765LT",
    image: "https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=800&q=80",
    power: "765 PS",
    acceleration: "2.8s",
    price: "From $358,000",
    type: "Longtail",
    color: "#ff3366",
  },
];

function ModelCard({ model, index }: { model: typeof models[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 80, rotateX: 15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group perspective-1000"
    >
      <div
        className="relative rounded-3xl overflow-hidden transition-all duration-700 group-hover:scale-[1.02]"
        style={{
          background: `linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.8) 100%)`,
          boxShadow: `0 25px 50px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)`,
        }}
      >
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${model.color}15 0%, transparent 60%)`,
          }}
        />

        <div className="aspect-[4/3] relative overflow-hidden">
          <motion.img
            src={model.image}
            alt={model.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.7 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

          <div className="absolute top-4 left-4">
            <span
              className="px-4 py-1.5 rounded-full font-rajdhani text-xs tracking-[0.15em] uppercase backdrop-blur-md"
              style={{
                background: `${model.color}20`,
                border: `1px solid ${model.color}40`,
                color: model.color,
              }}
            >
              {model.type}
            </span>
          </div>

          <div
            className="absolute bottom-4 right-4 w-12 h-12 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-100 scale-75"
            style={{ background: model.color }}
          >
            <svg
              className="w-5 h-5 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <h3 className="font-orbitron text-2xl md:text-3xl font-bold text-white mb-6 tracking-tight">
            {model.name}
          </h3>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div>
              <p className="font-rajdhani text-[10px] tracking-[0.2em] text-zinc-500 uppercase mb-1">
                Power
              </p>
              <p className="font-orbitron text-xl font-semibold" style={{ color: model.color }}>
                {model.power}
              </p>
            </div>
            <div>
              <p className="font-rajdhani text-[10px] tracking-[0.2em] text-zinc-500 uppercase mb-1">
                0-100 km/h
              </p>
              <p className="font-orbitron text-xl font-semibold text-white">{model.acceleration}</p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-white/10">
            <p className="font-rajdhani text-sm text-zinc-400">{model.price}</p>
            <button
              className="font-rajdhani text-sm font-semibold tracking-[0.15em] uppercase transition-colors duration-300"
              style={{ color: model.color }}
            >
              Configure →
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ModelsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section ref={containerRef} id="models" className="relative py-32 md:py-40 bg-black overflow-hidden">
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,102,0,0.03)_0%,transparent_50%)]"
      />

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div ref={titleRef} className="text-center mb-20 md:mb-24">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="font-rajdhani text-xs tracking-[0.5em] text-[#ff6600] uppercase mb-4"
          >
            The Lineup
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-orbitron text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
          >
            CHOOSE YOUR
          </motion.h2>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-orbitron text-4xl md:text-6xl lg:text-7xl font-bold text-gradient-orange leading-tight"
          >
            WEAPON
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {models.map((model, i) => (
            <ModelCard key={model.name} model={model} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
