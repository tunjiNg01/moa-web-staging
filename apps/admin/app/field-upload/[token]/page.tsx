"use client";

import React, { useState, use } from "react";
import Image from "next/image";
import {
  HardHat,
  Camera,
  UploadCloud,
  CheckCircle2,
  Building2,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  X,
  Send,
} from "lucide-react";
import { Button, Input, Label, Badge } from "@repo/ui";
import { initialProjects } from "@/lib/admin-data";

interface FieldUploadPageProps {
  params: Promise<{ token: string }>;
}

export default function FieldUploadPage({ params }: FieldUploadPageProps) {
  const resolvedParams = use(params);
  const token = resolvedParams.token;

  // Extract project id from token pattern: field_{projectId}_{expiry}
  const tokenParts = token.split("_");
  const extractedId = tokenParts[1] || "civic";
  const project = initialProjects.find((p) => p.id === extractedId) || initialProjects[0]!;

  const [engineerName, setEngineerName] = useState("");
  const [stage, setStage] = useState<string>("Superstructure");
  const [fieldNote, setFieldNote] = useState("");
  const [files, setFiles] = useState<Array<{ id: string; file: File; preview: string }>>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newItems: Array<{ id: string; file: File; preview: string }> = [];
    for (let i = 0; i < e.target.files.length; i++) {
      const file = e.target.files[i];
      if (!file) continue;
      newItems.push({
        id: `f_${Date.now()}_${i}`,
        file,
        preview: URL.createObjectURL(file),
      });
    }
    setFiles((prev) => [...prev, ...newItems]);
    e.target.value = "";
  };

  const handleRemoveFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!engineerName.trim()) {
      newErrors.engineer = "Please provide your engineer name.";
    }
    if (files.length === 0) {
      newErrors.files = "Please attach at least one site photograph.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    // Simulate instantaneous upload stream
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-lg bg-card border border-border rounded-xs shadow-sm overflow-hidden">
        {/* Banner Header */}
        <div className="p-6 bg-card border-b border-border space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-xs bg-primary/10 text-primary flex items-center justify-center">
                <HardHat className="size-4" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                MO&amp;A Field Stream
              </span>
            </div>
            <Badge variant="outline" className="text-[10px] text-emerald-600 border-emerald-500/30">
              Verified Site Link
            </Badge>
          </div>

          <div>
            <h1 className="text-xl font-serif font-bold text-foreground">
              {project.title}
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Structural Progress Submission • {project.caseStudy.system}
            </p>
          </div>
        </div>

        {/* Content Body */}
        {isSubmitted ? (
          <div className="p-8 text-center space-y-4 animate-in fade-in-50">
            <div className="size-14 rounded-full bg-emerald-500/10 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 className="size-8" />
            </div>
            <div>
              <h2 className="text-lg font-serif font-bold text-foreground">
                Photographs Streamed Successfully!
              </h2>
              <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed max-w-sm mx-auto">
                Thank you, <span className="font-semibold text-foreground">{engineerName}</span>. Your {files.length} site progress photograph(s) have been dispatched directly to the MO&amp;A engineering review desk.
              </p>
            </div>

            <div className="p-3 bg-muted/40 rounded-xs border border-border text-left text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Milestone Phase:</span>
                <span className="font-semibold text-foreground">{stage}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span className="text-emerald-600 font-medium">Pending Editorial Review</span>
              </div>
            </div>

            <Button
              type="button"
              onClick={() => {
                setFiles([]);
                setFieldNote("");
                setIsSubmitted(false);
              }}
              className="w-full text-xs h-9 rounded-xs gap-1.5"
            >
              <span>Submit Another Milestone Update</span>
              <ArrowRight className="size-3.5" />
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Engineer Identity */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">
                Engineer Name &amp; Title <span className="text-destructive">*</span>
              </Label>
              <Input
                value={engineerName}
                onChange={(e) => setEngineerName(e.target.value)}
                placeholder="e.g., Engr. Tunde Bakare (Site Structural Lead)"
                className="h-9 text-xs rounded-xs"
              />
              {errors.engineer && (
                <span className="text-[11px] text-destructive">{errors.engineer}</span>
              )}
            </div>

            {/* Construction Stage */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Current Construction Milestone</Label>
              <select
                value={stage}
                onChange={(e) => setStage(e.target.value)}
                className="w-full h-9 px-3 bg-background border border-border rounded-xs text-xs text-foreground focus:outline-hidden focus:ring-1 focus:ring-primary"
              >
                <option value="Foundations">Foundations &amp; Ground Retention</option>
                <option value="Superstructure">Core &amp; Superstructure Framing</option>
                <option value="Facade">Façade &amp; External Envelope</option>
                <option value="Inspection">Quality Assurance &amp; Load Testing</option>
                <option value="Completion">Handover &amp; Post-Occupancy</option>
              </select>
            </div>

            {/* Field Note */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Onsite Technical Observations</Label>
              <textarea
                rows={3}
                value={fieldNote}
                onChange={(e) => setFieldNote(e.target.value)}
                placeholder="Describe current rebar layout, concrete cylinder test outcomes, cantilever deflections, or weather conditions..."
                className="w-full p-2.5 bg-background border border-border rounded-xs text-xs text-foreground focus:outline-hidden focus:ring-1 focus:ring-primary resize-y"
              />
            </div>

            {/* Photo Capture & Attachments */}
            <div className="space-y-2">
              <Label className="text-xs font-semibold">
                Site Photographs / Camera Roll <span className="text-destructive">*</span>
              </Label>

              <label className="block border-2 border-dashed border-border rounded-xs p-5 text-center cursor-pointer hover:border-primary/50 transition-colors bg-muted/10">
                <input
                  type="file"
                  multiple
                  accept="image/jpeg,image/png,image/webp"
                  capture="environment"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="flex flex-col items-center justify-center space-y-1.5">
                  <div className="size-9 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <Camera className="size-4" />
                  </div>
                  <div className="text-xs font-semibold text-foreground">
                    <span className="text-primary hover:underline">Take photo</span> or select from device
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    Multiple photos supported. High resolution WebP, JPG, or PNG.
                  </p>
                </div>
              </label>

              {errors.files && (
                <span className="text-[11px] text-destructive">{errors.files}</span>
              )}

              {/* Uploaded Thumbnails Grid */}
              {files.length > 0 && (
                <div className="grid grid-cols-3 gap-2 pt-2">
                  {files.map((item) => (
                    <div
                      key={item.id}
                      className="relative aspect-video rounded-xs border border-border overflow-hidden group bg-muted"
                    >
                      <img
                        src={item.preview}
                        alt="Site capture"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveFile(item.id)}
                        className="absolute top-1 right-1 size-5 bg-black/70 text-white rounded-full flex items-center justify-center hover:bg-destructive transition-colors"
                      >
                        <X className="size-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-10 text-xs rounded-xs gap-2 shadow-xs mt-2"
            >
              {isSubmitting ? (
                <span>Streaming Photographs...</span>
              ) : (
                <>
                  <Send className="size-3.5" />
                  <span>Send {files.length > 0 ? `(${files.length}) Photos` : "Update"} to MO&amp;A Desk</span>
                </>
              )}
            </Button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground pt-1">
              <ShieldCheck className="size-3.5 text-emerald-600" />
              <span>Direct encrypted transmission to MO&amp;A Management Portal</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

