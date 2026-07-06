import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { collection, doc, global } = body

    if (collection) {
      switch (collection) {
        case 'products':
          revalidatePath('/products')
          if (doc?.slug) {
            revalidatePath(`/products/${doc.slug}`)
          }
          break
        case 'categories':
          revalidatePath('/products')
          break
        case 'blog-posts':
          revalidatePath('/blog')
          if (doc?.slug) {
            revalidatePath(`/blog/${doc.slug}`)
          }
          break
        case 'faqs':
          revalidatePath('/faq')
          break
        case 'jobs':
          revalidatePath('/careers')
          break
        default:
          revalidatePath('/')
      }
    }

    if (global) {
      switch (global) {
        case 'homepage':
          revalidatePath('/')
          break
        case 'navigation':
          revalidatePath('/')
          break
        case 'site-settings':
          revalidatePath('/')
          break
        default:
          revalidatePath('/')
      }
    }

    return NextResponse.json({ revalidated: true, timestamp: Date.now() })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json({ error: 'Revalidation failed' }, { status: 500 })
  }
}
