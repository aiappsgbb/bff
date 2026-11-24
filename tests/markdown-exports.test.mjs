import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { FACTORY_DRIVERS, OUTCOMES, PRINCIPLE_GROUPS, principleAnchor } from '../src/data/content.ts';
import { markdownResponse } from '../src/lib/markdown-response.ts';

// Run after `npm run build`; use the root reported by that build, including its base path.
const built = (path) => readFileSync(new URL(`../dist/${path}`, import.meta.url), 'utf8');
const full = built('llms-full.txt');
const root = /^<!-- (https?:\/\/[^\n]+)\/ -->/.exec(full)[1];

test('each principle is nested under its group and links to an existing heading', () => {
	const home = built('markdown/index.md');
	const headings = built('framework/principles/index.html');
	assert.ok(full.includes(home));
	for (const group of PRINCIPLE_GROUPS) {
		const rows = [`- **${group.title}.** ${group.text}`];
		for (const p of group.principles) {
			const id = principleAnchor(p.title);
			assert.ok(headings.includes(`id="${id}"`), id);
			rows.push(`  - [${p.title}](${root}/framework/principles/#${id}). ${p.short}`);
		}
		assert.ok(home.includes(rows.join('\n')), group.title);
	}
});

test('drivers include evidence and comma-separated sources; outcomes include their text', () => {
	const page = built('markdown/fundamentals.md');
	assert.ok(full.includes(page));
	for (const d of FACTORY_DRIVERS) {
		const sources = d.sources.map((s) => `[${s.name}](${s.url})`).join(', ');
		assert.ok(page.includes(`- **${d.title}.** ${d.text} *${d.evidence}* (${sources})`), d.title);
	}
	for (const o of OUTCOMES) assert.ok(page.includes(`- **${o.title}.** ${o.text}`), o.title);
});

test('code is allowed verbatim but cannot hide an expression elsewhere in the export', async () => {
	const examples = [
		'Inline: `{item}` and `` a `tick` and {item} ``.',
		'````yaml', 'value: ${{ inputs.level }}', '```', '{stillCode}', '````',
		'~~~md', '{example}', '~~~',
	].join('\n');
	assert.equal(await markdownResponse(examples, '/example.md').text(), examples);
	for (const raw of ['{item.title}', '{\nitem.title\n}', '`{valid}` then {item.title}']) {
		assert.throws(() => markdownResponse(`${examples}\n${raw}`, '/example.md'), /Unrendered expression in \/example\.md/);
	}
});
