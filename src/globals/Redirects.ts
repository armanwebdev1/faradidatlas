import type { GlobalConfig } from 'payload'
import { isRole } from '../access/isRole'

export const Redirects: GlobalConfig = {
  slug: 'redirects',
  label: { en: 'Redirects', fa: 'تغییر مسیرها' },
  access: {
    read: () => true,
    update: isRole('super-admin'),
  },
  admin: {
    group: { en: 'Settings', fa: 'تنظیمات' },
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
            { label: { en: '301 Permanent', fa: '301 دائمی' }, value: '301' },
            { label: { en: '302 Temporary', fa: '302 موقت' }, value: '302' },
          ],
          defaultValue: '301',
        },
      ],
    },
  ],
}
