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

  fields: [
    {
      name: 'question',
      type: 'text',
      label: { en: 'Question', fa: 'سوال' },
      required: true,
      localized: true,
    },
    {
      name: 'answer',
      type: 'textarea',
      label: { en: 'Answer', fa: 'پاسخ' },
      required: true,
      localized: true,
    },
    {
      name: 'category',
      type: 'select',
      label: { en: 'Category', fa: 'دسته‌بندی' },
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
      label: { en: 'Ordering', fa: 'ترتیب نمایش' },
      defaultValue: 0,
      admin: {
        description: { en: 'Display order (lower numbers first)', fa: 'ترتیب نمایش (اعداد کمتر اول)' },
        position: 'sidebar',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: { en: 'Active', fa: 'فعال' },
      defaultValue: true,
      admin: {
        description: { en: 'Show/hide this FAQ item', fa: 'نمایش/مخفی‌کردن این سوال متداول' },
        position: 'sidebar',
      },
    },
  ],
}
