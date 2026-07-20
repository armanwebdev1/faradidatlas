import type { Language } from "./i18n";

/**
 * Resolves a localized value from a Payload CMS localized field.
 * Falls back to English only when the requested language is null/undefined.
 * Returns "" when both are missing (component should handle this).
 */
export function getLocalized(value: any, lang: Language): string {
  if (!value) return "";
  // Try to parse JSON strings that represent localized objects (Payload group fields)
  let resolved = value;
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      if (typeof parsed === "object" && parsed !== null && (parsed.en || parsed[lang])) {
        resolved = parsed;
      }
    } catch {
      // Not JSON — plain string value, return as-is
      return value;
    }
  }
  if (typeof resolved === "object") {
    if (resolved[lang]) return resolved[lang];
    if (resolved.en) return resolved.en;
  }
  return typeof resolved === "string" ? resolved : "";
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
  let resolved = value;
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      if (typeof parsed === "object" && parsed !== null && (parsed.en || parsed[lang])) {
        resolved = parsed;
      }
    } catch {
      return value;
    }
  }
  if (typeof resolved === "object") {
    if (resolved[lang]) return resolved[lang];
    if (lang === "ar" && arFallback) return arFallback;
    if (resolved.en) return resolved.en;
  }
  return typeof resolved === "string" ? resolved : lang === "ar" ? arFallback : "";
}
