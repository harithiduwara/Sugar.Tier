import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import type { Cake } from "@/lib/cakes";
import { categoryLabels, formatLkr } from "@/lib/cakes";

/**
 * A cake tile.
 *
 * The whole card is one link rather than a card containing several links, so
 * keyboard users get a single stop per cake and screen readers announce one
 * destination.
 */
export function CakeCard({ cake, priority = false }: { cake: Cake; priority?: boolean }) {
  return (
    <article className="group">
      <Link
        href={`/cakes/${cake.slug}` as Route}
        className="block focus-visible:outline-offset-4"
        aria-label={`${cake.name} — ${cake.tagline}`}
      >
        <div className="relative aspect-4/5 overflow-hidden rounded-card border border-gold-300/70 bg-cream-200">
          <Image
            src={cake.image.src}
            alt={cake.image.alt}
            width={cake.image.width}
            height={cake.image.height}
            priority={priority}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>

        <div className="mt-4 space-y-1.5">
          <p className="text-xs font-medium tracking-[0.16em] text-gold-600 uppercase">
            {categoryLabels[cake.category]}
          </p>
          <h3 className="text-xl leading-snug text-cocoa-900">{cake.name}</h3>
          <p className="text-sm leading-relaxed text-pretty text-cocoa-600">{cake.tagline}</p>
          <p className="pt-1 text-sm text-cocoa-500">
            From {formatLkr(cake.priceFromLkr)} · {cake.servings}
          </p>
        </div>
      </Link>
    </article>
  );
}
