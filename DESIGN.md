# Design system

The docs follow the look and feel of [GitHub Universe recap](https://github.com/events/universe/recap/): a light canvas, a hairline blueprint grid, Mona Sans, mono "code-like" eyebrows and a green primary. The dark theme mirrors the Primer Brand dark palette. Tokens live in `src/styles/theme.css`.

## Typography

| Role | Font | Notes |
| --- | --- | --- |
| Body, headings | Mona Sans (variable, self-hosted) | GitHub's brand typeface, SIL OFL 1.1 (`public/fonts/OFL.txt`). Headings use light weights (425–560) and `text-wrap: balance`. |
| Eyebrows, labels, tabs, code | Mona Sans Mono (variable, self-hosted) | Eyebrows are code-like slugs such as `levels.dimmer()`, 14px, muted. |

Type ramp (tokens in `theme.css`; use these, not literal sizes):

| Token | Size | Use |
| --- | --- | --- |
| `--bff-text-display` | clamp 44–88px | Home hero title only |
| `--sl-text-h1` … `--sl-text-h4` | 56 / 32 / 24 / 20px | Page and section headings |
| `--bff-text-lede` | clamp 20–28px | Page descriptions, hero subtitle |
| `--bff-text-xl` | 20px | Card titles, callout statements |
| `--bff-text-lg` | 18px | Lead paragraphs, readout taglines |
| `--bff-text-md` | 16px | Body |
| `--bff-text-sm` | 14px | Eyebrows, meta, readout values |
| `--bff-text-xs` | 13px | Captions, chips, hotspot labels |
| `--bff-text-2xs` | 12px | Mono micro-labels (`dt`, level labels). Nothing smaller. |
| `--bff-text-card-display` | clamp 36–72px (`21cqi`) | Big numerals inside cards; needs a `container-type: inline-size` parent |

## Colour

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `--sl-color-accent` | `#08872b` | `#0fbf3e` | Primary actions, links, focus |
| `--sl-color-accent-low` | `#ebf9f4` | `#0d3024` | Accent surfaces |
| `--sl-color-gray-3` | `#58635b` | `#a3ada6` | Muted text |
| `--sl-color-hairline` | `#e4ebe6` | `#1d241f` | Borders, grid |
| `--bff-surface` / `--bff-surface-2` | `#f6f8f7` / `#eef3f0` | `#0f1511` / `#151c17` | Cards, panels |
| `--bff-hq` | `#bc4c00` | `#f0883e` | Factory HQ (people) |
| `--bff-floor` | `#08872b` | `#5fed83` | Factory floor (agents) |
| `--bff-found` | `#0969da` | `#58a6ff` | Factory foundations |
| `--bff-eng` | `#8250df` | `#a371f7` | Factory engineering |
| `--bff-green` `--bff-pink` `--bff-blue` `--bff-yellow` `--bff-purple` `--bff-orange` | Universe accents | | Eyebrow squares and the bar under page titles (see [Eyebrow accents](#eyebrow-accents)) |
| `--bff-on-accent` | `#ffffff` | `#04130a` | Text and icons on a solid accent or ink fill |
| `--bff-grid-line` | ink at 5.5% | white at 4.5% | Blueprint grid hairlines behind the page |
| `--bff-vendor-github` / `-microsoft` / `-third` | `#08872b` / `#0969da` / `#6e7781` | `#5fed83` / `#58a6ff` / `#8b949e` | Vendor dots and filters in the big picture and product catalogue |
| `--bff-brick-hi` / `--bff-brick` / `--bff-brick-lo` | `#2da44e` / `#08872b` / `#066b22` | `#3fd365` / `#0fbf3e` / `#08872b` | The lit-brick logo faces |
| `--bff-brick-lit` / `--bff-brick-lit-lo` | `#ffd33d` / `#d4a72c` | `#ffd866` / `#d4a72c` | The logo's lit stud |

The layer colours match the deck, so a diagram means the same thing in both.

### Eyebrow accents

Set an eyebrow's colour with `data-accent` by subject, not by rotation:

| Accent | Subject |
| --- | --- |
| `orange` | People and governance (Factory HQ) |
| `green` | Agents (Factory floor); the default |
| `blue` | Platform (Factory foundations) |
| `purple` | The engineering loop only |
| Level colour | Level and playbook pages use their level: Low yellow, Medium green, High blue (`data-level-accent`) |

Pink is not an eyebrow colour.

### Accent vs accent ink

The accent and layer colours are tuned for fills, so several of them fail as text on the light canvas (blue 3.3:1, yellow 2.6:1). Each has a text-safe **ink** twin that reaches at least 4.5:1 on the canvas, both surfaces and a 14% tint of its own accent, in both themes:

| Ink token | Light | Dark |
| --- | --- | --- |
| `--bff-green-ink` / `--bff-floor-ink` | `#0d6731` / `#0d6731` | `#0fbf3e` / `#5fed83` |
| `--bff-blue-ink` / `--bff-found-ink` | `#0062c4` / `#0757c2` | `#3fa4ff` / `#58a6ff` |
| `--bff-purple-ink` / `--bff-eng-ink` | `#6e47bd` / `#7041cc` | `#ae85ff` / `#b18cff` |
| `--bff-orange-ink` / `--bff-hq-ink` | `#a84300` / `#a33f00` | `#f0883e` / `#f0883e` |
| `--bff-pink-ink` | `#c2185b` | `#ff5c93` |
| `--bff-yellow-ink` | `#7a6000` | `#e3c72a` |

Components read the colour through two custom properties, both set by `[data-accent]`, `[data-layer]` and `[data-level-accent]` in `components.css`:

- `--accent` is for fills, bars, borders, dots and icons.
- `--accent-ink` is for text: write `color: var(--accent-ink, var(--accent))`. When accent-coloured text sits on a solid fill (a badge or a knob), fill with the ink and use `--bff-on-accent` for the text.

To dim inactive text (scrollytelling steps, the bright vs dark column not in focus), use `--sl-color-gray-3`, never `opacity`. Gray-3 keeps 4.5:1; gray-4 is for borders and decoration only.

`--bff-alert` (`#cf222e` / `#f85149`) marks incidents, such as the "dim back up" flash.

Scene tokens are drawn on top of the LEGO renders, so they don't change with the theme:

| Token | Value | Use |
| --- | --- | --- |
| `--bff-light-warm` | `#ffd866` | Bright HQ glow, "bright" end of the dimmer |
| `--bff-light-cool` / `--bff-light-core` | `#7cc4ff` / `#e8f6ff` | Agent eye LEDs |
| `--bff-light-violet` | `#8f7bff` | Glowing code blocks on the floor |
| `--bff-light-night` | `#0b1a3a` | "Lights-off" end of the dimmer |
| `--bff-light-go` / `--bff-light-stop` | `#6dff8f` / `#ff5a4f` | Status lights, gauges, scope trace and alarms in the animated factory |
| `--bff-light-pink` | `#ff8fc8` | Sticky notes and context orbs in the animated factory |
| `--bff-brick-white` / `--bff-brick-shade` | `#f4f7f5` / `#c9d2cc` | LEGO plastic (dimmer knob, studs), and text on `--bff-alert` |
| `--bff-shadow-ink` | `#000000` | Base of every shadow, scroll shadow and darkened fill (`color-mix` with it) |
| `--bff-step-paper` | `#e7eff8` | Page colour of the LEGO instruction-step SVGs (principles); frames behind them match it |
| `--bff-shadow-sm` / `--bff-shadow-lg` | ink at 35% / 40% | Floating labels and tooltips over imagery |

## Level vocabulary

- The three autonomy levels are always **Low autonomy**, **Medium autonomy** and **High autonomy** (short form: Low, Medium, High) in navigation, headings, labels, chips, tables and the quiz.
- Crawl / Walk / Run appears only as the legend on `/levels/` and in the glossary. The lights metaphor (lights on, dimmed, lights-off) stays descriptive prose, never a level name, label or column header.
- In code, read labels from `LEVELS` in `src/data/site.ts`: `LEVELS[k].name` for the full name and `LEVELS[k].short` for the short form. `gait` is a deprecated alias of `short`.

## Shape and spacing

- Radius: `--bff-radius` 16px (media frames, cards), `--bff-radius-md` 12px (tables, asides, panels), `--bff-radius-sm` 6px (buttons, chips), `--bff-radius-pill` (status pills, hotspots, dots, the dimmer track).
- Tiny marks (accent squares, brick studs, minimap cells) use a 1–2px radius, deliberately below the scale; at that size a 6px radius turns them into dots.
- Max width: `--bff-max` 67.5rem (Starlight's splash width) on splash pages, set on `:root` so it doesn't depend on stylesheet order; content column 46rem, or 72rem on wide pages.
- The blueprint grid (48px hairlines) appears only behind the page background. It fades out after the first viewport.
- No side-tab or top accent bars. To mark a card, step or active item, tint its whole hairline border or surface with `color-mix`, or use the accent square.
- Layouts that must stack when text is enlarged use container queries in `rem` (for example `@container (max-width: 34rem)` on a `container-type: inline-size` parent), not viewport media queries. Viewport media queries don't respond to a larger root font size, so they keep side-by-side columns that no longer fit. Grids use `repeat(auto-fit, minmax(min(100%, Nrem), 1fr))` for the same reason; Starlight's `CardGrid` is overridden this way in `theme.css`.
- Tables scroll instead of overflowing. Markdown tables are `display: block` with `overflow-x: auto`, hug their content (`fit-content`) and keep the hairline frame; component tables sit in a `.bff-table-wrap`. Both show a scroll shadow at the edge that has more columns. A table that scrolls must be reachable by keyboard: a component wrap gets `role="region"`, a label and `tabindex="0"`, and the footer script adds `tabindex="0"` to markdown tables and other wraps only while they overflow.

## Layout and navigation

- Home hero: one column below `64em`. From `64em` it has two columns: the text column is capped at `25rem` and the factory scene fills the rest.
- Header: the primary nav shows inline when the header container (`bff-header`) is at least `76rem` wide. Narrower headers, including the home page's, show a **Menu** button with the links below. It is a container query, so the nav also collapses at larger text sizes.
- Active nav item (`aria-current`): text colour plus a subtle accent-tinted background. No side or top bars.

## Touch targets

- Every interactive element is at least 24px tall.
- A disabled button that must stay focusable (so its tooltip or reason can be read) uses `aria-disabled="true"`, not `disabled`, and handles the no-op in script. `.bff-btn:is(:disabled, [aria-disabled='true'])` gives both the same look.
- Under `@media (pointer: coarse)` buttons, tabs, chips, sidebar links, footer links, `summary` toggles and link rows grow to 44px (`2.75rem`). Fine pointers keep the compact desktop sizes. The shared rules are at the end of `components.css`; components with their own controls add the same media query.

## Motion

- Easing: `--bff-ease-out` `cubic-bezier(.16,1,.3,1)` for entrances, `--bff-ease-soft` for state changes; 0.2–0.7s. `--ease-click` `cubic-bezier(0.3,1.45,0.55,1)` is a small overshoot for bricks snapping into place; it is local to the animated factory (`FactoryScene.astro`).
- Keyframes animate only `transform` and `opacity`. Never animate `fill`, `stroke-dashoffset`, `offset-path` or `background-color`: crossfade pre-coloured layers instead, and animate grouped layers, not individual shapes.
- Loops (conveyor, engineering loop) have a pause control. They also pause offscreen (`data-pausable`), when the tab is hidden, and when their scrolly step is inactive. Hint animations (the nudges that invite a click or scroll) pause offscreen too. Everything respects `prefers-reduced-motion`.
- Scrolly: the active step is the last one whose top has passed the probe line (45% of the viewport, 62% below `62em`). This means jumps, reloads and the very bottom of the page still show the right frame. Inactive steps dim with `--sl-color-gray-3`, not opacity, and the active step's accent square fills.

## Imagery

- LEGO toy-photography renders (purple octocat characters = people, blue robots = agents, yellow ducks = quality) generated with GPT Image. Source images live in the deck repo under `deck/visuals/`.
- Light follows people. A factory floor with only robots, no purple cats or yellow ducks, runs lights-off: lamps off, lit only by the robots' screens and status lights. Any room with people or ducks in it stays bright, and the HQ is always bright.
- Diagrams are coloured with the layer tokens. Diagrams that carry text are HTML laid out with container queries, so rendered text stays at least 12px. They are not scaled SVG. Pure shapes can stay inline SVG.
- Workflow stations are neutral numbered markers. Floor green is reserved for the loop, signals and verified bricks.
- Brick stages: planned = dashed outline, built = grey, verified = floor green.

## Presentation mode

`/present/` is a standalone page (no Starlight chrome) that presents the framework as 17 slides for field teams, customers and partners. It reuses `src/data/` content, so the slides never drift from the docs. Code: `src/pages/present/index.astro`, `src/components/present/Room.astro`, `src/styles/present.css`; renders in `src/assets/present/`.

- One public deck. No speaker notes; every slide ends in a **Read the docs** link to the page it summarises.
- Visual first. One headline (at most two lines), one lede, one visual (chips, stations, steps or a control), never paragraphs. Body text stays at least 12px.
- The building is the map. The cover is the factory cross-section with the engineering wing; pins open each zone. Moving from the building to a room zooms into that room's spot on the building (WAAPI, transform and opacity only) and back out again. Other moves pan 3%. Reduced motion gets a 160ms fade.
- Rooms are LEGO renders in the same style as the building, transparent cutouts on a soft zone-coloured pool of light. Light follows people (see Imagery).
- Two audience controls, switchable mid-talk from the toolbar (an **Audience** popover below `44rem`):
  - **Style:** **Vectors** (default) or **Blocks**. Vectors are generated luminous line-art images in `src/assets/present/vec/` (transparent 1536×1024, rendered by `src/components/present/VectorArt.astro`): thin glowing strokes on a transparent ground, no fills, no text. People are amber discs, agents are green modules with one dot, and the palette is the zone colours plus slate. The building and dimmer were redrawn from their renders, so zone and bay overlays, pins and the zoom still line up. On light pages a CSS filter adds contrast. Blocks are the LEGO renders. Both styles are lazy-loaded, so each never downloads the other's images. Use Vectors for engineering leaders, Blocks when the analogy helps (executives, workshops).
  - **Level:** **L200** (default) or **L400**. L400 is the same slide with a deeper layer: `deepLede` plus the `deep` slot of `Room` replace the L200 lede and visual in place (`[data-tier]`). Deep content is specs and tables built from `src/data/`; product names are checked against the layer data at build time. L400 widens the copy column; slides marked `dense` take 62% and tighten on short stages so no slide ever scrolls.
  - State lives on `<html data-style data-tech>`. Precedence: URL (`?style=blocks&tech=l400`), then `localStorage` (`bff-present-style`, `bff-present-tech`), then the defaults. Non-default values stay in the URL, so a shared link opens in the same mode. Keys: **V** style, **L** level.
- Zone colour drives the chrome: the progress bar, the chapter square and the minimap use `--z` from `[data-zone]` (HQ orange, floor green, foundations blue, engineering purple).
- Landscape (`min-aspect-ratio: 5/4` and at least `48rem` wide) is a fixed 16:9 stage with `container-type: size`; type scales in `cqw` with rem floors. Portrait stacks art above copy and scrolls; the brand keeps only its logo below `30rem`.
- Controls: arrows, Page Up/Down, Home/End and Space (not inside form controls), **O** overview, **F** fullscreen, **T** theme, **V** style, **L** level; swipe on touch. The hash deep-links a slide (`/present/#dimmer`). Inactive slides are `inert`; a live region announces each slide.
- The cover pins stay 32px on touch screens instead of 44px: they overlay the art, and every destination is also one swipe or the Overview away.
- Without JavaScript, and in print (`@page` 1280×720), all slides render one after another.
- Entry points: **Present** in the header nav and menu, and **Present the framework** under the home hero CTAs.
