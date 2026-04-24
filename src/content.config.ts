import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const eventi = defineCollection({
  // Load all markdown files from src/content/eventi
  loader: glob({ pattern: "**/*.md", base: "./src/content/eventi" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    image: image(),
    date: z.coerce.string(),
    sortDate: z.coerce.date(),
    location: z.string(),
    videoUrl: z.string().optional(),
  }),
});

export const collections = {
  'eventi': eventi,
};
