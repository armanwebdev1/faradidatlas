import type React from "react";
import type { Metadata } from "next";
import { Playfair_Display, Geist } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { absoluteUrl, siteConfig } from "@/lib/site";
import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: {
    default: `${siteConfig.name} | Food Sourcing, Import & Distribution`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    siteConfig.name,
    "B2B food sourcing",
    "food import distribution",
    "food trading",
    "food supplier",
    "rice importer",
    "bulk ingredients",
    "food distribution",
    "global food sourcing",
    "تجارت مواد غذایی",
    "واردات مواد غذایی",
    "تامین B2B مواد غذایی",
    "واردات و توزیع مواد غذایی",
    "تامین کننده مواد غذایی",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  robots: { index: true, follow: true },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  alternates: {
    canonical: absoluteUrl("/en"),
    languages: {
      en: absoluteUrl("/en"),
      fa: absoluteUrl("/fa"),
    },
  },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Food Sourcing, Import & Distribution`,
    description: siteConfig.description,
    locale: "en_US",
    alternateLocale: ["fa_IR"],
    images: [
        {
          url: absoluteUrl("/opengraph-image.svg"),
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Food Sourcing, Import & Distribution`,
    description: siteConfig.description,
    images: [absoluteUrl("/opengraph-image.svg")],
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
        <SpeedInsights />
      </body>
    </html>
  );
}
