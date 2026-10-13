import React from "react";
import Link from "next/link";
import { ArrowUpRight, Download } from "lucide-react";
import { Button } from "@repo/ui";
import { HeroParallaxSection } from "@/components/hero-parallax-section";
import { ProjectGallery } from "@/components/project-gallery";
import { NewsForesightSection } from "@/components/news-foresight-section";
import { ContactBand } from "@/components/contact-band";
import { services } from "@/lib/site-content";

export default function HomePage() {
  return (
    <div>
      {/* Hero Section with Parallax Background Video */}
      <HeroParallaxSection />

      {/* Intro Manifesto / Company Overview Section */}
      <section className="py-20 sm:py-24 border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Company Background & Regional Expansion */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-primary text-xs uppercase tracking-widest font-bold block">
                Engineering &amp; Development Consultancy
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight leading-tight text-foreground">
                Behind every great structure,
                <br />
                there’s trusted expertise.
              </h2>
            </div>

            <p className="text-base sm:text-lg text-foreground/90 leading-relaxed font-normal pt-2">
              <strong className="font-semibold text-foreground">Morgan Omonitan &amp; Abe Ltd – MO&amp;A</strong>, is an engineering &amp; development consulting firm in Nigeria, with recent expansion to Ghana in West Africa.
            </p>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Founded in 1972, <strong className="font-semibold text-foreground">MO&amp;A</strong> has over 40 years of experience and expertise in providing integrated engineering &amp; development consulting services such as civil &amp; structural engineering, project management and independent expert services to the private &amp; public sectors. <strong className="font-semibold text-foreground">MO&amp;A</strong> has built a legacy of several successfully executed projects and partnerships with clients and stakeholders.
            </p>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              <strong className="font-semibold text-foreground">MO&amp;A</strong> continues to evolve and expand to accomplish ground breaking projects and developments in Nigeria and within the region.{" "}
              <Link
                href="/about"
                className="inline-flex items-center gap-1 font-semibold text-primary hover:underline ml-1"
              >
                Read More <ArrowUpRight className="h-4 w-4" />
              </Link>
            </p>
          </div>

          {/* Right Column: Leadership Quote Card & Download Brochure CTA */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="bg-[#374151] text-white p-7 sm:p-8 rounded-sm shadow-md border border-slate-700/60 flex flex-col justify-between">
              <p className="text-sm sm:text-base leading-relaxed italic text-slate-100 font-light">
                &ldquo;A diversity of Stakeholders from all over the world, including Governments, Multinationals, Bilateral Agencies, Public and Private Sector Businesses and Individuals engage us to provide specialist services for their major engineering and construction projects. We are proud of our position as one of Nigeria&apos;s most knowledgeable and respected engineering consultancy firms.&rdquo;
              </p>
              <div className="mt-6 pt-4 border-t border-slate-600/80">
                <span className="text-xs uppercase tracking-wider font-semibold text-slate-300 block">
                  CEO and Managing Director
                </span>
              </div>
            </div>

            <Button
              asChild
              size="lg"
              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold uppercase tracking-wider text-xs sm:text-sm py-6 rounded-sm shadow-md transition-all active:scale-[0.99]"
            >
              <Link href="/contact?subject=brochure" className="flex items-center justify-center gap-2">
                <Download className="h-4 w-4" />
                <span>DOWNLOAD BROCHURE</span>
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

      {/* News & Foresight Section */}
      <NewsForesightSection />

      {/* Bottom CTA Band */}
      <ContactBand />
    </div>
  );
}
