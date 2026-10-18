"use client";

import React from "react";
import { Sliders, Globe, Shield, RefreshCw, CheckCircle2 } from "lucide-react";
import { Button, Input, Card } from "@repo/ui";

export default function SettingsAdminPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="pb-6 border-b border-border">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            Settings
          </span>
          <span className="text-xs text-muted-foreground">•</span>
          <span className="text-xs text-muted-foreground">Portal Configuration</span>
        </div>
        <h1 className="text-2xl font-serif font-bold text-foreground">
          System &amp; Cache Configuration
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage synchronization between the admin console and the public website, ISR cache revalidation, and API endpoints.
        </p>
      </div>

      <div className="space-y-6">
        {/* Website Sync Card */}
        <div className="bg-card border border-border rounded-xs p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Globe className="size-4 text-primary" />
              <h2 className="text-sm font-semibold font-serif text-foreground">
                Public Website Integration
              </h2>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-xs text-[11px] font-medium bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              Connected
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-medium text-foreground block mb-1">
                Website Public URL
              </label>
              <Input
                readOnly
                defaultValue="http://localhost:3000"
                className="h-8 text-xs bg-muted/40 font-mono"
              />
            </div>
            <div>
              <label className="font-medium text-foreground block mb-1">
                Admin Console Port
              </label>
              <Input
                readOnly
                defaultValue="http://localhost:3001"
                className="h-8 text-xs bg-muted/40 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Cache Revalidation */}
        <div className="bg-card border border-border rounded-xs p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <RefreshCw className="size-4 text-primary" />
              <h2 className="text-sm font-semibold font-serif text-foreground">
                On-Demand ISR Cache Purge
              </h2>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Instantly invalidate the public Next.js page cache across Projects, News &amp; Foresight, and Careers to reflect published edits immediately.
          </p>
          <div className="flex gap-3">
            <Button size="sm" variant="outline" className="h-8 text-xs rounded-xs">
              Purge Projects Cache
            </Button>
            <Button size="sm" variant="outline" className="h-8 text-xs rounded-xs">
              Purge News Cache
            </Button>
            <Button size="sm" variant="outline" className="h-8 text-xs rounded-xs">
              Purge Job Board Cache
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
