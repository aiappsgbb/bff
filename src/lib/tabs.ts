type Level = 'low' | 'medium' | 'high';
const LEVELS: Level[] = ['low', 'medium', 'high'];
export const LEVEL_KEY = 'bff-level';

export function storedLevel(): Level | null {
	const fromUrl = new URL(location.href).searchParams.get('level');
	if (fromUrl && LEVELS.includes(fromUrl as Level)) return fromUrl as Level;
	try {
		const s = localStorage.getItem(LEVEL_KEY);
		if (s && LEVELS.includes(s as Level)) return s as Level;
	} catch {}
	return null;
}

export function shareLevel(level: Level, source?: Element) {
	try {
		localStorage.setItem(LEVEL_KEY, level);
	} catch {}
	if (source) (source as HTMLElement).dataset.lastShared = level;
	window.dispatchEvent(new CustomEvent('bff:level', { detail: level }));
}

/**
 * WAI-ARIA tabs: click, arrow keys, Home/End. With `syncLevel`, tabs carrying `data-level`
 * follow the reader's chosen automation level across components.
 */
export function bindTabs(root: HTMLElement, { syncLevel = false } = {}) {
	const tabs = [...root.querySelectorAll<HTMLButtonElement>('[role="tab"]')];
	if (!tabs.length) return;
	const select = (tab: HTMLButtonElement, { focus = false, share = false } = {}) => {
		tabs.forEach((t) => {
			const on = t === tab;
			t.setAttribute('aria-selected', String(on));
			t.tabIndex = on ? 0 : -1;
			const panel = document.getElementById(t.getAttribute('aria-controls') ?? '');
			if (panel) panel.hidden = !on;
		});
		if (focus) tab.focus();
		root.dataset.selected = tab.dataset.level ?? tab.dataset.key ?? '';
		if (share && syncLevel && tab.dataset.level) shareLevel(tab.dataset.level as Level, root);
	};
	tabs.forEach((tab, i) => {
		tab.addEventListener('click', () => select(tab, { share: true }));
		tab.addEventListener('keydown', (e) => {
			const next =
				e.key === 'ArrowRight' || e.key === 'ArrowDown'
					? tabs[(i + 1) % tabs.length]
					: e.key === 'ArrowLeft' || e.key === 'ArrowUp'
						? tabs[(i - 1 + tabs.length) % tabs.length]
						: e.key === 'Home'
							? tabs[0]
							: e.key === 'End'
								? tabs[tabs.length - 1]
								: null;
			if (!next) return;
			e.preventDefault();
			select(next, { focus: true, share: true });
		});
	});
	if (syncLevel) {
		const byLevel = (l: string | null) => tabs.find((t) => t.dataset.level === l);
		const initial = byLevel(storedLevel());
		if (initial) select(initial);
		window.addEventListener('bff:level', (e) => {
			if (root.dataset.lastShared === (e as CustomEvent).detail) {
				delete root.dataset.lastShared;
				return;
			}
			const tab = byLevel((e as CustomEvent).detail);
			if (tab) select(tab);
		});
	}
}
