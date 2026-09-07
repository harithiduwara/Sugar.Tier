# Architecture

## The shape of it

A marketing and enquiry site for a one-person cake studio. The constraints that decided everything
else:

- **No server, no running costs.** GitHub Pages serves static files. That rules out API routes,
  server actions, on-demand image optimisation and any form that POSTs somewhere.
- **The owner edits it, not a developer.** Content lives in three typed files, away from JSX.
- **Photography is the product.** Layout, aspect ratios and lead-time budgets are built around
  images that do not exist yet.

## Rendering

`next.config.ts` sets `output: "export"`, so `npm run build` writes a complete static bundle to
`out/`. Every route is prerendered at build time, including one page per cake via
`generateStaticParams`.

`trailingSlash: true` makes the export emit `cakes/index.html` rather than `cakes.html`, which is
the only shape GitHub Pages can resolve without rewrites.

`images.unoptimized: true` is required: the Next image optimiser needs a Node runtime. Images are
therefore committed at the size they are served, and `next/image` is used for the layout guarantees
(intrinsic sizing, `sizes`, lazy loading) rather than for resizing.

### Base path

A GitHub project page is served from `/<repo>/`. `basePath` is read from `NEXT_PUBLIC_BASE_PATH`,
which the deploy workflow fills in from `actions/configure-pages`. `next/link` and `next/image`
apply it automatically; anything hand-written (structured data, metadata) goes through
`assetPath()` in `lib/site.ts`.

## Content model

| File             | Holds                                                        |
| ---------------- | ------------------------------------------------------------ |
| `lib/site.ts`    | Business facts: contact, hours, service area, ordering rules |
| `lib/cakes.ts`   | The catalogue, plus selectors and price formatting           |
| `lib/content.ts` | Page copy: services, process steps, promises, FAQs, quotes   |

Everything downstream is derived from these. Adding a cake to `lib/cakes.ts` creates its page, its
sitemap entry, its structured data and its slot in the gallery filters — there is no second place
to register it. The catalogue tests enforce the invariants that keeps that safe: unique slugs,
images that exist on disk and parse, alt text that is not a filename, a consistent aspect ratio.

## Components

- `components/ui/` — primitives (`Button`, `ButtonLink`, `SectionHeading`, `Tag`, `Rule`, `Logo`).
- `components/layout/` — header and footer.
- `components/sections/` — page blocks, each one composed from `ui` and fed from `lib`.

Server components by default. Three components opt into the client:

| Component     | Why                                                        |
| ------------- | ---------------------------------------------------------- |
| `SiteHeader`  | Mobile menu state and active-route highlighting            |
| `CakeGallery` | Category filter held in the URL via `useSearchParams`      |
| `OrderForm`   | Field state, validation and composing the outgoing message |

Both `useSearchParams` consumers sit behind a `<Suspense>` boundary, which a static export
requires. The gallery's fallback is the unfiltered grid, so the page is useful before hydration.

## The order form

There is no backend, so "submit" means: validate, then compose a message and hand it to a channel
the studio already reads — WhatsApp, email or an Instagram DM. The visitor sees the exact text
before it is sent.

Validation lives in `lib/order-form.ts` as pure functions with an injectable clock, so the date
rules are testable without freezing time. The component only renders the result.

Errors block; lead-time and large-order notes warn without blocking, because "too soon" is a
conversation, not a rejection.

## Accessibility

Semantic landmarks, a skip link, labelled controls with `aria-describedby` wiring for errors,
`aria-current` on the active nav item, visible focus rings from a single `:focus-visible` rule, and
`prefers-reduced-motion` honoured globally. Cake cards are one link each rather than a card full of
links, so keyboard users get one stop per cake.

## SEO

Per-route metadata, an OG image per cake, a generated `sitemap.xml` and `robots.txt`, and
schema.org JSON-LD: `Bakery` site-wide, `Product` on each cake page, `FAQPage` on the FAQ. All of
it is derived from the same content modules, so it cannot drift from what is on the page.

## Testing

Vitest with jsdom and Testing Library, split between pure logic (`tests/lib/`) and rendered
behaviour (`tests/components/`). Tests assert what a visitor experiences — an error appears, a
filter narrows the grid, a link carries the right message — not implementation detail.

The one non-obvious test is the SVG parse check in `tests/lib/cakes.test.ts`: a bare `&` in a
generated label produces a file that fails silently in the browser, showing a broken image with no
error anywhere. That bug happened during the build; the test exists so it cannot happen again.
