import { getPayloadClient } from '../payload'

export async function getCompanyInfo(locale: string = 'en') {
  console.log(`\n[INSTR] getCompanyInfo ENTER  caller=${new Error().stack?.split('\n')[2]?.trim()}`)
  const t = Date.now()
  const payload = await getPayloadClient()

  const info = await payload.findGlobal({
    slug: 'company-info',
    locale: locale as 'en' | 'fa' | 'ar',
    depth: 1,
  })

  console.log(`[INSTR] getCompanyInfo EXIT  ${Date.now() - t}ms`)
  return info
}
