import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Settings',
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
    },
    {
      name: 'siteNameFa',
      type: 'text',
      required: true,
    },
    {
      name: 'siteNameAr',
      type: 'text',
      required: true,
    },
    {
      name: 'legalName',
      type: 'text',
      required: true,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'descriptionFa',
      type: 'textarea',
      required: true,
    },
    {
      name: 'descriptionAr',
      type: 'textarea',
      required: true,
    },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
