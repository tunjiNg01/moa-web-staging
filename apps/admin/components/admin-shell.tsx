"use client";

import React, { useState } from "react";
import { AdminSidebar } from "./admin-sidebar";
import { AdminHeader } from "./admin-header";
import { Sheet, SheetContent } from "@repo/ui";

interface AdminShellProps {
  children: React.ReactNode;
}

export function AdminShell({ children }: AdminShellProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop Persistent Sidebar */}
      <div className="hidden md:flex shrink-0">
        <AdminSidebar />
      </div>

      {/* Mobile Sidebar via Sheet */}
      <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
        <SheetContent side="left" className="p-0 w-64 bg-[#141213] border-r border-[#262325]">
          <AdminSidebar onNavigate={() => setMobileNavOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <AdminHeader onOpenMobileNav={() => setMobileNavOpen(true)} />
        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-8 sm:py-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
