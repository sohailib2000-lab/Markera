"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import GlassCard from "./GlassCard";

const features = [
  { icon: "◈", title: "Fair Compensation", body: "Receive competitive rates that reflect your value and reach - no undercutting, ever." },
  { icon: "◇", title: "Creative Freedom", body: "Maintain your authentic voice while working with brands that truly align with your values." },
  { icon: "△", title: "Growth Opportunities", body: "Access exclusive partnerships and resources that push your career to the next level." },
  { icon: "○", title: "Dedicated Support", body: "Work with a team that deeply understands your niche, audience, and creative mission." },
];

export default function CreatorsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="creators" className="relative z-10 py-36 px-6 md:px-14">
      {/* Ambient glow */}
      <div className="absolute bottom-0 right-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="text-center mb-20">
          <motion.div className="section-label"
            initial={{ opacity: 0, y: 14 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}>
            For Creators
          </motion.div>
          <motion.h2
            className="font-display font-light text-white leading-[1.08] tracking-tight"
            style={{ fontSize: "clamp(2.4rem, 6vw, 5.5rem)" }}
            initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}>
            More time for what you <span style={{ color: "var(--gold)", fontStyle: "italic" }}>do best</span>
          </motion.h2>
          <motion.p className="mt-6 max-w-lg mx-auto text-base leading-relaxed"
            style={{ color: "var(--text-muted)" }}
            initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}>
            Join Markera&apos;s network and connect with brands that value your creative vision and engaged community.
          </motion.p>
          <motion.div className="mt-10"
            initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}>
            <a href="#contact" className="aura-btn" onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}>
              Apply Now
            </a>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <GlassCard key={f.title} delay={i * 0.1} className="p-8 text-center">
              <div className="text-3xl mb-5" style={{ color: "var(--gold)" }}>{f.icon}</div>
              <h4 className="text-base font-medium text-white mb-3" style={{ fontFamily: "DM Sans, sans-serif" }}>
                {f.title}
              </h4>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)", fontFamily: "DM Sans, sans-serif" }}>
                {f.body}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
