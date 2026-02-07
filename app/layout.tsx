import type React from "react";
import type { Metadata } from "next";
import { Inter, Playfair_Display, Geist } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const estedad = localFont({
  src: [
    {
      path: "./fonts/estedad/Estedad-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "./fonts/estedad/Estedad-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-estedad",
});

const shabnam = localFont({
  src: [
    {
      path: "./fonts/shabnam/Shabnam-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "./fonts/shabnam/Shabnam-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-shabnam",
});

const satoshi = localFont({
  src: "./fonts/satoshi/Satoshi-Variable.woff2",
  variable: "--font-satoshi",
  weight: "300 900",
});

const siteUrl = "https://faradidatlas.vercl.app";
const siteName = "faradid atlas";
const companyName = "Faradid Atlas";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: companyName,
  title: {
    default: `${companyName} | B2B Food Material Exports`,
    template: `%s | ${companyName}`,
  },
  description:
    "Faradid Atlas is a B2B food material export company delivering reliable sourcing, private labeling, and export logistics for global buyers.",
  keywords: [
    "Faradid Atlas",
    "B2B food exports",
    "food material exports",
    "food trading",
    "food supplier",
    "private labeling",
    "bulk ingredients",
    "export logistics",
    "global food sourcing",
    "تجارت مواد غذایی",
    "صادرات مواد غذایی",
    "صادرات B2B مواد غذایی",
    "برندسازی خصوصی",
    "تامین کننده مواد غذایی",
  ],
  authors: [{ name: companyName }],
  creator: companyName,
  publisher: companyName,
  robots: { index: true, follow: true },
  alternates: {
    languages: {
      en: "/en",
      fa: "/fa",
    },
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    title: `${companyName} | B2B Food Material Exports`,
    description:
      "Faradid Atlas is a B2B food material export company delivering reliable sourcing, private labeling, and export logistics for global buyers.",
    locale: "en_US",
    alternateLocale: ["fa_IR"],
  },
  twitter: {
    card: "summary",
    title: `${companyName} | B2B Food Material Exports`,
    description:
      "Faradid Atlas is a B2B food material export company delivering reliable sourcing, private labeling, and export logistics for global buyers.",
  },
  generator: "Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${playfair.variable} ${estedad.variable} ${shabnam.variable} ${satoshi.variable}`}
    >
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        <meta name="theme-color" content="#f7f5f1" />
      </head>
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
