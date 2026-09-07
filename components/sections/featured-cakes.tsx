import { ButtonLink, SectionHeading } from "@/components/ui";
import { CakeCard } from "@/components/cake-card";
import { getFeaturedCakes } from "@/lib/cakes";

export function FeaturedCakes() {
  const featured = getFeaturedCakes(6);

  return (
    <section className="border-y border-gold-300/50 bg-cream-200/60 py-20">
      <div className="container-page">
        <SectionHeading
          eyebrow="Selected work"
          title="Recent cakes"
          description="A sample of what has left the studio lately. Each one started as a conversation."
        />

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((cake, index) => (
            <CakeCard key={cake.slug} cake={cake} priority={index < 3} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <ButtonLink href="/cakes" variant="secondary" size="lg">
            See the full collection
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
