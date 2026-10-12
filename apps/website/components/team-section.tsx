import React from "react";

export function TeamSection() {
  return (
    <section className="py-20 sm:py-24 border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div>
            <span className="text-primary text-xs uppercase tracking-widest font-bold block mb-4">
              Our team
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight leading-tight">
              The people behind
              <br />
              the thinking.
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground text-sm sm:text-base leading-relaxed">
            Good engineering is a shared effort. Meet the people who bring their
            perspective, care and technical thinking to MO&A.
          </p>
        </div>

        <div className="flex items-center gap-8 border-y border-border py-10">
          <div className="flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 bg-secondary text-primary font-bold text-2xl sm:text-3xl shrink-0 font-serif">
            MO&A
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-medium text-foreground mb-2">
              Meet the MO&A team
            </h3>
            <p className="text-muted-foreground text-sm sm:text-base">
              Individual team profiles and key leadership members will be published soon.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
