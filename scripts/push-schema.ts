/**
 * Pre-build script: ensures DB schema matches Payload config.
 * Payload's push: true doesn't always alter existing tables, so we
 * explicitly add any missing columns before next build.
 */
import { Pool } from 'pg'
import { readFileSync } from 'fs'
import { resolve } from 'path'

// Load .env file manually
try {
  const envPath = resolve(process.cwd(), '.env')
  const envContent = readFileSync(envPath, 'utf-8')
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eqIdx = trimmed.indexOf('=')
    if (eqIdx === -1) continue
    const key = trimmed.slice(0, eqIdx).trim()
    const value = trimmed.slice(eqIdx + 1).trim()
    if (!process.env[key]) process.env[key] = value
  }
} catch {}

async function main() {
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

  // Fix homepage_signature_products_locales missing 'id' primary key column.
  // Payload's push: true created the table without it, causing save failures.
  console.log('Ensuring homepage_signature_products_locales has id column...')
  const poolFix = new Pool({ connectionString })
  try {
    const check = await poolFix.query(
      `SELECT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'homepage_signature_products_locales' AND column_name = 'id'
      ) as exists`,
    )
    if (!check.rows[0].exists) {
      await poolFix.query(
        'ALTER TABLE "homepage_signature_products_locales" ADD COLUMN "id" serial PRIMARY KEY',
      )
      console.log('  ✓ Added id column to homepage_signature_products_locales')
    } else {
      console.log('  ✓ homepage_signature_products_locales.id already exists')
    }
  } catch (err: any) {
    console.warn(`  ⚠ homepage_signature_products_locales fix: ${err.message}`)
  }
  await poolFix.end()

  // Remove product_id column from homepage_signature_products (no longer needed)
  console.log('Removing product_id column from homepage_signature_products...')
  const pool2 = new Pool({ connectionString })
  try {
    await pool2.query('ALTER TABLE "homepage_signature_products" DROP CONSTRAINT IF EXISTS "homepage_signature_products_product_id_products_id_fk"')
    console.log('  ✓ Dropped foreign key constraint')
  } catch (err: any) {
    console.warn(`  ⚠ FK skip: ${err.message}`)
  }
  try {
    await pool2.query('DROP INDEX IF EXISTS "homepage_signature_products_product_idx"')
    console.log('  ✓ Dropped product_id index')
  } catch (err: any) {
    console.warn(`  ⚠ Index skip: ${err.message}`)
  }
  try {
    await pool2.query('ALTER TABLE "homepage_signature_products" DROP COLUMN IF EXISTS "product_id"')
    console.log('  ✓ Dropped product_id column')
  } catch (err: any) {
    console.warn(`  ⚠ Column skip: ${err.message}`)
  }
  await pool2.end()

  console.log('Schema check completed')
  process.exit(0)
}

main().catch((err) => {
  console.error('Schema push failed:', err)
  process.exit(1)
})
