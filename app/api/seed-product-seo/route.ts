import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  if (body?.secret !== process.env.PAYLOAD_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const payload = await getPayload({ config })

  const locales = ['en', 'fa', 'ar'] as const

  const products = await payload.find({
    collection: 'products',
    limit: 100,
    depth: 0,
    locale: 'all',
  })

  const categoryLabels: Record<string, { en: string; fa: string; ar: string }> = {
    rice: { en: 'Rice', fa: 'برنج', ar: 'أرز' },
    legumes: { en: 'Legumes', fa: 'حبوبات', ar: 'بقوليات' },
    seeds: { en: 'Seeds', fa: 'دانه‌ها', ar: 'بذور' },
    nuts: { en: 'Nuts', fa: 'مغزها', ar: 'مكسرات' },
    spices: { en: 'Spices', fa: 'ادویه‌ها', ar: 'توابل' },
    sugar: { en: 'Sugar', fa: 'شکر', ar: 'سكر' },
  }

  let count = 0

  for (const product of products.docs) {
    const name = product.name as any
    const desc = product.description as any
    const catSlug = (product.category as any)?.slug ?? ''
    const cat = categoryLabels[catSlug] ?? { en: '', fa: '', ar: '' }

    for (const locale of locales) {
      const nameVal = name?.[locale] ?? ''
      const descVal = desc?.[locale] ?? ''
      const catLabel = cat[locale] ?? ''

      const title = catLabel
        ? `${nameVal} | Wholesale ${catLabel} Supplier | Faradid Atlas`
        : `${nameVal} | Faradid Atlas Products`

      const titleFa = cat.fa
        ? `${name?.fa ?? ''} | تأمین عمده ${cat.fa} | فرادید اطلس`
        : `${name?.fa ?? ''} | محصولات فرادید اطلس`

      const titleAr = cat.ar
        ? `${name?.ar ?? ''} | مورّد ${cat.ar} بالجملة | فراديد أطلس`
        : `${name?.ar ?? ''} | منتجات فراديد أطلس`

      const titleLocalized = locale === 'en' ? title : locale === 'fa' ? titleFa : titleAr
      const descLocalized = descVal ? descVal.slice(0, 155) : titleLocalized

      await payload.update({
        collection: 'products',
        id: product.id,
        locale,
        data: {
          seo: {
            title: titleLocalized,
            description: descLocalized,
          },
        },
      })
    }

    count++
  }

  return NextResponse.json({ success: true, count })
}
