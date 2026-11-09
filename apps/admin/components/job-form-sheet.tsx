"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Briefcase,
  Calendar,
  MapPin,
  Building2,
  Layers,
  GraduationCap,
  Save,
  CheckCircle2,
  AlertCircle,
  X,
  Sparkles,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  Button,
  Input,
  Label,
  Badge,
} from "@repo/ui";
import type { AdminJobPosition } from "@/lib/admin-data";

interface JobFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobToEdit?: AdminJobPosition | null;
  onSave: (job: AdminJobPosition) => void;
}

const DEPARTMENTS = [
  "Structural Engineering",
  "Civil & Infrastructure",
  "Digital Delivery",
  "Graduate Program",
  "Advisory & Forensics",
  "Project Management",
];

const WORKPLACE_TYPES: Array<"On-site" | "Hybrid" | "Remote"> = [
  "On-site",
  "Hybrid",
  "Remote",
];

const EMPLOYMENT_TYPES: Array<"Full-time" | "Part-time" | "Contract" | "Internship"> = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
];

const SENIORITY_LEVELS: Array<"Graduate" | "Mid-Senior" | "Executive" | "Associate"> = [
  "Graduate",
  "Mid-Senior",
  "Associate",
  "Executive",
];

export function JobFormSheet({
  open,
  onOpenChange,
  jobToEdit,
  onSave,
}: JobFormSheetProps) {
  const isEditing = Boolean(jobToEdit);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState("Structural Engineering");
  const [location, setLocation] = useState("Lagos, Nigeria (Hybrid)");
  const [workplaceType, setWorkplaceType] = useState<"On-site" | "Hybrid" | "Remote">("Hybrid");
  const [type, setType] = useState<"Full-time" | "Part-time" | "Contract" | "Internship">("Full-time");
  const [level, setLevel] = useState<"Graduate" | "Mid-Senior" | "Executive" | "Associate">("Mid-Senior");
  const [deadline, setDeadline] = useState("Dec 31, 2026");
  const [status, setStatus] = useState<"Active" | "Draft" | "Closed">("Active");
  const [overview, setOverview] = useState("");
  const [responsibilitiesText, setResponsibilitiesText] = useState("");
  const [requirementsText, setRequirementsText] = useState("");
  const [salaryRange, setSalaryRange] = useState("Competitive • Commensurate with experience");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync state when editing or opening
  useEffect(() => {
    if (jobToEdit) {
      setTitle(jobToEdit.title);
      setDepartment(jobToEdit.department);
      setLocation(jobToEdit.location);
      setWorkplaceType(jobToEdit.workplaceType || "Hybrid");
      setType(jobToEdit.type);
      setLevel(jobToEdit.level);
      setDeadline(jobToEdit.deadline);
      setStatus(jobToEdit.status);
      setOverview(jobToEdit.overview || "");
      setResponsibilitiesText(jobToEdit.responsibilities?.join("\n") || "");
      setRequirementsText(jobToEdit.requirements?.join("\n") || "");
      setSalaryRange(jobToEdit.salaryRange || "Competitive • Commensurate with experience");
    } else {
      // Defaults for new job
      setTitle("");
      setDepartment("Structural Engineering");
      setLocation("Lagos, Nigeria (Hybrid)");
      setWorkplaceType("Hybrid");
      setType("Full-time");
      setLevel("Mid-Senior");
      setDeadline("Dec 31, 2026");
      setStatus("Active");
      setOverview("");
      setResponsibilitiesText("");
      setRequirementsText("");
      setSalaryRange("Competitive • Commensurate with experience");
    }
    setErrors({});
  }, [jobToEdit, open]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!title.trim()) errs.title = "Requisition title is required";
    if (!department.trim()) errs.department = "Department is required";
    if (!location.trim()) errs.location = "Office location is required";
    if (!deadline.trim()) errs.deadline = "Application deadline is required";
    if (!overview.trim()) errs.overview = "High-level role overview is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTop = 0;
      }
      return;
    }

    setIsSubmitting(true);

    const responsibilities = responsibilitiesText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const requirements = requirementsText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const savedJob: AdminJobPosition = {
      id: jobToEdit?.id || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""),
      title: title.trim(),
      department: department.trim(),
      location: location.trim(),
      workplaceType,
      type,
      level,
      deadline: deadline.trim(),
      status,
      applicantsCount: jobToEdit ? jobToEdit.applicantsCount : 0,
      newApplicantsCount: jobToEdit ? jobToEdit.newApplicantsCount : 0,
      overview: overview.trim(),
      responsibilities: responsibilities.length > 0 ? responsibilities : undefined,
      requirements: requirements.length > 0 ? requirements : undefined,
      salaryRange: salaryRange.trim(),
      updatedAt: new Date().toISOString().slice(0, 10),
    };

    setTimeout(() => {
      onSave(savedJob);
      setIsSubmitting(false);
      onOpenChange(false);
    }, 200);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="p-0 sm:max-w-xl md:max-w-2xl w-full bg-card border-l border-border flex flex-col h-full focus:outline-hidden"
      >
        {/* Pinned Header */}
        <div className="shrink-0 p-6 border-b border-border bg-card/80 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
              Talent Acquisition
            </span>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground">
              {isEditing ? "Requisition Revision" : "New Engineering Opening"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif font-bold text-foreground">
              {isEditing ? "Edit Position Requisition" : "Post Engineering Opening"}
            </h2>
            <Badge
              variant="outline"
              className={`text-[10px] font-medium ${
                status === "Active"
                  ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30"
                  : status === "Draft"
                  ? "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {status}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Specify technical seniority, discipline specifications, and application timeline.
          </p>
        </div>

        {/* Scrollable Form Body */}
        <div
          ref={scrollAreaRef}
          className="flex-1 overflow-y-auto p-6 space-y-6 focus:outline-hidden"
        >
          {/* 1. Requisition Title */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-foreground flex items-center justify-between">
              <span>Position Title <span className="text-destructive">*</span></span>
              <span className="text-[10px] font-normal text-muted-foreground">e.g. Senior Structural Project Engineer</span>
            </Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Senior Structural Project Engineer"
              className={`h-9 text-xs rounded-xs ${errors.title ? "border-destructive focus-visible:ring-destructive" : ""}`}
            />
            {errors.title && (
              <p className="text-[11px] text-destructive flex items-center gap-1 mt-1">
                <AlertCircle className="size-3" />
                <span>{errors.title}</span>
              </p>
            )}
          </div>

          {/* 2. Department & Seniority Level */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-foreground">
                Engineering Department <span className="text-destructive">*</span>
              </Label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full h-9 px-3 rounded-xs bg-background border border-border text-xs text-foreground focus:outline-hidden focus:ring-1 focus:ring-primary"
              >
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-foreground">
                Seniority Level <span className="text-destructive">*</span>
              </Label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value as AdminJobPosition["level"])}
                className="w-full h-9 px-3 rounded-xs bg-background border border-border text-xs text-foreground focus:outline-hidden focus:ring-1 focus:ring-primary"
              >
                {SENIORITY_LEVELS.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 3. Workplace Nature, Employment Type & Publication Status */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-foreground">Work Arrangement</Label>
              <select
                value={workplaceType}
                onChange={(e) => setWorkplaceType(e.target.value as "On-site" | "Hybrid" | "Remote")}
                className="w-full h-9 px-3 rounded-xs bg-background border border-border text-xs text-foreground focus:outline-hidden focus:ring-1 focus:ring-primary"
              >
                {WORKPLACE_TYPES.map((w) => (
                  <option key={w} value={w}>
                    {w}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-foreground">Contract Type</Label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as AdminJobPosition["type"])}
                className="w-full h-9 px-3 rounded-xs bg-background border border-border text-xs text-foreground focus:outline-hidden focus:ring-1 focus:ring-primary"
              >
                {EMPLOYMENT_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-foreground">Status</Label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as AdminJobPosition["status"])}
                className="w-full h-9 px-3 rounded-xs bg-background border border-border text-xs text-foreground focus:outline-hidden focus:ring-1 focus:ring-primary"
              >
                <option value="Active">Active (Live on Board)</option>
                <option value="Draft">Draft (Internal Only)</option>
                <option value="Closed">Closed / Filled</option>
              </select>
            </div>
          </div>

          {/* 4. Office Location & Application Deadline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <MapPin className="size-3 text-muted-foreground" />
                <span>Office Location <span className="text-destructive">*</span></span>
              </Label>
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Lagos, Nigeria (Hybrid)"
                className={`h-9 text-xs rounded-xs ${errors.location ? "border-destructive focus-visible:ring-destructive" : ""}`}
              />
              {errors.location && (
                <p className="text-[11px] text-destructive flex items-center gap-1 mt-1">
                  <AlertCircle className="size-3" />
                  <span>{errors.location}</span>
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <Calendar className="size-3 text-muted-foreground" />
                <span>Application Deadline <span className="text-destructive">*</span></span>
              </Label>
              <Input
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                placeholder="e.g. Nov 30, 2026"
                className={`h-9 text-xs rounded-xs ${errors.deadline ? "border-destructive focus-visible:ring-destructive" : ""}`}
              />
              {errors.deadline && (
                <p className="text-[11px] text-destructive flex items-center gap-1 mt-1">
                  <AlertCircle className="size-3" />
                  <span>{errors.deadline}</span>
                </p>
              )}
            </div>
          </div>

          {/* 5. Compensation Range */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-foreground">Compensation / Salary Band</Label>
            <Input
              value={salaryRange}
              onChange={(e) => setSalaryRange(e.target.value)}
              placeholder="e.g. Competitive • Commensurate with experience"
              className="h-9 text-xs rounded-xs"
            />
          </div>

          {/* 6. Overview & Role Summary */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-foreground">
              Role Overview &amp; Mandate <span className="text-destructive">*</span>
            </Label>
            <textarea
              rows={3}
              value={overview}
              onChange={(e) => setOverview(e.target.value)}
              placeholder="Provide a high-level engineering summary of the projects, technical leadership, and scope this role commands..."
              className={`w-full p-3 bg-background border rounded-xs text-xs text-foreground focus:outline-hidden focus:ring-1 focus:ring-primary resize-none ${
                errors.overview ? "border-destructive focus:ring-destructive" : "border-border"
              }`}
            />
            {errors.overview && (
              <p className="text-[11px] text-destructive flex items-center gap-1 mt-1">
                <AlertCircle className="size-3" />
                <span>{errors.overview}</span>
              </p>
            )}
          </div>

          {/* 7. Key Responsibilities */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-foreground flex items-center justify-between">
              <span>Core Responsibilities</span>
              <span className="text-[10px] text-muted-foreground font-normal">One item per line</span>
            </Label>
            <textarea
              rows={4}
              value={responsibilitiesText}
              onChange={(e) => setResponsibilitiesText(e.target.value)}
              placeholder={"• Lead structural engineering design and calculations using ETABS and Prokon\n• Direct coordination with architectural and MEP engineering consultants\n• Review site quality assurance and reinforcement inspection reports"}
              className="w-full p-3 bg-background border border-border rounded-xs text-xs text-foreground focus:outline-hidden focus:ring-1 focus:ring-primary font-mono text-[11px] leading-relaxed"
            />
          </div>

          {/* 8. Qualifications & Requirements */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-foreground flex items-center justify-between">
              <span>Candidate Qualifications &amp; Skills</span>
              <span className="text-[10px] text-muted-foreground font-normal">One item per line</span>
            </Label>
            <textarea
              rows={4}
              value={requirementsText}
              onChange={(e) => setRequirementsText(e.target.value)}
              placeholder={"• B.Eng or M.Sc in Civil or Structural Engineering from an accredited institution\n• COREN registered engineer or progressing toward chartership (NSE / IStructE)\n• 6+ years experience designing concrete high-rise or long-span steel structures\n• Proficiency in Eurocode 2, British Standards, and AutoCAD/Revit"}
              className="w-full p-3 bg-background border border-border rounded-xs text-xs text-foreground focus:outline-hidden focus:ring-1 focus:ring-primary font-mono text-[11px] leading-relaxed"
            />
          </div>
        </div>

        {/* Pinned Footer */}
        <div className="shrink-0 p-4 sm:p-6 border-t border-border bg-card/80 backdrop-blur-sm flex items-center justify-between gap-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onOpenChange(false)}
            className="text-xs rounded-xs"
          >
            Cancel
          </Button>

          <Button
            type="button"
            size="sm"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="text-xs gap-1.5 rounded-xs"
          >
            <Save className="size-3.5" />
            <span>{isEditing ? "Save Requisition" : "Post Position Live"}</span>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

