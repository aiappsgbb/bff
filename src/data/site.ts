import framework from './framework.json';

export type Vendor = 'github' | 'microsoft' | 'third-party';
export type LevelKey = 'low' | 'medium' | 'high';

export interface Product {
	name: string;
	vendor: Vendor;
	new: boolean;
	parts: string[];
}

export const data = framework as unknown as {
	layers: Record<'hq' | 'floor' | 'foundations', {
		key: string;
		label: string;
		tag: string;
		components: { name: string; items: string[]; stages: string | null; products: Product[] }[];
	}>;
	workflow: { name: string; task: string; products: Product[] }[];
	loop: { step: string; detail: string }[];
	levels: Record<LevelKey, {
		stages: {
			name: string;
			task: string;
			products: Product[];
			hq: { in: string; out: string; cards: { name: string; products: Product[] }[] };
			foundations: { in: string; out: string; cards: { name: string; products: Product[] }[] };
		}[];
		engineering: { step: string; tasks: string[] }[];
		primitives: Record<'hq' | 'floor' | 'found', { name: string; vendor: Vendor; new: boolean; card: string; stages: string; role: string }[]>;
	}>;
	products: Record<string, { url: string; role: string }>;
};

export const VENDOR_LABEL: Record<Vendor, string> = {
	github: 'GitHub',
	microsoft: 'Microsoft',
	'third-party': 'Third-party',
};

export const LAYER_META = {
	hq: { label: 'Factory HQ', short: 'HQ', color: 'var(--bff-hq)', who: 'People' },
	floor: { label: 'Factory floor', short: 'Floor', color: 'var(--bff-floor)', who: 'Agents' },
	foundations: { label: 'Factory foundations', short: 'Foundations', color: 'var(--bff-found)', who: 'Platform' },
} as const;

export const LEVELS: Record<LevelKey, {
	key: LevelKey;
	name: string;
	gait: string;
	tagline: string;
	floor: string;
	people: string;
	agents: string;
	approvals: string;
	mode: string;
	modeDetail: string;
	readyWhen: string;
	demo: string;
}> = {
	low: {
		key: 'low',
		name: 'Low automation',
		gait: 'Crawl',
		tagline: 'Humans drive every step, agents assist.',
		floor: 'Lights on',
		people: 'Drive every step and accept each edit',
		agents: 'Assist in the IDE, CLI and Copilot app',
		approvals: 'Every change, by a person',
		mode: 'Singleplayer',
		modeDetail: 'One developer and their agents, on a laptop.',
		readyWhen: "Gates run on every change and teams trust the agents' suggestions.",
		demo: 'A developer-driven session: Copilot projects, the Copilot app, Copilot Fusion and Copilot code review.',
	},
	medium: {
		key: 'medium',
		name: 'Medium automation',
		gait: 'Walk',
		tagline: 'Agents do the work, people approve.',
		floor: 'Dimmed',
		people: 'Set priorities, steer sessions, approve merges',
		agents: 'Draft specs, build in parallel, review and fix',
		approvals: 'By risk: people approve the merge',
		mode: 'Multiplayer',
		modeDetail: 'Shared cloud sessions and automations the whole team can see and steer.',
		readyWhen: 'Evidence on each change is enough to approve without reading every diff.',
		demo: 'Copilot automations, mission control with Copilot cloud agent, agentic workflows and the Azure SRE Agent.',
	},
	high: {
		key: 'high',
		name: 'High automation',
		gait: 'Run',
		tagline: 'The floor runs lights-off, the HQ stays bright.',
		floor: 'Lights-off',
		people: 'Set goals, guardrails and SLOs; decide exceptions',
		agents: 'Fleets plan, build, verify, release and fix',
		approvals: 'By exception, backed by evidence',
		mode: 'Multiplayer at scale',
		modeDetail: 'Fleets of agents per work type, org-wide, steered from any device.',
		readyWhen: 'Keep tuning: each work type, measured end to end, with approval by exception.',
		demo: 'Session continuity from phone to the Copilot app, GHAS with Autofix, Foundry evals and an approval in Microsoft Teams.',
	},
};

export const LEVEL_ORDER: LevelKey[] = ['low', 'medium', 'high'];

/** Triggers that dim a work type back up (reversible dimmer, business continuity). */
export const DIM_BACK_UP_TRIGGERS = [
	{ name: 'SLO breach', detail: 'Error budget burn or latency regression in production.' },
	{ name: 'Eval regression', detail: 'An agent or model scores below its quality bar.' },
	{ name: 'Cost spike', detail: 'Spend goes over the budget for the work type.' },
	{ name: 'Security incident', detail: 'A finding, leaked secret or suspicious agent action.' },
	{ name: 'Provider outage', detail: 'A model, tool or cloud dependency is unavailable.' },
	{ name: 'Human call', detail: 'Anyone with the role can dim back up. No justification needed first.' },
];

export function productUrl(name: string): string | undefined {
	return data.products[name]?.url;
}

export function productRole(name: string): string | undefined {
	return data.products[name]?.role;
}

/** Prefix a root-relative path with the configured base. */
export function withBase(path: string): string {
	const base = import.meta.env.BASE_URL.replace(/\/$/, '');
	if (!path.startsWith('/')) return path;
	return `${base}${path}`;
}

export interface ProductEntry {
	name: string;
	vendor: Vendor;
	new: boolean;
	url?: string;
	role?: string;
	layers: ('hq' | 'floor' | 'foundations')[];
	components: string[];
	levels: LevelKey[];
}

/** Every product in the framework, with its vendor and where it appears. */
export function productIndex(): ProductEntry[] {
	const map = new Map<string, ProductEntry>();
	const touch = (p: Product) =>
		p.parts.map((part) => {
			let e = map.get(part);
			if (!e) {
				e = { name: part, vendor: p.vendor, new: p.new, url: productUrl(part), role: productRole(part), layers: [], components: [], levels: [] };
				map.set(part, e);
			}
			return e;
		});
	const add = <T>(arr: T[], v: T) => !arr.includes(v) && arr.push(v);
	for (const k of ['hq', 'floor', 'foundations'] as const)
		for (const c of data.layers[k].components)
			for (const p of c.products)
				touch(p).forEach((e) => {
					add(e.layers, k);
					add(e.components, c.name);
				});
	for (const lvl of LEVEL_ORDER) {
		const L = data.levels[lvl];
		const all = [
			...L.stages.flatMap((s) => [...s.products, ...s.hq.cards.flatMap((c) => c.products), ...s.foundations.cards.flatMap((c) => c.products)]),
		];
		all.forEach((p) => touch(p).forEach((e) => add(e.levels, lvl)));
		for (const [lk, layer] of [['hq', 'hq'], ['floor', 'floor'], ['found', 'foundations']] as const)
			for (const p of L.primitives[lk])
				touch({ name: p.name, vendor: p.vendor, new: p.new, parts: [p.name] }).forEach((e) => {
					add(e.levels, lvl);
					add(e.layers, layer);
				});
	}
	for (const name of Object.keys(data.products))
		if (!map.has(name)) map.set(name, { name, vendor: 'microsoft', new: false, url: productUrl(name), role: productRole(name), layers: [], components: [], levels: [] });
	return [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
}
