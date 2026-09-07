import { ButtonLink } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="text-xs font-semibold tracking-[0.22em] text-gold-600 uppercase">404</p>
      <h1 className="mt-4 text-4xl sm:text-5xl">This page has been eaten</h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-cocoa-600">
        The link you followed does not exist any more. The cakes, happily, still do.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/cakes">Browse the cakes</ButtonLink>
        <ButtonLink href="/" variant="secondary">
          Back home
        </ButtonLink>
      </div>
    </section>
  );
}
