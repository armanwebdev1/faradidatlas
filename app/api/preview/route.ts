import { NextRequest, NextResponse } from 'next/server'
import { draftMode } from 'next/headers'

const GLOBAL_ROUTES: Record<string, (locale: string) => string> = {
  'homepage': (locale) => `/${locale}`,
  'company-info': (locale) => `/${locale}/about`,
  'contact-info': (locale) => `/${locale}/contact`,
  'careers-info': (locale) => `/${locale}/careers`,
  'site-settings': (locale) => `/${locale}`,
}

const COLLECTION_ROUTES: Record<string, (slug: string, locale: string) => string> = {
  'products': (slug, locale) => `/${locale}/products/${slug}`,
  'blog-posts': (slug, locale) => `/${locale}/blog/${slug}`,
  'categories': (slug, locale) => `/${locale}/products`,
  'faqs': (slug, locale) => `/${locale}/faq`,
  'jobs': (slug, locale) => `/${locale}/careers/${slug}`,
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')
  const collection = searchParams.get('collection')
  const globalSlug = searchParams.get('global')
  const locale = searchParams.get('locale') || 'en'

  if (secret !== process.env.PAYLOAD_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }

  const draft = await draftMode()
  draft.enable()

  let redirectPath: string

  if (globalSlug && GLOBAL_ROUTES[globalSlug]) {
    redirectPath = GLOBAL_ROUTES[globalSlug](locale)
  } else if (collection && slug && COLLECTION_ROUTES[collection]) {
    redirectPath = COLLECTION_ROUTES[collection](slug, locale)
  } else if (slug) {
    // Fallback: use slug directly with locale
    redirectPath = slug.startsWith('/') ? `/${locale}${slug}` : `/${locale}/${slug}`
  } else {
    return NextResponse.json({ error: 'Missing slug, collection, or global parameter' }, { status: 400 })
  }

  return NextResponse.redirect(new URL(redirectPath, request.url))
}
