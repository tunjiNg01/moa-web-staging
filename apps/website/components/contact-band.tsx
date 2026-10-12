import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@repo/ui";

export function ContactBand() {
  return (
    <section className="bg-primary text-primary-foreground py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight">
            Great projects start with a conversation.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-primary-foreground/80 max-w-xl leading-relaxed">
            Let’s find the right structural solution for your next ambition.
          </p>
        </div>
        <Button
          asChild
          variant="secondary"
          size="lg"
          className="bg-white text-slate-900 hover:bg-slate-100 shadow-md font-semibold shrink-0"
        >
          <Link href="/contact" className="inline-flex items-center gap-2">
            Let’s talk <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
