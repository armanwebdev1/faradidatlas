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
      {/* Header - responsive typography */}
      <div className="mb-8 sm:mb-12">
        <h1 className="text-responsive-title text-primary mb-3 sm:mb-4">{title}</h1>
        <p className="text-responsive-body text-gray-700 mb-6 sm:mb-8 leading-relaxed">{description}</p>

        {/* Job metadata - responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <div className="px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 rounded-lg border border-gray-200">
            <span className="text-xs font-semibold text-gray-600 uppercase block mb-1">
              {lang === "en" ? "Department" : "بخش"}
            </span>
            <span className="text-sm sm:text-base font-semibold text-primary">{job.department}</span>
          </div>
          <div className="px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 rounded-lg border border-gray-200">
            <span className="text-xs font-semibold text-gray-600 uppercase block mb-1">
              {lang === "en" ? "Location" : "مکان"}
            </span>
            <span className="text-sm sm:text-base font-semibold text-primary">{job.location}</span>
          </div>
          <div className="px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 rounded-lg border border-gray-200">
            <span className="text-xs font-semibold text-gray-600 uppercase block mb-1">
              {lang === "en" ? "Type" : "نوع"}
            </span>
            <span className="text-sm sm:text-base font-semibold text-primary">
              {job.type === "full-time" ? (lang === "en" ? "Full-time" : "تمام‌وقت") : ""}
              {job.type === "part-time" ? (lang === "en" ? "Part-time" : "پاره‌وقت") : ""}
              {job.type === "contract" ? (lang === "en" ? "Contract" : "قرارداد") : ""}
            </span>
          </div>
        </div>
      </div>

      {/* Responsibilities - responsive */}
      <div className="mb-8 sm:mb-12 p-4 sm:p-6 md:p-8 bg-gray-50 rounded-lg border border-gray-200">
        <h2 className="text-responsive-section text-primary mb-4 sm:mb-6">{lang === "en" ? "Responsibilities" : "مسئولیت‌ها"}</h2>
        <ul className="space-y-2 sm:space-y-3">
          {responsibilities.map((item, idx) => (
            <li key={idx} className="flex gap-3 sm:gap-4 text-sm sm:text-base">
              <span className="text-primary font-bold flex-shrink-0">•</span>
              <span className="text-gray-700 leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Requirements - responsive */}
      <div className="mb-8 sm:mb-12 p-4 sm:p-6 md:p-8 bg-white rounded-lg border border-gray-200">
        <h2 className="text-responsive-section text-primary mb-4 sm:mb-6">{lang === "en" ? "Requirements" : "الزامات"}</h2>
        <ul className="space-y-2 sm:space-y-3">
          {requirements.map((item, idx) => (
            <li key={idx} className="flex gap-3 sm:gap-4 text-sm sm:text-base">
              <span className="text-amber-600 font-bold flex-shrink-0">✓</span>
              <span className="text-gray-700 leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Benefits - responsive grid */}
      <div className="mb-8 sm:mb-12 p-4 sm:p-6 md:p-8 bg-amber-50 rounded-lg border border-amber-200">
        <h2 className="text-responsive-section text-primary mb-4 sm:mb-6">{lang === "en" ? "Benefits" : "مزایا"}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {job.benefits.map((benefit, idx) => (
            <div key={idx} className="text-center p-2 sm:p-3">
              <p className="text-gray-700 font-medium text-sm sm:text-base">{benefit}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Apply Buttons - responsive stack */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <Link
          href={`/${lang}/careers/${job.id}/apply`}
          className="flex-1 px-4 sm:px-8 py-3 sm:py-4 bg-primary text-white font-semibold rounded-lg hover:bg-amber-700 transition-colors text-center text-sm sm:text-base"
        >
          {lang === "en" ? "Apply Now" : "اعمال درخواست"}
        </Link>
        <Link
          href={`/${lang}/careers`}
          className="flex-1 px-4 sm:px-8 py-3 sm:py-4 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-gray-50 transition-colors text-center text-sm sm:text-base"
        >
          {lang === "en" ? "View All Jobs" : "مشاهده تمام شغل‌ها"}
        </Link>
      </div>
    </div>
  )
}
