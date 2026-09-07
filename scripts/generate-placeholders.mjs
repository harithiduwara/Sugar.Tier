/**
 * Generates the placeholder cake photography in `public/images/cakes/`.
 *
 * The studio's own photographs are not ready yet, so the site ships with
 * brand-coloured line illustrations at the exact aspect ratio the real photos
 * will use (4:5). Because they are generated rather than hand-drawn, the whole
 * set can be regenerated after a palette change with `npm run images`.
 *
 * Replacing one with a real photograph is a two-line change: drop the file in
 * `public/images/cakes/` and point `image.src` in `lib/cakes.ts` at it.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "images", "cakes");

const palette = {
  cream: "#fdf9f1",
  creamDeep: "#f1e6d3",
  gold: "#a6873f",
  goldLight: "#d8bd85",
  cocoa: "#3a2e23",
  cocoaSoft: "#7d6b59",
  rose: "#e8c5c0",
  chocolate: "#4e3f31",
};

/** Each entry mirrors a `slug` in lib/cakes.ts — tests assert the two agree. */
const subjects = [
  {
    slug: "ivory-cascade",
    label: "Ivory Cascade",
    tiers: 3,
    accent: palette.rose,
    motif: "florals",
  },
  {
    slug: "gilded-fondant-tier",
    label: "Gilded Tier",
    tiers: 2,
    accent: palette.goldLight,
    motif: "gold",
  },
  {
    slug: "midnight-ganache",
    label: "Midnight Ganache",
    tiers: 1,
    accent: palette.chocolate,
    motif: "drip",
  },
  {
    slug: "rose-pistachio",
    label: "Rose & Pistachio",
    tiers: 1,
    accent: palette.rose,
    motif: "florals",
  },
  {
    slug: "citrus-poppy",
    label: "Citrus & Poppy",
    tiers: 1,
    accent: palette.goldLight,
    motif: "peaks",
  },
  {
    slug: "hand-painted-bento",
    label: "Hand-Painted Bento",
    tiers: 1,
    accent: palette.rose,
    motif: "bento",
  },
  {
    slug: "vanilla-bean-minis",
    label: "Vanilla Bean Minis",
    tiers: 1,
    accent: palette.goldLight,
    motif: "minis",
  },
  {
    slug: "garden-dessert-table",
    label: "Garden Dessert Table",
    tiers: 2,
    accent: palette.rose,
    motif: "table",
  },
  {
    slug: "spiced-fruit-celebration",
    label: "Spiced Fruit",
    tiers: 1,
    accent: palette.chocolate,
    motif: "squares",
  },
];

/** SVG is XML: a bare `&` in a label ("Rose & Pistachio") makes the file unparseable. */
function escapeXml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const W = 1200;
const H = 1500;

function tierStack(tiers, accent) {
  // Widest tier at the bottom, each one narrower and shorter going up.
  const baseY = 1080;
  const parts = [];
  let y = baseY;

  for (let i = 0; i < tiers; i += 1) {
    const width = 620 - i * 150;
    const height = tiers === 1 ? 300 : 200 - i * 20;
    const x = (W - width) / 2;
    y -= height;

    parts.push(
      `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="14" fill="${palette.cream}" stroke="${palette.gold}" stroke-width="5"/>`,
    );
    // Piped border along the top edge of each tier.
    const dots = Math.floor(width / 40);
    for (let d = 0; d < dots; d += 1) {
      parts.push(
        `<circle cx="${x + 20 + d * 40}" cy="${y + 16}" r="9" fill="none" stroke="${accent}" stroke-width="4"/>`,
      );
    }
  }

  // Cake stand.
  parts.push(
    `<path d="M420 1080 H780 M600 1080 V1180 M470 1200 H730" fill="none" stroke="${palette.gold}" stroke-width="6" stroke-linecap="round"/>`,
  );
  return { markup: parts.join("\n    "), topY: y };
}

function motifMarkup(motif, topY, accent) {
  switch (motif) {
    case "florals":
      return [0, 1, 2]
        .map((i) => {
          const cx = 520 + i * 80;
          const cy = topY - 40 - (i % 2) * 30;
          const petals = [0, 60, 120, 180, 240, 300]
            .map(
              (deg) =>
                `<ellipse cx="${cx}" cy="${cy - 22}" rx="12" ry="24" fill="none" stroke="${accent}" stroke-width="4" transform="rotate(${deg} ${cx} ${cy})"/>`,
            )
            .join("");
          return `${petals}<circle cx="${cx}" cy="${cy}" r="8" fill="${palette.gold}"/>`;
        })
        .join("\n    ");
    case "gold":
      return `<path d="M480 ${topY - 30} q60 -50 120 0 t120 0" fill="none" stroke="${palette.gold}" stroke-width="7" stroke-linecap="round"/>
    <circle cx="600" cy="${topY - 80}" r="26" fill="none" stroke="${palette.gold}" stroke-width="6"/>`;
    case "drip":
      return `<path d="M340 ${topY + 30} q40 70 80 0 q40 70 80 0 q40 70 80 0 q40 70 80 0 q40 70 80 0 q40 70 80 0" fill="none" stroke="${palette.chocolate}" stroke-width="8" stroke-linecap="round"/>`;
    case "peaks":
      return `<path d="M420 ${topY} l45 -70 l45 70 l45 -85 l45 85 l45 -70 l45 70" fill="none" stroke="${palette.gold}" stroke-width="6" stroke-linejoin="round"/>`;
    case "bento":
      return `<rect x="360" y="${topY - 120}" width="480" height="90" rx="10" fill="none" stroke="${palette.gold}" stroke-width="5"/>
    <path d="M430 ${topY - 60} h340" stroke="${accent}" stroke-width="5" stroke-linecap="round"/>`;
    case "minis":
      return [0, 1, 2]
        .map(
          (i) =>
            `<rect x="${400 + i * 140}" y="${topY - 150}" width="100" height="110" rx="12" fill="none" stroke="${palette.gold}" stroke-width="5"/>`,
        )
        .join("\n    ");
    case "table":
      return `<path d="M300 1240 h600" stroke="${palette.gold}" stroke-width="8" stroke-linecap="round"/>
    <circle cx="380" cy="1200" r="34" fill="none" stroke="${accent}" stroke-width="5"/>
    <circle cx="830" cy="1200" r="34" fill="none" stroke="${accent}" stroke-width="5"/>`;
    case "squares":
      return [0, 1, 2, 3]
        .map(
          (i) =>
            `<rect x="${420 + (i % 2) * 190}" y="${topY - 210 + Math.floor(i / 2) * 90}" width="160" height="70" rx="8" fill="none" stroke="${palette.chocolate}" stroke-width="5"/>`,
        )
        .join("\n    ");
    default:
      return "";
  }
}

function svgFor({ label, tiers, accent, motif }) {
  const { markup, topY } = tierStack(tiers, accent);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${escapeXml(label)} — placeholder illustration">
  <defs>
    <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${palette.cream}"/>
      <stop offset="100%" stop-color="${palette.creamDeep}"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#ground)"/>
  <rect x="40" y="40" width="${W - 80}" height="${H - 80}" fill="none" stroke="${palette.goldLight}" stroke-width="3"/>
  <g>
    ${markup}
    ${motifMarkup(motif, topY, accent)}
  </g>
  <text x="${W / 2}" y="1330" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="58" fill="${palette.cocoa}">${escapeXml(label)}</text>
  <text x="${W / 2}" y="1390" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="26" letter-spacing="6" fill="${palette.cocoaSoft}">SUGAR &amp; TIER</text>
</svg>
`;
}

mkdirSync(outDir, { recursive: true });
for (const subject of subjects) {
  writeFileSync(join(outDir, `${subject.slug}.svg`), svgFor(subject), "utf8");
}
console.log(`Wrote ${subjects.length} placeholder images to public/images/cakes/`);
