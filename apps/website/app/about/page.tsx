import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@repo/ui";
import { PageHeading } from "@/components/page-heading";
import { TeamSection } from "@/components/team-section";
import { ContactBand } from "@/components/contact-band";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet MO&A, a structural engineering consultancy focused on considered design, collaboration and the lasting value of the built environment.",
};

const values = [
  {
    title: "Clarity",
    description:
      "We make complex engineering understandable, creating a shared direction for the whole project team.",
  },
  {
    title: "Collaboration",
    description:
      "We listen, challenge constructively and develop better solutions together.",
  },
  {
    title: "Lasting value",
    description:
      "We consider the long term, designing with purpose and a practical understanding of how structures perform.",
  },
] as const;

export default function AboutPage() {
  return (
    <div>
      <PageHeading
        label="About MO&A"
        title="Engineering with purpose."
        description="We are a structural engineering consultancy. Our work connects bold ideas with the technical thinking that makes them possible."
      />

      {/* The Way We Think - Split Section */}
      <section className="py-20 sm:py-24 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-6">
            <span className="text-primary text-xs uppercase tracking-widest font-bold block">
              The way we think
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight leading-tight">
              More than a structure.
              <br />
              A foundation for possibility.
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Every project begins with an ambition. Our role is to understand
              it, ask the right questions and find the structural approach that
              brings it to life.
            </p>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              We value clear communication, considered decisions and close
              collaboration. From new buildings to existing structures, our focus
              is on solutions that make sense — for the project, for the people
              using it and for the future.
            </p>
            <div className="pt-2">
              <Button
                asChild
                variant="outline"
                className="font-semibold border-border hover:bg-secondary"
              >
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2"
                >
                  Explore our expertise <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative aspect-square w-full overflow-hidden bg-muted">
            <Image
              src="/images/structure-detail.jpg"
              alt="Sculptural concrete and steel structure"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 sm:py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <span className="text-primary text-xs uppercase tracking-widest font-bold block mb-12">
            What guides us
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {values.map((value) => (
              <div key={value.title} className="space-y-4">
                <h3 className="text-2xl font-medium tracking-tight text-foreground">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <TeamSection />

      {/* CTA Band */}
      <ContactBand />
    </div>
  );
}
