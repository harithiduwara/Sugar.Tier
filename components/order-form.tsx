"use client";

import { Suspense, useId, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui";
import { CAKE_CATEGORIES, categoryLabels, getCakeBySlug } from "@/lib/cakes";
import {
  composeOrderMessage,
  emptyOrderDraft,
  orderMailtoHref,
  orderWhatsappHref,
  validateOrder,
} from "@/lib/order-form";
import type { OrderDraft, OrderField, ValidationResult } from "@/lib/order-form";
import { site } from "@/lib/site";

const fieldBase =
  "w-full rounded-lg border bg-cream-50 px-4 py-3 text-sm text-cocoa-900 placeholder:text-cocoa-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-600";

function fieldClasses(hasError: boolean): string {
  return `${fieldBase} ${hasError ? "border-rose-500" : "border-gold-300"}`;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-sm text-rose-500">
      {message}
    </p>
  );
}

function FieldNote({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-sm text-gold-600">
      {message}
    </p>
  );
}

function OrderFormFields() {
  const searchParams = useSearchParams();
  const referenceSlug = searchParams.get("cake") ?? "";
  const referenceCake = referenceSlug ? getCakeBySlug(referenceSlug) : undefined;

  const ids = useId();
  const fieldId = (field: OrderField) => `${ids}-${field}`;
  const errorId = (field: OrderField) => `${ids}-${field}-error`;

  const [draft, setDraft] = useState<OrderDraft>({
    ...emptyOrderDraft,
    reference: referenceCake?.slug ?? "",
    category: referenceCake?.category ?? "",
  });
  const [result, setResult] = useState<ValidationResult | null>(null);

  const errors = result?.errors ?? {};
  const warnings = result?.warnings ?? {};
  const ready = result?.isValid === true;

  function update<K extends OrderField>(field: K, value: OrderDraft[K]) {
    setDraft((current) => ({ ...current, [field]: value }));
    // Re-validate only once the visitor has asked for a check; validating on
    // every keystroke before that shouts at people who are still typing.
    if (result) {
      setResult(validateOrder({ ...draft, [field]: value }));
    }
  }

  function describedBy(field: OrderField): string | undefined {
    const parts: string[] = [];
    if (errors[field]) parts.push(errorId(field));
    if (warnings[field]) parts.push(`${errorId(field)}-note`);
    return parts.length > 0 ? parts.join(" ") : undefined;
  }

  return (
    <form
      noValidate
      onSubmit={(event) => {
        // Nothing is POSTed: the site is static, so submitting means composing
        // the message and handing it to WhatsApp or email.
        event.preventDefault();
        setResult(validateOrder(draft));
      }}
      className="space-y-6"
    >
      {referenceCake ? (
        <p className="rounded-lg border border-gold-300 bg-cream-200 px-4 py-3 text-sm text-cocoa-700">
          Enquiring about <span className="font-medium text-cocoa-900">{referenceCake.name}</span>.
          We will start there and adjust.
        </p>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor={fieldId("name")} className="block text-sm font-medium text-cocoa-800">
            Your name
          </label>
          <input
            id={fieldId("name")}
            name="name"
            type="text"
            autoComplete="name"
            value={draft.name}
            onChange={(event) => update("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy("name")}
            className={`mt-2 ${fieldClasses(Boolean(errors.name))}`}
            placeholder="Nadeesha"
          />
          <FieldError id={errorId("name")} message={errors.name} />
        </div>

        <div>
          <label htmlFor={fieldId("contact")} className="block text-sm font-medium text-cocoa-800">
            Email or phone
          </label>
          <input
            id={fieldId("contact")}
            name="contact"
            type="text"
            inputMode="email"
            autoComplete="email"
            value={draft.contact}
            onChange={(event) => update("contact", event.target.value)}
            aria-invalid={Boolean(errors.contact)}
            aria-describedby={describedBy("contact")}
            className={`mt-2 ${fieldClasses(Boolean(errors.contact))}`}
            placeholder="you@example.com"
          />
          <FieldError id={errorId("contact")} message={errors.contact} />
        </div>

        <div>
          <label
            htmlFor={fieldId("eventDate")}
            className="block text-sm font-medium text-cocoa-800"
          >
            Date needed
          </label>
          <input
            id={fieldId("eventDate")}
            name="eventDate"
            type="date"
            value={draft.eventDate}
            onChange={(event) => update("eventDate", event.target.value)}
            aria-invalid={Boolean(errors.eventDate)}
            aria-describedby={describedBy("eventDate")}
            className={`mt-2 ${fieldClasses(Boolean(errors.eventDate))}`}
          />
          <FieldError id={errorId("eventDate")} message={errors.eventDate} />
          <FieldNote id={`${errorId("eventDate")}-note`} message={warnings.eventDate} />
        </div>

        <div>
          <label htmlFor={fieldId("servings")} className="block text-sm font-medium text-cocoa-800">
            Number of guests
          </label>
          <input
            id={fieldId("servings")}
            name="servings"
            type="number"
            min={1}
            value={draft.servings}
            onChange={(event) => update("servings", event.target.value)}
            aria-invalid={Boolean(errors.servings)}
            aria-describedby={describedBy("servings")}
            className={`mt-2 ${fieldClasses(Boolean(errors.servings))}`}
            placeholder="25"
          />
          <FieldError id={errorId("servings")} message={errors.servings} />
          <FieldNote id={`${errorId("servings")}-note`} message={warnings.servings} />
        </div>
      </div>

      <div>
        <label htmlFor={fieldId("category")} className="block text-sm font-medium text-cocoa-800">
          Type of cake <span className="text-cocoa-500">(optional)</span>
        </label>
        <select
          id={fieldId("category")}
          name="category"
          value={draft.category}
          onChange={(event) => update("category", event.target.value as OrderDraft["category"])}
          className={`mt-2 ${fieldClasses(Boolean(errors.category))}`}
        >
          <option value="">Not sure yet</option>
          {CAKE_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {categoryLabels[category]}
            </option>
          ))}
        </select>
        <FieldError id={errorId("category")} message={errors.category} />
      </div>

      <div>
        <label htmlFor={fieldId("details")} className="block text-sm font-medium text-cocoa-800">
          Anything else <span className="text-cocoa-500">(optional)</span>
        </label>
        <textarea
          id={fieldId("details")}
          name="details"
          rows={5}
          value={draft.details}
          onChange={(event) => update("details", event.target.value)}
          className={`mt-2 ${fieldClasses(false)}`}
          placeholder="Colours, flavours, allergies, a photo you liked, where it needs to go."
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" size="lg">
          {ready ? "Check again" : "Review my enquiry"}
        </Button>
        <p className="text-sm text-cocoa-500">
          Nothing is sent yet — you will send it yourself in the next step.
        </p>
      </div>

      <div aria-live="polite">
        {result && !result.isValid ? (
          <p className="rounded-lg border border-rose-500 bg-cream-50 px-4 py-3 text-sm text-cocoa-800">
            Almost there — please fix the highlighted fields.
          </p>
        ) : null}

        {ready ? (
          <div className="space-y-4 rounded-card border border-gold-300 bg-cream-200 p-6">
            <h3 className="font-display text-xl text-cocoa-900">Ready to send</h3>
            <p className="text-sm text-cocoa-600">
              Here is your enquiry. Send it whichever way suits you — WhatsApp is usually fastest.
            </p>
            <pre className="max-h-64 overflow-auto rounded-lg border border-gold-300/70 bg-cream-50 p-4 font-sans text-sm whitespace-pre-wrap text-cocoa-700">
              {composeOrderMessage(draft)}
            </pre>
            <div className="flex flex-wrap gap-3">
              <a
                href={orderWhatsappHref(draft)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center rounded-full bg-cocoa-900 px-5 text-sm font-medium text-cream-100 transition-colors hover:bg-cocoa-800"
              >
                Send on WhatsApp
              </a>
              <a
                href={orderMailtoHref(draft)}
                className="inline-flex h-11 items-center justify-center rounded-full border border-gold-400 px-5 text-sm font-medium text-cocoa-900 transition-colors hover:bg-cream-100"
              >
                Send by email
              </a>
              <a
                href={site.instagram.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center rounded-full border border-gold-400 px-5 text-sm font-medium text-cocoa-900 transition-colors hover:bg-cream-100"
              >
                DM on Instagram
              </a>
            </div>
          </div>
        ) : null}
      </div>
    </form>
  );
}

/** `useSearchParams` needs a boundary for the statically exported build. */
export function OrderForm() {
  return (
    <Suspense fallback={<div className="h-96 rounded-card border border-gold-300 bg-cream-200" />}>
      <OrderFormFields />
    </Suspense>
  );
}
