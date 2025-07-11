// /schemas/aboutUs.ts
import { defineType, defineField } from 'sanity';

export const aboutUs = defineType({
  name: 'about',
  title: 'About Us Page',
  type: 'document',
  fields: [
    defineField({
      name: 'content',
      title: 'Page Content',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
    }),
  ],
});
