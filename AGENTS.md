# Bright Factory Framework docs

Astro + Starlight docs site. Pages live in `src/content/docs/` (MDX); the sidebar is `src/data/nav.mjs`, and every slug there needs a page or the build fails.

- Validate with `npm run build`, and with `BASE_PATH=/bff/ npm run build` for link changes.
- Internal links: Markdown links get the base path automatically; JSX `href`s must use `withBase()` from `src/data/site.ts`.
- Styling follows `DESIGN.md`: use theme tokens for colour, type and radii; no side-tab or top accent bars.
- Content rules: say "Copilot cloud agent"; no invented statistics; label preview features; the playbooks are drafts.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
