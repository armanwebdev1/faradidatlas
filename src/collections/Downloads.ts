import type { CollectionConfig } from 'payload'
import { isRole } from '../access/isRole'

export const Downloads: CollectionConfig = {
  slug: 'downloads',
  labels: {
    singular: { en: 'Download', fa: 'دانلود' },
    plural: { en: 'Downloads', fa: 'دانلودها' },
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
    defaultColumns: ['title', 'category', 'ordering'],
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
      name: 'file',
      type: 'upload',
      label: { en: 'File', fa: 'فایل' },
      relationTo: 'media',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      label: { en: 'Category', fa: 'دسته‌بندی' },
      required: true,
      options: [
        { label: { en: 'Brochure', fa: 'بروشور' }, value: 'brochure' },
        { label: { en: 'Spec Sheet', fa: 'مشخصات فنی' }, value: 'spec-sheet' },
        { label: { en: 'Certificate', fa: 'گواهینامه' }, value: 'certificate' },
        { label: { en: 'Catalog', fa: 'کاتالوگ' }, value: 'catalog' },
        { label: { en: 'Price List', fa: 'لیست قیمت' }, value: 'price-list' },
        { label: { en: 'Other', fa: 'سایر' }, value: 'other' },
      ],
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
        description: { en: 'Show/hide this download', fa: 'نمایش/مخفی‌کردن این دانلود' },
        position: 'sidebar',
      },
    },
  ],
}
