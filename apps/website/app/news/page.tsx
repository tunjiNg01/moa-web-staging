"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import { Button } from "@repo/ui";
import { getAllNews, NewsArticle } from "@/lib/site-content";
import { ContactBand } from "@/components/contact-band";

const categories = [
  "All",
  "Foresight",
  "Sustainability",
  "Company News",
  "Industry Insight",
] as const;

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const allArticles = getAllNews();

  const filteredArticles =
    selectedCategory === "All"
      ? allArticles
      : allArticles.filter((article) => article.category === selectedCategory);

  return (
    <div className="bg-background min-h-screen">
      {/* Editorial Header */}
      <section className="py-20 sm:py-24 border-b border-border bg-secondary/50">
        <div className="max-w-7xl mx-auto px-6">
          <span className="text-primary text-xs uppercase tracking-widest font-bold block mb-4">
            Research, Perspectives &amp; Updates
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-foreground max-w-3xl leading-[1.1]">
            News &amp; Foresight.
          </h1>
          <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Thought leadership from MO&amp;A’s engineers and consultants. We examine future structural challenges, low-carbon materials, and the evolving infrastructure landscape across West Africa and beyond.
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2.5 mt-10" role="tablist" aria-label="Article categories">
            {categories.map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <Button
                  key={category}
                  variant={isSelected ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  aria-pressed={isSelected}
                  className={
                    isSelected
                      ? "bg-primary text-primary-foreground font-semibold"
                      : "border-border text-foreground hover:bg-secondary"
                  }
                >
                  {category}
                </Button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article: NewsArticle) => (
              <article
                key={article.id}
                className="group flex flex-col justify-between border border-border bg-card rounded-xs overflow-hidden shadow-xs hover:border-slate-400 transition-all duration-300"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-primary text-white text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-xs shadow-md">
                      {article.category}
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {article.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {article.readTime}
                      </span>
                    </div>

                    <h2 className="text-xl font-medium tracking-tight text-foreground group-hover:text-primary transition-colors leading-snug mb-3">
                      <Link href={`/news/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h2>

                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {article.summary}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-border/60">
                  <span className="text-xs text-muted-foreground font-medium">
                    {article.author.name}
                  </span>
                  <Link
                    href={`/news/${article.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:translate-x-0.5 transition-transform"
                  >
                    Read article <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-20 border border-dashed border-border rounded-xs">
              <p className="text-muted-foreground">
                No articles found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Bottom Contact Band */}
      <ContactBand />
    </div>
  );
}
