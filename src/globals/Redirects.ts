import type { GlobalConfig } from 'payload'

export const Redirects: GlobalConfig = {
  slug: 'redirects',
  admin: {
    group: 'Settings',
  },
  fields: [
    {
      name: 'redirects',
      type: 'array',
      fields: [
        {
          name: 'from',
          type: 'text',
          required: true,
        },
        {
          name: 'to',
          type: 'text',
          required: true,
        },
        {
          name: 'type',
          type: 'select',
          required: true,
          options: [
            { label: '301 Permanent', value: '301' },
            { label: '302 Temporary', value: '302' },
          ],
          defaultValue: '301',
        },
      ],
    },
  ],
}
