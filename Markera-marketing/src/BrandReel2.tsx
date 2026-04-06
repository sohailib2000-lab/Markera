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
import {
  Target,
  TrendingUp,
  Shield,
  DollarSign,
  Handshake,
  Globe,
} from "lucide-react";
import { brand } from "./brand";

/* ── Animated background ── */
const AnimatedBg: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const goldBreath = 0.12 + 0.1 * Math.sin(t * Math.PI * 0.57);
  const indigoBreath = 0.08 + 0.08 * Math.sin(t * Math.PI * 0.4 + 1.2);

  const scene3 = interpolate(frame, [150, 200, 230, 240], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scene4 = interpolate(frame, [230, 280, 310, 320], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const drift = interpolate(frame, [0, 385], [0, 50], {
    extrapolateRight: "clamp",
  });

  const particles = Array.from({ length: 16 }, (_, i) => ({
    x: 60 + ((i * 83) % 960),
    y: 60 + ((i * 149) % 1800),
    size: 2 + (i % 3),
    color:
      i % 3 === 0
        ? brand.colors.gold
        : i % 3 === 1
          ? brand.colors.indigoLight
          : brand.colors.goldLight,
    speed: 6 + (i % 4) * 3,
    phase: i * 0.9,
  }));

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 30%, rgba(201,168,124,0.07) 0%, transparent 55%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${brand.colors.gold} 0%, transparent 70%)`,
          filter: "blur(110px)",
          opacity: goldBreath * (0.9 + scene3 * 0.4),
          top: -180,
          left: -160 + drift * 0.3,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 900,
          height: 900,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${brand.colors.indigo} 0%, transparent 70%)`,
          filter: "blur(130px)",
          opacity: indigoBreath * (0.9 + scene4 * 0.5),
          bottom: -250,
          right: -200 + drift * 0.2,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 350,
          height: 350,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${brand.colors.goldLight} 0%, transparent 70%)`,
          filter: "blur(60px)",
          opacity: goldBreath * 0.35,
          top: "45%",
          right: "5%",
        }}
      />
      {[
        { x: "12%", y: "15%", r: 160, color: brand.colors.gold, op: 0.05 },
        { x: "80%", y: "65%", r: 220, color: brand.colors.indigo, op: 0.04 },
        { x: "68%", y: "10%", r: 90, color: brand.colors.goldLight, op: 0.04 },
        { x: "8%", y: "75%", r: 120, color: brand.colors.gold, op: 0.035 },
        { x: "85%", y: "35%", r: 70, color: brand.colors.indigoLight, op: 0.04 },
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
            opacity: c.op + 0.01 * Math.sin(t * 2 + i),
          }}
        />
      ))}
      {particles.map((p, i) => (
        <div
          key={`p${i}`}
          style={{
            position: "absolute",
            left: p.x + Math.sin(t * 0.5 + p.phase) * 20,
            top: p.y - t * p.speed,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: p.color,
            opacity: 0.07 + 0.06 * Math.sin(t * 1.8 + p.phase),
          }}
        />
      ))}
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
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.035,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "128px 128px",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

/* ── Scene crossfade (opacity only) ── */
const SceneFade: React.FC<{
  children: React.ReactNode;
  dur: number;
  noExit?: boolean;
}> = ({ children, dur, noExit }) => {
  const frame = useCurrentFrame();
  const inOp = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const outOp = noExit
    ? 1
    : interpolate(frame, [dur - 14, dur], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
  return (
    <AbsoluteFill style={{ opacity: inOp * outOp }}>{children}</AbsoluteFill>
  );
};

/* ── Small helpers ── */
const AnimatedRule: React.FC<{ delay: number; width?: number }> = ({
  delay,
  width = 140,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const w = interpolate(
    spring({ frame: frame - delay, fps, config: { damping: 200 } }),
    [0, 1],
    [0, width],
  );
  return (
    <div
      style={{
        width: w,
        height: 2,
        background: `linear-gradient(90deg, transparent, ${brand.colors.gold}, transparent)`,
        opacity: 0.6,
      }}
    />
  );
};

const Pill: React.FC<{ text: string; delay: number; color?: string }> = ({
  text,
  delay,
  color = brand.colors.gold,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 120 },
  });
  return (
    <span
      style={{
        padding: "10px 24px",
        borderRadius: 999,
        border: `1px solid ${color}33`,
        background: `${color}0a`,
        fontFamily: "'Inter', sans-serif",
        fontSize: 18,
        fontWeight: 500,
        color,
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        opacity: s,
        transform: `scale(${s})`,
      }}
    >
      {text}
    </span>
  );
};

const ValueCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  desc: string;
  delay: number;
  accent?: string;
}> = ({ icon, title, desc, delay, accent = brand.colors.gold }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({
    frame: frame - delay,
    fps,
    config: { damping: 13, stiffness: 110 },
  });
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 22,
        padding: "22px 32px",
        borderRadius: 18,
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${accent}18`,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        opacity: s,
        transform: `translateX(${interpolate(s, [0, 1], [50, 0])}px)`,
      }}
    >
      <div style={{ marginTop: 4, flexShrink: 0 }}>{icon}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 30,
            fontWeight: 600,
            color: "#fff",
          }}
        >
          {title}
        </span>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 22,
            fontWeight: 400,
            color: "rgba(228,228,231,0.65)",
            lineHeight: 1.35,
          }}
        >
          {desc}
        </span>
      </div>
    </div>
  );
};

/* ── Pinned logo at top of each scene ── */
const TopLogo: React.FC<{ delay?: number; width?: number }> = ({
  delay = 3,
  width = 220,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const op = spring({ frame: frame - delay, fps, config: { damping: 200 } });
  return (
    <div
      style={{
        position: "absolute",
        top: 90,
        left: 0,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        zIndex: 5,
      }}
    >
      <Img
        src={staticFile("logo/MARKERALOGO-trimmed.png")}
        style={{
          width,
          height: "auto",
          objectFit: "contain",
          opacity: op,
          filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.5))",
        }}
      />
    </div>
  );
};

/* ── Pinned element at bottom ── */
const BottomAnchor: React.FC<{
  children: React.ReactNode;
  delay?: number;
}> = ({ children, delay = 40 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const op = spring({ frame: frame - delay, fps, config: { damping: 200 } });
  return (
    <div
      style={{
        position: "absolute",
        bottom: 80,
        left: 0,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        opacity: op * 0.7,
        zIndex: 5,
      }}
    >
      {children}
    </div>
  );
};

/* ═══════════════════════════════════════
   Scene 1 — Hook  (80 frames)
   ═══════════════════════════════════════ */
const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 80 },
  });
  const logoOp = interpolate(frame, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
  });
  const logoBlur = interpolate(logoScale, [0, 0.7, 1], [10, 2, 0]);

  const lineP = spring({ frame: frame - 6, fps, config: { damping: 200 } });
  const lineLen = interpolate(lineP, [0, 1], [0, 1400]);

  const flashOp = interpolate(frame, [6, 14, 28], [0, 0.15, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const labelS = spring({ frame: frame - 14, fps, config: { damping: 200 } });
  const w1 = spring({
    frame: frame - 18,
    fps,
    config: { damping: 13, stiffness: 90 },
  });
  const w2 = spring({
    frame: frame - 24,
    fps,
    config: { damping: 13, stiffness: 90 },
  });
  const descS = spring({ frame: frame - 34, fps, config: { damping: 200 } });
  const bottomS = spring({ frame: frame - 42, fps, config: { damping: 200 } });

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
          width: 1200,
          height: 1200,
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

      {/* Centered content */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 56px",
          gap: 0,
        }}
      >
        {/* Logo — part of centered flow in hook scene */}
        <Img
          src={staticFile("logo/MARKERALOGO-trimmed.png")}
          style={{
            width: 500,
            height: "auto",
            objectFit: "contain",
            transform: `scale(${interpolate(logoScale, [0, 1], [1.15, 1])})`,
            filter: `blur(${logoBlur}px) drop-shadow(0 15px 50px rgba(0,0,0,0.7))`,
            opacity: logoOp,
            marginBottom: 40,
          }}
        />

        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 26,
            fontWeight: 700,
            color: brand.colors.gold,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            opacity: labelS,
            transform: `translateY(${interpolate(labelS, [0, 1], [20, 0])}px)`,
            marginBottom: 12,
          }}
        >
          The Future of
        </span>

        <span
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 156,
            fontWeight: 900,
            color: "#ffffff",
            lineHeight: 0.85,
            letterSpacing: "-0.04em",
            opacity: w1,
            transform: `translateY(${interpolate(w1, [0, 1], [50, 0])}px)`,
          }}
        >
          Creator
        </span>

        <span
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 104,
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
            opacity: w2,
            transform: `translateY(${interpolate(w2, [0, 1], [40, 0])}px)`,
            background: `linear-gradient(135deg, ${brand.colors.goldLight}, ${brand.colors.gold}, ${brand.colors.goldDark})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: 40,
          }}
        >
          Partnerships
        </span>

        <AnimatedRule delay={30} width={140} />

        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 30,
            fontWeight: 400,
            color: brand.colors.text,
            textAlign: "center",
            lineHeight: 1.5,
            opacity: descS,
            transform: `translateY(${interpolate(descS, [0, 1], [20, 0])}px)`,
            maxWidth: 720,
            marginTop: 36,
          }}
        >
          Connecting brands with authentic creators
          <br />
          for collaborations that drive{" "}
          <span style={{ color: brand.colors.goldLight, fontWeight: 700 }}>
            real results
          </span>
          .
        </span>
      </AbsoluteFill>

      {/* Bottom URL */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: 0,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 20,
          opacity: bottomS * 0.6,
        }}
      >
        <div
          style={{ width: 50, height: 1, background: brand.colors.gold, opacity: 0.5 }}
        />
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 22,
            fontWeight: 500,
            color: brand.colors.text,
            letterSpacing: "0.12em",
          }}
        >
          markeramedia.com
        </span>
        <div
          style={{ width: 50, height: 1, background: brand.colors.gold, opacity: 0.5 }}
        />
      </div>
    </SceneFade>
  );
};

/* ═══════════════════════════════════════
   Scene 2 — The Bridge  (90 frames)
   ═══════════════════════════════════════ */
const BridgeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelS = spring({ frame: frame - 6, fps, config: { damping: 200 } });
  const brandsS = spring({
    frame: frame - 12,
    fps,
    config: { damping: 14, stiffness: 100 },
  });
  const xS = spring({ frame: frame - 16, fps, config: { damping: 200 } });
  const xLen = interpolate(xS, [0, 1], [0, 240]);
  const creatorsS = spring({
    frame: frame - 20,
    fps,
    config: { damping: 14, stiffness: 100 },
  });
  const bodyS = spring({ frame: frame - 38, fps, config: { damping: 200 } });

  return (
    <SceneFade dur={90}>
      <TopLogo width={240} />

      {/* Gold accent line left */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: "20%",
          width: 3,
          height: interpolate(
            spring({ frame: frame - 5, fps, config: { damping: 200 } }),
            [0, 1],
            [0, 600],
          ),
          background: `linear-gradient(180deg, transparent, ${brand.colors.gold}44, transparent)`,
        }}
      />

      {/* Centered content */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 56px",
        }}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 22,
            fontWeight: 700,
            color: brand.colors.gold,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            opacity: labelS,
            transform: `translateY(${interpolate(labelS, [0, 1], [15, 0])}px)`,
            marginBottom: 28,
          }}
        >
          We Are the Bridge Between
        </span>

        {/* BRANDS × CREATORS */}
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 124,
            fontWeight: 900,
            color: "#ffffff",
            lineHeight: 0.9,
            letterSpacing: "-0.04em",
            textTransform: "uppercase",
            opacity: brandsS,
            transform: `translateX(${interpolate(brandsS, [0, 1], [-80, 0])}px)`,
          }}
        >
          Brands
        </span>

        {/* X motif */}
        <div
          style={{
            position: "relative",
            width: 240,
            height: 50,
            marginTop: -6,
            marginBottom: -6,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: xLen,
              height: 3,
              background: `linear-gradient(90deg, transparent, ${brand.colors.gold}, transparent)`,
              transform: "translate(-50%, -50%) rotate(-30deg)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: xLen,
              height: 3,
              background: `linear-gradient(90deg, transparent, ${brand.colors.indigo}, transparent)`,
              transform: "translate(-50%, -50%) rotate(30deg)",
            }}
          />
        </div>

        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 124,
            fontWeight: 900,
            lineHeight: 0.9,
            letterSpacing: "-0.04em",
            textTransform: "uppercase",
            opacity: creatorsS,
            transform: `translateX(${interpolate(creatorsS, [0, 1], [80, 0])}px)`,
            background: `linear-gradient(135deg, ${brand.colors.goldLight}, ${brand.colors.gold})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: 32,
          }}
        >
          Creators
        </span>

        <AnimatedRule delay={26} width={180} />

        {/* Pills */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 14,
            marginTop: 32,
            marginBottom: 36,
          }}
        >
          <Pill text="Authentic" delay={30} />
          <Pill text="Strategic" delay={33} />
          <Pill text="Impactful" delay={36} />
          <Pill text="Lasting" delay={39} />
        </div>

        {/* Quote */}
        <span
          style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            fontSize: 36,
            fontWeight: 400,
            color: brand.colors.text,
            textAlign: "center",
            lineHeight: 1.4,
            opacity: bodyS,
            transform: `translateY(${interpolate(bodyS, [0, 1], [20, 0])}px)`,
            maxWidth: 720,
          }}
        >
          Simple, honest partnerships that
          <br />
          actually move the needle.
        </span>
      </AbsoluteFill>

      {/* Bottom keywords */}
      <BottomAnchor delay={46}>
        <div style={{ display: "flex", gap: 32 }}>
          {["reach", "value", "growth", "impact"].map((w) => (
            <span
              key={w}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 16,
                fontWeight: 500,
                color: brand.colors.gold,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {w}
            </span>
          ))}
        </div>
      </BottomAnchor>
    </SceneFade>
  );
};

/* ═══════════════════════════════════════
   Scene 3 — For Brands  (90 frames)
   ═══════════════════════════════════════ */
const ForBrandsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelS = spring({ frame: frame - 6, fps, config: { damping: 200 } });
  const h1 = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14, stiffness: 100 },
  });
  const h2 = spring({
    frame: frame - 16,
    fps,
    config: { damping: 14, stiffness: 100 },
  });
  const quoteS = spring({ frame: frame - 55, fps, config: { damping: 200 } });

  return (
    <SceneFade dur={90}>
      <TopLogo />

      {/* Gold accent left */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: "12%",
          width: 4,
          height: interpolate(
            spring({ frame: frame - 3, fps, config: { damping: 200 } }),
            [0, 1],
            [0, 1400],
          ),
          background: `linear-gradient(180deg, ${brand.colors.gold}66, ${brand.colors.gold}22, transparent)`,
          borderRadius: 2,
        }}
      />

      {/* Centered content */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 56px",
        }}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 22,
            fontWeight: 700,
            color: brand.colors.gold,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            opacity: labelS,
            marginBottom: 16,
          }}
        >
          For Brands
        </span>

        <span
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 68,
            fontWeight: 900,
            color: "#ffffff",
            lineHeight: 1,
            textAlign: "center",
            letterSpacing: "-0.02em",
            opacity: h1,
            transform: `translateY(${interpolate(h1, [0, 1], [35, 0])}px)`,
          }}
        >
          Meet Your Perfect
        </span>
        <span
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 68,
            fontWeight: 900,
            color: brand.colors.goldLight,
            lineHeight: 1,
            textAlign: "center",
            letterSpacing: "-0.02em",
            opacity: h2,
            transform: `translateY(${interpolate(h2, [0, 1], [35, 0])}px)`,
            marginBottom: 24,
          }}
        >
          Creative Partner
        </span>

        <AnimatedRule delay={20} />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            width: "100%",
            maxWidth: 960,
            marginTop: 28,
          }}
        >
          <ValueCard
            icon={<Target size={38} strokeWidth={1.5} color={brand.colors.goldLight} />}
            title="Consistent ROI"
            desc="Maximize returns on every single collaboration"
            delay={24}
          />
          <ValueCard
            icon={<TrendingUp size={38} strokeWidth={1.5} color={brand.colors.goldLight} />}
            title="Premium Exposure"
            desc="Reach new high-intent audiences authentically"
            delay={32}
          />
          <ValueCard
            icon={<Shield size={38} strokeWidth={1.5} color={brand.colors.goldLight} />}
            title="Brand Authority"
            desc="Build lasting recognition with target markets"
            delay={40}
          />
        </div>
      </AbsoluteFill>

      {/* Pull quote */}
      <BottomAnchor delay={55}>
        <span
          style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            fontSize: 28,
            color: brand.colors.goldLight,
            opacity: quoteS * 0.8,
            textShadow: "0 4px 16px rgba(201,168,124,0.1)",
          }}
        >
          A Clear Path to Success
        </span>
      </BottomAnchor>
    </SceneFade>
  );
};

/* ═══════════════════════════════════════
   Scene 4 — For Creators  (90 frames)
   ═══════════════════════════════════════ */
const ForCreatorsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelS = spring({ frame: frame - 6, fps, config: { damping: 200 } });
  const h1 = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14, stiffness: 100 },
  });
  const h2 = spring({
    frame: frame - 16,
    fps,
    config: { damping: 14, stiffness: 100 },
  });
  const quoteS = spring({ frame: frame - 55, fps, config: { damping: 200 } });

  return (
    <SceneFade dur={90}>
      <TopLogo />

      {/* Indigo accent right */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: "12%",
          width: 4,
          height: interpolate(
            spring({ frame: frame - 3, fps, config: { damping: 200 } }),
            [0, 1],
            [0, 1400],
          ),
          background: `linear-gradient(180deg, ${brand.colors.indigo}66, ${brand.colors.indigo}22, transparent)`,
          borderRadius: 2,
        }}
      />

      {/* Centered content */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 56px",
        }}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 22,
            fontWeight: 700,
            color: brand.colors.indigoLight,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            opacity: labelS,
            marginBottom: 16,
          }}
        >
          For Creators
        </span>

        <span
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 68,
            fontWeight: 900,
            color: "#ffffff",
            lineHeight: 1,
            textAlign: "center",
            letterSpacing: "-0.02em",
            opacity: h1,
            transform: `translateY(${interpolate(h1, [0, 1], [35, 0])}px)`,
          }}
        >
          It's Time to Boost
        </span>
        <span
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 68,
            fontWeight: 900,
            color: brand.colors.indigoLight,
            lineHeight: 1,
            textAlign: "center",
            letterSpacing: "-0.02em",
            opacity: h2,
            transform: `translateY(${interpolate(h2, [0, 1], [35, 0])}px)`,
            marginBottom: 24,
          }}
        >
          Your Career
        </span>

        <AnimatedRule delay={20} />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            width: "100%",
            maxWidth: 960,
            marginTop: 28,
          }}
        >
          <ValueCard
            icon={<DollarSign size={38} strokeWidth={1.5} color={brand.colors.indigoLight} />}
            title="Profitable Deals"
            desc="Work with brands that value your creative vision"
            delay={24}
            accent={brand.colors.indigo}
          />
          <ValueCard
            icon={<Handshake size={38} strokeWidth={1.5} color={brand.colors.indigoLight} />}
            title="Aligned Partners"
            desc="Forge connections with brands you actually use"
            delay={32}
            accent={brand.colors.indigo}
          />
          <ValueCard
            icon={<Globe size={38} strokeWidth={1.5} color={brand.colors.indigoLight} />}
            title="Global Outreach"
            desc="Take your content strategy to a worldwide stage"
            delay={40}
            accent={brand.colors.indigo}
          />
        </div>
      </AbsoluteFill>

      {/* Pull quote */}
      <BottomAnchor delay={55}>
        <span
          style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            fontSize: 28,
            color: brand.colors.indigoLight,
            opacity: quoteS * 0.8,
            textShadow: "0 4px 16px rgba(99,102,241,0.1)",
          }}
        >
          Work with top brands who value your content
        </span>
      </BottomAnchor>
    </SceneFade>
  );
};

/* ═══════════════════════════════════════
   Scene 5 — CTA  (75 frames, no exit)
   ═══════════════════════════════════════ */
const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lineP = spring({ frame: frame - 3, fps, config: { damping: 200 } });
  const lineLen = interpolate(lineP, [0, 1], [0, 1000]);

  const logoS = spring({ frame: frame - 5, fps, config: { damping: 200 } });
  const tag1 = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14, stiffness: 100 },
  });
  const tag2 = spring({
    frame: frame - 16,
    fps,
    config: { damping: 14, stiffness: 100 },
  });
  const btnS = spring({
    frame: frame - 24,
    fps,
    config: { damping: 11, stiffness: 80 },
  });
  const urlS = spring({ frame: frame - 34, fps, config: { damping: 200 } });
  const pillsS = spring({ frame: frame - 40, fps, config: { damping: 200 } });

  const glowOp = interpolate(
    Math.max(0, frame - 30) % Math.round(1.5 * fps),
    [0, Math.round(0.75 * fps), Math.round(1.5 * fps)],
    [0.3, 0.6, 0.3],
  );

  return (
    <SceneFade dur={75} noExit>
      {/* Crossing lines */}
      <div
        style={{
          position: "absolute",
          top: "45%",
          left: "50%",
          width: 1000,
          height: 1000,
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
            background: `linear-gradient(90deg, transparent, ${brand.colors.gold}88, transparent)`,
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
            background: `linear-gradient(90deg, transparent, ${brand.colors.indigo}66, transparent)`,
            transform: "translate(-50%, -50%) rotate(45deg)",
          }}
        />
      </div>

      {/* Centered content */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 56px",
        }}
      >
        <Img
          src={staticFile("logo/MARKERALOGO-trimmed.png")}
          style={{
            width: 460,
            height: "auto",
            objectFit: "contain",
            opacity: logoS,
            transform: `scale(${logoS})`,
            filter: "drop-shadow(0 20px 60px rgba(0,0,0,0.8))",
            marginBottom: 40,
          }}
        />

        <span
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 56,
            fontWeight: 900,
            color: "#ffffff",
            textAlign: "center",
            letterSpacing: "-0.02em",
            opacity: tag1,
            transform: `translateY(${interpolate(tag1, [0, 1], [30, 0])}px)`,
          }}
        >
          Brands Meet Creators.
        </span>
        <span
          style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            fontSize: 44,
            fontWeight: 400,
            color: brand.colors.goldLight,
            textAlign: "center",
            letterSpacing: "0.02em",
            marginTop: 10,
            opacity: tag2,
            transform: `translateY(${interpolate(tag2, [0, 1], [25, 0])}px)`,
            textShadow: "0 0 20px rgba(201,168,124,0.3)",
            marginBottom: 40,
          }}
        >
          Partnerships That Last.
        </span>

        <AnimatedRule delay={20} />

        <div
          style={{
            padding: "32px 80px",
            borderRadius: 999,
            background: `linear-gradient(135deg, ${brand.colors.gold}, ${brand.colors.goldDark})`,
            color: "#fff",
            fontSize: 32,
            fontWeight: 700,
            fontFamily: "'Inter', sans-serif",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            transform: `scale(${btnS})`,
            opacity: btnS,
            boxShadow: `0 12px 48px rgba(201,168,124,${glowOp}), 0 4px 12px rgba(0,0,0,0.5)`,
            marginTop: 48,
          }}
        >
          Join the Network
        </div>

        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 26,
            fontWeight: 500,
            color: brand.colors.text,
            opacity: urlS * 0.75,
            letterSpacing: "0.1em",
            marginTop: 32,
          }}
        >
          markeramedia.com
        </span>
      </AbsoluteFill>

      {/* Bottom pills */}
      <div
        style={{
          position: "absolute",
          bottom: 90,
          left: 0,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 18,
          opacity: pillsS,
          transform: `translateY(${interpolate(pillsS, [0, 1], [15, 0])}px)`,
        }}
      >
        <span
          style={{
            padding: "10px 24px",
            borderRadius: 999,
            border: `2px solid ${brand.colors.gold}44`,
            fontFamily: "'Inter', sans-serif",
            fontSize: 18,
            fontWeight: 600,
            color: brand.colors.gold,
            letterSpacing: "0.08em",
          }}
        >
          For Brands
        </span>
        <span
          style={{
            padding: "10px 24px",
            borderRadius: 999,
            border: `2px solid ${brand.colors.indigo}44`,
            fontFamily: "'Inter', sans-serif",
            fontSize: 18,
            fontWeight: 600,
            color: brand.colors.indigoLight,
            letterSpacing: "0.08em",
          }}
        >
          For Creators
        </span>
      </div>
    </SceneFade>
  );
};

/* ═══════════════════════════════════════
   Main — 385 frames / ~12.8s at 30fps
   ═══════════════════════════════════════ */
export const BrandReel2: React.FC = () => {
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
        style={{ position: "relative", zIndex: 10, width: "100%", height: "100%" }}
      >
        <Sequence from={0} durationInFrames={80} premountFor={30}>
          <HookScene />
        </Sequence>
        <Sequence from={70} durationInFrames={90} premountFor={30}>
          <BridgeScene />
        </Sequence>
        <Sequence from={150} durationInFrames={90} premountFor={30}>
          <ForBrandsScene />
        </Sequence>
        <Sequence from={230} durationInFrames={90} premountFor={30}>
          <ForCreatorsScene />
        </Sequence>
        <Sequence from={310} durationInFrames={75} premountFor={30}>
          <CTAScene />
        </Sequence>
      </div>
    </AbsoluteFill>
  );
};
