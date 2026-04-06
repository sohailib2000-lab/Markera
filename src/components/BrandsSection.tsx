"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import GlassCard from "./GlassCard";

const services = [
  {
    num: "01",
    title: "Creator Discovery",
    body: "We identify and thoroughly vet influencers and content creators who align with your brand values, ensuring authentic partnerships.",
    items: ["Audience analysis", "Engagement verification", "Brand alignment assessment"],
  },
  {
    num: "02",
    title: "Campaign Strategy",
    body: "From concept to execution, we manage every aspect of your influencer campaigns with meticulous attention to detail.",
    items: ["Strategic planning", "Content coordination", "Timeline management"],
  },
  {
    num: "03",
    title: "Analytics & Optimisation",
    body: "Comprehensive performance tracking and insightful reporting to understand campaign impact and guide future strategy.",
    items: ["Performance metrics", "ROI tracking", "Strategic recommendations"],
  },
];

export default function BrandsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="relative z-10 py-36 px-6 md:px-14">
      <div className="absolute top-[-5%] left-[30%] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(201,168,124,0.03) 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="text-center mb-20">
          <motion.div className="section-label"
            initial={{ opacity: 0, y: 14 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}>
            For Brands
          </motion.div>
          <motion.h2
            className="font-display font-light text-white leading-[1.08] tracking-tight"
            style={{ fontSize: "clamp(2.4rem, 6vw, 5.5rem)" }}
            initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}>
            Transform Your <span style={{ color: "var(--gold)", fontStyle: "italic" }}>Reach</span>
          </motion.h2>
          <motion.p className="mt-6 max-w-xl mx-auto text-base leading-relaxed"
            style={{ color: "var(--text-muted)" }}
            initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}>
            Comprehensive influencer marketing solutions designed to elevate your brand through powerful creator partnerships.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <GlassCard key={s.num} delay={i * 0.12} className="p-10">
              <div className="text-xs tracking-[0.2em] uppercase mb-8" style={{ color: "var(--text-subtle)", fontFamily: "Outfit, sans-serif" }}>
                {s.num}
              </div>
              <h3 className="text-xl font-medium text-white mb-4" style={{ fontFamily: "DM Sans, sans-serif" }}>
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed mb-8" style={{ color: "var(--text-muted)", fontFamily: "DM Sans, sans-serif" }}>
                {s.body}
              </p>
              <ul className="space-y-3">
                {s.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-xs"
                    style={{ color: "var(--text-muted)", fontFamily: "DM Sans, sans-serif", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "0.75rem" }}>
                    <span style={{ color: "var(--gold)", flexShrink: 0 }}>-</span>
                    {item}
                  </li>
                ))}
              </ul>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
