import type { Payload } from 'payload'
import { jobs } from '../components/careers/job-data'

export async function importJobs(payload: Payload) {
  for (const job of jobs) {
    try {
      await payload.create({
        collection: 'jobs',
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
      console.log(`  Created job: ${job.titleEn}`)
    } catch {
      console.log(`  Job ${job.id} may already exist, skipping...`)
    }
  }
}
