import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@repo/ui";
import { PageHeading } from "@/components/page-heading";
import { ServicesDirectory } from "@/components/services-directory";
import { ContactBand } from "@/components/contact-band";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Explore MO&A's 12 professional engineering disciplines including feasibility, detailed design, value engineering, construction audit, and expert advisory.",
};

export default function ServicesPage() {
  return (
    <div>
      <PageHeading
        label="Our expertise"
        title="12 Disciplines. One standard of engineering excellence."
        description="From pre-construction feasibility through detailed design, site supervision, and structural forensics across West Africa."
      />

      {/* Filterable Services Directory */}
      <section className="py-20 sm:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <ServicesDirectory />
        </div>
      </section>

      {/* Collaborative Approach Split Section */}
      <section className="py-20 sm:py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative aspect-square w-full overflow-hidden bg-muted">
            <Image
              src="/images/structure-detail.jpg"
              alt="Steel bracing and concrete columns in an atrium"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="space-y-6">
            <span className="text-primary text-xs uppercase tracking-widest font-bold block">
              A collaborative approach
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight leading-tight">
              Connected thinking.
              <br />
              From concept to construction.
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              The best structural solutions don’t happen in isolation. We work
              with the wider project team to understand the vision, explore the
              options and resolve the details.
            </p>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Our approach connects technical rigour with practical
              understanding, keeping architectural intent, structural performance
              and buildability in focus.
            </p>
            <div className="pt-2">
              <Button
                asChild
                className="bg-primary text-white hover:bg-primary/90 font-semibold"
              >
                <Link href="/contact" className="inline-flex items-center gap-2">
                  Discuss a project <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <ContactBand />
    </div>
  );
}
