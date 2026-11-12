// Information architecture shared by the Starlight sidebar and the llms.txt endpoints.
// Plain JS so astro.config.mjs can import it.

/** @type {{ label: string; items: ({ slug: string; label?: string; badge?: { text: string; variant: 'tip' | 'caution' | 'note' | 'danger' | 'success' | 'default' } })[] }[]} */
export const NAV = [
	{
		label: 'Start here',
		items: [
			{ slug: 'index', label: 'Overview' },
			{ slug: 'get-started' },
			{ slug: 'get-started/find-your-level', badge: { text: 'Quiz', variant: 'tip' } },
		],
	},
	{
		label: 'Fundamentals',
		items: [{ slug: 'fundamentals' }, { slug: 'fundamentals/bright-vs-dark' }],
	},
	{
		label: 'The framework',
		items: [
			{ slug: 'framework' },
			{ slug: 'framework/principles' },
			{ slug: 'framework/big-picture' },
			{ slug: 'framework/multiplayer' },
			{ slug: 'framework/engineering' },
		],
	},
	{
		label: 'Automation levels',
		items: [
			{ slug: 'levels' },
			{ slug: 'levels/low' },
			{ slug: 'levels/medium' },
			{ slug: 'levels/high' },
			{ slug: 'levels/dim-back-up' },
		],
	},
	{
		label: 'Playbooks',
		items: [
			{ slug: 'playbooks' },
			{ slug: 'playbooks/low', badge: { text: 'Draft', variant: 'caution' } },
			{ slug: 'playbooks/medium', badge: { text: 'Draft', variant: 'caution' } },
			{ slug: 'playbooks/high', badge: { text: 'Draft', variant: 'caution' } },
		],
	},
	{
		label: 'Build your factory',
		items: [{ slug: 'get-started/demos' }, { slug: 'get-started/partners' }],
	},
	{
		label: 'Reference',
		items: [{ slug: 'reference/products' }, { slug: 'reference/glossary' }, { slug: 'reference/faq' }],
	},
];

/** Page ids in reading order. */
export const NAV_ORDER = NAV.flatMap((g) => g.items.map((i) => i.slug));

/** Starlight sidebar config derived from NAV. */
export const SIDEBAR = NAV.map((g) => ({
	label: g.label,
	items: g.items.map(({ slug, label, badge }) =>
		slug === 'index' ? { label: label ?? 'Overview', link: '/' } : { slug, ...(label && { label }), ...(badge && { badge }) }
	),
}));
