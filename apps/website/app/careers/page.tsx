import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@repo/ui";
import { PageHeading } from "@/components/page-heading";
import { ContactBand } from "@/components/contact-band";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Explore a future in structural engineering with MO&A and express your interest in joining our consultancy.",
};

export default function CareersPage() {
  return (
    <div>
      <PageHeading
        label="Careers at MO&A"
        title="Bring your thinking. Build your future."
        description="Good engineering starts with curious minds. If you care about the built environment and enjoy finding thoughtful solutions, we’d like to hear from you."
      />

      <section className="py-20 sm:py-24 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative aspect-square w-full overflow-hidden bg-muted order-2 lg:order-1">
            <Image
              src="/images/residential-project.jpg"
              alt="Modern residential architecture and shared courtyard"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="space-y-6 order-1 lg:order-2">
            <span className="text-primary text-xs uppercase tracking-widest font-bold block">
              Make your next move
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight leading-tight">
              A shared ambition.
              <br />
              A different perspective.
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Whether you’re taking your first steps into engineering or bringing
              an established perspective, your curiosity and ideas matter.
            </p>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              We welcome expressions of interest from structural engineers,
              design professionals and emerging talent who want to shape
              meaningful, long-lasting spaces.
            </p>
            <div className="pt-2">
              <Button
                asChild
                className="bg-primary text-white hover:bg-primary/90 font-semibold"
              >
                <Link href="/contact" className="inline-flex items-center gap-2">
                  Express your interest <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <ContactBand />
    </div>
  );
}
