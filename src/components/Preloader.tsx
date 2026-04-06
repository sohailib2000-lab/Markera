"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(intervalRef.current!);
          setTimeout(() => setDone(true), 300);
          return 100;
        }
        return p + Math.random() * 14 + 4;
      });
    }, 100);
    return () => clearInterval(intervalRef.current!);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          id="preloader"
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.h1
            className="font-display text-4xl md:text-6xl font-light tracking-tight text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Mark<span style={{ color: "var(--gold)" }}>era</span>
          </motion.h1>
          <div className="loader-bar">
            <div
              className="loader-progress"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <p
            className="text-[10px] tracking-[0.3em] uppercase"
            style={{ color: "var(--text-subtle)", fontFamily: "Outfit, sans-serif" }}
          >
            Make your Mark
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
