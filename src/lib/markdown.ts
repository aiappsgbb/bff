import type { CollectionEntry } from 'astro:content';
import { NAV_ORDER } from '../data/nav.mjs';
import * as content from '../data/content';
import { LEVELS } from '../data/site';
import { markdownProse } from './markdown-response';

type Doc = CollectionEntry<'docs'>;

type Item = Record<string, unknown>;
type Bindings = Record<string, Item | number>;
const arrays: Record<string, unknown> = content;

function field(bindings: Bindings, param: string, key: string) {
	const item = bindings[param];
	if (!item || typeof item !== 'object' || !Object.hasOwn(item, key)) {
		throw new Error(`Unknown field in Markdown export: ${param}.${key}`);
	}
	return item[key];
}

/** Render the markup between nested maps with the bindings of its own callback. */
function renderText(src: string, bindings: Bindings): string {
	return src
		.replace(/<FeatureCard\b([^>]*)>/g, (_, attrs: string) => {
			const title = /\btitle=(\{\w+\.\w+\})/.exec(attrs)?.[1];
			if (!title) throw new Error('Missing FeatureCard title in Markdown export');
			const href = /\bhref=\{`([^`]+)`\}/.exec(attrs)?.[1];
			return href ? `[${title}](${href}). ` : `**${title}.** `;
		})
		.replace(/<a\s+href=(\{\w+\.\w+\})>([\s\S]*?)<\/a>/g, '[$2]($1)')
		.replace(/<\/?span\b[^>]*>/g, '')
		.replace(/<(strong|h3)>(\{\w+\.title\})[.:]?<\/\1>/g, '**$2.**')
		.replace(/<\/?em>/g, '*')
		.replace(/<\/?[\w.]+(?:\s[^>]*?)?\/?>|<\/?>/g, '')
		.replace(/\s+/g, ' ')
		.replace(/\$\{principleAnchor\((\w+)\.(\w+)\)\}/g, (_, p, k) =>
			content.principleAnchor(String(field(bindings, p, k))))
		.replace(/\{(\w+)\s*>\s*0\s*&&\s*(['"])(.*?)\2\}/g, (expr, p, _quote, separator) => {
			const index = bindings[p];
			return typeof index === 'number' ? (index > 0 ? separator : '') : expr;
		})
		.replace(/\{(\w+)\.(\w+)\}/g, (_, p, k) => String(field(bindings, p, k)));
}

/** Fragments join inline; other map callbacks render one Markdown list item per record. */
function renderMap(template: string, match: RegExpExecArray, bindings: Bindings, indent: string): string {
	const [, owner, key, param, indexParam, bareParam] = match;
	const items = key ? field(bindings, owner, key) : arrays[owner];
	if (!Array.isArray(items)) throw new Error(`Expected an array in Markdown export: ${key ? `${owner}.${key}` : owner}`);
	const inline = template.startsWith('<>');
	const rows = items.map((item: Item, index) => {
		const scope: Bindings = { ...bindings, [param ?? bareParam]: item };
		if (indexParam) scope[indexParam] = index;
		const body = expandMaps(template, scope, indent + '  ');
		return inline ? body : `${indent}- ${body.trim().replace(/ +\n/g, '\n')}`;
	});
	return inline ? rows.join('') : `\n${rows.join('\n')}\n`;
}

/** Replace balanced maps over a content array or a bound item's array field. */
function expandMaps(src: string, bindings?: Bindings, indent = ''): string {
	let out = '';
	let i = 0;
	const text = (s: string) => bindings ? renderText(s, bindings) : s;
	if (!src.includes('.map(')) return text(src);
	const searchable = bindings ? src : markdownProse(src);
	const re = /\{\s*(\w+)(?:\.(\w+))?\.map\(\s*(?:\(\s*(\w+)\s*(?:,\s*(\w+)\s*)?\)|(\w+))\s*=>\s*/g;
	let m: RegExpExecArray | null;
	while ((m = re.exec(searchable))) {
		let depth = 1;
		let j = re.lastIndex;
		for (; j < src.length; j++) {
			if (src[j] === '{') depth++;
			else if (src[j] === '}' && --depth === 0) break;
		}
		if (depth) throw new Error(`Unclosed map in Markdown export: ${m[0]}`);
		let template = src.slice(re.lastIndex, j).trimEnd().slice(0, -1).trim();
		if (template.startsWith('(') && template.endsWith(')')) template = template.slice(1, -1).trim();
		out += text(src.slice(i, m.index)) + renderMap(template, m, bindings ?? {}, indent);
		i = j + 1;
		re.lastIndex = i;
	}
	return out + text(src.slice(i));
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
			.replace(/^[ \t]+/gm, '')
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
