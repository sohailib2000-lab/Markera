"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "#expertise", label: "Expertise" },
    { href: "#philosophy", label: "Philosophy" },
    { href: "#contact", label: "Make your Mark" },
  ];

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          padding: scrolled ? "1rem 0" : "2.5rem 0",
          background: scrolled ? "rgba(0,0,0,0.5)" : "transparent",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "1px solid transparent",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 1.5rem", width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="z-50 inline-block"
          >
            <img src="/logo.png" alt="Markera" style={{ height: "32px", width: "auto" }} />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex" style={{ gap: "3.5rem" }}>
            {links.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="text-xs font-semibold tracking-[0.15em] uppercase transition-all duration-300 bg-transparent border-0 p-0 hover:text-white"
                style={{ color: "rgba(255,255,255,0.6)", fontFamily: "Outfit, sans-serif" }}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden z-50 flex flex-col gap-[5px] bg-transparent border-0 p-0"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block w-6 h-[1.5px] bg-white transition-all duration-300"
                style={{
                  transform:
                    menuOpen && i === 0
                      ? "rotate(45deg) translate(5px, 5px)"
                      : menuOpen && i === 1
                      ? "scaleX(0)"
                      : menuOpen && i === 2
                      ? "rotate(-45deg) translate(4px, -4px)"
                      : "none",
                }}
              />
            ))}
          </button>
        </div>
      </header>

      {/* Mobile nav overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-black/95 flex flex-col items-center justify-center gap-12"
          >
            {links.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-2xl font-light text-white tracking-widest uppercase bg-transparent border-0"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
