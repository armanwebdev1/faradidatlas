import type { CollectionConfig } from 'payload'
import { isRole } from '../access/isRole'

export const Jobs: CollectionConfig = {
  slug: 'jobs',
  access: {
    read: () => true,
    create: isRole('super-admin', 'company-admin', 'editor'),
    update: isRole('super-admin', 'company-admin', 'editor'),
    delete: isRole('super-admin', 'company-admin', 'editor'),
  },
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'department', 'location', 'status'],
    description: 'Job listings with multilingual titles, descriptions, and application requirements',
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
        { label: 'Full-time', value: 'full-time' },
        { label: 'Part-time', value: 'part-time' },
        { label: 'Contract', value: 'contract' },
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
        { label: 'Active', value: 'active' },
        { label: 'Closed', value: 'closed' },
        { label: 'On Hold', value: 'on-hold' },
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
