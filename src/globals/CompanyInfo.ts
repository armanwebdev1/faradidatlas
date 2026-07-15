import type { GlobalConfig } from 'payload'
import { isRole } from '../access/isRole'

export const CompanyInfo: GlobalConfig = {
  slug: 'company-info',
  access: {
    read: () => true,
    update: isRole('super-admin', 'company-admin'),
  },
  admin: {
    group: 'Company',
    description: 'Company information for the About page: CEO profile, team, offices, strategic framework, and offerings',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'About',
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
              name: 'aboutStats',
              type: 'array',
              admin: {
                description: 'Stats displayed in the About hero section',
              },
              fields: [
                {
                  name: 'value',
                  type: 'number',
                  required: true,
                },
                {
                  name: 'suffix',
                  type: 'text',
                },
                {
                  name: 'labelEn',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'labelFa',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'labelAr',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'CEO',
          fields: [
            {
              name: 'ceo',
              type: 'group',
              fields: [
                {
                  name: 'eyebrow',
                  type: 'text',
                  localized: true,
                },
                {
                  name: 'heading',
                  type: 'text',
                  localized: true,
                },
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
          ],
        },
        {
          label: 'Team',
          fields: [
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
          ],
        },
        {
          label: 'Offices & Timeline',
          fields: [
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
            {
              name: 'timeline',
              type: 'array',
              localized: true,
              admin: {
                description: 'Company history timeline milestones',
              },
              fields: [
                {
                  name: 'year',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                },
              ],
            },
          ],
        },
        {
          label: 'Strategic Framework',
          fields: [
            {
              name: 'strategicFramework',
              type: 'group',
              admin: {
                description: 'Vision, Mission, Values section on the About page',
              },
              fields: [
                {
                  name: 'eyebrow',
                  type: 'text',
                  localized: true,
                },
                {
                  name: 'title',
                  type: 'text',
                  localized: true,
                },
                {
                  name: 'intro',
                  type: 'textarea',
                  localized: true,
                },
                {
                  name: 'vision',
                  type: 'group',
                  fields: [
                    {
                      name: 'label',
                      type: 'text',
                      localized: true,
                    },
                    {
                      name: 'title',
                      type: 'text',
                      localized: true,
                    },
                    {
                      name: 'body',
                      type: 'textarea',
                      localized: true,
                    },
                    {
                      name: 'notes',
                      type: 'array',
                      localized: true,
                      fields: [
                        {
                          name: 'text',
                          type: 'text',
                          required: true,
                        },
                      ],
                    },
                  ],
                },
                {
                  name: 'mission',
                  type: 'group',
                  fields: [
                    {
                      name: 'label',
                      type: 'text',
                      localized: true,
                    },
                    {
                      name: 'title',
                      type: 'text',
                      localized: true,
                    },
                    {
                      name: 'body',
                      type: 'textarea',
                      localized: true,
                    },
                    {
                      name: 'notes',
                      type: 'array',
                      localized: true,
                      fields: [
                        {
                          name: 'text',
                          type: 'text',
                          required: true,
                        },
                      ],
                    },
                  ],
                },
                {
                  name: 'valuesSection',
                  type: 'group',
                  fields: [
                    {
                      name: 'label',
                      type: 'text',
                      localized: true,
                    },
                    {
                      name: 'title',
                      type: 'text',
                      localized: true,
                    },
                    {
                      name: 'body',
                      type: 'textarea',
                      localized: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Offerings & Content',
          fields: [
            {
              name: 'offerings',
              type: 'array',
              admin: {
                description: 'What We Offer section on the About page',
              },
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                },
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
              ],
            },
            {
              name: 'certificates',
              type: 'array',
              admin: {
                description: 'Company certifications and awards',
              },
              fields: [
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
                {
                  name: 'issueDate',
                  type: 'date',
                },
                {
                  name: 'description',
                  type: 'textarea',
                  localized: true,
                },
              ],
            },
            {
              name: 'banners',
              type: 'array',
              admin: {
                description: 'About page promotional banners',
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
                  localized: true,
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                },
                {
                  name: 'link',
                  type: 'text',
                },
              ],
            },
            {
              name: 'getConnected',
              type: 'group',
              admin: {
                description: 'Get Connected section on the About page',
              },
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                },
                {
                  name: 'alt',
                  type: 'text',
                  localized: true,
                },
                {
                  name: 'heading',
                  type: 'text',
                  localized: true,
                },
                {
                  name: 'paragraph1',
                  type: 'textarea',
                  localized: true,
                },
                {
                  name: 'paragraph2',
                  type: 'textarea',
                  localized: true,
                },
                {
                  name: 'quote',
                  type: 'textarea',
                  localized: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
