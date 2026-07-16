import type { CollectionConfig } from 'payload'
import { isRole } from '../access/isRole'

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: {
    singular: { en: 'Category', fa: 'دسته‌بندی' },
    plural: { en: 'Categories', fa: 'دسته‌بندی‌ها' },
  },
  access: {
    read: () => true,
    create: isRole('super-admin', 'company-admin'),
    update: isRole('super-admin', 'company-admin', 'editor'),
    delete: isRole('super-admin', 'company-admin'),
  },
  admin: {
    useAsTitle: 'name',
    group: { en: 'Catalog', fa: 'کاتالوگ' },
    description: { en: 'Product categories with SEO content, display ordering, and icon settings', fa: 'دسته‌بندی محصولات با محتوای SEO، ترتیب نمایش و تنظیمات آیکون' },
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'icon',
      type: 'text',
      admin: {
        description: 'Lucide icon name (e.g. "Wheat", "Bean", "Nut")',
        position: 'sidebar',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Category display image',
      },
    },
    {
      name: 'ordering',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Display order (lower numbers first)',
        position: 'sidebar',
      },
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
        },
        {
          name: 'subtitle',
          type: 'text',
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'content',
          type: 'textarea',
          localized: true,
          admin: {
            description: 'Long-form SEO content for the category landing page',
          },
        },
      ],
    },
  ],
}
