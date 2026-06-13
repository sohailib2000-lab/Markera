"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function PhilosophySection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="philosophy" className="relative z-10 flex items-center justify-center text-center overflow-hidden"
      style={{ padding: "clamp(5rem, 12vw, 12rem) 1.5rem" }}>
      {/* Ambient glow */}
      <div className="absolute bottom-0 right-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)" }} />

      <div className="mx-auto" ref={ref} style={{ maxWidth: "800px" }}>
        <motion.div
          className="section-label"
          initial={{ opacity: 0, y: 14 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Our Philosophy
        </motion.div>
        <motion.p
          className="font-display font-light text-white leading-[1.15] tracking-tight"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Every creator has a mark to make. Every brand has a story worth telling. We bring them together not for noise, but for <span style={{ color: "var(--gold)", fontStyle: "italic" }}>lasting impact.</span>
        </motion.p>
      </div>
    </section>
  );
}
