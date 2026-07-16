import type { GlobalConfig } from 'payload'
import { isRole } from '../access/isRole'

export const CareersInfo: GlobalConfig = {
  slug: 'careers-info',
  label: { en: 'Careers Info', fa: 'اطلاعات استخدام' },
  access: {
    read: () => true,
    update: isRole('super-admin', 'company-admin'),
  },
  admin: {
    group: { en: 'Company', fa: 'شرکت' },
    description: { en: 'Careers page content: culture values with icons and descriptions', fa: 'محتوای صفحه استخدام: ارزش‌های فرهنگی با آیکون‌ها و توضیحات' },
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
