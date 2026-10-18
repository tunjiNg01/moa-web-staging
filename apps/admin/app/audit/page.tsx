"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Search,
  Clock,
  Filter,
  User,
  Layers,
} from "lucide-react";
import { Input, Badge, Button } from "@repo/ui";
import { initialAuditLogs } from "@/lib/admin-data";

export default function AuditAdminPage() {
  const [logs, setLogs] = useState(initialAuditLogs);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLogs = logs.filter(
    (log) =>
      log.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.target.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Security
            </span>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground">Governance Records</span>
          </div>
          <h1 className="text-2xl font-serif font-bold text-foreground">
            System Audit Trail
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Immutable administrative activity logs recording content publishing, project revisions, and security changes.
          </p>
        </div>
      </div>

      <div className="bg-card p-3 border border-border rounded-xs flex items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by admin name, action, target..."
            className="h-8 pl-8 text-xs rounded-xs"
          />
        </div>

        <span className="text-xs text-muted-foreground hidden sm:inline">
          {filteredLogs.length} logged events
        </span>
      </div>

      <div className="bg-card border border-border rounded-xs overflow-hidden shadow-2xs">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-border bg-muted/50 text-muted-foreground uppercase text-[10px] tracking-wider font-semibold">
              <th className="py-3 px-4">Timestamp</th>
              <th className="py-3 px-4">Administrator</th>
              <th className="py-3 px-4">Action</th>
              <th className="py-3 px-4">Target Entity</th>
              <th className="py-3 px-4">Category</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredLogs.map((log) => (
              <tr key={log.id} className="hover:bg-muted/30 transition-colors">
                <td className="py-3 px-4 text-muted-foreground whitespace-nowrap">
                  {log.timestamp}
                </td>
                <td className="py-3 px-4 font-semibold text-foreground">
                  {log.userName}
                </td>
                <td className="py-3 px-4 font-medium text-foreground">
                  {log.action}
                </td>
                <td className="py-3 px-4 text-muted-foreground max-w-xs truncate">
                  {log.target}
                </td>
                <td className="py-3 px-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-xs bg-muted text-muted-foreground border border-border">
                    {log.category}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
