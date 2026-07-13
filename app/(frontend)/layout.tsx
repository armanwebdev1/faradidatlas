import type React from "react";
import { Playfair_Display, Geist, Noto_Sans_Arabic } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "../globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "600"],
  display: "swap",
  preload: false,
});

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: false,
});

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["latin", "arabic"],
  variable: "--font-noto-arabic",
  weight: ["400", "600", "700"],
  display: "swap",
  preload: false,
});

const estedad = localFont({
  src: [
    {
      path: "../fonts/estedad/Estedad-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../fonts/estedad/Estedad-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-estedad",
  display: "swap",
  preload: false,
});

const shabnam = localFont({
  src: [
    {
      path: "../fonts/shabnam/Shabnam-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../fonts/shabnam/Shabnam-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-shabnam",
  display: "swap",
  preload: false,
});

export default function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${playfair.variable} ${estedad.variable} ${shabnam.variable} ${notoSansArabic.variable}`}
    >
      <body className="antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:shadow-lg focus:outline-none"
        >
          Skip to content
        </a>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
