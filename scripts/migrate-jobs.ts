import type { Payload } from 'payload'
import { jobs } from '../components/careers/job-data'

export async function importJobs(payload: Payload) {
  for (const job of jobs) {
    try {
      const doc = await payload.create({
        collection: 'jobs',
        locale: 'en',
        data: {
          title: job.titleEn,
          department: job.departmentEn,
          location: job.locationEn,
          type: job.type,
          description: job.descriptionEn,
          responsibilities: job.responsibilitiesEn.map((item) => ({ item })),
          requirements: job.requirementsEn.map((item) => ({ item })),
          benefits: job.benefitsEn.map((item) => ({ item })),
        },
      })
      await payload.update({
        collection: 'jobs',
        id: doc.id,
        locale: 'fa',
        data: {
          title: job.titleFa,
          department: job.departmentFa,
          location: job.locationFa,
          description: job.descriptionFa,
          responsibilities: job.responsibilitiesFa.map((item) => ({ item })),
          requirements: job.requirementsFa.map((item) => ({ item })),
          benefits: job.benefitsFa.map((item) => ({ item })),
        },
      })
      await payload.update({
        collection: 'jobs',
        id: doc.id,
        locale: 'ar',
        data: {
          title: job.titleAr,
          department: job.departmentAr,
          location: job.locationAr,
          description: job.descriptionAr,
          responsibilities: job.responsibilitiesAr.map((item) => ({ item })),
          requirements: job.requirementsAr.map((item) => ({ item })),
          benefits: job.benefitsAr.map((item) => ({ item })),
        },
      })
      console.log(`  Created job: ${job.titleEn}`)
    } catch {
      console.log(`  Job ${job.id} may already exist, skipping...`)
    }
  }
}
