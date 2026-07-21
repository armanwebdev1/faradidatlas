/**
 * Safe migration: Updates existing 'admin' users to 'super-admin' role.
 * Run with: npx tsx scripts/update-admin-role.ts
 */

import { readFileSync } from 'fs'
import { resolve } from 'path'
import pg from 'pg'

// Load .env manually
const envPath = resolve(process.cwd(), '.env')
const envContent = readFileSync(envPath, 'utf-8')
for (const line of envContent.split('\n')) {
  const trimmed = line.trim()
  if (!trimmed || trimmed.startsWith('#')) continue
  const eqIdx = trimmed.indexOf('=')
  if (eqIdx === -1) continue
  const key = trimmed.slice(0, eqIdx).trim()
  const val = trimmed.slice(eqIdx + 1).trim()
  if (!process.env[key]) process.env[key] = val
}

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
})

async function updateRoles() {
  const client = await pool.connect()

  try {
    console.log('Looking for users with old "admin" role...')

    const result = await client.query(
      "SELECT id, email FROM users WHERE role = 'admin'"
    )

    if (result.rows.length === 0) {
      console.log('No users with "admin" role found. Nothing to update.')
      return
    }

    console.log(`Found ${result.rows.length} user(s) with "admin" role. Updating to "super-admin"...`)

    for (const user of result.rows) {
      await client.query(
        "UPDATE users SET role = 'super-admin' WHERE id = $1",
        [user.id]
      )
      console.log(`  Updated: ${user.email}`)
    }

    console.log('Done! All admin users now have "super-admin" role.')
  } finally {
    client.release()
    await pool.end()
  }
}

updateRoles().catch((err) => {
  console.error('Failed:', err)
  process.exit(1)
})
