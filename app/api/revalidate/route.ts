import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

const LOCALES = ['en', 'fa', 'ar']

function revalidateLocalized(path: string, slug?: string) {
  for (const locale of LOCALES) {
    revalidatePath(`/${locale}${path}`)
    if (slug) {
      revalidatePath(`/${locale}${path}/${slug}`)
    }
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { collection, doc, global } = body

    if (collection) {
      switch (collection) {
        case 'products':
          revalidateLocalized('/products', doc?.slug)
          break
        case 'categories':
          revalidateLocalized('/products')
          break
        case 'blog-posts':
          revalidateLocalized('/blog', doc?.slug)
          break
        case 'faqs':
          revalidateLocalized('/faq')
          break
        case 'jobs':
          revalidateLocalized('/careers')
          break
        default:
          for (const locale of LOCALES) {
            revalidatePath(`/${locale}`)
          }
      }
    }

    if (global) {
      switch (global) {
        case 'homepage':
        case 'navigation':
        case 'site-settings':
          for (const locale of LOCALES) {
            revalidatePath(`/${locale}`)
          }
          break
        case 'company-info':
          revalidateLocalized('/about')
          break
        case 'contact-info':
          revalidateLocalized('/contact')
          break
        case 'careers-info':
          revalidateLocalized('/careers')
          break
        default:
          for (const locale of LOCALES) {
            revalidatePath(`/${locale}`)
          }
      }
    }

    return NextResponse.json({ revalidated: true, timestamp: Date.now() })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json({ error: 'Revalidation failed' }, { status: 500 })
  }
}
