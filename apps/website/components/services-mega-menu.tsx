"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Button } from "@repo/ui";
import { services } from "@/lib/site-content";

interface ServicesMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ServicesMegaMenu({ isOpen, onClose }: ServicesMegaMenuProps) {
  if (!isOpen) return null;

  return (
    <div
      role="region"
      aria-label="Services Mega Menu"
      className="absolute top-full left-0 right-0 w-full bg-white text-slate-900 shadow-2xl border-t border-slate-200/80 border-b border-slate-300 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
      onMouseLeave={onClose}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-8 sm:py-10">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-primary rounded-full" />
            <span className="text-xs uppercase tracking-widest font-bold text-slate-600">
              Our Professional Services
            </span>
          </div>
          <span className="text-xs text-muted-foreground font-mono hidden sm:inline-block">
            12 Engineering Disciplines
          </span>
        </div>

        {/* 4-Column Grid of 12 Services matching Reference Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-5">
          {services.map((service) => (
            <Link
              key={service.id}
              href={`/services/${service.id}`}
              onClick={onClose}
              className="group flex items-center justify-between gap-3 pb-3 border-b border-slate-200/90 hover:border-primary transition-all duration-200"
            >
              <span className="font-semibold text-sm lg:text-[15px] text-slate-900 group-hover:text-primary transition-colors leading-snug">
                {service.title}
              </span>
              <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
            </Link>
          ))}
        </div>

        {/* Bottom CTA Row (Matching Reference Screenshot) */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
            From early feasibility through structural analysis, construction supervision and expert forensics across Nigeria &amp; West Africa.
          </p>

          <Button
            asChild
            size="default"
            className="bg-primary text-white hover:bg-primary/90 font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-none shadow-md shrink-0 transition-transform active:scale-95"
          >
            <Link href="/services" onClick={onClose} className="inline-flex items-center gap-2">
              See All Services <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
