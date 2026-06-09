import type React from "react";
import type { Metadata } from "next";
import type { Language } from "@/lib/i18n";
import {
  absoluteUrl,
  localizedAlternates,
  localizedPath,
  siteConfig,
} from "@/lib/site";

interface LangLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    lang: string;
  }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const normalizedLang: Language = lang === "fa" ? "fa" : "en";
  const isFa = normalizedLang === "fa";

  const title = isFa
    ? "فرادید اطلس | تامین، واردات و توزیع مواد غذایی"
    : `${siteConfig.name} | Food Sourcing, Import & Distribution`;
  const description = isFa ? siteConfig.descriptionFa : siteConfig.description;
  const keywords = isFa
    ? [
        siteConfig.nameFa,
        "تامین B2B مواد غذایی",
        "واردات مواد غذایی",
        "تجارت مواد غذایی",
        "تامین کننده مواد غذایی",
        "توزیع مواد غذایی",
        "مواد اولیه غذایی",
        "برنج وارداتی",
        "تامین مواد غذایی",
        "توزیع عمده مواد غذایی",
      ]
    : [
        siteConfig.name,
        "B2B food sourcing",
        "food import distribution",
        "food trading",
        "food supplier",
        "rice importer",
        "bulk ingredients",
        "food distribution",
        "global food sourcing",
        "food commodities",
      ];

  return {
    title: {
      default: title,
      template: isFa ? `%s | ${siteConfig.nameFa}` : `%s | ${siteConfig.name}`,
    },
    description,
    keywords,
    alternates: {
      canonical: absoluteUrl(localizedPath(normalizedLang)),
      languages: localizedAlternates(),
    },
    openGraph: {
      type: "website",
      url: absoluteUrl(localizedPath(normalizedLang)),
      siteName: siteConfig.name,
      title,
      description,
      locale: isFa ? "fa_IR" : "en_US",
      alternateLocale: isFa ? ["en_US"] : ["fa_IR"],
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
      title,
      description,
      images: [absoluteUrl("/opengraph-image.svg")],
    },
  };
}

export default function LangLayout({ children }: LangLayoutProps) {
  return children;
}
