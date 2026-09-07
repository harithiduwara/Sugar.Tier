# Contributing

## Before you start

```bash
npm install
npm run dev
```

Node 20.9 or newer (`.nvmrc` pins the version CI uses).

## Making a change

1. Branch from `main`: `git switch -c content/spring-prices` or `feat/gift-vouchers`.
2. Make the change. Keep it to one concern per branch.
3. Add or update a test if you changed behaviour. Content-only edits are usually covered by the
   catalogue invariants in `tests/lib/cakes.test.ts` already.
4. Run the full gate:

   ```bash
   npm run verify
   ```

5. Open a pull request and fill in the template. CI runs the same checks on every push.

## Conventions

- **Content lives in `lib/`, never in a component.** A price, a phone number or a sentence of copy
  belongs in `lib/site.ts`, `lib/cakes.ts` or `lib/content.ts` so it can be changed in one place.
- **Server components by default.** Add `"use client"` only when a component needs state, an event
  handler or a browser API — currently the header, the gallery filters and the order form.
- **Types are strict.** `noUncheckedIndexedAccess` is on: an array lookup gives you `T | undefined`
  and you have to handle it.
- **Every image needs alt text** that describes the cake, not the file.
- **Tailwind, no ad-hoc CSS.** Colours come from the tokens in `app/globals.css`; if you need a new
  one, add it to `@theme` rather than inlining a hex value.
- **Commit messages** follow Conventional Commits: `feat:`, `fix:`, `content:`, `docs:`, `chore:`.

## Adding a cake

1. Add an entry to `cakes` in `lib/cakes.ts`. The type will tell you what is required.
2. Add its photograph to `public/images/cakes/` (portrait, 4:5) and point `image.src` at it.
3. `npm run test` — the catalogue tests check the slug is unique, the image exists and the alt text
   is real.

The route, the sitemap entry and the structured data are generated from that one entry.
