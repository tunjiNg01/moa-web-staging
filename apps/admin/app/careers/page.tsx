"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  Plus,
  Search,
  Users,
  MapPin,
  Calendar,
  ExternalLink,
  Edit3,
  CheckCircle2,
  AlertCircle,
  FileText,
} from "lucide-react";
import {
  Button,
  Badge,
  Input,
} from "@repo/ui";
import { initialJobPositions, type AdminJobPosition } from "@/lib/admin-data";

export default function CareersAdminPage() {
  const [jobs, setJobs] = useState<AdminJobPosition[]>(initialJobPositions);
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const statuses = ["All", "Active", "Draft", "Closed"];

  const filteredJobs = jobs.filter((job) => {
    const matchesStatus =
      selectedStatus === "All" || job.status === selectedStatus;
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalApplicants = jobs.reduce((acc, j) => acc + j.applicantsCount, 0);
  const totalNewApplicants = jobs.reduce((acc, j) => acc + j.newApplicantsCount, 0);

  return (
    <div className="space-y-6">
      {/* Top Banner & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Talent Acquisition
            </span>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground">Engineering Careers &amp; ATS</span>
          </div>
          <h1 className="text-2xl font-serif font-bold text-foreground">
            Career Job Board &amp; Requisitions
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Publish engineering openings, coordinate graduate trainee programs, and track incoming candidate applications.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button size="sm" className="h-9 gap-2 text-xs rounded-xs">
            <Plus className="size-4" />
            <span>Post New Position</span>
          </Button>
        </div>
      </div>

      {/* Mini Stat Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-card border border-border rounded-xs">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Total Requisitions
          </div>
          <div className="text-2xl font-serif font-bold text-foreground mt-1">
            {jobs.length}
          </div>
        </div>

        <div className="p-4 bg-card border border-border rounded-xs">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Active on Website
          </div>
          <div className="text-2xl font-serif font-bold text-emerald-600 mt-1">
            {jobs.filter((j) => j.status === "Active").length}
          </div>
        </div>

        <div className="p-4 bg-card border border-border rounded-xs">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Candidate Pipeline
          </div>
          <div className="text-2xl font-serif font-bold text-foreground mt-1">
            {totalApplicants}
          </div>
        </div>

        <div className="p-4 bg-card border border-border rounded-xs">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Unreviewed Resumes
          </div>
          <div className="text-2xl font-serif font-bold text-primary mt-1">
            {totalNewApplicants}
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-card p-3 border border-border rounded-xs">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-3 py-1.5 rounded-xs text-xs font-medium whitespace-nowrap transition-colors ${
                selectedStatus === status
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search roles, departments, locations..."
            className="h-8 pl-8 text-xs rounded-xs"
          />
        </div>
      </div>

      {/* Positions Table */}
      <div className="bg-card border border-border rounded-xs overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/50 text-muted-foreground uppercase text-[10px] tracking-wider font-semibold">
                <th className="py-3 px-4">Position Title &amp; Department</th>
                <th className="py-3 px-4">Location &amp; Type</th>
                <th className="py-3 px-4">Experience Level</th>
                <th className="py-3 px-4">Status &amp; Deadline</th>
                <th className="py-3 px-4">Applications</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredJobs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-muted-foreground">
                    No career postings found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredJobs.map((job) => (
                  <tr
                    key={job.id}
                    className="hover:bg-muted/30 transition-colors group"
                  >
                    <td className="py-4 px-4 font-medium">
                      <div className="flex items-start gap-3">
                        <div className="size-9 rounded-xs bg-muted border border-border flex items-center justify-center shrink-0 text-muted-foreground group-hover:border-primary/40 group-hover:text-primary transition-colors mt-0.5">
                          <Briefcase className="size-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-foreground text-sm font-serif">
                            {job.title}
                          </div>
                          <div className="text-[11px] text-primary font-medium mt-0.5">
                            {job.department}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4 text-foreground">
                      <div className="flex items-center gap-1.5 text-xs">
                        <MapPin className="size-3 text-muted-foreground" />
                        <span>{job.location}</span>
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">
                        {job.type}
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <span className="px-2 py-0.5 rounded-xs bg-muted border border-border text-[11px] text-foreground font-medium">
                        {job.level}
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-xs text-[11px] font-medium ${
                          job.status === "Active"
                            ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20"
                            : "bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20"
                        }`}
                      >
                        <span
                          className={`size-1.5 rounded-full ${
                            job.status === "Active"
                              ? "bg-emerald-500"
                              : "bg-amber-500"
                          }`}
                        />
                        {job.status}
                      </span>
                      <div className="text-[11px] text-muted-foreground mt-1 flex items-center gap-1">
                        <Calendar className="size-3" />
                        <span>Closes {job.deadline}</span>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground text-sm font-serif">
                          {job.applicantsCount}
                        </span>
                        {job.newApplicantsCount > 0 && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-xs bg-primary text-white">
                            +{job.newApplicantsCount} new
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-muted-foreground">
                        Candidates received
                      </span>
                    </td>

                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href="http://localhost:3000/careers"
                          target="_blank"
                          rel="noopener noreferrer"
                          title="View on Live Job Board"
                          className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-xs transition-colors"
                        >
                          <ExternalLink className="size-3.5" />
                        </a>

                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 text-xs px-2.5 rounded-xs gap-1"
                        >
                          <Users className="size-3" />
                          <span>Applicants</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
