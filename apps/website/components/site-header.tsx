"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@repo/ui";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About us" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact us" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur-sm border-b border-border/80 transition-colors">
      <div className="max-w-7xl mx-auto px-6 h-20 sm:h-24 flex items-center justify-between gap-8">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-4 group flex-shrink-0"
          aria-label="MO&A Home"
        >
          <div className="relative w-24 h-10 sm:w-28 sm:h-12 flex items-center">
            <Image
              src="/images/moa-logo.jpeg"
              alt="MO&A"
              width={112}
              height={47}
              className="object-contain w-auto h-auto max-h-12"
              priority
            />
          </div>
          <div className="hidden lg:block pl-4 border-l border-border text-[10px] tracking-wider uppercase font-semibold leading-relaxed text-muted-foreground group-hover:text-foreground transition-colors">
            Structural engineering
            <br />
            Consultancy
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex items-center gap-7 text-sm lg:text-base font-semibold"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-2 transition-colors hover:text-primary ${
                  isActive
                    ? "text-primary font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary"
                    : "text-foreground/90"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-b border-border bg-background px-6 py-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-4 text-base font-semibold">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`py-2 px-3 rounded-md transition-colors ${
                    isActive
                      ? "bg-secondary text-primary font-bold"
                      : "text-foreground hover:bg-secondary/60"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
