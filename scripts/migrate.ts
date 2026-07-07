// Load env first using Payload's built-in mechanism
const { loadEnvConfig } = await import('@next/env')
import { resolve } from 'path'
loadEnvConfig(resolve(process.cwd()), process.env.NODE_ENV !== 'production')

// Now import config AFTER env is loaded
const { getPayload } = await import('payload')
const { default: config } = await import('../payload.config')
const { importCategories, importProductBrands, importProducts } = await import('./migrate-products')
const { importFAQs } = await import('./migrate-faqs')
const { importJobs } = await import('./migrate-jobs')
const { importTranslations } = await import('./migrate-translations')
const { importMedia } = await import('./migrate-media')

async function migrate() {
  const payload = await getPayload({ config })

  console.log('Starting migration...')

  console.log('Importing categories...')
  await importCategories(payload)

  console.log('Importing product brands...')
  await importProductBrands(payload)

  console.log('Importing products...')
  await importProducts(payload)

  console.log('Importing FAQs...')
  await importFAQs(payload)

  console.log('Importing jobs...')
  await importJobs(payload)

  console.log('Importing translations...')
  await importTranslations(payload)

  console.log('Importing media...')
  await importMedia(payload)

  console.log('Migration complete!')
  process.exit(0)
}

migrate().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})
