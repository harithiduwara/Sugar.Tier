import Link from "next/link";
import type { Route } from "next";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-cocoa-900 text-cream-100 border border-cocoa-900 hover:bg-cocoa-800 hover:border-cocoa-800",
  secondary:
    "bg-transparent text-cocoa-900 border border-gold-400 hover:bg-cream-200 hover:border-gold-500",
  ghost: "bg-transparent text-cocoa-700 border border-transparent hover:text-cocoa-900",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-[13px] gap-1.5",
  md: "h-11 px-5 text-sm gap-2",
  lg: "h-12 px-7 text-[15px] gap-2",
};

function buttonClasses(variant: ButtonVariant, size: ButtonSize, className: string): string {
  return [
    "inline-flex select-none items-center justify-center whitespace-nowrap rounded-full font-medium tracking-wide transition-colors duration-150",
    variantClasses[variant],
    sizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

type ButtonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button type={type} className={buttonClasses(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}

type ButtonLinkProps = {
  children: React.ReactNode;
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

/**
 * A link styled as a button.
 *
 * External destinations (the studio's Instagram, WhatsApp and mailto links) are
 * plain anchors — `next/link` prefetching and typed routes only apply to routes
 * this app owns.
 */
export function ButtonLink({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
}: ButtonLinkProps) {
  const classes = buttonClasses(variant, size, className);
  const isInternal = href.startsWith("/");

  if (!isInternal) {
    const isHttp = href.startsWith("http");
    return (
      <a
        href={href}
        className={classes}
        {...(isHttp ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href as Route} className={classes}>
      {children}
    </Link>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold tracking-[0.22em] text-gold-600 uppercase">{children}</p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  as: Heading = "h2",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: "center" | "left";
  as?: "h1" | "h2";
}) {
  const alignment = align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl text-left";
  return (
    <div className={`${alignment} space-y-4`}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Heading className="text-3xl leading-[1.1] font-normal text-balance sm:text-[2.6rem]">
        {title}
      </Heading>
      {description ? (
        <p className="text-base leading-relaxed text-pretty text-cocoa-600">{description}</p>
      ) : null}
    </div>
  );
}

export function Rule({ className = "" }: { className?: string }) {
  return (
    <div
      className={`h-px w-full bg-gradient-to-r from-transparent via-gold-300 to-transparent ${className}`}
      aria-hidden="true"
    />
  );
}

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-gold-300 bg-cream-50 px-3 py-1 text-xs font-medium tracking-wide text-cocoa-700">
      {children}
    </span>
  );
}
