import React from "react";
import Link from "next/link";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About us" },
  { href: "/news", label: "News & Foresight" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact us" },
] as const;

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-ink text-white pt-16 pb-8 border-t border-border/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 pb-14 border-b border-white/10">
          <div>
            <Link
              href="/"
              className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white hover:opacity-90 transition-opacity"
              aria-label="MO&A Home"
            >
              MO&A Ltd
            </Link>
            <p className="mt-1 text-[11px] uppercase tracking-wider text-white/60 font-medium">
              Formerly Morgan Omonitan &amp; Abe Ltd
            </p>
            <p className="mt-3 text-xs sm:text-sm text-white/70 max-w-xs leading-relaxed">
              Thoughtful engineering.
              <br />
              Stronger structures. Lasting impact.
            </p>
          </div>

          <nav
            className="grid grid-cols-2 gap-x-16 gap-y-4 text-sm sm:text-base font-semibold"
            aria-label="Footer Navigation"
          >
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/85 hover:text-white hover:underline underline-offset-4 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/50">
          <span>© {currentYear} MO&A Ltd (Formerly Morgan Omonitan &amp; Abe Ltd). All rights reserved.</span>
          <span>Engineering, Consulting &amp; Development Firm</span>
        </div>
      </div>
    </footer>
  );
}
