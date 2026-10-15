import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowDown, ArrowUpRight, Award, CheckCircle2, Compass, Shield, Users } from "lucide-react";
import { Button } from "@repo/ui";
import { PageHeading } from "@/components/page-heading";
import { ContactBand } from "@/components/contact-band";
import { MoaBrand } from "@/components/moa-brand";
import { JobBoard } from "@/components/job-board";
import { careerValues } from "@/lib/jobs-data";

export const metadata: Metadata = {
  title: "Careers & Opportunities | Join MO&A Ltd",
  description:
    "Explore engineering careers and open applications at MO&A Ltd (formerly Morgan Omonitan & Abe Ltd). Join our structural and civil consultancy practice in Nigeria and Ghana.",
  alternates: {
    canonical: "/careers",
  },
  openGraph: {
    title: "Careers at MO&A | Build Your Future in Engineering",
    description:
      "Explore engineering careers and open application opportunities at MO&A across Nigeria and Ghana.",
    url: "/careers",
    type: "website",
  },
};

export default function CareersPage() {
  return (
    <div>
      <PageHeading
        label={<>Careers at <MoaBrand className="font-bold" /></>}
        title="Bring your thinking. Build your future."
        description="Good engineering starts with curious minds. If you care about the built environment and enjoy resolving technical complexity, we invite you to build a lasting legacy with us."
      />

      {/* Intro Ethos Section */}
      <section className="py-20 sm:py-24 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative aspect-square w-full overflow-hidden bg-muted order-2 lg:order-1 rounded-xs border border-border">
            <Image
              src="/images/residential-project.jpg"
              alt="Modern architectural engineering and structural integrity"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
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
              Whether you’re taking your first steps into engineering through our Young Pioneers Programme or bringing decades of chartered expertise, your curiosity, rigor, and technical judgment matter.
            </p>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              We welcome open applications from structural engineers, civil infrastructure specialists, project directors, BIM modelers, and emerging talent across Nigeria, Ghana, and broader West Africa.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Button
                asChild
                className="bg-primary text-white hover:bg-primary/90 font-semibold"
              >
                <a href="#job-board" className="inline-flex items-center gap-2">
                  View Open Vacancies <ArrowDown className="h-4 w-4" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-border hover:bg-secondary font-medium"
              >
                <Link href="/about" className="inline-flex items-center gap-2">
                  Our Firm Ethos <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Work at MO&A Pillars */}
      <section className="py-20 bg-secondary/30 border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-14 space-y-3">
            <span className="text-primary text-xs uppercase tracking-widest font-bold block">
              The MO&A Practice Culture
            </span>
            <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-foreground">
              Why engineers build their careers with us.
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              We cultivate an environment of technical autonomy, uncompromising ethical integrity, and continuous mentorship.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {careerValues.map((value, idx) => (
              <div
                key={idx}
                className="p-6 rounded-sm bg-background border border-border space-y-3 shadow-xs hover:border-primary/40 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                  0{idx + 1}
                </div>
                <h3 className="text-lg font-medium tracking-tight text-foreground">
                  {value.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Job Board Component */}
      <JobBoard />

      {/* Contact & General Enquiry Band */}
      <ContactBand />
    </div>
  );
}
