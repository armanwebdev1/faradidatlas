import type { GlobalConfig } from 'payload'

export const CompanyInfo: GlobalConfig = {
  slug: 'company-info',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Company',
  },
  fields: [
    {
      name: 'about',
      type: 'richText',
      localized: true,
    },
    {
      name: 'mission',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'vision',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'values',
      type: 'array',
      localized: true,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'ceo',
      type: 'group',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'bio',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'team',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
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
      ],
    },
    {
      name: 'offices',
      type: 'array',
      fields: [
        {
          name: 'city',
          type: 'text',
          required: true,
        },
        {
          name: 'country',
          type: 'text',
          required: true,
        },
        {
          name: 'address',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'isHeadquarters',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
  ],
}
