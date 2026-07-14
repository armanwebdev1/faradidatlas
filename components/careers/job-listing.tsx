"use client";

import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import type { Language } from "@/lib/i18n";
import type { translations } from "@/lib/i18n";
import type { Job } from "./job-data";

interface JobListingProps {
  job: Job;
  lang: Language;
  t: (typeof translations)[Language];
}

export function JobListing({ job, lang, t }: JobListingProps) {
  const title = lang === "en" ? job.titleEn : lang === "ar" ? job.titleAr : job.titleFa;
  const description = lang === "en" ? job.descriptionEn : lang === "ar" ? job.descriptionAr : job.descriptionFa;
  const department = lang === "en" ? job.departmentEn : lang === "ar" ? job.departmentAr : job.departmentFa;
  const location = lang === "en" ? job.locationEn : lang === "ar" ? job.locationAr : job.locationFa;
  const isRTL = lang === "fa" || lang === "ar";

  const typeLabels: Record<Job["type"], Record<Language, string>> = {
    "full-time": { en: "Full-time", fa: "تمام‌وقت", ar: "دوام كامل" },
    "part-time": { en: "Part-time", fa: "پاره‌وقت", ar: "دوام جزئي" },
    contract: { en: "Contract", fa: "قراردادی", ar: "عقد" },
  };

  const typeClasses: Record<Job["type"], string> = {
    "full-time": "border-foreground/15 bg-foreground/5 text-foreground",
    "part-time":
      "border-accent-warm-orange/30 bg-accent-warm-orange/10 text-accent-warm-orange",
    contract:
      "border-accent-warm-red/30 bg-accent-warm-red/10 text-accent-warm-red",
  };

  return (
    <Link href={`/${lang}/careers/${job.id}`} className="block h-full">
      <div className="group relative h-full rounded-2xl border border-foreground/10 bg-white/90 p-6 sm:p-7 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-foreground/5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <h3
            className="min-w-0 text-xl sm:text-2xl font-semibold text-foreground tracking-tight"
            style={{
              fontFamily:
                lang === "en"
                  ? "var(--font-hero)"
                  : "Estedad, var(--font-hero)",
              fontWeight: "600",
            }}
          >
            {title}
          </h3>
          <span
            className={`inline-flex w-fit max-w-full items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-widest ${typeClasses[job.type]}`}
            style={{
              fontFamily:
                lang === "en"
                  ? "var(--font-body)"
                  : "Shabnam, var(--font-body)",
              fontWeight: "600",
            }}
          >
            <span className="h-2 w-2 rounded-full bg-current" />
            {typeLabels[job.type][lang]}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs sm:text-sm text-foreground/65">
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-accent-warm-gold/80" />
            <span
              className="font-semibold text-foreground/75"
              style={{
                fontFamily:
                  lang === "en"
                    ? "var(--font-body)"
                    : "Shabnam, var(--font-body)",
              }}
            >
              {department}
            </span>
          </span>
          <span className="h-1 w-1 rounded-full bg-foreground/20" />
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-4 w-4 text-foreground/50" />
            <span
              style={{
                fontFamily:
                  lang === "en"
                    ? "var(--font-body)"
                    : "Shabnam, var(--font-body)",
              }}
            >
              {location}
            </span>
          </span>
        </div>

        <p
          className="mt-4 text-sm sm:text-base text-foreground/70 leading-relaxed"
          style={{
            fontFamily:
              lang === "en" ? "var(--font-body)" : "Shabnam, var(--font-body)",
            fontWeight: "400",
          }}
        >
          {description}
        </p>

        <div
          className={`mt-6 flex items-center justify-between gap-3 border-t border-foreground/10 pt-4 text-[11px] sm:text-xs uppercase tracking-[0.2em] text-accent-warm-gold ${
            isRTL ? "flex-row-reverse" : ""
          }`}
        >
          <span
            style={{
              fontFamily:
                lang === "en"
                  ? "var(--font-body)"
                  : "Shabnam, var(--font-body)",
            }}
          >
            {t.pages.careers.viewPosition}
          </span>
          <ArrowRight
            className={`h-4 w-4 text-accent-warm-gold transition-transform duration-300 ${
              isRTL
                ? "-scale-x-100 group-hover:-translate-x-1"
                : "group-hover:translate-x-1"
            }`}
          />
        </div>
      </div>
    </Link>
  );
}
