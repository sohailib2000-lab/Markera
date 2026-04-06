import { AbsoluteFill, Img, staticFile } from "remotion";
import { brand } from "./brand";

const WavyLinesAndOrbs = () => {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {/* Subtle grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.03,
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Gold Orb – top right */}
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          backgroundColor: brand.colors.gold,
          filter: "blur(160px)",
          opacity: 0.18,
          top: "-8%",
          right: "-8%",
          mixBlendMode: "screen",
        }}
      />

      {/* Indigo Orb – bottom left */}
      <div
        style={{
          position: "absolute",
          width: 900,
          height: 900,
          borderRadius: "50%",
          backgroundColor: brand.colors.indigo,
          filter: "blur(200px)",
          opacity: 0.14,
          bottom: "-18%",
          left: "-18%",
          mixBlendMode: "screen",
        }}
      />

      {/* Small gold accent – mid left */}
      <div
        style={{
          position: "absolute",
          width: 300,
          height: 300,
          borderRadius: "50%",
          backgroundColor: brand.colors.goldLight,
          filter: "blur(80px)",
          opacity: 0.08,
          top: "35%",
          left: "10%",
          mixBlendMode: "screen",
        }}
      />

      {/* Wavy lines */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.2, pointerEvents: "none" }}>
        <svg width="100%" height="100%" viewBox="0 0 1080 1350" fill="none">
          {/* Gold wave bundle – sweeping from top-left */}
          <path d="M-100,0 C200,350 50,850 500,1350" stroke={brand.colors.gold} strokeWidth="2.5" />
          <path d="M-50,0 C250,350 100,850 550,1350" stroke={brand.colors.gold} strokeWidth="1" />
          <path d="M0,0 C300,350 150,850 600,1350" stroke={brand.colors.gold} strokeWidth="1" />
          <path d="M50,0 C350,350 200,850 650,1350" stroke={brand.colors.gold} strokeWidth="1" />
          <path d="M100,0 C400,350 250,850 700,1350" stroke={brand.colors.gold} strokeWidth="2.5" />

          {/* Indigo wave bundle – sweeping from top-right */}
          <path d="M500,0 C850,400 650,900 1100,1350" stroke={brand.colors.indigo} strokeWidth="2.5" />
          <path d="M540,0 C890,400 690,900 1140,1350" stroke={brand.colors.indigo} strokeWidth="1" />
          <path d="M580,0 C930,400 730,900 1180,1350" stroke={brand.colors.indigo} strokeWidth="1" />
          <path d="M620,0 C970,400 770,900 1220,1350" stroke={brand.colors.indigo} strokeWidth="2.5" />
        </svg>
      </div>
    </div>
  );
};

const BrandedIcon = ({ type }: { type: string }) => {
  return (
    <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="url(#brandGradientId)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, filter: "drop-shadow(0 0 12px rgba(201,168,124,0.4))" }}>
      <defs>
        <linearGradient id="brandGradientId" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={brand.colors.gold} />
          <stop offset="100%" stopColor={brand.colors.indigoLight} />
        </linearGradient>
      </defs>
      {type === "roi" && (
        <>
          <circle cx="12" cy="12" r="10"/>
          <circle cx="12" cy="12" r="6"/>
          <circle cx="12" cy="12" r="2"/>
        </>
      )}
      {type === "exposure" && (
        <>
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
          <polyline points="16 7 22 7 22 13"/>
        </>
      )}
      {type === "presence" && (
        <>
          <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/>
          <path d="m9 12 2 2 4-4"/>
        </>
      )}
    </svg>
  );
};

export const BrandedPost2 = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: brand.colors.bgDarker,
        fontFamily: "'Inter', sans-serif",
        color: brand.colors.text,
        overflow: "hidden",
      }}
    >
      <WavyLinesAndOrbs />

      {/* ═══ Top Zone: Logo + Headline ═══ */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 0,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          zIndex: 5,
        }}
      >
        {/* Smaller Logo */}
        <Img
          src={staticFile("logo/MARKERALOGO-trimmed.png")}
          style={{
            width: 320,
            height: "auto",
            objectFit: "contain",
            filter: "drop-shadow(0 12px 56px rgba(201,168,124,0.15)) drop-shadow(0 2px 26px rgba(99,102,241,0.1))",
            marginBottom: 40,
          }}
        />

        {/* Huge BRANDS Title */}
        <h1
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 160,
            fontWeight: 900,
            textTransform: "uppercase",
            lineHeight: 1,
            color: "#ffffff",
            margin: 0,
            letterSpacing: "-0.04em",
          }}
        >
          BRANDS
        </h1>

        {/* Sub-headline */}
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 60,
            fontWeight: 300,
            fontStyle: "italic",
            lineHeight: 1.15,
            color: "#e4e4e7",
            marginTop: 20,
            marginBottom: 0,
            letterSpacing: "0.01em",
          }}
        >
          Meet Your Perfect
          <br />
          <span style={{ color: brand.colors.goldLight, fontWeight: 500 }}>
            Creative Partner
          </span>
        </h2>

        {/* Thin gold divider */}
        <div
          style={{
            width: 100,
            height: 2,
            borderRadius: 2,
            background: `linear-gradient(to right, transparent, ${brand.colors.gold}, transparent)`,
            marginTop: 32,
            opacity: 0.6,
          }}
        />
      </div>

      {/* ═══ Bottom-Left: Tilted Image ═══ */}
      <div
        style={{
          position: "absolute",
          bottom: -40,
          left: -60,
          width: 580,
          height: 580,
          transform: "rotate(-9deg)",
          transformOrigin: "bottom left",
          borderRadius: 24,
          overflow: "hidden",
          border: `5px solid rgba(201,168,124,0.25)`,
          boxShadow:
            "20px 20px 60px rgba(0,0,0,0.8), 0 0 100px rgba(99,102,241,0.08)",
          zIndex: 10,
        }}
      >
        <Img
          src={staticFile(
            "simple-diy-outdoor-kitchen-gas-burner-shelves-pots-utensils.avif"
          )}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        {/* Slight dark vignette on the image edges */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(0,0,0,0.15) 0%, transparent 50%, rgba(0,0,0,0.25) 100%)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* ═══ Bottom-Right: Subhead + Bullets ═══ */}
      <div
        style={{
          position: "absolute",
          bottom: 240,
          right: 50,
          width: 500,
          display: "flex",
          flexDirection: "column",
          zIndex: 10,
        }}
      >
        {/* Subheading */}
        <h3
          style={{
            fontSize: 44,
            fontWeight: 800,
            lineHeight: 1.25,
            margin: "0 0 40px 0",
            letterSpacing: "-0.01em",
          }}
        >
          Collaborate with
          <br />
          trusted{" "}
          <span style={{ color: brand.colors.indigoLight }}>creators</span>
        </h3>

        {/* Bullet items */}
        <div style={{ display: "flex", flexDirection: "column", gap: 34 }}>
          {[
            { id: "roi", text: "Desired ROI" },
            { id: "exposure", text: "Better exposure" },
            { id: "presence", text: "Stronger brand presence" },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                fontSize: 34,
                fontWeight: 600,
              }}
            >
              <BrandedIcon type={item.id} />
              <span style={{ color: "#e4e4e7" }}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
