# Sugar & Tier

The website for [Sugar & Tier](https://www.instagram.com/sugar.tier/), a bespoke cake studio in
Colombo. It is a statically exported Next.js site, hosted free on GitHub Pages, with no server,
no database and nothing to keep running.

- **Live site:** https://harithiduwara.github.io/Sugar.Tier/ (after the first deployment — see below)
- **Stack:** Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 · Vitest

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

## Everyday commands

| Command              | What it does                                                 |
| -------------------- | ------------------------------------------------------------ |
| `npm run dev`        | Development server with hot reload                           |
| `npm run build`      | Static export into `out/`                                    |
| `npm run preview`    | Serve `out/` exactly as GitHub Pages will                    |
| `npm run test`       | Unit and component tests                                     |
| `npm run test:watch` | Tests in watch mode                                          |
| `npm run lint`       | ESLint (Next core-web-vitals + TypeScript rules)             |
| `npm run typecheck`  | `tsc --noEmit`                                               |
| `npm run format`     | Prettier, write mode                                         |
| `npm run images`     | Regenerate the placeholder cake illustrations                |
| `npm run verify`     | Everything CI runs, in one command — use this before pushing |

## The two things to change first

1. **Contact details.** `lib/site.ts` holds the email address and WhatsApp number, both marked
   `PLACEHOLDER`. Nothing else in the codebase hard-codes them.
2. **Photography.** The nine cakes ship with generated placeholder illustrations. Drop a real
   photo into `public/images/cakes/` and point the matching `image.src` in `lib/cakes.ts` at it.
   Shoot portrait at 4:5 — the grid is built around that ratio.

See [`docs/CONTENT.md`](docs/CONTENT.md) for the full editing guide, written for someone who does
not want to read the code.

## Deploying

Deployment is automatic: every push to `main` builds the site and publishes it to GitHub Pages.

One-time setup in the repository:

1. **Settings → Pages → Build and deployment → Source:** select **GitHub Actions**.
2. Push to `main`. The `Deploy to GitHub Pages` workflow builds and publishes.

The URL is handled for you. `actions/configure-pages` reports both the base path and the published
origin, and the build reads them through `NEXT_PUBLIC_BASE_PATH` and `NEXT_PUBLIC_SITE_URL` — so
the same code is correct at `harithiduwara.github.io/Sugar.Tier/`, under a different repository name, or
on a custom domain. For a custom domain, add it under Settings → Pages and put the domain in
`public/CNAME`; nothing in the code needs editing.

## Project layout

```
app/          Routes (App Router), metadata, sitemap and robots
components/   ui/ primitives · layout/ header and footer · sections/ page blocks
lib/          Typed content: business facts, catalogue, copy, form logic
public/       Static assets, including generated placeholder photography
scripts/      Placeholder image generator
tests/        Vitest unit and component tests
docs/         Architecture, content editing, and the development process
```

## Documentation

- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — how the site is put together and why
- [`docs/CONTENT.md`](docs/CONTENT.md) — editing cakes, prices, copy and photos
- [`docs/SDLC.md`](docs/SDLC.md) — branches, reviews, quality gates, releases
- [`CONTRIBUTING.md`](CONTRIBUTING.md) — how to make a change
