import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  if (body?.secret !== process.env.PAYLOAD_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const payload = await getPayload({ config })

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

  const updated = []

  for (const product of products.docs) {
    const name = product.name as any
    const desc = product.description as any
    const catSlug = (product.category as any)?.slug ?? ''
    const cat = categoryLabels[catSlug] ?? { en: '', fa: '', ar: '' }

    const nameEn = name?.en ?? ''
    const nameFa = name?.fa ?? ''
    const nameAr = name?.ar ?? ''

    const descEn = desc?.en ?? ''
    const descFa = desc?.fa ?? ''
    const descAr = desc?.ar ?? ''

    // Build SEO title: "{Name} | Wholesale {Category} Supplier | Faradid Atlas"
    const titleEn = cat.en
      ? `${nameEn} | Wholesale ${cat.en} Supplier | Faradid Atlas`
      : `${nameEn} | Faradid Atlas Products`
    const titleFa = cat.fa
      ? `${nameFa} | تأمین عمده ${cat.fa} | فرادید اطلس`
      : `${nameFa} | محصولات فرادید اطلس`
    const titleAr = cat.ar
      ? `${nameAr} | مورّد ${cat.ar} بالجملة | فراديد أطلس`
      : `${nameAr} | منتجات فراديد أطلس`

    // SEO description: use first 155 chars of product description
    const seoDescEn = descEn ? descEn.slice(0, 155) : titleEn
    const seoDescFa = descFa ? descFa.slice(0, 155) : titleFa
    const seoDescAr = descAr ? descAr.slice(0, 155) : titleAr

    await payload.update({
      collection: 'products',
      id: product.id,
      data: {
        seo: {
          title: { en: titleEn, fa: titleFa, ar: titleAr },
          description: { en: seoDescEn, fa: seoDescFa, ar: seoDescAr },
        },
      },
    })

    updated.push(`${product.id}: ${nameEn}`)
  }

  return NextResponse.json({ success: true, count: updated.length, products: updated })
}
