import {
  AbsoluteFill,
  Img,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
  Easing,
} from "remotion";
import { brand } from "./brand";

/* ── Kinetic background — more energetic than the luxury intros ── */
const KineticBg: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  // Faster breathing for urgency
  const goldPulse = 0.08 + 0.12 * Math.sin(t * Math.PI * 1.2);
  const indigoPulse = 0.06 + 0.1 * Math.sin(t * Math.PI * 0.9 + 1);

  // Scanning line effect
  const scanY = interpolate(frame % 120, [0, 120], [-200, 2200]);

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {/* Gold orb — moves faster */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${brand.colors.gold} 0%, transparent 70%)`,
          filter: "blur(120px)",
          opacity: goldPulse,
          top: "10%",
          right: "-10%",
          pointerEvents: "none",
        }}
      />

      {/* Indigo orb */}
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${brand.colors.indigo} 0%, transparent 70%)`,
          filter: "blur(140px)",
          opacity: indigoPulse,
          bottom: "5%",
          left: "-15%",
          pointerEvents: "none",
        }}
      />

      {/* Horizontal scan line */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: scanY,
          height: 1,
          background: `linear-gradient(90deg, transparent 0%, ${brand.colors.gold}22 30%, ${brand.colors.gold}44 50%, ${brand.colors.gold}22 70%, transparent 100%)`,
          pointerEvents: "none",
        }}
      />

      {/* Subtle grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.03,
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "54px 54px",
        }}
      />

      {/* Noise */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.025,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "128px 128px",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

/* ── Scene fade wrapper (opacity only) ── */
const SceneFade: React.FC<{
  children: React.ReactNode;
  dur: number;
  fadeIn?: number;
  fadeOut?: number;
  noExit?: boolean;
}> = ({ children, dur, fadeIn = 8, fadeOut = 10, noExit = false }) => {
  const frame = useCurrentFrame();
  const enterOp = interpolate(frame, [0, fadeIn], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitOp = noExit
    ? 1
    : interpolate(frame, [dur - fadeOut, dur], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
  return (
    <AbsoluteFill style={{ opacity: enterOp * exitOp }}>{children}</AbsoluteFill>
  );
};

/* ── Animated counter (counts up to a number) ── */
const AnimatedNumber: React.FC<{
  value: number;
  prefix?: string;
  suffix?: string;
  startFrame?: number;
  duration?: number;
  fontSize?: number;
  color?: string;
}> = ({
  value,
  prefix = "",
  suffix = "",
  startFrame = 0,
  duration = 20,
  fontSize = 180,
  color = brand.colors.gold,
}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame - startFrame, [0, duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });
  const displayVal = Math.round(value * progress);

  return (
    <span
      style={{
        fontFamily: "'Inter', sans-serif",
        fontSize,
        fontWeight: 900,
        color,
        letterSpacing: "-0.04em",
        lineHeight: 1,
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {prefix}
      {displayVal}
      {suffix}
    </span>
  );
};

/* ═══════════════════════════════════════════════════════
   Scene 1 — HOOK: "$235B" impact stat  (70 frames)
   ═══════════════════════════════════════════════════════ */
const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Number slams in with heavy spring
  const numScale = spring({
    frame: frame - 3,
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  // Impact flash
  const flashOp = interpolate(frame, [3, 8, 18], [0, 0.25, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtitle slides up
  const subS = spring({
    frame: frame - 18,
    fps,
    config: { damping: 200 },
  });

  // Bottom tag
  const tagS = spring({
    frame: frame - 28,
    fps,
    config: { damping: 200 },
  });

  return (
    <SceneFade dur={70}>
      {/* Impact flash */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at 50% 45%, ${brand.colors.gold}, transparent 60%)`,
          opacity: flashOp,
          pointerEvents: "none",
        }}
      />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 56px",
        }}
      >
        {/* The big number */}
        <div
          style={{
            transform: `scale(${interpolate(numScale, [0, 1], [1.4, 1])})`,
            opacity: numScale,
            display: "flex",
            alignItems: "baseline",
            gap: 4,
          }}
        >
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 72,
              fontWeight: 900,
              color: brand.colors.goldLight,
              letterSpacing: "-0.02em",
              lineHeight: 1,
              marginRight: 4,
            }}
          >
            $
          </span>
          <AnimatedNumber
            value={235}
            suffix=""
            startFrame={5}
            duration={22}
            fontSize={200}
          />
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 100,
              fontWeight: 900,
              color: brand.colors.gold,
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            B
          </span>
        </div>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 38,
            fontWeight: 500,
            color: brand.colors.text,
            textAlign: "center",
            marginTop: 32,
            opacity: subS,
            transform: `translateY(${interpolate(subS, [0, 1], [30, 0])}px)`,
            letterSpacing: "-0.01em",
            lineHeight: 1.4,
          }}
        >
          That's the creator economy
          <br />
          <span style={{ color: "#fff", fontWeight: 700 }}>in 2026.</span>
        </p>

        {/* Source tag */}
        <span
          style={{
            position: "absolute",
            bottom: 120,
            fontFamily: "'Inter', sans-serif",
            fontSize: 18,
            fontWeight: 400,
            color: brand.colors.gold,
            opacity: tagS * 0.5,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          And it's growing 22% YoY
        </span>
      </AbsoluteFill>
    </SceneFade>
  );
};

/* ═══════════════════════════════════════════════════════
   Scene 2 — THE SHIFT: Marketers moving budgets (75 frames)
   ═══════════════════════════════════════════════════════ */
const ShiftScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Label enters
  const labelS = spring({
    frame: frame - 4,
    fps,
    config: { damping: 200 },
  });

  // Percentage counter
  const pctS = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // Progress bar fill
  const barFill = interpolate(frame, [12, 40], [0, 61], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  // Bottom text
  const bottomS = spring({
    frame: frame - 35,
    fps,
    config: { damping: 200 },
  });

  // Stat cards
  const card1S = spring({
    frame: frame - 40,
    fps,
    config: { damping: 15, stiffness: 130 },
  });
  const card2S = spring({
    frame: frame - 48,
    fps,
    config: { damping: 15, stiffness: 130 },
  });

  return (
    <SceneFade dur={75}>
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 64px",
        }}
      >
        {/* Section label */}
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 20,
            fontWeight: 600,
            color: brand.colors.indigoLight,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            marginBottom: 48,
            opacity: labelS,
            transform: `translateY(${interpolate(labelS, [0, 1], [16, 0])}px)`,
          }}
        >
          The Shift Is Happening
        </span>

        {/* Big percentage */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            opacity: pctS,
            transform: `scale(${interpolate(pctS, [0, 1], [0.8, 1])})`,
          }}
        >
          <AnimatedNumber
            value={61}
            suffix="%"
            startFrame={10}
            duration={18}
            fontSize={160}
          />
        </div>

        {/* Explanation */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 34,
            fontWeight: 500,
            color: brand.colors.text,
            textAlign: "center",
            marginTop: 20,
            opacity: pctS,
            lineHeight: 1.4,
            letterSpacing: "-0.01em",
          }}
        >
          of marketers are{" "}
          <span style={{ color: "#fff", fontWeight: 700 }}>
            shifting budgets
          </span>
          <br />
          to creator partnerships
        </p>

        {/* Animated progress bar */}
        <div
          style={{
            width: "100%",
            maxWidth: 700,
            height: 16,
            borderRadius: 8,
            background: "rgba(255,255,255,0.06)",
            marginTop: 40,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div
            style={{
              width: `${barFill}%`,
              height: "100%",
              borderRadius: 8,
              background: `linear-gradient(90deg, ${brand.colors.indigo}, ${brand.colors.gold})`,
              boxShadow: `0 0 20px ${brand.colors.gold}44`,
            }}
          />
        </div>

        {/* Two stat cards */}
        <div
          style={{
            display: "flex",
            gap: 24,
            marginTop: 56,
            width: "100%",
            maxWidth: 700,
          }}
        >
          <div
            style={{
              flex: 1,
              padding: "28px 24px",
              borderRadius: 18,
              background: "rgba(255,255,255,0.03)",
              border: `1px solid ${brand.colors.gold}22`,
              textAlign: "center",
              opacity: card1S,
              transform: `translateY(${interpolate(card1S, [0, 1], [30, 0])}px)`,
            }}
          >
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 42,
                fontWeight: 800,
                color: brand.colors.gold,
                display: "block",
              }}
            >
              -19%
            </span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 18,
                fontWeight: 500,
                color: brand.colors.text,
                opacity: 0.75,
                marginTop: 6,
                display: "block",
              }}
            >
              Lower CPA
            </span>
          </div>
          <div
            style={{
              flex: 1,
              padding: "28px 24px",
              borderRadius: 18,
              background: "rgba(255,255,255,0.03)",
              border: `1px solid ${brand.colors.indigo}22`,
              textAlign: "center",
              opacity: card2S,
              transform: `translateY(${interpolate(card2S, [0, 1], [30, 0])}px)`,
            }}
          >
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 42,
                fontWeight: 800,
                color: brand.colors.indigoLight,
                display: "block",
              }}
            >
              +13%
            </span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 18,
                fontWeight: 500,
                color: brand.colors.text,
                opacity: 0.75,
                marginTop: 6,
                display: "block",
              }}
            >
              Higher CTR
            </span>
          </div>
        </div>

        {/* Bottom note */}
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 18,
            fontWeight: 400,
            color: brand.colors.text,
            opacity: bottomS * 0.45,
            marginTop: 32,
            letterSpacing: "0.04em",
          }}
        >
          vs. traditional ad spend
        </span>
      </AbsoluteFill>
    </SceneFade>
  );
};

/* ═══════════════════════════════════════════════════════
   Scene 3 — THE PROBLEM: One-off deals (70 frames)
   ═══════════════════════════════════════════════════════ */
const ProblemScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lines = [
    "One post.",
    "One check.",
    "Done.",
  ];

  // Each line appears then gets struck through
  const lineAnimations = lines.map((_, i) => {
    const enterDelay = 6 + i * 14;
    const enter = spring({
      frame: frame - enterDelay,
      fps,
      config: { damping: 20, stiffness: 200 },
    });
    // Strikethrough starts after all lines are shown
    const strikeDelay = 48 + i * 3;
    const strike = interpolate(frame - strikeDelay, [0, 6], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.quad),
    });
    return { enter, strike };
  });

  // "But" label enters
  const butS = spring({
    frame: frame - 2,
    fps,
    config: { damping: 200 },
  });

  // "Sound familiar?" at bottom
  const familiarS = spring({
    frame: frame - 52,
    fps,
    config: { damping: 200 },
  });

  return (
    <SceneFade dur={70}>
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 72px",
        }}
      >
        {/* Top label */}
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 22,
            fontWeight: 600,
            color: brand.colors.gold,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: 60,
            opacity: butS,
          }}
        >
          But here's the problem
        </span>

        {/* Rapid-fire text with strikethrough */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 28,
          }}
        >
          {lines.map((line, i) => (
            <div
              key={i}
              style={{
                position: "relative",
                opacity: lineAnimations[i].enter,
                transform: `translateX(${interpolate(lineAnimations[i].enter, [0, 1], [80, 0])}px)`,
              }}
            >
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: i === 2 ? 90 : 72,
                  fontWeight: i === 2 ? 900 : 700,
                  color: i === 2 ? "rgba(255,255,255,0.25)" : "#fff",
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                }}
              >
                {line}
              </span>
              {/* Strikethrough line */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "-4%",
                  width: `${lineAnimations[i].strike * 108}%`,
                  height: 4,
                  background: `linear-gradient(90deg, ${brand.colors.gold}, ${brand.colors.indigo})`,
                  borderRadius: 2,
                  transform: "translateY(-50%)",
                }}
              />
            </div>
          ))}
        </div>

        {/* "Sound familiar?" */}
        <p
          style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            fontSize: 36,
            fontWeight: 400,
            color: brand.colors.text,
            marginTop: 64,
            opacity: familiarS * 0.7,
            transform: `translateY(${interpolate(familiarS, [0, 1], [20, 0])}px)`,
            letterSpacing: "0.02em",
          }}
        >
          Sound familiar?
        </p>
      </AbsoluteFill>
    </SceneFade>
  );
};

/* ═══════════════════════════════════════════════════════
   Scene 4 — THE SOLUTION: Markera (80 frames)
   ═══════════════════════════════════════════════════════ */
const SolutionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo entrance
  const logoS = spring({
    frame: frame - 5,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  // Crossing lines — brand signature
  const lineProgress = spring({
    frame: frame - 2,
    fps,
    config: { damping: 200 },
  });
  const lineLen = interpolate(lineProgress, [0, 1], [0, 1400]);

  // Flash on entrance
  const flashOp = interpolate(frame, [5, 12, 24], [0, 0.12, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Tagline
  const tagS = spring({
    frame: frame - 22,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  // Value propositions
  const props = [
    "Long-term partnerships, not one-offs",
    "Authentic creators who fit your brand",
    "Campaigns that actually move the needle",
  ];

  return (
    <SceneFade dur={80}>
      {/* Flash */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at 50% 40%, ${brand.colors.gold}, transparent 55%)`,
          opacity: flashOp,
          pointerEvents: "none",
        }}
      />

      {/* Crossing lines */}
      <div
        style={{
          position: "absolute",
          top: "42%",
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
            height: 2,
            background: `linear-gradient(90deg, transparent, ${brand.colors.gold}66, transparent)`,
            transform: "translate(-50%, -50%) rotate(-45deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: lineLen,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${brand.colors.indigo}44, transparent)`,
            transform: "translate(-50%, -50%) rotate(45deg)",
          }}
        />
      </div>

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 60px",
        }}
      >
        {/* Logo */}
        <Img
          src={staticFile("logo/MARKERALOGO-trimmed.png")}
          style={{
            width: 480,
            height: "auto",
            objectFit: "contain",
            transform: `scale(${interpolate(logoS, [0, 1], [1.2, 1])})`,
            opacity: logoS,
            filter: "drop-shadow(0 12px 48px rgba(0,0,0,0.5))",
          }}
        />

        {/* Tagline */}
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            fontSize: 46,
            fontWeight: 400,
            color: brand.colors.goldLight,
            textAlign: "center",
            marginTop: 28,
            opacity: tagS,
            transform: `translateY(${interpolate(tagS, [0, 1], [25, 0])}px)`,
            letterSpacing: "0.02em",
            textShadow: "0 4px 16px rgba(201,168,124,0.12)",
          }}
        >
          Partnerships That Last.
        </h2>

        {/* Value props */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            marginTop: 52,
            width: "100%",
            maxWidth: 780,
          }}
        >
          {props.map((text, i) => {
            const s = spring({
              frame: frame - 30 - i * 8,
              fps,
              config: { damping: 20, stiffness: 180 },
            });
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 18,
                  opacity: s,
                  transform: `translateX(${interpolate(s, [0, 1], [50, 0])}px)`,
                }}
              >
                {/* Checkmark */}
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${brand.colors.gold}33, ${brand.colors.indigo}33)`,
                    border: `1px solid ${brand.colors.gold}44`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={brand.colors.gold}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
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
          })}
        </div>
      </AbsoluteFill>
    </SceneFade>
  );
};

/* ═══════════════════════════════════════════════════════
   Scene 5 — CTA (65 frames, no exit)
   ═══════════════════════════════════════════════════════ */
const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headS = spring({
    frame: frame - 5,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  const btnS = spring({
    frame: frame - 18,
    fps,
    config: { damping: 11, stiffness: 80 },
  });

  const urlS = spring({
    frame: frame - 30,
    fps,
    config: { damping: 200 },
  });

  // Pulsing glow on button
  const glowOp = interpolate(
    Math.max(0, frame - 25) % Math.round(1.5 * fps),
    [0, Math.round(0.75 * fps), Math.round(1.5 * fps)],
    [0.25, 0.5, 0.25],
  );

  return (
    <SceneFade dur={65} noExit>
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 40,
        }}
      >
        {/* Logo */}
        <Img
          src={staticFile("logo/MARKERALOGO-trimmed.png")}
          style={{
            width: 380,
            height: "auto",
            objectFit: "contain",
            opacity: headS,
            transform: `scale(${headS})`,
            filter: "drop-shadow(0 12px 48px rgba(0,0,0,0.6))",
          }}
        />

        {/* CTA headline */}
        <h2
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 48,
            fontWeight: 800,
            color: "#fff",
            textAlign: "center",
            letterSpacing: "-0.02em",
            lineHeight: 1.25,
            opacity: headS,
            transform: `translateY(${interpolate(headS, [0, 1], [30, 0])}px)`,
          }}
        >
          Don't get left behind.
          <br />
          <span style={{ color: brand.colors.goldLight }}>
            Build real partnerships.
          </span>
        </h2>

        {/* CTA button */}
        <div
          style={{
            padding: "28px 64px",
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
          Get Started
        </div>

        {/* URL */}
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 24,
            fontWeight: 400,
            color: brand.colors.text,
            opacity: urlS * 0.6,
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
   Main — 360 frames / 12s at 30fps
   ═══════════════════════════════════════════════════════ */
export const BrandReel3: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: brand.colors.bgDarker,
        fontFamily: "'Inter', sans-serif",
        color: brand.colors.text,
      }}
    >
      <KineticBg />

      <div
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          height: "100%",
        }}
      >
        {/* Scene 1: Hook — $235B (70f) */}
        <Sequence from={0} durationInFrames={70} premountFor={30}>
          <HookScene />
        </Sequence>

        {/* Scene 2: The Shift — 61% (75f, crossfade) */}
        <Sequence from={62} durationInFrames={75} premountFor={30}>
          <ShiftScene />
        </Sequence>

        {/* Scene 3: The Problem — One-offs (70f, crossfade) */}
        <Sequence from={130} durationInFrames={70} premountFor={30}>
          <ProblemScene />
        </Sequence>

        {/* Scene 4: The Solution — Markera (80f, crossfade) */}
        <Sequence from={193} durationInFrames={80} premountFor={30}>
          <SolutionScene />
        </Sequence>

        {/* Scene 5: CTA (65f, no exit) */}
        <Sequence from={265} durationInFrames={65} premountFor={30}>
          <CTAScene />
        </Sequence>
      </div>
    </AbsoluteFill>
  );
};
