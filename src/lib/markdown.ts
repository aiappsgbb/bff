import type { CollectionEntry } from 'astro:content';
import { NAV_ORDER } from '../data/nav.mjs';
import * as content from '../data/content';
import { LEVELS } from '../data/site';

type Doc = CollectionEntry<'docs'>;

type Item = Record<string, unknown>;
const ARRAYS = content as unknown as Record<string, Item[] | undefined>;

/** Render `{NAME.map((p) => (...))}` blocks from the content arrays as a Markdown list. */
function renderMap(name: string, template: string): string {
	const items = ARRAYS[name];
	if (!Array.isArray(items)) return '';
	return items
		.map((item) => {
			const text = template
				.replace(/<([\w.]+)(?:\s[^>]*?)?(\/?)>/g, '<$1$2>')
				.replace(/\{p\.title\}[.:]?/g, '')
				.replace(/<\/?em>/g, '*')
				.replace(/<\/?[\w.]+\/?>/g, ' ')
				.replace(/\{p\.(\w+)\}/g, (_, k: string) => String(item[k] ?? ''))
				.replace(/\s+/g, ' ')
				.trim();
			return `- ${item.title ? `**${item.title}.** ` : ''}${text}`;
		})
		.join('\n');
}

/** Replace balanced `{NAME.map(` expressions. */
function expandMaps(src: string): string {
	let out = '';
	let i = 0;
	const re = /\{([A-Z_]+)\.map\(/g;
	let m: RegExpExecArray | null;
	while ((m = re.exec(src))) {
		let depth = 0;
		let j = m.index;
		for (; j < src.length; j++) {
			if (src[j] === '{') depth++;
			else if (src[j] === '}' && --depth === 0) break;
		}
		const block = src.slice(m.index, j + 1);
		const tpl = block.slice(block.indexOf('=>') + 2).replace(/\)\)\}$/, '').replace(/^\s*\(/, '');
		out += src.slice(i, m.index) + `\n${renderMap(m[1], tpl)}\n`;
		i = j + 1;
		re.lastIndex = i;
	}
	return out + src.slice(i);
}

const asBlockquote = (title: string | undefined, body: string) =>
	'\n' + [title ? `**${title}**` : '', ...body.trim().split('\n')].filter((l, n) => n > 0 || l).map((l) => `> ${l.trim()}`.trimEnd()).join('\n') + '\n';

/** Turn an MDX page body into portable Markdown for "Copy page", the .md route and llms-full.txt. */
export function toMarkdown(entry: Doc, siteUrl: string): string {
	const level = (k: string, f: string) => String((LEVELS as unknown as Record<string, Item>)[k]?.[f] ?? '');
	const body = expandMaps(
		(entry.body ?? '')
			.replace(/^import\s.+?;?\s*$/gm, '')
			.replace(/^export\s[\s\S]*?(?=\n\s*\n)/gm, '')
	)
		.replace(/<Section\b[^>]*?\btitle="([^"]+)"(?:[^>]*?\blede="([^"]+)")?[^>]*>/g, (_, t: string, l?: string) => `\n## ${t}\n\n${l ?? ''}\n`)
		.replace(/\{LEVELS\.(\w+)\.(\w+)\}/g, (_, k: string, f: string) => level(k, f))
		.replace(/<a\s+href=(?:\{withBase\('([^']+)'\)\}|"([^"]+)")[^>]*>([\s\S]*?)<\/a>/g, (_, a?: string, b?: string, t = '') => `[${t.trim()}](${a ?? b})`)
		.replace(/<figcaption>([\s\S]*?)<\/figcaption>/g, '\n*$1*\n')
		.replace(/<Aside\b([^>]*)>([\s\S]*?)<\/Aside>/g, (_, attrs: string, inner: string) => asBlockquote(/title="([^"]+)"/.exec(attrs)?.[1], inner))
		.replace(/<TabItem\s+label="([^"]+)"[^>]*>/g, '\n**$1**\n')
		.replace(/<\/?(Tabs|TabItem|Steps|CardGrid|Fragment)[^>]*>/g, '')
		.replace(/<Card\s+title="([^"]+)"[^>]*>/g, '\n### $1\n')
		.replace(/<\/Card>/g, '')
		.replace(/<LinkCard\s+title="([^"]+)"[^>]*?href="([^"]+)"[^>]*\/>/g, '- [$1]($2)')
		.replace(/<[A-Z][\w.]*\b[^>]*\/>/gs, '')
		.replace(/<\/?[A-Z][\w.]*\b[^>]*>/g, '')
		.replace(/<\/?(div|ul|ol|li|figure|p|span|section)\b[^>]*>/g, '')
		.replace(/^[ \t]+/gm, '')
		.replace(/\]\(\/(?!\/)/g, `](${siteUrl}/`)
		.replace(/\n{3,}/g, '\n\n')
		.trim();
	const head = [`# ${entry.data.title}`];
	if (entry.data.description) head.push('', `> ${entry.data.description}`);
	return `${head.join('\n')}\n\n${body}\n`;
}

export function pageId(entry: Doc): string {
	return entry.id === '' ? 'index' : entry.id;
}

export function sortByNav(entries: Doc[]): Doc[] {
	const rank = (e: Doc) => {
		const i = NAV_ORDER.indexOf(pageId(e));
		return i === -1 ? Number.MAX_SAFE_INTEGER : i;
	};
	return [...entries].sort((a, b) => rank(a) - rank(b));
}

/** Absolute site URL including the base, without a trailing slash. */
export function siteRoot(site: URL | undefined): string {
	const base = import.meta.env.BASE_URL.replace(/\/$/, '');
	return `${(site?.origin ?? 'http://localhost:4321')}${base}`;
}

export function pageUrl(entry: Doc, root: string): string {
	const id = pageId(entry);
	return id === 'index' ? `${root}/` : `${root}/${id}/`;
}
