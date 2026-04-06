import React from "react";
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
import { Flag, X } from "lucide-react";
import { brand } from "./brand";

/* ── Brand accent: warm amber-red for 'danger' that sits with the gold palette ── */
const WARN = "#c45a3c"; // warm amber-red — blends with brand gold

/* ── Static background layer — memoized, renders ONCE ── */
const StaticBg = React.memo(() => (
  <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
    {/* Base spotlight */}
    <div
      style={{
        position: "absolute",
        inset: 0,
        background:
          "radial-gradient(circle at 50% 30%, rgba(201,168,124,0.04) 0%, transparent 60%)",
      }}
    />
    {/* Grid */}
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: 0.025,
        backgroundImage:
          "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }}
    />
  </div>
));

/* ── Animated orbs only — updates every frame but is minimal ── */
const AnimatedBg: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const goldBreath = 0.12 + 0.1 * Math.sin(t * Math.PI * 0.57);
  const redBreath = 0.08 + 0.08 * Math.sin(t * Math.PI * 0.4 + 1.2);

  const drift = interpolate(frame, [0, 660], [0, 80], {
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {/* Gold Orb */}
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${brand.colors.gold} 0%, transparent 70%)`,
          filter: "blur(80px)",
          opacity: goldBreath,
          top: -180,
          left: -160 + drift * 0.3,
          willChange: "opacity, transform",
          transform: "translateZ(0)",
        }}
      />
      {/* Indigo Orb */}
      <div
        style={{
          position: "absolute",
          width: 900,
          height: 900,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${brand.colors.indigo} 0%, transparent 70%)`,
          filter: "blur(90px)",
          opacity: redBreath * 0.8,
          bottom: -250,
          right: -200 + drift * 0.2,
          willChange: "opacity, transform",
          transform: "translateZ(0)",
        }}
      />
      {/* Small gold accent orb */}
      <div
        style={{
          position: "absolute",
          width: 350,
          height: 350,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${brand.colors.goldLight} 0%, transparent 70%)`,
          filter: "blur(50px)",
          opacity: goldBreath * 0.35,
          top: "45%",
          right: "5%",
          willChange: "opacity",
          transform: "translateZ(0)",
        }}
      />
    </div>
  );
};

/* ── Scene crossfade ── */
const SceneFade: React.FC<{
  children: React.ReactNode;
  dur: number;
  noExit?: boolean;
}> = ({ children, dur, noExit }) => {
  const frame = useCurrentFrame();
  const inOp = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const outOp = noExit
    ? 1
    : interpolate(frame, [dur - 10, dur], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
  return (
    <AbsoluteFill style={{ opacity: inOp * outOp }}>{children}</AbsoluteFill>
  );
};

/* ═══════════════════════════════════════
   Scene 1 — Hook (90 frames / 3s)
   ═══════════════════════════════════════ */
const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const preTextS = spring({ frame: frame - 5, fps, config: { damping: 200 } });
  const flagScale = spring({ frame: frame - 15, fps, config: { damping: 10, stiffness: 150 } });
  const runTextOp = spring({ frame: frame - 25, fps, config: { damping: 200 } });
  const runScale = spring({ frame: frame - 25, fps, config: { damping: 12, stiffness: 100 } });

  // Shake effect for the "RUN" text
  const shake = interpolate(frame - 25, [0, 5, 10, 15, 20], [0, -10, 10, -5, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <SceneFade dur={90}>
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 60px",
        }}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 48,
            fontWeight: 500,
            color: "#e4e4e7",
            opacity: preTextS,
            transform: `translateY(${interpolate(preTextS, [0, 1], [30, 0])}px)`,
            marginBottom: 20,
            textAlign: "center"
          }}
        >
          If a brand says this...
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: 20, transform: `translateX(${shake}px)` }}>
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 160,
              fontWeight: 900,
              color: WARN,
              opacity: runTextOp,
              transform: `scale(${runScale})`,
              textShadow: `0 10px 40px ${WARN}66`,
            }}
          >
            RUN
          </span>
          <div style={{ transform: `scale(${flagScale})` }}>
            <Flag size={120} color={WARN} fill={WARN} />
          </div>
        </div>
      </AbsoluteFill>
    </SceneFade>
  );
};

/* ═══════════════════════════════════════
   Scene 2 — The 5 Flags (5 cuts)
   Each flag gets 90 frames (3s). Total = 450 frames.
   ═══════════════════════════════════════ */
const FlagCard: React.FC<{ index: number; quote: string; caption: string }> = ({ index, quote, caption }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideS = spring({ frame, fps, config: { damping: 14, stiffness: 120 } });
  const quoteOp = spring({ frame: frame - 10, fps, config: { damping: 200 } });
  const captionOp = spring({ frame: frame - 20, fps, config: { damping: 200 } });

  return (
    <SceneFade dur={90}>
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 40px",
        }}
      >
        {/* Glassmorphic Card */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "50px 40px",
            borderRadius: 32,
            background: "rgba(17,17,19,0.85)",
            border: `1px solid rgba(201,168,124,0.15)`,
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            opacity: slideS,
            transform: `translateY(${interpolate(slideS, [0, 1], [60, 0])}px)`,
            width: "100%",
            maxWidth: 800,
            textAlign: "center",
          }}
        >
          {/* Flag Icon & Counter */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 30 }}>
            <Flag size={36} color={WARN} fill={WARN} />
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 28,
                fontWeight: 700,
                color: brand.colors.gold,
                letterSpacing: "0.1em",
              }}
            >
              FLAG 0{index}
            </span>
          </div>

          {/* The Quote */}
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              fontSize: 56,
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.2,
              marginBottom: 40,
              opacity: quoteOp,
            }}
          >
            "{quote}"
          </span>

          {/* The Correcting Caption */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              padding: "16px 28px",
              background: `rgba(201,168,124,0.08)`,
              border: `1px solid rgba(201,168,124,0.12)`,
              borderRadius: 16,
              opacity: captionOp,
              transform: `translateY(${interpolate(captionOp, [0, 1], [15, 0])}px)`,
            }}
          >
            <X size={28} color={brand.colors.goldLight} />
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 26,
                fontWeight: 500,
                color: "#e4e4e7",
              }}
            >
              {caption}
            </span>
          </div>
        </div>
      </AbsoluteFill>
    </SceneFade>
  );
};

const FlagsSequence: React.FC = () => {
  const flags = [
    {
      quote: "We'll pay you in exposure.",
      caption: "Exposure doesn't pay rent.",
    },
    {
      quote: "Can you do it for free? It's great for your portfolio.",
      caption: "Your content has value.",
    },
    {
      quote: "We need unlimited revisions.",
      caption: "No scope = no deal.",
    },
    {
      quote: "We own all your content forever.",
      caption: "Know your rights.",
    },
    {
      quote: "Our last creator did it for $50.",
      caption: "That's their problem, not yours.",
    },
  ];

  return (
    <>
      {flags.map((flag, idx) => (
        <Sequence key={idx} from={idx * 90} durationInFrames={90} premountFor={15}>
          <FlagCard index={idx + 1} quote={flag.quote} caption={flag.caption} />
        </Sequence>
      ))}
    </>
  );
};

/* ═══════════════════════════════════════
   Scene 3 — Outro/CTA (120 frames / 4s)
   ═══════════════════════════════════════ */
const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleS = spring({ frame: frame - 5, fps, config: { damping: 200 } });
  const logoS = spring({ frame: frame - 25, fps, config: { damping: 15, stiffness: 100 } });
  const ctaS = spring({ frame: frame - 40, fps, config: { damping: 200 } });

  return (
    <SceneFade dur={120} noExit>
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 60px",
        }}
      >
        <span
          style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            fontSize: 52,
            fontWeight: 400,
            color: brand.colors.goldLight,
            textAlign: "center",
            lineHeight: 1.3,
            opacity: titleS,
            transform: `translateY(${interpolate(titleS, [0, 1], [30, 0])}px)`,
            marginBottom: 60,
          }}
        >
          You deserve better partnerships.
        </span>

        <Img
          src={staticFile("logo/MARKERALOGO-trimmed.png")}
          style={{
            width: 500,
            height: "auto",
            objectFit: "contain",
            opacity: logoS,
            transform: `scale(${logoS})`,
            filter: "drop-shadow(0 12px 48px rgba(0,0,0,0.6))",
            marginBottom: 50,
          }}
        />

        <div
          style={{
            padding: "24px 50px",
            borderRadius: 999,
            background: `linear-gradient(135deg, ${brand.colors.gold}, ${brand.colors.goldDark})`,
            color: "#fff",
            fontSize: 26,
            fontWeight: 700,
            fontFamily: "'Inter', sans-serif",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            opacity: ctaS,
            transform: `translateY(${interpolate(ctaS, [0, 1], [20, 0])}px)`,
            boxShadow: "0 8px 32px rgba(201,168,124,0.4), 0 2px 8px rgba(0,0,0,0.4)",
          }}
        >
          DM us "READY"
        </div>
      </AbsoluteFill>
    </SceneFade>
  );
};

/* ═══════════════════════════════════════
   Main Composition
   Total frames:
   Hook: 90
   5 Flags * 90: 450
   Outro: 120
   Total: 660 frames @ 30fps = 22s
   ═══════════════════════════════════════ */
export const RedFlagsReel: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: brand.colors.bgDarker,
        fontFamily: "'Inter', sans-serif",
        color: brand.colors.text,
      }}
    >
      <StaticBg />
      <AnimatedBg />

      <div
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          height: "100%",
        }}
      >
        <Sequence from={0} durationInFrames={90} premountFor={30}>
          <HookScene />
        </Sequence>

        <Sequence from={90} durationInFrames={450} premountFor={30}>
          <FlagsSequence />
        </Sequence>

        <Sequence from={540} durationInFrames={120} premountFor={30}>
          <OutroScene />
        </Sequence>
      </div>
    </AbsoluteFill>
  );
};
