import type { Metadata } from "next";
import { OrderForm } from "@/components/order-form";
import { SectionHeading } from "@/components/ui";
import { orderSteps } from "@/lib/content";
import { mailtoLink, site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Start an order",
  description: `Tell ${site.name} about your date, guest count and idea. We reply within two working days with a sketch, a flavour suggestion and a fixed quote.`,
  alternates: { canonical: "/order" },
};

export default function OrderPage() {
  return (
    <>
      <section className="bg-paper border-b border-gold-300/50">
        <div className="container-page py-16 sm:py-20">
          <SectionHeading
            as="h1"
            align="left"
            eyebrow="Start an order"
            title="Tell us about the day"
            description="Fill this in and we will turn it into a message you can send on WhatsApp, by email or as an Instagram DM. We reply within two working days."
          />
        </div>
      </section>

      <section className="container-page py-16">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <OrderForm />
          </div>

          <aside className="space-y-10">
            <div className="rounded-card border border-gold-300/70 bg-cream-200/70 p-7">
              <h2 className="font-display text-xl text-cocoa-900">What happens next</h2>
              <ol className="mt-5 space-y-4">
                {orderSteps.map((step, index) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="font-display text-lg text-gold-500">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="block text-sm font-medium text-cocoa-900">{step.title}</span>
                      <span className="mt-1 block text-sm leading-relaxed text-cocoa-600">
                        {step.body}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="space-y-3">
              <h2 className="font-sans text-xs font-semibold tracking-[0.22em] text-gold-600 uppercase">
                Rather just message?
              </h2>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href={whatsappLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cocoa-700 underline underline-offset-4 hover:text-cocoa-900"
                  >
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a
                    href={site.instagram.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cocoa-700 underline underline-offset-4 hover:text-cocoa-900"
                  >
                    Instagram {site.instagram.handle}
                  </a>
                </li>
                <li>
                  <a
                    href={mailtoLink()}
                    className="text-cocoa-700 underline underline-offset-4 hover:text-cocoa-900"
                  >
                    {site.email}
                  </a>
                </li>
              </ul>
              <p className="pt-2 text-sm leading-relaxed text-cocoa-500">
                Dates are held for 48 hours while you decide. A {site.ordering.depositPercent}%
                deposit confirms the booking.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
