// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { unified } from '@astrojs/markdown-remark';
import rehypeBaseLinks from './plugins/rehype-base-links.mjs';
import { SIDEBAR } from './src/data/nav.mjs';

// GitHub Pages: the deploy workflow sets SITE, BASE_PATH and PUBLIC_REPO_URL.
const site = process.env.SITE ?? 'http://localhost:4321';
const base = process.env.BASE_PATH ?? '/';
const repo = process.env.PUBLIC_REPO_URL ?? 'https://github.com/OWNER/bright-factory-framework';
const withBase = (/** @type {string} */ p) => `${base.replace(/\/$/, '')}${p}`;

export default defineConfig({
	site,
	base,
	trailingSlash: 'always',
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
			},
			head: [
				{ tag: 'link', attrs: { rel: 'preload', href: withBase('/fonts/MonaSansVF.woff2'), as: 'font', type: 'font/woff2', crossorigin: '' } },
				{ tag: 'meta', attrs: { property: 'og:image', content: new URL(withBase('/og.png'), site).href } },
				{ tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
				{ tag: 'meta', attrs: { name: 'theme-color', content: '#08872b' } },
				{ tag: 'link', attrs: { rel: 'alternate', type: 'text/plain', href: withBase('/llms.txt'), title: 'llms.txt' } },
			],
			sidebar: SIDEBAR,
		}),
	],
});
