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

  // 1. Ensure the columns exist (in case push didn't run)
  const sql = (payload.db as any).drizzle
  if (sql) {
    try {
      await sql.execute(`ALTER TABLE "products_locales" ADD COLUMN IF NOT EXISTS "how_we_supply_description" varchar`)
    } catch {}
    try {
      await sql.execute(`ALTER TABLE "_products_v_locales" ADD COLUMN IF NOT EXISTS "version_how_we_supply_description" varchar`)
    } catch {}
  }

  // 2. Seed the data
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
