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
      label: { en: 'Name', fa: 'نام' },
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: { en: 'Slug', fa: 'نامک' },
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: { en: 'Description', fa: 'توضیحات' },
      localized: true,
    },
    {
      name: 'icon',
      type: 'text',
      label: { en: 'Icon', fa: 'آیکون' },
      admin: {
        description: { en: 'Lucide icon name (e.g. "Wheat", "Bean", "Nut")', fa: 'نام آیکون Lucide (مثلاً "Wheat"، "Bean"، "Nut")' },
        position: 'sidebar',
      },
    },
    {
      name: 'image',
      type: 'upload',
      label: { en: 'Image', fa: 'تصویر' },
      relationTo: 'media',
      admin: {
        description: { en: 'Category display image', fa: 'تصویر نمایشی دسته‌بندی' },
      },
    },
    {
      name: 'ordering',
      type: 'number',
      label: { en: 'Ordering', fa: 'ترتیب نمایش' },
      defaultValue: 0,
      admin: {
        description: { en: 'Display order (lower numbers first)', fa: 'ترتیب نمایش (اعداد کمتر اول)' },
        position: 'sidebar',
      },
    },
    {
      name: 'seo',
      type: 'group',
      label: { en: 'SEO', fa: 'سئو' },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: { en: 'SEO Title', fa: 'عنوان سئو' },
          localized: true,
        },
        {
          name: 'subtitle',
          type: 'text',
          label: { en: 'Subtitle', fa: 'زیرعنوان' },
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: { en: 'SEO Description', fa: 'توضیحات سئو' },
          localized: true,
        },
        {
          name: 'content',
          type: 'textarea',
          label: { en: 'Content', fa: 'محتوا' },
          localized: true,
          admin: {
            description: { en: 'Long-form SEO content for the category landing page', fa: 'محتوای بلند سئو برای صفحه لندینگ دسته‌بندی' },
          },
        },
      ],
    },
  ],
}
