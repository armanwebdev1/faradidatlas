import type { CollectionConfig } from 'payload'

export const FAQs: CollectionConfig = {
  slug: 'faqs',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'question',
    group: 'Content',
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
  ],
}
