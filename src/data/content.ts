// Narrative content shared by components and pages. Reused from the Bright Factory Framework deck.

export const PILLARS = [
	{
		key: 'github',
		accent: 'green',
		title: 'Built on GitHub',
		kicker: 'the factory floor',
		text: 'Where humans and agents plan, build, verify and observe together, in one continuous session, secure from the start.',
	},
	{
		key: 'microsoft',
		accent: 'blue',
		title: 'Better with Microsoft',
		kicker: 'from commit to customer',
		text: 'Agents grounded in real business context, with a cloud that runs, secures and learns from what ships.',
	},
	{
		key: 'open',
		accent: 'purple',
		title: 'Open by design',
		kicker: 'meet teams where they are',
		text: 'Any agent, editor, tracker or cloud, connected through open standards like MCP and Agent Skills.',
	},
] as const;

export const PRINCIPLES = [
	{
		key: 'bright-hq',
		image: 'build_together',
		accent: 'orange',
		title: 'Humans stay in control',
		short: 'The Factory HQ stays bright at every level.',
		text: 'People set intent, guardrails and SLOs, and approve the consequences. Agents do the heavy lifting. Accountability never moves to the floor.',
	},
	{
		key: 'composable',
		image: 'composable',
		accent: 'green',
		title: 'Composable by design',
		short: 'Every capability is a brick you can swap.',
		text: 'GitHub and Microsoft primitives by default, the tools you already use where they fit. Build the factory you need, one brick at a time, and change it without starting over.',
	},
	{
		key: 'context',
		image: 'context',
		accent: 'blue',
		title: 'Context-centric',
		short: 'Agents are only as good as their context.',
		text: 'Specs, skills, memory, business context and goals live in the foundations: versioned, governed and shared by people and agents. Every loop makes them stronger.',
	},
	{
		key: 'glass-floor',
		image: 'glass',
		accent: 'yellow',
		title: 'Not a black box',
		short: 'Lights-off never means unseen.',
		text: 'Every session, tool call, decision and cost is traced. Evidence travels with each change, so people can inspect the floor at any moment and approve with confidence.',
	},
	{
		key: 'reversible',
		image: 'reversible',
		accent: 'pink',
		title: 'A reversible dimmer',
		short: 'Dim the floor, and dim it back up in minutes.',
		text: 'Automation is set per work type and can be undone. When signals say so, approvals return to people and work continues from Git, so the business never stops.',
	},
	{
		key: 'multiplayer',
		image: 'multiplayer',
		accent: 'purple',
		title: 'From singleplayer to multiplayer',
		short: 'From one laptop to the whole organisation.',
		text: 'Start with one developer and their agents on a laptop. Move to shared cloud sessions the team can see and steer, then to fleets of agents at organisation scale.',
	},
] as const;

export const PATTERNS = [
	{
		title: 'Maintenance fleets',
		text: 'Triage, dependency bumps, framework upgrades, API deprecations, dead-code cleanup. The first thing every factory automates.',
		needs: 'Clear contracts and small, safe changes.',
	},
	{
		title: 'Review and verification agents',
		text: 'Automated code review, static analysis and visual validation on every pull request. Scales with generated volume, which human review does not.',
		needs: 'The same gates for humans and agents.',
	},
	{
		title: 'End-to-end feature PRs',
		text: 'Intent in, verified pull request out. Built and proven in a sandbox with the same tools and context an engineer has.',
		needs: 'A sandbox, full context and an evidence bundle.',
	},
	{
		title: 'Continuous learning loop',
		text: 'Agent skills run on every change, and their traces feed reviewed skill updates. The factory improves by observing itself.',
		needs: 'Traces, evals and human review of every update.',
	},
] as const;

export const INDUSTRY_PILLARS = [
	{ title: 'Surfaces', text: 'Work moves with people, on any device.' },
	{ title: 'Runtime', text: 'Safe, sandboxed, scoped execution.' },
	{ title: 'Agent network', text: 'Always on: events and schedules.' },
	{ title: 'Quality and security', text: 'Same gates for humans and agents.' },
	{ title: 'Intelligence', text: 'Shared context that compounds.' },
	{ title: 'Enterprise trust', text: 'Identity, policy, cost and audit.' },
] as const;

export const OUTCOMES = [
	{ title: 'Velocity', text: 'Agents implement and verify, in parallel.' },
	{ title: 'Intelligence', text: 'A learning engine improves every cycle.' },
	{ title: 'Quality', text: 'People set direction and stay accountable.' },
] as const;

export const JOURNEY = [
	{
		key: 'explore',
		title: 'Explore',
		kicker: 'Learn the primitives',
		text: 'A hands-on session with the products and the demos: the Copilot app, Copilot automations and the self-improvement loop.',
		href: '/get-started/demos/',
	},
	{
		key: 'assess',
		title: 'Assess',
		kicker: 'Find your level',
		text: 'Map your delivery line onto the big picture, find the automation level of each work type and pick the first one to move up.',
		href: '/get-started/find-your-level/',
	},
	{
		key: 'pilot',
		title: 'Pilot',
		kicker: 'One team, one level up',
		text: 'One team, one service, one level up, measured end to end, with evidence on every change.',
		href: '/playbooks/',
	},
	{
		key: 'scale',
		title: 'Scale',
		kicker: 'Work type by work type',
		text: 'Repeat per work type and move up the dimmer, directly or with a specialized partner who brings IP built on the framework.',
		href: '/get-started/partners/',
	},
] as const;

export const MULTIPLAYER = {
	modes: [
		{ key: 'single', level: 'low', title: 'Singleplayer', where: 'On a laptop' },
		{ key: 'multi', level: 'medium', title: 'Multiplayer', where: 'In the cloud, shared' },
		{ key: 'scale', level: 'high', title: 'Multiplayer at scale', where: 'Fleets, organisation-wide' },
	],
	rows: [
		{
			label: 'Where agents run',
			values: [
				'Locally, in the IDE, the Copilot CLI and the Copilot app',
				'In cloud sandboxes, with Copilot cloud agent',
				'Fleets in isolated sandboxes, behind the agent firewall',
			],
		},
		{
			label: 'Who sees the work',
			values: ['The developer at the keyboard', 'The whole team, in mission control and the Copilot app', 'The organisation, by work type, with a full audit trail'],
		},
		{
			label: 'How work starts',
			values: ['A developer prompts an agent', 'Issues, events, schedules and production signals', 'Goals, OKRs and signals, prioritised by agents'],
		},
		{
			label: 'How people steer',
			values: ['Accept each edit', 'Steer shared sessions and approve merges', 'Approve by exception, from any device'],
		},
		{
			label: 'Hand-offs',
			values: ['None: one seat, one session', 'Sessions continue across people and devices', 'Across teams, work types and time zones'],
		},
		{
			label: 'Governance',
			values: ['Repository rules and personal settings', 'Agent identities, budgets and metrics per team', 'Policy as code, an agent registry and evals per agent'],
		},
	],
} as const;

export const DEMO_ACTS = [
	{ stage: 'Plan', title: 'An idea on the commute', text: 'The product owner starts a Copilot project on GitHub Mobile. Skills ground it in business context and draft a cited spec.' },
	{ stage: 'Build', title: 'Agents build in the cloud', text: 'Parallel cloud sessions across three repositories, checked and steered from the phone.' },
	{ stage: 'Build', title: 'Same session, at the desk', text: 'The developer resumes the same session in the Copilot app, history intact, and guides the key design decision.' },
	{ stage: 'Verify', title: 'Cloud review, full evidence', text: 'Code review flags the risky diff, push protection stops a planted secret, Autofix and Foundry evals complete the evidence.' },
	{ stage: 'Verify', title: 'Approved in chat, shipped keyless', text: 'The service owner reviews the evidence and approves the deployment in Microsoft Teams or Slack. Actions deploys to Azure, canary first.' },
	{ stage: 'Observe', title: 'Production feeds the next idea', text: 'The Azure SRE Agent turns an injected fault into an issue and a fix PR. A Copilot automation proposes a skill update for a person to approve.' },
] as const;

export const DIM_BACK_UP_STEPS = [
	{ title: 'Detect', text: 'A trigger fires: an SLO breach, an eval regression, a cost spike, a security finding, an outage or a human call.' },
	{ title: 'Dim', text: 'One switch per work type. Approvals return to people, automations pause or open drafts, and agents keep helping in the HQ.' },
	{ title: 'Continue', text: 'Work carries on from the issues, pull requests and specs in Git, with the same gates and identities. Nothing is lost.' },
	{ title: 'Learn', text: 'The incident becomes an issue. Skills, evals and guardrails are updated, reviewed and versioned like code.' },
	{ title: 'Dim down again', text: 'When the new evidence holds, move the work type back down the dimmer, one level at a time.' },
] as const;
