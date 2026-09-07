import { describe, expect, it } from "vitest";
import {
  composeOrderMessage,
  emptyOrderDraft,
  orderMailtoHref,
  orderWhatsappHref,
  validateOrder,
} from "@/lib/order-form";
import type { OrderDraft } from "@/lib/order-form";
import { site } from "@/lib/site";

const NOW = new Date("2026-05-01T09:00:00Z");

function draft(overrides: Partial<OrderDraft> = {}): OrderDraft {
  return {
    ...emptyOrderDraft,
    name: "Nadeesha",
    contact: "nadeesha@example.com",
    eventDate: "2026-08-01",
    servings: "40",
    ...overrides,
  };
}

describe("validateOrder", () => {
  it("accepts a complete enquiry", () => {
    const result = validateOrder(draft(), NOW);
    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it("rejects an empty form with one message per missing field", () => {
    const result = validateOrder(emptyOrderDraft, NOW);
    expect(result.isValid).toBe(false);
    expect(Object.keys(result.errors).sort()).toEqual(["contact", "eventDate", "name", "servings"]);
  });

  it("requires a name of at least two characters", () => {
    expect(validateOrder(draft({ name: "N" }), NOW).errors.name).toBeDefined();
    expect(validateOrder(draft({ name: "  " }), NOW).errors.name).toBeDefined();
  });

  it("accepts either an email address or a phone number as contact", () => {
    expect(
      validateOrder(draft({ contact: "someone@example.lk" }), NOW).errors.contact,
    ).toBeUndefined();
    expect(
      validateOrder(draft({ contact: "+94 77 123 4567" }), NOW).errors.contact,
    ).toBeUndefined();
    expect(validateOrder(draft({ contact: "0771234567" }), NOW).errors.contact).toBeUndefined();
  });

  it("rejects contact details that are neither", () => {
    expect(validateOrder(draft({ contact: "carrier pigeon" }), NOW).errors.contact).toBeDefined();
    expect(validateOrder(draft({ contact: "nope@nope" }), NOW).errors.contact).toBeDefined();
    expect(validateOrder(draft({ contact: "12345" }), NOW).errors.contact).toBeDefined();
  });

  it("rejects a date in the past but accepts today", () => {
    expect(validateOrder(draft({ eventDate: "2026-04-30" }), NOW).errors.eventDate).toBeDefined();
    expect(validateOrder(draft({ eventDate: "2026-05-01" }), NOW).errors.eventDate).toBeUndefined();
  });

  it("warns rather than blocks when the date is inside the lead time", () => {
    const soon = new Date(NOW);
    soon.setUTCDate(soon.getUTCDate() + site.ordering.minimumLeadTimeDays - 1);
    const result = validateOrder(draft({ eventDate: soon.toISOString().slice(0, 10) }), NOW);

    expect(result.isValid).toBe(true);
    expect(result.warnings.eventDate).toContain(String(site.ordering.minimumLeadTimeDays));
  });

  it("requires a guest count that is a positive number", () => {
    expect(validateOrder(draft({ servings: "" }), NOW).errors.servings).toBeDefined();
    expect(validateOrder(draft({ servings: "0" }), NOW).errors.servings).toBeDefined();
    expect(validateOrder(draft({ servings: "lots" }), NOW).errors.servings).toBeDefined();
  });

  it("warns on very large orders without blocking them", () => {
    const result = validateOrder(draft({ servings: "900" }), NOW);
    expect(result.isValid).toBe(true);
    expect(result.warnings.servings).toBeDefined();
  });

  it("rejects a category that is not in the catalogue", () => {
    const result = validateOrder(draft({ category: "cupcakes" as never }), NOW);
    expect(result.errors.category).toBeDefined();
  });
});

describe("composeOrderMessage", () => {
  it("includes every answer the studio needs to quote", () => {
    const message = composeOrderMessage(draft({ category: "wedding", details: "Ivory, no nuts." }));

    expect(message).toContain("Name: Nadeesha");
    expect(message).toContain("Contact: nadeesha@example.com");
    expect(message).toContain("Date needed: 2026-08-01");
    expect(message).toContain("Guests: 40");
    expect(message).toContain("Type: Wedding tiers");
    expect(message).toContain("Ivory, no nuts.");
  });

  it("names the cake an enquiry started from", () => {
    expect(composeOrderMessage(draft({ reference: "ivory-cascade" }))).toContain(
      "Inspired by: Ivory Cascade",
    );
  });

  it("omits optional lines that were left blank", () => {
    const message = composeOrderMessage(draft());
    expect(message).not.toContain("Type:");
    expect(message).not.toContain("Inspired by:");
    expect(message).not.toContain("Details:");
  });

  it("ignores a reference slug that is not in the catalogue", () => {
    expect(composeOrderMessage(draft({ reference: "ghost-cake" }))).not.toContain("Inspired by:");
  });
});

describe("send links", () => {
  it("encodes the message into the WhatsApp deep link", () => {
    const href = orderWhatsappHref(draft());
    expect(href.startsWith(`https://wa.me/${site.whatsapp}?text=`)).toBe(true);
    expect(decodeURIComponent(href.split("?text=")[1] ?? "")).toContain("Name: Nadeesha");
  });

  it("puts the name and date in the email subject", () => {
    const href = orderMailtoHref(draft());
    expect(href.startsWith(`mailto:${site.email}?subject=`)).toBe(true);
    expect(decodeURIComponent(href)).toContain("Cake enquiry — Nadeesha — 2026-08-01");
  });
});
