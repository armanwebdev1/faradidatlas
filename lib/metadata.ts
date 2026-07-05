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
  titleAr: string;
  descriptionEn: string;
  descriptionFa: string;
  descriptionAr: string;
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
  titleAr,
  descriptionEn,
  descriptionFa,
  descriptionAr,
  image = siteConfig.defaultOgImagePath,
  robots,
}: PageMetadataInput): Metadata {
  const isFa = lang === "fa";
  const isAr = lang === "ar";
  const brand = isFa ? siteConfig.nameFa : isAr ? siteConfig.nameAr : siteConfig.name;
  const title = normalizeTitle(isFa ? titleFa : isAr ? titleAr : titleEn, brand);
  const description = isFa ? descriptionFa : isAr ? descriptionAr : descriptionEn;
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
      locale: isFa ? "fa_IR" : isAr ? "ar_SA" : "en_US",
      alternateLocale: isFa
        ? ["en_US", "ar_SA"]
        : isAr
          ? ["en_US", "fa_IR"]
          : ["fa_IR", "ar_SA"],
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
