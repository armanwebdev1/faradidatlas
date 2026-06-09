import type { Metadata } from "next";
import type { Language } from "@/lib/i18n";
import {
  absoluteUrl,
  localizedAlternates,
  localizedPath,
  siteConfig,
} from "@/lib/site";

interface PageMetadataInput {
  lang: Language;
  path?: string;
  titleEn: string;
  titleFa: string;
  descriptionEn: string;
  descriptionFa: string;
}

export function buildPageMetadata({
  lang,
  path = "",
  titleEn,
  titleFa,
  descriptionEn,
  descriptionFa,
}: PageMetadataInput): Metadata {
  const isFa = lang === "fa";
  const title = isFa ? titleFa : titleEn;
  const description = isFa ? descriptionFa : descriptionEn;
  const canonical = absoluteUrl(localizedPath(lang, path));

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: localizedAlternates(path),
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
