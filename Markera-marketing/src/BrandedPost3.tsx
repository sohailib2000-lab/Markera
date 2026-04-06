import { AbsoluteFill, Img, staticFile } from "remotion";
import { BadgeDollarSign, Handshake, Globe } from "lucide-react";
import { brand } from "./brand";

export const BrandedPost3 = () => {
  const bulletPoints = [
    { icon: <BadgeDollarSign size={42} strokeWidth={1.5} color={brand.colors.goldLight} />, text: "Secure profitable partnerships" },
    { icon: <Handshake size={42} strokeWidth={1.5} color={brand.colors.goldLight} />, text: "Connect with trusted brands" },
    { icon: <Globe size={42} strokeWidth={1.5} color={brand.colors.goldLight} />, text: "Expand influence & impact" },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: brand.colors.bgDarker,
        fontFamily: brand.fonts.body + ", sans-serif",
        color: brand.colors.text,
      }}
    >
      {/* ── Background layer with wave effect ── */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        {/* Subtle grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.03,
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        {/* Ambient glow - Top Right */}
        <div
          style={{
            position: "absolute",
            width: 800,
            height: 800,
            borderRadius: "50%",
            background: brand.colors.gold,
            filter: "blur(180px)",
            opacity: 0.15,
            top: "-15%",
            right: "-20%",
            mixBlendMode: "screen",
          }}
        />

        {/* Ambient glow - Bottom Left */}
        <div
          style={{
            position: "absolute",
            width: 900,
            height: 900,
            borderRadius: "50%",
            background: brand.colors.indigo,
            filter: "blur(200px)",
            opacity: 0.15,
            bottom: "-10%",
            left: "-25%",
            mixBlendMode: "screen",
          }}
        />
        
        {/* Wavy lines simulation with thin SVG overlay */}
        <svg
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            opacity: 0.08,
            pointerEvents: "none",
          }}
          viewBox="0 0 1080 1350"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {Array.from({ length: 15 }).map((_, i) => (
            <path
              key={i}
              d={`M-100 ${100 + i * 15} C 300 ${200 + i * 10}, 600 ${
                1000 + i * 20
              }, 1200 ${1200 + i * 15}`}
              stroke="#ffffff"
              strokeWidth="2"
              fill="none"
            />
          ))}
          {Array.from({ length: 15 }).map((_, i) => (
            <path
              key={`r-${i}`}
              d={`M1200 ${100 + i * 15} C 800 ${200 + i * 10}, 500 ${
                1000 + i * 20
              }, -100 ${1200 + i * 15}`}
              stroke="#ffffff"
              strokeWidth="2"
              fill="none"
            />
          ))}
        </svg>
      </div>

      {/* ── Content layer ── */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          padding: "80px 60px",
        }}
      >
        {/* Header container */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 60 }}>
          <Img
            src={staticFile("logo/MARKERALOGO-trimmed.png")}
            style={{
              width: 320,
              height: "auto",
              objectFit: "contain",
              marginBottom: 40,
              filter:
                "drop-shadow(0 12px 56px rgba(201,168,124,0.15)) drop-shadow(0 2px 26px rgba(99,102,241,0.1))",
            }}
          />

          <h1
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 140,
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "-0.03em",
              margin: 0,
              lineHeight: 0.9,
              textAlign: "center",
              background: `linear-gradient(180deg, #ffffff 0%, ${brand.colors.text} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            CREATORS
          </h1>
          <h2
            style={{
              fontFamily: brand.fonts.display + ", serif",
              fontSize: 68,
              fontWeight: 300,
              fontStyle: "italic",
              margin: "20px 0 0 0",
              lineHeight: 1.1,
              textAlign: "center",
              color: brand.colors.goldLight,
            }}
          >
            It's Time to Boost
            <br />
            Your Career
          </h2>
        </div>

        {/* Bottom Split Layout */}
        <div style={{ display: "flex", flex: 1, position: "relative", alignItems: "center" }}>
          
          {/* Right Side: Product Image replacing Laptop */}
          <div
            style={{
              flex: "0 0 50%",
              position: "absolute",
              right: -60,
              bottom: 0,
              zIndex: 2,
              transform: "rotate(-6deg)",
              boxShadow: "-20px 30px 60px rgba(0,0,0,0.6)",
              borderRadius: 32,
              overflow: "hidden",
              border: `2px solid rgba(255,255,255,0.1)`,
            }}
          >
            <Img
              src={staticFile("simple-diy-outdoor-kitchen-gas-burner-shelves-pots-utensils.avif")}
              style={{
                display: "block",
                width: 580,
                height: 480,
                objectFit: "cover",
              }}
            />
            {/* Glass reflection overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 50%)",
                pointerEvents: "none",
              }}
            />
          </div>

          {/* Left Side: Copy and Bullet Points */}
          <div
            style={{
              flex: "1",
              marginRight: "50%",
              marginLeft: 20,
              zIndex: 3,
              display: "flex",
              flexDirection: "column",
              gap: 32,
              paddingTop: 80, // Push it down slightly to balance layout
            }}
          >
            <h3
              style={{
                fontSize: 48,
                fontWeight: 700,
                lineHeight: 1.15,
                margin: 0,
                letterSpacing: "-0.01em",
              }}
            >
              Work with top brands<br />
              <span style={{ color: brand.colors.indigoLight }}>who value your content</span>
            </h3>

            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              {bulletPoints.map((bp, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: 34,
                    fontWeight: 500,
                    lineHeight: 1.2,
                    gap: 16,
                  }}
                >
                  <span style={{ display: "flex", filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.3))" }}>{bp.icon}</span>
                  <span style={{ color: "rgba(228,228,231,0.95)" }}>{bp.text}</span>
                </li>
              ))}
            </ul>
          </div>
          
        </div>
      </div>
    </AbsoluteFill>
  );
};
