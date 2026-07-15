import type { CollectionConfig } from 'payload'
import { isRole } from '../access/isRole'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    group: 'Settings',
    description: 'Manage admin users and their roles',
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
        { label: 'Super Admin', value: 'super-admin' },
        { label: 'Company Admin', value: 'company-admin' },
        { label: 'Editor', value: 'editor' },
      ],
      defaultValue: 'editor',
      required: true,
      access: {
        update: isRole('super-admin'),
      },
    },
  ],
}
