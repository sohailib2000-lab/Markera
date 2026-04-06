import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Markera Media | Make your Mark",
  description: "We connect influencers and brands to create lasting partnerships that drive meaningful engagement and real growth.",
  keywords: "influencer marketing, content creators, brand partnerships, creator economy, influencer agency",
  authors: [{ name: "Markera Media" }],
  openGraph: {
    title: "Markera Media | Make your Mark",
    description: "We connect influencers and brands to create lasting partnerships that drive meaningful engagement and real growth.",
    type: "website",
    url: "https://markeramedia.com",
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%238b5a3c'/><text x='50' y='70' font-size='60' font-weight='bold' fill='white' text-anchor='middle' font-family='Arial'>M</text></svg>",
  },
};

import SmoothScrolling from "@/components/SmoothScrolling";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garant:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=DM+Sans:wght@300;400;500;600&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full antialiased">
        <SmoothScrolling>
          {children}
        </SmoothScrolling>
      </body>
    </html>
  );
}
