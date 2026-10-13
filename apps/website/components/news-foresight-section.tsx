import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import { Button } from "@repo/ui";
import { getFeaturedNews } from "@/lib/site-content";

export function NewsForesightSection() {
  const articles = getFeaturedNews();
  const primaryArticle = articles[0];
  const sideArticles = articles.slice(1, 3);

  if (!primaryArticle) return null;

  return (
    <section className="py-20 sm:py-24 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <span className="text-primary text-xs uppercase tracking-widest font-bold block mb-3">
              Thought Leadership &amp; Industry Perspectives
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight leading-tight text-foreground">
              News &amp; Foresight.
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-xl">
              Explorations in structural engineering, materials science, and regional development across the built environment.
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="font-semibold border-border hover:bg-secondary self-start sm:self-auto shrink-0"
          >
            <Link href="/news" className="inline-flex items-center gap-2">
              All perspectives <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Featured Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Hero Article Card */}
          <article className="lg:col-span-7 group flex flex-col justify-between border border-border bg-card rounded-xs overflow-hidden shadow-xs hover:border-slate-400 transition-all duration-300">
            <div>
              <div className="relative aspect-video w-full overflow-hidden bg-muted">
                <Image
                  src={primaryArticle.image}
                  alt={primaryArticle.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-primary text-white text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-xs shadow-md">
                  {primaryArticle.category}
                </span>
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-4 text-xs text-muted-foreground font-medium mb-3">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {primaryArticle.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {primaryArticle.readTime}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground group-hover:text-primary transition-colors leading-snug mb-4">
                  <Link href={`/news/${primaryArticle.slug}`}>
                    {primaryArticle.title}
                  </Link>
                </h3>

                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed line-clamp-3">
                  {primaryArticle.summary}
                </p>
              </div>
            </div>

            <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-2 flex items-center justify-between border-t border-border/60">
              <span className="text-xs text-foreground font-semibold">
                By {primaryArticle.author.name}
              </span>
              <Link
                href={`/news/${primaryArticle.slug}`}
                className="inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:translate-x-0.5 transition-transform"
              >
                Read article <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </article>

          {/* Secondary Companion Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {sideArticles.map((article) => (
              <article
                key={article.id}
                className="group flex-1 flex flex-col justify-between border border-border bg-card rounded-xs p-6 shadow-xs hover:border-slate-400 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-primary">
                      {article.category}
                    </span>
                    <span className="text-xs text-muted-foreground font-mono">
                      {article.date}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-medium tracking-tight text-foreground group-hover:text-primary transition-colors leading-snug mb-3">
                    <Link href={`/news/${article.slug}`}>{article.title}</Link>
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {article.summary}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-border/60 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {article.readTime}
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
        </div>
      </div>
    </section>
  );
}
