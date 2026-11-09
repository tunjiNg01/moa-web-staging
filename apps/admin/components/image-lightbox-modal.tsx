"use client";

import React, { useEffect, useCallback } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Star,
  Check,
  EyeOff,
  ExternalLink,
  HardHat,
  Calendar,
  Layers,
  ZoomIn,
} from "lucide-react";
import { Button, Badge } from "@repo/ui";
import type { ProjectMediaItem } from "@/lib/admin-data";

export interface ImageLightboxModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mediaItems: ProjectMediaItem[];
  currentIndex: number;
  onNavigate: (newIndex: number) => void;
  onTogglePublish?: (id: string) => void;
  onSetHero?: (id: string) => void;
}

export function ImageLightboxModal({
  open,
  onOpenChange,
  mediaItems,
  currentIndex,
  onNavigate,
  onTogglePublish,
  onSetHero,
}: ImageLightboxModalProps) {
  if (!open || mediaItems.length === 0) return null;

  const currentItem = mediaItems[currentIndex] || mediaItems[0]!;
  const hasMultiple = mediaItems.length > 1;

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      onNavigate(currentIndex - 1);
    } else {
      onNavigate(mediaItems.length - 1); // loop
    }
  }, [currentIndex, mediaItems.length, onNavigate]);

  const handleNext = useCallback(() => {
    if (currentIndex < mediaItems.length - 1) {
      onNavigate(currentIndex + 1);
    } else {
      onNavigate(0); // loop
    }
  }, [currentIndex, mediaItems.length, onNavigate]);

  // Keyboard navigation (Arrow keys and Escape)
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onOpenChange(false);
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, handlePrev, handleNext, onOpenChange]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 text-white backdrop-blur-md animate-in fade-in-0 duration-200"
    >
      {/* 1. Top Bar */}
      <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/10 bg-black/40 backdrop-blur-xs">
        <div className="flex items-center gap-3 min-w-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm truncate max-w-md">
                {currentItem.title || "Project Photograph"}
              </span>
              {currentItem.isHero && (
                <span className="px-1.5 py-0.5 rounded-xs bg-primary text-white text-[10px] font-bold flex items-center gap-1 shadow-xs">
                  <Star className="size-2.5 fill-white" />
                  <span>Hero Cover</span>
                </span>
              )}
              <span
                className={`px-1.5 py-0.5 rounded-xs text-[10px] font-medium ${
                  currentItem.isPublished
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : "bg-white/10 text-white/70 border border-white/20"
                }`}
              >
                {currentItem.isPublished ? "Published on Website" : "Internal Draft"}
              </span>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-white/60 mt-0.5 font-mono">
              <span>
                {currentIndex + 1} of {mediaItems.length}
              </span>
              {currentItem.stage && (
                <>
                  <span>•</span>
                  <span>{currentItem.stage}</span>
                </>
              )}
              {currentItem.uploadedBy && (
                <>
                  <span>•</span>
                  <span>{currentItem.uploadedBy}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Close and Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={currentItem.url}
            target="_blank"
            rel="noopener noreferrer"
            title="Open Original Image in New Tab"
            className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xs transition-colors"
          >
            <ExternalLink className="size-4" />
          </a>

          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xs transition-colors"
            title="Close viewer (Esc)"
          >
            <X className="size-5" />
          </button>
        </div>
      </div>

      {/* 2. Main Large Image Display View */}
      <div className="relative flex-1 flex items-center justify-center p-4 sm:p-8 min-h-0 select-none">
        {/* Previous Button */}
        {hasMultiple && (
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 size-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-xs transition-all z-10 hover:scale-105 active:scale-95"
            title="Previous image (←)"
          >
            <ChevronLeft className="size-6" />
          </button>
        )}

        {/* Large Image */}
        <div className="relative max-w-full max-h-full flex items-center justify-center overflow-hidden">
          <img
            src={currentItem.url}
            alt={currentItem.title || "Large view"}
            className="max-h-[75vh] w-auto max-w-full object-contain rounded-xs shadow-2xl transition-all duration-200"
          />
        </div>

        {/* Next Button */}
        {hasMultiple && (
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 size-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-xs transition-all z-10 hover:scale-105 active:scale-95"
            title="Next image (→)"
          >
            <ChevronRight className="size-6" />
          </button>
        )}
      </div>

      {/* 3. Bottom Controls & Field Note Bar */}
      <div className="p-4 sm:p-5 border-t border-white/10 bg-black/40 backdrop-blur-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        {/* Field Notes (if any) */}
        <div className="min-w-0 flex-1">
          {currentItem.fieldNote ? (
            <p className="text-white/80 italic text-xs leading-relaxed max-w-2xl bg-white/5 p-2 rounded-xs border border-white/10">
              &ldquo;{currentItem.fieldNote}&rdquo;
            </p>
          ) : (
            <span className="text-white/50 text-[11px]">
              Use arrow keys or buttons to navigate through all photographs.
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          {onTogglePublish && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onTogglePublish(currentItem.id)}
              className={`h-8 text-xs gap-1.5 rounded-xs border-white/20 ${
                currentItem.isPublished
                  ? "bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {currentItem.isPublished ? (
                <>
                  <Check className="size-3.5" />
                  <span>Published on Website</span>
                </>
              ) : (
                <>
                  <EyeOff className="size-3.5" />
                  <span>Draft (Click to Publish)</span>
                </>
              )}
            </Button>
          )}

          {onSetHero && !currentItem.isHero && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onSetHero(currentItem.id)}
              className="h-8 text-xs gap-1.5 rounded-xs bg-white/10 text-white border-white/20 hover:bg-white/20"
            >
              <Star className="size-3.5" />
              <span>Set as Hero Cover</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

