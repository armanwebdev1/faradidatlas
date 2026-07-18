import { NextResponse } from 'next/server'
import config from '@payload-config'

export async function GET() {
  try {
    const payload = await import('payload').then(m => m.default)

    // Try to find blog posts
    const result = await payload.find({
      collection: 'blog-posts',
      limit: 1,
      depth: 0,
    })

    return NextResponse.json({
      success: true,
      totalDocs: result.totalDocs,
      docs: result.docs.length,
    })
  } catch (error: any) {
    console.error('=== BLOG TEST ERROR ===')
    console.error('Message:', error.message)
    console.error('Stack:', error.stack)
    console.error('Full error:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2))

    return NextResponse.json({
      success: false,
      error: error.message,
      stack: error.stack?.substring(0, 500),
    }, { status: 500 })
  }
}
