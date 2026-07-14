"use client";

import { ChevronDown } from "lucide-react";
import type { Language } from "@/lib/i18n";
import type { translations } from "@/lib/i18n";

const languageNames: Record<Language, string> = {
  en: "English",
  fa: "فارسی",
  ar: "العربية",
};

const localeMarks: Record<Language, string> = {
  en: "EN",
  fa: "FA",
  ar: "AR",
};

export function LanguagePicker({
  lang,
  isRTL,
  dir,
  t,
}: {
  lang: Language;
  isRTL: boolean;
  dir: string;
  t: (typeof translations)[Language];
}) {
  return (
    <details className="relative shrink-0 group/lang">
      <summary
        aria-label={t.header.selectLanguage}
        className="flex cursor-pointer list-none items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-lg hover:bg-brand-navy/5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-navy/25 [&::-webkit-details-marker]:hidden"
      >
        <span className="text-base sm:text-lg">
          {localeMarks[lang]}
        </span>
        <span className="hidden sm:inline text-sm font-medium text-foreground">
          {languageNames[lang]}
        </span>
        <ChevronDown
          size={18}
          className="text-muted-foreground transition-transform duration-300 group-open/lang:rotate-180"
        />
      </summary>
      <div
        dir={dir}
        className="absolute top-full mt-2 right-0 w-44 sm:w-48 bg-background/95 backdrop-blur-md border border-border/20 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        role="menu"
      >
        <div className="px-4 py-2 bg-linear-to-r from-primary/5 to-accent/5 border-b border-border/10">
          <p className="text-xs font-semibold text-muted-foreground tracking-wide uppercase">
            {t.common.language}
          </p>
        </div>
        <div className="py-2 space-y-1 px-2">
          {(["en", "fa", "ar"] as Language[]).map((l) => (
            <a
              key={l}
              href={`/${l}`}
              className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                l === lang
                  ? "bg-brand-navy/10 text-brand-navy shadow-sm"
                  : "text-foreground hover:bg-muted/50"
              }`}
              role="menuitem"
            >
              <span className="text-lg">{localeMarks[l]}</span>
              <span>{languageNames[l]}</span>
              {l === lang && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-navy" />
              )}
            </a>
          ))}
        </div>
      </div>
    </details>
  );
}
