import { getPayload } from 'payload'
import config from '../payload.config'
import { importCategories, importProductBrands, importProducts } from './migrate-products'
import { importFAQs } from './migrate-faqs'
import { importJobs } from './migrate-jobs'
import { importTranslations } from './migrate-translations'

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

  console.log('Migration complete!')
  process.exit(0)
}

migrate().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})
