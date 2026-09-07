import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { notFound } from "next/navigation";
import { ButtonLink, Rule, Tag } from "@/components/ui";
import { CakeCard } from "@/components/cake-card";
import { cakes, categoryLabels, formatLkr, getCakeBySlug } from "@/lib/cakes";
import { JsonLd, cakeJsonLd } from "@/lib/structured-data";
import { site, whatsappLink } from "@/lib/site";

type PageProps = { params: Promise<{ slug: string }> };

/** Every cake page is emitted at build time — nothing is rendered on demand. */
export function generateStaticParams(): { slug: string }[] {
  return cakes.map((cake) => ({ slug: cake.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cake = getCakeBySlug(slug);

  if (!cake) {
    return { title: "Cake not found" };
  }

  return {
    title: cake.name,
    description: cake.tagline,
    alternates: { canonical: `/cakes/${cake.slug}` },
    openGraph: {
      title: `${cake.name} · ${site.name}`,
      description: cake.tagline,
      images: [{ url: cake.image.src, alt: cake.image.alt }],
    },
  };
}

export default async function CakePage({ params }: PageProps) {
  const { slug } = await params;
  const cake = getCakeBySlug(slug);

  if (!cake) {
    notFound();
  }

  const related = cakes.filter((other) => other.slug !== cake.slug).slice(0, 3);
  const enquiry = `Hi Sugar & Tier! I'd like to ask about the ${cake.name}.`;

  return (
    <>
      <article className="container-page py-12 sm:py-16">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-cocoa-500">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="hover:text-cocoa-800">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/cakes" className="hover:text-cocoa-800">
                Cakes
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-cocoa-800">{cake.name}</li>
          </ol>
        </nav>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="overflow-hidden rounded-card border border-gold-300/70 bg-cream-200">
            <Image
              src={cake.image.src}
              alt={cake.image.alt}
              width={cake.image.width}
              height={cake.image.height}
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <Tag>{categoryLabels[cake.category]}</Tag>
              <h1 className="text-4xl leading-tight text-balance sm:text-5xl">{cake.name}</h1>
              <p className="text-lg leading-relaxed text-pretty text-cocoa-600">{cake.tagline}</p>
            </div>

            <Rule />

            <dl className="grid grid-cols-2 gap-6 sm:grid-cols-3">
              <div>
                <dt className="text-xs tracking-[0.16em] text-cocoa-500 uppercase">From</dt>
                <dd className="font-display mt-1 text-xl text-cocoa-900">
                  {formatLkr(cake.priceFromLkr)}
                </dd>
              </div>
              <div>
                <dt className="text-xs tracking-[0.16em] text-cocoa-500 uppercase">Serves</dt>
                <dd className="font-display mt-1 text-xl text-cocoa-900">{cake.servings}</dd>
              </div>
              <div>
                <dt className="text-xs tracking-[0.16em] text-cocoa-500 uppercase">Lead time</dt>
                <dd className="font-display mt-1 text-xl text-cocoa-900">
                  {cake.leadTimeDays} days
                </dd>
              </div>
            </dl>

            <p className="leading-relaxed text-pretty text-cocoa-700">{cake.description}</p>

            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <h2 className="font-sans text-xs font-semibold tracking-[0.22em] text-gold-600 uppercase">
                  Flavours
                </h2>
                <ul className="mt-3 space-y-2 text-sm text-cocoa-600">
                  {cake.flavours.map((flavour) => (
                    <li key={flavour}>{flavour}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="font-sans text-xs font-semibold tracking-[0.22em] text-gold-600 uppercase">
                  Finishes
                </h2>
                <ul className="mt-3 space-y-2 text-sm text-cocoa-600">
                  {cake.finishes.map((finish) => (
                    <li key={finish}>{finish}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <ButtonLink href={`/order?cake=${cake.slug}` as Route} size="lg">
                Enquire about this cake
              </ButtonLink>
              <ButtonLink href={whatsappLink(enquiry)} size="lg" variant="secondary">
                Ask on WhatsApp
              </ButtonLink>
            </div>

            <p className="text-sm text-cocoa-500">
              Guide price shown for the size above. Tiers, servings and finish all change the quote
              — you get a fixed price before anything is booked.
            </p>
          </div>
        </div>
      </article>

      <section className="border-t border-gold-300/50 bg-cream-200/60 py-16">
        <div className="container-page">
          <h2 className="text-2xl sm:text-3xl">You might also like</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((other) => (
              <CakeCard key={other.slug} cake={other} />
            ))}
          </div>
        </div>
      </section>

      <JsonLd data={cakeJsonLd(cake)} />
    </>
  );
}
