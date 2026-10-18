"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  Newspaper,
  Briefcase,
  Users,
  FileSpreadsheet,
  Wrench,
  ShieldCheck,
  ExternalLink,
  Sliders,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage, Badge } from "@repo/ui";
import { initialAdminUsers } from "@/lib/admin-data";

interface AdminSidebarProps {
  onNavigate?: () => void;
  className?: string;
}

export function AdminSidebar({ onNavigate, className = "" }: AdminSidebarProps) {
  const pathname = usePathname();
  const currentUser = initialAdminUsers[0]; // Engr. Funsho Morgan (Super Admin)

  const navItems = [
    {
      label: "Dashboard",
      href: "/",
      icon: LayoutDashboard,
      badge: null,
      lineThrough: false,
      disabled: false,
    },
    {
      label: "Projects & Cases",
      href: "/projects",
      icon: Building2,
      badge: "4",
      lineThrough: false,
      disabled: false,
    },
    {
      label: "News & Foresight",
      href: "/news",
      icon: Newspaper,
      badge: "4",
      lineThrough: false,
      disabled: false,
    },
    {
      label: "Careers & ATS",
      href: "/careers",
      icon: Briefcase,
      badge: "13 new",
      highlightBadge: true,
      lineThrough: false,
      disabled: false,
    },
    {
      label: "Tender Management",
      href: "/tenders",
      icon: FileSpreadsheet,
      badge: "Soon",
      lineThrough: true,
      disabled: true,
    },
    {
      label: "Tools Management",
      href: "/tools",
      icon: Wrench,
      badge: "Soon",
      lineThrough: true,
      disabled: true,
    },
    {
      label: "Admin Users",
      href: "/users",
      icon: Users,
      badge: "4",
      lineThrough: false,
      disabled: false,
    },
  ];

  const secondaryNavItems = [
    {
      label: "Audit & Activity",
      href: "/audit",
      icon: ShieldCheck,
    },
    {
      label: "System Settings",
      href: "/settings",
      icon: Sliders,
    },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={`flex flex-col justify-between w-64 shrink-0 bg-[#141213] text-[#e8e6e6] border-r border-[#262325] select-none h-full ${className}`}
    >
      {/* Brand & Header */}
      <div>
        <div className="p-5 border-b border-[#262325]">
          <Link
            href="/"
            onClick={onNavigate}
            className="flex items-center gap-3 group transition-transform active:scale-98"
          >
            <div className="relative h-9 flex items-center rounded-xs overflow-hidden shadow-xs shrink-0">
              <Image
                src="/images/moa-logo.png"
                alt="MO&A Logo"
                width={100}
                height={32}
                className="h-8 w-auto object-contain rounded-xs"
                priority
              />
            </div>
            <div className="flex flex-col leading-none">
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-base font-bold tracking-tight text-white">
                  MO&amp;A Ltd
                </span>
                <span className="text-[10px] font-medium tracking-wide uppercase px-1.5 py-0.5 rounded-xs bg-[#2e1d21] text-[#d48c95] border border-[#522930]">
                  Admin
                </span>
              </div>
              <span className="text-[11px] text-[#9c9698] font-sans tracking-tight mt-1">
                Engineering &amp; Advisory CMS
              </span>
            </div>
          </Link>
        </div>

        {/* Primary Navigation */}
        <div className="px-3 py-4 space-y-6">
          <div>
            <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-[#736c6f]">
              Management
            </div>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = !item.disabled && isActive(item.href);

                const itemContent = (
                  <div
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xs text-xs font-medium transition-all group ${
                      item.disabled
                        ? "text-[#666063] cursor-not-allowed select-none"
                        : active
                        ? "bg-[#70333A] text-white shadow-sm font-semibold"
                        : "text-[#b0a9ab] hover:text-white hover:bg-[#201d1f]"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon
                        className={`size-4 shrink-0 transition-colors ${
                          item.disabled
                            ? "text-[#4d474a]"
                            : active
                            ? "text-white"
                            : "text-[#7f787b] group-hover:text-white"
                        }`}
                      />
                      <span
                        className={`truncate ${
                          item.lineThrough
                            ? "line-through decoration-[#70333A] decoration-2 text-[#787175]"
                            : ""
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>

                    {item.badge && (
                      <span
                        className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-xs ${
                          item.disabled
                            ? "bg-[#201d1f] text-[#6b6467] border border-[#2d282b]"
                            : active
                            ? "bg-white/20 text-white"
                            : item.highlightBadge
                            ? "bg-[#70333A]/80 text-[#ffd5d9]"
                            : "bg-[#282426] text-[#9c9698]"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                );

                if (item.disabled) {
                  return (
                    <div
                      key={item.label}
                      title={`${item.label} (Planned Module)`}
                    >
                      {itemContent}
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onNavigate}
                  >
                    {itemContent}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div>
            <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-[#736c6f]">
              Governance
            </div>
            <nav className="space-y-1">
              {secondaryNavItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onNavigate}
                    className={`flex items-center justify-between px-3 py-2 rounded-xs text-xs font-medium transition-all group ${
                      active
                        ? "bg-[#70333A] text-white font-semibold"
                        : "text-[#b0a9ab] hover:text-white hover:bg-[#201d1f]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`size-4 shrink-0 transition-colors ${
                          active
                            ? "text-white"
                            : "text-[#7f787b] group-hover:text-white"
                        }`}
                      />
                      <span>{item.label}</span>
                    </div>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Footer Profile & Live Link */}
      <div className="p-3 border-t border-[#262325] space-y-2 bg-[#121011]">
        {/* Live Site Quick Link */}
        <a
          href="http://localhost:3000"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between w-full px-3 py-2 rounded-xs bg-[#1d1a1c] hover:bg-[#262224] text-xs font-medium text-[#c4bdc0] hover:text-white border border-[#2c282a] transition-all group"
        >
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Public Website</span>
          </div>
          <ExternalLink className="size-3.5 text-[#7f787b] group-hover:text-white transition-colors" />
        </a>

        {/* Current User Chip */}
        <div className="flex items-center justify-between p-2 rounded-xs bg-[#191618] border border-[#262325]">
          <div className="flex items-center gap-2.5 min-w-0">
            <Avatar className="size-8 rounded-xs border border-[#3d3639]">
              <AvatarImage src={currentUser?.avatar} alt={currentUser?.name} />
              <AvatarFallback className="rounded-xs bg-[#70333A] text-white text-[11px] font-serif">
                FM
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 leading-tight">
              <div className="text-xs font-semibold text-white truncate">
                {currentUser?.name}
              </div>
              <div className="text-[10px] text-[#9c9698] truncate">
                Super Admin
              </div>
            </div>
          </div>
          <Link
            href="/login"
            title="Log out"
            className="p-1.5 text-[#7f787b] hover:text-white hover:bg-[#262224] rounded-xs transition-colors"
          >
            <LogOut className="size-3.5" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
