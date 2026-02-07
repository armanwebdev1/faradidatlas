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
  const department = lang === "en" ? job.departmentEn : job.departmentFa;
  const location = lang === "en" ? job.locationEn : job.locationFa;
  const responsibilities =
    lang === "en" ? job.responsibilitiesEn : job.responsibilitiesFa;
  const requirements = lang === "en" ? job.requirementsEn : job.requirementsFa;
  const benefits = lang === "en" ? job.benefitsEn : job.benefitsFa;
  const typeLabel =
    job.type === "full-time"
      ? lang === "en"
        ? "Full-time"
        : "تمام‌وقت"
      : job.type === "part-time"
        ? lang === "en"
          ? "Part-time"
          : "پاره‌وقت"
        : lang === "en"
          ? "Contract"
          : "قرارداد";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] gap-10 lg:gap-16 items-start">
      <div
        className="rounded-3xl border border-foreground/10 bg-white/85 p-6 sm:p-8 shadow-[0_35px_80px_-60px_rgba(10,10,10,0.5)] backdrop-blur motion-safe:animate-fade-in-up"
        style={{ animationDelay: "0.05s" }}
      >
        <div>
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] text-accent-warm-gold">
            {lang === "en" ? "Career Opportunity" : "فرصت شغلی"}
          </p>
          <h1
            className="mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground leading-tight tracking-tight"
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
            className="mt-5 text-sm sm:text-base text-foreground/70 leading-relaxed"
            style={{
              fontFamily:
                lang === "en" ? "var(--font-body)" : "Shabnam, var(--font-body)",
              fontWeight: "400",
            }}
          >
            {description}
          </p>
        </div>

        <section className="mt-8 sm:mt-10 pt-8 sm:pt-10 border-t border-foreground/10">
          <h2
            className="text-2xl sm:text-3xl font-semibold text-foreground mb-6 tracking-tight"
            style={{
              fontFamily:
                lang === "en"
                  ? "var(--font-hero)"
                  : "Estedad, var(--font-hero)",
            }}
          >
            {lang === "en" ? "Responsibilities" : "مسئولیت‌ها"}
          </h2>
          <ul className="space-y-3 sm:space-y-4">
            {responsibilities.map((item, idx) => (
              <li key={idx} className="flex gap-3 sm:gap-4 text-sm sm:text-base">
                <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-accent-warm-gold" />
                <span
                  className="text-foreground/75 leading-relaxed"
                  style={{
                    fontFamily:
                      lang === "en"
                        ? "var(--font-body)"
                        : "Shabnam, var(--font-body)",
                  }}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8 sm:mt-10 pt-8 sm:pt-10 border-t border-foreground/10">
          <h2
            className="text-2xl sm:text-3xl font-semibold text-foreground mb-6 tracking-tight"
            style={{
              fontFamily:
                lang === "en"
                  ? "var(--font-hero)"
                  : "Estedad, var(--font-hero)",
            }}
          >
            {lang === "en" ? "Requirements" : "الزامات"}
          </h2>
          <ul className="space-y-3 sm:space-y-4">
            {requirements.map((item, idx) => (
              <li key={idx} className="flex gap-3 sm:gap-4 text-sm sm:text-base">
                <span className="mt-0.5 text-accent-warm-gold font-semibold">
                  ✓
                </span>
                <span
                  className="text-foreground/75 leading-relaxed"
                  style={{
                    fontFamily:
                      lang === "en"
                        ? "var(--font-body)"
                        : "Shabnam, var(--font-body)",
                  }}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8 sm:mt-10 pt-8 sm:pt-10 border-t border-foreground/10">
          <h2
            className="text-2xl sm:text-3xl font-semibold text-foreground mb-6 tracking-tight"
            style={{
              fontFamily:
                lang === "en"
                  ? "var(--font-hero)"
                  : "Estedad, var(--font-hero)",
            }}
          >
            {lang === "en" ? "Benefits" : "مزایا"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-foreground/10 bg-white/80 px-4 py-3 text-center"
              >
                <p
                  className="text-foreground/80 font-medium text-sm sm:text-base"
                  style={{
                    fontFamily:
                      lang === "en"
                        ? "var(--font-body)"
                        : "Shabnam, var(--font-body)",
                  }}
                >
                  {benefit}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <aside className="space-y-6 lg:sticky lg:top-28 h-fit">
        <div
          className="rounded-3xl border border-foreground/10 bg-white/85 p-6 sm:p-7 shadow-[0_35px_80px_-60px_rgba(10,10,10,0.5)] motion-safe:animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] text-foreground/50">
            {lang === "en" ? "At a Glance" : "نگاهی کوتاه"}
          </h3>
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between gap-4 border-b border-foreground/5 pb-3">
              <span className="text-xs font-semibold uppercase text-foreground/50">
                {lang === "en" ? "Department" : "بخش"}
              </span>
              <span className="text-sm font-semibold text-foreground">
                {department}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4 border-b border-foreground/5 pb-3">
              <span className="text-xs font-semibold uppercase text-foreground/50">
                {lang === "en" ? "Location" : "مکان"}
              </span>
              <span className="text-sm font-semibold text-foreground">
                {location}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs font-semibold uppercase text-foreground/50">
                {lang === "en" ? "Type" : "نوع"}
              </span>
              <span className="text-sm font-semibold text-foreground">
                {typeLabel}
              </span>
            </div>
          </div>
        </div>

        <div
          className="rounded-3xl border border-foreground/10 bg-gradient-to-br from-foreground to-foreground/90 p-6 sm:p-7 text-white shadow-[0_35px_80px_-60px_rgba(10,10,10,0.55)] motion-safe:animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          <h3
            className="text-xl sm:text-2xl font-semibold text-white"
            style={{
              fontFamily:
                lang === "en"
                  ? "var(--font-hero)"
                  : "Estedad, var(--font-hero)",
            }}
          >
            {lang === "en" ? "Apply for this role" : "درخواست برای این موقعیت"}
          </h3>
          <p className="mt-3 text-sm text-white/70">
            {lang === "en"
              ? "We review applications on a rolling basis."
              : "درخواست‌ها به‌صورت دوره‌ای بررسی می‌شوند."}
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <Link
              href={`/${lang}/careers/${job.id}/apply`}
              className="inline-flex items-center justify-center rounded-full bg-white text-foreground px-6 py-3 text-sm sm:text-base font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
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
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm sm:text-base font-semibold text-white transition-all duration-300 hover:border-white/60 hover:bg-white/10"
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
      </aside>
    </div>
  );
}
