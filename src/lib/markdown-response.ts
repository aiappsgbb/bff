/** Mask literal examples, keeping offsets so map matches still point into the original source. */
export function markdownProse(markdown: string): string {
	const mask = (s: string) => ' '.repeat(s.length);
	let fence = '';
	const prose = markdown.replace(/^[^\r\n]+/gm, (line) => {
		const marker = /^(?: {0,3}> ?)* {0,3}(`{3,}|~{3,})(.*)$/.exec(line);
		if (fence) {
			if (marker?.[1].startsWith(fence) && !marker[2].trim()) fence = '';
			return mask(line);
		}
		if (!marker || (marker[1][0] === '`' && marker[2].includes('`'))) return line;
		fence = marker[1];
		return mask(line);
	});
	// Backtick runs must match in length; a code span can cross a line, but not a paragraph.
	return prose.split(/(\r?\n[ \t]*\r?\n)/).map((p) =>
		p.replace(/\\[\\`]|(?<!`)(`+)(?!`)[\s\S]*?(?<!`)\1(?!`)/g, mask)
	).join('');
}

export function markdownResponse(markdown: string, path: string, type = 'text/markdown'): Response {
	const expression = markdown.includes('{') && markdownProse(markdown).match(/\{[^{}]*\}/);
	if (expression) throw new Error(`Unrendered expression in ${path}: ${expression[0]}`);
	return new Response(markdown, { headers: { 'Content-Type': `${type}; charset=utf-8` } });
}
