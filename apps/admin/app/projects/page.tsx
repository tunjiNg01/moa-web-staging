"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Building2,
  Plus,
  Search,
  Filter,
  ExternalLink,
  Edit3,
  MoreVertical,
  CheckCircle2,
  Clock,
  Layers,
  Sparkles,
} from "lucide-react";
import {
  Button,
  Badge,
  Input,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui";
import { initialProjects, type AdminProject } from "@/lib/admin-data";

export default function ProjectsAdminPage() {
  const [projects, setProjects] = useState<AdminProject[]>(initialProjects);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Commercial", "Public & cultural", "Residential"];

  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      selectedCategory === "All" || project.category === selectedCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.caseStudy.system.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.caseStudy.focus.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Portfolio
            </span>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground">Engineering Case Studies</span>
          </div>
          <h1 className="text-2xl font-serif font-bold text-foreground">
            Projects &amp; Case Studies
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage architectural and structural projects, engineering system specifications, and public case studies.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button size="sm" className="h-9 gap-2 text-xs rounded-xs">
            <Plus className="size-4" />
            <span>Create New Project</span>
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-card p-3 border border-border rounded-xs">
        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xs text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search systems, titles, focus..."
            className="h-8 pl-8 text-xs rounded-xs"
          />
        </div>
      </div>

      {/* Projects Table / Listing */}
      <div className="bg-card border border-border rounded-xs overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/50 text-muted-foreground uppercase text-[10px] tracking-wider font-semibold">
                <th className="py-3 px-4">Project Title &amp; Sector</th>
                <th className="py-3 px-4">Structural System</th>
                <th className="py-3 px-4">Engineering Focus</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Last Updated</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-muted-foreground">
                    No engineering projects found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredProjects.map((project) => (
                  <tr
                    key={project.id}
                    className="hover:bg-muted/30 transition-colors group"
                  >
                    <td className="py-4 px-4 font-medium">
                      <div className="flex items-center gap-3">
                        <div className="size-9 rounded-xs bg-muted border border-border flex items-center justify-center shrink-0 text-muted-foreground group-hover:border-primary/40 group-hover:text-primary transition-colors">
                          <Building2 className="size-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-foreground text-sm font-serif">
                            {project.title}
                          </div>
                          <div className="text-[11px] text-muted-foreground font-sans">
                            {project.category} {project.featured && "• Featured"}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4 text-foreground">
                      <div className="font-medium">{project.caseStudy.system}</div>
                      <div className="text-[11px] text-muted-foreground line-clamp-1">
                        {project.description}
                      </div>
                    </td>

                    <td className="py-4 px-4 text-muted-foreground">
                      <span className="px-2 py-0.5 rounded-xs bg-muted border border-border text-[11px] text-foreground font-medium">
                        {project.caseStudy.focus}
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-xs text-[11px] font-medium ${
                          project.status === "Published"
                            ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20"
                            : "bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20"
                        }`}
                      >
                        <span
                          className={`size-1.5 rounded-full ${
                            project.status === "Published"
                              ? "bg-emerald-500"
                              : "bg-amber-500"
                          }`}
                        />
                        {project.status}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-muted-foreground text-[11px]">
                      {project.updatedAt}
                    </td>

                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`http://localhost:3000/projects/${project.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="View on Live Site"
                          className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-xs transition-colors"
                        >
                          <ExternalLink className="size-3.5" />
                        </a>

                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 text-xs px-2.5 rounded-xs gap-1"
                        >
                          <Edit3 className="size-3" />
                          <span>Edit</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
