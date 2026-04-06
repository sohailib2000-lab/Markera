import {
  AbsoluteFill,
  Img,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
} from "remotion";
import { brand } from "./brand";

/* ── Animated background (persists across all scenes) ── */
const AnimatedBg: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const t = frame / fps;
  const goldBreath = 0.1 + 0.1 * Math.sin(t * Math.PI * 0.57);
  const indigoBreath = 0.07 + 0.08 * Math.sin(t * Math.PI * 0.4 + 1.2);

  const driftX = interpolate(frame, [0, 310], [0, 40], {
    extrapolateRight: "clamp",
  });
  const driftY = interpolate(frame, [0, 310], [0, 25], {
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {/* Warm centre spotlight */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 35%, rgba(201,168,124,0.06) 0%, transparent 55%)",
        }}
      />

      {/* Gold orb */}
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${brand.colors.gold} 0%, transparent 70%)`,
          filter: "blur(100px)",
          opacity: goldBreath,
          top: -180 + driftY * 0.3,
          left: -160 + driftX * 0.5,
          pointerEvents: "none",
        }}
      />

      {/* Indigo orb */}
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${brand.colors.indigo} 0%, transparent 70%)`,
          filter: "blur(120px)",
          opacity: indigoBreath,
          bottom: -250 - driftY * 0.4,
          right: -200 + driftX * 0.3,
          pointerEvents: "none",
        }}
      />

      {/* Small accent orb */}
      <div
        style={{
          position: "absolute",
          width: 250,
          height: 250,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${brand.colors.goldLight} 0%, transparent 70%)`,
          filter: "blur(50px)",
          opacity: goldBreath * 0.4,
          top: "60%",
          right: "10%",
          pointerEvents: "none",
        }}
      />

      {/* Decorative circles */}
      {[
        { x: "15%", y: "20%", r: 140, color: brand.colors.gold, op: 0.05 },
        { x: "78%", y: "70%", r: 200, color: brand.colors.indigo, op: 0.04 },
        { x: "65%", y: "12%", r: 80, color: brand.colors.goldLight, op: 0.04 },
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
            transform: `translate(${driftX * (i % 2 === 0 ? 0.2 : -0.2)}px, ${driftY * (i % 2 === 0 ? -0.3 : 0.3)}px)`,
          }}
        />
      ))}

      {/* Subtle grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.025,
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

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

/* ── Scene fade wrapper (crossfade in/out) ── */
const SceneFade: React.FC<{
  children: React.ReactNode;
  durationInFrames: number;
  fadeIn?: number;
  fadeOut?: number;
  noFadeOut?: boolean;
}> = ({
  children,
  durationInFrames,
  fadeIn = 10,
  fadeOut = 12,
  noFadeOut = false,
}) => {
  const frame = useCurrentFrame();

  const enterOp = interpolate(frame, [0, fadeIn], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitOp = noFadeOut
    ? 1
    : interpolate(
        frame,
        [durationInFrames - fadeOut, durationInFrames],
        [1, 0],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
      );

  return (
    <AbsoluteFill style={{ opacity: enterOp * exitOp }}>
      {children}
    </AbsoluteFill>
  );
};

/* ═══════════════════════════════════════════════════════
   Scene 1 — Logo Reveal  (80 frames / 2.7s)
   ═══════════════════════════════════════════════════════ */
const LogoRevealScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 80 },
  });
  const logoBlur = interpolate(logoScale, [0, 0.7, 1], [12, 3, 0]);
  const logoOp = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Crossing lines draw in
  const lineProgress = spring({
    frame: frame - 8,
    fps,
    config: { damping: 200 },
  });
  const lineLen = interpolate(lineProgress, [0, 1], [0, 1200]);

  // Flash burst on reveal
  const flashOp = interpolate(frame, [8, 16, 30], [0, 0.15, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <SceneFade durationInFrames={80}>
      {/* Flash */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at 50% 50%, ${brand.colors.gold}, transparent 60%)`,
          opacity: flashOp,
          pointerEvents: "none",
        }}
      />

      {/* Crossing lines — brand signature */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 1400,
          height: 1400,
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: lineLen,
            height: 3,
            background: `linear-gradient(90deg, transparent, ${brand.colors.gold}88, ${brand.colors.gold}33, transparent)`,
            transform: "translate(-50%, -50%) rotate(-45deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: lineLen,
            height: 3,
            background: `linear-gradient(90deg, transparent, ${brand.colors.indigo}66, ${brand.colors.indigo}22, transparent)`,
            transform: "translate(-50%, -50%) rotate(45deg)",
          }}
        />
      </div>

      {/* Logo */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Img
          src={staticFile("logo/MARKERALOGO-trimmed.png")}
          style={{
            width: 650,
            height: "auto",
            objectFit: "contain",
            transform: `scale(${interpolate(logoScale, [0, 1], [1.15, 1])})`,
            filter: `blur(${logoBlur}px) drop-shadow(0 12px 48px rgba(0,0,0,0.6))`,
            opacity: logoOp,
          }}
        />
      </AbsoluteFill>
    </SceneFade>
  );
};

/* ═══════════════════════════════════════════════════════
   Scene 2 — Tagline  (90 frames / 3s)
   ═══════════════════════════════════════════════════════ */
const TaglineScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoOp = spring({ frame: frame - 3, fps, config: { damping: 200 } });

  // "Where Brands"
  const l1 = spring({
    frame: frame - 8,
    fps,
    config: { damping: 14, stiffness: 100 },
  });
  // "Meet Creators"
  const l2 = spring({
    frame: frame - 18,
    fps,
    config: { damping: 14, stiffness: 100 },
  });
  // Gold rule
  const ruleW = interpolate(
    spring({ frame: frame - 28, fps, config: { damping: 200 } }),
    [0, 1],
    [0, 160],
  );
  // Subtitle
  const sub = spring({ frame: frame - 38, fps, config: { damping: 200 } });

  return (
    <SceneFade durationInFrames={90}>
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Small logo at top */}
        <Img
          src={staticFile("logo/MARKERALOGO-trimmed.png")}
          style={{
            position: "absolute",
            top: 120,
            width: 260,
            height: "auto",
            objectFit: "contain",
            opacity: logoOp,
            filter: "drop-shadow(0 8px 28px rgba(0,0,0,0.5))",
          }}
        />

        {/* Tagline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 86,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.02em",
              opacity: l1,
              transform: `translateY(${interpolate(l1, [0, 1], [50, 0])}px)`,
            }}
          >
            Where Brands
          </span>
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 86,
              fontWeight: 700,
              color: brand.colors.goldLight,
              letterSpacing: "-0.02em",
              opacity: l2,
              transform: `translateY(${interpolate(l2, [0, 1], [50, 0])}px)`,
            }}
          >
            Meet Creators
          </span>

          {/* Gold divider */}
          <div
            style={{
              width: ruleW,
              height: 2,
              background: `linear-gradient(90deg, transparent, ${brand.colors.gold}, transparent)`,
              marginTop: 24,
              opacity: 0.6,
            }}
          />

          {/* Subtitle */}
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              fontSize: 34,
              fontWeight: 400,
              color: brand.colors.text,
              marginTop: 20,
              opacity: sub,
              transform: `translateY(${interpolate(sub, [0, 1], [20, 0])}px)`,
              letterSpacing: "0.03em",
            }}
          >
            Partnerships That Last.
          </span>
        </div>
      </AbsoluteFill>
    </SceneFade>
  );
};

/* ═══════════════════════════════════════════════════════
   Scene 3 — Value Props  (100 frames / 3.3s)
   ═══════════════════════════════════════════════════════ */
const ValuePropsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const items = [
    { num: "01", text: "Authentic Creator Partnerships" },
    { num: "02", text: "Strategic Growth & Reach" },
    { num: "03", text: "Campaigns That Move the Needle" },
  ];

  const labelOp = spring({ frame: frame - 5, fps, config: { damping: 200 } });

  return (
    <SceneFade durationInFrames={100}>
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 60px",
        }}
      >
        {/* Small logo */}
        <Img
          src={staticFile("logo/MARKERALOGO-trimmed.png")}
          style={{
            position: "absolute",
            top: 100,
            width: 220,
            height: "auto",
            objectFit: "contain",
            opacity: labelOp,
            filter: "drop-shadow(0 6px 20px rgba(0,0,0,0.4))",
          }}
        />

        {/* Section label */}
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 22,
            fontWeight: 600,
            color: brand.colors.gold,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            marginBottom: 44,
            opacity: labelOp,
            transform: `translateY(${interpolate(labelOp, [0, 1], [16, 0])}px)`,
          }}
        >
          What We Do
        </span>

        {/* Glassmorphism cards */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
            width: "100%",
            maxWidth: 900,
          }}
        >
          {items.map((item, i) => {
            const s = spring({
              frame: frame - 14 - i * 10,
              fps,
              config: { damping: 13, stiffness: 110 },
            });
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 28,
                  padding: "26px 38px",
                  borderRadius: 20,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(201,168,124,0.15)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  opacity: s,
                  transform: `translateX(${interpolate(s, [0, 1], [60, 0])}px)`,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 54,
                    fontWeight: 700,
                    color: brand.colors.gold,
                    opacity: 0.35,
                    minWidth: 65,
                    lineHeight: 1,
                    textAlign: "center",
                  }}
                >
                  {item.num}
                </span>
                <div
                  style={{
                    width: 2,
                    alignSelf: "stretch",
                    background: `linear-gradient(180deg, transparent, ${brand.colors.gold}, transparent)`,
                    opacity: 0.4,
                    borderRadius: 2,
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 33,
                    fontWeight: 500,
                    color: brand.colors.text,
                    letterSpacing: "-0.01em",
                    lineHeight: 1.3,
                  }}
                >
                  {item.text}
                </span>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </SceneFade>
  );
};

/* ═══════════════════════════════════════════════════════
   Scene 4 — CTA  (70 frames / 2.3s)
   ═══════════════════════════════════════════════════════ */
const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoS = spring({ frame: frame - 3, fps, config: { damping: 200 } });
  const tagS = spring({
    frame: frame - 12,
    fps,
    config: { damping: 14, stiffness: 100 },
  });
  const btnS = spring({
    frame: frame - 22,
    fps,
    config: { damping: 11, stiffness: 80 },
  });
  const urlS = spring({ frame: frame - 35, fps, config: { damping: 200 } });

  // Pulsing button glow
  const glowOp = interpolate(
    Math.max(0, frame - 30) % Math.round(1.5 * fps),
    [0, Math.round(0.75 * fps), Math.round(1.5 * fps)],
    [0.3, 0.55, 0.3],
  );

  return (
    <SceneFade durationInFrames={70} noFadeOut>
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 36,
        }}
      >
        {/* Logo */}
        <Img
          src={staticFile("logo/MARKERALOGO-trimmed.png")}
          style={{
            width: 440,
            height: "auto",
            objectFit: "contain",
            opacity: logoS,
            transform: `scale(${logoS})`,
            filter: "drop-shadow(0 12px 48px rgba(0,0,0,0.6))",
          }}
        />

        {/* Tagline */}
        <span
          style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            fontSize: 42,
            fontWeight: 400,
            color: brand.colors.goldLight,
            textAlign: "center",
            letterSpacing: "0.02em",
            opacity: tagS,
            transform: `translateY(${interpolate(tagS, [0, 1], [25, 0])}px)`,
            textShadow: "0 4px 16px rgba(201,168,124,0.15)",
          }}
        >
          Partnerships That Last.
        </span>

        {/* CTA button */}
        <div
          style={{
            padding: "26px 60px",
            borderRadius: 999,
            background: `linear-gradient(135deg, ${brand.colors.gold}, ${brand.colors.goldDark})`,
            color: "#fff",
            fontSize: 26,
            fontWeight: 700,
            fontFamily: "'Inter', sans-serif",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            transform: `scale(${btnS})`,
            opacity: btnS,
            boxShadow: `0 8px 32px rgba(201,168,124,${glowOp}), 0 2px 8px rgba(0,0,0,0.4)`,
          }}
        >
          Join the Network
        </div>

        {/* URL */}
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 24,
            fontWeight: 400,
            color: brand.colors.text,
            opacity: urlS * 0.65,
            letterSpacing: "0.08em",
          }}
        >
          markeramedia.com
        </span>
      </AbsoluteFill>
    </SceneFade>
  );
};

/* ═══════════════════════════════════════════════════════
   Main composition — 310 frames / ~10.3s at 30fps
   ═══════════════════════════════════════════════════════ */
export const BrandReel: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: brand.colors.bgDarker,
        fontFamily: "'Inter', sans-serif",
        color: brand.colors.text,
      }}
    >
      <AnimatedBg />

      <div
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          height: "100%",
        }}
      >
        {/* Scene 1: Logo reveal */}
        <Sequence from={0} durationInFrames={80} premountFor={30}>
          <LogoRevealScene />
        </Sequence>

        {/* Scene 2: Tagline (crossfades with scene 1) */}
        <Sequence from={70} durationInFrames={90} premountFor={30}>
          <TaglineScene />
        </Sequence>

        {/* Scene 3: Value props (crossfades with scene 2) */}
        <Sequence from={150} durationInFrames={100} premountFor={30}>
          <ValuePropsScene />
        </Sequence>

        {/* Scene 4: CTA (crossfades with scene 3) */}
        <Sequence from={240} durationInFrames={70} premountFor={30}>
          <CTAScene />
        </Sequence>
      </div>
    </AbsoluteFill>
  );
};
