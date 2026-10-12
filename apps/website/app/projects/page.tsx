import React from "react";
import type { Metadata } from "next";
import { PageHeading } from "@/components/page-heading";
import { ProjectGallery } from "@/components/project-gallery";
import { ContactBand } from "@/components/contact-band";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore structural engineering possibilities across public, commercial and residential environments with MO&A.",
};

export default function ProjectsPage() {
  return (
    <div>
      <PageHeading
        label="Engineering possibilities"
        title="Ambition, made tangible."
        description="A look at the spaces and structural possibilities that inspire our thinking — from expressive public buildings to the places we call home."
      />

      <section className="py-20 sm:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <ProjectGallery filterable />
        </div>
      </section>

      <ContactBand />
    </div>
  );
}
