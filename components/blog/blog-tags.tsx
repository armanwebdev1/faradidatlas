"use client";

import type { Language } from "@/lib/i18n";
import type { translations } from "@/lib/i18n";

interface BlogTagsProps {
  lang: Language;
  t: (typeof translations)[Language];
  activeTag: string;
  onTagChange: (tag: string) => void;
}

export function BlogTags({ lang, t, activeTag, onTagChange }: BlogTagsProps) {
  const isRTL = lang === "fa" || lang === "ar";
  const tags = t.pages.blog.tags;

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className={`flex flex-wrap gap-2 ${isRTL ? "flex-row-reverse justify-end text-right" : "justify-start text-left"}`}
    >
      <button
        onClick={() => onTagChange("")}
        className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
          activeTag === ""
            ? "bg-brand-navy text-white shadow-sm"
            : "border border-border/50 bg-white/90 text-foreground/70 hover:border-brand-navy/30 hover:text-brand-navy"
        }`}
      >
        {t.pages.blog.allTags}
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onTagChange(tag)}
          className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
            activeTag === tag
              ? "bg-brand-navy text-white shadow-sm"
              : "border border-border/50 bg-white/90 text-foreground/70 hover:border-brand-navy/30 hover:text-brand-navy"
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
