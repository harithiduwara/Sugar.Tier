import { cakes, formatLkr } from "@/lib/cakes";
import type { Cake } from "@/lib/cakes";
import { site } from "@/lib/site";

/**
 * schema.org payloads.
 *
 * Search engines and Instagram's link preview both read these; they are what
 * turn a shared link into a card with a name, an area served and an opening
 * time rather than a bare URL.
 */
export function bakeryJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Bakery",
    "@id": `${site.url}/#bakery`,
    name: site.name,
    legalName: site.legalName,
    description: site.description,
    url: site.url,
    email: site.email,
    telephone: `+${site.whatsapp}`,
    founder: { "@type": "Person", name: site.founder },
    priceRange: "$$",
    currenciesAccepted: site.currency,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressCountry: "LK",
    },
    areaServed: site.serviceArea,
    sameAs: [site.instagram.href],
    makesOffer: cakes.map((cake) => ({
      "@type": "Offer",
      name: cake.name,
      price: cake.priceFromLkr,
      priceCurrency: site.currency,
      url: `${site.url}/cakes/${cake.slug}/`,
    })),
  };
}

export function cakeJsonLd(cake: Cake): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: cake.name,
    description: cake.description,
    image: `${site.url}${cake.image.src}`,
    brand: { "@type": "Brand", name: site.name },
    offers: {
      "@type": "Offer",
      price: cake.priceFromLkr,
      priceCurrency: site.currency,
      availability: "https://schema.org/PreOrder",
      url: `${site.url}/cakes/${cake.slug}/`,
      description: `Guide price from ${formatLkr(cake.priceFromLkr)} for ${cake.servings}.`,
    },
  };
}

export function faqJsonLd(faqs: readonly { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

/** Renders a JSON-LD block. Content is app-authored, never visitor input. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
