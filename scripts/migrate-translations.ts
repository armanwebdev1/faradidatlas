import type { Payload } from 'payload'
import enTranslations from '../i18n/en.json'
import faTranslations from '../i18n/fa.json'
import arTranslations from '../i18n/ar.json'

export async function importTranslations(payload: Payload) {
  try {
    // Create with default English locale
    await payload.updateGlobal({
      slug: 'translations',
      locale: 'en',
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

    // Update Persian locale
    await payload.updateGlobal({
      slug: 'translations',
      locale: 'fa',
      data: {
        nav: {
          home: faTranslations.nav.home,
          about: faTranslations.nav.about,
          products: faTranslations.nav.products,
          careers: faTranslations.nav.careers,
          faq: faTranslations.nav.faq,
          contact: faTranslations.nav.contact,
          blog: faTranslations.nav.blog,
        },
        common: {
          viewMore: faTranslations.common.viewMore,
          learnMore: faTranslations.common.learnMore,
          contactSales: faTranslations.common.contactSales,
        },
      },
    })

    // Update Arabic locale
    await payload.updateGlobal({
      slug: 'translations',
      locale: 'ar',
      data: {
        nav: {
          home: arTranslations.nav.home,
          about: arTranslations.nav.about,
          products: arTranslations.nav.products,
          careers: arTranslations.nav.careers,
          faq: arTranslations.nav.faq,
          contact: arTranslations.nav.contact,
          blog: arTranslations.nav.blog,
        },
        common: {
          viewMore: arTranslations.common.viewMore,
          learnMore: arTranslations.common.learnMore,
          contactSales: arTranslations.common.contactSales,
        },
      },
    })

    console.log('  Updated translations global (en, fa, ar)')
  } catch (e) {
    console.log('  Translations global update failed:', (e as Error).message)
  }
}
