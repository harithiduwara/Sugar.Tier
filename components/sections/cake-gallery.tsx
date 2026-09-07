"use client";

import { Suspense, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CakeCard } from "@/components/cake-card";
import { CAKE_CATEGORIES, cakes, categoryBlurbs, categoryLabels } from "@/lib/cakes";
import type { CakeCategory } from "@/lib/cakes";

function isCakeCategory(value: string | null): value is CakeCategory {
  return value !== null && (CAKE_CATEGORIES as readonly string[]).includes(value);
}

function GalleryFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const raw = searchParams.get("category");
  const active: CakeCategory | "all" = isCakeCategory(raw) ? raw : "all";

  const visible = useMemo(
    () => (active === "all" ? cakes : cakes.filter((cake) => cake.category === active)),
    [active],
  );

  // The filter lives in the URL so a filtered view can be sent to a client or
  // linked to from the services grid, and the back button behaves as expected.
  function select(next: CakeCategory | "all") {
    router.replace(next === "all" ? "/cakes" : `/cakes?category=${next}`, { scroll: false });
  }

  const options: readonly (CakeCategory | "all")[] = ["all", ...CAKE_CATEGORIES];

  return (
    <>
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter cakes">
        {options.map((option) => {
          const selected = option === active;
          return (
            <button
              key={option}
              type="button"
              onClick={() => select(option)}
              aria-pressed={selected}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                selected
                  ? "border-cocoa-900 bg-cocoa-900 text-cream-100"
                  : "border-gold-300 bg-cream-50 text-cocoa-700 hover:border-gold-500"
              }`}
            >
              {option === "all" ? "Everything" : categoryLabels[option]}
            </button>
          );
        })}
      </div>

      <p className="mt-5 text-sm text-cocoa-500" aria-live="polite">
        {active === "all"
          ? `Showing all ${cakes.length} cakes.`
          : `${categoryBlurbs[active]} Showing ${visible.length} of ${cakes.length}.`}
      </p>

      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((cake, index) => (
          <CakeCard key={cake.slug} cake={cake} priority={index < 3} />
        ))}
      </div>
    </>
  );
}

/** Static fallback: the unfiltered grid, so the page is useful without JS. */
function GalleryFallback() {
  return (
    <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {cakes.map((cake, index) => (
        <CakeCard key={cake.slug} cake={cake} priority={index < 3} />
      ))}
    </div>
  );
}

export function CakeGallery() {
  return (
    <section className="container-page py-16">
      <Suspense fallback={<GalleryFallback />}>
        <GalleryFilters />
      </Suspense>
    </section>
  );
}
