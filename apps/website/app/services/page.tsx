import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@repo/ui";
import { PageHeading } from "@/components/page-heading";
import { ContactBand } from "@/components/contact-band";
import { services } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Explore MO&A structural design, engineering consultancy, structural assessment and rehabilitation services.",
};

export default function ServicesPage() {
  return (
    <div>
      <PageHeading
        label="Our expertise"
        title="The thinking behind stronger structures."
        description="From the first question to the final detail, we bring a considered engineering perspective to your project."
      />

      {/* Services Grid with Details */}
      <section className="py-20 sm:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {services.map((service, index) => (
            <article
              id={service.id}
              key={service.id}
              className="border-t border-border pt-8 scroll-mt-28 flex flex-col justify-between"
            >
              <div>
                <span className="text-primary text-xs font-mono font-bold block">
                  0{index + 1} /
                </span>
                <h2 className="text-2xl sm:text-3xl font-medium tracking-tight mt-6 mb-4 text-foreground">
                  {service.title}
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
                  {service.description}
                </p>

                <h3 className="text-xs uppercase tracking-wider font-bold text-foreground mb-3">
                  Capabilities
                </h3>
                <ul className="text-sm text-muted-foreground space-y-2.5 pl-4 list-disc mb-8">
                  {service.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>

                <h3 className="text-xs uppercase tracking-wider font-bold text-foreground mb-3">
                  Our Process
                </h3>
                <div className="space-y-4 mb-8">
                  {service.process.map((step, stepIndex) => (
                    <div key={step.title} className="text-xs">
                      <span className="font-semibold text-foreground block">
                        {stepIndex + 1}. {step.title}
                      </span>
                      <span className="text-muted-foreground leading-relaxed">
                        {step.description}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-border/50">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="font-semibold border-border hover:bg-secondary w-full justify-between"
                >
                  <Link href={`/projects/${service.relatedProjectId}`}>
                    View related project <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </article>
          ))}
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
