import type { CollectionConfig } from 'payload'
import { isRole } from '../access/isRole'

export const Certificates: CollectionConfig = {
  slug: 'certificates',
  labels: {
    singular: { en: 'Certificate', fa: 'گواهینامه' },
    plural: { en: 'Certificates', fa: 'گواهینامه‌ها' },
  },
  access: {
    read: () => true,
    create: isRole('super-admin', 'company-admin'),
    update: isRole('super-admin', 'company-admin', 'editor'),
    delete: isRole('super-admin', 'company-admin'),
  },
  admin: {
    useAsTitle: 'title',
    group: { en: 'Catalog', fa: 'کاتالوگ' },
    defaultColumns: ['title', 'issueDate', 'ordering'],
  },
  versions: {
    drafts: true,
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
      name: 'image',
      type: 'upload',
      label: { en: 'Image', fa: 'تصویر' },
      relationTo: 'media',
    },
    {
      name: 'issueDate',
      type: 'date',
      label: { en: 'Issue Date', fa: 'تاریخ صدور' },
      admin: {
        description: { en: 'Date the certificate was issued', fa: 'تاریخ صدور گواهینامه' },
      },
    },
    {
      name: 'expiryDate',
      type: 'date',
      label: { en: 'Expiry Date', fa: 'تاریخ انقضا' },
      admin: {
        description: { en: 'Expiry date (if applicable)', fa: 'تاریخ انقضا (در صورت وجود)' },
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: { en: 'Description', fa: 'توضیحات' },
      localized: true,
    },
    {
      name: 'issuingBody',
      type: 'text',
      label: { en: 'Issuing Body', fa: 'سازمان صادرکننده' },
      localized: true,
      admin: {
        description: { en: 'Organization that issued the certificate', fa: 'سازمانی که گواهینامه را صادر کرده است' },
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
        description: { en: 'Show/hide this certificate', fa: 'نمایش/مخفی‌کردن این گواهینامه' },
        position: 'sidebar',
      },
    },
  ],
}
