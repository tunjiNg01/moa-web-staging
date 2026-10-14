import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Calendar, Clock, Share2 } from "lucide-react";
import { Button } from "@repo/ui";
import { getAllNews, getNewsArticle } from "@/lib/site-content";
import { ContactBand } from "@/components/contact-band";

export async function generateStaticParams() {
  const articles = getAllNews();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getNewsArticle(slug);

  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: `${article.title} | News & Foresight`,
    description: article.summary,
    keywords: [
      article.category,
      "engineering foresight",
      "sustainable infrastructure",
      "MO&A insights",
      article.title,
    ],
    alternates: {
      canonical: `/news/${article.slug}`,
    },
    openGraph: {
      title: `${article.title} | MO&A Foresight`,
      description: article.summary,
      type: "article",
      publishedTime: article.date,
      authors: [article.author.name],
      url: `/news/${article.slug}`,
      images: [
        {
          url: article.image,
          width: 1200,
          height: 675,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.title} | MO&A`,
      description: article.summary,
      images: [article.image],
    },
  };
}

export default async function NewsArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getNewsArticle(slug);

  if (!article) {
    notFound();
  }

  const allArticles = getAllNews();
  const relatedArticles = allArticles
    .filter((a) => a.slug !== article.slug)
    .slice(0, 2);

  return (
    <article className="bg-background min-h-screen">
      {/* Article Header */}
      <header className="py-16 sm:py-20 border-b border-border bg-secondary/30">
        <div className="max-w-4xl mx-auto px-6">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" /> Back to News &amp; Foresight
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="bg-primary text-white text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-xs">
              {article.category}
            </span>
            <span className="text-xs text-muted-foreground flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {article.date}
            </span>
            <span className="text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {article.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-foreground leading-[1.15] mb-6">
            {article.title}
          </h1>

          <div className="flex items-center justify-between border-t border-border/80 pt-6 mt-6">
            <div>
              <p className="text-sm font-semibold text-foreground">
                {article.author.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {article.author.role}
              </p>
            </div>
            <div className="text-xs text-muted-foreground font-mono">
              MO&amp;A Technical Publications
            </div>
          </div>
        </div>
      </header>

      {/* Featured Media Banner */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="relative aspect-[21/9] sm:aspect-[16/7] w-full rounded-xs overflow-hidden shadow-md bg-muted">
          <Image
            src={article.image}
            alt={article.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1200px"
            className="object-cover object-center"
          />
        </div>
      </div>

      {/* Article Body */}
      <div className="max-w-3xl mx-auto px-6 pb-20">
        {/* Lead Summary */}
        <p className="text-lg sm:text-xl font-normal text-foreground leading-relaxed border-l-2 border-primary pl-6 py-1 mb-10 italic">
          {article.summary}
        </p>

        {/* Narrative Paragraphs */}
        <div className="space-y-6 text-base sm:text-lg text-foreground/85 leading-relaxed font-normal">
          {article.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* Share / Footer Action */}
        <div className="mt-14 pt-8 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
            Category: <span className="text-foreground">{article.category}</span>
          </div>
          <Button
            asChild
            variant="outline"
            size="sm"
            className="border-border hover:bg-secondary font-semibold"
          >
            <Link href="/contact" className="inline-flex items-center gap-1.5">
              Discuss this topic with our team <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Related Foresight Section */}
      {relatedArticles.length > 0 && (
        <section className="py-16 bg-secondary/50 border-t border-border">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-xs uppercase tracking-widest font-bold text-primary mb-8">
              Related Insights &amp; Foresight
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedArticles.map((rel) => (
                <article
                  key={rel.id}
                  className="bg-card border border-border p-6 rounded-xs flex flex-col justify-between shadow-xs hover:border-slate-400 transition-all"
                >
                  <div>
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-primary block mb-2">
                      {rel.category}
                    </span>
                    <h3 className="text-lg font-medium tracking-tight text-foreground mb-3">
                      <Link href={`/news/${rel.slug}`}>{rel.title}</Link>
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {rel.summary}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground font-mono">
                      {rel.date}
                    </span>
                    <Link
                      href={`/news/${rel.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-primary"
                    >
                      Read article <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom Contact Band */}
      <ContactBand />
    </article>
  );
}
