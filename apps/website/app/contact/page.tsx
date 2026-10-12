"use client";

import React, { useState, type FormEvent } from "react";
import { Download, ArrowUpRight } from "lucide-react";
import { Button, Input, Label } from "@repo/ui";
import { PageHeading } from "@/components/page-heading";

export default function ContactPage() {
  const [isPrepared, setIsPrepared] = useState(false);
  const [enquiryText, setEnquiryText] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const summary = `MO&A enquiry

Name: ${data.get("name")}
Email: ${data.get("email")}
Company: ${data.get("company") || "N/A"}
Subject: ${data.get("subject")}

${data.get("message")}`;

    setEnquiryText(summary);
    setIsPrepared(true);
  }

  function handleDownload() {
    const blobUrl = URL.createObjectURL(
      new Blob([enquiryText], { type: "text/plain" })
    );
    const anchor = document.createElement("a");
    anchor.href = blobUrl;
    anchor.download = "MOA-enquiry.txt";
    anchor.click();
    URL.revokeObjectURL(blobUrl);
  }

  return (
    <div>
      <PageHeading
        label="Contact us"
        title="Let’s build a conversation."
        description="A new project, a structural question or your next career move — it all starts here."
      />

      <section className="py-20 sm:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-24 items-start">
          {/* Information & Ethos */}
          <div className="space-y-6">
            <span className="text-primary text-xs uppercase tracking-widest font-bold block">
              Start something worthwhile
            </span>
            <h2 className="text-3xl sm:text-4xl font-medium tracking-tight leading-tight">
              Your ambition.
              <br />
              Our next conversation.
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Tell us a little about what you have in mind, and the expertise
              you’re looking for.
            </p>
            <div className="border-l-2 border-primary/40 pl-4 py-2">
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Company contact details will be added soon. You can prepare and
                download your enquiry here; messages are not yet sent to MO&A.
              </p>
            </div>
          </div>

          {/* Enquiry Form */}
          <div className="bg-secondary/40 border border-border p-8 sm:p-10 rounded-sm">
            <form
              onSubmit={handleSubmit}
              onChange={() => setIsPrepared(false)}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              <div className="space-y-2">
                <Label htmlFor="name" className="text-xs uppercase tracking-wider font-semibold">
                  Your name *
                </Label>
                <Input
                  id="name"
                  name="name"
                  autoComplete="name"
                  placeholder="Full name"
                  required
                  className="bg-background rounded-none border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs uppercase tracking-wider font-semibold">
                  Email address *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  required
                  className="bg-background rounded-none border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company" className="text-xs uppercase tracking-wider font-semibold">
                  Company
                </Label>
                <Input
                  id="company"
                  name="company"
                  autoComplete="organization"
                  placeholder="Company name (optional)"
                  className="bg-background rounded-none border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject" className="text-xs uppercase tracking-wider font-semibold">
                  What’s on your mind? *
                </Label>
                <select
                  id="subject"
                  name="subject"
                  required
                  className="w-full h-9 px-3 text-sm bg-background border border-border text-foreground rounded-none focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="Project enquiry">Project enquiry</option>
                  <option value="Engineering advice">Engineering advice</option>
                  <option value="Career opportunity">Career opportunity</option>
                  <option value="Other enquiry">Other enquiry</option>
                </select>
              </div>

              <div className="sm:col-span-2 space-y-2">
                <Label htmlFor="message" className="text-xs uppercase tracking-wider font-semibold">
                  Your message *
                </Label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="Tell us about your project or enquiry…"
                  required
                  className="w-full p-3 text-sm bg-background border border-border text-foreground rounded-none focus:outline-none focus:ring-1 focus:ring-primary resize-y"
                />
              </div>

              <div className="sm:col-span-2 pt-2">
                <Button
                  type="submit"
                  size="lg"
                  className="bg-primary text-white hover:bg-primary/90 font-semibold"
                >
                  Prepare enquiry <ArrowUpRight className="h-4 w-4 ml-2" />
                </Button>
                <p className="text-xs text-muted-foreground mt-3">
                  Your details stay in this page and are not submitted or stored remotely.
                </p>
              </div>
            </form>

            {/* Generated / Ready State */}
            {isPrepared && (
              <div
                role="status"
                className="mt-8 p-6 border-l-4 border-primary bg-background shadow-xs animate-in fade-in duration-300"
              >
                <h3 className="font-semibold text-foreground text-sm">
                  Enquiry prepared successfully
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1 mb-4 leading-relaxed">
                  Your enquiry has been formatted and is ready. You can download
                  a local copy to keep until MO&A’s direct mailbox is connected.
                </p>
                <Button
                  onClick={handleDownload}
                  variant="outline"
                  size="sm"
                  className="font-semibold border-border hover:bg-secondary inline-flex items-center gap-2"
                >
                  <Download className="h-4 w-4" /> Download enquiry (.txt)
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
