import type { GlobalConfig } from 'payload'
import { isRole } from '../access/isRole'

export const CareersInfo: GlobalConfig = {
  slug: 'careers-info',
  access: {
    read: () => true,
    update: isRole('super-admin', 'company-admin'),
  },
  admin: {
    group: 'Company',
    description: 'Careers page content: culture values with icons and descriptions',
  },
  fields: [
    {
      name: 'culture',
      type: 'array',
      admin: {
        description: 'Culture values displayed on the Careers page',
      },
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
          required: true,
          localized: true,
        },
        {
          name: 'icon',
          type: 'text',
          admin: {
            description: 'Icon name: ShieldCheck, Scale, Leaf, or Lightbulb',
          },
        },
      ],
    },
  ],
}
