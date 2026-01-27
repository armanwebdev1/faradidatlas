"use client"

import Link from "next/link"
import type { Language } from "@/lib/i18n"
import type { Job } from "./job-data"

interface JobListingProps {
  job: Job
  lang: Language
}

export function JobListing({ job, lang }: JobListingProps) {
  const title = lang === "en" ? job.titleEn : job.titleFa
  const description = lang === "en" ? job.descriptionEn : job.descriptionFa

  const typeColors: Record<Job["type"], string> = {
    "full-time": "bg-primary text-white",
    "part-time": "bg-accent-warm-orange text-white",
    contract: "bg-accent-warm-red text-white",
  }

  const typeLabels = {
    "full-time": { en: "Full-time", fa: "تمام‌وقت" },
    "part-time": { en: "Part-time", fa: "پاره‌وقت" },
    contract: { en: "Contract", fa: "قرارداد" },
  }

  return (
    <Link href={`/${lang}/careers/${job.id}`}>
      <div className="group relative bg-white border border-gray-200 rounded-xl p-8 hover:border-amber-300 hover:shadow-xl transition-all duration-500 cursor-pointer overflow-hidden">
        {/* Hover background */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

        <div className="flex flex-col md:flex-row justify-between md:items-start gap-6 mb-6">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-primary mb-2 group-hover:text-amber-700 transition-colors">
              {title}
            </h3>
            <p className="text-amber-700 font-semibold mb-1">{job.department}</p>
            <p className="text-gray-600 flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
              </svg>
              {job.location}
            </p>
          </div>
          <span className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap shadow-md ${
            job.type === "full-time" ? "bg-gradient-to-r from-primary to-gray-800 text-white" :
            job.type === "part-time" ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white" :
            "bg-gradient-to-r from-red-500 to-red-600 text-white"
          }`}>
            {typeLabels[job.type][lang]}
          </span>
        </div>

        <p className="text-gray-700 mb-6 leading-relaxed">{description}</p>

        <div className="pt-6 border-t border-gray-200 group-hover:border-amber-200 transition-colors flex justify-end">
          <span className="text-sm font-bold text-amber-700 group-hover:text-amber-900 transition-colors flex items-center gap-2">
            {lang === "en" ? "View Details" : "مشاهده جزئیات"}
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  )
}
