import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const payload = await getPayload({ config })
    const pool = (payload.db as any).pool

    // Step 1: Check what tables exist
    const tables = await pool.query(`
      SELECT table_name FROM information_schema.tables
      WHERE table_name LIKE 'blog_posts%'
      ORDER BY table_name
    `)

    // Step 2: Check columns on blog_posts_tags
    let tagsCols: any[] = []
    try {
      const r = await pool.query(`
        SELECT column_name, data_type FROM information_schema.columns
        WHERE table_name = 'blog_posts_tags' ORDER BY ordinal_position
      `)
      tagsCols = r.rows
    } catch {}

    // Step 3: Check if _locale column exists on blog_posts_tags
    const hasLocaleCol = tagsCols.some((c: any) => c.column_name === '_locale')

    // Step 4: Create the missing table
    let created = false
    let createError: string | null = null
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS "blog_posts_tags_locales" (
          "id" serial PRIMARY KEY,
          "_locale" "_locales" NOT NULL,
          "_parent_id" integer NOT NULL,
          "tag" varchar
        );
      `)
      await pool.query(`
        ALTER TABLE "blog_posts_tags_locales"
          ADD CONSTRAINT "blog_posts_tags_locales_parent_id_fk"
          FOREIGN KEY ("_parent_id") REFERENCES "blog_posts_tags"("id")
          ON DELETE cascade ON UPDATE no action;
      `)
      await pool.query(`
        CREATE UNIQUE INDEX IF NOT EXISTS "blog_posts_tags_locales_locale_parent_id_unique"
          ON "blog_posts_tags_locales" USING btree ("_locale", "_parent_id");
      `)
      await pool.query(`
        INSERT INTO "blog_posts_tags_locales" ("_locale", "_parent_id", "tag")
        SELECT 'en', "id", "tag" FROM "blog_posts_tags"
        ON CONFLICT DO NOTHING;
      `)
      if (hasLocaleCol) {
        await pool.query(`ALTER TABLE "blog_posts_tags" DROP COLUMN IF EXISTS "_locale";`)
      }
      created = true
    } catch (e: any) {
      createError = e.message
    }

    // Step 5: Test the query
    let testResult: string | null = null
    try {
      const result = await payload.find({
        collection: 'blog-posts' as any,
        limit: 1,
        depth: 0,
      })
      testResult = `OK: totalDocs=${result.totalDocs}`
    } catch (e: any) {
      testResult = `FAIL: ${e.message}`
    }

    return NextResponse.json({
      tables: tables.rows.map((r: any) => r.table_name),
      tagsColumns: tagsCols,
      hasLocaleCol,
      created,
      createError,
      testResult,
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
