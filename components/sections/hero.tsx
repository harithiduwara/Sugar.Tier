import Image from "next/image";
import { ButtonLink, Eyebrow } from "@/components/ui";
import { getFeaturedCakes } from "@/lib/cakes";
import { site } from "@/lib/site";

export function Hero() {
  const [lead, second] = getFeaturedCakes(2);

  return (
    <section className="bg-paper relative overflow-hidden">
      <div className="container-page grid gap-14 py-20 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:py-28">
        <div className="animate-rise space-y-7">
          <Eyebrow>{`${site.city}, ${site.country}`}</Eyebrow>
          <h1 className="text-[2.75rem] leading-[1.05] font-normal text-balance sm:text-6xl">
            Cakes made for
            <span className="block text-gold-500 italic">the day you&rsquo;ll remember</span>
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-pretty text-cocoa-600">
            {site.description}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <ButtonLink href="/order" size="lg">
              Start an order
            </ButtonLink>
            <ButtonLink href="/cakes" size="lg" variant="secondary">
              See the cakes
            </ButtonLink>
          </div>
          <dl className="grid max-w-md grid-cols-3 gap-6 pt-4">
            <div>
              <dt className="text-xs tracking-[0.16em] text-cocoa-500 uppercase">Lead time</dt>
              <dd className="font-display text-2xl text-cocoa-900">
                {site.ordering.minimumLeadTimeDays} days
              </dd>
            </div>
            <div>
              <dt className="text-xs tracking-[0.16em] text-cocoa-500 uppercase">Delivery</dt>
              <dd className="font-display text-2xl text-cocoa-900">{site.city}</dd>
            </div>
            <div>
              <dt className="text-xs tracking-[0.16em] text-cocoa-500 uppercase">Baked</dt>
              <dd className="font-display text-2xl text-cocoa-900">To order</dd>
            </div>
          </dl>
        </div>

        {lead ? (
          <div className="relative">
            <div className="aspect-4/5 overflow-hidden rounded-card border border-gold-300/70">
              <Image
                src={lead.image.src}
                alt={lead.image.alt}
                width={lead.image.width}
                height={lead.image.height}
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="h-full w-full object-cover"
              />
            </div>

            {second ? (
              <div className="absolute -bottom-10 -left-10 hidden w-44 overflow-hidden rounded-card border border-gold-300/70 bg-cream-100 shadow-[0_18px_40px_-24px_rgba(38,28,18,0.5)] lg:block">
                <Image
                  src={second.image.src}
                  alt={second.image.alt}
                  width={second.image.width}
                  height={second.image.height}
                  sizes="176px"
                  className="h-full w-full object-cover"
                />
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
