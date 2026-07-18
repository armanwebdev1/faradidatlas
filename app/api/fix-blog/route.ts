import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const payload = await getPayload({ config })
    const pool = (payload.db as any).pool
    const steps: string[] = []

    // Create ALL missing locales tables that Payload's drizzle schema expects

    const tablesToCreate = [
      {
        name: 'blog_posts_tags_locales',
        fkTable: 'blog_posts_tags',
        fkCol: 'id',
        fkColType: 'varchar',
        fields: '"tag" varchar',
      },
      {
        name: '_blog_posts_v_version_tags_locales',
        fkTable: '_blog_posts_v_version_tags',
        fkCol: 'id',
        fkColType: 'varchar',
        fields: '"tag" varchar',
      },
    ]

    for (const t of tablesToCreate) {
      try {
        // Drop if broken
        await pool.query(`DROP TABLE IF EXISTS "${t.name}" CASCADE;`)

        // Create
        await pool.query(`
          CREATE TABLE "${t.name}" (
            "id" serial PRIMARY KEY,
            "_locale" "_locales" NOT NULL,
            "_parent_id" ${t.fkColType} NOT NULL,
            ${t.fields}
          );
        `)

        // FK
        await pool.query(`
          ALTER TABLE "${t.name}"
            ADD CONSTRAINT "${t.name}_parent_id_fk"
            FOREIGN KEY ("_parent_id") REFERENCES "${t.fkTable}"("${t.fkCol}")
            ON DELETE cascade ON UPDATE no action;
        `)

        // Unique index
        await pool.query(`
          CREATE UNIQUE INDEX IF NOT EXISTS "${t.name}_locale_parent_id_unique"
            ON "${t.name}" USING btree ("_locale", "_parent_id");
        `)

        // Seed data from parent table
        await pool.query(`
          INSERT INTO "${t.name}" ("_locale", "_parent_id", "tag")
          SELECT 'en', "id", "tag" FROM "${t.fkTable}"
          ON CONFLICT DO NOTHING;
        `)

        steps.push(`${t.name}: created`)
      } catch (e: any) {
        steps.push(`${t.name}: ${e.message}`)
      }
    }

    // Also drop any stale _locale columns from main tag tables
    for (const tbl of ['blog_posts_tags', '_blog_posts_v_version_tags']) {
      try {
        await pool.query(`ALTER TABLE "${tbl}" DROP COLUMN IF EXISTS "_locale";`)
        steps.push(`${tbl}._locale dropped`)
      } catch {}
    }

    // Test both queries
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
