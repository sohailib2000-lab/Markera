"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

export default function HeroSection() {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 z-10"
      style={{ paddingTop: "80px", paddingBottom: "80px" }}
    >
      {/* Subtle radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201,168,124,0.04) 0%, transparent 70%)",
        }}
      />

      {/* Tagline above brand */}
      <motion.div
        className="uppercase tracking-[0.3em] font-semibold"
        style={{ fontSize: "0.65rem", color: "var(--gold)", fontFamily: "Outfit, sans-serif", marginBottom: "1.5rem" }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.05 }}
      >
        Partnerships that last
      </motion.div>

      {/* Main Brand Heading */}
      <h1 className="relative font-display tracking-tight text-white" style={{ fontSize: "clamp(4rem, 12vw, 9rem)", fontWeight: 800 }}>
        <motion.span
          className="block"
          initial={{ opacity: 0, filter: "blur(20px)", scale: 0.95 }}
          animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
          transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ textShadow: "0 0 80px rgba(201,168,124,0.3)" }}
        >
          Mark<span style={{ color: "var(--gold)" }}>era</span>
        </motion.span>
      </h1>

      {/* Subtitle */}
      <motion.p
        className="max-w-2xl text-base md:text-lg leading-relaxed font-light"
        style={{ color: "rgba(255,255,255,0.7)", fontFamily: "DM Sans, sans-serif", marginTop: "2rem" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        We help forward-thinking brands and authentic creators grow together.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        style={{ marginTop: "4rem" }}
      >
        <button 
          onClick={() => scrollTo("#contact")} 
          className="relative uppercase tracking-[0.25em] text-[10px] sm:text-[11px] font-semibold transition-all duration-300 overflow-hidden group"
          style={{ 
            padding: "20px 50px",
            borderRadius: "9999px",
            color: "white",
            fontFamily: "Outfit, sans-serif",
            border: "1px solid rgba(201,168,124,0.3)",
            background: "rgba(0,0,0,0.2)",
            boxShadow: "0 0 25px rgba(201,168,124,0.15) inset, 0 0 15px rgba(201,168,124,0.1)"
          }}
        >
          {/* Hover glow orb */}
          <div className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
             style={{ background: "radial-gradient(circle at center, rgba(201,168,124,0.4) 0%, transparent 70%)" }} />
          <span className="relative z-10">Make your Mark</span>
        </button>
      </motion.div>

      {/* Pill Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="absolute bottom-12 flex flex-col items-center cursor-pointer"
        onClick={() => scrollTo("#expertise")}
      >
        <div 
          className="rounded-full flex justify-center relative border transition-colors duration-300 hover:border-white"
          style={{ width: "26px", height: "42px", borderColor: "rgba(255,255,255,0.2)" }}
        >
          <motion.div
            className="rounded-full bg-white absolute top-2 w-[4px] h-[4px]"
            animate={{ 
              y: [0, 16, 0], 
              opacity: [1, 0.2, 1] 
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
        </div>
      </motion.div>

    </section>
  );
}
