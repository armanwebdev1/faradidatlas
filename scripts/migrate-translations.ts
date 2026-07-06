import type { Payload } from 'payload'
import enTranslations from '../i18n/en.json'

export async function importTranslations(payload: Payload) {
  try {
    await payload.updateGlobal({
      slug: 'translations',
      data: {
        nav: {
          home: enTranslations.nav.home,
          about: enTranslations.nav.about,
          products: enTranslations.nav.products,
          careers: enTranslations.nav.careers,
          faq: enTranslations.nav.faq,
          contact: enTranslations.nav.contact,
          blog: enTranslations.nav.blog,
        },
        common: {
          viewMore: enTranslations.common.viewMore,
          learnMore: enTranslations.common.learnMore,
          contactSales: enTranslations.common.contactSales,
        },
      },
    })
    console.log('  Updated translations global')
  } catch {
    console.log('  Translations global update failed, skipping...')
  }
}
