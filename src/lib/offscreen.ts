// Looping visuals rest while off-screen: each [data-pausable] host gets [data-offscreen]
// when it leaves the viewport, which pauses every animation inside it (components.css).
// Modules run once per page, so importing this from several components is safe.
if ('IntersectionObserver' in window) {
	const io = new IntersectionObserver((entries) => {
		for (const e of entries) e.target.toggleAttribute('data-offscreen', !e.isIntersecting);
	});
	document.querySelectorAll('[data-pausable]').forEach((el) => io.observe(el));
}
