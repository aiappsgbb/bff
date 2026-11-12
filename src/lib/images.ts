import type { ImageMetadata } from 'astro';

const files = import.meta.glob<{ default: ImageMetadata }>('../assets/lego/*.png', { eager: true });

/** LEGO visuals keyed by file name without extension, e.g. `LEGO.composable`. */
export const LEGO: Record<string, ImageMetadata> = Object.fromEntries(
	Object.entries(files).map(([path, mod]) => [path.split('/').pop()!.replace(/\.png$/, ''), mod.default])
);

export const LEGO_ALT: Record<string, string> = {
	blocks: 'LEGO bricks in green, white, purple and blue.',
	build_together: 'Mona, Copilot and Ducky building a conveyor line together from LEGO bricks.',
	composable: 'A modular LEGO factory with a new module sliding into place beside the floors.',
	context: 'A LEGO library tower where Mona and robots read from shelves of context.',
	cover_factory: 'A LEGO software factory: a bright HQ on top, a factory floor with robots and foundations below.',
	factory_box: 'A LEGO set box of the Bright Factory.',
	glass: 'A LEGO factory floor behind glass walls, every robot visible at work.',
	journey: 'A LEGO path from a ball of yarn through four milestones to a glowing lantern.',
	line: 'A LEGO assembly line with four stations below a bright HQ.',
	multiplayer: 'Mona, Ducky and robots at their desks, connected to a shared cloud of agents.',
	next_steps: 'An open LEGO instruction booklet beside a factory module and sorted bricks.',
	partners: 'Three LEGO puzzle pieces, green, purple and white, fitting together.',
	playbook: 'Mona, Copilot and Ducky following a LEGO instruction booklet.',
	reversible: 'A LEGO dimmer switch with an up arrow and a traffic light, under a row of lamps.',
};
