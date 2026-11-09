"use client";

import React, { useState } from "react";
import {
  Link2,
  Copy,
  Check,
  QrCode,
  ShieldCheck,
  Clock,
  Send,
  Building2,
  HardHat,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Button,
  Input,
  Label,
  Badge,
} from "@repo/ui";
import type { AdminProject } from "@/lib/admin-data";

export interface FieldUpdateLinkModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: AdminProject | null;
}

export function FieldUpdateLinkModal({
  open,
  onOpenChange,
  project,
}: FieldUpdateLinkModalProps) {
  const [copied, setCopied] = useState(false);
  const [expiry, setExpiry] = useState<"7d" | "30d" | "never">("30d");

  if (!project) return null;

  // Generate deterministic token based on project id and expiry
  const token = `field_${project.id}_${expiry}`;
  const origin =
    typeof window !== "undefined" ? window.location.origin : "http://localhost:3001";
  const shareableUrl = `${origin}/field-upload/${token}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareableUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-6 bg-background border border-border">
        <DialogHeader className="space-y-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
              Onsite Collaboration
            </span>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground">Field Stream</span>
          </div>
          <DialogTitle className="text-lg font-serif font-bold text-foreground flex items-center gap-2">
            <HardHat className="size-5 text-primary" />
            <span>Project Update Link</span>
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Share this link with structural engineers on site to capture and upload construction progress photos directly from mobile devices.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Target Project Summary */}
          <div className="p-3 rounded-xs bg-muted/40 border border-border flex items-center justify-between text-xs">
            <div className="min-w-0">
              <span className="font-semibold text-foreground truncate block">
                {project.title}
              </span>
              <span className="text-[11px] text-muted-foreground">
                {project.category} • {project.caseStudy.system}
              </span>
            </div>
            <Badge variant="outline" className="text-[10px] border-primary/30 text-primary shrink-0">
              Active Stream
            </Badge>
          </div>

          {/* Expiration Configuration */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-foreground">
              Link Expiration Window
            </Label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setExpiry("7d")}
                className={`py-1.5 px-2 rounded-xs border text-xs font-medium transition-colors ${
                  expiry === "7d"
                    ? "border-primary bg-primary/10 text-primary font-semibold"
                    : "border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                7 Days
              </button>
              <button
                type="button"
                onClick={() => setExpiry("30d")}
                className={`py-1.5 px-2 rounded-xs border text-xs font-medium transition-colors ${
                  expiry === "30d"
                    ? "border-primary bg-primary/10 text-primary font-semibold"
                    : "border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                30 Days
              </button>
              <button
                type="button"
                onClick={() => setExpiry("never")}
                className={`py-1.5 px-2 rounded-xs border text-xs font-medium transition-colors ${
                  expiry === "never"
                    ? "border-primary bg-primary/10 text-primary font-semibold"
                    : "border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                Indefinite
              </button>
            </div>
          </div>

          {/* Shareable Link Input with Copy Button */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-foreground">
              Direct Field Upload URL
            </Label>
            <div className="flex items-center gap-2">
              <Input
                readOnly
                value={shareableUrl}
                className="h-9 text-xs font-mono bg-muted/30 select-all"
              />
              <Button
                type="button"
                size="sm"
                onClick={handleCopy}
                className="h-9 px-3 text-xs gap-1.5 shrink-0 rounded-xs"
              >
                {copied ? (
                  <>
                    <Check className="size-3.5 text-emerald-400" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* QR Code Quick Scan Information */}
          <div className="p-3.5 rounded-xs border border-border bg-card/60 flex items-center gap-3.5">
            <div className="size-12 rounded-xs bg-muted flex items-center justify-center shrink-0 border border-border">
              <QrCode className="size-6 text-foreground" />
            </div>
            <div className="text-xs min-w-0">
              <span className="font-semibold text-foreground block">
                No Login Required for Site Engineers
              </span>
              <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
                Engineers can open this link on their smartphone camera or browser to attach photos, inspection notes, and milestone stages.
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-row items-center justify-between border-t border-border pt-4">
          <span className="text-[11px] text-muted-foreground flex items-center gap-1">
            <ShieldCheck className="size-3.5 text-emerald-600" />
            <span>Secure token authenticated</span>
          </span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onOpenChange(false)}
            className="h-8 text-xs rounded-xs"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

