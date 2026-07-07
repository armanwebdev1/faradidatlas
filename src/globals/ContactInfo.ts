import type { GlobalConfig } from 'payload'

export const ContactInfo: GlobalConfig = {
  slug: 'contact-info',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Contact',
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phones',
      type: 'array',
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
        },
        {
          name: 'display',
          type: 'text',
          required: true,
        },
        {
          name: 'whatsappHref',
          type: 'text',
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
          name: 'address',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'phone',
          type: 'text',
        },
        {
          name: 'email',
          type: 'email',
        },
      ],
    },
    {
      name: 'responseSLA',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
        },
      ],
    },
  ],
}
