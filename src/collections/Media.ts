import type { CollectionConfig } from 'payload'
import { isRole } from '../access/isRole'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: { en: 'Media', fa: 'رسانه' },
    plural: { en: 'Media', fa: 'رسانه‌ها' },
  },
  access: {
    read: () => true,
    create: isRole('super-admin', 'company-admin', 'editor'),
    update: isRole('super-admin', 'company-admin', 'editor'),
    delete: isRole('super-admin', 'company-admin'),
  },
  admin: {
    group: { en: 'Media', fa: 'رسانه' },
    defaultColumns: ['alt', 'filename', 'mimeType', 'filesize'],
  },
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'title',
      type: 'text',
      localized: true,
      admin: {
        description: 'Optional title attribute for the image',
      },
    },
    {
      name: 'caption',
      type: 'text',
      localized: true,
    },
  ],
}
