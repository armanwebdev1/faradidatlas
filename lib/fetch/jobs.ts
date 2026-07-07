import { getPayloadClient } from '../payload'
import type { Job } from '../../components/careers/job-data'

export async function getJobs(locale: string = 'en') {
  const payload = await getPayloadClient()

  const jobs = await payload.find({
    collection: 'jobs',
    limit: 100,
  })

  return jobs.docs.map((job) => ({
    id: job.id,
    titleEn: (job.title as any)?.en ?? '',
    titleFa: (job.title as any)?.fa ?? '',
    titleAr: (job.title as any)?.ar ?? '',
    departmentEn: (job.department as any)?.en ?? '',
    departmentFa: (job.department as any)?.fa ?? '',
    departmentAr: (job.department as any)?.ar ?? '',
    locationEn: (job.location as any)?.en ?? '',
    locationFa: (job.location as any)?.fa ?? '',
    locationAr: (job.location as any)?.ar ?? '',
    type: job.type as Job['type'],
    descriptionEn: (job.description as any)?.en ?? '',
    descriptionFa: (job.description as any)?.fa ?? '',
    descriptionAr: (job.description as any)?.ar ?? '',
    responsibilitiesEn: ((job.responsibilities as any)?.en ?? []).map((r: any) => r.item ?? r),
    responsibilitiesFa: ((job.responsibilities as any)?.fa ?? []).map((r: any) => r.item ?? r),
    responsibilitiesAr: ((job.responsibilities as any)?.ar ?? []).map((r: any) => r.item ?? r),
    requirementsEn: ((job.requirements as any)?.en ?? []).map((r: any) => r.item ?? r),
    requirementsFa: ((job.requirements as any)?.fa ?? []).map((r: any) => r.item ?? r),
    requirementsAr: ((job.requirements as any)?.ar ?? []).map((r: any) => r.item ?? r),
    benefitsEn: ((job.benefits as any)?.en ?? []).map((r: any) => r.item ?? r),
    benefitsFa: ((job.benefits as any)?.fa ?? []).map((r: any) => r.item ?? r),
    benefitsAr: ((job.benefits as any)?.ar ?? []).map((r: any) => r.item ?? r),
  }))
}

export async function getJobById(
  id: number,
  locale: string = 'en',
) {
  const payload = await getPayloadClient()

  const jobs = await payload.find({
    collection: 'jobs',
    where: { id: { equals: id } },
    limit: 1,
  })

  const job = jobs.docs[0]
  if (!job) return null

  return {
    id: job.id,
    titleEn: (job.title as any)?.en ?? '',
    titleFa: (job.title as any)?.fa ?? '',
    titleAr: (job.title as any)?.ar ?? '',
    departmentEn: (job.department as any)?.en ?? '',
    departmentFa: (job.department as any)?.fa ?? '',
    departmentAr: (job.department as any)?.ar ?? '',
    locationEn: (job.location as any)?.en ?? '',
    locationFa: (job.location as any)?.fa ?? '',
    locationAr: (job.location as any)?.ar ?? '',
    type: job.type as Job['type'],
    descriptionEn: (job.description as any)?.en ?? '',
    descriptionFa: (job.description as any)?.fa ?? '',
    descriptionAr: (job.description as any)?.ar ?? '',
    responsibilitiesEn: ((job.responsibilities as any)?.en ?? []).map((r: any) => r.item ?? r),
    responsibilitiesFa: ((job.responsibilities as any)?.fa ?? []).map((r: any) => r.item ?? r),
    responsibilitiesAr: ((job.responsibilities as any)?.ar ?? []).map((r: any) => r.item ?? r),
    requirementsEn: ((job.requirements as any)?.en ?? []).map((r: any) => r.item ?? r),
    requirementsFa: ((job.requirements as any)?.fa ?? []).map((r: any) => r.item ?? r),
    requirementsAr: ((job.requirements as any)?.ar ?? []).map((r: any) => r.item ?? r),
    benefitsEn: ((job.benefits as any)?.en ?? []).map((r: any) => r.item ?? r),
    benefitsFa: ((job.benefits as any)?.fa ?? []).map((r: any) => r.item ?? r),
    benefitsAr: ((job.benefits as any)?.ar ?? []).map((r: any) => r.item ?? r),
  }
}
