import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Media',
    defaultColumns: ['alt', 'filename', 'mimeType', 'filesize'],
  },
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'title',
      type: 'text',
      localized: true,
      admin: {
        description: 'Optional title attribute for the image',
      },
    },
    {
      name: 'caption',
      type: 'text',
      localized: true,
    },
  ],
}
