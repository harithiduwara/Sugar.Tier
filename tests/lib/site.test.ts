import { afterEach, describe, expect, it } from "vitest";
import { assetPath, mailtoLink, primaryNav, site, whatsappLink } from "@/lib/site";

const originalBasePath = process.env.NEXT_PUBLIC_BASE_PATH;

afterEach(() => {
  if (originalBasePath === undefined) {
    delete process.env.NEXT_PUBLIC_BASE_PATH;
  } else {
    process.env.NEXT_PUBLIC_BASE_PATH = originalBasePath;
  }
});

describe("assetPath", () => {
  it("returns the path unchanged when no base path is configured", () => {
    delete process.env.NEXT_PUBLIC_BASE_PATH;
    expect(assetPath("/images/cakes/a.svg")).toBe("/images/cakes/a.svg");
  });

  it("prefixes the base path when deployed to a project page", () => {
    process.env.NEXT_PUBLIC_BASE_PATH = "/moni";
    expect(assetPath("/images/cakes/a.svg")).toBe("/moni/images/cakes/a.svg");
  });

  it("tolerates a path given without a leading slash", () => {
    delete process.env.NEXT_PUBLIC_BASE_PATH;
    expect(assetPath("images/a.svg")).toBe("/images/a.svg");
  });
});

describe("contact links", () => {
  it("builds a wa.me link with a URL-encoded opener", () => {
    const href = whatsappLink("Hi there & hello");
    expect(href.startsWith(`https://wa.me/${site.whatsapp}?text=`)).toBe(true);
    expect(href).toContain("%26");
    expect(href).not.toContain(" ");
  });

  it("builds a mailto link with an encoded subject", () => {
    expect(mailtoLink("Cake enquiry")).toBe(`mailto:${site.email}?subject=Cake%20enquiry`);
  });
});

describe("navigation", () => {
  it("exposes root-relative links only", () => {
    for (const link of primaryNav) {
      expect(link.href.startsWith("/")).toBe(true);
      expect(link.label.trim()).not.toBe("");
    }
  });
});
