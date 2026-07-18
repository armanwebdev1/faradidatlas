import type { CollectionConfig } from 'payload'
import { isRole } from '../access/isRole'

export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  labels: {
    singular: { en: 'Blog Post', fa: 'مقاله وبلاگ' },
    plural: { en: 'Blog Posts', fa: 'مقالات وبلاگ' },
  },
  access: {
    read: () => true,
    create: isRole('super-admin', 'company-admin', 'editor'),
    update: isRole('super-admin', 'company-admin', 'editor'),
    delete: isRole('super-admin', 'company-admin', 'editor'),
  },
  admin: {
    useAsTitle: 'title',
    group: { en: 'Content', fa: 'محتوا' },
    defaultColumns: ['title', 'author', 'status'],
    description: { en: 'Blog articles with multilingual content, authors, and publishing workflow', fa: 'مقالات وبلاگ با محتوای چندزبانه، نویسندگان و فرآیند انتشار' },
    preview: (doc, { locale }) => {
      const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://faradidatlas.com'
      const lang = locale || 'en'
      const slug = doc?.slug || ''
      return `${base}/${lang}/blog/${slug}`
    },
  },
  versions: {
    drafts: true,
    maxPerDoc: 10,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: { en: 'Title', fa: 'عنوان' },
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
      name: 'author',
      type: 'text',
      label: { en: 'Author', fa: 'نویسنده' },
      required: true,
      localized: true,
    },
    {
      name: 'tags',
      type: 'array',
      label: { en: 'Tags', fa: 'برچسب‌ها' },
      fields: [
        {
          name: 'tag',
          type: 'text',
          label: { en: 'Tag', fa: 'برچسب' },
          required: true,
          localized: true,
        },
      ],
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: { en: 'Excerpt', fa: 'خلاصه' },
      localized: true,
    },
    {
      name: 'content',
      type: 'richText',
      label: { en: 'Content', fa: 'محتوا' },
      localized: true,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      label: { en: 'Featured Image', fa: 'تصویر شاخص' },
      relationTo: 'media',
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
          name: 'description',
          type: 'textarea',
          label: { en: 'SEO Description', fa: 'توضیحات سئو' },
          localized: true,
        },
        {
          name: 'ogImage',
          type: 'upload',
          label: { en: 'OG Image', fa: 'تصویر OG' },
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'publishDate',
      type: 'date',
      label: { en: 'Publish Date', fa: 'تاریخ انتشار' },
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
  ],
}
