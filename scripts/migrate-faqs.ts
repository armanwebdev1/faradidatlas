import type { Payload } from 'payload'
import { faqs } from '../components/faq/faq-data'

export async function importFAQs(payload: Payload) {
  for (const faq of faqs) {
    try {
      const doc = await payload.create({
        collection: 'faqs',
        locale: 'en',
        data: {
          question: faq.questionEn,
          answer: faq.answerEn,
          category: faq.category,
        },
      })
      await payload.update({
        collection: 'faqs',
        id: doc.id,
        locale: 'fa',
        data: { question: faq.questionFa, answer: faq.answerFa },
      })
      await payload.update({
        collection: 'faqs',
        id: doc.id,
        locale: 'ar',
        data: { question: faq.questionAr, answer: faq.answerAr },
      })
      console.log(`  Created FAQ: ${faq.questionEn.substring(0, 50)}...`)
    } catch {
      console.log(`  FAQ ${faq.id} may already exist, skipping...`)
    }
  }
}
