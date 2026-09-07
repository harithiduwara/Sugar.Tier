import Link from "next/link";
import type { Route } from "next";
import { Logo } from "@/components/ui/logo";
import { Rule } from "@/components/ui";
import { mailtoLink, primaryNav, site, socialLinks, whatsappLink } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-gold-300/60 bg-cream-200">
      <div className="container-page py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed text-cocoa-600">{site.tagline}.</p>
          </div>

          <nav aria-label="Footer" className="space-y-3">
            <h2 className="font-sans text-xs font-semibold tracking-[0.22em] text-gold-600 uppercase">
              Explore
            </h2>
            <ul className="space-y-2 text-sm">
              {primaryNav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href as Route}
                    className="text-cocoa-600 transition-colors hover:text-cocoa-900"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-3">
            <h2 className="font-sans text-xs font-semibold tracking-[0.22em] text-gold-600 uppercase">
              Get in touch
            </h2>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={socialLinks[0]?.href ?? site.instagram.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cocoa-600 transition-colors hover:text-cocoa-900"
                >
                  {site.instagram.handle}
                </a>
              </li>
              <li>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cocoa-600 transition-colors hover:text-cocoa-900"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={mailtoLink()}
                  className="text-cocoa-600 transition-colors hover:text-cocoa-900"
                >
                  {site.email}
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="font-sans text-xs font-semibold tracking-[0.22em] text-gold-600 uppercase">
              Studio hours
            </h2>
            <ul className="space-y-2 text-sm text-cocoa-600">
              {site.hours.map((slot) => (
                <li key={slot.days}>
                  <span className="block text-cocoa-800">{slot.days}</span>
                  <span>{slot.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Rule className="my-10" />

        <div className="flex flex-col gap-2 text-xs text-cocoa-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. {site.city}, {site.country}.
          </p>
          <p>Baked to order. Delivered by hand.</p>
        </div>
      </div>
    </footer>
  );
}
