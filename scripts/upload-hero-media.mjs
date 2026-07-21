import { readFileSync } from 'fs'
import { resolve } from 'path'
import pg from 'pg'

// Load .env
const envPath = resolve(import.meta.dirname, '..', '.env')
const envContent = readFileSync(envPath, 'utf-8')
for (const line of envContent.split('\n')) {
  const trimmed = line.trim()
  if (!trimmed || trimmed.startsWith('#')) continue
  const eqIdx = trimmed.indexOf('=')
  if (eqIdx > 0) {
    const key = trimmed.slice(0, eqIdx).trim()
    const val = trimmed.slice(eqIdx + 1).trim()
    if (!process.env[key]) process.env[key] = val
  }
}

const { put } = await import('@vercel/blob')

const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 30000,
  query_timeout: 30000,
})
await client.connect()
console.log('Connected to database')

const heroImages = [
  { filename: 'home-hero-1.webp', path: resolve(import.meta.dirname, '..', 'public', 'hero', 'optimized', 'home-hero-1.webp') },
  { filename: 'home-hero-2.webp', path: resolve(import.meta.dirname, '..', 'public', 'hero', 'optimized', 'home-hero-2.webp') },
  { filename: 'home-hero-3.webp', path: resolve(import.meta.dirname, '..', 'public', 'hero', 'optimized', 'home-hero-3.webp') },
]

const mediaIds = []

for (const img of heroImages) {
  const fileBuffer = readFileSync(img.path)
  const blobResult = await put(img.filename, fileBuffer, {
    access: 'public',
    token: process.env.BLOB_READ_WRITE_TOKEN,
    addRandomSuffix: false,
  })
  console.log(`Uploaded ${img.filename} -> ${blobResult.url}`)

  const result = await client.query(
    `INSERT INTO media (updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y)
     VALUES (NOW(), NOW(), $1, $2, $3, 'image/webp', $4, 1920, 1080, 0.5, 0.5)
     RETURNING id`,
    [blobResult.url, blobResult.url, img.filename, fileBuffer.length]
  )
  const mediaId = result.rows[0].id
  mediaIds.push(mediaId)
  console.log(`  -> media id: ${mediaId}`)
}

console.log(`\nMedia IDs: ${mediaIds.join(', ')}`)
await client.end()
