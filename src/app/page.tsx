"use client";

import dynamic from "next/dynamic";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ExpertiseSection from "@/components/ExpertiseSection";
import PhilosophySection from "@/components/PhilosophySection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

// Heavy client-only components loaded dynamically (no SSR)
const WebGLBackground = dynamic(() => import("@/components/WebGLBackground"), { ssr: false });
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });

export default function HomePage() {
  return (
    <>
      {/* Cursor */}
      <CustomCursor />

      {/* Preloader */}
      <Preloader />

      {/* 3D particle background - fixed, behind everything */}
      <WebGLBackground />

      {/* Page shell */}
      <div className="relative" style={{ zIndex: 1 }}>
        <Navbar />

        <main>
          <HeroSection />
          <ExpertiseSection />
          <PhilosophySection />
          <ContactSection />
        </main>

        <Footer />
      </div>
    </>
  );
}
