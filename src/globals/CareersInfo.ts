import type { GlobalConfig } from 'payload'
import { isRole } from '../access/isRole'

export const CareersInfo: GlobalConfig = {
  slug: 'careers-info',
  versions: {
    drafts: true,
  },
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
      label: { en: 'Culture Values', fa: 'ارزش‌های فرهنگی' },
      admin: {
        description: { en: 'Culture values displayed on the Careers page', fa: 'ارزش‌های فرهنگی نمایشی در صفحه استخدام' },
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: { en: 'Title', fa: 'عنوان' },
          required: true,
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: { en: 'Description', fa: 'توضیحات' },
          required: true,
          localized: true,
        },
        {
          name: 'icon',
          type: 'text',
          label: { en: 'Icon', fa: 'آیکون' },
          admin: {
            description: { en: 'Icon name: ShieldCheck, Scale, Leaf, or Lightbulb', fa: 'نام آیکون: ShieldCheck، Scale، Leaf یا Lightbulb' },
          },
        },
      ],
    },
  ],
}
