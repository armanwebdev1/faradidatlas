import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET() {
  try {
    const payload = await getPayload({ config })

    // List all registered collections
    const collections = Object.keys(payload.collections)

    // Try blog-posts
    let blogResult = null
    let blogError = null
    try {
      blogResult = await payload.find({
        collection: 'blog-posts' as any,
        limit: 1,
        depth: 0,
      })
    } catch (e: any) {
      blogError = e.message
    }

    return NextResponse.json({
      registeredCollections: collections,
      blogResult: blogResult ? { totalDocs: blogResult.totalDocs } : null,
      blogError,
    })
  } catch (error: any) {
    console.error('=== BLOG TEST ERROR ===')
    console.error('Message:', error.message)
    console.error('Stack:', error.stack)

    return NextResponse.json({
      error: error.message,
      stack: error.stack?.substring(0, 500),
    }, { status: 500 })
  }
}
