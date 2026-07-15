import type { CollectionConfig } from 'payload'
import { isRole } from '../access/isRole'

export const FAQs: CollectionConfig = {
  slug: 'faqs',
  access: {
    read: () => true,
    create: isRole('super-admin', 'company-admin', 'editor'),
    update: isRole('super-admin', 'company-admin', 'editor'),
    delete: isRole('super-admin', 'company-admin', 'editor'),
  },
  admin: {
    useAsTitle: 'question',
    group: 'Content',
    description: 'Frequently asked questions organized by category for the FAQ page',
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
        { label: 'Company', value: 'company' },
        { label: 'Products', value: 'products' },
        { label: 'Sourcing', value: 'sourcing' },
        { label: 'Quality', value: 'quality' },
        { label: 'Vision', value: 'vision' },
        { label: 'Values', value: 'values' },
        { label: 'Inquiry', value: 'inquiry' },
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
