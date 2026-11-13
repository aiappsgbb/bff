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
| `--bff-text-2xs` | 12px | Mono micro-labels (`dt`, gaits) |

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
| `--bff-green` `--bff-pink` `--bff-blue` `--bff-yellow` `--bff-purple` `--bff-orange` | Universe accents | | Eyebrow squares and the bar under page titles (one per section) |

The layer colours match the deck, so a diagram means the same thing in both.

`--bff-alert` (`#cf222e` / `#f85149`) marks incidents, such as the "dim back up" flash.

Scene tokens are drawn on top of the LEGO renders, so they don't change with the theme:

| Token | Value | Use |
| --- | --- | --- |
| `--bff-light-warm` | `#ffd866` | Bright HQ glow, "bright" end of the dimmer |
| `--bff-light-cool` / `--bff-light-core` | `#7cc4ff` / `#e8f6ff` | Agent eye LEDs |
| `--bff-light-violet` | `#8f7bff` | Glowing code blocks on the floor |
| `--bff-light-night` | `#0b1a3a` | "Lights-off" end of the dimmer |
| `--bff-brick-white` / `--bff-brick-shade` | `#f4f7f5` / `#c9d2cc` | LEGO plastic (dimmer knob, studs) |
| `--bff-step-paper` | `#e7eff8` | Page colour of the LEGO instruction-step SVGs (principles); frames behind them match it |
| `--bff-shadow-sm` / `--bff-shadow-lg` | ink at 35% / 40% | Floating labels and tooltips over imagery |

## Shape and spacing

- Radius: `--bff-radius` 16px (media frames, cards), `--bff-radius-md` 12px (tables, asides, panels), `--bff-radius-sm` 6px (buttons, chips), `--bff-radius-pill` (status pills, hotspots, dots, the dimmer track).
- Max width: `--bff-max` 80rem on splash pages; content column 46rem, or 72rem on wide pages.
- The blueprint grid (48px hairlines) appears only behind the page background. It fades out after the first viewport.

## Motion

- Easing: `--bff-ease-out` `cubic-bezier(.16,1,.3,1)` for entrances, `--bff-ease-soft` for state changes; 0.2–0.7s.
- Loops (conveyor, engineering loop) have a pause control. Everything respects `prefers-reduced-motion`.

## Imagery

- LEGO toy-photography renders (purple octocat characters = people, blue robots = agents, yellow ducks = quality) generated with GPT Image. Source images live in the deck repo under `deck/visuals/`.
- Diagrams are inline SVG, coloured with the layer tokens.
