import type { CollectionConfig } from 'payload'
import { isRole } from '../access/isRole'

export const Jobs: CollectionConfig = {
  slug: 'jobs',
  labels: {
    singular: { en: 'Job', fa: 'شغل' },
    plural: { en: 'Jobs', fa: 'مشاغل' },
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
    defaultColumns: ['title', 'department', 'location', 'status'],
    description: { en: 'Job listings with multilingual titles, descriptions, and application requirements', fa: 'آگهی‌های استخدام با عناوین، توضیحات و الزامات درخواست چندزبانه' },
  },
  versions: {
    drafts: true,
    maxPerDoc: 10,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'department',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'location',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'salary',
      type: 'text',
      localized: true,
      admin: {
        description: 'Salary range or compensation info',
      },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: { en: 'Full-time', fa: 'تمام‌وقت' }, value: 'full-time' },
        { label: { en: 'Part-time', fa: 'پاره‌وقت' }, value: 'part-time' },
        { label: { en: 'Contract', fa: 'قراردادی' }, value: 'contract' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'jobStatus',
      type: 'select',
      defaultValue: 'active',
      options: [
        { label: { en: 'Active', fa: 'فعال' }, value: 'active' },
        { label: { en: 'Closed', fa: 'بسته شده' }, value: 'closed' },
        { label: { en: 'On Hold', fa: 'در انتظار' }, value: 'on-hold' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'responsibilities',
      type: 'array',
      localized: true,
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'requirements',
      type: 'array',
      localized: true,
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'benefits',
      type: 'array',
      localized: true,
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
