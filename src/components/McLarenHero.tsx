"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import dynamic from "next/dynamic";

const Car3D = dynamic(() => import("./Car3D").then((mod) => mod.Car3D), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative">
        <div className="w-20 h-20 border-2 border-[#ff6600]/20 rounded-full" />
        <div className="absolute inset-0 w-20 h-20 border-2 border-transparent border-t-[#ff6600] rounded-full animate-spin" />
      </div>
    </div>
  ),
});

export function McLarenHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollValue, setScrollValue] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollValue(latest);
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const statsOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      <div className="fixed inset-0 h-screen overflow-hidden bg-black">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,102,0,0.08)_0%,transparent_60%)]" />
          
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#ff6600]/5 rounded-full blur-[150px] animate-pulse-glow" />
          <div
            className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-[#ff6600]/5 rounded-full blur-[120px] animate-pulse-glow"
            style={{ animationDelay: "1.5s" }}
          />

          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full">
              <defs>
                <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                  <path
                    d="M 80 0 L 0 0 0 80"
                    fill="none"
                    stroke="rgba(255,102,0,0.15)"
                    strokeWidth="0.5"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
        </div>

        <nav className="absolute top-0 left-0 right-0 z-50 px-6 md:px-12 py-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 relative">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path
                    d="M50 5 L95 50 L50 95 L5 50 Z"
                    fill="none"
                    stroke="#ff6600"
                    strokeWidth="2"
                  />
                  <text
                    x="50"
                    y="58"
                    textAnchor="middle"
                    fill="#ff6600"
                    className="font-orbitron text-2xl font-bold"
                  >
                    M
                  </text>
                </svg>
              </div>
              <span className="font-orbitron text-xl md:text-2xl font-bold tracking-wider text-white">
                McLAREN
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="hidden lg:flex items-center gap-10"
            >
              {["Models", "Racing", "Experience", "Heritage", "Configure"].map((item, i) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="font-rajdhani text-sm font-medium tracking-[0.2em] text-zinc-400 hover:text-[#ff6600] transition-all duration-300 uppercase relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#ff6600] transition-all duration-300 group-hover:w-full" />
                </motion.a>
              ))}
            </motion.div>

            <motion.button
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass-strong px-5 md:px-8 py-2.5 md:py-3 rounded-full font-rajdhani font-semibold text-xs md:text-sm tracking-[0.15em] uppercase text-white hover:bg-[#ff6600] hover:text-black transition-all duration-500"
            >
              Book Test Drive
            </motion.button>
          </div>
        </nav>

        <div className="absolute inset-0 z-10">
          <div className="w-full h-full">
            <Car3D scrollProgress={scrollValue} />
          </div>
        </div>

        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="absolute top-20 md:top-28 left-0 right-0 z-20 pointer-events-none"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="inline-block"
            >
              <p className="font-rajdhani text-xs md:text-sm tracking-[0.5em] text-[#ff6600] uppercase mb-3 flex items-center gap-2">
                <span className="w-8 h-px bg-[#ff6600]" />
                Redefining Performance
              </p>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="font-orbitron text-5xl md:text-8xl lg:text-9xl font-black tracking-tight leading-none"
            >
              <span className="text-gradient-orange block">ARTURA</span>
              <span className="font-orbitron text-2xl md:text-4xl lg:text-5xl font-light tracking-[0.4em] text-zinc-600 block mt-2 ml-1">
                SPIDER
              </span>
            </motion.h1>
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: statsOpacity }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-24 md:bottom-28 left-0 right-0 z-20 pointer-events-none"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-wrap justify-center md:justify-start gap-8 md:gap-12">
            {[
              { value: "700", unit: "PS", label: "Power" },
              { value: "3.0", unit: "s", label: "0-100" },
              { value: "330", unit: "km/h", label: "Top Speed" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 + i * 0.15 }}
                className="relative group"
              >
                <div className="flex items-baseline gap-1">
                  <span className="font-orbitron text-3xl md:text-5xl font-bold text-white group-hover:text-[#ff6600] transition-colors duration-300">
                    {stat.value}
                  </span>
                  <span className="font-rajdhani text-sm md:text-base text-[#ff6600]/80">
                    {stat.unit}
                  </span>
                </div>
                <p className="font-rajdhani text-[9px] md:text-[10px] tracking-[0.3em] text-zinc-500 uppercase mt-1">
                  {stat.label}
                </p>
                <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-0.5 h-0 bg-[#ff6600] group-hover:h-full transition-all duration-300" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        >
          <div className="flex flex-col items-center gap-3 text-zinc-500">
            <span className="font-rajdhani text-[10px] md:text-xs tracking-[0.3em] uppercase">
              Scroll to Explore
            </span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-5 h-8 md:w-6 md:h-10 border border-zinc-700 rounded-full flex justify-center pt-2"
            >
              <motion.div
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-1 h-1 md:w-1.5 md:h-1.5 bg-[#ff6600] rounded-full"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
