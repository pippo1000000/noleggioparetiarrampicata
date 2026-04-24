import { defineCollection, z } from 'astro:content';

const eventiCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    image: image(),
    date: z.string(),
    sortDate: z.date(),
    location: z.string(),
    videoUrl: z.string().optional(),
  }),
});

export const collections = {
  'eventi': eventiCollection,
};
