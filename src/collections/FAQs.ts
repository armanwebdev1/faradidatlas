import type { CollectionConfig } from 'payload'
import { isRole } from '../access/isRole'

export const FAQs: CollectionConfig = {
  slug: 'faqs',
  labels: {
    singular: { en: 'FAQ', fa: 'سوال متداول' },
    plural: { en: 'FAQs', fa: 'سوالات متداول' },
  },
  access: {
    read: () => true,
    create: isRole('super-admin', 'company-admin', 'editor'),
    update: isRole('super-admin', 'company-admin', 'editor'),
    delete: isRole('super-admin', 'company-admin', 'editor'),
  },
  admin: {
    useAsTitle: 'question',
    group: { en: 'Content', fa: 'محتوا' },
    description: { en: 'Frequently asked questions organized by category for the FAQ page', fa: 'سوالات متداول دسته‌بندی شده برای صفحه سوالات متداول' },
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'answer',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: { en: 'Company', fa: 'شرکت' }, value: 'company' },
        { label: { en: 'Products', fa: 'محصولات' }, value: 'products' },
        { label: { en: 'Sourcing', fa: 'تأمین' }, value: 'sourcing' },
        { label: { en: 'Quality', fa: 'کیفیت' }, value: 'quality' },
        { label: { en: 'Vision', fa: 'چشم‌انداز' }, value: 'vision' },
        { label: { en: 'Values', fa: 'ارزش‌ها' }, value: 'values' },
        { label: { en: 'Inquiry', fa: 'استعلام' }, value: 'inquiry' },
      ],
      admin: {
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
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Show/hide this FAQ item',
        position: 'sidebar',
      },
    },
  ],
}
