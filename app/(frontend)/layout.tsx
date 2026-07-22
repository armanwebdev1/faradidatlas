import type React from "react";
import localFont from "next/font/local";
import "../globals.css";
import { RefreshRouteOnSave } from "@/components/live-preview/RefreshRouteOnSave";
import { DraftModeBanner } from "@/components/live-preview/DraftModeBanner";
import { ScrollRestoration } from "@/components/scroll-restoration";
import { draftMode } from "next/headers";

const geistSans = localFont({
  src: [
    { path: "../fonts/geist/Geist-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/geist/Geist-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/geist/Geist-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../fonts/geist/Geist-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
  preload: true,
});

const playfair = localFont({
  src: [
    { path: "../fonts/playfair-display/PlayfairDisplay-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/playfair-display/PlayfairDisplay-SemiBold.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-serif",
  display: "swap",
  preload: true,
});

const notoSansArabic = localFont({
  src: [
    { path: "../fonts/noto-sans-arabic/NotoSansArabic-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/noto-sans-arabic/NotoSansArabic-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../fonts/noto-sans-arabic/NotoSansArabic-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-noto-arabic",
  display: "swap",
  preload: true,
});

const tajawal = localFont({
  src: [
    { path: "../fonts/tajawal/Tajawal-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/tajawal/Tajawal-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/tajawal/Tajawal-Bold.woff2", weight: "700", style: "normal" },
    { path: "../fonts/tajawal/Tajawal-ExtraBold.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-tajawal",
  display: "swap",
  preload: true,
});

const cairo = localFont({
  src: [
    { path: "../fonts/cairo/Cairo-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/cairo/Cairo-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../fonts/cairo/Cairo-Bold.woff2", weight: "700", style: "normal" },
    { path: "../fonts/cairo/Cairo-ExtraBold.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-cairo",
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
  preload: true,
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
  preload: true,
});

export default async function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${playfair.variable} ${estedad.variable} ${shabnam.variable} ${notoSansArabic.variable} ${tajawal.variable} ${cairo.variable}`}
    >
      <body className="antialiased">
        <RefreshRouteOnSave />
        {isDraftMode && <DraftModeBanner />}
        <ScrollRestoration />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:shadow-lg focus:outline-none"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
