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
  const canonical = absoluteUrl(localizedPath(normalizedLang));

  const title = isFa
    ? `${siteConfig.nameFa} | تأمین و توزیع مواد غذایی`
    : `${siteConfig.name} | Food Sourcing, Import & Distribution`;
  const description = isFa ? siteConfig.descriptionFa : siteConfig.description;

  return {
    title: {
      absolute: title,
      template: isFa ? `%s | ${siteConfig.nameFa}` : `%s | ${siteConfig.name}`,
    },
    description,
    alternates: {
      canonical,
      languages: localizedAlternates(),
    },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: siteConfig.name,
      title,
      description,
      locale: isFa ? "fa_IR" : "en_US",
      alternateLocale: isFa ? ["en_US"] : ["fa_IR"],
      images: [
        {
          url: absoluteUrl(siteConfig.defaultOgImagePath),
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl(siteConfig.defaultOgImagePath)],
    },
  };
}

export default function LangLayout({ children }: LangLayoutProps) {
  return children;
}
