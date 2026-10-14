import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Button } from "@repo/ui";
import { ContactBand } from "@/components/contact-band";
import {
  getCaseStudy,
  projects,
} from "@/lib/site-content";

export function generateStaticParams() {
  return projects.map((project) => ({
    projectId: project.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ projectId: string }>;
}): Promise<Metadata> {
  const { projectId } = await params;
  const project = getCaseStudy(projectId);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Case study`,
    description: project.description,
    keywords: [
      project.title,
      project.category,
      project.focus,
      "structural case study",
      "MO&A engineering projects",
      "civil engineering Nigeria",
    ],
    alternates: {
      canonical: `/projects/${project.id}`,
    },
    openGraph: {
      title: `${project.title} | MO&A Project Case Study`,
      description: project.description,
      type: "article",
      url: `/projects/${project.id}`,
      images: [
        {
          url: project.image,
          width: 1200,
          height: 675,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | MO&A`,
      description: project.description,
      images: [project.image],
    },
  };
}

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const project = getCaseStudy(projectId);

  if (!project) {
    notFound();
  }

  const currentIndex = projects.findIndex((item) => item.id === projectId);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <div>
      {/* Case Header */}
      <section className="py-16 sm:py-20 border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground mb-8 -ml-3"
          >
            <Link href="/projects" className="inline-flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> All projects
            </Link>
          </Button>

          <span className="text-primary text-xs uppercase tracking-widest font-bold block mb-4">
            {project.category} · Case study
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-foreground max-w-4xl leading-tight">
            {project.title}
          </h1>

          <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
            {project.description}
          </p>
        </div>
      </section>

      {/* Hero Cover Image */}
      <div className="relative w-full h-[380px] sm:h-[520px] bg-muted overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Case Body & Facts Section */}
      <section className="py-20 sm:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-16 lg:gap-24 items-start">
          {/* Project Details Sidebar */}
          <aside className="border-t border-border pt-6 lg:sticky lg:top-32">
            <span className="text-primary text-xs uppercase tracking-widest font-bold block mb-6">
              Project details
            </span>

            <dl className="space-y-6">
              <div className="border-t border-border/60 pt-4">
                <dt className="text-xs uppercase tracking-wider text-muted-foreground mb-1 font-semibold">
                  Sector
                </dt>
                <dd className="text-base font-medium text-foreground">
                  {project.category}
                </dd>
              </div>

              <div className="border-t border-border/60 pt-4">
                <dt className="text-xs uppercase tracking-wider text-muted-foreground mb-1 font-semibold">
                  Structural concept
                </dt>
                <dd className="text-base font-medium text-foreground">
                  {project.system}
                </dd>
              </div>

              <div className="border-t border-border/60 pt-4">
                <dt className="text-xs uppercase tracking-wider text-muted-foreground mb-1 font-semibold">
                  Design focus
                </dt>
                <dd className="text-base font-medium text-foreground">
                  {project.focus}
                </dd>
              </div>

              <div className="border-t border-border/60 pt-4">
                <dt className="text-xs uppercase tracking-wider text-muted-foreground mb-1 font-semibold">
                  Project status
                </dt>
                <dd className="text-base font-medium text-foreground">
                  Illustrative concept
                </dd>
              </div>
            </dl>

            <p className="text-xs text-muted-foreground mt-8 leading-relaxed">
              Concept imagery and draft case-study content. Not a completed MO&A
              commission.
            </p>
          </aside>

          {/* Chapters */}
          <div className="space-y-14">
            <article className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground">
                The challenge
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {project.challenge}
              </p>
            </article>

            <article className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground">
                Our approach
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {project.approach}
              </p>
            </article>

            <article className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground">
                The design opportunity
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {project.outcome}
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* In-Focus Visual Feature */}
      <section className="py-20 sm:py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <span className="text-primary text-xs uppercase tracking-widest font-bold block mb-4">
            In focus
          </span>
          <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-foreground mb-10">
            Structure. Space. Detail.
          </h2>

          <figure className="space-y-4">
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
              <Image
                src={project.image}
                alt={`Architectural view of ${project.title.toLowerCase()}`}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="text-xs text-muted-foreground">
              Architectural concept — {project.title}. Illustrative imagery.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Next Case Study Navigation */}
      {nextProject && (
        <section className="py-16 sm:py-20 border-t border-border bg-background">
          <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <span className="text-primary text-xs uppercase tracking-widest font-bold block mb-2">
                Next case study
              </span>
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground">
                {nextProject.title}
              </h2>
            </div>
            <Button
              asChild
              className="bg-primary text-white hover:bg-primary/90 font-semibold shrink-0"
            >
              <Link
                href={`/projects/${nextProject.id}`}
                className="inline-flex items-center gap-2"
              >
                View case study <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      )}

      {/* CTA Band */}
      <ContactBand />
    </div>
  );
}
