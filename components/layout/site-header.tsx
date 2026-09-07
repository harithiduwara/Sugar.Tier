"use client";

import { useState } from "react";
import Link from "next/link";
import type { Route } from "next";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/logo";
import { ButtonLink } from "@/components/ui";
import { primaryNav } from "@/lib/site";

function isActive(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gold-300/60 bg-cream-100/85 backdrop-blur-md">
      <div className="container-page flex h-18 items-center justify-between gap-6">
        <Link href="/" aria-label={`${"Sugar & Tier"} — home`} className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {primaryNav.map((link) => (
            <Link
              key={link.href}
              href={link.href as Route}
              aria-current={isActive(pathname, link.href) ? "page" : undefined}
              className={`text-sm tracking-wide transition-colors hover:text-cocoa-900 ${
                isActive(pathname, link.href)
                  ? "text-cocoa-900 underline decoration-gold-400 decoration-2 underline-offset-8"
                  : "text-cocoa-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <ButtonLink href="/order" size="sm">
            Start an order
          </ButtonLink>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold-300 text-cocoa-800 md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <svg viewBox="0 0 20 20" className="h-5 w-5" aria-hidden="true" fill="none">
            {menuOpen ? (
              <path
                d="M5 5l10 10M15 5L5 15"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M3 6h14M3 10h14M3 14h14"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      <div
        id="mobile-nav"
        hidden={!menuOpen}
        className="border-t border-gold-300/60 bg-cream-100 md:hidden"
      >
        <nav
          aria-label="Primary mobile"
          className="container-page flex flex-col py-4"
          onClick={() => setMenuOpen(false)}
        >
          {primaryNav.map((link) => (
            <Link
              key={link.href}
              href={link.href as Route}
              aria-current={isActive(pathname, link.href) ? "page" : undefined}
              className="border-b border-cream-300 py-3 text-base text-cocoa-800 last:border-0"
            >
              {link.label}
            </Link>
          ))}
          <ButtonLink href="/order" className="mt-4 w-full">
            Start an order
          </ButtonLink>
        </nav>
      </div>
    </header>
  );
}
