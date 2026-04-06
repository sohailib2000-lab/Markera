import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { X } from "lucide-react";
import { brand } from "./brand";

const WARN = "#c45a3c";

/* ── Custom Styled Warning Badge ── */
const WarningBadge = ({ size = 28 }: { size?: number }) => (
  <div
    style={{
      width: size,
      height: size,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "50%",
      background: `linear-gradient(135deg, ${WARN}, #9e432a)`,
      boxShadow: `0 0 24px ${WARN}55, inset 0 1px 3px rgba(255,255,255,0.35)`,
      color: "white",
      fontFamily: "'Inter', sans-serif",
      fontWeight: 900,
      fontSize: size * 0.55,
      lineHeight: 1,
    }}
  >
    !
  </div>
);

/* ── Glowing orb ── */
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

/* ── Static Background — matches BrandedPost.tsx exactly ── */
const StaticBg = React.memo(() => (
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

    {/* Brand signature crossing lines */}
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

    {/* Orbs */}
    <GlowOrb color={brand.colors.gold} top="-10%" left="-10%" size={800} opacity={0.16} />
    <GlowOrb color={brand.colors.indigo} bottom="-12%" right="-12%" size={900} opacity={0.12} />
    <GlowOrb color={brand.colors.goldLight} top="60%" right="5%" size={300} opacity={0.06} />

    {/* Decorative circles — brand motif */}
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

    {/* 3-D perspective grid */}
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
        maskImage: "radial-gradient(circle at 50% 60%, black 10%, transparent 55%)",
        WebkitMaskImage: "radial-gradient(circle at 50% 60%, black 10%, transparent 55%)",
        transform: "perspective(1200px) rotateX(50deg) scale(1.3)",
        transformOrigin: "center 70%",
      }}
    />

    {/* Noise texture */}
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
));

/* ── Polished Flag Card ── */
const FlagCard = ({
  index,
  quote,
  caption,
  voiceover,
}: {
  index: number;
  quote: string;
  caption: string;
  voiceover: string;
}) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      padding: "36px 44px",
      borderRadius: 20,
      background: "rgba(255,255,255,0.03)",
      border: `1px solid rgba(201,168,124,0.15)`,
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      width: "100%",
      boxShadow: "0 16px 48px rgba(0,0,0,0.3)",
    }}
  >
    {/* Badge + Label */}
    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
      <WarningBadge size={30} />
      <span
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 20,
          fontWeight: 700,
          color: brand.colors.gold,
          letterSpacing: "0.12em",
        }}
      >
        RED FLAG {index}
      </span>
    </div>

    {/* Quote */}
    <span
      style={{
        fontFamily: "'Playfair Display', serif",
        fontStyle: "italic",
        fontSize: 40,
        fontWeight: 400,
        color: "#ffffff",
        lineHeight: 1.25,
        marginBottom: 24,
      }}
    >
      &ldquo;{quote}&rdquo;
    </span>

    {/* Response box — caption + voiceover together */}
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        padding: "20px 24px",
        background: `rgba(201,168,124,0.06)`,
        border: `1px solid rgba(201,168,124,0.12)`,
        borderRadius: 14,
        width: "100%",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
        <X
          size={24}
          color={brand.colors.goldLight}
          style={{ flexShrink: 0, marginTop: 3 }}
        />
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 21,
            fontWeight: 600,
            color: brand.colors.text,
            lineHeight: 1.3,
          }}
        >
          {caption}
        </span>
      </div>

      <span
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 19,
          fontWeight: 400,
          color: "rgba(255,255,255,0.55)",
          lineHeight: 1.45,
          paddingLeft: 38,
        }}
      >
        {voiceover}
      </span>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   Composition
   ═══════════════════════════════════════════════════════════════ */
export const RedFlagsCarousel: React.FC<{ slide: number }> = ({ slide }) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: brand.colors.bgDarker,
        fontFamily: "'Inter', sans-serif",
        color: brand.colors.text,
      }}
    >
      <StaticBg />

      {/* ── Content wrapper ── */}
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
          paddingTop: 72,
          paddingBottom: 56,
          paddingLeft: 72,
          paddingRight: 72,
        }}
      >
        {/* ── TOP: Logo — uniform across all slides ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Img
            src={staticFile("logo/MARKERALOGO-trimmed.png")}
            style={{
              width: 280,
              height: "auto",
              objectFit: "contain",
              filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.5))",
            }}
          />
        </div>

        {/* ── MIDDLE: Slide content ── */}
        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            maxWidth: 920,
          }}
        >
          {/* ═══ Slide 1: Hook ═══ */}
          {slide === 0 && (
            <div
              style={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 0,
              }}
            >
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 28,
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  color: brand.colors.goldLight,
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                If a brand says this...
              </span>

              <GoldRule width={90} />

              <div style={{ position: "relative", marginTop: 20 }}>
                <span
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 180,
                    fontWeight: 900,
                    lineHeight: 1,
                    color: brand.colors.text,
                    textShadow: "0 8px 40px rgba(0,0,0,0.5)",
                  }}
                >
                  RUN
                </span>
                <div style={{ position: "absolute", top: -16, right: -36 }}>
                  <WarningBadge size={56} />
                </div>
              </div>

              <GoldRule width={90} />

              <span
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: "italic",
                  fontSize: 32,
                  fontWeight: 400,
                  color: brand.colors.goldLight,
                  marginTop: 20,
                  marginBottom: 48,
                  textShadow: "0 4px 16px rgba(201,168,124,0.15)",
                }}
              >
                5 Red Flags Every Creator Should Know
              </span>

              <div
                style={{
                  padding: "14px 36px",
                  border: `1px solid rgba(201,168,124,0.3)`,
                  borderRadius: 999,
                  color: brand.colors.goldLight,
                  fontSize: 18,
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}
              >
                SWIPE →
              </div>
            </div>
          )}

          {/* ═══ Slide 2: Flags 1 & 2 ═══ */}
          {slide === 1 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 28,
                width: "100%",
              }}
            >
              <FlagCard
                index={1}
                quote="We'll pay you in exposure."
                caption="Exposure doesn't pay rent."
                voiceover="Exposure ≠ compensation. Period."
              />
              <FlagCard
                index={2}
                quote="Can you do it for free? It's great for your portfolio."
                caption="Your content has value."
                voiceover="If your work drives their sales, you deserve to be paid."
              />
            </div>
          )}

          {/* ═══ Slide 3: Flags 3 & 4 ═══ */}
          {slide === 2 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 28,
                width: "100%",
              }}
            >
              <FlagCard
                index={3}
                quote="We need unlimited revisions."
                caption="No scope = no deal."
                voiceover="Always define deliverables before signing."
              />
              <FlagCard
                index={4}
                quote="We own all your content forever."
                caption="Know your rights."
                voiceover="Usage rights should be negotiated separately."
              />
            </div>
          )}

          {/* ═══ Slide 4: Flag 5 ═══ */}
          {slide === 3 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <FlagCard
                index={5}
                quote="Our last creator did it for $50."
                caption="That's their problem, not yours."
                voiceover="Know your rate. Don't let brands undervalue you."
              />
            </div>
          )}

          {/* ═══ Slide 5: Outro / CTA ═══ */}
          {slide === 4 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: 0,
              }}
            >
              <span
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: "italic",
                  fontSize: 52,
                  fontWeight: 400,
                  color: brand.colors.goldLight,
                  lineHeight: 1.3,
                  maxWidth: 680,
                  textShadow: "0 4px 16px rgba(201,168,124,0.15)",
                }}
              >
                You deserve better partnerships.
              </span>

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

              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 24,
                  fontWeight: 300,
                  color: brand.colors.text,
                  lineHeight: 1.5,
                  maxWidth: 600,
                  marginBottom: 48,
                }}
              >
                At{" "}
                <b style={{ color: brand.colors.goldLight, fontWeight: 600 }}>
                  Markera
                </b>
                , we only broker deals where{" "}
                <b style={{ color: brand.colors.goldLight, fontWeight: 600 }}>
                  both sides
                </b>{" "}
                win.
              </span>

              <div
                style={{
                  padding: "22px 56px",
                  borderRadius: 999,
                  background: `linear-gradient(135deg, ${brand.colors.gold}, ${brand.colors.goldDark})`,
                  color: "#fff",
                  fontSize: 24,
                  fontWeight: 700,
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  boxShadow:
                    "0 6px 28px rgba(201,168,124,0.35), 0 2px 8px rgba(0,0,0,0.4)",
                }}
              >
                DM us "READY"
              </div>

              <span
                style={{
                  marginTop: 32,
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 17,
                  fontWeight: 500,
                  letterSpacing: "0.06em",
                  color: "rgba(255,255,255,0.35)",
                  textTransform: "uppercase",
                }}
              >
                Save this for later 🔖
              </span>
            </div>
          )}
        </div>

        {/* ── BOTTOM: Page indicators ── */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
          }}
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              style={{
                width: slide === i ? 28 : 8,
                height: 8,
                borderRadius: 4,
                background:
                  slide === i
                    ? brand.colors.gold
                    : "rgba(201,168,124,0.18)",
              }}
            />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
