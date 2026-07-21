import { BookOpen } from "lucide-react";
import type { Language } from "@/lib/i18n";
import type { translations } from "@/lib/i18n";

interface BlogEmptyProps {
  lang: Language;
  t: (typeof translations)[Language];
}

export function BlogEmpty({ lang, t }: BlogEmptyProps) {
  const isRTL = lang === "fa" || lang === "ar";

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className="relative p-8 sm:p-10 bg-gradient-to-br from-background to-secondary/30 rounded-2xl border border-border text-center overflow-hidden shadow-lg animate-fade-in-up"
    >
      <div className="flex justify-center mb-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-navy/10">
          <BookOpen className="h-8 w-8 text-brand-navy" strokeWidth={1.5} />
        </div>
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4 tracking-tight text-center">
        {t.pages.blog.emptyTitle}
      </h2>
      <p className="text-muted-foreground mb-8 text-base sm:text-lg max-w-xl mx-auto leading-relaxed text-center">
        {t.pages.blog.emptyDescription}
      </p>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
        <a
          href={`/${lang}/contact`}
          className="w-full sm:w-auto text-center px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 hover:shadow-lg transition-all duration-300 group order-1 sm:order-none"
        >
          {t.pages.blog.emptyCta}
        </a>
        <a
          href={`/${lang}/products`}
          className="w-full sm:w-auto text-center px-8 py-3 bg-muted text-foreground font-semibold rounded-full hover:bg-muted/80 hover:shadow-lg transition-all duration-300 group order-2 sm:order-none"
        >
          {lang === "en" ? "Browse Products" : lang === "fa" ? "مشاهده محصولات" : "تصفح المنتجات"}
        </a>
      </div>
    </div>
  );
}
