export const supportedLanguages = ["en", "fa"] as const;

export type SupportedLanguage = (typeof supportedLanguages)[number];

const fallbackSiteUrl = "https://faradidatlas.com";

function normalizeSiteUrl(value?: string) {
  const raw = value?.trim() || fallbackSiteUrl;
  return raw.replace(/\/+$/, "");
}

export const siteConfig = {
  url: normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
  name: "Faradid Atlas",
  nameFa: "فرادید اطلس",
  legalName: "Faradid Atlas Foods",
  description:
    "Faradid Atlas sources, imports, and distributes essential food products including rice, legumes, seeds, nuts, spices, and sugar.",
  descriptionFa:
    "فرادید اطلس محصولات غذایی اساسی مانند برنج، حبوبات، دانه‌ها، آجیل، ادویه‌جات و شکر را تامین، وارد و توزیع می‌کند.",
};

export function absoluteUrl(path = "") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalizedPath}`;
}

export function localizedPath(lang: SupportedLanguage, path = "") {
  const normalizedPath = path === "/" ? "" : path.replace(/^\/+/, "");
  return `/${lang}${normalizedPath ? `/${normalizedPath}` : ""}`;
}

export function localizedAlternates(path = "") {
  return {
    en: absoluteUrl(localizedPath("en", path)),
    fa: absoluteUrl(localizedPath("fa", path)),
  };
}
