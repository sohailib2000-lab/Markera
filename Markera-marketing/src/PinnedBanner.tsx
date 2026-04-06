import { AbsoluteFill, Img, staticFile } from "remotion";
import { brand } from "./brand";

/**
 * One of 3 panels that together form a continuous Instagram pinned banner.
 * panel: 0 = left, 1 = center, 2 = right
 *
 * Full canvas: 3240 x 1350 — each panel shows a 1080-wide slice.
 */

const PANEL_W = 1080;
const FULL_W = PANEL_W * 3; // 3240
const H = 1350;

/* ── Shared panoramic background (rendered identically, offset per panel) ── */
const PanoramicBackground = ({ panel }: { panel: number }) => {
  const offsetX = -panel * PANEL_W;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: offsetX,
        width: FULL_W,
        height: H,
        overflow: "visible",
      }}
    >
      {/* Base dark fill */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: brand.colors.bgDarker,
        }}
      />

      {/* Subtle grid spanning full width */}
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

      {/* Large sweeping gold orb — left third */}
      <div
        style={{
          position: "absolute",
          width: 1200,
          height: 1200,
          borderRadius: "50%",
          background: brand.colors.gold,
          filter: "blur(220px)",
          opacity: 0.14,
          top: "-25%",
          left: "-5%",
          mixBlendMode: "screen",
        }}
      />

      {/* Indigo orb — center-right */}
      <div
        style={{
          position: "absolute",
          width: 1400,
          height: 1400,
          borderRadius: "50%",
          background: brand.colors.indigo,
          filter: "blur(260px)",
          opacity: 0.1,
          bottom: "-30%",
          left: "45%",
          mixBlendMode: "screen",
        }}
      />

      {/* Gold accent orb — far right */}
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: brand.colors.goldLight,
          filter: "blur(180px)",
          opacity: 0.1,
          top: "-10%",
          right: "-3%",
          mixBlendMode: "screen",
        }}
      />

      {/* Small accent — center bottom */}
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: brand.colors.gold,
          filter: "blur(100px)",
          opacity: 0.08,
          bottom: "5%",
          left: "30%",
          mixBlendMode: "screen",
        }}
      />

      {/* Wavy SVG lines spanning full width */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0.15,
          pointerEvents: "none",
        }}
        viewBox={`0 0 ${FULL_W} ${H}`}
        fill="none"
      >
        {/* Gold wave bundle — sweeps from left to right */}
        <path
          d={`M-100,100 C600,400 1200,200 1800,600 S2800,300 ${FULL_W + 100},500`}
          stroke={brand.colors.gold}
          strokeWidth="2.5"
        />
        <path
          d={`M-100,140 C600,440 1200,240 1800,640 S2800,340 ${FULL_W + 100},540`}
          stroke={brand.colors.gold}
          strokeWidth="1"
        />
        <path
          d={`M-100,180 C600,480 1200,280 1800,680 S2800,380 ${FULL_W + 100},580`}
          stroke={brand.colors.gold}
          strokeWidth="1"
        />
        <path
          d={`M-100,60 C600,360 1200,160 1800,560 S2800,260 ${FULL_W + 100},460`}
          stroke={brand.colors.gold}
          strokeWidth="1.5"
        />

        {/* Indigo wave bundle — sweeps the opposite curve */}
        <path
          d={`M-100,${H - 200} C500,${H - 600} 1400,${H - 300} 2200,${H - 700} S3000,${H - 400} ${FULL_W + 100},${H - 500}`}
          stroke={brand.colors.indigo}
          strokeWidth="2.5"
        />
        <path
          d={`M-100,${H - 160} C500,${H - 560} 1400,${H - 260} 2200,${H - 660} S3000,${H - 360} ${FULL_W + 100},${H - 460}`}
          stroke={brand.colors.indigo}
          strokeWidth="1"
        />
        <path
          d={`M-100,${H - 240} C500,${H - 640} 1400,${H - 340} 2200,${H - 740} S3000,${H - 440} ${FULL_W + 100},${H - 540}`}
          stroke={brand.colors.indigo}
          strokeWidth="1"
        />
      </svg>

      {/* Decorative circles — brand motif scattered across full width */}
      {[
        { x: "5%", y: "15%", r: 200, color: brand.colors.gold, op: 0.06 },
        { x: "20%", y: "75%", r: 160, color: brand.colors.indigo, op: 0.04 },
        { x: "38%", y: "20%", r: 120, color: brand.colors.goldLight, op: 0.05 },
        { x: "55%", y: "70%", r: 180, color: brand.colors.gold, op: 0.04 },
        { x: "72%", y: "12%", r: 140, color: brand.colors.indigo, op: 0.05 },
        { x: "88%", y: "65%", r: 100, color: brand.colors.goldLight, op: 0.06 },
        { x: "95%", y: "25%", r: 160, color: brand.colors.gold, op: 0.04 },
      ].map((c, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: c.x,
            top: c.y,
            width: c.r,
            height: c.r,
            borderRadius: "50%",
            border: `1px solid ${c.color}`,
            opacity: c.op,
          }}
        />
      ))}

      {/* Large MARKERA text spanning the full width — positioned in the upper-center zone */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: FULL_W,
          height: H,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 380,
            fontWeight: 900,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            lineHeight: 1,
            background: `linear-gradient(135deg, ${brand.colors.gold}30 0%, ${brand.colors.goldLight}18 40%, ${brand.colors.indigo}20 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            userSelect: "none",
            pointerEvents: "none",
            marginTop: -80,
          }}
        >
          MARKERA
        </span>
      </div>

      {/* Tagline below the large text — hidden on center panel to avoid overlap */}
      {panel !== 1 && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: FULL_W,
            height: H,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              fontSize: 64,
              fontWeight: 400,
              color: brand.colors.goldLight,
              opacity: 0.35,
              marginTop: 220,
              letterSpacing: "0.04em",
            }}
          >
            Where Brands Meet Creators
          </span>
        </div>
      )}

      {/* Noise texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.03,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "128px 128px",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

/* ── Gold divider ── */
const GoldDivider = ({ width = 100 }: { width?: number }) => (
  <div
    style={{
      width,
      height: 2,
      borderRadius: 2,
      background: `linear-gradient(to right, transparent, ${brand.colors.gold}, transparent)`,
      opacity: 0.6,
    }}
  />
);

/* ════════════════════════════════════════════════════════════════
   PANEL 0 — LEFT: "FOR BRANDS"
   ════════════════════════════════════════════════════════════════ */
const PanelLeft = () => (
  <div
    style={{
      position: "relative",
      zIndex: 10,
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: "100%",
      padding: "80px 60px",
      justifyContent: "space-between",
    }}
  >
    {/* Top: Logo */}
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Img
        src={staticFile("logo/MARKERALOGO-trimmed.png")}
        style={{
          width: 280,
          height: "auto",
          objectFit: "contain",
          filter:
            "drop-shadow(0 12px 56px rgba(201,168,124,0.15))",
        }}
      />
    </div>

    {/* Center: Headline */}
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 24,
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: 22,
          fontWeight: 600,
          color: brand.colors.gold,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
        }}
      >
        For Brands
      </p>
      <h1
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 88,
          fontWeight: 900,
          textTransform: "uppercase",
          lineHeight: 0.95,
          color: "#ffffff",
          margin: 0,
          letterSpacing: "-0.03em",
        }}
      >
        GROW
        <br />
        YOUR
        <br />
        <span
          style={{
            background: `linear-gradient(135deg, ${brand.colors.gold}, ${brand.colors.goldLight})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          REACH
        </span>
      </h1>

      <GoldDivider width={120} />

      <p
        style={{
          margin: 0,
          fontSize: 30,
          fontWeight: 400,
          color: brand.colors.text,
          lineHeight: 1.4,
          maxWidth: 500,
          opacity: 0.85,
        }}
      >
        Partner with creators who
        <br />
        <b style={{ color: brand.colors.goldLight, fontWeight: 600 }}>
          amplify your message
        </b>
      </p>
    </div>

    {/* Bottom: Bullet points */}
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {["Targeted audiences", "Authentic storytelling", "Measurable ROI"].map(
        (text, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: brand.colors.gold,
                boxShadow: `0 0 12px ${brand.colors.gold}60`,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: 28,
                fontWeight: 500,
                color: "rgba(228,228,231,0.9)",
              }}
            >
              {text}
            </span>
          </div>
        ),
      )}
    </div>
  </div>
);

/* ════════════════════════════════════════════════════════════════
   PANEL 1 — CENTER: Hero / Brand Statement
   ════════════════════════════════════════════════════════════════ */
const PanelCenter = () => (
  <div
    style={{
      position: "relative",
      zIndex: 10,
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: "100%",
      alignItems: "center",
      justifyContent: "space-between",
      textAlign: "center",
      padding: "80px 60px",
    }}
  >
    {/* Logo — top */}
    <Img
      src={staticFile("logo/MARKERALOGO-trimmed.png")}
      style={{
        width: 540,
        height: "auto",
        objectFit: "contain",
        filter: "drop-shadow(0 12px 48px rgba(0,0,0,0.6))",
      }}
    />

    {/* Bottom group: divider + mission + CTA */}
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 32,
      }}
    >
      <GoldDivider width={160} />

      {/* Mission statement */}
      <p
        style={{
          fontSize: 32,
          fontWeight: 300,
          color: brand.colors.text,
          margin: 0,
          lineHeight: 1.5,
          maxWidth: 600,
          opacity: 0.85,
        }}
      >
        We are{" "}
        <b style={{ color: brand.colors.goldLight, fontWeight: 600 }}>
          the bridge
        </b>{" "}
        between brands
        <br />
        and creators.{" "}
        <b style={{ color: brand.colors.indigoLight, fontWeight: 600 }}>
          Partnerships that last.
        </b>
      </p>

      {/* CTA button */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "22px 56px",
          borderRadius: 999,
          background: `linear-gradient(135deg, ${brand.colors.gold}, ${brand.colors.goldDark})`,
          color: "#fff",
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: "0.03em",
          textTransform: "uppercase",
          boxShadow: `0 6px 28px rgba(201,168,124,0.35), 0 2px 8px rgba(0,0,0,0.4)`,
        }}
      >
        Join the Markera Network
      </div>
    </div>
  </div>
);

/* ════════════════════════════════════════════════════════════════
   PANEL 2 — RIGHT: "FOR CREATORS"
   ════════════════════════════════════════════════════════════════ */
const PanelRight = () => (
  <div
    style={{
      position: "relative",
      zIndex: 10,
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: "100%",
      padding: "80px 60px",
      justifyContent: "space-between",
      alignItems: "flex-end",
      textAlign: "right",
    }}
  >
    {/* Top: Logo */}
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <Img
        src={staticFile("logo/MARKERALOGO-trimmed.png")}
        style={{
          width: 280,
          height: "auto",
          objectFit: "contain",
          filter:
            "drop-shadow(0 12px 56px rgba(201,168,124,0.15))",
        }}
      />
    </div>

    {/* Center: Headline */}
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 24,
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: 22,
          fontWeight: 600,
          color: brand.colors.indigoLight,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
        }}
      >
        For Creators
      </p>
      <h1
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 88,
          fontWeight: 900,
          textTransform: "uppercase",
          lineHeight: 0.95,
          color: "#ffffff",
          margin: 0,
          letterSpacing: "-0.03em",
        }}
      >
        BOOST
        <br />
        YOUR
        <br />
        <span
          style={{
            background: `linear-gradient(135deg, ${brand.colors.indigo}, ${brand.colors.indigoLight})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          IMPACT
        </span>
      </h1>

      <GoldDivider width={120} />

      <p
        style={{
          margin: 0,
          fontSize: 30,
          fontWeight: 400,
          color: brand.colors.text,
          lineHeight: 1.4,
          maxWidth: 500,
          opacity: 0.85,
        }}
      >
        Work with brands that
        <br />
        <b style={{ color: brand.colors.indigoLight, fontWeight: 600 }}>
          value your content
        </b>
      </p>
    </div>

    {/* Bottom: Bullet points */}
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
        alignItems: "flex-end",
      }}
    >
      {["Profitable partnerships", "Trusted brand deals", "Expand your influence"].map(
        (text, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <span
              style={{
                fontSize: 28,
                fontWeight: 500,
                color: "rgba(228,228,231,0.9)",
              }}
            >
              {text}
            </span>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: brand.colors.indigoLight,
                boxShadow: `0 0 12px ${brand.colors.indigo}60`,
                flexShrink: 0,
              }}
            />
          </div>
        ),
      )}
    </div>
  </div>
);

/* ════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════════════════════════════════ */
export const PinnedBanner: React.FC<{ panel: number }> = ({ panel }) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: brand.colors.bgDarker,
        fontFamily: "'Inter', sans-serif",
        color: brand.colors.text,
        overflow: "hidden",
      }}
    >
      {/* Shared panoramic background — offset per panel */}
      <PanoramicBackground panel={panel} />

      {/* Per-panel foreground content */}
      {panel === 0 && <PanelLeft />}
      {panel === 1 && <PanelCenter />}
      {panel === 2 && <PanelRight />}
    </AbsoluteFill>
  );
};
