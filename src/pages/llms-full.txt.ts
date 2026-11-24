import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { pageUrl, siteRoot, sortByNav, toMarkdown } from '../lib/markdown';
import { markdownResponse } from '../lib/markdown-response';

export const GET: APIRoute = async ({ site, url }) => {
	const root = siteRoot(site);
	const docs = sortByNav(await getCollection('docs'));
	const parts = docs.map((e) => `<!-- ${pageUrl(e, root)} -->\n${toMarkdown(e, root)}`);
	return markdownResponse(parts.join('\n---\n\n'), url.pathname, 'text/plain');
};
