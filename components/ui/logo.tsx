/** The studio's line-art cake mark, drawn to match the Instagram avatar. */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth={2.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M32 13v6" />
        <path d="M32 16c3-3 6-2.6 6-2.6S37.4 18 32 16z" />
        <rect x="21" y="22" width="22" height="9" rx="2" />
        <rect x="17" y="31" width="30" height="11" rx="2" />
        <path d="M14 46h36" />
        <path d="M32 42v4" />
        <path d="M24 51h16" />
      </g>
    </svg>
  );
}

/** Mark plus wordmark. `compact` drops the wordmark for tight spaces. */
export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5 text-gold-500">
      <LogoMark className="h-9 w-9" />
      {compact ? null : (
        <span className="font-display text-[1.35rem] leading-none tracking-[0.01em] text-cocoa-900">
          Sugar <span className="text-gold-500">&amp;</span> Tier
        </span>
      )}
    </span>
  );
}
