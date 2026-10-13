import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CheckCircle2, ShieldCheck, FileCheck, Layers } from "lucide-react";
import { Button } from "@repo/ui";
import { services, getService, getCaseStudy, Service } from "@/lib/site-content";
import { ContactBand } from "@/components/contact-band";

export async function generateStaticParams() {
  return services.map((service) => ({
    serviceId: service.id,
  }));
}

interface PageProps {
  params: Promise<{ serviceId: string }>;
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { serviceId } = await params;
  const service = getService(serviceId);

  if (!service) {
    notFound();
  }

  const relatedProject = service.relatedProjectId
    ? getCaseStudy(service.relatedProjectId)
    : undefined;

  const otherServices = services
    .filter((s) => s.id !== service.id)
    .slice(0, 4);

  return (
    <div className="bg-background min-h-screen">
      {/* Editorial Header */}
      <header className="py-16 sm:py-20 border-b border-border bg-secondary/40">
        <div className="max-w-7xl mx-auto px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-6">
            <Link href="/services" className="hover:text-primary transition-colors flex items-center gap-1">
              <ArrowLeft className="h-3.5 w-3.5" /> All Services
            </Link>
            <span>/</span>
            <span className="text-foreground">{service.category}</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <span className="inline-block bg-primary text-white text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-xs shadow-xs mb-4">
                {service.category}
              </span>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-foreground leading-[1.1]">
                {service.title}
              </h1>
              <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>

            <Button
              asChild
              size="lg"
              className="bg-primary text-white hover:bg-primary/90 font-semibold px-6 shadow-md shrink-0 self-start lg:self-auto"
            >
              <Link href={`/contact?service=${encodeURIComponent(service.title)}`} className="inline-flex items-center gap-2">
                Inquire about this service <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (8 cols): Capabilities, Process & Deliverables */}
          <div className="lg:col-span-8 space-y-14">
            {/* Scope & Capabilities */}
            <div>
              <span className="text-primary text-xs uppercase tracking-widest font-bold block mb-3">
                Scope of Practice
              </span>
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground mb-6">
                Technical Capabilities
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.details.map((detail, index) => (
                  <div
                    key={index}
                    className="p-5 border border-border bg-card rounded-xs flex items-start gap-3.5 shadow-xs"
                  >
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <p className="text-sm sm:text-base font-medium text-foreground leading-snug">
                      {detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Structured Engineering Process */}
            <div>
              <span className="text-primary text-xs uppercase tracking-widest font-bold block mb-3">
                Delivery Methodology
              </span>
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground mb-6">
                How We Deliver
              </h2>
              <div className="space-y-6">
                {service.process.map((step, idx) => (
                  <div
                    key={step.title}
                    className="border-l-2 border-primary/60 pl-6 py-2 relative"
                  >
                    <span className="text-xs font-mono font-bold text-primary block mb-1">
                      Stage 0{idx + 1}
                    </span>
                    <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tangible Engineering Deliverables */}
            <div className="p-8 border border-border bg-secondary/50 rounded-xs">
              <div className="flex items-center gap-3 mb-4">
                <FileCheck className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">
                  Tangible Deliverables You Receive
                </h3>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-foreground/90 font-medium">
                {service.deliverables.map((deliv, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    <span>{deliv}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Sidebar (4 cols): Commission Card & Related Project */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Commission Card */}
            <div className="p-6 sm:p-8 bg-card border border-border rounded-xs shadow-xs space-y-6">
              <div className="flex items-center gap-2.5 text-xs uppercase tracking-widest font-bold text-primary">
                <ShieldCheck className="h-4 w-4" /> Professional Engagement
              </div>
              <h3 className="text-xl font-semibold tracking-tight text-foreground leading-snug">
                Need consultation on {service.title}?
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Connect directly with MO&amp;A’s structural directors to scope your project requirements and receive preliminary guidance.
              </p>
              <Button
                asChild
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-6 shadow-md"
              >
                <Link href={`/contact?service=${encodeURIComponent(service.title)}`}>
                  Initiate Project Brief
                </Link>
              </Button>
            </div>

            {/* Related Case Study */}
            {relatedProject && (
              <div className="p-6 bg-card border border-border rounded-xs shadow-xs space-y-4">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-primary block">
                  Relevant Case Study
                </span>
                <div className="relative aspect-video w-full rounded-xs overflow-hidden bg-muted">
                  <Image
                    src={relatedProject.image}
                    alt={relatedProject.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 360px"
                    className="object-cover"
                  />
                </div>
                <h4 className="text-base font-semibold text-foreground">
                  {relatedProject.title}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  {relatedProject.description}
                </p>
                <Link
                  href={`/projects/${relatedProject.id}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                >
                  Explore project details <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            )}

            {/* Other Services Navigation */}
            <div className="p-6 bg-card border border-border rounded-xs shadow-xs space-y-3">
              <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground block mb-2">
                Related Services
              </span>
              <div className="flex flex-col divide-y divide-border/60">
                {otherServices.map((other) => (
                  <Link
                    key={other.id}
                    href={`/services/${other.id}`}
                    className="py-2.5 text-xs sm:text-sm font-medium text-slate-700 hover:text-primary flex items-center justify-between group transition-colors"
                  >
                    <span>{other.title}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Bottom CTA Band */}
      <ContactBand />
    </div>
  );
}
