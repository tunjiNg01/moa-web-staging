"use client";

import React, { useState } from "react";
import {
  Users,
  UserPlus,
  ShieldCheck,
  Search,
  MoreVertical,
  CheckCircle2,
  Clock,
  ShieldAlert,
  KeyRound,
  Mail,
} from "lucide-react";
import {
  Button,
  Badge,
  Input,
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui";
import { initialAdminUsers, type AdminUser, type AdminRole } from "@/lib/admin-data";

export default function UsersAdminPage() {
  const [users, setUsers] = useState<AdminUser[]>(initialAdminUsers);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRoleBadge = (role: AdminRole) => {
    switch (role) {
      case "SUPER_ADMIN":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-xs text-[11px] font-semibold bg-primary text-white">
            <ShieldCheck className="size-3" />
            <span>Super Admin</span>
          </span>
        );
      case "EDITOR":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-xs text-[11px] font-medium bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="size-3" />
            <span>Editor</span>
          </span>
        );
      case "REVIEWER":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-xs text-[11px] font-medium bg-muted text-muted-foreground border border-border">
            <span>Reviewer</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Access Control
            </span>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground">Security &amp; Permissions</span>
          </div>
          <h1 className="text-2xl font-serif font-bold text-foreground">
            Admin Users &amp; Roles
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage administrative credentials, role-based access permissions (RBAC), and session security.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button size="sm" className="h-9 gap-2 text-xs rounded-xs">
            <UserPlus className="size-4" />
            <span>Invite Administrator</span>
          </Button>
        </div>
      </div>

      {/* Role Definitions Ribbon */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-card border border-border rounded-xs space-y-1.5">
          <div className="flex items-center gap-2 text-primary font-serif font-bold text-sm">
            <ShieldCheck className="size-4" />
            <span>Super Admin</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Full root privileges. Can invite/remove administrators, change system configurations, and delete records.
          </p>
        </div>

        <div className="p-4 bg-card border border-border rounded-xs space-y-1.5">
          <div className="flex items-center gap-2 text-foreground font-serif font-bold text-sm">
            <CheckCircle2 className="size-4 text-emerald-600" />
            <span>Editor</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Can create, edit, schedule, and publish Projects, News &amp; Foresight, and Career positions.
          </p>
        </div>

        <div className="p-4 bg-card border border-border rounded-xs space-y-1.5">
          <div className="flex items-center gap-2 text-muted-foreground font-serif font-bold text-sm">
            <KeyRound className="size-4" />
            <span>Reviewer</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Can draft submissions, view candidate resumes, and perform quality checks without publishing.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex items-center justify-between gap-4 bg-card p-3 border border-border rounded-xs">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search administrators by name, email..."
            className="h-8 pl-8 text-xs rounded-xs"
          />
        </div>

        <span className="text-xs text-muted-foreground hidden sm:inline">
          {filteredUsers.length} total administrators
        </span>
      </div>

      {/* Users Table */}
      <div className="bg-card border border-border rounded-xs overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/50 text-muted-foreground uppercase text-[10px] tracking-wider font-semibold">
                <th className="py-3 px-4">Administrator</th>
                <th className="py-3 px-4">Role &amp; Scope</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Last Activity</th>
                <th className="py-3 px-4">Registered</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-muted/30 transition-colors group"
                >
                  <td className="py-4 px-4 font-medium">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-8 rounded-xs border border-border">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="rounded-xs bg-[#70333A] text-white text-[11px] font-serif">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold text-foreground text-sm font-serif">
                          {user.name}
                        </div>
                        <div className="text-[11px] text-muted-foreground flex items-center gap-1">
                          <Mail className="size-3" />
                          <span>{user.email}</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    {getRoleBadge(user.role)}
                  </td>

                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-xs text-[11px] font-medium ${
                        user.status === "Active"
                          ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20"
                          : "bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/20"
                      }`}
                    >
                      <span
                        className={`size-1.5 rounded-full ${
                          user.status === "Active" ? "bg-emerald-500" : "bg-blue-500"
                        }`}
                      />
                      {user.status}
                    </span>
                  </td>

                  <td className="py-4 px-4 text-muted-foreground text-[11px]">
                    {user.lastActive}
                  </td>

                  <td className="py-4 px-4 text-muted-foreground text-[11px]">
                    {user.createdAt}
                  </td>

                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 text-xs px-2.5 rounded-xs"
                      >
                        Edit Role
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
