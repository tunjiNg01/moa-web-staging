"use client";

import React, { useState, useEffect } from "react";
import {
  Newspaper,
  Save,
  X,
  AlertCircle,
  Calendar,
  User,
  Clock,
  Sparkles,
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
} from "@repo/ui";
import { ImageUploader, type UploadedImageItem } from "./image-uploader";
import type { AdminNewsArticle } from "@/lib/admin-data";

export interface ArticleFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  article?: AdminNewsArticle | null;
  onSave: (article: AdminNewsArticle) => void;
}

const emptyArticleForm = {
  title: "",
  slug: "",
  category: "Foresight" as AdminNewsArticle["category"],
  status: "Draft" as AdminNewsArticle["status"],
  summary: "",
  publishDate: new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }),
  readTime: "5 min read",
  featured: false,
  authorName: "Engr. Funsho Morgan",
  authorRole: "Principal Partner",
};

export function ArticleFormSheet({
  open,
  onOpenChange,
  article,
  onSave,
}: ArticleFormSheetProps) {
  const isEditing = Boolean(article);

  const [formData, setFormData] = useState(emptyArticleForm);
  const [images, setImages] = useState<UploadedImageItem[]>([]);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (article) {
      setFormData({
        title: article.title,
        slug: article.slug,
        category: article.category,
        status: article.status,
        summary: article.summary,
        publishDate: article.publishDate,
        readTime: article.readTime,
        featured: article.featured,
        authorName: article.author.name,
        authorRole: article.author.role,
      });
      setImages([
        {
          id: "article_cover",
          url: article.image,
          name: "Cover Photography",
          isHero: true,
          size: "Configured",
        },
      ]);
    } else {
      setFormData(emptyArticleForm);
      setImages([
        {
          id: "default_cover",
          url: "/images/news-urban-foresight.jpg",
          name: "Default Cover Photo",
          isHero: true,
          size: "Stock",
        },
      ]);
    }
    setFormErrors({});
  }, [article, open]);

  // Auto-generate slug when title changes in create mode
  const handleTitleChange = (val: string) => {
    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: !isEditing
        ? val
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, "")
        : prev.slug,
    }));
  };

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.title.trim()) {
      errors.title = "Article title is required.";
    }
    if (!formData.summary.trim()) {
      errors.summary = "Executive summary is required.";
    }
    if (!formData.authorName.trim()) {
      errors.author = "Author name is required.";
    }
    if (images.length === 0) {
      errors.image = "Please upload or assign a cover photo.";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const coverItem = images.find((i) => i.isHero) || images[0];
    const coverUrl = coverItem ? coverItem.url : "/images/news-urban-foresight.jpg";

    const savedArticle: AdminNewsArticle = {
      id: article ? article.id : `art_${Date.now()}`,
      slug:
        formData.slug.trim() ||
        formData.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, ""),
      title: formData.title.trim(),
      category: formData.category,
      status: formData.status,
      summary: formData.summary.trim(),
      publishDate: formData.publishDate.trim() || "Drafting",
      readTime: formData.readTime.trim() || "4 min read",
      image: coverUrl,
      featured: formData.featured,
      author: {
        name: formData.authorName.trim(),
        role: formData.authorRole.trim() || "Author",
      },
      viewsCount: article ? article.viewsCount : 0,
    };

    onSave(savedArticle);
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-xl md:max-w-2xl overflow-y-auto p-0 flex flex-col justify-between bg-background border-l border-border"
      >
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          {/* Header */}
          <SheetHeader className="p-6 border-b border-border bg-card/60 backdrop-blur-xs sticky top-0 z-10">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                Editorial Room
              </span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">
                {isEditing ? "Editing Publication" : "New Manuscript"}
              </span>
            </div>
            <SheetTitle className="text-xl font-serif font-bold text-foreground flex items-center gap-2">
              <Newspaper className="size-5 text-primary" />
              <span>{isEditing ? "Edit Editorial Article" : "Draft New Article"}</span>
            </SheetTitle>
            <SheetDescription className="text-xs text-muted-foreground mt-0.5">
              Draft, schedule, and assign editorial foresight and cover visual assets.
            </SheetDescription>
          </SheetHeader>

          {/* Form Body */}
          <div className="p-6 space-y-6 flex-1">
            {/* Section 1: Article Metadata */}
            <div className="space-y-4">
              <div className="border-b border-border pb-1.5 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                  1. Manuscript Details
                </span>
                <span className="text-[11px] text-muted-foreground">Required *</span>
              </div>

              {/* Title */}
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">
                  Article Headline <span className="text-destructive">*</span>
                </Label>
                <Input
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g., Urban Foresight & Climate-Adaptive Structural Engineering"
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

              {/* URL Slug */}
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-muted-foreground">
                  URL Slug (Permalink)
                </Label>
                <div className="flex items-center">
                  <span className="px-2.5 h-8 bg-muted border border-r-0 border-border rounded-l-xs text-[11px] text-muted-foreground flex items-center">
                    /news/
                  </span>
                  <Input
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, slug: e.target.value }))
                    }
                    placeholder="urban-foresight-and-climate"
                    className="h-8 text-xs rounded-l-none rounded-r-xs font-mono"
                  />
                </div>
              </div>

              {/* Category & Status Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Editorial Category</Label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        category: e.target.value as AdminNewsArticle["category"],
                      }))
                    }
                    className="w-full h-9 px-3 py-1 bg-background border border-border rounded-xs text-xs text-foreground focus:outline-hidden focus:ring-1 focus:ring-primary"
                  >
                    <option value="Foresight">Foresight</option>
                    <option value="Industry Insight">Industry Insight</option>
                    <option value="Company News">Company News</option>
                    <option value="Sustainability">Sustainability</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Editorial Status</Label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        status: e.target.value as AdminNewsArticle["status"],
                      }))
                    }
                    className="w-full h-9 px-3 py-1 bg-background border border-border rounded-xs text-xs text-foreground focus:outline-hidden focus:ring-1 focus:ring-primary"
                  >
                    <option value="Draft">Draft (In Review)</option>
                    <option value="Scheduled">Scheduled for Release</option>
                    <option value="Published">Published (Live)</option>
                  </select>
                </div>
              </div>

              {/* Schedule Date & Read Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Publication / Release Date</Label>
                  <Input
                    value={formData.publishDate}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, publishDate: e.target.value }))
                    }
                    placeholder="e.g., March 15, 2024"
                    className="h-9 text-xs rounded-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Estimated Read Time</Label>
                  <Input
                    value={formData.readTime}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, readTime: e.target.value }))
                    }
                    placeholder="e.g., 5 min read"
                    className="h-9 text-xs rounded-xs"
                  />
                </div>
              </div>

              {/* Featured Flag */}
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
                  <span className="font-semibold text-foreground">Featured Editorial Story</span>
                  <p className="text-[11px] text-muted-foreground">
                    Display as primary lead article on public insights page.
                  </p>
                </div>
              </label>
            </div>

            {/* Section 2: Cover Photography with Stacked Images */}
            <div className="space-y-3 pt-2">
              <div className="border-b border-border pb-1.5 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                  2. Cover Photography &amp; Art
                </span>
                <span className="text-[11px] text-muted-foreground">Visual Asset</span>
              </div>

              <ImageUploader
                images={images}
                onChange={setImages}
                label="Article Editorial Cover"
                helperText="Upload editorial photography. Files stack below with the primary cover marked."
              />

              {formErrors.image && (
                <span className="text-[11px] text-destructive flex items-center gap-1">
                  <AlertCircle className="size-3" />
                  {formErrors.image}
                </span>
              )}
            </div>

            {/* Section 3: Summary & Author Attribution */}
            <div className="space-y-4 pt-2">
              <div className="border-b border-border pb-1.5 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                  3. Content &amp; Attribution
                </span>
                <span className="text-[11px] text-muted-foreground">Author &amp; Brief</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Author Name</Label>
                  <Input
                    value={formData.authorName}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, authorName: e.target.value }))
                    }
                    placeholder="e.g., Dr. Kweku Abe"
                    className="h-9 text-xs rounded-xs"
                  />
                  {formErrors.author && (
                    <span className="text-[11px] text-destructive flex items-center gap-1">
                      <AlertCircle className="size-3" />
                      {formErrors.author}
                    </span>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Author Title / Role</Label>
                  <Input
                    value={formData.authorRole}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, authorRole: e.target.value }))
                    }
                    placeholder="e.g., Partner, Structural Engineering"
                    className="h-9 text-xs rounded-xs"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">
                  Executive Abstract / Summary <span className="text-destructive">*</span>
                </Label>
                <textarea
                  rows={3}
                  value={formData.summary}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, summary: e.target.value }))
                  }
                  placeholder="Succinct overview of geotechnical findings, structural insights, or policy foresight..."
                  className="w-full p-2.5 bg-background border border-border rounded-xs text-xs text-foreground focus:outline-hidden focus:ring-1 focus:ring-primary resize-y"
                />
                {formErrors.summary && (
                  <span className="text-[11px] text-destructive flex items-center gap-1">
                    <AlertCircle className="size-3" />
                    {formErrors.summary}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <SheetFooter className="p-4 sm:p-6 border-t border-border bg-card/60 backdrop-blur-xs flex flex-row items-center justify-end gap-3 sticky bottom-0 z-10">
            <SheetClose asChild>
              <Button type="button" variant="outline" size="sm" className="h-9 text-xs rounded-xs">
                Cancel
              </Button>
            </SheetClose>

            <Button
              type="submit"
              size="sm"
              className="h-9 text-xs rounded-xs gap-1.5 shadow-xs"
            >
              <Save className="size-3.5" />
              <span>{isEditing ? "Save Article" : "Create Article"}</span>
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
