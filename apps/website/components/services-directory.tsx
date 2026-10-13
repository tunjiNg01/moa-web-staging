"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@repo/ui";
import { services, Service } from "@/lib/site-content";

const categories = [
  "All",
  "Pre-Construction & Feasibility",
  "Design & Engineering",
  "Construction & Quality Governance",
  "Inspections & Expert Advisory",
] as const;

export function ServicesDirectory() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredServices =
    selectedCategory === "All"
      ? services
      : services.filter((s) => s.category === selectedCategory);

  return (
    <div>
      {/* Category Filter Tabs */}
      <div
        className="flex flex-wrap gap-2.5 mb-12 sm:mb-16"
        role="tablist"
        aria-label="Service categories"
      >
        {categories.map((category) => {
          const isSelected = selectedCategory === category;
          return (
            <Button
              key={category}
              variant={isSelected ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              aria-pressed={isSelected}
              className={
                isSelected
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "border-border text-foreground hover:bg-secondary"
              }
            >
              {category}
            </Button>
          );
        })}
      </div>

      {/* 3-Column Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
        {filteredServices.map((service, index) => (
          <article
            key={service.id}
            id={service.id}
            className="border border-border bg-card rounded-xs p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:border-slate-400 transition-all duration-300 scroll-mt-28"
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="text-primary text-xs font-mono font-bold">
                  {String(index + 1).padStart(2, "0")} /
                </span>
                <span className="text-[10px] uppercase tracking-wider font-semibold bg-secondary px-2.5 py-0.5 rounded-xs text-muted-foreground">
                  {service.category}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-medium tracking-tight text-foreground hover:text-primary transition-colors leading-snug mb-3">
                <Link href={`/services/${service.id}`}>{service.title}</Link>
              </h2>

              <p className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                {service.description}
              </p>

              <div className="space-y-2 mb-8 pt-4 border-t border-border/60">
                <span className="text-[11px] uppercase tracking-wider font-bold text-foreground block">
                  Core Capabilities
                </span>
                <ul className="text-xs text-muted-foreground space-y-1.5 pl-4 list-disc">
                  {service.details.slice(0, 3).map((detail, dIdx) => (
                    <li key={dIdx}>{detail}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-border flex items-center justify-between gap-3">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="w-full font-semibold border-border hover:bg-secondary justify-between text-xs sm:text-sm"
              >
                <Link href={`/services/${service.id}`}>
                  <span>Explore Service</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
