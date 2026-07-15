import type { Language } from "./i18n";

/**
 * Resolves a localized value from a Payload CMS localized field.
 * Falls back to English only when the requested language is null/undefined.
 * Returns "" when both are missing (component should handle this).
 */
export function getLocalized(value: any, lang: Language): string {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (typeof value === "object") {
    if (value[lang]) return value[lang];
    if (value.en) return value.en;
  }
  return "";
}

/**
 * Resolves a localized value with a hardcoded Arabic fallback.
 * Use this in components where English fallback is unacceptable for Arabic layout.
 */
export function getLocalizedWithArFallback(
  value: any,
  lang: Language,
  arFallback: string,
): string {
  if (!value) return lang === "ar" ? arFallback : "";
  if (typeof value === "string") return value;
  if (typeof value === "object") {
    if (value[lang]) return value[lang];
    if (lang === "ar" && arFallback) return arFallback;
    if (value.en) return value.en;
  }
  return lang === "ar" ? arFallback : "";
}
