# Bright Factory Framework docs

Self-service docs for the **Bright Factory Framework**, Microsoft's opinionated framework for building agentic software factories. Ideas come to life, agents do the heavy lifting, humans monitor and control.

The Markdown and MDX files in [`src/content/docs`](src/content/docs) are the source of truth. The site is built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build), styled after GitHub Universe, and published at **https://aiappsgbb.github.io/bff/**.

## Run it locally

Requires Node.js 22.23 or later.

```sh
npm install
npm run dev        # http://localhost:4321
npm run build      # static site in dist/
npm run preview    # serve dist/
```

## Where things live

| Path | What it holds |
| --- | --- |
| `src/content/docs/` | Every page, as Markdown or MDX. The folder structure is the URL structure. |
| `src/data/nav.mjs` | The sidebar and reading order. Every slug listed here must have a page. |
| `src/data/content.ts` | Narrative content reused by pages and components: pillars, principles, patterns, demo acts. |
| `src/data/site.ts` | Autonomy levels, dim-back-up triggers and product helpers. |
| `src/data/framework.json` | Layers, components, products and per-level stages, generated from the deck sources. |
| `src/components/` | Interactive visuals: factory hero, dimmer, big picture, self-assessment, playbook progress. |
| `src/assets/lego/` | Generated LEGO-style illustrations. |
| `src/styles/` | Theme tokens, fonts and shared component styles. See [DESIGN.md](DESIGN.md). |
| `src/pages/` | Agent-friendly endpoints: `/AGENTS.md`, `/llms-full.txt` and `/markdown/<page>.md`. |

## Writing pages

- Add the page under `src/content/docs/`, then add its slug to `src/data/nav.mjs`.
- Frontmatter: `title` and `description` are required. Optional extras are `eyebrow` (the code-style label above the title), `accent` (`green`, `blue`, `purple`, `pink`, `yellow`, `orange`), `hideTitle` and `wide`.
- Quote frontmatter values that contain `: `.
- Use Markdown links for internal pages (`[levels](/levels/)`); the base path is added at build time. In JSX, wrap internal URLs with `withBase()` from `src/data/site.ts`.
- Playbook steps are `##` headings followed by `<StepDone level="low" n={1} />`. Put UI and CLI instructions in `<Tabs syncKey="track">` so the reader's choice carries across pages.

## Update the framework data

`src/data/framework.json` is exported from the deck's Python sources so the deck and the docs stay consistent:

```sh
python <path-to-deck>/export_framework_data.py src/data/framework.json
```

## Deploy to GitHub Pages

The [deploy workflow](.github/workflows/deploy.yml) builds the site on every push to `main` (or on demand from the Actions tab) and publishes it with `actions/upload-pages-artifact` and `actions/deploy-pages`. Only the deploy job gets `pages: write` and `id-token: write`. **Settings → Pages → Source** must be set to **GitHub Actions**. The workflow sets:

| Variable | Purpose | Local default |
| --- | --- | --- |
| `SITE` | Site origin, for canonical and Open Graph URLs | `http://localhost:4321` |
| `BASE_PATH` | Path the site is served from, for example `/bff/` | `/` |
| `PUBLIC_REPO_URL` | Repository linked from the header and "Edit page" | `https://github.com/aiappsgbb/bff` |

To test a project-pages build locally:

```sh
BASE_PATH=/bff/ npm run build && npm run preview
```

## Licence

[MIT](LICENSE). Fonts: Mona Sans, under the SIL Open Font Licence (see `public/fonts/OFL.txt`).
