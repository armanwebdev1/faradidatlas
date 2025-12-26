import enTranslations from "@/i18n/en.json"
import faTranslations from "@/i18n/fa.json"

export type Language = "en" | "fa"

export const translations = {
  en: enTranslations,
  fa: faTranslations,
}

export function getTranslation(lang: Language, key: string): string {
  const keys = key.split(".")
  let value: any = translations[lang]

  for (const k of keys) {
    value = value?.[k]
  }

  return value || key
}

export function isRTL(lang: Language): boolean {
  return lang === "fa"
}
