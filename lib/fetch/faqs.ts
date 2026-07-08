import { getPayloadClient } from '../payload'
import type { Payload } from 'payload'
import {
  type FAQItem,
} from '../../components/faq/faq-data'

export async function getFAQs(locale: string = 'en') {
  console.log(`\n[INSTR] getFAQs ENTER  caller=${new Error().stack?.split('\n')[2]?.trim()}`)
  const t = Date.now()
  const payload = await getPayloadClient()

  const faqs = await payload.find({
    collection: 'faqs',
    limit: 100,
  })

  const result = faqs.docs.map((faq) => ({
    id: faq.id,
    questionEn: (faq.question as any)?.en ?? '',
    questionFa: (faq.question as any)?.fa ?? '',
    questionAr: (faq.question as any)?.ar ?? '',
    answerEn: (faq.answer as any)?.en ?? '',
    answerFa: (faq.answer as any)?.fa ?? '',
    answerAr: (faq.answer as any)?.ar ?? '',
    category: faq.category as FAQItem['category'],
  }))

  console.log(`[INSTR] getFAQs EXIT  ${Date.now() - t}ms`)
  return result
}

export async function getFAQsByCategory(
  category: string,
  locale: string = 'en',
) {
  console.log(`\n[INSTR] getFAQsByCategory("${category}") ENTER  caller=${new Error().stack?.split('\n')[2]?.trim()}`)
  const t = Date.now()
  const payload = await getPayloadClient()

  const faqs = await payload.find({
    collection: 'faqs',
    where: { category: { equals: category } },
    limit: 100,
  })

  const result = faqs.docs.map((faq) => ({
    id: faq.id,
    questionEn: (faq.question as any)?.en ?? '',
    questionFa: (faq.question as any)?.fa ?? '',
    questionAr: (faq.question as any)?.ar ?? '',
    answerEn: (faq.answer as any)?.en ?? '',
    answerFa: (faq.answer as any)?.fa ?? '',
    answerAr: (faq.answer as any)?.ar ?? '',
    category: faq.category as FAQItem['category'],
  }))

  console.log(`[INSTR] getFAQsByCategory EXIT  ${Date.now() - t}ms`)
  return result
}
