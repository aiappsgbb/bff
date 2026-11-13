// Narrative content shared by components and pages. Reused from the Bright Factory Framework deck.

export const PILLARS = [
	{
		key: 'github',
		accent: 'green',
		title: 'Built on GitHub',
		kicker: 'one platform, humans and agents',
		text: 'Where humans and agents plan, build, verify and observe together, in one continuous session, secure from the start.',
	},
	{
		key: 'microsoft',
		accent: 'blue',
		title: 'Better with Microsoft',
		kicker: 'context, cloud and control',
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

/** Eight principles in four pairs. Order and numbering match the LEGO steps and the deck. */
export const PRINCIPLES = [
	{
		key: 'bright-hq',
		group: 'steer',
		image: 'build_together',
		accent: 'orange',
		title: 'Humans stay in control',
		short: 'The Factory HQ stays bright at every level.',
		text: 'People set intent, guardrails and SLOs, and approve the consequences. Agents do the heavy lifting. Accountability never moves to the floor.',
	},
	{
		key: 'reversible',
		group: 'steer',
		image: 'reversible',
		accent: 'pink',
		title: 'A reversible dimmer',
		short: 'Dim the floor, and dim it back up in minutes.',
		text: 'Autonomy is set per work type and can be undone. When signals say so, approvals return to people and work continues from Git, so the business never stops.',
	},
	{
		key: 'glass-floor',
		group: 'trust',
		image: 'glass',
		accent: 'yellow',
		title: 'Not a black box',
		short: 'Lights-off never means unseen.',
		text: 'Every session, tool call, decision and cost is traced. Evidence travels with each change, so people can inspect the floor at any moment and approve with confidence.',
	},
	{
		key: 'secure',
		group: 'trust',
		image: 'secure',
		accent: 'yellow',
		title: 'Secure by default',
		short: 'Every agent has its own identity and only the access it needs.',
		text: 'Every agent works under its own identity, with least privilege, scoped secrets and firewall rules. Every change is checked, and every action traces back to an agent and the person accountable for it.',
	},
	{
		key: 'composable',
		group: 'build',
		image: 'composable',
		accent: 'green',
		title: 'Composable by design',
		short: 'Every capability is a brick you can swap.',
		text: 'GitHub and Microsoft primitives by default, the tools you already use where they fit. Build the factory you need, one brick at a time, and change it without starting over.',
	},
	{
		key: 'context',
		group: 'build',
		image: 'context',
		accent: 'blue',
		title: 'Context-centric',
		short: 'Agents are only as good as their context.',
		text: 'Specs, skills, memory, business context and goals live in the foundations: versioned, governed and shared by people and agents. Every loop makes them stronger.',
	},
	{
		key: 'multiplayer',
		group: 'grow',
		image: 'multiplayer',
		accent: 'purple',
		title: 'From singleplayer to multiplayer',
		short: 'From one laptop to the whole organisation.',
		text: 'Start with one developer and their agents on a laptop. Move to shared cloud sessions the team can see and steer, then to fleets of agents at organisation scale.',
	},
	{
		key: 'measured',
		group: 'grow',
		image: 'measure',
		accent: 'orange',
		title: 'Measured, not guessed',
		short: 'The HQ measures the factory. Engineering improves it.',
		text: 'DORA shows how well the factory delivers. SPACE shows how it works for the people in it. The HQ tracks both per service and work type as the floor dims, and the engineering loop turns the weakest signal into its next improvement.',
	},
] as const;

/** Anchor of a principle on /framework/principles/, matching Starlight's heading slugs. */
export const principleAnchor = (title: string) =>
	title.toLowerCase().replace(/[^a-z0-9 -]/g, '').replace(/ /g, '-');

export const PRINCIPLE_GROUPS = [
	{ key: 'steer', accent: 'orange', title: 'Steer', text: 'People set direction, and the dimmer goes both ways.' },
	{ key: 'trust', accent: 'yellow', title: 'Trust', text: 'Every agent is visible, and every agent is contained.' },
	{ key: 'build', accent: 'green', title: 'Build', text: 'Swappable bricks on shared context.' },
	{ key: 'grow', accent: 'purple', title: 'Grow', text: 'From one laptop to the organisation, guided by evidence.' },
].map((g) => ({ ...g, principles: PRINCIPLES.filter((p) => p.group === g.key) }));

/** Measuring progress: DORA for delivery, SPACE for people. Definitions follow dora.dev and the SPACE paper. */
export const MEASURE = {
	dora: [
		{
			key: 'lead',
			name: 'Change lead time',
			group: 'Throughput',
			means: 'Time from a commit to that change running in production.',
			factory: 'Agents shrink coding time. If lead time doesn’t fall, the wait has moved to review, CI or deployment.',
		},
		{
			key: 'freq',
			name: 'Deployment frequency',
			group: 'Throughput',
			means: 'How often changes reach production.',
			factory: 'Agent pull requests count when they ship, not when they open. Keep the batches small.',
		},
		{
			key: 'recovery',
			name: 'Failed deployment recovery time',
			group: 'Throughput',
			means: 'Time to recover from a deployment that needs immediate intervention.',
			factory: 'Includes how fast a work type can dim back up, with work continuing from Git.',
		},
		{
			key: 'cfr',
			name: 'Change fail rate',
			group: 'Instability',
			means: 'Share of deployments that need immediate intervention, such as a rollback or hotfix.',
			factory: 'Split it by work type and by author, agent or person. It’s the evidence for moving a level up or down.',
		},
		{
			key: 'rework',
			name: 'Deployment rework rate',
			group: 'Instability',
			means: 'Share of deployments that are unplanned, made to fix an incident in production.',
			factory: 'Rising rework means agents ship faster than the gates can verify.',
		},
	],
	space: [
		{
			key: 'satisfaction',
			letter: 'S',
			name: 'Satisfaction and well-being',
			means: 'How fulfilled and healthy people are with their work, tools and team.',
			factory: 'Short pulse surveys for developers, reviewers and approvers. Is toil going down? Is review fatigue going up?',
		},
		{
			key: 'performance',
			letter: 'P',
			name: 'Performance',
			means: 'The outcome of the system, not the output of a person.',
			factory: 'SLOs, change fail rate, eval scores and customer impact.',
		},
		{
			key: 'activity',
			letter: 'A',
			name: 'Activity',
			means: 'Counts of actions and outputs.',
			factory: 'Pull requests, sessions and deployments. Context for the other signals, never a target.',
		},
		{
			key: 'collaboration',
			letter: 'C',
			name: 'Communication and collaboration',
			means: 'How people and teams share work and knowledge.',
			factory: 'Review wait, hand-offs between people and agents, and sessions that others steer or continue.',
		},
		{
			key: 'efficiency',
			letter: 'E',
			name: 'Efficiency and flow',
			means: 'Getting work done with few interruptions and delays.',
			factory: 'Cycle time, flow efficiency, work in progress and the queue of agent pull requests waiting for review.',
		},
	],
	levels: {
		low: {
			question: 'Do agents help our developers?',
			dora: ['lead', 'freq', 'recovery', 'cfr', 'rework'],
			space: ['satisfaction', 'efficiency'],
			doraNote: 'Baseline all five per service before agents change how the work is done.',
			spaceNote: 'Satisfaction and flow for developers working with agents in the IDE, CLI and Copilot app.',
			signals: 'Copilot usage metrics, read as context for adoption, never as a target.',
			move: 'Instructions, golden environments and a CI the team trusts.',
		},
		medium: {
			question: 'Does agent work flow safely through the line?',
			dora: ['lead', 'cfr', 'rework'],
			space: ['collaboration', 'efficiency'],
			doraNote: 'Lead time, change fail rate and rework per work type, with agent-authored changes shown next to the baseline.',
			spaceNote: 'Review wait, hand-offs between people and agents, and how smoothly agent work flows.',
			signals: 'Merge rate of agent pull requests, rework after review and how complete each evidence bundle is.',
			move: 'Smaller tasks, automated review and approval by risk.',
		},
		high: {
			question: 'Does the factory deliver outcomes at scale, inside its guardrails?',
			dora: ['freq', 'recovery', 'cfr'],
			space: ['performance', 'satisfaction'],
			doraNote: 'Deployment frequency, recovery and change fail rate per service and work type, as fleets ship more often. Recovery includes dimming back up.',
			spaceNote: 'Outcomes, and the well-being of the people who approve by exception.',
			signals: 'Eval scores per agent, cost per merged change and how often a work type dims back up.',
			move: 'Policy as code, evals for every agent and skills learned from traces.',
		},
	},
	moves: [
		{
			signal: 'Agent pull requests wait for review',
			move: 'Tune trust and control',
			layer: 'hq',
			how: 'Approval by risk, automated review and an evidence bundle on every pull request.',
		},
		{
			signal: 'Lead time stalls in CI or deployment',
			move: 'Expand automation',
			layer: 'floor',
			how: 'Faster pipelines, ephemeral environments and progressive delivery.',
		},
		{
			signal: 'Agent rework or eval scores regress',
			move: 'Strengthen foundations',
			layer: 'foundations',
			how: 'Sharper specs, skills and context. Turn recurring review comments into instructions.',
		},
		{
			signal: 'Change fail rate rises for a work type',
			move: 'Dim it back up',
			layer: 'hq',
			how: 'Return approvals to people for that work type until the signal recovers.',
		},
		{
			signal: 'Surveys show review fatigue',
			move: 'Shrink the batch',
			layer: 'floor',
			how: 'Smaller tasks and work-in-progress limits on agent pull requests.',
		},
	],
} as const;

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
		text: 'Map your delivery line onto the big picture, find the autonomy level of each work type and pick the first one to move up.',
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
	{ stage: 'Verify', title: 'Cloud review, full evidence', text: 'Code review flags the risky diff, push protection stops a planted secret, Autofix completes the evidence.' },
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
