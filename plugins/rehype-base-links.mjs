// Prefixes root-relative links and images in Markdown with the site base,
// so content can use "/levels/low/" and still work under a GitHub Pages sub-path.
export default function rehypeBaseLinks({ base = '/' } = {}) {
	const prefix = base.replace(/\/$/, '');
	const fix = (value) =>
		typeof value === 'string' && value.startsWith('/') && !value.startsWith('//') && prefix && !value.startsWith(`${prefix}/`)
			? `${prefix}${value}`
			: value;
	const walk = (node) => {
		if (node.type === 'element' && node.properties) {
			if (node.tagName === 'a') node.properties.href = fix(node.properties.href);
			if (node.tagName === 'img') node.properties.src = fix(node.properties.src);
		}
		if (node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement') {
			for (const attr of node.attributes ?? []) {
				if (attr.type === 'mdxJsxAttribute' && ['href', 'link'].includes(attr.name)) attr.value = fix(attr.value);
			}
		}
		node.children?.forEach(walk);
	};
	return (tree) => walk(tree);
}
