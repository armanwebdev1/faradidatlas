import { NextRequest, NextResponse } from 'next/server'
import { draftMode } from 'next/headers'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')
  const collection = searchParams.get('collection')

  if (secret !== process.env.PAYLOAD_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }

  if (!slug || !collection) {
    return NextResponse.json({ error: 'Missing slug or collection' }, { status: 400 })
  }

  const draft = await draftMode()
  draft.enable()

  const redirectUrl = `/${collection === 'blog-posts' ? 'blog' : collection}/${slug}`
  return NextResponse.redirect(new URL(redirectUrl, request.url))
}
