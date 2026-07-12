import { cache } from 'react'
import { getPayloadClient } from '../payload'
import type {
  FAQItem,
} from '../../components/faq/faq-data'

export const getFAQs = cache(async function getFAQs(locale: string = 'en') {
  const payload = await getPayloadClient()

  const faqs = await payload.find({
    collection: 'faqs',
    limit: 100,
  })

  return faqs.docs.map((faq) => ({
    id: faq.id,
    questionEn: (faq.question as any)?.en ?? '',
    questionFa: (faq.question as any)?.fa ?? '',
    questionAr: (faq.question as any)?.ar ?? '',
    answerEn: (faq.answer as any)?.en ?? '',
    answerFa: (faq.answer as any)?.fa ?? '',
    answerAr: (faq.answer as any)?.ar ?? '',
    category: faq.category as FAQItem['category'],
  }))
})

export const getFAQsByCategory = cache(async function getFAQsByCategory(
  category: string,
  locale: string = 'en',
) {
  const payload = await getPayloadClient()

  const faqs = await payload.find({
    collection: 'faqs',
    where: { category: { equals: category } },
    limit: 100,
  })

  return faqs.docs.map((faq) => ({
    id: faq.id,
    questionEn: (faq.question as any)?.en ?? '',
    questionFa: (faq.question as any)?.fa ?? '',
    questionAr: (faq.question as any)?.ar ?? '',
    answerEn: (faq.answer as any)?.en ?? '',
    answerFa: (faq.answer as any)?.fa ?? '',
    answerAr: (faq.answer as any)?.ar ?? '',
    category: faq.category as FAQItem['category'],
  }))
})
