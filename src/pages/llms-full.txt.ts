import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { pageUrl, siteRoot, sortByNav, toMarkdown } from '../lib/markdown';

export const GET: APIRoute = async ({ site }) => {
	const root = siteRoot(site);
	const docs = sortByNav(await getCollection('docs'));
	const parts = docs.map((e) => `<!-- ${pageUrl(e, root)} -->\n${toMarkdown(e, root)}`);
	return new Response(parts.join('\n---\n\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
