"use client";

import { Search } from "lucide-react";
import type { Language } from "@/lib/i18n";
import { translations } from "@/lib/i18n";

interface BlogSearchProps {
  lang: Language;
  onSearch: (value: string) => void;
  value: string;
}

export function BlogSearch({ lang, onSearch, value }: BlogSearchProps) {
  const isRTL = lang === "fa" || lang === "ar";
  const t = translations[lang];

  return (
    <div dir={isRTL ? "rtl" : "ltr"} className="relative w-full max-w-md mx-auto">
      <Search
        className={`absolute top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5 pointer-events-none ${
          isRTL ? "left-4" : "left-4"
        }`}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onSearch(e.target.value)}
        placeholder={t.pages.blog.searchPlaceholder}
        className={`w-full rounded-full border border-border/50 bg-white/90 py-3 text-sm text-foreground transition-all placeholder:text-muted-foreground placeholder:font-light focus:border-brand-navy/30 focus:outline-none focus:ring-2 focus:ring-brand-navy/20 hover:border-border/70 ${
          isRTL ? "pl-12 pr-5 text-right" : "pl-12 pr-5 text-left"
        }`}
      />
    </div>
  );
}
