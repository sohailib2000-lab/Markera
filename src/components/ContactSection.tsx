"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import GlassCard from "./GlassCard";

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      setStatus("sent");
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      console.error("Failed to submit contact form:", err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 6000);
    }
  };

  return (
    <section
      id="contact"
      className="relative z-10 flex justify-center"
      style={{ padding: "12rem 1.5rem" }}
    >
      <div
        ref={ref}
        style={{
          width: "100%",
          maxWidth: "1050px",
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          gap: "6rem",
          alignItems: "center",
        }}
      >
        {/* Left Side: Headings */}
        <div style={{ flex: "1 1 380px", display: "flex", flexDirection: "column" }}>
          <motion.h2
            className="text-white tracking-tight"
            style={{
              fontSize: "clamp(3.5rem, 8vw, 6rem)",
              lineHeight: 1.05,
              fontWeight: 700,
              fontFamily: "DM Sans, sans-serif",
            }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Make your<br />Mark.
          </motion.h2>
          <motion.p
            style={{
              color: "rgba(255,255,255,0.6)",
              fontFamily: "DM Sans, sans-serif",
              marginTop: "2.5rem",
              maxWidth: "360px",
              fontSize: "1rem",
              lineHeight: 1.7,
            }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Ready to make your mark? We are accepting a select number of partners for the upcoming quarter.
          </motion.p>
        </div>

        {/* Right Side: Glass Form */}
        <div style={{ flex: "1 1 450px" }}>
          <GlassCard
            style={{
              position: "relative",
              padding: "4.5rem 3.5rem",
              borderRadius: "24px",
              width: "100%",
              minHeight: "560px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Ambient glowing dots - 4 corners */}
            <div style={{ position: "absolute", top: "1.5rem", left: "1.5rem", width: "5px", height: "5px", borderRadius: "50%", background: "#8b5cf6", boxShadow: "0 0 12px 2px rgba(139,92,246,0.6)" }} />
            <div style={{ position: "absolute", top: "1.5rem", right: "1.5rem", width: "5px", height: "5px", borderRadius: "50%", background: "#8b5cf6", boxShadow: "0 0 12px 2px rgba(139,92,246,0.6)" }} />
            <div style={{ position: "absolute", bottom: "1.5rem", left: "1.5rem", width: "5px", height: "5px", borderRadius: "50%", background: "#8b5cf6", boxShadow: "0 0 12px 2px rgba(139,92,246,0.6)" }} />
            <div style={{ position: "absolute", bottom: "1.5rem", right: "1.5rem", width: "5px", height: "5px", borderRadius: "50%", background: "#8b5cf6", boxShadow: "0 0 12px 2px rgba(139,92,246,0.6)" }} />

            {status === "sent" ? (
              <div style={{ textAlign: "center", margin: "auto" }}>
                <div style={{ fontSize: "3rem", color: "var(--gold)", marginBottom: "1rem" }}>✓</div>
                <p style={{ color: "white", fontSize: "1.25rem", fontWeight: 300, marginBottom: "0.5rem" }}>Message sent.</p>
                <p style={{ color: "rgba(255,255,255,0.5)", fontFamily: "DM Sans, sans-serif", fontSize: "0.875rem" }}>
                  We&apos;ll be in touch soon.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "space-between" }}
              >
                <div>
                  <div className="laser-wrap">
                    <input id="name" name="name" type="text" placeholder="Your name" required className="laser-input" />
                  </div>
                  <div className="laser-wrap">
                    <input id="email" name="email" type="email" placeholder="Email address" required className="laser-input" />
                  </div>
                  <div className="laser-wrap">
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Tell us about your goals..."
                      required
                      rows={4}
                      className="laser-input"
                      style={{ resize: "none", minHeight: "100px" }}
                    />
                  </div>
                </div>

                <div>
                  {status === "error" && (
                    <div style={{
                      color: "#f87171",
                      fontSize: "0.85rem",
                      fontFamily: "DM Sans, sans-serif",
                      marginBottom: "1rem",
                      textAlign: "center",
                      background: "rgba(248, 113, 113, 0.05)",
                      border: "1px solid rgba(248, 113, 113, 0.15)",
                      padding: "10px",
                      borderRadius: "8px"
                    }}>
                      Failed to submit. Please try again or check settings.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "20px 0",
                      borderRadius: "16px",
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "white",
                      fontSize: "11px",
                      fontWeight: 600,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      fontFamily: "Outfit, sans-serif",
                      transition: "all 0.3s ease",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)";
                      e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                      e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                    }}
                  >
                    {status === "sending" ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            )}
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
