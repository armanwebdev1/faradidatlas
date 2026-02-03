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
      <div className="group relative rounded-2xl overflow-hidden border-2 border-slate-200 bg-white transition-all duration-500 cursor-pointer hover:border-accent-warm-gold/40 hover:shadow-2xl hover:shadow-accent-warm-gold/10 hover:scale-102">
        {/* Modern accent line on top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-warm-gold via-accent-warm-orange to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Content wrapper */}
        <div className="p-6 sm:p-8">
          {/* Header section - responsive layout */}
          <div className="flex flex-col lg:flex-row justify-between lg:items-start gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="flex-1 min-w-0">
              {/* Job title - responsive typography */}
              <h3
                className="text-xl sm:text-2xl md:text-2xl font-bold text-slate-900 mb-3 sm:mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-accent-warm-gold group-hover:to-accent-warm-orange transition-all duration-300 leading-snug tracking-tight"
                style={{
                  fontFamily:
                    lang === "en"
                      ? "var(--font-hero)"
                      : "Estedad, var(--font-hero)",
                  fontWeight: "700",
                }}
              >
                {title}
              </h3>

              {/* Meta information - horizontal layout */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm sm:text-base">
                {/* Department */}
                <span
                  className="font-semibold text-accent-warm-gold"
                  style={{
                    fontFamily:
                      lang === "en"
                        ? "var(--font-body)"
                        : "Shabnam, var(--font-body)",
                    fontWeight: "600",
                  }}
                >
                  {job.department}
                </span>

                {/* Divider */}
                <span className="text-slate-300">•</span>

                {/* Location */}
                <span className="text-slate-600 flex items-center gap-1.5">
                  <svg
                    className="w-4 h-4 flex-shrink-0"
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
                  {job.location}
                </span>
              </div>
            </div>

            {/* Job type badge - modern design */}
            <div className="flex-shrink-0">
              <span
                className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider whitespace-nowrap ${
                  job.type === "full-time"
                    ? "bg-gradient-to-r from-slate-100 to-slate-50 text-slate-700 border border-slate-200"
                    : job.type === "part-time"
                      ? "bg-gradient-to-r from-accent-warm-orange/10 to-accent-warm-orange/5 text-accent-warm-orange border border-accent-warm-orange/30"
                      : "bg-gradient-to-r from-accent-warm-red/10 to-accent-warm-red/5 text-accent-warm-red border border-accent-warm-red/30"
                }`}
                style={{
                  fontFamily:
                    lang === "en"
                      ? "var(--font-body)"
                      : "Shabnam, var(--font-body)",
                  fontWeight: "700",
                }}
              >
                <span className="w-2 h-2 rounded-full bg-current" />
                {typeLabels[job.type][lang]}
              </span>
            </div>
          </div>

          {/* Description - responsive */}
          <p
            className="text-sm sm:text-base text-slate-600 mb-8 leading-relaxed group-hover:text-slate-700 transition-colors duration-300"
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
          <div className="pt-6 sm:pt-8 border-t border-slate-100 group-hover:border-accent-warm-gold/20 transition-colors flex justify-end">
            <span className="text-xs sm:text-sm font-bold text-accent-warm-gold group-hover:text-accent-warm-orange transition-colors flex items-center gap-2 uppercase tracking-wider">
              {lang === "en" ? "View Position" : "مشاهده موقعیت"}
              <svg
                className="w-4 h-4 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-300"
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
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
