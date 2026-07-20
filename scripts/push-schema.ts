/**
 * Pre-build script: initializes Payload which triggers schema push (push: true).
 * Must run BEFORE next build so columns exist during prerendering.
 *
 * Usage: npx tsx scripts/push-schema.ts
 */
import { getPayloadClient } from '../lib/payload'

async function main() {
  console.log('Initializing Payload to push schema...')
  const payload = await getPayloadClient()
  console.log('Schema push completed successfully')
  process.exit(0)
}

main().catch((err) => {
  console.error('Schema push failed:', err)
  process.exit(1)
})
