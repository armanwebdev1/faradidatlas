"use client";

import type { Language } from "@/lib/i18n";
import type { Job } from "./job-data";
import Link from "next/link";

interface JobDetailProps {
  job: Job;
  lang: Language;
}

export function JobDetail({ job, lang }: JobDetailProps) {
  const title = lang === "en" ? job.titleEn : job.titleFa;
  const description = lang === "en" ? job.descriptionEn : job.descriptionFa;
  const responsibilities =
    lang === "en" ? job.responsibilitiesEn : job.responsibilitiesFa;
  const requirements = lang === "en" ? job.requirementsEn : job.requirementsFa;

  return (
    <div>
      {/* Header - responsive typography */}
      <div className="mb-10 sm:mb-14 md:mb-16">
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground mb-5 sm:mb-6 leading-tight tracking-tight"
          style={{
            fontFamily:
              lang === "en"
                ? "var(--font-hero)"
                : "Estedad, var(--font-hero)",
            fontWeight: "600",
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </h1>
        <p
          className="text-base sm:text-lg text-foreground/70 mb-8 sm:mb-10 leading-relaxed"
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

        {/* Job metadata - responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <div className="px-4 sm:px-6 py-3 sm:py-4 rounded-xl border border-foreground/8 bg-gradient-to-br from-foreground/[0.02] to-foreground/[0.01]">
            <span className="text-xs font-semibold text-foreground/60 uppercase block mb-2 tracking-wide">
              {lang === "en" ? "Department" : "بخش"}
            </span>
            <span
              className="text-sm sm:text-base font-semibold text-foreground"
              style={{
                fontFamily:
                  lang === "en"
                    ? "var(--font-hero)"
                    : "Estedad, var(--font-hero)",
              }}
            >
              {job.department}
            </span>
          </div>
          <div className="px-4 sm:px-6 py-3 sm:py-4 rounded-xl border border-foreground/8 bg-gradient-to-br from-foreground/[0.02] to-foreground/[0.01]">
            <span className="text-xs font-semibold text-foreground/60 uppercase block mb-2 tracking-wide">
              {lang === "en" ? "Location" : "مکان"}
            </span>
            <span
              className="text-sm sm:text-base font-semibold text-foreground"
              style={{
                fontFamily:
                  lang === "en"
                    ? "var(--font-hero)"
                    : "Estedad, var(--font-hero)",
              }}
            >
              {job.location}
            </span>
          </div>
          <div className="px-4 sm:px-6 py-3 sm:py-4 rounded-xl border border-foreground/8 bg-gradient-to-br from-foreground/[0.02] to-foreground/[0.01]">
            <span className="text-xs font-semibold text-foreground/60 uppercase block mb-2 tracking-wide">
              {lang === "en" ? "Type" : "نوع"}
            </span>
            <span
              className="text-sm sm:text-base font-semibold text-foreground"
              style={{
                fontFamily:
                  lang === "en"
                    ? "var(--font-hero)"
                    : "Estedad, var(--font-hero)",
              }}
            >
              {job.type === "full-time"
                ? lang === "en"
                  ? "Full-time"
                  : "تمام‌وقت"
                : ""}
              {job.type === "part-time"
                ? lang === "en"
                  ? "Part-time"
                  : "پاره‌وقت"
                : ""}
              {job.type === "contract"
                ? lang === "en"
                  ? "Contract"
                  : "قرارداد"
                : ""}
            </span>
          </div>
        </div>
      </div>

      {/* Responsibilities - responsive */}
      <div className="mb-10 sm:mb-14 md:mb-16 p-6 sm:p-8 md:p-10 rounded-2xl border border-foreground/8 bg-gradient-to-br from-foreground/[0.02] to-foreground/[0.01]">
        <h2
          className="text-2xl sm:text-3xl font-semibold text-foreground mb-6 sm:mb-8 tracking-tight"
          style={{
            fontFamily:
              lang === "en"
                ? "var(--font-hero)"
                : "Estedad, var(--font-hero)",
            fontWeight: "600",
          }}
        >
          {lang === "en" ? "Responsibilities" : "مسئولیت‌ها"}
        </h2>
        <ul className="space-y-3 sm:space-y-4">
          {responsibilities.map((item, idx) => (
            <li key={idx} className="flex gap-3 sm:gap-4 text-sm sm:text-base">
              <span className="text-accent-warm-gold font-bold flex-shrink-0 mt-0.5">
                •
              </span>
              <span
                className="text-foreground/75 leading-relaxed"
                style={{
                  fontFamily:
                    lang === "en"
                      ? "var(--font-body)"
                      : "Shabnam, var(--font-body)",
                  fontWeight: "400",
                }}
              >
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Requirements - responsive */}
      <div className="mb-10 sm:mb-14 md:mb-16 p-6 sm:p-8 md:p-10 rounded-2xl border border-foreground/8 bg-gradient-to-br from-foreground/[0.02] to-foreground/[0.01]">
        <h2
          className="text-2xl sm:text-3xl font-semibold text-foreground mb-6 sm:mb-8 tracking-tight"
          style={{
            fontFamily:
              lang === "en"
                ? "var(--font-hero)"
                : "Estedad, var(--font-hero)",
            fontWeight: "600",
          }}
        >
          {lang === "en" ? "Requirements" : "الزامات"}
        </h2>
        <ul className="space-y-3 sm:space-y-4">
          {requirements.map((item, idx) => (
            <li key={idx} className="flex gap-3 sm:gap-4 text-sm sm:text-base">
              <span className="text-accent-warm-gold font-bold flex-shrink-0 mt-0.5">
                ✓
              </span>
              <span
                className="text-foreground/75 leading-relaxed"
                style={{
                  fontFamily:
                    lang === "en"
                      ? "var(--font-body)"
                      : "Shabnam, var(--font-body)",
                  fontWeight: "400",
                }}
              >
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Benefits - responsive grid */}
      <div className="mb-10 sm:mb-14 md:mb-16 p-6 sm:p-8 md:p-10 rounded-2xl border border-accent-warm-gold/20 bg-gradient-to-br from-accent-warm-gold/5 to-transparent">
        <h2
          className="text-2xl sm:text-3xl font-semibold text-foreground mb-6 sm:mb-8 tracking-tight"
          style={{
            fontFamily:
              lang === "en"
                ? "var(--font-hero)"
                : "Estedad, var(--font-hero)",
            fontWeight: "600",
          }}
        >
          {lang === "en" ? "Benefits" : "مزایا"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {job.benefits.map((benefit, idx) => (
            <div key={idx} className="text-center p-3 sm:p-4">
              <p
                className="text-foreground/80 font-medium text-sm sm:text-base"
                style={{
                  fontFamily:
                    lang === "en"
                      ? "var(--font-body)"
                      : "Shabnam, var(--font-body)",
                  fontWeight: "500",
                }}
              >
                {benefit}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Apply Buttons - responsive stack */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <Link
          href={`/${lang}/careers/${job.id}/apply`}
          className="flex-1 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-foreground to-foreground/80 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 text-center text-sm sm:text-base"
          style={{
            fontFamily:
              lang === "en"
                ? "var(--font-body)"
                : "Shabnam, var(--font-body)",
          }}
        >
          {lang === "en" ? "Apply Now" : "اعمال درخواست"}
        </Link>
        <Link
          href={`/${lang}/careers`}
          className="flex-1 px-6 sm:px-8 py-3 sm:py-4 border border-foreground/20 text-foreground font-semibold rounded-xl hover:border-foreground/40 hover:bg-foreground/5 transition-all duration-300 text-center text-sm sm:text-base"
          style={{
            fontFamily:
              lang === "en"
                ? "var(--font-body)"
                : "Shabnam, var(--font-body)",
          }}
        >
          {lang === "en" ? "View All Jobs" : "مشاهده تمام شغل‌ها"}
        </Link>
      </div>
    </div>
  );
}
