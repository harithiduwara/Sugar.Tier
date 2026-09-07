import { CAKE_CATEGORIES, categoryLabels, getCakeBySlug } from "@/lib/cakes";
import type { CakeCategory } from "@/lib/cakes";
import { site } from "@/lib/site";

export type OrderDraft = {
  name: string;
  contact: string;
  eventDate: string;
  category: CakeCategory | "";
  servings: string;
  /** Slug of a catalogue cake the enquiry started from, if any. */
  reference: string;
  details: string;
};

export type OrderField = keyof OrderDraft;

export type ValidationResult = {
  readonly errors: Partial<Record<OrderField, string>>;
  /** Non-blocking notes — a short lead time is allowed, just flagged. */
  readonly warnings: Partial<Record<OrderField, string>>;
  readonly isValid: boolean;
};

export const emptyOrderDraft: OrderDraft = {
  name: "",
  contact: "",
  eventDate: "",
  category: "",
  servings: "",
  reference: "",
  details: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/** Digits, spaces and the usual separators; at least 9 digits overall. */
const PHONE_PATTERN = /^[+()\d][\d\s\-()]{8,}$/;

function looksLikeContact(value: string): boolean {
  return EMAIL_PATTERN.test(value) || PHONE_PATTERN.test(value);
}

function daysBetween(from: Date, to: Date): number {
  const msPerDay = 86_400_000;
  const startOfDay = (date: Date) =>
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  return Math.round((startOfDay(to) - startOfDay(from)) / msPerDay);
}

/**
 * Validates an order enquiry.
 *
 * The rules mirror what the studio actually needs to quote: who you are, how to
 * reach you, when it is for and roughly how many people. Everything else is
 * conversation. `now` is injectable so date rules are testable without freezing
 * the clock.
 */
export function validateOrder(draft: OrderDraft, now: Date = new Date()): ValidationResult {
  const errors: Partial<Record<OrderField, string>> = {};
  const warnings: Partial<Record<OrderField, string>> = {};

  if (draft.name.trim().length < 2) {
    errors.name = "Please tell us your name.";
  }

  if (draft.contact.trim() === "") {
    errors.contact = "We need a way to reply — an email address or a phone number.";
  } else if (!looksLikeContact(draft.contact.trim())) {
    errors.contact = "That does not look like an email address or a phone number.";
  }

  if (draft.eventDate === "") {
    errors.eventDate = "When is the cake for?";
  } else {
    const eventDate = new Date(`${draft.eventDate}T00:00:00Z`);
    if (Number.isNaN(eventDate.getTime())) {
      errors.eventDate = "Please pick a valid date.";
    } else {
      const leadDays = daysBetween(now, eventDate);
      if (leadDays < 0) {
        errors.eventDate = "That date has already passed.";
      } else if (leadDays < site.ordering.minimumLeadTimeDays) {
        warnings.eventDate = `That is under our usual ${site.ordering.minimumLeadTimeDays}-day lead time. Send it anyway — we will tell you straight away if the date is workable.`;
      }
    }
  }

  if (draft.category !== "" && !(CAKE_CATEGORIES as readonly string[]).includes(draft.category)) {
    errors.category = "Please choose one of the listed cake types.";
  }

  const servings = Number.parseInt(draft.servings, 10);
  if (draft.servings.trim() === "") {
    errors.servings = "Roughly how many people are you feeding?";
  } else if (!Number.isFinite(servings) || servings < 1) {
    errors.servings = "Please enter a number of guests.";
  } else if (servings > 500) {
    warnings.servings = "That is a large order — do send it, but expect a longer lead time.";
  }

  return { errors, warnings, isValid: Object.keys(errors).length === 0 };
}

/**
 * Turns a validated draft into the message body sent to WhatsApp or email.
 *
 * The site is statically hosted and has no server to accept a POST, so the form
 * composes a message and hands it to a channel the studio already reads. That
 * keeps the enquiry in one thread instead of an inbox nobody owns.
 */
export function composeOrderMessage(draft: OrderDraft): string {
  const referenceCake = draft.reference ? getCakeBySlug(draft.reference) : undefined;

  const lines = [
    `Hi ${site.name}! I'd like to enquire about a cake.`,
    "",
    `Name: ${draft.name.trim()}`,
    `Contact: ${draft.contact.trim()}`,
    `Date needed: ${draft.eventDate}`,
    `Guests: ${draft.servings.trim()}`,
  ];

  if (draft.category !== "") {
    lines.push(`Type: ${categoryLabels[draft.category]}`);
  }

  if (referenceCake) {
    lines.push(`Inspired by: ${referenceCake.name}`);
  }

  if (draft.details.trim() !== "") {
    lines.push("", "Details:", draft.details.trim());
  }

  return lines.join("\n");
}

export function orderWhatsappHref(draft: OrderDraft): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(composeOrderMessage(draft))}`;
}

export function orderMailtoHref(draft: OrderDraft): string {
  const subject = `Cake enquiry — ${draft.name.trim() || "new order"} — ${draft.eventDate}`;
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    composeOrderMessage(draft),
  )}`;
}
