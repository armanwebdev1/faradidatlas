import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET() {
  try {
    const payload = await getPayload({ config })

    // Check if blog_posts_tags_locales table exists
    const db = payload.db

    let tableCheck: any = null
    try {
      const result = await (db as any).pool.query(`
        SELECT table_name FROM information_schema.tables
        WHERE table_name = 'blog_posts_tags_locales'
      `)
      tableCheck = result.rows
    } catch (e: any) {
      tableCheck = { error: e.message }
    }

    return NextResponse.json({
      tableExists: tableCheck,
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
