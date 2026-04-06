import { AbsoluteFill, Img, staticFile } from "remotion";
import { brand } from "./brand";

/* ── Glowing orb for dark-luxury depth ── */
const GlowOrb = ({
  color,
  top,
  left,
  right,
  bottom,
  size = 600,
  opacity = 0.15,
}: any) => (
  <div
    style={{
      position: "absolute",
      top,
      left,
      right,
      bottom,
      width: size,
      height: size,
      borderRadius: "50%",
      background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      filter: "blur(80px)",
      opacity,
      zIndex: 1,
      pointerEvents: "none",
    }}
  />
);

/* ── Thin gold divider ── */
const GoldRule = ({ width = 120 }: { width?: number }) => (
  <div
    style={{
      width,
      height: 1,
      background: `linear-gradient(90deg, transparent, ${brand.colors.gold}, transparent)`,
      opacity: 0.5,
    }}
  />
);

/* ── Single mission-point card ── */
const MissionCard: React.FC<{
  index: number;
  text: string;
}> = ({ index, text }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 24,
      padding: "18px 36px",
      borderRadius: 16,
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(201,168,124,0.15)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      width: "100%",
      maxWidth: 680,
    }}
  >
    {/* Index number */}
    <span
      style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: 52,
        fontWeight: 700,
        lineHeight: 1,
        color: brand.colors.gold,
        opacity: 0.35,
        minWidth: 48,
        textAlign: "center",
      }}
    >
      {index}
    </span>

    {/* Vertical gold accent line */}
    <div
      style={{
        width: 2,
        alignSelf: "stretch",
        background: `linear-gradient(180deg, transparent, ${brand.colors.gold}, transparent)`,
        opacity: 0.4,
        borderRadius: 2,
      }}
    />

    {/* Text */}
    <span
      style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: 30,
        fontWeight: 500,
        color: brand.colors.text,
        letterSpacing: "-0.01em",
        lineHeight: 1.3,
      }}
    >
      {text}
    </span>
  </div>
);

export const BrandedPost = () => {
  const missionPoints = [
    "Build meaningful collaborations",
    "Boost reach, growth & impact",
    "Turn campaigns into long-term wins",
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: brand.colors.bgDarker,
        fontFamily: "'Inter', sans-serif",
        color: brand.colors.text,
      }}
    >
      {/* ── Background ── */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        {/* Warm centre spotlight */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 50% 35%, rgba(201,168,124,0.08) 0%, transparent 50%)",
            zIndex: 1,
          }}
        />

        {/* Brand signature crossing lines — gold at -45°, indigo at 45° */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 1400,
            height: 1400,
            transform: "translate(-50%, -50%)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        >
          {/* Gold stroke -45deg */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: 1200,
              height: 3,
              background: `linear-gradient(90deg, transparent, ${brand.colors.gold}66, ${brand.colors.gold}22, transparent)`,
              transform: "translate(-50%, -50%) rotate(-45deg)",
            }}
          />
          {/* Indigo stroke 45deg */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: 1200,
              height: 3,
              background: `linear-gradient(90deg, transparent, ${brand.colors.indigo}55, ${brand.colors.indigo}18, transparent)`,
              transform: "translate(-50%, -50%) rotate(45deg)",
            }}
          />
        </div>

        {/* Orbs — slightly stronger for more depth */}
        <GlowOrb
          color={brand.colors.gold}
          top="-10%"
          left="-10%"
          size={800}
          opacity={0.16}
        />
        <GlowOrb
          color={brand.colors.indigo}
          bottom="-12%"
          right="-12%"
          size={900}
          opacity={0.12}
        />
        {/* Secondary smaller accent orb */}
        <GlowOrb
          color={brand.colors.goldLight}
          top="60%"
          right="5%"
          size={300}
          opacity={0.06}
        />

        {/* Decorative pulsing circles — brand motif */}
        {[
          { x: "12%", y: "18%", r: 180, color: brand.colors.gold, op: 0.06 },
          { x: "82%", y: "72%", r: 240, color: brand.colors.indigo, op: 0.04 },
          { x: "70%", y: "15%", r: 100, color: brand.colors.goldLight, op: 0.05 },
          { x: "25%", y: "80%", r: 140, color: brand.colors.gold, op: 0.04 },
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
              zIndex: 2,
            }}
          />
        ))}

        {/* 3-D perspective grid, radially masked */}
        <div
          style={{
            position: "absolute",
            inset: -200,
            zIndex: 2,
            opacity: 0.12,
            backgroundSize: "80px 80px",
            backgroundImage: `
              linear-gradient(to right, ${brand.colors.goldLight} 1px, transparent 1px),
              linear-gradient(to bottom, ${brand.colors.goldLight} 1px, transparent 1px)
            `,
            maskImage:
              "radial-gradient(circle at 50% 60%, black 10%, transparent 55%)",
            WebkitMaskImage:
              "radial-gradient(circle at 50% 60%, black 10%, transparent 55%)",
            transform: "perspective(1200px) rotateX(50deg) scale(1.3)",
            transformOrigin: "center 70%",
          }}
        />

        {/* Subtle noise texture overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 3,
            opacity: 0.03,
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: "128px 128px",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* ── Content ── */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          paddingTop: 80,
          paddingBottom: 64,
        }}
      >
        {/* ── TOP: Logo (title) + tagline ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 100,
          }}
        >
          <Img
            src={staticFile("logo/MARKERALOGO-trimmed.png")}
            style={{
              width: 720,
              height: "auto",
              objectFit: "contain",
              marginBottom: 20,
              filter: "drop-shadow(0 12px 48px rgba(0,0,0,0.6))",
            }}
          />

          <p
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              fontSize: 40,
              fontWeight: 400,
              lineHeight: 1.2,
              color: brand.colors.goldLight,
              margin: 0,
              textAlign: "center",
              letterSpacing: "0.02em",
              textShadow: "0 4px 16px rgba(201,168,124,0.15)",
            }}
          >
            Where Brands Meet Creators
          </p>
        </div>

        {/* ── MIDDLE ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: 0,
            marginTop: -120,
          }}
        >
          {/* Bridge statement */}
          <p
            style={{
              margin: 0,
              fontSize: 36,
              fontWeight: 300,
              lineHeight: 1.5,
              color: brand.colors.text,
              letterSpacing: "-0.01em",
            }}
          >
            We are{" "}
            <b style={{ color: brand.colors.goldLight, fontWeight: 600 }}>
              the bridge
            </b>{" "}
            between
            <br />
            <b style={{ color: brand.colors.goldLight, fontWeight: 600 }}>
              brands
            </b>{" "}
            and{" "}
            <b style={{ color: brand.colors.goldLight, fontWeight: 600 }}>
              creators
            </b>
            .
          </p>

          {/* Decorative divider */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: 36,
              marginBottom: 36,
            }}
          >
            <GoldRule width={140} />
          </div>

          {/* Mission label */}
          <p
            style={{
              margin: 0,
              fontSize: 22,
              fontWeight: 600,
              color: brand.colors.gold,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: 28,
            }}
          >
            Our Mission
          </p>

          {/* Mission cards */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 14,
            }}
          >
            {missionPoints.map((text, i) => (
              <MissionCard key={text} index={i + 1} text={text} />
            ))}
          </div>
        </div>

        {/* ── BOTTOM: CTA ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "22px 56px",
            borderRadius: 999,
            background: `linear-gradient(135deg, ${brand.colors.gold}, ${brand.colors.goldDark})`,
            color: "#fff",
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: "0.03em",
            textTransform: "uppercase",
            boxShadow: `0 6px 28px rgba(201,168,124,0.35), 0 2px 8px rgba(0,0,0,0.4)`,
            marginBottom: 60,
          }}
        >
          Join the Markera Network
        </div>
      </div>
    </AbsoluteFill>
  );
};

