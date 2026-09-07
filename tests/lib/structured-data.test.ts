import { describe, expect, it } from "vitest";
import { bakeryJsonLd, cakeJsonLd, faqJsonLd } from "@/lib/structured-data";
import { cakes } from "@/lib/cakes";
import { faqs } from "@/lib/content";
import { site } from "@/lib/site";

describe("bakeryJsonLd", () => {
  const data = bakeryJsonLd();

  it("declares a Bakery with the studio's identity", () => {
    expect(data["@type"]).toBe("Bakery");
    expect(data.name).toBe(site.name);
    expect(data.sameAs).toContain(site.instagram.href);
  });

  it("offers every cake in the catalogue at an absolute URL", () => {
    const offers = data.makesOffer as { url: string }[];
    expect(offers).toHaveLength(cakes.length);
    for (const offer of offers) {
      expect(offer.url.startsWith(`${site.url}/cakes/`)).toBe(true);
    }
  });
});

describe("cakeJsonLd", () => {
  it("describes a pre-order product with a price in rupees", () => {
    const cake = cakes[0]!;
    const data = cakeJsonLd(cake);
    const offer = data.offers as Record<string, unknown>;

    expect(data["@type"]).toBe("Product");
    expect(data.name).toBe(cake.name);
    expect(offer.priceCurrency).toBe(site.currency);
    expect(offer.availability).toBe("https://schema.org/PreOrder");
  });
});

describe("faqJsonLd", () => {
  it("maps each question to its answer", () => {
    const data = faqJsonLd(faqs);
    const entities = data.mainEntity as { name: string; acceptedAnswer: { text: string } }[];

    expect(entities).toHaveLength(faqs.length);
    expect(entities[0]?.name).toBe(faqs[0]?.question);
    expect(entities[0]?.acceptedAnswer.text).toBe(faqs[0]?.answer);
  });
});

describe("serialisation", () => {
  it("produces JSON that a crawler can parse", () => {
    expect(() => JSON.parse(JSON.stringify(bakeryJsonLd()))).not.toThrow();
  });
});
