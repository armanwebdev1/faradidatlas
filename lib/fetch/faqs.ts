import { getPayloadClient } from '../payload'
import type { Payload } from 'payload'
import {
  type FAQItem,
} from '../../components/faq/faq-data'

export async function getFAQs(locale: string = 'en') {
  const payload = await getPayloadClient()

  const faqs = await payload.find({
    collection: 'faqs',
    locale: locale as 'en' | 'fa' | 'ar',
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
}

export async function getFAQsByCategory(
  category: string,
  locale: string = 'en',
) {
  const payload = await getPayloadClient()

  const faqs = await payload.find({
    collection: 'faqs',
    where: { category: { equals: category } },
    locale: locale as 'en' | 'fa' | 'ar',
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
}
