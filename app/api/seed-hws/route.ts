import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { translations } from '@/lib/i18n'

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  if (body?.secret !== process.env.PAYLOAD_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const payload = await getPayload({ config })

  const enText = translations.en.pages.products.howWeSupplyDescription
  const faText = translations.fa.pages.products.howWeSupplyDescription
  const arText = translations.ar.pages.products.howWeSupplyDescription

  let page = 1
  let hasMore = true
  let updated = 0

  while (hasMore) {
    const docs = await payload.find({
      collection: 'products',
      limit: 100,
      page,
    })

    for (const doc of docs.docs) {
      await payload.update({
        collection: 'products',
        id: doc.id,
        locale: 'en',
        data: { howWeSupplyDescription: enText },
      })
      await payload.update({
        collection: 'products',
        id: doc.id,
        locale: 'fa',
        data: { howWeSupplyDescription: faText },
      })
      await payload.update({
        collection: 'products',
        id: doc.id,
        locale: 'ar',
        data: { howWeSupplyDescription: arText },
      })
      updated++
    }

    hasMore = docs.hasNextPage
    page++
  }

  return NextResponse.json({ success: true, updated })
}
