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
  Copy,
  Check,
  Edit3,
  ExternalLink,
  Shield,
  UserX,
  UserCheck,
  Sparkles,
} from "lucide-react";
import {
  Button,
  Badge,
  Input,
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui";
import { initialAdminUsers, type AdminUser, type AdminRole } from "@/lib/admin-data";
import { UserFormModal } from "@/components/user-form-modal";

export default function UsersAdminPage() {
  const [users, setUsers] = useState<AdminUser[]>(initialAdminUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<AdminUser | null>(null);
  const [copiedUserId, setCopiedUserId] = useState<string | null>(null);

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenInvite = () => {
    setUserToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (user: AdminUser) => {
    setUserToEdit(user);
    setIsModalOpen(true);
  };

  const handleSaveUser = (savedUser: AdminUser) => {
    setUsers((prev) => {
      const idx = prev.findIndex((u) => u.id === savedUser.id);
      if (idx !== -1) {
        const next = [...prev];
        next[idx] = savedUser;
        return next;
      }
      return [savedUser, ...prev];
    });
  };

  const handleToggleStatus = (user: AdminUser) => {
    const nextStatus = user.status === "Active" ? "Inactive" : "Active";
    setUsers((prev) =>
      prev.map((u) => (u.id === user.id ? { ...u, status: nextStatus } : u))
    );
  };

  const handleCopyInviteLink = (user: AdminUser) => {
    const token = `inv_${user.id}_${Date.now().toString(36)}`;
    const link = `http://localhost:3001/invite/${token}`;
    navigator.clipboard.writeText(link);
    setCopiedUserId(user.id);
    setTimeout(() => setCopiedUserId(null), 2500);
  };

  const getRoleBadge = (role: AdminRole) => {
    switch (role) {
      case "SUPER_ADMIN":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-xs text-[11px] font-semibold bg-primary text-white shadow-2xs">
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
            <KeyRound className="size-3" />
            <span>Reviewer</span>
          </span>
        );
    }
  };

  const totalAdmins = users.length;
  const activeAdmins = users.filter((u) => u.status === "Active").length;
  const pendingInvites = users.filter((u) => u.status === "Invited").length;
  const superAdmins = users.filter((u) => u.role === "SUPER_ADMIN").length;

  return (
    <div className="space-y-6">
      {/* Top Banner & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Access Governance
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
          <Button
            size="sm"
            onClick={handleOpenInvite}
            className="h-9 gap-2 text-xs rounded-xs"
          >
            <UserPlus className="size-4" />
            <span>Invite Administrator</span>
          </Button>
        </div>
      </div>

      {/* KPI Stat Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-card border border-border rounded-xs">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Total Administrators
          </div>
          <div className="text-2xl font-serif font-bold text-foreground mt-1">
            {totalAdmins}
          </div>
        </div>

        <div className="p-4 bg-card border border-border rounded-xs">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Active on Platform
          </div>
          <div className="text-2xl font-serif font-bold text-emerald-600 mt-1">
            {activeAdmins}
          </div>
        </div>

        <div className="p-4 bg-card border border-border rounded-xs">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Pending Invitations
          </div>
          <div className="text-2xl font-serif font-bold text-blue-600 mt-1">
            {pendingInvites}
          </div>
        </div>

        <div className="p-4 bg-card border border-border rounded-xs">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Super Admins
          </div>
          <div className="text-2xl font-serif font-bold text-primary mt-1">
            {superAdmins}
          </div>
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
                          : user.status === "Invited"
                          ? "bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/20"
                          : "bg-muted text-muted-foreground border border-border"
                      }`}
                    >
                      <span
                        className={`size-1.5 rounded-full ${
                          user.status === "Active"
                            ? "bg-emerald-500"
                            : user.status === "Invited"
                            ? "bg-blue-500"
                            : "bg-zinc-400"
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
                      {user.status === "Invited" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopyInviteLink(user)}
                          className="h-7 text-xs px-2 rounded-xs text-muted-foreground hover:text-foreground"
                          title="Copy setup link for invited user"
                        >
                          {copiedUserId === user.id ? (
                            <Check className="size-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="size-3.5" />
                          )}
                        </Button>
                      )}

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenEdit(user)}
                        className="h-7 text-xs px-2.5 rounded-xs gap-1"
                      >
                        <Edit3 className="size-3" />
                        <span>Edit Role</span>
                      </Button>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-7 rounded-xs text-muted-foreground hover:text-foreground"
                          >
                            <MoreVertical className="size-3.5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 text-xs">
                          <DropdownMenuItem onClick={() => handleOpenEdit(user)}>
                            <Edit3 className="size-3.5 mr-2" />
                            <span>Edit Role &amp; Access</span>
                          </DropdownMenuItem>

                          {user.status === "Invited" && (
                            <DropdownMenuItem onClick={() => handleCopyInviteLink(user)}>
                              <Copy className="size-3.5 mr-2" />
                              <span>Copy Onboarding Link</span>
                            </DropdownMenuItem>
                          )}

                          <DropdownMenuSeparator />

                          <DropdownMenuItem
                            onClick={() => handleToggleStatus(user)}
                            className={user.status === "Active" ? "text-destructive" : "text-emerald-600"}
                          >
                            {user.status === "Active" ? (
                              <>
                                <UserX className="size-3.5 mr-2" />
                                <span>Suspend Access</span>
                              </>
                            ) : (
                              <>
                                <UserCheck className="size-3.5 mr-2" />
                                <span>Activate Account</span>
                              </>
                            )}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Form & RBAC Modal */}
      <UserFormModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        userToEdit={userToEdit}
        onSave={handleSaveUser}
      />
    </div>
  );
}
