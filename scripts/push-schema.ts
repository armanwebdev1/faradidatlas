/**
 * Pre-build script: ensures DB schema matches Payload config.
 * Payload's push: true doesn't always alter existing tables, so we
 * explicitly add any missing columns before next build.
 */
import { Pool } from 'pg'
import { getPayloadClient } from '../lib/payload'

async function main() {
  console.log('Initializing Payload...')
  const payload = await getPayloadClient()

  const connectionString = process.env.DATABASE_URL
  if (!connectionString) {
    console.error('DATABASE_URL not set')
    process.exit(1)
  }

  const pool = new Pool({ connectionString })

  console.log('Checking and adding missing columns...')

  const columns = [
    // Localized group fields on homepage_locales
    { table: 'homepage_locales', column: 'value_props_section_eyebrow', type: 'text' },
    { table: 'homepage_locales', column: 'value_props_section_title', type: 'text' },
    { table: 'homepage_locales', column: 'value_props_section_description', type: 'text' },
    { table: 'homepage_locales', column: 'brands_section_eyebrow', type: 'text' },
    { table: 'homepage_locales', column: 'brands_section_title', type: 'text' },
    { table: 'homepage_locales', column: 'brands_section_description', type: 'text' },
    { table: 'homepage_locales', column: 'signature_products_section_eyebrow', type: 'text' },
    { table: 'homepage_locales', column: 'signature_products_section_title', type: 'text' },
    { table: 'homepage_locales', column: 'signature_products_section_description', type: 'text' },
    { table: 'homepage_locales', column: 'signature_products_section_cta_text', type: 'text' },
    { table: 'homepage', column: 'signature_products_section_cta_url', type: 'text' },
    { table: 'homepage_locales', column: 'markets_section_eyebrow', type: 'text' },
    { table: 'homepage_locales', column: 'markets_section_title', type: 'text' },
    { table: 'homepage_locales', column: 'markets_section_description', type: 'text' },
    // Non-localized fields on homepage table
    { table: 'homepage', column: 'brands_section_banner_image_id', type: 'integer' },
  ]

  for (const { table, column, type } of columns) {
    try {
      const check = await pool.query(
        `SELECT EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE table_name = $1 AND column_name = $2
        ) as exists`,
        [table, column],
      )

      if (!check.rows[0].exists) {
        console.log(`  Adding ${table}.${column}...`)
        await pool.query(`ALTER TABLE "${table}" ADD COLUMN "${column}" ${type}`)
        console.log(`  ✓ Added ${table}.${column}`)
      } else {
        console.log(`  ✓ ${table}.${column} already exists`)
      }
    } catch (err: any) {
      console.warn(`  ⚠ Skipped ${table}.${column}: ${err.message}`)
    }
  }

  await pool.end()
  console.log('Schema check completed')
  process.exit(0)
}

main().catch((err) => {
  console.error('Schema push failed:', err)
  process.exit(1)
})
