"use client";

import Link from "next/link";
import type { Language } from "@/lib/i18n";
import type { Job } from "./job-data";

interface JobListingProps {
  job: Job;
  lang: Language;
}

export function JobListing({ job, lang }: JobListingProps) {
  const title = lang === "en" ? job.titleEn : job.titleFa;
  const description = lang === "en" ? job.descriptionEn : job.descriptionFa;

  const typeLabels = {
    "full-time": { en: "Full-time", fa: "تمام‌وقت" },
    "part-time": { en: "Part-time", fa: "پاره‌وقت" },
    contract: { en: "Contract", fa: "قرارداد" },
  };

  const typeClasses: Record<Job["type"], string> = {
    "full-time":
      "border-foreground/15 bg-foreground/5 text-foreground",
    "part-time":
      "border-accent-warm-orange/30 bg-accent-warm-orange/10 text-accent-warm-orange",
    contract:
      "border-accent-warm-red/30 bg-accent-warm-red/10 text-accent-warm-red",
  };

  return (
    <Link href={`/${lang}/careers/${job.id}`} className="block h-full">
      <div className="group relative h-full rounded-3xl border border-foreground/10 bg-white/90 p-6 sm:p-7 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-foreground/5">
        <div className="flex items-start justify-between gap-4">
          <h3
            className="text-xl sm:text-2xl font-semibold text-foreground tracking-tight"
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
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-widest ${typeClasses[job.type]}`}
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
              {job.department}
            </span>
          </span>
          <span className="h-1 w-1 rounded-full bg-foreground/20" />
          <span className="inline-flex items-center gap-2">
            <svg
              className="h-4 w-4 text-foreground/50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span
              style={{
                fontFamily:
                  lang === "en"
                    ? "var(--font-body)"
                    : "Shabnam, var(--font-body)",
              }}
            >
              {job.location}
            </span>
          </span>
        </div>

        <p
          className="mt-4 text-sm sm:text-base text-foreground/70 leading-relaxed"
          style={{
            fontFamily:
              lang === "en"
                ? "var(--font-body)"
                : "Shabnam, var(--font-body)",
            fontWeight: "400",
          }}
        >
          {description}
        </p>

        <div className="mt-6 flex items-center justify-between border-t border-foreground/10 pt-4 text-[11px] sm:text-xs uppercase tracking-[0.2em] text-accent-warm-gold">
          <span
            style={{
              fontFamily:
                lang === "en"
                  ? "var(--font-body)"
                  : "Shabnam, var(--font-body)",
            }}
          >
            {lang === "en" ? "View Position" : "مشاهده موقعیت"}
          </span>
          <svg
            className="h-4 w-4 text-accent-warm-gold transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}
