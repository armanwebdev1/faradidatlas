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
      label: { en: 'Alt Text', fa: 'متن جایگزین' },
      required: true,
      localized: true,
    },
    {
      name: 'title',
      type: 'text',
      label: { en: 'Title', fa: 'عنوان' },
      localized: true,
      admin: {
        description: { en: 'Optional title attribute for the image', fa: 'ویژگی عنوان اختیاری برای تصویر' },
      },
    },
    {
      name: 'caption',
      type: 'text',
      label: { en: 'Caption', fa: 'کپشن' },
      localized: true,
    },
  ],
}
