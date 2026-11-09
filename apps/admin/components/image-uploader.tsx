"use client";

import React, { useState, useRef } from "react";
import {
  UploadCloud,
  X,
  Star,
  StarOff,
  Image as ImageIcon,
  Check,
  AlertCircle,
  Eye,
  Trash2,
  MoveUp,
  MoveDown,
} from "lucide-react";
import { Button, Input, Label, Badge } from "@repo/ui";

export interface UploadedImageItem {
  id: string;
  url: string;
  name: string;
  isHero: boolean;
  altText?: string;
  size?: string;
}

export interface ImageUploaderProps {
  images: UploadedImageItem[];
  onChange: (images: UploadedImageItem[]) => void;
  label?: string;
  helperText?: string;
}

export function ImageUploader({
  images,
  onChange,
  label = "Upload Project Media",
  helperText = "WebP, JPG, or PNG. Maximum 10MB per file. Multiple files supported.",
}: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFiles = (fileList: FileList | File[]) => {
    setError(null);
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    const newItems: UploadedImageItem[] = [];

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      if (!file) continue;

      if (!validTypes.includes(file.type)) {
        setError("One or more files have unsupported formats. Allowed: JPG, PNG, WebP.");
        continue;
      }

      if (file.size > 10 * 1024 * 1024) {
        setError(`"${file.name}" exceeds 10MB limit.`);
        continue;
      }

      const previewUrl = URL.createObjectURL(file);
      const formattedSize =
        file.size > 1024 * 1024
          ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
          : `${Math.round(file.size / 1024)} KB`;

      newItems.push({
        id: `img_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        url: previewUrl,
        name: file.name,
        isHero: images.length === 0 && newItems.length === 0, // First image is default hero
        size: formattedSize,
        altText: "",
      });
    }

    if (newItems.length > 0) {
      onChange([...images, ...newItems]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
    // Reset file input so user can select the same file again if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveImage = (idToRemove: string) => {
    const updated = images.filter((img) => img.id !== idToRemove);
    // If the removed image was hero and other images remain, make the first one hero
    if (images.find((img) => img.id === idToRemove)?.isHero && updated.length > 0) {
      if (updated[0]) {
        updated[0].isHero = true;
      }
    }
    onChange(updated);
  };

  const handleSetHero = (idToHero: string) => {
    const updated = images.map((img) => ({
      ...img,
      isHero: img.id === idToHero,
    }));
    onChange(updated);
  };

  const handleAltTextChange = (id: string, text: string) => {
    const updated = images.map((img) =>
      img.id === id ? { ...img, altText: text } : img
    );
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      {/* 1. Top Upload Dropzone */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-xs font-semibold text-foreground uppercase tracking-wider">
            {label}
          </Label>
          <span className="text-[11px] text-muted-foreground">
            {images.length} {images.length === 1 ? "image" : "images"} attached
          </span>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileInputChange}
          className="hidden"
        />

        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-xs p-6 text-center cursor-pointer transition-all ${
            isDragging
              ? "border-primary bg-primary/5 scale-[0.99]"
              : "border-border hover:border-primary/50 hover:bg-muted/30"
          }`}
        >
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <UploadCloud className="size-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground">
                <span className="text-primary hover:underline">Click to upload</span> or drag and drop
              </p>
              <p className="text-[11px] text-muted-foreground mt-1">
                {helperText}
              </p>
            </div>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-xs text-destructive p-2.5 rounded-xs bg-destructive/10 border border-destructive/20">
            <AlertCircle className="size-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* 2. Stacked Images at the Bottom of the Upload Field */}
      <div className="space-y-2.5 pt-2">
        <div className="flex items-center justify-between border-b border-border pb-1.5">
          <span className="text-xs font-bold uppercase tracking-wider text-foreground">
            Stacked Image Assets
          </span>
          <span className="text-[10px] text-muted-foreground">
            {images.length === 0 ? "No assets" : "Click star to set Primary Hero"}
          </span>
        </div>

        {images.length === 0 ? (
          <div className="p-5 border border-dashed border-border/80 rounded-xs text-center bg-muted/20">
            <ImageIcon className="size-6 text-muted-foreground/60 mx-auto mb-1.5" />
            <p className="text-xs text-muted-foreground">
              No images uploaded yet.
            </p>
            <p className="text-[11px] text-muted-foreground/70 mt-0.5">
              Upload photographs above to populate the case study visual gallery.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {images.map((item, index) => (
              <div
                key={item.id}
                className={`p-3 rounded-xs border transition-all ${
                  item.isHero
                    ? "border-primary/60 bg-primary/5 shadow-2xs"
                    : "border-border bg-card hover:border-border/80"
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Thumbnail */}
                  <div className="relative size-16 sm:size-20 shrink-0 rounded-xs overflow-hidden border border-border bg-muted/60">
                    <img
                      src={item.url}
                      alt={item.altText || item.name}
                      className="w-full h-full object-cover"
                    />
                    {item.isHero && (
                      <span className="absolute top-1 left-1 bg-primary text-white text-[9px] font-bold px-1 py-0.2 rounded-xs shadow-xs">
                        Hero
                      </span>
                    )}
                  </div>

                  {/* Details & Controls */}
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-foreground truncate">
                          {item.name}
                        </div>
                        <div className="text-[10px] text-muted-foreground flex items-center gap-2 mt-0.5 font-mono">
                          {item.size && <span>{item.size}</span>}
                          <span>•</span>
                          <span>Image #{index + 1}</span>
                        </div>
                      </div>

                      {/* Top Action Buttons */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        {item.isHero ? (
                          <Badge
                            variant="outline"
                            className="text-[10px] bg-primary/10 text-primary border-primary/30 gap-1 h-6"
                          >
                            <Star className="size-3 fill-primary text-primary" />
                            <span>Primary Hero</span>
                          </Badge>
                        ) : (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSetHero(item.id)}
                            className="h-6 text-[10px] px-2 text-muted-foreground hover:text-primary gap-1"
                          >
                            <Star className="size-3" />
                            <span>Make Hero</span>
                          </Button>
                        )}

                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveImage(item.id)}
                          className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                          title="Remove image"
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
                      </div>
                    </div>

                    {/* Alt Text Input */}
                    <div className="pt-0.5">
                      <Input
                        value={item.altText || ""}
                        onChange={(e) => handleAltTextChange(item.id, e.target.value)}
                        placeholder="Image description / alt text for accessibility..."
                        className="h-7 text-[11px] rounded-xs bg-background/80"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
