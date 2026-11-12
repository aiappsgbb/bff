import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			extend: z.object({
				/** Mono "code-like" eyebrow shown above the title, e.g. `fundamentals.intro()`. */
				eyebrow: z.string().optional(),
				/** Section accent used for the eyebrow square and the bar under the title. */
				accent: z.enum(['green', 'blue', 'purple', 'pink', 'orange', 'yellow']).optional(),
				/** Visually hide the page title (the page renders its own hero). */
				hideTitle: z.boolean().optional(),
				/** Widen the content column (scrollytelling, maps). */
				wide: z.boolean().optional(),
			}),
		}),
	}),
};
