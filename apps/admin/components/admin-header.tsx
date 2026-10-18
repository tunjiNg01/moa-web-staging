"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  Search,
  Plus,
  Bell,
  CheckCircle2,
  Building2,
  Newspaper,
  Briefcase,
  UserPlus,
  ArrowUpRight,
} from "lucide-react";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui";

interface AdminHeaderProps {
  onOpenMobileNav: () => void;
}

export function AdminHeader({ onOpenMobileNav }: AdminHeaderProps) {
  const pathname = usePathname();

  // Route titles mapping
  const getSectionTitle = () => {
    if (pathname === "/") return "Executive Overview";
    if (pathname.startsWith("/projects")) return "Projects & Case Studies";
    if (pathname.startsWith("/news")) return "News & Foresight Pipeline";
    if (pathname.startsWith("/careers")) return "Careers & Talent Pipeline";
    if (pathname.startsWith("/users")) return "Admin Users & Permissions";
    if (pathname.startsWith("/audit")) return "System Audit Trail";
    if (pathname.startsWith("/settings")) return "Portal Configuration";
    return "Admin Console";
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-card border-b border-border px-4 sm:px-6 flex items-center justify-between gap-4">
      {/* Left: Mobile trigger & Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileNav}
          className="md:hidden p-2 -ml-2 text-muted-foreground hover:text-foreground rounded-xs hover:bg-muted transition-colors"
          aria-label="Open mobile navigation"
        >
          <Menu className="size-5" />
        </button>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-block text-xs uppercase tracking-wider text-muted-foreground font-semibold">
            MO&amp;A
          </span>
          <span className="hidden sm:inline-block text-muted-foreground/40 text-xs">/</span>
          <h1 className="text-sm sm:text-base font-semibold text-foreground font-serif tracking-tight">
            {getSectionTitle()}
          </h1>
        </div>
      </div>

      {/* Center/Right: Search, Sync Status, Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Search */}
        <div className="relative hidden lg:block w-64 xl:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search projects, articles, positions..."
            className="w-full h-8 pl-8 pr-12 text-xs bg-muted/50 border border-border rounded-xs focus:outline-none focus:border-primary focus:bg-background transition-colors placeholder:text-muted-foreground"
          />
          <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-muted-foreground bg-background px-1.5 py-0.5 border border-border rounded-xs shadow-2xs">
            ⌘K
          </kbd>
        </div>

        {/* Live Sync Status */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xs bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-[11px] font-medium">
          <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Website Live Sync</span>
        </div>

        {/* Notifications */}
        <button
          className="relative p-2 text-muted-foreground hover:text-foreground rounded-xs hover:bg-muted transition-colors"
          title="Notifications"
        >
          <Bell className="size-4" />
          <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-primary" />
        </button>

        {/* Quick Action Button with Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" className="h-8 gap-1.5 px-3 text-xs rounded-xs font-medium">
              <Plus className="size-3.5" />
              <span className="hidden xs:inline">New Content</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 rounded-xs p-1">
            <DropdownMenuLabel className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-2 py-1.5">
              Quick Creation
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="cursor-pointer text-xs rounded-xs">
              <Link href="/projects/new" className="flex items-center gap-2.5">
                <Building2 className="size-3.5 text-primary" />
                <span>Add Project / Case Study</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer text-xs rounded-xs">
              <Link href="/news/new" className="flex items-center gap-2.5">
                <Newspaper className="size-3.5 text-primary" />
                <span>Draft Foresight Article</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer text-xs rounded-xs">
              <Link href="/careers/new" className="flex items-center gap-2.5">
                <Briefcase className="size-3.5 text-primary" />
                <span>Post Job Position</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="cursor-pointer text-xs rounded-xs">
              <Link href="/users/invite" className="flex items-center gap-2.5">
                <UserPlus className="size-3.5 text-muted-foreground" />
                <span>Invite Admin User</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
