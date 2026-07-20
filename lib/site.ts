export const supportedLanguages = ["en", "fa", "ar"] as const;

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
  nameAr: "فرادید اطلس",
  legalName: "Faradid Atlas Foods",
  brandMarkPath: "/brand/faradid-atlas-mark.png",
  defaultOgImagePath: "/opengraph-image.svg",
  description:
    "Faradid Atlas helps businesses source, import, and distribute essential foods such as rice, legumes, nuts, seeds, spices, and sugar through reliable regional supply channels.",
  descriptionFa:
    "فرادید اطلس به کسب‌وکارها کمک می‌کند مواد غذایی اساسی مانند برنج، حبوبات، آجیل، خشکبار، ادویه، و شکر را از مسیرهای تأمین قابل اتکا تهیه، وارد و توزیع کنند.",
  descriptionAr:
    "تساعد فرادید اطلس الشركات على توريد واستيراد وتوزيع الأغذية الأساسية مثل الأرز والبقوليات والمكسرات والبذور والتوابل والسكر من خلال قنوات توريد إقليمية موثوقة.",
  sameAs: [] as string[],
};

export function absoluteUrl(path = "") {
  if (/^https?:\/\//i.test(path)) return path;

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
    ar: absoluteUrl(localizedPath("ar", path)),
    "x-default": absoluteUrl(localizedPath("en", path)),
  };
}
