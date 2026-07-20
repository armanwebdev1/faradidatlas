import { NextRequest, NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

export async function POST(request: NextRequest) {
  let body: any
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  if (body.secret !== process.env.PAYLOAD_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }

  try {
    const payload = await getPayloadClient()

    const result = await payload.updateGlobal({
      slug: 'homepage',
      data: {
        valuePropsSection: {
          eyebrow: { en: 'Why Faradid Atlas', fa: 'چرا فرادید اطلس' },
          title: { en: 'Built for Continuity, Quality, and Trust', fa: 'ساخته شده برای استمرار، کیفیت و اعتماد' },
          description: {
            en: 'Our work is practical — we connect reliable suppliers with buyers who depend on consistent quality and timely delivery.',
            fa: 'کار ما عملی است — تأمین‌کنندگان معتبر را به خریدارانی متصل می‌کنیم که به کیفیت ثابت و تحویل به‌موقع وابسته‌اند.',
          },
        },
        valueProps: [
          { icon: 'Globe', title: { en: 'Direct Global Sourcing', fa: 'تأمین مستقیم از مبدا' }, description: { en: 'First-tier supplier relationships in key food-producing markets, including India and Pakistan.', fa: 'با تأمین‌کنندگان معتبر در بازارهای اصلی تولید غذا، از جمله چین، هند، و پاکستان، همکاری می‌کنیم.' }, isActive: true },
          { icon: 'CheckCircle', title: { en: 'Quality Before Volume', fa: 'کیفیت؛ شرط اول همکاری' }, description: { en: 'Products are selected against international hygiene and quality standards such as ISO 22000.', fa: 'پیش از هر همکاری، محصول از نظر سلامت، کیفیت و ثبات بررسی می‌شود.' }, isActive: true },
          { icon: 'Route', title: { en: 'Stable Supply Channels', fa: 'تأمین منظم برای خرید عمده' }, description: { en: 'Regional branches, offices, and warehouses support continuous supply for B2B buyers.', fa: 'با شبکه منطقه‌ای دفتر، شعبه و انبار، سفارش‌های عمده و سازمانی را پشتیبانی می‌کنیم.' }, isActive: true },
          { icon: 'Package', title: { en: 'Accessible Buyer Channels', fa: 'مسیر ساده‌تر برای خرید' }, description: { en: 'Offices, regional operations, and digital sales channels support individuals, wholesalers, organizations, and foodservice buyers.', fa: 'از تماس حضوری تا فروش دیجیتال، مسیر خرید را ساده و سریع نگه می‌داریم.' }, isActive: true },
        ],
        brandsSection: {
          eyebrow: { en: 'Our Brands', fa: 'برندهای ما' },
          title: { en: 'Trusted names in food distribution', fa: 'نام‌های معتبر در توزیع مواد غذایی' },
          description: { en: 'Faradid Atlas works with established brands that are recognized across regional markets for quality and reliability.', fa: 'فرادید اطلس با برندهای معتبری همکاری می‌کند که در بازارهای منطقه‌ای به کیفیت و قابلیت اطمینان شناخته شده‌اند.' },
        },
        brandShowcase: [
          { brandName: { en: 'Hayat', fa: 'حیات' }, description: { en: 'Premium rice brand', fa: 'برند برنج باکیفیت' }, isActive: true },
          { brandName: { en: 'Golbanoo', fa: 'گلبانو' }, description: { en: 'Trusted rice brand', fa: 'برند برنج معتبر' }, isActive: true },
          { brandName: { en: 'Twenty One', fa: '۲۱' }, description: { en: 'Popular rice brand', fa: 'برند برنج محبوب' }, isActive: true },
          { brandName: { en: 'Mizban', fa: 'میزبان' }, description: { en: 'Quality rice brand', fa: 'برند برنج باکیفیت' }, isActive: true },
        ],
        marketsSection: {
          eyebrow: { en: 'Supply Footprint', fa: 'ردپای تأمین' },
          title: { en: 'Regional Reach', fa: 'دسترسی منطقه‌ای' },
          description: { en: 'Our network spans key markets across Iran, UAE, and Oman — built for consistent supply and trusted partnerships.', fa: 'شبکه ما بازارهای کلیدی در ایران، امارات و عمان را پوشش می‌دهد — ساخته شده برای تأمین ثابت و مشارکت‌های مورد اعتماد.' },
        },
        globalMarkets: [
          { country: { en: 'Recognized Rice Brands', fa: 'برندهای معتبر برنج' }, description: { en: '21, Mizban, Hayat, and Golbanou', fa: '۲۱، میزبان، حیات و گلبانو' }, value: 4, isActive: true },
          { country: { en: 'Offices & Regional Presence', fa: 'دفاتر شرکت' }, description: { en: 'Tehran, Isfahan, Dubai, and Oman', fa: 'تهران، اصفهان، دبی و عمان' }, value: 4, isActive: true },
          { country: { en: 'Key Sourcing Origins', fa: 'مسیر تأمین' }, description: { en: 'Direct sourcing focus across India and Pakistan', fa: 'تمرکز بر تأمین مستقیم از مبدأهای معتبر مانند هند و پاکستان' }, value: 30, isActive: true },
          { country: { en: 'Product Portfolio', fa: 'گروه کالایی' }, description: { en: 'Rice, legumes, seeds, nuts, spices, and sugar', fa: 'از برنج و حبوبات تا آجیل، خشکبار، ادویه‌جات، و شکر' }, value: 25, isActive: true },
        ],
      },
    })

    return NextResponse.json({ success: true, id: result.doc.id })
  } catch (err) {
    console.error('Seed failed:', err)
    return NextResponse.json({ error: 'Seed failed', details: String(err) }, { status: 500 })
  }
}
