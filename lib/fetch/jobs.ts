import { getPayloadClient } from '../payload'

export async function getJobs(locale: string = 'en') {
  const payload = await getPayloadClient()

  const jobs = await payload.find({
    collection: 'jobs',
    locale: locale as 'en' | 'fa' | 'ar',
    limit: 100,
  })

  return jobs.docs
}

export async function getJobById(
  id: number,
  locale: string = 'en',
) {
  const payload = await getPayloadClient()

  const jobs = await payload.find({
    collection: 'jobs',
    locale: locale as 'en' | 'fa' | 'ar',
    where: { id: { equals: id } },
    limit: 1,
  })

  return jobs.docs[0] || null
}
