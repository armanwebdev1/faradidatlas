import type { CollectionConfig } from 'payload'
import { isRole } from '../access/isRole'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: { en: 'User', fa: 'کاربر' },
    plural: { en: 'Users', fa: 'کاربران' },
  },
  auth: true,
  admin: {
    useAsTitle: 'email',
    group: { en: 'Settings', fa: 'تنظیمات' },
    description: { en: 'Manage admin users and their roles', fa: 'مدیریت کاربران مدیریت و نقش‌های آن‌ها' },
  },
  access: {
    create: isRole('super-admin'),
    update: isRole('super-admin'),
    delete: isRole('super-admin'),
    read: isRole('super-admin', 'company-admin'),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
    },
    {
      name: 'role',
      type: 'select',
      options: [
        { label: { en: 'Super Admin', fa: 'مدیر ارشد' }, value: 'super-admin' },
        { label: { en: 'Company Admin', fa: 'مدیر شرکت' }, value: 'company-admin' },
        { label: { en: 'Editor', fa: 'ویرایشگر' }, value: 'editor' },
      ],
      defaultValue: 'editor',
      required: true,
      access: {
        update: isRole('super-admin'),
      },
    },
  ],
}
