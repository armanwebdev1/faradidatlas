import type { Language } from "@/lib/i18n";
import { translations } from "@/lib/i18n";
import Link from "next/link";

interface JoinTeamProps {
  lang: Language;
}

export function JoinTeam({ lang }: JoinTeamProps) {
  const t = translations[lang];
  return (
    <section className="relative py-16 md:py-24 px-4 sm:px-6 bg-background overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-border" />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight tracking-tight">
            {t.pages.about.workWithUs}
          </h2>

          <div
            dir={lang === "fa" || lang === "ar" ? "rtl" : "ltr"}
            className={lang === "fa" || lang === "ar" ? "text-right" : "text-left"}
            style={{
              direction: lang === "fa" || lang === "ar" ? "rtl" : "ltr",
              textAlign: lang === "fa" || lang === "ar" ? "right" : "left",
            }}
          >
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
              {t.pages.about.workWithUsDescription}
            </p>

            <Link
              href={`/${lang}/contact`}
              className="inline-flex items-center text-foreground hover:text-accent font-medium transition-colors"
            >
              {t.pages.about.startConversation}
              <span className="ml-1" aria-hidden="true">
                <svg className="h-4 w-4 inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
                <span className="sr-only">→</span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
