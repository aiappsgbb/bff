# Bright Factory Framework

This repo holds the docs for the Bright Factory Framework, Microsoft's opinionated framework for building agentic software factories. Ideas come to life, agents do the heavy lifting, humans monitor and control. The docs are published at <https://aiappsgbb.github.io/bff/>.

## Helping someone build a software factory

Most people open this repo to plan or build their own factory, not to edit the site. Unless they ask to change the docs, treat the docs as your reference and do the work in their repositories.

- **Where the content is.** Pages are Markdown (MDX) in `src/content/docs/`; folders match the URLs. The reading order is in `src/data/nav.mjs`: fundamentals, the framework, autonomy levels, playbooks, build your factory, reference.
- **Terms.** Use the framework's terms as defined in `src/content/docs/reference/glossary.mdx`: factory HQ, factory floor, factory foundations, work type, dimmer, autonomy level, dim back up, evidence bundle.
- **Self-assessment.** The eight questions and their answers are in `src/components/SelfAssessment.astro`; scoring is in `src/content/docs/get-started/find-your-level.mdx`. Assess one work type at a time and ask one question at a time.
- **Levels.** Low (Crawl), Medium (Walk) and High (Run) autonomy are in `src/content/docs/levels/`. Layers, components, products and per-level stages are in `src/data/framework.json` and `src/data/site.ts`.
- **Playbooks.** `src/content/docs/playbooks/` are drafts. Steps marked *Coming soon* have no instructions yet: say so, and use current official GitHub and Microsoft documentation instead.
- **Citing.** Link to the published page (`https://aiappsgbb.github.io/bff/<path>/`) rather than the source file.
- **Accuracy.** Some capabilities are in preview; check availability for the user's plan and region before recommending them. Don't invent statistics. Say "Copilot cloud agent".
- **Humans in control.** Propose changes as pull requests through the same gates people use, and don't raise a work type's autonomy level without the user's agreement.

## Changing the docs site

Only when asked to edit this site. It's Astro + Starlight; the sidebar is `src/data/nav.mjs`, and every slug there needs a page or the build fails.

- Run with `npm install` and `astro dev --background` (manage it with `astro dev stop`, `status` and `logs`).
- Validate with `npm run build`, and with `BASE_PATH=/bff/ npm run build` for link changes.
- Internal links: Markdown links get the base path automatically; JSX `href`s must use `withBase()` from `src/data/site.ts`.
- Styling follows `DESIGN.md`: use theme tokens for colour, type and radii; no side-tab or top accent bars.
- `src/data/framework.json` is exported from the deck's sources (not in this repo) so the deck and docs stay consistent; don't edit it by hand.
- Content rules: say "Copilot cloud agent"; no invented statistics; label preview features; the playbooks are drafts.
- Pushing to `main` publishes the site with `.github/workflows/deploy.yml`.
- Astro docs: <https://docs.astro.build>
