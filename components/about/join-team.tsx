import type { Language } from "@/lib/i18n";
import { translations } from "@/lib/i18n";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface JoinTeamProps {
  lang: Language;
  companyInfo?: any;
}

export function JoinTeam({ lang, companyInfo }: JoinTeamProps) {
  const t = translations[lang];
  const joinTeam = companyInfo?.joinTeam;

  const title = joinTeam?.title || t.pages.about.workWithUs;
  const description = joinTeam?.description || t.pages.about.workWithUsDescription;
  const ctaText = joinTeam?.ctaText || t.pages.about.startConversation;
  const ctaUrl = joinTeam?.ctaUrl || `/${lang}/contact`;

  return (
    <section className="relative py-16 md:py-24 px-4 sm:px-6 bg-background overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-border" />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          <h2 className="max-w-5xl text-2xl md:text-3xl font-bold text-foreground leading-tight tracking-tight text-center lg:text-left">
            {title}
          </h2>

          <div
            dir={lang === "fa" || lang === "ar" ? "rtl" : "ltr"}
            className={lang === "fa" || lang === "ar"
              ? "text-center lg:text-right"
              : "text-center lg:text-left"
            }
          >
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
              {description}
            </p>

            <Link
              href={ctaUrl}
              className="inline-flex items-center text-foreground hover:text-accent font-medium transition-colors"
            >
              {ctaText}
              <span className={`${lang === "fa" || lang === "ar" ? "mr-1 rotate-180" : "ml-1"}`} aria-hidden="true">
                <ArrowRight className="h-4 w-4 inline" />
                <span className="sr-only">→</span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
