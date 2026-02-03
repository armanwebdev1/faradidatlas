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

  const typeColors: Record<Job["type"], string> = {
    "full-time": "bg-primary text-white",
    "part-time": "bg-accent-warm-orange text-white",
    contract: "bg-accent-warm-red text-white",
  };

  const typeLabels = {
    "full-time": { en: "Full-time", fa: "تمام‌وقت" },
    "part-time": { en: "Part-time", fa: "پاره‌وقت" },
    contract: { en: "Contract", fa: "قرارداد" },
  };

  return (
    <Link href={`/${lang}/careers/${job.id}`}>
      <div className="group relative border border-foreground/8 rounded-2xl p-6 sm:p-8 transition-all duration-500 cursor-pointer overflow-hidden hover:border-foreground/15 hover:shadow-lg bg-gradient-to-br from-foreground/[0.02] to-foreground/[0.01] backdrop-blur-md hover:bg-gradient-to-br hover:from-foreground/[0.05] hover:to-foreground/[0.02]">
        {/* Header section - responsive layout */}
        <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 sm:gap-6 mb-5 sm:mb-6">
          <div className="flex-1 min-w-0">
            {/* Job title - responsive typography */}
            <h3
              className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground mb-2 sm:mb-3 group-hover:text-accent-warm-gold transition-colors leading-snug tracking-tight"
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

            {/* Department - responsive */}
            <p
              className="text-sm sm:text-base text-accent-warm-gold font-medium mb-2 sm:mb-3"
              style={{
                fontFamily:
                  lang === "en"
                    ? "var(--font-body)"
                    : "Shabnam, var(--font-body)",
                fontWeight: "500",
              }}
            >
              {job.department}
            </p>

            {/* Location - responsive */}
            <p className="text-xs sm:text-sm text-foreground/60 flex items-center gap-1.5 sm:gap-2">
              <svg
                className="w-4 h-4 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
              </svg>
              <span>{job.location}</span>
            </p>
          </div>

          {/* Job type badge - responsive sizing */}
          <span
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap flex-shrink-0 ${
              job.type === "full-time"
                ? "bg-gradient-to-r from-foreground/20 to-foreground/10 text-foreground"
                : job.type === "part-time"
                  ? "bg-gradient-to-r from-accent-warm-orange/20 to-accent-warm-orange/10 text-accent-warm-orange"
                  : "bg-gradient-to-r from-accent-warm-red/20 to-accent-warm-red/10 text-accent-warm-red"
            }`}
            style={{
              fontFamily:
                lang === "en"
                  ? "var(--font-body)"
                  : "Shabnam, var(--font-body)",
              fontWeight: "500",
            }}
          >
            {typeLabels[job.type][lang]}
          </span>
        </div>

        {/* Description - responsive */}
        <p
          className="text-sm sm:text-base text-foreground/70 mb-6 sm:mb-8 leading-relaxed group-hover:text-foreground/80 transition-colors duration-500"
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

        {/* Footer section - responsive */}
        <div className="pt-5 sm:pt-6 border-t border-foreground/8 group-hover:border-foreground/15 transition-colors flex justify-end">
          <span className="text-xs sm:text-sm font-medium text-accent-warm-gold group-hover:text-accent-warm-orange transition-colors flex items-center gap-1.5 sm:gap-2">
            {lang === "en" ? "View Details" : "مشاهده جزئیات"}
            <svg
              className="w-4 h-4 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
