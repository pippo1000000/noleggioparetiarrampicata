import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const eventi = defineCollection({
  // Load all markdown files from src/content/eventi
  loader: glob({ pattern: "**/*.md", base: "./src/content/eventi" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    date: z.coerce.date(),
    location: z.string(),
  }),
});

export const collections = {
  'eventi': eventi,
};
