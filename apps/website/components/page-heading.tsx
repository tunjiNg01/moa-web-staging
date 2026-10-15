import React from "react";

export function PageHeading({
  label,
  title,
  description,
}: {
  label: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
}) {
  return (
    <section className="border-b border-border py-16 sm:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <span className="text-primary text-xs uppercase tracking-widest font-bold block mb-4">
          {label}
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-foreground max-w-4xl leading-tight">
          {title}
        </h1>
        <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
          {description}
        </p>
      </div>
    </section>
  );
}
