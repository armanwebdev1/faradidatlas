import type { Payload } from 'payload'
import { faqs } from '../components/faq/faq-data'

export async function importFAQs(payload: Payload) {
  for (const faq of faqs) {
    try {
      await payload.create({
        collection: 'faqs',
        data: {
          question: faq.questionEn,
          answer: faq.answerEn,
          category: faq.category,
        },
      })
      console.log(`  Created FAQ: ${faq.questionEn.substring(0, 50)}...`)
    } catch {
      console.log(`  FAQ ${faq.id} may already exist, skipping...`)
    }
  }
}
