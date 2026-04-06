"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import GlassCard from "./GlassCard";

const values = [
  {
    num: "01",
    title: "Niche Expertise",
    body: "Deep understanding of the creator landscape, ensuring authentic connections with engaged audiences who trust creator recommendations.",
  },
  {
    num: "02",
    title: "Authentic Partnerships",
    body: "We craft strategic partnerships that boost both earnings and engagement, leveraging data and a vast network to maximise impact.",
  },
  {
    num: "03",
    title: "Strategic Approach",
    body: "Every campaign is backed by thorough research, strategic planning, and continuous optimisation to maximise your investment.",
  },
];

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="relative z-10 py-36 px-6 md:px-14" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      {/* Glow blob */}
      <div className="absolute top-0 left-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(201,168,124,0.04) 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={ref} className="text-center mb-20">
          <motion.div
            className="section-label"
            initial={{ opacity: 0, y: 14 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Why Markera
          </motion.div>
          <motion.h2
            className="font-display font-light text-white leading-[1.08] tracking-tight"
            style={{ fontSize: "clamp(2.4rem, 6vw, 5.5rem)" }}
            initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            A Clear Path to <span style={{ color: "var(--gold)", fontStyle: "italic" }}>Success</span>
          </motion.h2>
          <motion.p
            className="mt-6 max-w-xl mx-auto text-base leading-relaxed"
            style={{ color: "var(--text-muted)" }}
            initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            We help brands find and work with the right creators. Simple, honest partnerships that actually move the needle.
          </motion.p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <GlassCard key={v.num} delay={i * 0.12} className="p-10">
              <div
                className="text-5xl font-display font-light mb-8 leading-none"
                style={{ color: "var(--gold)" }}
              >
                {v.num}
              </div>
              <h3 className="text-xl font-medium text-white mb-4" style={{ fontFamily: "DM Sans, sans-serif" }}>
                {v.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)", fontFamily: "DM Sans, sans-serif" }}>
                {v.body}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
