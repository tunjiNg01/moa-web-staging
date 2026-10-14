"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";
import { Button } from "@repo/ui";
import { ServicesMegaMenu } from "./services-mega-menu";
import { services } from "@/lib/site-content";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About us" },
  { href: "/news", label: "News & Foresight" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact us" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on page navigation
  useEffect(() => {
    setIsServicesOpen(false);
    setIsOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  const isHome = pathname === "/";
  const isTransparent = isHome && !isScrolled && !isOpen && !isServicesOpen;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          isTransparent
            ? "bg-transparent border-transparent text-white"
            : "bg-white/95 backdrop-blur-md text-slate-900 border-b border-slate-200/80 shadow-xs"
        }`}
        onMouseLeave={() => setIsServicesOpen(false)}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 sm:h-24 flex items-center justify-between gap-8">
          {/* Brand */}
          <Link
            href="/"
            className="flex items-center gap-4 group flex-shrink-0"
            aria-label="MO&A Home"
          >
            <div
              className={`relative w-24 h-10 sm:w-13 sm:h-12 flex items-center  rounded transition-colors ${
                isTransparent ? "bg-white/0 backdrop-blur-xs shadow-xs" : ""
              }`}
            >
              <Image
                src="/images/moa-logo.jpeg"
                alt="MO&A"
                width={112}
                height={47}
                className="object-contain w-auto h-auto max-h-12"
                priority
              />
            </div>
            <div
              className={`hidden sm:flex flex-col justify-center pl-3 sm:pl-4 border-l transition-colors ${
                isTransparent
                  ? "border-white/30 text-white"
                  : "border-slate-200 text-slate-900"
              }`}
            >
              <div className="flex items-center gap-1.5 leading-tight">
                <span className="font-bold text-sm sm:text-base tracking-tight">MO&amp;A Ltd</span>
              </div>
              <span
                className={`text-[10.5px] leading-tight font-medium ${
                  isTransparent ? "text-white/85" : "text-slate-600"
                }`}
              >
                Formerly Morgan Omonitan &amp; Abe Ltd
              </span>
              <span
                className={`text-[9px] uppercase tracking-wider font-semibold mt-0.5 ${
                  isTransparent ? "text-white/75" : "text-primary"
                }`}
              >
                Engineering, Consulting &amp; Development Firm
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center gap-7 text-sm lg:text-base font-semibold"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => {
              const isServicesLink = link.href === "/services";
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              if (isServicesLink) {
                return (
                  <div
                    key={link.href}
                    className="relative py-2"
                    onMouseEnter={() => setIsServicesOpen(true)}
                  >
                    <button
                      type="button"
                      onClick={() => setIsServicesOpen(!isServicesOpen)}
                      className={`inline-flex items-center gap-1 py-1 transition-colors cursor-pointer ${
                        isTransparent
                          ? isActive || isServicesOpen
                            ? "text-white font-bold"
                            : "text-white/85 hover:text-white"
                          : isActive || isServicesOpen
                            ? "text-primary font-bold"
                            : "text-slate-700 hover:text-primary"
                      }`}
                      aria-expanded={isServicesOpen}
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          isServicesOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>
                );
              }

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
                      : "text-slate-700 hover:text-primary"
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
              className={
                isTransparent
                  ? "text-white hover:bg-white/10"
                  : "text-slate-800 hover:bg-slate-100"
              }
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Desktop Services Mega Menu Dropdown */}
        <ServicesMegaMenu
          isOpen={isServicesOpen}
          onClose={() => setIsServicesOpen(false)}
        />

        {/* Mobile Drawer */}
        {isOpen && (
          <div className="md:hidden border-b border-slate-200 bg-white px-6 py-6 shadow-xl animate-in slide-in-from-top-2 duration-200 max-h-[85vh] overflow-y-auto">
            <div className="mb-4 pb-4 border-b border-slate-100">
              <span className="font-bold text-base text-slate-900 block leading-tight">MO&amp;A Ltd</span>
              <span className="text-xs text-slate-500 font-medium block mt-0.5">Formerly Morgan Omonitan &amp; Abe Ltd</span>
              <span className="text-[10px] uppercase font-semibold text-primary tracking-wider mt-1 block">
                Engineering, Consulting &amp; Development Firm
              </span>
            </div>
            <nav className="flex flex-col gap-2 text-base font-semibold text-slate-800">
              {navLinks.map((link) => {
                const isServicesLink = link.href === "/services";
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);

                if (isServicesLink) {
                  return (
                    <div key={link.href} className="flex flex-col">
                      <div className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-slate-100">
                        <Link
                          href="/services"
                          onClick={() => setIsOpen(false)}
                          className={isActive ? "text-primary font-bold" : "text-slate-800"}
                        >
                          Services
                        </Link>
                        <button
                          type="button"
                          onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                          aria-label="Toggle all services"
                          className="p-1 text-slate-500 hover:text-primary"
                        >
                          <ChevronDown
                            className={`h-5 w-5 transition-transform ${
                              mobileServicesOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      </div>

                      {/* Expandable Mobile Services Sub-list */}
                      {mobileServicesOpen && (
                        <div className="pl-4 pr-1 py-2 flex flex-col gap-1.5 border-l-2 border-slate-200 ml-3 my-1">
                          {services.map((service) => (
                            <Link
                              key={service.id}
                              href={`/services/${service.id}`}
                              onClick={() => setIsOpen(false)}
                              className="py-1.5 px-2 text-xs font-medium text-slate-600 hover:text-primary flex items-center justify-between"
                            >
                              <span>{service.title}</span>
                              <ArrowUpRight className="h-3 w-3 text-slate-400" />
                            </Link>
                          ))}
                          <Link
                            href="/services"
                            onClick={() => setIsOpen(false)}
                            className="mt-2 py-1.5 px-2 text-xs font-bold text-primary uppercase tracking-wider"
                          >
                            All 12 Services →
                          </Link>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`py-2 px-3 rounded-md transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary font-bold"
                        : "text-slate-700 hover:bg-slate-100"
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
