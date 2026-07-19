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
  fields: [
    {
      name: 'title',
      type: 'text',
      label: { en: 'Title', fa: 'عنوان' },
      required: true,
      localized: true,
    },
    {
      name: 'department',
      type: 'text',
      label: { en: 'Department', fa: 'بخش' },
      required: true,
      localized: true,
    },
    {
      name: 'location',
      type: 'text',
      label: { en: 'Location', fa: 'موقعیت' },
      required: true,
      localized: true,
    },
    {
      name: 'salary',
      type: 'text',
      label: { en: 'Salary', fa: 'حقوق' },
      localized: true,
      admin: {
        description: { en: 'Salary range or compensation info', fa: 'محدوده حقوق یا اطلاعات جبران خدمت' },
      },
    },
    {
      name: 'type',
      type: 'select',
      label: { en: 'Type', fa: 'نوع' },
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
      label: { en: 'Job Status', fa: 'وضعیت شغل' },
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
      label: { en: 'Description', fa: 'توضیحات' },
      required: true,
      localized: true,
    },
    {
      name: 'responsibilities',
      type: 'array',
      label: { en: 'Responsibilities', fa: 'مسئولیت‌ها' },
      localized: true,
      fields: [
        {
          name: 'item',
          type: 'text',
          label: { en: 'Item', fa: 'مورد' },
          required: true,
        },
      ],
    },
    {
      name: 'requirements',
      type: 'array',
      label: { en: 'Requirements', fa: 'شرایط موردنیاز' },
      localized: true,
      fields: [
        {
          name: 'item',
          type: 'text',
          label: { en: 'Item', fa: 'مورد' },
          required: true,
        },
      ],
    },
    {
      name: 'benefits',
      type: 'array',
      label: { en: 'Benefits', fa: 'مزایا' },
      localized: true,
      fields: [
        {
          name: 'item',
          type: 'text',
          label: { en: 'Item', fa: 'مورد' },
          required: true,
        },
      ],
    },
  ],
}
