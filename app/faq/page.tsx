import type { Metadata } from "next";
import { Cta } from "@/components/sections/cta";
import { SectionHeading } from "@/components/ui";
import { faqs } from "@/lib/content";
import { JsonLd, faqJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Questions & answers",
  description:
    "Lead times, delivery, deposits, allergies and tastings — the questions we are asked before every order.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <section className="bg-paper border-b border-gold-300/50">
        <div className="container-page py-16 sm:py-20">
          <SectionHeading
            as="h1"
            align="left"
            eyebrow="Good to know"
            title="Questions & answers"
            description="The things worth knowing before you send a message. Anything not covered here, just ask."
          />
        </div>
      </section>

      <section className="container-page py-16">
        <div className="mx-auto max-w-3xl divide-y divide-gold-300/70 border-y border-gold-300/70">
          {faqs.map((faq) => (
            <details key={faq.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left">
                <h2 className="font-display text-lg text-cocoa-900">{faq.question}</h2>
                <span
                  aria-hidden="true"
                  className="shrink-0 text-2xl leading-none text-gold-500 transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-4 max-w-2xl leading-relaxed text-pretty text-cocoa-600">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      <Cta />
      <JsonLd data={faqJsonLd(faqs)} />
    </>
  );
}
