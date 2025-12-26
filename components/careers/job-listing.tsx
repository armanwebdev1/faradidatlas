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
      <div className="bg-white border border-border rounded-lg p-8 hover:shadow-lg hover:border-accent-warm-gold transition-all duration-300 cursor-pointer group">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-bold text-primary mb-2 group-hover:text-accent-warm-orange transition-colors">
              {title}
            </h3>
            <p className="text-neutral mb-4">{job.department}</p>
          </div>
          <span className={`px-3 py-1 rounded text-xs font-semibold whitespace-nowrap ${typeColors[job.type]}`}>
            {typeLabels[job.type][lang]}
          </span>
        </div>

        <p className="text-foreground mb-6 leading-relaxed">{description}</p>

        <div className="flex justify-between items-center pt-6 border-t border-border">
          <span className="text-sm text-neutral flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
            </svg>
            {job.location}
          </span>
          <span className="text-sm font-semibold text-accent-warm-orange group-hover:text-accent-warm-red transition-colors">
            {lang === "en" ? "View Details" : "مشاهده جزئیات"}
          </span>
        </div>
      </div>
    </Link>
  )
}
