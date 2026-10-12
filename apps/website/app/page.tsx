import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { Button } from "@repo/ui";
import { ProjectGallery } from "@/components/project-gallery";
import { ContactBand } from "@/components/contact-band";
import { services } from "@/lib/site-content";

export default function HomePage() {
  return (
    <div>
      {/* Hero Section with Looping Background Video */}
      <section className="relative min-h-[640px] h-screen max-h-[920px] overflow-hidden bg-ink text-white flex items-center">
        {/* Looping Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/images/engineering-hero.jpg"
          className="absolute inset-0 w-full h-full object-cover object-center"
        >
          <source src="/videos/hero-background.webm" type="video/webm" />
          {/* Fallback image */}
          <Image
            src="/images/engineering-hero.jpg"
            alt="Sculptural concrete and glass building with a sweeping cantilevered roof"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </video>

        {/* Cinematic Multi-Layer Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/70 to-black/30 z-10" />
        <div className="absolute inset-0 bg-black/25 z-10" />

        {/* Hero Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full h-full flex flex-col justify-center pt-24 sm:pt-28 pb-16">
          <div className="flex items-center gap-3 text-xs uppercase tracking-widest font-semibold text-white/90 mb-6 before:content-[''] before:h-px before:w-7 before:bg-white/70">
            MO&A · Engineering with purpose
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-medium tracking-tight text-white max-w-3xl leading-[1.05]">
            Structural engineering.
            <br />
            Lasting impact.
          </h1>

          <p className="mt-6 text-base sm:text-lg text-white/90 max-w-md leading-relaxed font-normal">
            We turn bold visions into sound structures.
            <br />
            Thoughtful design. Technical excellence.
            <br />
            A stronger built environment.
          </p>

          <div className="mt-8">
            <Button
              asChild
              size="lg"
              className="bg-primary text-white hover:bg-primary/90 font-semibold px-6 shadow-lg"
            >
              <Link href="/projects" className="inline-flex items-center gap-2">
                Explore our work <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="absolute bottom-8 left-6 right-6 max-w-7xl mx-auto flex items-center justify-between text-xs uppercase tracking-widest text-white/60">
            <span className="flex items-center gap-2.5">
              <ArrowDown className="h-3.5 w-3.5 text-primary" /> A foundation for
              what’s next
            </span>
            <span className="hidden sm:inline-block border-b border-white/20 pb-1 font-mono">
              01 — 03
            </span>
          </div>
        </div>
      </section>

      {/* Intro Manifesto Section */}
      <section className="py-20 sm:py-24 border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-24 items-start">
          <div>
            <span className="text-primary text-xs uppercase tracking-widest font-bold block mb-4">
              Built on expertise. Driven by possibility.
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight leading-tight">
              Behind every great building,
              <br />
              there’s great engineering.
            </h2>
          </div>

          <div className="space-y-6">
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              At MO&A, we see more than structures. We see the people, ideas and
              ambitions they support. We bring clarity to complexity, creating
              engineering solutions that are considered, practical and built to
              last.
            </p>
            <Button
              asChild
              variant="outline"
              className="font-semibold border-border hover:bg-secondary"
            >
              <Link href="/about" className="inline-flex items-center gap-2">
                Discover MO&A <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Expertise / Services Section */}
      <section className="py-20 sm:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <div>
              <span className="text-primary text-xs uppercase tracking-widest font-bold block mb-4">
                Our expertise
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight leading-tight">
                Strong thinking.
                <br />
                Sound solutions.
              </h2>
            </div>
            <Button
              asChild
              variant="outline"
              className="font-semibold border-border hover:bg-secondary self-start sm:self-auto"
            >
              <Link href="/services" className="inline-flex items-center gap-2">
                All services <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <article
                key={service.id}
                className="border-t border-border pt-6 flex flex-col justify-between"
              >
                <div>
                  <span className="text-primary text-xs font-mono font-bold block">
                    0{index + 1} /
                  </span>
                  <h3 className="text-2xl font-medium tracking-tight mt-6 mb-3 text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="self-start font-medium border-border hover:bg-secondary"
                >
                  <Link
                    href={`/services#${service.id}`}
                    className="inline-flex items-center gap-1.5"
                  >
                    Learn more <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Showcase Section */}
      <section className="py-20 sm:py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <div>
              <span className="text-primary text-xs uppercase tracking-widest font-bold block mb-4">
                Engineering possibilities
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight leading-tight">
                Ambition, made tangible.
              </h2>
            </div>
            <Button
              asChild
              variant="outline"
              className="font-semibold border-border bg-background hover:bg-secondary self-start sm:self-auto"
            >
              <Link href="/projects" className="inline-flex items-center gap-2">
                Explore projects <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <ProjectGallery />
        </div>
      </section>

      {/* Bottom CTA Band */}
      <ContactBand />
    </div>
  );
}
