import type { CollectionConfig } from 'payload'
import { isRole } from '../access/isRole'

export const Products: CollectionConfig = {
  slug: 'products',
  labels: {
    singular: { en: 'Product', fa: 'محصول' },
    plural: { en: 'Products', fa: 'محصولات' },
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
    defaultColumns: ['name', 'category', 'brand', 'featured', 'status'],
    description: { en: 'Manage your product catalog with multilingual names, descriptions, specs, and images', fa: 'مدیریت کاتالوگ محصولات با نام‌ها، توضیحات، مشخصات و تصاویر چندزبانه' },
    livePreview: {
      url: ({ data, locale }) => {
        const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://faradidatlas.com'
        const lang = locale || 'en'
        const slug = data?.slug || ''
        return `${base}/${lang}/products/${slug}`
      },
    },
    preview: (doc, { locale }) => {
      const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://faradidatlas.com'
      const lang = locale || 'en'
      const slug = doc?.slug || ''
      return `${base}/${lang}/products/${slug}`
    },
  },
  versions: {
    drafts: true,
    maxPerDoc: 10,
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
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'brand',
      type: 'relationship',
      relationTo: 'product-brands',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'Basmati Rice', value: 'basmati-rice' },
        { label: 'Jasmine Rice', value: 'jasmine-rice' },
        { label: 'Beans', value: 'beans' },
        { label: 'Lentils', value: 'lentils' },
        { label: 'Chickpeas', value: 'chickpeas' },
        { label: 'Seeds & Kernels', value: 'seeds-kernels' },
        { label: 'Nuts', value: 'nuts' },
        { label: 'Spices', value: 'spices' },
        { label: 'Sweeteners', value: 'sweeteners' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Mark as featured product',
        position: 'sidebar',
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
      name: 'description',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'alias',
      type: 'text',
      localized: true,
      admin: {
        description: 'Alternative name for search',
      },
    },
    {
      name: 'specs',
      type: 'array',
      localized: true,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'value',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'gallery',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'downloadableFiles',
      type: 'array',
      admin: {
        description: 'Downloadable files (brochures, specs sheets, etc.)',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'file',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'category',
          type: 'text',
          localized: true,
          admin: {
            description: 'e.g. "Brochure", "Spec Sheet", "Certificate"',
          },
        },
      ],
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
          name: 'description',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}
