import type { GlobalConfig } from 'payload'
import { isRole } from '../access/isRole'

export const ContactInfo: GlobalConfig = {
  slug: 'contact-info',
  access: {
    read: () => true,
    update: isRole('super-admin', 'company-admin'),
  },
  admin: {
    group: 'Company',
    description: 'Contact information: email, phone numbers, office addresses, response SLA, and trust statistics',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Contact Details',
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
              name: 'workingHours',
              type: 'group',
              fields: [
                {
                  name: 'weekdays',
                  type: 'text',
                  localized: true,
                  admin: {
                    description: 'e.g. "Saturday - Wednesday: 9:00 AM - 5:00 PM"',
                  },
                },
                {
                  name: 'weekends',
                  type: 'text',
                  localized: true,
                  admin: {
                    description: 'e.g. "Thursday: 9:00 AM - 1:00 PM"',
                  },
                },
                {
                  name: 'timezone',
                  type: 'text',
                  defaultValue: 'Asia/Tehran',
                },
              ],
            },
            {
              name: 'socialMedia',
              type: 'array',
              admin: {
                description: 'Social media links for the contact page',
              },
              fields: [
                {
                  name: 'platform',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'url',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'label',
                  type: 'text',
                  localized: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Offices',
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
                {
                  name: 'googleMapsEmbed',
                  type: 'text',
                  admin: {
                    description: 'Google Maps embed URL for this office',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Page Content',
          fields: [
            {
              name: 'hero',
              type: 'group',
              localized: true,
              fields: [
                {
                  name: 'eyebrow',
                  type: 'text',
                },
                {
                  name: 'title',
                  type: 'text',
                },
                {
                  name: 'description',
                  type: 'textarea',
                },
                {
                  name: 'badges',
                  type: 'array',
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
              name: 'cta',
              type: 'group',
              localized: true,
              fields: [
                {
                  name: 'headline',
                  type: 'text',
                },
                {
                  name: 'description',
                  type: 'textarea',
                },
                {
                  name: 'buttonText',
                  type: 'text',
                },
                {
                  name: 'buttonUrl',
                  type: 'text',
                },
              ],
            },
          ],
        },
        {
          label: 'Response & Trust',
          fields: [
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
                {
                  name: 'steps',
                  type: 'array',
                  localized: true,
                  fields: [
                    {
                      name: 'title',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'timeline',
                      type: 'text',
                    },
                    {
                      name: 'description',
                      type: 'textarea',
                    },
                  ],
                },
              ],
            },
            {
              name: 'trustStats',
              type: 'array',
              admin: {
                description: 'Trust statistics displayed on the contact page',
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
                  name: 'label',
                  type: 'text',
                  required: true,
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
