import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  CAKE_CATEGORIES,
  cakes,
  categoryBlurbs,
  categoryLabels,
  formatLkr,
  getCakeBySlug,
  getCakesByCategory,
  getFeaturedCakes,
  getPopulatedCategories,
} from "@/lib/cakes";

const publicDir = join(process.cwd(), "public");

describe("catalogue integrity", () => {
  it("ships the nine designs the studio advertises", () => {
    expect(cakes).toHaveLength(9);
  });

  it("has a unique, URL-safe slug for every cake", () => {
    const slugs = cakes.map((cake) => cake.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) {
      expect(slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    }
  });

  it("uses only known categories, and labels every one of them", () => {
    for (const cake of cakes) {
      expect(CAKE_CATEGORIES).toContain(cake.category);
    }
    for (const category of CAKE_CATEGORIES) {
      expect(categoryLabels[category]).toBeTruthy();
      expect(categoryBlurbs[category]).toBeTruthy();
    }
  });

  it("quotes a positive guide price and a lead time for every cake", () => {
    for (const cake of cakes) {
      expect(cake.priceFromLkr).toBeGreaterThan(0);
      expect(cake.leadTimeDays).toBeGreaterThan(0);
      expect(cake.servings.trim()).not.toBe("");
    }
  });

  it("gives every image descriptive alt text rather than a filename", () => {
    for (const cake of cakes) {
      expect(cake.image.alt.length).toBeGreaterThan(15);
      expect(cake.image.alt).not.toContain(".svg");
    }
  });

  it("points every cake at an image that exists and parses as XML", () => {
    for (const cake of cakes) {
      // `src` carries the deployment base path; strip it to reach the file.
      const relative = cake.image.src.replace(process.env.NEXT_PUBLIC_BASE_PATH ?? "", "");
      const file = join(publicDir, relative);
      expect(existsSync(file), `missing image for ${cake.slug}: ${file}`).toBe(true);

      // A stray `&` in a generated label silently breaks the whole SVG, so the
      // rendered markup is checked rather than assumed.
      const markup = readFileSync(file, "utf8");
      expect(markup).toMatch(/^<svg[\s\S]+<\/svg>\s*$/);
      expect(markup.replace(/&(amp|lt|gt|quot|apos|#\d+);/g, "")).not.toContain("&");
    }
  });

  it("declares matching image dimensions so the grid cannot shift", () => {
    for (const cake of cakes) {
      expect(cake.image.width / cake.image.height).toBeCloseTo(0.8, 5);
    }
  });
});

describe("selectors", () => {
  it("finds a cake by slug and returns undefined for an unknown one", () => {
    expect(getCakeBySlug("ivory-cascade")?.name).toBe("Ivory Cascade");
    expect(getCakeBySlug("no-such-cake")).toBeUndefined();
  });

  it("returns only featured cakes, capped at the requested limit", () => {
    const featured = getFeaturedCakes(3);
    expect(featured).toHaveLength(3);
    expect(featured.every((cake) => cake.featured)).toBe(true);
  });

  it("keeps enough featured cakes to fill the home page grid", () => {
    expect(getFeaturedCakes(6).length).toBeGreaterThanOrEqual(6);
  });

  it("filters by category", () => {
    const wedding = getCakesByCategory("wedding");
    expect(wedding.length).toBeGreaterThan(0);
    expect(wedding.every((cake) => cake.category === "wedding")).toBe(true);
  });

  it("only offers filters that would return results", () => {
    for (const category of getPopulatedCategories()) {
      expect(getCakesByCategory(category).length).toBeGreaterThan(0);
    }
    expect(getPopulatedCategories()).toHaveLength(CAKE_CATEGORIES.length);
  });
});

describe("formatLkr", () => {
  it("formats whole rupees without decimals", () => {
    const formatted = formatLkr(48000);
    expect(formatted).toContain("48,000");
    expect(formatted).not.toContain(".00");
  });
});
