import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink, Rule, SectionHeading } from "@/components/ui";
import { Process } from "@/components/sections/process";
import { promises } from "@/lib/content";
import { getFeaturedCakes } from "@/lib/cakes";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About the studio",
  description: `How ${site.name} works: one kitchen in ${site.city}, everything baked to order, nothing outsourced.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const [portrait] = getFeaturedCakes(1);

  return (
    <>
      <section className="bg-paper border-b border-gold-300/50">
        <div className="container-page grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <SectionHeading
              as="h1"
              align="left"
              eyebrow="About"
              title={site.founder}
              description={`${site.name} is run by Dr. Sanduni Siriwardena — a doctor by profession who bakes cakes purely for the love of it. It started the way these things usually do: a birthday cake for a friend, then a cake for their friend, then a diary that needed managing.`}
            />
            <p className="max-w-xl leading-relaxed text-pretty text-cocoa-600">
              Baking stays a passion project, taken on around a full-time medical career — which is
              why the studio only accepts a limited number of orders each week. It is the only way
              to bake everything fresh, finish it by hand and still answer messages the same day. If
              a date is gone, it is genuinely gone — and we will say so rather than stretch.
            </p>
            <ButtonLink href="/order" size="lg">
              Start an order
            </ButtonLink>
          </div>

          {portrait ? (
            <div className="overflow-hidden rounded-card border border-gold-300/70">
              <Image
                src={portrait.image.src}
                alt={portrait.image.alt}
                width={portrait.image.width}
                height={portrait.image.height}
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="h-full w-full object-cover"
              />
            </div>
          ) : null}
        </div>
      </section>

      <section className="container-page py-20">
        <div className="grid gap-12 lg:grid-cols-3">
          {promises.map((promise) => (
            <div key={promise.title} className="space-y-3">
              <h2 className="text-2xl text-cocoa-900">{promise.title}</h2>
              <Rule className="max-w-16" />
              <p className="leading-relaxed text-cocoa-600">{promise.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-gold-300/50 bg-cream-200/60">
        <div className="container-page grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="font-sans text-xs font-semibold tracking-[0.22em] text-gold-600 uppercase">
              Where we deliver
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-cocoa-600">{site.serviceArea}.</p>
          </div>
          <div>
            <h2 className="font-sans text-xs font-semibold tracking-[0.22em] text-gold-600 uppercase">
              Studio hours
            </h2>
            <ul className="mt-3 space-y-1 text-sm text-cocoa-600">
              {site.hours.map((slot) => (
                <li key={slot.days}>
                  <span className="text-cocoa-800">{slot.days}</span> — {slot.time}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-sans text-xs font-semibold tracking-[0.22em] text-gold-600 uppercase">
              Lead time
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-cocoa-600">
              {site.ordering.minimumLeadTimeDays} days for celebration cakes,{" "}
              {site.ordering.weddingLeadTimeWeeks} weeks for weddings.
            </p>
          </div>
          <div>
            <h2 className="font-sans text-xs font-semibold tracking-[0.22em] text-gold-600 uppercase">
              Holding a date
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-cocoa-600">
              A {site.ordering.depositPercent}% deposit confirms the booking; the balance is due
              three days before delivery.
            </p>
          </div>
        </div>
      </section>

      <Process />
    </>
  );
}
