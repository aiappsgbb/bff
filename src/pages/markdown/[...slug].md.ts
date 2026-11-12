import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import { pageId, siteRoot, toMarkdown } from '../../lib/markdown';

export const getStaticPaths = (async () => {
	const docs = await getCollection('docs');
	return docs.map((entry) => ({ params: { slug: pageId(entry) }, props: { entry } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute<{ entry: CollectionEntry<'docs'> }> = ({ props, site }) =>
	new Response(toMarkdown(props.entry, siteRoot(site)), {
		headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
	});
