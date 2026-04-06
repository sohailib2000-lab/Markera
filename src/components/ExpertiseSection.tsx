"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import GlassCard from "./GlassCard";
import { Search, PenTool, BarChart3 } from "lucide-react";

const expertise = [
  {
    num: "01",
    icon: Search,
    title: "Creator Discovery",
    body: "We identify and thoroughly vet influencers and content creators who align with your brand values, ensuring authentic partnerships.",
  },
  {
    num: "02",
    icon: PenTool,
    title: "Campaign Strategy",
    body: "From concept to execution, we manage every aspect of your influencer campaigns with meticulous attention to detail.",
  },
  {
    num: "03",
    icon: BarChart3,
    title: "Analytics & Results",
    body: "Comprehensive performance tracking and insightful reporting help you understand campaign impact and guide future strategy.",
  },
];

export default function ExpertiseSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="expertise" className="relative z-10" style={{ padding: "8rem 1.5rem" }}>
      <div className="absolute top-0 left-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(201,168,124,0.04) 0%, transparent 70%)" }} />

      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div ref={ref} className="text-center mb-20 flex flex-col justify-center items-center">
          <motion.div
            className="section-label uppercase tracking-[0.25em] text-[10px]"
            style={{ color: "var(--gold)", fontFamily: "Outfit, sans-serif" }}
            initial={{ opacity: 0, y: 14 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Capabilities
          </motion.div>
          <motion.h2
            className="font-display text-white mt-4"
            style={{ fontSize: "clamp(3.5rem, 6vw, 5rem)", fontWeight: 700, letterSpacing: "-0.02em" }}
            initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Expertise.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {expertise.map((item, i) => (
            <GlassCard key={item.title} delay={i * 0.12} className="relative p-10 flex flex-col justify-start overflow-hidden" 
              style={{ 
                minHeight: "440px", 
                borderRadius: "24px",
                background: "transparent",
                backdropFilter: "none",
                WebkitBackdropFilter: "none",
                border: "1px solid rgba(255,255,255,0.05)"
              }}>
              
              {/* Background number - top right */}
              <div 
                className="absolute pointer-events-none select-none"
                style={{ 
                  top: "-0.5rem",
                  right: "-0.5rem",
                  fontFamily: "Outfit, sans-serif",
                  fontSize: "14rem",
                  fontWeight: 800,
                  lineHeight: 1,
                  color: "transparent",
                  WebkitTextStroke: "1px rgba(255,255,255,0.06)",
                  zIndex: 0
                }}
              >
                {item.num}
              </div>

              {/* Icon */}
              <div 
                className="relative z-10 flex items-center justify-center rounded-full"
                style={{ width: "52px", height: "52px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)" }}
              >
                <item.icon size={20} color="rgba(255,255,255,0.8)" strokeWidth={1.5} />
              </div>

              {/* Title + Body */}
              <div className="relative z-10" style={{ marginTop: "1.75rem" }}>
                <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "DM Sans, sans-serif", letterSpacing: "-0.01em" }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "DM Sans, sans-serif" }}>
                  {item.body}
                </p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
