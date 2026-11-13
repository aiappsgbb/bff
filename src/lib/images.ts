import type { ImageMetadata } from 'astro';

const stepFiles = import.meta.glob<{ default: ImageMetadata }>('../assets/steps/*.svg', { eager: true });

/** LEGO instruction-step SVGs for the eight principles, e.g. `STEPS.composable`. */
export const STEPS: Record<string, ImageMetadata> = Object.fromEntries(
	Object.entries(stepFiles).map(([path, mod]) => [path.split('/').pop()!.replace(/\.svg$/, ''), mod.default])
);

export const STEPS_ALT: Record<string, string> = {
	build_together: 'LEGO instruction step 1: a minifigure is placed on the green Factory HQ brick, beside a glowing lamp.',
	reversible: 'LEGO instruction step 2: a pink slider is fitted on a dimmer rail under three lamps; a double arrow shows it slides both ways.',
	glass: 'LEGO instruction step 3: a blue agent brick and a lamp inside a glass case, with a zoom callout on the agent’s face.',
	secure: 'LEGO instruction step 4: a blue agent brick wearing a white ID badge stands beside a grey gate; a yellow padlock drops onto the gate’s latch.',
	composable: 'LEGO instruction step 5: a purple brick is pulled out and a green brick drops into its slot; the blue and yellow bricks stay.',
	context: 'LEGO instruction step 6: a blue agent brick drops onto a plate beside printed context tiles: a document, a gear and notes.',
	multiplayer: 'LEGO instruction step 7: three minifigure sub-assemblies stand around one shared plate with a white agent stack.',
	measure: 'LEGO instruction step 8: an orange dashboard panel with bars and a dial drops onto the green Factory HQ brick beside a minifigure; a dashed line carries a signal from a blue agent brick on the floor.',
};

export const LEGO_ALT: Record<string, string> = {
	cover_factory: 'A LEGO software factory: a bright HQ on top, a factory floor with robots and foundations below.',
	factory_box: 'A LEGO set box of the Bright Factory.',
	glass: 'A LEGO factory floor behind glass walls, every robot visible at work.',
	multiplayer: 'Mona, Ducky and robots at their desks, connected to a shared cloud of agents.',
	partners: 'Three LEGO puzzle pieces, green, purple and white, fitting together.',
};
