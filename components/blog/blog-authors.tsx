import type { Language } from "@/lib/i18n";
import { translations } from "@/lib/i18n";

interface BlogAuthorsProps {
  lang: Language;
}

export function BlogAuthors({ lang }: BlogAuthorsProps) {
  const isRTL = lang === "fa" || lang === "ar";
  const t = translations[lang];
  const authors = t.pages.blog.authors;

  return (
    <section className="py-24 px-4 sm:px-6 bg-background" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-12 text-center tracking-tight">
          {t.pages.blog.authorsTitle}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {authors.map((author) => (
            <div
              key={author.name}
              className="rounded-3xl border border-foreground/10 bg-white/90 p-6 sm:p-7 shadow-[0_35px_80px_-60px_rgba(10,10,10,0.45)]"
            >
              <h3 className="text-lg font-bold text-primary mb-1">
                {author.name}
              </h3>
              <p className="text-sm font-medium text-brand-navy mb-3">
                {author.role}
              </p>
              <p className="text-sm text-foreground/70 leading-relaxed">
                {author.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
