import React from "react";
import Link from "next/link";
import { MapPin, Mail, Phone, Globe } from "lucide-react";

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white hover:opacity-90 transition-opacity"
              aria-label="MO&A Home"
            >
              MO&A Ltd
            </Link>
            <p className="mt-1 text-[11px] uppercase tracking-wider text-white/60 font-medium">
              Formerly Morgan Omonitan &amp; Abe Ltd
            </p>
            <p className="mt-3 text-xs sm:text-sm text-white/70 max-w-sm leading-relaxed">
              Thoughtful engineering. Stronger structures. Lasting impact.
              Delivering integrated engineering, consulting &amp; development solutions across West Africa since 1972.
            </p>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-4 text-xs sm:text-sm text-white/80">
            <span className="text-[11px] font-bold uppercase tracking-wider text-white/50 block">
              Head Office &amp; Inquiries
            </span>

            <div className="flex items-start gap-3">
              <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-white">241, Igbosere Road, Lagos,</p>
                <p className="text-white/70">P.O Box 7121, Lagos, Nigeria</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                <a
                  href="tel:+2348089137683"
                  className="hover:text-white transition-colors underline-offset-4 hover:underline"
                >
                  +234 (0) 808-913-7683
                </a>
                <span className="hidden sm:inline text-white/30">•</span>
                <a
                  href="tel:+2349093608794"
                  className="hover:text-white transition-colors underline-offset-4 hover:underline"
                >
                  +234 (0) 909-360-8794
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-primary shrink-0" />
              <a
                href="mailto:info@moanigeria.com"
                className="hover:text-white transition-colors underline-offset-4 hover:underline"
              >
                info@moanigeria.com
              </a>
            </div>

            <div className="flex items-center gap-3">
              <Globe className="h-4 w-4 text-primary shrink-0" />
              <a
                href="https://www.moanigeria.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors underline-offset-4 hover:underline"
              >
                www.moanigeria.com
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-white/50 block mb-4">
              Quick Links
            </span>
            <nav
              className="grid grid-cols-2 lg:grid-cols-1 gap-y-2.5 text-xs sm:text-sm font-semibold"
              aria-label="Footer Navigation"
            >
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/80 hover:text-white hover:underline underline-offset-4 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/50">
          <span>© {currentYear} <span className="font-serif font-bold text-white/80">MO&A Ltd</span> (Formerly Morgan Omonitan &amp; Abe Ltd). All rights reserved.</span>
          <span>Engineering, Consulting &amp; Development Firm</span>
        </div>
      </div>
    </footer>
  );
}
