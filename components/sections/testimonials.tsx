import { SectionHeading } from "@/components/ui";
import { testimonials } from "@/lib/content";

export function Testimonials() {
  return (
    <section className="container-page py-20">
      <SectionHeading eyebrow="Kind words" title="What people say afterwards" />

      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {testimonials.map((testimonial) => (
          <figure
            key={testimonial.attribution}
            className="flex h-full flex-col rounded-card border border-gold-300/70 bg-cream-50 p-7"
          >
            <blockquote className="font-display text-lg leading-relaxed text-pretty text-cocoa-800">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-6 text-sm text-cocoa-500">
              <span className="block font-medium text-cocoa-800">{testimonial.attribution}</span>
              {testimonial.context}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
