import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const payload = await getPayload({ config })
    const pool = (payload.db as any).pool
    const steps: string[] = []

    // Step 1: Drop broken table if it exists (FK was wrong type)
    try {
      await pool.query(`DROP TABLE IF EXISTS "blog_posts_tags_locales" CASCADE;`)
      steps.push('dropped old table')
    } catch (e: any) {
      steps.push(`drop failed: ${e.message}`)
    }

    // Step 2: Create table with correct types (_parent_id must be varchar to match blog_posts_tags.id)
    try {
      await pool.query(`
        CREATE TABLE "blog_posts_tags_locales" (
          "id" serial PRIMARY KEY,
          "_locale" "_locales" NOT NULL,
          "_parent_id" varchar NOT NULL,
          "tag" varchar
        );
      `)
      steps.push('table created')
    } catch (e: any) {
      steps.push(`create failed: ${e.message}`)
    }

    // Step 3: Add FK (parent_id is varchar matching blog_posts_tags.id which is varchar)
    try {
      await pool.query(`
        ALTER TABLE "blog_posts_tags_locales"
          ADD CONSTRAINT "blog_posts_tags_locales_parent_id_fk"
          FOREIGN KEY ("_parent_id") REFERENCES "blog_posts_tags"("id")
          ON DELETE cascade ON UPDATE no action;
      `)
      steps.push('FK added')
    } catch (e: any) {
      steps.push(`FK failed: ${e.message}`)
    }

    // Step 4: Add unique index
    try {
      await pool.query(`
        CREATE UNIQUE INDEX IF NOT EXISTS "blog_posts_tags_locales_locale_parent_id_unique"
          ON "blog_posts_tags_locales" USING btree ("_locale", "_parent_id");
      `)
      steps.push('index created')
    } catch (e: any) {
      steps.push(`index failed: ${e.message}`)
    }

    // Step 5: Migrate existing tag data
    try {
      await pool.query(`
        INSERT INTO "blog_posts_tags_locales" ("_locale", "_parent_id", "tag")
        SELECT 'en', "id", "tag" FROM "blog_posts_tags"
        ON CONFLICT DO NOTHING;
      `)
      steps.push('data migrated')
    } catch (e: any) {
      steps.push(`migrate failed: ${e.message}`)
    }

    // Step 6: Remove _locale from blog_posts_tags
    try {
      await pool.query(`ALTER TABLE "blog_posts_tags" DROP COLUMN IF EXISTS "_locale";`)
      steps.push('dropped _locale from tags')
    } catch (e: any) {
      steps.push(`drop _locale failed: ${e.message}`)
    }

    // Step 7: Test the query
    let testResult: string | null = null
    try {
      const result = await payload.find({
        collection: 'blog-posts' as any,
        limit: 1,
        depth: 0,
      })
      testResult = `SUCCESS: totalDocs=${result.totalDocs}`
    } catch (e: any) {
      testResult = `STILL FAILING: ${e.message}`
    }

    return NextResponse.json({ steps, testResult })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
