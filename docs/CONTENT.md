# Editing the site

Written for the person who runs the studio. You do not need to understand the code — every change
below is one file, and GitHub can edit files in the browser (find the file, press the pencil icon,
edit, then "Commit changes").

Anything you commit to `main` is live in about two minutes.

## Contact details, hours, lead times

**File:** `lib/site.ts`

At the top you will find the email address, the WhatsApp number and the Instagram link. Two are
marked `PLACEHOLDER` and must be replaced before the site is shared:

```ts
email: "hello@sugarandtier.lk",   // PLACEHOLDER
whatsapp: "94770000000",          // PLACEHOLDER — no "+", no spaces
```

The WhatsApp number is written the way `wa.me` wants it: country code first, no plus sign, no
spaces. Sri Lankan mobile `077 123 4567` becomes `94771234567`.

Below that: opening hours, delivery area, minimum lead times and the deposit percentage. Change a
number here and it updates everywhere it is mentioned — the FAQ, the order page and the footer all
read from this one place.

## Cakes, prices and photos

**File:** `lib/cakes.ts`

Each cake is one block. To change a price, edit `priceFromLkr` — plain digits, no commas.

To add a cake, copy an existing block, change every field, and give it a `slug` nobody else uses
(lower case, words joined by hyphens). Its page, its place in the gallery and its listing in the
sitemap all appear automatically.

### Swapping in real photographs

The cakes currently show generated illustrations. To use a real photo:

1. Save it as a `.jpg` in `public/images/cakes/` — portrait, **4:5** (e.g. 1200 × 1500), under
   about 400 KB.
2. In `lib/cakes.ts`, change that cake's `src` to the new filename and set `width` / `height` to
   the real pixel size.
3. Update `alt` to describe what the photograph shows. This is what a blind visitor hears and what
   Google reads — "Three-tier ivory buttercream cake dressed with fresh flowers", not "cake1".

Do all nine and the placeholder generator can be deleted.

## Words on the page

**File:** `lib/content.ts`

- `services` — the four cards on the home page
- `orderSteps` — the "how it works" steps, used on three pages
- `promises` — the three claims on the dark band
- `testimonials` — customer quotes
- `faqs` — the FAQ page, which also feeds the FAQ data Google reads

## Prices and promises: a caution

The guide prices, lead times and testimonials that ship with the site are placeholders written to
show the design. Replace them with real ones before you announce the site — a quoted price that is
not yours is worse than no price.

## What not to edit

`app/`, `components/` and anything ending in `.tsx` are the site's machinery. If a change you want
is not covered above, open an issue instead — it is usually a five-minute job for whoever is
helping with the code.
