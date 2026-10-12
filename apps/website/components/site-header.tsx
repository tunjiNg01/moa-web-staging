"use client";

import React, { useState, useEffect } from "react";
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
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = pathname === "/";
  const isTransparent = isHome && !isScrolled && !isOpen;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          isTransparent
            ? "bg-transparent border-transparent text-white"
            : "bg-white/95 dark:bg-slate-900/95 backdrop-blur-md text-foreground border-b border-border shadow-xs"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 sm:h-24 flex items-center justify-between gap-8">
          {/* Brand */}
          <Link
            href="/"
            className="flex items-center gap-4 group flex-shrink-0"
            aria-label="MO&A Home"
          >
            <div
              className={`relative w-24 h-10 sm:w-28 sm:h-12 flex items-center px-2 py-1 rounded transition-colors ${
                isTransparent ? "bg-white/90 backdrop-blur-xs shadow-xs" : ""
              }`}
            >
              <Image
                src="/images/moa-logo.jpeg"
                alt="MO&A"
                width={112}
                height={47}
                className="object-contain w-auto h-auto max-h-10"
                priority
              />
            </div>
            <div
              className={`hidden lg:block pl-4 border-l text-[10px] tracking-wider uppercase font-semibold leading-relaxed transition-colors ${
                isTransparent
                  ? "border-white/30 text-white/85 group-hover:text-white"
                  : "border-border text-muted-foreground group-hover:text-foreground"
              }`}
            >
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

              if (isTransparent) {
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative py-2 transition-colors ${
                      isActive
                        ? "text-white font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-white"
                        : "text-white/85 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative py-2 transition-colors ${
                    isActive
                      ? "text-primary font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary"
                      : "text-foreground/80 hover:text-primary"
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
              className={isTransparent ? "text-white hover:bg-white/10" : ""}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {isOpen && (
          <div className="md:hidden border-b border-border bg-white dark:bg-slate-900 px-6 py-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col gap-4 text-base font-semibold text-foreground">
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

      {/* Spacer for interior pages so content is not obscured by fixed header */}
      {!isHome && <div className="h-20 sm:h-24 w-full shrink-0" aria-hidden="true" />}
    </>
  );
}
