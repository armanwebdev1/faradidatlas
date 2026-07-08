import { getPayloadClient } from '../payload'

export async function getContactInfo(locale: string = 'en') {
  console.log(`\n[INSTR] getContactInfo ENTER  caller=${new Error().stack?.split('\n')[2]?.trim()}`)
  const t = Date.now()
  const payload = await getPayloadClient()

  const info = await payload.findGlobal({
    slug: 'contact-info',
    locale: locale as 'en' | 'fa' | 'ar',
    depth: 1,
  })

  console.log(`[INSTR] getContactInfo EXIT  ${Date.now() - t}ms`)
  return info
}
