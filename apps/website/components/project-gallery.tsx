"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@repo/ui";
import { projects } from "@/lib/site-content";

const categories = [
  "All",
  "Public & cultural",
  "Commercial",
  "Residential",
] as const;

export function ProjectGallery({
  filterable = false,
}: {
  filterable?: boolean;
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <div>
      {filterable && (
        <div
          className="flex flex-wrap gap-2.5 mb-10"
          role="region"
          aria-label="Project categories filter"
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
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <Link
            key={project.id}
            href={`/projects/${project.id}`}
            className="group block rounded-none text-foreground focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-4"
            aria-label={`View ${project.title} case study`}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute bottom-0 right-0 p-3.5 bg-background text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <ArrowUpRight className="h-5 w-5" />
              </span>
            </div>

            <p className="text-[11px] uppercase tracking-wider text-muted-foreground mt-5 mb-2 font-medium">
              {project.category}
            </p>
            <h3 className="text-xl sm:text-2xl font-medium tracking-tight group-hover:text-primary transition-colors">
              {project.title}
            </h3>
          </Link>
        ))}
      </div>

      <p className="text-xs text-muted-foreground mt-8">
        Illustrative concepts. Project photography and case studies to follow.
      </p>
    </div>
  );
}
