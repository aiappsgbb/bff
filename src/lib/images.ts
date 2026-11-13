import type { ImageMetadata } from 'astro';

const files = import.meta.glob<{ default: ImageMetadata }>('../assets/lego/*.png', { eager: true });

/** LEGO visuals keyed by file name without extension, e.g. `LEGO.composable`. */
export const LEGO: Record<string, ImageMetadata> = Object.fromEntries(
	Object.entries(files).map(([path, mod]) => [path.split('/').pop()!.replace(/\.png$/, ''), mod.default])
);

const stepFiles = import.meta.glob<{ default: ImageMetadata }>('../assets/steps/*.svg', { eager: true });

/** LEGO instruction-step SVGs for the six principles, e.g. `STEPS.composable`. */
export const STEPS: Record<string, ImageMetadata> = Object.fromEntries(
	Object.entries(stepFiles).map(([path, mod]) => [path.split('/').pop()!.replace(/\.svg$/, ''), mod.default])
);

export const STEPS_ALT: Record<string, string> = {
	build_together: 'LEGO instruction step 1: a minifigure is placed on the green Factory HQ brick, beside a glowing lamp.',
	composable: 'LEGO instruction step 2: a purple brick is pulled out and a green brick drops into its slot; the blue and yellow bricks stay.',
	context: 'LEGO instruction step 3: a blue agent brick drops onto a plate beside printed context tiles: a document, a gear and notes.',
	glass: 'LEGO instruction step 4: a blue agent brick and a lamp inside a glass case, with a zoom callout on the agent’s face.',
	reversible: 'LEGO instruction step 5: a pink slider is fitted on a dimmer rail under three lamps; a double arrow shows it slides both ways.',
	multiplayer: 'LEGO instruction step 6: three minifigure sub-assemblies stand around one shared plate with a white agent stack.',
};

export const LEGO_ALT: Record<string, string> = {
	blocks: 'LEGO bricks in green, white, purple and blue.',
	cover_factory: 'A LEGO software factory: a bright HQ on top, a factory floor with robots and foundations below.',
	factory_box: 'A LEGO set box of the Bright Factory.',
	glass: 'A LEGO factory floor behind glass walls, every robot visible at work.',
	journey: 'A LEGO path from a ball of yarn through four milestones to a glowing lantern.',
	line: 'A LEGO assembly line with four stations below a bright HQ.',
	multiplayer: 'Mona, Ducky and robots at their desks, connected to a shared cloud of agents.',
	next_steps: 'An open LEGO instruction booklet beside a factory module and sorted bricks.',
	partners: 'Three LEGO puzzle pieces, green, purple and white, fitting together.',
	playbook: 'Mona, Copilot and Ducky following a LEGO instruction booklet.',
};
