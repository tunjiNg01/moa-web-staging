"use client";

import React, { useState, useEffect } from "react";
import {
  Building2,
  Sparkles,
  Layers,
  Save,
  X,
  FileCheck,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Image as ImageIcon,
  CheckCircle2,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
  Button,
  Input,
  Label,
  Badge,
} from "@repo/ui";
import { ImageUploader, type UploadedImageItem } from "./image-uploader";
import type { AdminProject } from "@/lib/admin-data";

export interface ProjectFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project?: AdminProject | null;
  onSave: (project: AdminProject) => void;
}

const emptyProjectForm = {
  title: "",
  category: "Commercial" as AdminProject["category"],
  status: "Draft" as AdminProject["status"],
  featured: false,
  description: "",
  caseStudy: {
    system: "",
    focus: "",
    challenge: "",
    outcome: "",
  },
};

export function ProjectFormSheet({
  open,
  onOpenChange,
  project,
  onSave,
}: ProjectFormSheetProps) {
  const isEditing = Boolean(project);

  // 2-Step Wizard State
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState(emptyProjectForm);
  const [images, setImages] = useState<UploadedImageItem[]>([]);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title,
        category: project.category,
        status: project.status,
        featured: project.featured,
        description: project.description || "",
        caseStudy: {
          system: project.caseStudy.system || "",
          focus: project.caseStudy.focus || "",
          challenge: project.caseStudy.challenge || "",
          outcome: project.caseStudy.outcome || "",
        },
      });

      // Populate existing images
      const initialMedia: UploadedImageItem[] = [];
      if (project.image) {
        initialMedia.push({
          id: "hero_img",
          url: project.image,
          name: "Hero Cover Photograph",
          isHero: true,
          size: "Configured",
        });
      }
      if (project.galleryImages && project.galleryImages.length > 0) {
        project.galleryImages.forEach((imgUrl, idx) => {
          initialMedia.push({
            id: `gallery_${idx}`,
            url: imgUrl,
            name: `Architectural Detail #${idx + 1}`,
            isHero: false,
            size: "Configured",
          });
        });
      }
      setImages(initialMedia);
    } else {
      setFormData(emptyProjectForm);
      setImages([
        {
          id: "default_hero",
          url: "/images/structure-detail.jpg",
          name: "Default Structure Detail",
          isHero: true,
          size: "Stock",
        },
      ]);
    }
    setCurrentStep(1);
    setFormErrors({});
  }, [project, open]);

  const handleNextStep = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCurrentStep(2);
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = 0;
    }
  };

  const handlePrevStep = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCurrentStep(1);
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = 0;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields on final submission
    const errors: Record<string, string> = {};
    if (!formData.title.trim()) {
      errors.title = "Project title is required.";
    }
    if (!formData.caseStudy.system.trim()) {
      errors.system = "Structural system specification is required.";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setCurrentStep(1);
      if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTop = 0;
      }
      return;
    }

    // Determine hero image
    const heroItem = images.find((i) => i.isHero) || images[0];
    const heroImageUrl = heroItem ? heroItem.url : "/images/structure-detail.jpg";
    const galleryUrls = images.filter((i) => i.id !== heroItem?.id).map((i) => i.url);

    const savedProject: AdminProject = {
      id: project ? project.id : `proj_${Date.now()}`,
      title: formData.title.trim(),
      category: formData.category,
      status: formData.status,
      featured: formData.featured,
      description: formData.description.trim(),
      image: heroImageUrl,
      galleryImages: galleryUrls,
      caseStudy: {
        system: formData.caseStudy.system.trim(),
        focus: formData.caseStudy.focus.trim(),
        challenge: formData.caseStudy.challenge.trim(),
        outcome: formData.caseStudy.outcome.trim(),
      },
      updatedAt: new Date().toISOString().slice(0, 10),
    };

    onSave(savedProject);
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-xl md:max-w-2xl p-0 flex flex-col h-full bg-background border-l border-border overflow-hidden"
      >
        <form onSubmit={handleSubmit} className="flex flex-col h-full min-h-0">
          {/* Header */}
          <SheetHeader className="p-6 border-b border-border bg-card/60 backdrop-blur-xs shrink-0 z-10">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                Portfolio Management
              </span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">
                {isEditing ? "Editing Case Study" : "New Requisition"}
              </span>
            </div>
            <SheetTitle className="text-xl font-serif font-bold text-foreground flex items-center gap-2">
              <Building2 className="size-5 text-primary" />
              <span>{isEditing ? "Edit Case Study" : "Create New Project"}</span>
            </SheetTitle>
            <SheetDescription className="text-xs text-muted-foreground mt-0.5">
              Specify structural engineering case study metrics and hero visual assets.
            </SheetDescription>

            {/* 2-Step Progress Indicator */}
            <div className="grid grid-cols-2 gap-2 pt-3">
              <button
                type="button"
                onClick={handlePrevStep}
                className={`flex items-center gap-2 p-2.5 rounded-xs border text-left transition-all ${
                  currentStep === 1
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-muted/30 text-muted-foreground hover:text-foreground"
                }`}
              >
                <div
                  className={`size-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    currentStep === 1
                      ? "bg-primary text-white"
                      : "bg-muted-foreground/30 text-foreground"
                  }`}
                >
                  1
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold leading-tight">Details</div>
                  <div className="text-[10px] opacity-80 truncate">Specifications</div>
                </div>
              </button>

              <button
                type="button"
                onClick={handleNextStep}
                className={`flex items-center gap-2 p-2.5 rounded-xs border text-left transition-all ${
                  currentStep === 2
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-muted/30 text-muted-foreground hover:text-foreground"
                }`}
              >
                <div
                  className={`size-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    currentStep === 2
                      ? "bg-primary text-white"
                      : "bg-muted-foreground/30 text-foreground"
                  }`}
                >
                  2
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold leading-tight">Media &amp; Images</div>
                  <div className="text-[10px] opacity-80 truncate">
                    {images.length} {images.length === 1 ? "file" : "files"}
                  </div>
                </div>
              </button>
            </div>
          </SheetHeader>

          {/* Form Body (Scrollable) */}
          <div ref={scrollAreaRef} className="p-6 space-y-6 flex-1 overflow-y-auto">
            {/* STEP 1: Project & Engineering Specifications */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-in fade-in-50 duration-200">
                {/* Project Identification */}
                <div className="space-y-4">
                  <div className="border-b border-border pb-1.5 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                      1. Project Identification
                    </span>
                    <span className="text-[11px] text-muted-foreground">Required fields *</span>
                  </div>

                  {/* Title */}
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold">
                      Project Title <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      value={formData.title}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, title: e.target.value }))
                      }
                      placeholder="e.g., National Infrastructure Headquarters"
                      className={`h-9 text-xs rounded-xs ${
                        formErrors.title ? "border-destructive focus-visible:ring-destructive" : ""
                      }`}
                    />
                    {formErrors.title && (
                      <span className="text-[11px] text-destructive flex items-center gap-1">
                        <AlertCircle className="size-3" />
                        {formErrors.title}
                      </span>
                    )}
                  </div>

                  {/* Category & Status Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold">Sector Category</Label>
                      <select
                        value={formData.category}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            category: e.target.value as AdminProject["category"],
                          }))
                        }
                        className="w-full h-9 px-3 py-1 bg-background border border-border rounded-xs text-xs text-foreground focus:outline-hidden focus:ring-1 focus:ring-primary"
                      >
                        <option value="Commercial">Commercial</option>
                        <option value="Public & cultural">Public &amp; cultural</option>
                        <option value="Residential">Residential</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold">Publication Status</Label>
                      <select
                        value={formData.status}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            status: e.target.value as AdminProject["status"],
                          }))
                        }
                        className="w-full h-9 px-3 py-1 bg-background border border-border rounded-xs text-xs text-foreground focus:outline-hidden focus:ring-1 focus:ring-primary"
                      >
                        <option value="Draft">Draft (In Review)</option>
                        <option value="Published">Published (Live)</option>
                        <option value="Archived">Archived</option>
                      </select>
                    </div>
                  </div>

                  {/* Featured Checkbox */}
                  <label className="flex items-center gap-2.5 p-3 rounded-xs border border-border bg-card/40 cursor-pointer hover:bg-muted/40 transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, featured: e.target.checked }))
                      }
                      className="rounded-xs size-4 accent-primary"
                    />
                    <div className="text-xs">
                      <span className="font-semibold text-foreground">Feature in Executive Portfolio</span>
                      <p className="text-[11px] text-muted-foreground">
                        Display prominently on the public homepage and admin dashboard overview.
                      </p>
                    </div>
                  </label>
                </div>

                {/* Structural Engineering Specifications */}
                <div className="space-y-4 pt-2">
                  <div className="border-b border-border pb-1.5 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                      2. Structural Engineering Specifications
                    </span>
                    <span className="text-[11px] text-muted-foreground">Technical Content</span>
                  </div>

                  {/* Structural System */}
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold">
                      Structural System <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      value={formData.caseStudy.system}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          caseStudy: { ...prev.caseStudy, system: e.target.value },
                        }))
                      }
                      placeholder="e.g., Post-Tensioned Concrete & Structural Steel"
                      className={`h-9 text-xs rounded-xs ${
                        formErrors.system ? "border-destructive focus-visible:ring-destructive" : ""
                      }`}
                    />
                    {formErrors.system && (
                      <span className="text-[11px] text-destructive flex items-center gap-1">
                        <AlertCircle className="size-3" />
                        {formErrors.system}
                      </span>
                    )}
                  </div>

                  {/* Engineering Focus */}
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold">Engineering Focus</Label>
                    <Input
                      value={formData.caseStudy.focus}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          caseStudy: { ...prev.caseStudy, focus: e.target.value },
                        }))
                      }
                      placeholder="e.g., Seismic Resilience & Long-Span Cantilever Geometry"
                      className="h-9 text-xs rounded-xs"
                    />
                  </div>

                  {/* Executive Description */}
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold">Executive Description</Label>
                    <textarea
                      rows={2}
                      value={formData.description}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, description: e.target.value }))
                      }
                      placeholder="High-level engineering overview of the architectural development..."
                      className="w-full p-2.5 bg-background border border-border rounded-xs text-xs text-foreground focus:outline-hidden focus:ring-1 focus:ring-primary resize-y"
                    />
                  </div>

                  {/* Challenge & Outcome */}
                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold">Engineering Challenge</Label>
                      <textarea
                        rows={2}
                        value={formData.caseStudy.challenge}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            caseStudy: { ...prev.caseStudy, challenge: e.target.value },
                          }))
                        }
                        placeholder="Specific site, foundation, or aerodynamic constraints encountered..."
                        className="w-full p-2.5 bg-background border border-border rounded-xs text-xs text-foreground focus:outline-hidden focus:ring-1 focus:ring-primary resize-y"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold">Structural Outcome &amp; Impact</Label>
                      <textarea
                        rows={2}
                        value={formData.caseStudy.outcome}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            caseStudy: { ...prev.caseStudy, outcome: e.target.value },
                          }))
                        }
                        placeholder="Measurable carbon reduction, deflection mitigation, or performance metrics achieved..."
                        className="w-full p-2.5 bg-background border border-border rounded-xs text-xs text-foreground focus:outline-hidden focus:ring-1 focus:ring-primary resize-y"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Dedicated Image Uploading & Stacking */}
            {currentStep === 2 && (
              <div className="space-y-4 animate-in fade-in-50 duration-200">
                <div className="p-3.5 rounded-xs bg-muted/40 border border-border flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Building2 className="size-4 text-primary" />
                    <div>
                      <span className="font-semibold text-foreground">{formData.title || "Untitled Project"}</span>
                      <span className="text-muted-foreground ml-1.5">• {formData.category}</span>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-[10px] text-primary border-primary/30">
                    Step 2 of 2
                  </Badge>
                </div>

                {/* Multi-Image Uploader with Stacked List at Bottom */}
                <ImageUploader
                  images={images}
                  onChange={setImages}
                  label="Upload Case Study Photography"
                  helperText="Drop high-resolution photographs here. Files will stack below with the hero photo marked."
                />
              </div>
            )}
          </div>

          {/* Footer Actions (Pinned at bottom) */}
          <SheetFooter className="p-4 sm:p-6 border-t border-border bg-card/60 backdrop-blur-xs flex flex-row items-center justify-between gap-3 shrink-0 z-10">
            {currentStep === 1 ? (
              <>
                <SheetClose asChild>
                  <Button type="button" variant="outline" size="sm" className="h-9 text-xs rounded-xs">
                    Cancel
                  </Button>
                </SheetClose>

                <Button
                  type="button"
                  size="sm"
                  onClick={handleNextStep}
                  className="h-9 text-xs rounded-xs gap-1.5 shadow-xs ml-auto"
                >
                  <span>Continue to Image Upload</span>
                  <ArrowRight className="size-3.5" />
                </Button>
              </>
            ) : (
              <>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handlePrevStep}
                  className="h-9 text-xs rounded-xs gap-1.5"
                >
                  <ArrowLeft className="size-3.5" />
                  <span>Back to Details</span>
                </Button>

                <Button
                  type="submit"
                  size="sm"
                  className="h-9 text-xs rounded-xs gap-1.5 shadow-xs"
                >
                  <Save className="size-3.5" />
                  <span>{isEditing ? "Save Changes" : "Create Project"}</span>
                </Button>
              </>
            )}
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
