"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import {
  Building2,
  ArrowLeft,
  Edit3,
  ExternalLink,
  Plus,
  CheckCircle2,
  Eye,
  EyeOff,
  Star,
  Trash2,
  HardHat,
  Filter,
  Check,
  Calendar,
  Layers,
  Sparkles,
  Info,
  Clock,
  Shield,
  UploadCloud,
  Maximize2,
  ZoomIn,
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
import {
  initialProjects,
  type AdminProject,
  type ProjectMediaItem,
} from "@/lib/admin-data";
import { ProjectFormSheet } from "@/components/project-form-sheet";
import { FieldUpdateLinkModal } from "@/components/field-update-link-modal";
import { ImageLightboxModal } from "@/components/image-lightbox-modal";

interface ProjectDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const resolvedParams = use(params);
  const projectId = resolvedParams.id;

  // Find project in initial data or fallback
  const baseProject = initialProjects.find((p) => p.id === projectId) || initialProjects[0]!;

  const [project, setProject] = useState<AdminProject>(baseProject);
  const [mediaItems, setMediaItems] = useState<ProjectMediaItem[]>(
    baseProject.mediaItems || [
      {
        id: "media_hero_default",
        url: baseProject.image,
        title: "Principal Case Study Cover",
        isHero: true,
        isPublished: true,
        stage: "Completion",
        uploadedBy: "Admin",
        uploadedAt: baseProject.updatedAt,
      },
    ]
  );

  const [filterTab, setFilterTab] = useState<"all" | "published" | "field" | "pending">("all");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeLightboxIndex, setActiveLightboxIndex] = useState(0);

  const handleOpenLightbox = (id: string) => {
    const idx = mediaItems.findIndex((item) => item.id === id);
    if (idx !== -1) {
      setActiveLightboxIndex(idx);
      setIsLightboxOpen(true);
    }
  };

  // Filter logic
  const filteredMedia = mediaItems.filter((item) => {
    if (filterTab === "published") return item.isPublished;
    if (filterTab === "field") return Boolean(item.uploadedBy?.toLowerCase().includes("engr") || item.fieldNote);
    if (filterTab === "pending") return !item.isPublished;
    return true;
  });

  const publishedCount = mediaItems.filter((i) => i.isPublished).length;
  const fieldCount = mediaItems.filter((i) => i.uploadedBy?.toLowerCase().includes("engr") || i.fieldNote).length;

  // Toggle individual image publish status
  const handleTogglePublish = (id: string) => {
    setMediaItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isPublished: !item.isPublished } : item
      )
    );
  };

  // Set primary hero image
  const handleSetHero = (id: string) => {
    setMediaItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          // Also ensure hero is published
          return { ...item, isHero: true, isPublished: true };
        }
        return { ...item, isHero: false };
      })
    );
    const newHero = mediaItems.find((i) => i.id === id);
    if (newHero) {
      setProject((prev) => ({ ...prev, image: newHero.url }));
    }
  };

  // Delete image
  const handleDeleteMedia = (id: string) => {
    setMediaItems((prev) => prev.filter((item) => item.id !== id));
    setSelectedIds((prev) => prev.filter((i) => i !== id));
  };

  // Bulk publish selected
  const handleBulkPublish = (publish: boolean) => {
    setMediaItems((prev) =>
      prev.map((item) =>
        selectedIds.includes(item.id) ? { ...item, isPublished: publish } : item
      )
    );
    setSelectedIds([]);
  };

  // Selection toggle
  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === filteredMedia.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredMedia.map((i) => i.id));
    }
  };

  // Simulate file upload from admin
  const handleAddMediaFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newItems: ProjectMediaItem[] = [];
    for (let i = 0; i < e.target.files.length; i++) {
      const file = e.target.files[i];
      if (!file) continue;
      const previewUrl = URL.createObjectURL(file);
      newItems.push({
        id: `media_${Date.now()}_${i}`,
        url: previewUrl,
        title: file.name.replace(/\.[^/.]+$/, ""),
        isHero: false,
        isPublished: true, // Auto-publish admin uploads
        stage: "Superstructure",
        uploadedBy: "Admin Portal",
        uploadedAt: new Date().toISOString().slice(0, 10),
      });
    }
    setMediaItems((prev) => [...prev, ...newItems]);
    e.target.value = "";
  };

  return (
    <div className="space-y-8">
      {/* 1. Executive Top Header & Breadcrumb */}
      <div className="space-y-3 pb-6 border-b border-border">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Link
            href="/projects"
            className="hover:text-foreground flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="size-3" />
            <span>Projects Portfolio</span>
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium truncate max-w-xs">
            {project.title}
          </span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                {project.category}
              </span>
              <span className="text-xs text-muted-foreground">•</span>
              <Badge
                variant="outline"
                className={`text-[10px] font-medium ${
                  project.status === "Published"
                    ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30"
                    : "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30"
                }`}
              >
                {project.status === "Published" ? "Live on Website" : "Draft in Review"}
              </Badge>
              {project.featured && (
                <Badge variant="outline" className="text-[10px] bg-primary/10 text-primary border-primary/20">
                  Featured Case
                </Badge>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
              {project.title}
            </h1>
            <p className="text-xs text-muted-foreground mt-1 max-w-2xl">
              {project.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsLinkModalOpen(true)}
              className="h-9 text-xs gap-1.5 rounded-xs"
            >
              <HardHat className="size-3.5 text-primary" />
              <span>Generate Field Update Link</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditOpen(true)}
              className="h-9 text-xs gap-1.5 rounded-xs"
            >
              <Edit3 className="size-3.5" />
              <span>Edit Details</span>
            </Button>

            <a
              href={`http://localhost:3000/projects/${project.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="sm" className="h-9 text-xs gap-1.5 rounded-xs shadow-xs">
                <span>View Live</span>
                <ExternalLink className="size-3.5" />
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Engineering Case Study Specifications Summary */}
      <div className="bg-card border border-border rounded-xs p-5 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2">
            <Building2 className="size-4 text-primary" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Structural Engineering Specifications
            </h2>
          </div>
          <span className="text-[11px] text-muted-foreground">
            Updated {project.updatedAt}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase text-muted-foreground">
              Structural System
            </span>
            <div className="font-semibold text-foreground">
              {project.caseStudy.system}
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase text-muted-foreground">
              Engineering Focus
            </span>
            <div className="font-semibold text-foreground">
              {project.caseStudy.focus}
            </div>
          </div>

          <div className="space-y-1 md:col-span-2">
            <span className="text-[10px] font-bold uppercase text-muted-foreground">
              Engineering Challenge
            </span>
            <p className="text-muted-foreground text-[11px] leading-relaxed">
              {project.caseStudy.challenge}
            </p>
          </div>
        </div>

        <div className="pt-2 border-t border-border/60">
          <span className="text-[10px] font-bold uppercase text-muted-foreground">
            Verified Structural Outcome
          </span>
          <p className="text-xs text-foreground mt-0.5 leading-relaxed font-medium">
            {project.caseStudy.outcome}
          </p>
        </div>
      </div>

      {/* 3. Media & Photography Grid Section */}
      <div className="space-y-4">
        {/* Section Header & Upload action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-serif font-bold text-foreground flex items-center gap-2">
              <span>Visual Gallery &amp; Field Stream</span>
              <Badge variant="outline" className="text-xs">
                {mediaItems.length} Photographs
              </Badge>
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Select which construction photographs and drawings are published to the public website case study.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <label className="cursor-pointer">
              <input
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp"
                onChange={handleAddMediaFiles}
                className="hidden"
              />
              <span className="inline-flex items-center gap-1.5 h-8 px-3 rounded-xs bg-primary text-white text-xs font-medium hover:bg-primary/90 transition-colors shadow-xs">
                <Plus className="size-3.5" />
                <span>Upload Photos</span>
              </span>
            </label>
          </div>
        </div>

        {/* Filter Tabs & Bulk Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-card p-3 border border-border rounded-xs">
          {/* Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto">
            <button
              onClick={() => setFilterTab("all")}
              className={`px-3 py-1 rounded-xs text-xs font-medium whitespace-nowrap transition-colors ${
                filterTab === "all"
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              All Assets ({mediaItems.length})
            </button>
            <button
              onClick={() => setFilterTab("published")}
              className={`px-3 py-1 rounded-xs text-xs font-medium whitespace-nowrap transition-colors ${
                filterTab === "published"
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              Published on Site ({publishedCount})
            </button>
            <button
              onClick={() => setFilterTab("field")}
              className={`px-3 py-1 rounded-xs text-xs font-medium whitespace-nowrap transition-colors ${
                filterTab === "field"
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              Field Progress Stream ({fieldCount})
            </button>
            <button
              onClick={() => setFilterTab("pending")}
              className={`px-3 py-1 rounded-xs text-xs font-medium whitespace-nowrap transition-colors ${
                filterTab === "pending"
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              Internal Only ({mediaItems.length - publishedCount})
            </button>
          </div>

          {/* Bulk Action Controls */}
          {selectedIds.length > 0 && (
            <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-border">
              <span className="text-xs text-muted-foreground font-medium">
                {selectedIds.length} selected
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkPublish(true)}
                className="h-7 text-xs px-2.5 rounded-xs gap-1 text-emerald-600 border-emerald-500/30 hover:bg-emerald-50 dark:hover:bg-emerald-950/20"
              >
                <Eye className="size-3" />
                <span>Publish</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkPublish(false)}
                className="h-7 text-xs px-2.5 rounded-xs gap-1 text-muted-foreground hover:text-foreground"
              >
                <EyeOff className="size-3" />
                <span>Unpublish</span>
              </Button>
            </div>
          )}
        </div>

        {/* 4. Interactive Images Grid */}
        {filteredMedia.length === 0 ? (
          <div className="p-12 border border-dashed border-border rounded-xs text-center bg-card">
            <UploadCloud className="size-8 text-muted-foreground/60 mx-auto mb-2" />
            <h3 className="text-sm font-semibold text-foreground">No photographs found</h3>
            <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
              No images match this filter. Upload new photography or share the Field Update Link with engineers on site.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredMedia.map((item) => (
              <div
                key={item.id}
                className={`group relative rounded-xs border overflow-hidden bg-card transition-all flex flex-col justify-between ${
                  item.isHero
                    ? "ring-2 ring-primary border-primary"
                    : item.isPublished
                    ? "border-emerald-500/40 shadow-2xs"
                    : "border-border opacity-90 hover:opacity-100"
                }`}
              >
                {/* Image Container with Select Overlay & Click-to-Zoom */}
                <div
                  onClick={() => handleOpenLightbox(item.id)}
                  className="relative aspect-video w-full bg-muted overflow-hidden cursor-pointer"
                  title="Click to view full-size photograph"
                >
                  <img
                    src={item.url}
                    alt={item.title || "Project visual"}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Centered Hover Zoom Icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-black/25">
                    <div className="size-9 rounded-full bg-black/60 text-white flex items-center justify-center backdrop-blur-xs shadow-md transform scale-90 group-hover:scale-100 transition-transform">
                      <ZoomIn className="size-4" />
                    </div>
                  </div>

                  {/* Top Overlay Badges & Checkbox */}
                  <div className="absolute inset-x-0 top-0 p-2.5 flex items-start justify-between bg-gradient-to-b from-black/60 to-transparent z-10">
                    {/* Multi-select Checkbox */}
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(item.id)}
                      onClick={(e) => e.stopPropagation()}
                      onChange={() => toggleSelect(item.id)}
                      className="size-4 rounded-xs accent-primary cursor-pointer shadow-xs"
                      title="Select for bulk action"
                    />

                    <div className="flex items-center gap-1">
                      {item.isHero && (
                        <span className="px-1.5 py-0.5 rounded-xs bg-primary text-white text-[10px] font-bold flex items-center gap-1 shadow-xs">
                          <Star className="size-2.5 fill-white text-white" />
                          <span>Hero</span>
                        </span>
                      )}

                      <span
                        className={`px-1.5 py-0.5 rounded-xs text-[10px] font-medium backdrop-blur-xs ${
                          item.isPublished
                            ? "bg-emerald-600/90 text-white font-semibold"
                            : "bg-black/60 text-white/80"
                        }`}
                      >
                        {item.isPublished ? "Published" : "Internal"}
                      </span>
                    </div>
                  </div>

                  {/* Stage Tag Overlay */}
                  {item.stage && (
                    <div className="absolute bottom-2 left-2 z-10">
                      <span className="px-1.5 py-0.5 rounded-xs bg-background/90 text-foreground text-[10px] font-mono shadow-xs backdrop-blur-xs">
                        {item.stage}
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Info & Controls */}
                <div className="p-3 space-y-2.5 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="text-xs font-semibold text-foreground line-clamp-1">
                      {item.title || "Project Asset"}
                    </div>

                    {item.fieldNote && (
                      <p className="text-[11px] text-muted-foreground line-clamp-2 italic bg-muted/30 p-1.5 rounded-xs border border-border/40">
                        &ldquo;{item.fieldNote}&rdquo;
                      </p>
                    )}

                    <div className="text-[10px] text-muted-foreground flex items-center justify-between pt-1">
                      <span>{item.uploadedBy || "Editorial"}</span>
                      <span>{item.uploadedAt}</span>
                    </div>
                  </div>

                  {/* Publishing Toggle & Actions */}
                  <div className="pt-2 border-t border-border flex items-center justify-between gap-2">
                    {/* Publish Switch / Toggle Button */}
                    <button
                      type="button"
                      onClick={() => handleTogglePublish(item.id)}
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-xs text-[11px] font-medium transition-colors ${
                        item.isPublished
                          ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20"
                          : "bg-muted text-muted-foreground border border-border hover:text-foreground"
                      }`}
                    >
                      {item.isPublished ? (
                        <>
                          <Check className="size-3" />
                          <span>Public</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="size-3" />
                          <span>Draft</span>
                        </>
                      )}
                    </button>

                    <div className="flex items-center gap-1">
                      {!item.isHero && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSetHero(item.id)}
                          className="h-6 px-1.5 text-[10px] text-muted-foreground hover:text-primary gap-1"
                          title="Set as Principal Case Study Cover"
                        >
                          <Star className="size-3" />
                          <span>Hero</span>
                        </Button>
                      )}

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleOpenLightbox(item.id)}
                        className="h-6 px-1.5 text-[10px] text-muted-foreground hover:text-foreground gap-1"
                        title="View photograph in full-size lightbox"
                      >
                        <Maximize2 className="size-3" />
                        <span>Zoom</span>
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteMedia(item.id)}
                        className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                        title="Remove image"
                      >
                        <Trash2 className="size-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Form Sheet */}
      <ProjectFormSheet
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        project={project}
        onSave={(updated) => setProject(updated)}
      />

      {/* Field Update Link Modal */}
      <FieldUpdateLinkModal
        open={isLinkModalOpen}
        onOpenChange={setIsLinkModalOpen}
        project={project}
      />

      {/* High-Resolution Fullscreen Image Lightbox Modal */}
      <ImageLightboxModal
        open={isLightboxOpen}
        onOpenChange={setIsLightboxOpen}
        mediaItems={mediaItems}
        currentIndex={activeLightboxIndex}
        onNavigate={setActiveLightboxIndex}
        onTogglePublish={handleTogglePublish}
        onSetHero={handleSetHero}
      />
    </div>
  );
}

