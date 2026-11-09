"use client";

import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  CheckCircle2,
  KeyRound,
  Mail,
  User,
  AlertCircle,
  Check,
  Send,
  Save,
  Lock,
  Layers,
  Sparkles,
  X,
  Copy,
  ExternalLink,
  Shield,
  FileCheck,
  Briefcase,
  UploadCloud,
  CheckCheck,
} from "lucide-react";
import {
  Button,
  Input,
  Label,
  Badge,
} from "@repo/ui";
import type { AdminUser, AdminRole } from "@/lib/admin-data";

interface UserFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userToEdit?: AdminUser | null;
  onSave: (user: AdminUser) => void;
}

interface CapabilityItem {
  domain: string;
  action: string;
  allowedRoles: AdminRole[];
}

const CAPABILITY_MATRIX: CapabilityItem[] = [
  {
    domain: "Project Portfolio",
    action: "Publish Case Studies & High-Res Galleries Live",
    allowedRoles: ["SUPER_ADMIN", "EDITOR"],
  },
  {
    domain: "News & Editorial",
    action: "Write & Schedule News, Insights & Foresight Articles",
    allowedRoles: ["SUPER_ADMIN", "EDITOR"],
  },
  {
    domain: "Careers & ATS",
    action: "Create Requisitions & Advance Candidates Across Stages",
    allowedRoles: ["SUPER_ADMIN", "EDITOR"],
  },
  {
    domain: "Field Portal",
    action: "Generate Field Upload Links & Manage Mobile Streams",
    allowedRoles: ["SUPER_ADMIN", "EDITOR"],
  },
  {
    domain: "Quality Inspection",
    action: "View Internal Drafts, Specifications & Candidate CVs",
    allowedRoles: ["SUPER_ADMIN", "EDITOR", "REVIEWER"],
  },
  {
    domain: "Access Governance",
    action: "Invite Team Members, Edit Roles & Revoke Access",
    allowedRoles: ["SUPER_ADMIN"],
  },
  {
    domain: "Security & Audit",
    action: "Inspect Security Audit Trail & API Service Tokens",
    allowedRoles: ["SUPER_ADMIN"],
  },
];

const ROLE_DEFINITIONS: Record<
  AdminRole,
  {
    title: string;
    description: string;
    badgeClass: string;
    icon: typeof ShieldCheck;
  }
> = {
  SUPER_ADMIN: {
    title: "Super Admin",
    description: "Root organizational control. Full CMS publishing, user management, and security audit access.",
    badgeClass: "bg-primary text-white",
    icon: ShieldCheck,
  },
  EDITOR: {
    title: "Content Editor",
    description: "Operational publishing authority across Projects, News & Foresight, and Careers. Cannot alter system settings or user roles.",
    badgeClass: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20",
    icon: CheckCircle2,
  },
  REVIEWER: {
    title: "Reviewer & Auditor",
    description: "Read-only inspection of draft case studies, manuscripts, and applicant resumes prior to executive publication.",
    badgeClass: "bg-muted text-muted-foreground border border-border",
    icon: KeyRound,
  },
};

export function UserFormModal({
  open,
  onOpenChange,
  userToEdit,
  onSave,
}: UserFormModalProps) {
  const isEditing = Boolean(userToEdit);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<AdminRole>("EDITOR");
  const [status, setStatus] = useState<AdminUser["status"]>("Invited");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Invite simulation states
  const [inviteSent, setInviteSent] = useState(false);
  const [generatedLink, setGeneratedLink] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);

  // Close on Escape & prevent background scroll
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onOpenChange]);

  useEffect(() => {
    if (userToEdit) {
      setName(userToEdit.name);
      setEmail(userToEdit.email);
      setRole(userToEdit.role);
      setStatus(userToEdit.status);
      setInviteSent(false);
      setGeneratedLink("");
    } else {
      setName("");
      setEmail("");
      setRole("EDITOR");
      setStatus("Invited");
      setInviteSent(false);
      setGeneratedLink("");
    }
    setErrors({});
    setCopiedLink(false);
  }, [userToEdit, open]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Full name is required";
    if (!email.trim()) {
      errs.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = "Please enter a valid email address";
    } else if (!email.endsWith("@moa.ng") && !email.endsWith("@moa.com")) {
      errs.email = "Must use official MO&A domain (e.g., name@moa.ng)";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSimulateInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const token = `inv_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const link = `http://localhost:3001/invite/${token}`;

    const savedUser: AdminUser = {
      id: userToEdit?.id || `usr_${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      role,
      avatar:
        userToEdit?.avatar ||
        `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`,
      status: isEditing ? status : "Invited",
      lastActive: userToEdit?.lastActive || "Never",
      createdAt: userToEdit?.createdAt || new Date().toISOString().slice(0, 10),
    };

    setTimeout(() => {
      onSave(savedUser);
      setIsSubmitting(false);
      setGeneratedLink(link);
      setInviteSent(true);
    }, 300);
  };

  const handleCopyLink = () => {
    if (!generatedLink) return;
    navigator.clipboard.writeText(generatedLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const selectedRoleInfo = ROLE_DEFINITIONS[role];

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-6 animate-in fade-in-0 duration-200"
      onClick={() => onOpenChange(false)}
    >
      <div
        className="w-full max-w-2xl bg-card border border-border rounded-xs shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="shrink-0 p-6 border-b border-border bg-card/95 backdrop-blur-sm flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                Access Governance &amp; RBAC
              </span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">
                {isEditing ? "Administrator Modification" : "New Team Invitation"}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-serif font-bold text-foreground">
                {isEditing ? "Edit Administrator Access" : "Invite Administrator"}
              </h2>
              {isEditing && (
                <Badge
                  variant="outline"
                  className={`text-[10px] font-medium ${
                    status === "Active"
                      ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30"
                      : status === "Invited"
                      ? "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/30"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {status}
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {isEditing
                ? "Update role permissions, credentials, or session activity status."
                : "Configure credentials, assign RBAC permissions, and dispatch an onboarding link."}
            </p>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => onOpenChange(false)}
            className="size-8 rounded-xs text-muted-foreground hover:text-foreground"
          >
            <X className="size-4" />
          </Button>
        </div>

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 focus:outline-hidden">
          {/* Post-Invite Success Banner */}
          {inviteSent && (
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xs space-y-3 animate-in fade-in-0">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 text-xs font-semibold">
                <CheckCircle2 className="size-4" />
                <span>
                  {isEditing ? "Administrator Profile Updated" : "Invitation Email Dispatched Successfully"}
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                An invitation has been simulated to <strong className="text-foreground">{email}</strong>. The user can claim their credentials via the secure token below:
              </p>
              <div className="flex items-center gap-2">
                <Input
                  readOnly
                  value={generatedLink}
                  className="h-8 text-xs font-mono bg-background text-muted-foreground select-all rounded-xs"
                />
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={handleCopyLink}
                  className="h-8 text-xs shrink-0 rounded-xs gap-1.5"
                >
                  {copiedLink ? (
                    <>
                      <CheckCheck className="size-3.5 text-emerald-600" />
                      <span className="text-emerald-600 font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-3.5" />
                      <span>Copy Link</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* 1. Name & Corporate Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <User className="size-3 text-muted-foreground" />
                <span>Full Name <span className="text-destructive">*</span></span>
              </Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Engr. Bamidele Santos"
                className={`h-9 text-xs rounded-xs ${
                  errors.name ? "border-destructive focus-visible:ring-destructive" : ""
                }`}
              />
              {errors.name && (
                <p className="text-[11px] text-destructive flex items-center gap-1 mt-1">
                  <AlertCircle className="size-3" />
                  <span>{errors.name}</span>
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <Mail className="size-3 text-muted-foreground" />
                <span>MO&amp;A Corporate Email <span className="text-destructive">*</span></span>
              </Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. b.santos@moa.ng"
                className={`h-9 text-xs rounded-xs ${
                  errors.email ? "border-destructive focus-visible:ring-destructive" : ""
                }`}
              />
              {errors.email ? (
                <p className="text-[11px] text-destructive flex items-center gap-1 mt-1">
                  <AlertCircle className="size-3" />
                  <span>{errors.email}</span>
                </p>
              ) : (
                <p className="text-[10px] text-muted-foreground">
                  Requires authorized domain: <code className="text-foreground">@moa.ng</code>
                </p>
              )}
            </div>
          </div>

          {/* 2. Interactive Role Selection */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold text-foreground">
              Select Role &amp; Access Tier <span className="text-destructive">*</span>
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(["SUPER_ADMIN", "EDITOR", "REVIEWER"] as AdminRole[]).map((r) => {
                const info = ROLE_DEFINITIONS[r];
                const Icon = info.icon;
                const isSelected = role === r;
                return (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`p-3 text-left rounded-xs border transition-all flex flex-col justify-between gap-2 ${
                      isSelected
                        ? "border-primary bg-primary/5 ring-1 ring-primary shadow-xs"
                        : "border-border bg-card hover:bg-muted/40"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-1.5 text-xs font-bold font-serif text-foreground">
                        <Icon className="size-3.5 text-primary" />
                        <span>{info.title}</span>
                      </div>
                      {isSelected ? (
                        <div className="size-4 rounded-full bg-primary text-white flex items-center justify-center">
                          <Check className="size-2.5" />
                        </div>
                      ) : (
                        <div className="size-4 rounded-full border border-border" />
                      )}
                    </div>
                    <p className="text-[10px] text-muted-foreground leading-snug">
                      {info.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Detailed Permissions Matrix Checklist */}
          <div className="p-4 bg-muted/40 border border-border rounded-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                <Lock className="size-3 text-primary" />
                <span>Permissions Matrix Checklist</span>
              </span>
              <span className="text-[10px] font-mono text-muted-foreground">
                Active Tier: <strong className="text-foreground">{selectedRoleInfo.title}</strong>
              </span>
            </div>

            <div className="divide-y divide-border/60 text-xs">
              {CAPABILITY_MATRIX.map((cap, idx) => {
                const isAllowed = cap.allowedRoles.includes(role);
                return (
                  <div
                    key={idx}
                    className="py-2 flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                        {cap.domain}
                      </span>
                      <span className={`text-[11px] ${isAllowed ? "text-foreground font-medium" : "text-muted-foreground/70"}`}>
                        {cap.action}
                      </span>
                    </div>

                    <div className="shrink-0">
                      {isAllowed ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                          <Check className="size-3" />
                          <span>Granted</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full border border-border">
                          <X className="size-3 text-muted-foreground/60" />
                          <span>Restricted</span>
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4. Status Selector (When Editing) */}
          {isEditing && (
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-foreground">
                Account Status
              </Label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as AdminUser["status"])}
                className="w-full h-9 px-3 rounded-xs bg-background border border-border text-xs text-foreground focus:outline-hidden focus:ring-1 focus:ring-primary"
              >
                <option value="Active">Active (Granted Full Operational Access)</option>
                <option value="Invited">Invited (Awaiting Onboarding Confirmation)</option>
                <option value="Inactive">Inactive / Suspended (Revoked Session Access)</option>
              </select>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="shrink-0 p-4 sm:p-6 border-t border-border bg-card/95 backdrop-blur-sm flex items-center justify-between gap-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onOpenChange(false)}
            className="text-xs rounded-xs"
          >
            {inviteSent ? "Done" : "Cancel"}
          </Button>

          <Button
            type="button"
            size="sm"
            onClick={handleSimulateInvite}
            disabled={isSubmitting}
            className="text-xs gap-1.5 rounded-xs"
          >
            {isEditing ? (
              <>
                <Save className="size-3.5" />
                <span>Save Access Changes</span>
              </>
            ) : (
              <>
                <Send className="size-3.5" />
                <span>Dispatch Invitation Email</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
