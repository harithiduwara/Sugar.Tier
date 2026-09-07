import { SectionHeading } from "@/components/ui";
import { orderSteps } from "@/lib/content";

export function Process() {
  return (
    <section className="container-page py-20">
      <SectionHeading
        eyebrow="How it works"
        title="From first message to the table"
        description="No checkout, no guesswork. Four steps, and you always know which one you are on."
        align="left"
      />

      <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {orderSteps.map((step, index) => (
          <li key={step.title} className="border-t border-gold-300 pt-5">
            <span className="font-display text-3xl text-gold-400">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 text-lg text-cocoa-900">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-cocoa-600">{step.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
