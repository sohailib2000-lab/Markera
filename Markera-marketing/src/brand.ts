export const brand = {
  name: "Markera",
  tagline: "Brands Meet Creators. Partnerships That Last.",
  description:
    "Creator-brand partnership platform connecting brands with authentic creators for lasting partnerships.",

  colors: {
    gold: "#c9a87c",
    goldLight: "#d4b896",
    goldDark: "#8b6914",
    indigo: "#6366f1",
    indigoLight: "#818cf8",
    bgDark: "#0a0a0b",
    bgDarker: "#050506",
    bgCard: "#111113",
    bgSurface: "#18181b",
    text: "#e4e4e7",
    borderLight: "#3f3f46",
    borderDark: "#27272a",
  },

  fonts: {
    display: "Playfair Display",
    body: "Inter",
  },

  voice: {
    tone: "Confident, direct, professional yet approachable",
    keywords: [
      "authentic",
      "strategic",
      "value",
      "reach",
      "impact",
      "partnerships",
    ],
    phrases: [
      "Brands Meet Creators. Partnerships That Last.",
      "Authentic Creator Partnerships",
      "A Clear Path to Success",
      "Simple, honest partnerships that actually move the needle",
    ],
  },

  visual: {
    style: "Dark luxury",
    motifs: [
      "Animated gradient orbs (gold & indigo)",
      "Floating particles",
      "Glassmorphism effects",
      "Grid pattern overlays with radial masks",
      "Pulsing decorative circles",
      "Scroll-triggered fade-in animations",
    ],
    logo: {
      description:
        "Two crossing lines: one at -45deg (gold, wider) and one at 45deg (indigo). Paired with Markera wordmark in Playfair Display with gold accent on the M.",
    },
  },
} as const;

export type Brand = typeof brand;
