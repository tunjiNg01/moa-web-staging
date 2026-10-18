"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Newspaper,
  Plus,
  Search,
  ExternalLink,
  Edit3,
  Calendar,
  Eye,
  Clock,
  Sparkles,
} from "lucide-react";
import {
  Button,
  Badge,
  Input,
} from "@repo/ui";
import { initialNewsArticles, type AdminNewsArticle } from "@/lib/admin-data";

export default function NewsAdminPage() {
  const [articles, setArticles] = useState<AdminNewsArticle[]>(initialNewsArticles);
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const statuses = ["All", "Published", "Scheduled", "Draft"];

  const filteredArticles = articles.filter((article) => {
    const matchesStatus =
      selectedStatus === "All" || article.status === selectedStatus;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.author.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Publications
            </span>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground">Foresight &amp; Industry Insights</span>
          </div>
          <h1 className="text-2xl font-serif font-bold text-foreground">
            News &amp; Foresight Editorial
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Draft, review, schedule, and publish corporate announcements, geotechnical whitepapers, and sustainability thought leadership.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button size="sm" className="h-9 gap-2 text-xs rounded-xs">
            <Plus className="size-4" />
            <span>Draft New Article</span>
          </Button>
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
            placeholder="Search articles, authors, topics..."
            className="h-8 pl-8 text-xs rounded-xs"
          />
        </div>
      </div>

      {/* Articles Table */}
      <div className="bg-card border border-border rounded-xs overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/50 text-muted-foreground uppercase text-[10px] tracking-wider font-semibold">
                <th className="py-3 px-4">Article Title &amp; Category</th>
                <th className="py-3 px-4">Author Attribution</th>
                <th className="py-3 px-4">Status &amp; Schedule</th>
                <th className="py-3 px-4">Read Time &amp; Views</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredArticles.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-muted-foreground">
                    No articles found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredArticles.map((article) => (
                  <tr
                    key={article.id}
                    className="hover:bg-muted/30 transition-colors group"
                  >
                    <td className="py-4 px-4 font-medium max-w-md">
                      <div className="flex items-start gap-3">
                        <div className="size-9 rounded-xs bg-muted border border-border flex items-center justify-center shrink-0 text-muted-foreground group-hover:border-primary/40 group-hover:text-primary transition-colors mt-0.5">
                          <Newspaper className="size-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-foreground text-sm font-serif line-clamp-1">
                            {article.title}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                              {article.category}
                            </span>
                            {article.featured && (
                              <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.2 rounded-xs border border-primary/20">
                                Featured
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <div className="font-medium text-foreground">{article.author.name}</div>
                      <div className="text-[11px] text-muted-foreground">
                        {article.author.role}
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-xs text-[11px] font-medium ${
                            article.status === "Published"
                              ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20"
                              : article.status === "Scheduled"
                              ? "bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/20"
                              : "bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20"
                          }`}
                        >
                          <span
                            className={`size-1.5 rounded-full ${
                              article.status === "Published"
                                ? "bg-emerald-500"
                                : article.status === "Scheduled"
                                ? "bg-blue-500"
                                : "bg-amber-500"
                            }`}
                          />
                          {article.status}
                        </span>
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-1 flex items-center gap-1">
                        <Calendar className="size-3" />
                        <span>{article.publishDate}</span>
                      </div>
                    </td>

                    <td className="py-4 px-4 text-muted-foreground text-[11px]">
                      <div>{article.readTime}</div>
                      {article.viewsCount !== undefined && article.viewsCount > 0 && (
                        <div className="text-foreground font-medium flex items-center gap-1 mt-0.5">
                          <Eye className="size-3 text-muted-foreground" />
                          <span>{article.viewsCount.toLocaleString()} reads</span>
                        </div>
                      )}
                    </td>

                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {article.status === "Published" && (
                          <a
                            href={`http://localhost:3000/news/${article.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="View on Website"
                            className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-xs transition-colors"
                          >
                            <ExternalLink className="size-3.5" />
                          </a>
                        )}

                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 text-xs px-2.5 rounded-xs gap-1"
                        >
                          <Edit3 className="size-3" />
                          <span>Edit</span>
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
