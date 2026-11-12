import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { NAV } from '../data/nav.mjs';
import { pageId, siteRoot } from '../lib/markdown';

export const GET: APIRoute = async ({ site }) => {
	const root = siteRoot(site);
	const docs = new Map((await getCollection('docs')).map((e) => [pageId(e), e]));
	const lines = [
		'# Bright Factory Framework',
		'',
		'> Microsoft opinionated framework for building agentic software factories on GitHub, better with Microsoft and open to the tools teams already use. Ideas come to life, agents do the heavy lifting, humans monitor and control.',
		'',
		`Every page is also available as Markdown. The full text is at ${root}/llms-full.txt.`,
	];
	for (const group of NAV) {
		lines.push('', `## ${group.label}`, '');
		for (const { slug } of group.items) {
			const e = docs.get(slug);
			if (!e) continue;
			const desc = e.data.description ? `: ${e.data.description}` : '';
			lines.push(`- [${e.data.title}](${root}/markdown/${slug}.md)${desc}`);
		}
	}
	return new Response(`${lines.join('\n')}\n`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
