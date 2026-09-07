import type { Metadata } from "next";
import { CakeGallery } from "@/components/sections/cake-gallery";
import { Cta } from "@/components/sections/cta";
import { SectionHeading } from "@/components/ui";
import { cakes } from "@/lib/cakes";

export const metadata: Metadata = {
  title: "The cakes",
  description:
    "Wedding tiers, celebration cakes, bento minis and dessert tables — the full Sugar & Tier collection, with guide prices and lead times.",
  alternates: { canonical: "/cakes" },
};

export default function CakesPage() {
  return (
    <>
      <section className="bg-paper border-b border-gold-300/50">
        <div className="container-page py-16 sm:py-20">
          <SectionHeading
            as="h1"
            align="left"
            eyebrow="The collection"
            title="Every cake starts as a conversation"
            description={`${cakes.length} designs that have left the studio. Treat them as starting points — sizes, flavours and finishes all change to suit the day.`}
          />
        </div>
      </section>

      <CakeGallery />
      <Cta />
    </>
  );
}
