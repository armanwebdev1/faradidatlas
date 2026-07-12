import type { CollectionConfig } from 'payload'

export const Certificates: CollectionConfig = {
  slug: 'certificates',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    group: 'Company',
    defaultColumns: ['title', 'issueDate', 'ordering'],
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
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'issueDate',
      type: 'date',
      admin: {
        description: 'Date the certificate was issued',
      },
    },
    {
      name: 'expiryDate',
      type: 'date',
      admin: {
        description: 'Expiry date (if applicable)',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'issuingBody',
      type: 'text',
      localized: true,
      admin: {
        description: 'Organization that issued the certificate',
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
        description: 'Show/hide this certificate',
        position: 'sidebar',
      },
    },
  ],
}
