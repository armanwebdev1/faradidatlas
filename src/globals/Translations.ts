import type { GlobalConfig } from 'payload'

export const Translations: GlobalConfig = {
  slug: 'translations',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Settings',
  },
  fields: [
    {
      name: 'nav',
      type: 'group',
      fields: [
        {
          name: 'home',
          type: 'text',
          localized: true,
        },
        {
          name: 'about',
          type: 'text',
          localized: true,
        },
        {
          name: 'products',
          type: 'text',
          localized: true,
        },
        {
          name: 'careers',
          type: 'text',
          localized: true,
        },
        {
          name: 'faq',
          type: 'text',
          localized: true,
        },
        {
          name: 'contact',
          type: 'text',
          localized: true,
        },
        {
          name: 'blog',
          type: 'text',
          localized: true,
        },
      ],
    },
    {
      name: 'common',
      type: 'group',
      fields: [
        {
          name: 'viewMore',
          type: 'text',
          localized: true,
        },
        {
          name: 'learnMore',
          type: 'text',
          localized: true,
        },
        {
          name: 'contactSales',
          type: 'text',
          localized: true,
        },
      ],
    },
  ],
}
