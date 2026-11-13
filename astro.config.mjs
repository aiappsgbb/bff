// @ts-check
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { unified } from '@astrojs/markdown-remark';
import rehypeBaseLinks from './plugins/rehype-base-links.mjs';
import { SIDEBAR } from './src/data/nav.mjs';

// GitHub Pages: the deploy workflow sets SITE, BASE_PATH and PUBLIC_REPO_URL.
const site = process.env.SITE ?? 'http://localhost:4321';
const base = process.env.BASE_PATH ?? '/';
const repo = process.env.PUBLIC_REPO_URL ?? 'https://github.com/aiappsgbb/bff';
const withBase = (/** @type {string} */ p) => `${base.replace(/\/$/, '')}${p}`;
// Link-preview services (Teams, Slack, LinkedIn) cache images by URL; a content hash busts them when og.png changes.
const ogVersion = createHash('sha256').update(readFileSync(new URL('./public/og.png', import.meta.url))).digest('hex').slice(0, 8);
const ogImage = `${new URL(withBase('/og.png'), site).href}?v=${ogVersion}`;

export default defineConfig({
	site,
	base,
	trailingSlash: 'always',
	redirects: { '/framework/big-picture/': withBase('/#what') },
	markdown: { processor: unified({ rehypePlugins: [[rehypeBaseLinks, { base }]] }) },
	integrations: [
		starlight({
			title: 'Bright Factory Framework',
			description:
				'Microsoft opinionated framework for building agentic software factories: ideas come to life, agents do the heavy lifting, humans monitor and control.',
			logo: { src: './src/assets/logo.svg', alt: 'Bright Factory Framework' },
			favicon: '/favicon.svg',
			customCss: ['./src/styles/fonts.css', './src/styles/theme.css', './src/styles/components.css'],
			social: [{ icon: 'github', label: 'Source on GitHub', href: repo }],
			editLink: { baseUrl: `${repo}/edit/main/` },
			lastUpdated: true,
			pagination: true,
			credits: false,
			tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 },
			components: {
				PageTitle: './src/components/overrides/PageTitle.astro',
				Footer: './src/components/overrides/Footer.astro',
				SiteTitle: './src/components/overrides/SiteTitle.astro',
				Header: './src/components/overrides/Header.astro',
			},
			head: [
				{ tag: 'link', attrs: { rel: 'preload', href: withBase('/fonts/MonaSansVF.woff2'), as: 'font', type: 'font/woff2', crossorigin: '' } },
				{ tag: 'meta', attrs: { property: 'og:image', content: ogImage } },
				{ tag: 'meta', attrs: { property: 'og:image:width', content: '1200' } },
				{ tag: 'meta', attrs: { property: 'og:image:height', content: '630' } },
				{ tag: 'meta', attrs: { property: 'og:image:alt', content: 'Bright Factory Framework' } },
				{ tag: 'meta', attrs: { name: 'twitter:image', content: ogImage } },
				{ tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
				{ tag: 'meta', attrs: { name: 'theme-color', content: '#08872b' } },
				{ tag: 'link', attrs: { rel: 'alternate', type: 'text/markdown', href: withBase('/AGENTS.md'), title: 'AGENTS.md' } },
			],
			sidebar: SIDEBAR,
		}),
	],
});
