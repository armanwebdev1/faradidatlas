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
      type: 'select',
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
      localized: true,
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
        description: 'Show/hide this download',
        position: 'sidebar',
      },
    },
  ],
}
