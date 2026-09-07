/**
 * Single source of truth for business facts.
 *
 * Everything the owner is likely to change without touching a component lives
 * here: contact handles, service area, opening hours, price disclaimers. Values
 * marked PLACEHOLDER are safe defaults that must be replaced before the site is
 * announced publicly — see docs/CONTENT.md.
 */

export type NavLink = {
  readonly href: string;
  readonly label: string;
};

export type SocialLink = NavLink & {
  readonly handle: string;
};

export const site = {
  name: "Sugar & Tier",
  legalName: "Sugar & Tier Cake Studio",
  tagline: "Bespoke cakes, baked to order in Colombo",
  description:
    "Sugar & Tier is a small-batch cake studio in Colombo making wedding tiers, celebration cakes and dessert tables to order. Every cake is designed with you, baked fresh and finished by hand.",
  /**
   * Canonical origin used for metadata, the sitemap and structured data.
   *
   * The deploy workflow passes the real published URL through
   * `NEXT_PUBLIC_SITE_URL`, so renaming the repository, moving it to another
   * account or attaching a custom domain needs no code change. The fallback is
   * the current GitHub Pages address.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://harithiduwara.github.io/Sugar.Tier",
  locale: "en_LK",
  city: "Colombo",
  country: "Sri Lanka",
  serviceArea: "Colombo and the surrounding suburbs, with delivery islandwide by arrangement",
  currency: "LKR",
  founded: "2026",
  /** PLACEHOLDER — swap for the studio's real mailbox before launch. */
  email: "hello@sugarandtier.lk",
  /** PLACEHOLDER — international format, digits only, no leading `+`. */
  whatsapp: "94770000000",
  instagram: {
    href: "https://www.instagram.com/sugar.tier/",
    label: "Instagram",
    handle: "@sugar.tier",
  },
  /** Orders are taken by conversation, not by checkout — this sets expectations. */
  ordering: {
    minimumLeadTimeDays: 7,
    weddingLeadTimeWeeks: 6,
    depositPercent: 50,
  },
  hours: [
    { days: "Tuesday – Friday", time: "9:00 – 18:00" },
    { days: "Saturday", time: "9:00 – 14:00" },
    { days: "Sunday – Monday", time: "Closed (collections by arrangement)" },
  ],
} as const;

export const primaryNav: readonly NavLink[] = [
  { href: "/cakes", label: "Cakes" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/order", label: "Order" },
];

export const socialLinks: readonly SocialLink[] = [
  { href: site.instagram.href, label: "Instagram", handle: site.instagram.handle },
];

/** `wa.me` deep link with a pre-filled opener, so a tap starts a real order chat. */
export function whatsappLink(message = "Hi Sugar & Tier! I'd love to talk about a cake."): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function mailtoLink(subject = "Cake enquiry"): string {
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;
}

/**
 * Prefixes a path in `public/` with the deployment base path.
 *
 * `next/link` and `next/image` apply `basePath` themselves; raw URLs in
 * metadata, manifests and structured data do not, so they go through here.
 */
export function assetPath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
