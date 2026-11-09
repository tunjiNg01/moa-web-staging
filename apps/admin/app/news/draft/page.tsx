"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Send,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  Newspaper,
  ExternalLink,
  AlertCircle,
  Eye,
  FileCheck,
  User,
} from "lucide-react";
import { Button, Input, Label, Badge } from "@repo/ui";
import {
  initialNewsArticles,
  type AdminNewsArticle,
} from "@/lib/admin-data";
import { RichTextEditor } from "@/components/rich-text-editor";
import { ImageUploader, type UploadedImageItem } from "@/components/image-uploader";

function DraftArticleContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("id");

  // Lookup existing article if editing
  const existingArticle = editId
    ? initialNewsArticles.find((a) => a.id === editId || a.slug === editId)
    : null;

  const [title, setTitle] = useState(existingArticle?.title || "");
  const [slug, setSlug] = useState(existingArticle?.slug || "");
  const [category, setCategory] = useState<AdminNewsArticle["category"]>(
    existingArticle?.category || "Foresight"
  );
  const [status, setStatus] = useState<AdminNewsArticle["status"]>(
    existingArticle?.status || "Draft"
  );
  const [publishDate, setPublishDate] = useState(
    existingArticle?.publishDate ||
      new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
  );
  const [summary, setSummary] = useState(existingArticle?.summary || "");
  const [content, setContent] = useState(
    existingArticle?.content ||
      `<h2>1. Introduction & Executive Context</h2><p>Structural engineering practice across tropical coastal climates requires a recalibration of lifecycle carbon accounting, durability design, and geotechnical risk mitigation.</p><blockquote>"The integration of calcined clays and post-tensioned geometry enables us to reduce structural embodied carbon by up to 34% without sacrificing strength."</blockquote><h2>2. Key Structural Findings</h2><p>Field data collected over 24 months demonstrates exceptional crack attenuation and resistance to chloride penetration.</p><ul><li>Reduced Portland cement clinker factor by 40%.</li><li>Maintained 28-day cylinder compressive strength exceeding 55 MPa.</li><li>Eliminated secondary waterproofing membrane requirements in subterranean retaining walls.</li></ul>`
  );
  const [featured, setFeatured] = useState(existingArticle?.featured || false);
  const [authorName, setAuthorName] = useState(
    existingArticle?.author.name || "Engr. Funsho Morgan"
  );
  const [authorRole, setAuthorRole] = useState(
    existingArticle?.author.role || "Principal Partner"
  );

  const [images, setImages] = useState<UploadedImageItem[]>([
    {
      id: "cover_img",
      url: existingArticle?.image || "/images/news-urban-foresight.jpg",
      name: "Article Editorial Cover",
      isHero: true,
      size: "Stock",
    },
  ]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [lastSaved, setLastSaved] = useState<string>("Unsaved draft");

  // Auto-generate slug from headline if not manually customized
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!existingArticle) {
      const generated = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setSlug(generated);
    }
  };

  // Estimated read time calculation
  const words = `${title} ${summary} ${content.replace(/<[^>]*>/g, " ")}`
    .trim()
    .split(/\s+/).length;
  const calculatedReadTime = `${Math.max(1, Math.ceil(words / 200))} min read`;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!title.trim()) errs.title = "Article headline is required.";
    if (!summary.trim()) errs.summary = "Executive abstract / summary is required.";
    if (!authorName.trim()) errs.author = "Author name is required.";
    if (images.length === 0) errs.image = "Please attach a cover photograph.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = (targetStatus?: AdminNewsArticle["status"]) => {
    if (!validate()) return;

    const chosenStatus = targetStatus || status;
    const coverPhoto = images.find((i) => i.isHero)?.url || images[0]?.url || "/images/news-urban-foresight.jpg";

    const savedArticle: AdminNewsArticle = {
      id: existingArticle ? existingArticle.id : `art_${Date.now()}`,
      slug: slug || "untitled-article",
      title: title.trim(),
      category,
      status: chosenStatus,
      summary: summary.trim(),
      content,
      publishDate,
      readTime: calculatedReadTime,
      image: coverPhoto,
      featured,
      author: {
        name: authorName.trim(),
        role: authorRole.trim() || "Author",
      },
      viewsCount: existingArticle ? existingArticle.viewsCount : 0,
    };

    setStatus(chosenStatus);
    setSaveSuccess(true);
    setLastSaved(`Saved at ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* 1. Sticky Control Header */}
      <div className="sticky top-0 z-20 -mx-4 sm:-mx-6 -mt-6 p-4 sm:p-6 bg-card/80 backdrop-blur-md border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link
            href="/news"
            className="p-1.5 rounded-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            title="Return to News & Foresight list"
          >
            <ArrowLeft className="size-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                Editorial Room
              </span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">
                {existingArticle ? "Editing Publication" : "New Manuscript"}
              </span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-[11px] text-muted-foreground/80 font-mono">
                {lastSaved}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-serif font-bold text-foreground truncate max-w-md">
                {title || "Untitled Manuscript"}
              </h1>
              <Badge
                variant="outline"
                className={`text-[10px] font-medium ${
                  status === "Published"
                    ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30"
                    : status === "Scheduled"
                    ? "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/30"
                    : "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30"
                }`}
              >
                {status}
              </Badge>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          {saveSuccess && (
            <span className="text-xs text-emerald-600 font-medium flex items-center gap-1 animate-in fade-in">
              <CheckCircle2 className="size-3.5" />
              <span>Saved</span>
            </span>
          )}

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => handleSave("Draft")}
            className="h-8 text-xs gap-1.5 rounded-xs"
          >
            <Save className="size-3.5" />
            <span>Save Draft</span>
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => handleSave("Scheduled")}
            className="h-8 text-xs gap-1.5 rounded-xs"
          >
            <Clock className="size-3.5 text-blue-600" />
            <span>Schedule</span>
          </Button>

          <Button
            type="button"
            size="sm"
            onClick={() => handleSave("Published")}
            className="h-8 text-xs gap-1.5 rounded-xs shadow-xs"
          >
            <Send className="size-3.5" />
            <span>Publish Live</span>
          </Button>
        </div>
      </div>

      {/* 2. Main Two-Column Editorial Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Writing Canvas (8 of 12 cols = 67%) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Article Headline Input */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Article Headline <span className="text-destructive">*</span>
            </Label>
            <textarea
              rows={2}
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g., Urban Foresight & Climate-Adaptive Structural Engineering..."
              className={`w-full p-4 bg-background border rounded-xs font-serif text-2xl sm:text-3xl font-bold text-foreground focus:outline-hidden focus:ring-1 focus:ring-primary resize-none leading-tight ${
                errors.title ? "border-destructive focus:ring-destructive" : "border-border"
              }`}
            />
            {errors.title && (
              <span className="text-xs text-destructive flex items-center gap-1">
                <AlertCircle className="size-3.5" />
                {errors.title}
              </span>
            )}
          </div>

          {/* Executive Abstract / Summary */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Executive Abstract / Lead Quote <span className="text-destructive">*</span>
              </Label>
              <span className="text-[11px] text-muted-foreground">
                Appears in cards &amp; as article italic lead
              </span>
            </div>
            <textarea
              rows={3}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Succinct overview of the geotechnical methodology, decarbonization impact, or structural engineering thesis..."
              className={`w-full p-3.5 bg-background border rounded-xs text-sm sm:text-base italic text-foreground leading-relaxed focus:outline-hidden focus:ring-1 focus:ring-primary resize-y ${
                errors.summary ? "border-destructive focus:ring-destructive" : "border-border"
              }`}
            />
            {errors.summary && (
              <span className="text-xs text-destructive flex items-center gap-1">
                <AlertCircle className="size-3.5" />
                {errors.summary}
              </span>
            )}
          </div>

          {/* Rich Text Editor for Full Write-up */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Technical Write-up Narrative
              </Label>
              <span className="text-[11px] text-muted-foreground">
                Supports formatting, technical callouts &amp; live reader preview
              </span>
            </div>

            <RichTextEditor
              value={content}
              onChange={setContent}
              minHeight="520px"
              placeholder="Draft the in-depth structural engineering foresight narrative..."
            />
          </div>
        </div>

        {/* Right Column: Publishing Sidebar & Metadata (4 of 12 cols = 33%) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Cover Photography Card */}
          <div className="bg-card border border-border rounded-xs p-5 shadow-2xs space-y-3">
            <div className="border-b border-border pb-2 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                Editorial Cover Photograph
              </span>
              <span className="text-[10px] text-muted-foreground">Visual Asset</span>
            </div>

            <ImageUploader
              images={images}
              onChange={setImages}
              label="Article Cover Photo"
              helperText="Upload editorial photography. 16:9 ratio recommended."
            />
            {errors.image && (
              <span className="text-xs text-destructive flex items-center gap-1">
                <AlertCircle className="size-3.5" />
                {errors.image}
              </span>
            )}
          </div>

          {/* Publication Metadata Card */}
          <div className="bg-card border border-border rounded-xs p-5 shadow-2xs space-y-4">
            <div className="border-b border-border pb-2 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                Publishing Settings
              </span>
              <span className="text-[10px] text-muted-foreground">Governance</span>
            </div>

            {/* Status */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Editorial Status</Label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as AdminNewsArticle["status"])}
                className="w-full h-9 px-3 bg-background border border-border rounded-xs text-xs text-foreground focus:outline-hidden focus:ring-1 focus:ring-primary"
              >
                <option value="Draft">Draft (In Review)</option>
                <option value="Scheduled">Scheduled for Release</option>
                <option value="Published">Published (Live on Website)</option>
              </select>
            </div>

            {/* Category */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Publication Category</Label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as AdminNewsArticle["category"])}
                className="w-full h-9 px-3 bg-background border border-border rounded-xs text-xs text-foreground focus:outline-hidden focus:ring-1 focus:ring-primary"
              >
                <option value="Foresight">Foresight</option>
                <option value="Industry Insight">Industry Insight</option>
                <option value="Company News">Company News</option>
                <option value="Sustainability">Sustainability</option>
              </select>
            </div>

            {/* Release Date */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Publication / Release Date</Label>
              <Input
                value={publishDate}
                onChange={(e) => setPublishDate(e.target.value)}
                placeholder="e.g., March 15, 2026"
                className="h-9 text-xs rounded-xs"
              />
            </div>

            {/* URL Slug & Permalink */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">URL Slug (Permalink)</Label>
              <div className="flex items-center">
                <span className="px-2 h-9 bg-muted border border-r-0 border-border rounded-l-xs text-[11px] text-muted-foreground flex items-center shrink-0">
                  /news/
                </span>
                <Input
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="article-slug"
                  className="h-9 text-xs rounded-l-none rounded-r-xs font-mono"
                />
              </div>
            </div>

            {/* Featured Story Flag */}
            <label className="flex items-center gap-2.5 p-3 rounded-xs border border-border bg-card/40 cursor-pointer hover:bg-muted/40 transition-colors">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="rounded-xs size-4 accent-primary"
              />
              <div className="text-xs">
                <span className="font-semibold text-foreground">Featured Story Spotlight</span>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  Display as primary lead article on the public foresight portal.
                </p>
              </div>
            </label>
          </div>

          {/* Author Attribution Card */}
          <div className="bg-card border border-border rounded-xs p-5 shadow-2xs space-y-4">
            <div className="border-b border-border pb-2 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                Author Attribution
              </span>
              <User className="size-3.5 text-muted-foreground" />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Author Name</Label>
              <Input
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="e.g., Engr. Funsho Morgan"
                className="h-9 text-xs rounded-xs"
              />
              {errors.author && (
                <span className="text-xs text-destructive">{errors.author}</span>
              )}
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Professional Title / Role</Label>
              <Input
                value={authorRole}
                onChange={(e) => setAuthorRole(e.target.value)}
                placeholder="e.g., Principal Partner, Structural Engineering"
                className="h-9 text-xs rounded-xs"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DraftArticlePage() {
  return (
    <Suspense
      fallback={
        <div className="p-12 text-center text-xs text-muted-foreground">
          Loading editorial workspace...
        </div>
      }
    >
      <DraftArticleContent />
    </Suspense>
  );
}
