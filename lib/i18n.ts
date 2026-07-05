import enTranslations from "@/i18n/en.json"
import faTranslations from "@/i18n/fa.json"
import arTranslations from "@/i18n/ar.json"

export type Language = "en" | "fa" | "ar"

export const translations = {
  en: enTranslations,
  fa: faTranslations,
  ar: arTranslations,
}

export function getTranslation(lang: Language, key: string): string {
  const keys = key.split(".")
  let value: unknown = translations[lang]

  for (const k of keys) {
    if (!value || typeof value !== "object" || !(k in value)) {
      return key
    }

    value = (value as Record<string, unknown>)[k]
  }

  return typeof value === "string" ? value : key
}

export function isRTL(lang: Language): boolean {
  return lang === "fa" || lang === "ar"
}
