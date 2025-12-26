"use client"

import type { Language } from "@/lib/i18n"
import type { Job } from "./job-data"
import Link from "next/link"

interface JobDetailProps {
  job: Job
  lang: Language
}

export function JobDetail({ job, lang }: JobDetailProps) {
  const title = lang === "en" ? job.titleEn : job.titleFa
  const description = lang === "en" ? job.descriptionEn : job.descriptionFa
  const responsibilities = lang === "en" ? job.responsibilitiesEn : job.responsibilitiesFa
  const requirements = lang === "en" ? job.requirementsEn : job.requirementsFa

  return (
    <div>
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-primary mb-4">{title}</h1>
        <p className="text-xl text-neutral mb-6">{description}</p>

        <div className="flex flex-wrap gap-4">
          <div className="px-4 py-2 bg-background rounded border border-border">
            <span className="text-xs font-semibold text-neutral uppercase block mb-1">
              {lang === "en" ? "Department" : "بخش"}
            </span>
            <span className="text-lg font-semibold text-primary">{job.department}</span>
          </div>
          <div className="px-4 py-2 bg-background rounded border border-border">
            <span className="text-xs font-semibold text-neutral uppercase block mb-1">
              {lang === "en" ? "Location" : "مکان"}
            </span>
            <span className="text-lg font-semibold text-primary">{job.location}</span>
          </div>
          <div className="px-4 py-2 bg-background rounded border border-border">
            <span className="text-xs font-semibold text-neutral uppercase block mb-1">
              {lang === "en" ? "Type" : "نوع"}
            </span>
            <span className="text-lg font-semibold text-primary">
              {job.type === "full-time" ? (lang === "en" ? "Full-time" : "تمام‌وقت") : ""}
              {job.type === "part-time" ? (lang === "en" ? "Part-time" : "پاره‌وقت") : ""}
              {job.type === "contract" ? (lang === "en" ? "Contract" : "قرارداد") : ""}
            </span>
          </div>
        </div>
      </div>

      {/* Responsibilities */}
      <div className="mb-12 p-8 bg-background rounded-lg border border-border">
        <h2 className="text-2xl font-bold text-primary mb-6">{lang === "en" ? "Responsibilities" : "مسئولیت‌ها"}</h2>
        <ul className="space-y-3">
          {responsibilities.map((item, idx) => (
            <li key={idx} className="flex gap-4">
              <span className="text-primary font-bold flex-shrink-0">•</span>
              <span className="text-foreground leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Requirements */}
      <div className="mb-12 p-8 bg-white rounded-lg border border-border">
        <h2 className="text-2xl font-bold text-primary mb-6">{lang === "en" ? "Requirements" : "الزامات"}</h2>
        <ul className="space-y-3">
          {requirements.map((item, idx) => (
            <li key={idx} className="flex gap-4">
              <span className="text-accent font-bold flex-shrink-0">✓</span>
              <span className="text-foreground leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Benefits */}
      <div className="mb-12 p-8 bg-accent/10 rounded-lg border border-accent">
        <h2 className="text-2xl font-bold text-primary mb-6">{lang === "en" ? "Benefits" : "مزایا"}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {job.benefits.map((benefit, idx) => (
            <div key={idx} className="text-center">
              <p className="text-foreground font-medium">{benefit}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Apply Button */}
      <div className="flex gap-4">
        <Link
          href={`/${lang}/careers/${job.id}/apply`}
          className="flex-1 px-8 py-4 bg-primary text-white font-semibold rounded hover:bg-accent transition-colors text-center"
        >
          {lang === "en" ? "Apply Now" : "اعمال درخواست"}
        </Link>
        <Link
          href={`/${lang}/careers`}
          className="flex-1 px-8 py-4 border-2 border-primary text-primary font-semibold rounded hover:bg-background transition-colors text-center"
        >
          {lang === "en" ? "View All Jobs" : "مشاهده تمام شغل‌ها"}
        </Link>
      </div>
    </div>
  )
}
