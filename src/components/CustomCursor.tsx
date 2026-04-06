"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue, useVelocity, useAnimationFrame } from "framer-motion";

export default function CustomCursor() {
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  // ── Snappy ring spring (imascending style) ──
  const ringX = useSpring(dotX, { stiffness: 250, damping: 20, mass: 0.1 });
  const ringY = useSpring(dotY, { stiffness: 250, damping: 20, mass: 0.1 });

  const ringVelX = useVelocity(ringX);
  const ringVelY = useVelocity(ringY);

  const scaleX = useMotionValue(1);
  const scaleY = useMotionValue(1);
  const rotate = useMotionValue(0);

  const [isHovering, setIsHovering] = useState(false);

  useAnimationFrame(() => {
    const vx = ringVelX.get();
    const vy = ringVelY.get();
    const speed = Math.sqrt(vx * vx + vy * vy);
    
    // Scale amount (velocity is pixels/sec, scaled down to match logical amount)
    const stretch = 1 + Math.min(speed * 0.0003, 0.5);
    scaleX.set(stretch);
    scaleY.set(1 / stretch);
    
    if (speed > 5) {
      const angle = Math.atan2(vy, vx) * (180 / Math.PI);
      rotate.set(angle);
    }
  });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
    };

    const enterInteractive = () => setIsHovering(true);
    const leaveInteractive = () => setIsHovering(false);

    window.addEventListener("mousemove", move);

    const interactives = document.querySelectorAll("a, button, [role='button'], input, textarea");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", enterInteractive);
      el.addEventListener("mouseleave", leaveInteractive);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", enterInteractive);
        el.removeEventListener("mouseleave", leaveInteractive);
      });
    };
  }, [dotX, dotY]);

  // If hovering, we expand the ring and fade out the dot
  return (
    <>
      {/* Dot */}
      <motion.div
        style={{ x: dotX, y: dotY }}
        animate={{ opacity: isHovering ? 0 : 1, scale: isHovering ? 0 : 1 }}
        transition={{ duration: 0.2 }}
        className="fixed top-0 left-0 w-[8px] h-[8px] bg-[#c9a87c] rounded-full pointer-events-none z-[10001] mix-blend-difference -translate-x-1/2 -translate-y-1/2"
      />
      
      {/* Ring */}
      <motion.div
        style={{ 
          x: ringX, 
          y: ringY, 
          scaleX, 
          scaleY, 
          rotate,
        }}
        animate={{
          width: isHovering ? 80 : 40,
          height: isHovering ? 80 : 40,
          backgroundColor: isHovering ? "rgba(201, 168, 124, 0.1)" : "transparent",
          borderColor: isHovering ? "transparent" : "rgba(201, 168, 124, 0.8)",
        }}
        transition={{
          width: { duration: 0.3 },
          height: { duration: 0.3 },
          backgroundColor: { duration: 0.3 },
          borderColor: { duration: 0.3 }
        }}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[10000] mix-blend-difference border origin-center -translate-x-1/2 -translate-y-1/2"
      />
    </>
  );
}
