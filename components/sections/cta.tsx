import { ButtonLink } from "@/components/ui";
import { site, whatsappLink } from "@/lib/site";

export function Cta() {
  return (
    <section className="container-page py-20">
      <div className="bg-paper rounded-card border border-gold-300 px-8 py-16 text-center">
        <h2 className="mx-auto max-w-2xl text-3xl leading-tight text-balance sm:text-4xl">
          Have a date in mind?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-pretty text-cocoa-600">
          Tell us the occasion and the guest count. We reply within two working days with a sketch,
          a flavour suggestion and a fixed quote.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/order" size="lg">
            Start an order
          </ButtonLink>
          <ButtonLink href={whatsappLink()} size="lg" variant="secondary">
            Message on WhatsApp
          </ButtonLink>
        </div>
        <p className="mt-6 text-sm text-cocoa-500">
          Or find us on Instagram at{" "}
          <a
            href={site.instagram.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold-600 underline underline-offset-4"
          >
            {site.instagram.handle}
          </a>
        </p>
      </div>
    </section>
  );
}
