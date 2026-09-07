import { promises } from "@/lib/content";

export function Promises() {
  return (
    <section className="border-y border-gold-300/50 bg-cocoa-900 py-20 text-cream-200">
      <div className="container-page grid gap-10 md:grid-cols-3">
        {promises.map((promise) => (
          <div key={promise.title} className="space-y-3">
            <h3 className="font-display text-2xl text-cream-100">{promise.title}</h3>
            <p className="text-sm leading-relaxed text-cream-300/80">{promise.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
