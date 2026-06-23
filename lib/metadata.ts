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
  image?: string;
  robots?: Metadata["robots"];
}

function normalizeTitle(title: string, brand: string) {
  const parts = title
    .split("|")
    .map((part) => part.trim())
    .filter(Boolean);

  const normalizedParts = parts.filter(
    (part, index) => part !== brand || index === parts.lastIndexOf(brand),
  );

  return normalizedParts.length > 0 ? normalizedParts.join(" | ") : title;
}

export function buildPageMetadata({
  lang,
  path = "",
  titleEn,
  titleFa,
  descriptionEn,
  descriptionFa,
  image = siteConfig.defaultOgImagePath,
  robots,
}: PageMetadataInput): Metadata {
  const isFa = lang === "fa";
  const brand = isFa ? siteConfig.nameFa : siteConfig.name;
  const title = normalizeTitle(isFa ? titleFa : titleEn, brand);
  const description = isFa ? descriptionFa : descriptionEn;
  const canonical = absoluteUrl(localizedPath(lang, path));
  const imageUrl = absoluteUrl(image);

  return {
    title: {
      absolute: title,
    },
    description,
    robots:
      robots ?? {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
        },
      },
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
          url: imageUrl,
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
      images: [imageUrl],
    },
  };
}
