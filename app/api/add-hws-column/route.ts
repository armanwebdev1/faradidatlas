import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  if (body?.secret !== process.env.PAYLOAD_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const payload = await getPayload({ config })
  const drizzle = (payload.db as any).drizzle

  const results: string[] = []

  try {
    await drizzle.execute(`ALTER TABLE "products_locales" ADD COLUMN IF NOT EXISTS "how_we_supply_description" varchar`)
    results.push('products_locales: OK')
  } catch (e: any) {
    results.push(`products_locales: ${e.message}`)
  }

  try {
    await drizzle.execute(`ALTER TABLE "_products_v_locales" ADD COLUMN IF NOT EXISTS "version_how_we_supply_description" varchar`)
    results.push('_products_v_locales: OK')
  } catch (e: any) {
    results.push(`_products_v_locales: ${e.message}`)
  }

  return NextResponse.json({ success: true, results })
}
