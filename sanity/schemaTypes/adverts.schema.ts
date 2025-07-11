import { DATE_FORMAT } from '@/utils/constants';
import dayjs from 'dayjs';
import { defineField, defineType } from 'sanity';

export const advertSchema = defineType({
  name: 'advert',
  title: 'Adverts',
  type: 'document',

  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Brand Name',
      description: 'Enter the name of the advertiser or brand being promoted.',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'banner',
      type: 'image',
      title: 'Advert Banner',
      description:
        'Upload the promotional banner image (ideally landscape orientation).',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      description:
        'Provide a brief summary of the advert to be displayed on the banner overlay.',
    }),

    defineField({
      name: 'start_date',
      type: 'datetime',
      title: 'Start Date',
      description:
        'Select the date and time when the advert should begin displaying on the site.',
      validation: (rule) => rule.required(),
      initialValue: dayjs().toISOString(),
    }),

    defineField({
      name: 'end_date',
      type: 'datetime',
      title: 'End Date',
      description:
        'Select the date and time when the advert should stop displaying on the site.',
      validation: (rule) => rule.required(),
      initialValue: dayjs().add(1, 'month').toISOString(),
    }),

    defineField({
      name: 'external_link',
      type: 'url',
      title: 'External Link',
      description:
        'Optional: Add a link to the advertiser’s website or landing page (must start with https://).',
      validation: (rule) => rule.uri({ scheme: ['https'] }),
    }),

    defineField({
      name: 'link_text',
      title: 'CTA Button Text',
      type: 'text',
      description:
        'Text to display on the call-to-action button (e.g., "Visit Site", "Shop Now"). Only required if an external link is set.',
      validation: (Rule) =>
        Rule.custom((linkText, context) => {
          const parent = context.parent as { external_link?: string };

          if (parent?.external_link && !linkText) {
            return 'Link text is required when an external link is provided.';
          }

          if (linkText && (linkText.length < 3 || linkText.length > 20)) {
            return 'Link text must be between 3 and 20 characters.';
          }

          return true;
        }),
    }),
  ],

  preview: {
    select: {
      title: 'name',
      start: 'start_date',
      end: 'end_date',
      banner: 'banner',
    },
    prepare(selection) {
      const { title, start, end, banner } = selection;
      return {
        title: `${title} Advert`,
        subtitle: `${dayjs(start).format(DATE_FORMAT)} - ${dayjs(end).format(DATE_FORMAT)}`,
        media: banner,
      };
    },
  },
});
