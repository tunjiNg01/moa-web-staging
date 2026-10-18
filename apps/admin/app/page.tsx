import React from "react";
import Link from "next/link";
import {
  Building2,
  Newspaper,
  Briefcase,
  Users,
  ArrowUpRight,
  TrendingUp,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  FileText,
  Calendar,
} from "lucide-react";
import { Button, Card, Badge } from "@repo/ui";
import {
  initialProjects,
  initialNewsArticles,
  initialJobPositions,
  initialAdminUsers,
  initialAuditLogs,
} from "@/lib/admin-data";

export default function AdminDashboardPage() {
  const publishedProjects = initialProjects.filter((p) => p.status === "Published");
  const draftProjects = initialProjects.filter((p) => p.status === "Draft");

  const publishedNews = initialNewsArticles.filter((a) => a.status === "Published");
  const scheduledNews = initialNewsArticles.filter((a) => a.status === "Scheduled");

  const activeJobs = initialJobPositions.filter((j) => j.status === "Active");
  const totalNewApplicants = initialJobPositions.reduce(
    (acc, job) => acc + job.newApplicantsCount,
    0
  );

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Management Portal
            </span>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground">MO&amp;A Ltd</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-foreground">
            Executive Overview
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Centralized governance for engineering projects, editorial foresight, open positions, and administrative security.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="http://localhost:3000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex"
          >
            <Button variant="outline" size="sm" className="h-9 gap-2 text-xs rounded-xs">
              <span>View Website</span>
              <ArrowUpRight className="size-3.5" />
            </Button>
          </a>
          <Button size="sm" className="h-9 gap-1.5 text-xs rounded-xs shadow-xs">
            <Sparkles className="size-3.5" />
            <span>Generate Status Brief</span>
          </Button>
        </div>
      </div>

      {/* Primary KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Projects KPI */}
        <Link href="/projects" className="block group">
          <div className="p-5 bg-card border border-border rounded-xs transition-all hover:border-primary/50 hover:shadow-xs">
            <div className="flex items-center justify-between text-muted-foreground mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider">
                Engineering Projects
              </span>
              <div className="p-2 rounded-xs bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <Building2 className="size-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-serif font-bold text-foreground">
                {initialProjects.length}
              </span>
              <span className="text-xs font-medium text-emerald-600">
                {publishedProjects.length} live
              </span>
            </div>
            <div className="text-xs text-muted-foreground mt-2 flex items-center justify-between">
              <span>{draftProjects.length} draft in review</span>
              <span className="text-primary text-[11px] font-medium group-hover:translate-x-0.5 transition-transform">
                Manage &rarr;
              </span>
            </div>
          </div>
        </Link>

        {/* News & Foresight KPI */}
        <Link href="/news" className="block group">
          <div className="p-5 bg-card border border-border rounded-xs transition-all hover:border-primary/50 hover:shadow-xs">
            <div className="flex items-center justify-between text-muted-foreground mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider">
                News &amp; Foresight
              </span>
              <div className="p-2 rounded-xs bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <Newspaper className="size-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-serif font-bold text-foreground">
                {initialNewsArticles.length}
              </span>
              <span className="text-xs font-medium text-emerald-600">
                {publishedNews.length} published
              </span>
            </div>
            <div className="text-xs text-muted-foreground mt-2 flex items-center justify-between">
              <span>{scheduledNews.length} scheduled release</span>
              <span className="text-primary text-[11px] font-medium group-hover:translate-x-0.5 transition-transform">
                Editorial &rarr;
              </span>
            </div>
          </div>
        </Link>

        {/* Careers & ATS KPI */}
        <Link href="/careers" className="block group">
          <div className="p-5 bg-card border border-border rounded-xs transition-all hover:border-primary/50 hover:shadow-xs">
            <div className="flex items-center justify-between text-muted-foreground mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider">
                Talent Pipeline
              </span>
              <div className="p-2 rounded-xs bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <Briefcase className="size-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-serif font-bold text-foreground">
                {activeJobs.length}
              </span>
              <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
                +{totalNewApplicants} candidates
              </span>
            </div>
            <div className="text-xs text-muted-foreground mt-2 flex items-center justify-between">
              <span>{initialJobPositions.length} total requisitions</span>
              <span className="text-primary text-[11px] font-medium group-hover:translate-x-0.5 transition-transform">
                Job Board &rarr;
              </span>
            </div>
          </div>
        </Link>

        {/* Admin Team KPI */}
        <Link href="/users" className="block group">
          <div className="p-5 bg-card border border-border rounded-xs transition-all hover:border-primary/50 hover:shadow-xs">
            <div className="flex items-center justify-between text-muted-foreground mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider">
                Admin Governance
              </span>
              <div className="p-2 rounded-xs bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <Users className="size-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-serif font-bold text-foreground">
                {initialAdminUsers.length}
              </span>
              <span className="text-xs font-medium text-muted-foreground">
                Administrators
              </span>
            </div>
            <div className="text-xs text-muted-foreground mt-2 flex items-center justify-between">
              <span>2 Super Admins • RBAC</span>
              <span className="text-primary text-[11px] font-medium group-hover:translate-x-0.5 transition-transform">
                Security &rarr;
              </span>
            </div>
          </div>
        </Link>
      </div>

      {/* Split Section: Quick Action Cards & Live Feeds */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Management Hubs (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Projects Snapshot */}
          <div className="bg-card border border-border rounded-xs overflow-hidden">
            <div className="p-5 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Building2 className="size-4 text-primary" />
                <h2 className="text-sm font-semibold font-serif text-foreground">
                  Featured Project Case Studies
                </h2>
              </div>
              <Link
                href="/projects"
                className="text-xs font-medium text-primary hover:underline flex items-center gap-1"
              >
                <span>View all ({initialProjects.length})</span>
                <ArrowUpRight className="size-3" />
              </Link>
            </div>

            <div className="divide-y divide-border">
              {initialProjects.slice(0, 3).map((project) => (
                <div
                  key={project.id}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-muted/40 transition-colors"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-foreground truncate">
                        {project.title}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-xs font-medium ${
                          project.status === "Published"
                            ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20"
                            : "bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20"
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {project.caseStudy.system} — {project.caseStudy.focus}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-[11px] text-muted-foreground">
                      Updated {project.updatedAt}
                    </span>
                    <Link href={`/projects`}>
                      <Button variant="outline" size="sm" className="h-7 text-xs rounded-xs">
                        Edit Case
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* News & Foresight Editorial Queue */}
          <div className="bg-card border border-border rounded-xs overflow-hidden">
            <div className="p-5 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Newspaper className="size-4 text-primary" />
                <h2 className="text-sm font-semibold font-serif text-foreground">
                  Editorial &amp; Foresight Articles
                </h2>
              </div>
              <Link
                href="/news"
                className="text-xs font-medium text-primary hover:underline flex items-center gap-1"
              >
                <span>Editorial Room</span>
                <ArrowUpRight className="size-3" />
              </Link>
            </div>

            <div className="divide-y divide-border">
              {initialNewsArticles.slice(0, 3).map((article) => (
                <div
                  key={article.id}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-muted/40 transition-colors"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-foreground truncate">
                        {article.title}
                      </span>
                      <span className="text-[10px] font-semibold text-primary uppercase tracking-wide">
                        [{article.category}]
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                      <span>By {article.author.name}</span>
                      <span>•</span>
                      <span>{article.publishDate}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-xs font-medium ${
                        article.status === "Published"
                          ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                          : article.status === "Scheduled"
                          ? "bg-blue-500/10 text-blue-700 dark:text-blue-400"
                          : "bg-amber-500/10 text-amber-700 dark:text-amber-400"
                      }`}
                    >
                      {article.status}
                    </span>
                    <Link href={`/news`}>
                      <Button variant="ghost" size="sm" className="h-7 text-xs rounded-xs">
                        Review
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: ATS Quick View & System Activity */}
        <div className="space-y-6">
          {/* Candidates Awaiting Review */}
          <div className="bg-card border border-border rounded-xs overflow-hidden">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Briefcase className="size-4 text-primary" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
                  Talent Submissions
                </h3>
              </div>
              <Badge variant="outline" className="text-[10px] text-primary border-primary/30">
                {totalNewApplicants} Unread
              </Badge>
            </div>

            <div className="p-4 space-y-3">
              {initialJobPositions.map((job) => (
                <div
                  key={job.id}
                  className="p-3 rounded-xs bg-muted/40 border border-border/60 hover:border-primary/40 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-foreground truncate">
                        {job.title}
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">
                        {job.department} • {job.location}
                      </div>
                    </div>
                    {job.newApplicantsCount > 0 ? (
                      <span className="shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded-xs bg-primary text-white">
                        +{job.newApplicantsCount} new
                      </span>
                    ) : (
                      <span className="text-[10px] text-muted-foreground">
                        {job.applicantsCount} total
                      </span>
                    )}
                  </div>
                </div>
              ))}

              <Link href="/careers" className="block pt-2">
                <Button variant="outline" className="w-full text-xs h-8 rounded-xs">
                  Open ATS Pipeline &rarr;
                </Button>
              </Link>
            </div>
          </div>

          {/* Audit Activity Stream */}
          <div className="bg-card border border-border rounded-xs overflow-hidden">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="size-4 text-muted-foreground" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
                  Recent Audit Trail
                </h3>
              </div>
              <Link href="/audit" className="text-[11px] text-muted-foreground hover:text-primary">
                View all
              </Link>
            </div>

            <div className="p-4 space-y-4">
              {initialAuditLogs.map((log) => (
                <div key={log.id} className="flex items-start gap-3 text-xs">
                  <div className="size-2 rounded-full bg-primary mt-1.5 shrink-0" />
                  <div className="min-w-0 flex-1 leading-snug">
                    <div className="font-medium text-foreground">
                      <span className="font-semibold">{log.userName}</span> {log.action}
                    </div>
                    <div className="text-[11px] text-muted-foreground truncate mt-0.5">
                      {log.target}
                    </div>
                    <div className="text-[10px] text-muted-foreground/70 mt-0.5">
                      {log.timestamp}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
