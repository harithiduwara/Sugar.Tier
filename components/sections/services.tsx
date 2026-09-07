import Link from "next/link";
import type { Route } from "next";
import { Rule, SectionHeading } from "@/components/ui";
import { services } from "@/lib/content";

export function Services() {
  return (
    <section className="container-page py-20">
      <SectionHeading
        eyebrow="What we make"
        title="Four ways to order"
        description="Every cake is made to order. Pick the shape of the occasion and we will take it from there."
      />

      <div className="mt-12 grid gap-px overflow-hidden rounded-card border border-gold-300/70 bg-gold-300/70 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => (
          <Link
            key={service.title}
            href={service.href as Route}
            className="group flex flex-col gap-3 bg-cream-100 p-7 transition-colors hover:bg-cream-200"
          >
            <h3 className="text-xl text-cocoa-900">{service.title}</h3>
            <Rule className="max-w-16" />
            <p className="text-sm leading-relaxed text-cocoa-600">{service.body}</p>
            <span className="mt-auto pt-4 text-sm font-medium text-gold-600 transition-transform group-hover:translate-x-0.5">
              Browse →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
