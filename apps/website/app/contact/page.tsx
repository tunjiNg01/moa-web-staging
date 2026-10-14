"use client";

import React, { useState, type FormEvent } from "react";
import { Download, ArrowUpRight, MapPin, Mail, Phone, Globe, Send } from "lucide-react";
import { Button, Input, Label } from "@repo/ui";
import { PageHeading } from "@/components/page-heading";

export default function ContactPage() {
  const [isPrepared, setIsPrepared] = useState(false);
  const [enquiryText, setEnquiryText] = useState("");
  const [mailtoLink, setMailtoLink] = useState("");

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
    setMailtoLink(
      `mailto:info@moanigeria.com?subject=${encodeURIComponent(
        `[Website Enquiry] ${data.get("subject")}: ${data.get("name")}`
      )}&body=${encodeURIComponent(summary)}`
    );
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
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20 items-start">
          {/* Information & Ethos + Contact Details */}
          <div className="space-y-8">
            <div className="space-y-3">
              <span className="text-primary text-xs uppercase tracking-widest font-bold block">
                Start something worthwhile
              </span>
              <h2 className="text-3xl sm:text-4xl font-medium tracking-tight leading-tight">
                Your ambition.
                <br />
                Our next conversation.
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                Connect directly with our multidisciplinary team for engineering consultancy, structural advisory, project management, or development partnerships.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-4 pt-2">
              {/* Office Address */}
              <div className="flex items-start gap-4 p-5 rounded-xs bg-secondary/60 border border-border">
                <div className="p-2.5 rounded-xs bg-primary/10 text-primary shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-muted-foreground block mb-1">
                    Head Office &amp; Postal Address
                  </span>
                  <p className="text-sm font-semibold text-foreground">
                    241, Igbosere Road, Lagos,
                  </p>
                  <p className="text-sm text-muted-foreground">
                    P.O Box 7121, Lagos, Nigeria
                  </p>
                </div>
              </div>

              {/* Phone Numbers */}
              <div className="flex items-start gap-4 p-5 rounded-xs bg-secondary/60 border border-border">
                <div className="p-2.5 rounded-xs bg-primary/10 text-primary shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-muted-foreground block mb-1">
                    Phone Inquiries
                  </span>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm font-semibold">
                    <a
                      href="tel:+2348089137683"
                      className="text-foreground hover:text-primary transition-colors"
                    >
                      +234 (0) 808-913-7683
                    </a>
                    <span className="hidden sm:inline text-border">•</span>
                    <a
                      href="tel:+2349093608794"
                      className="text-foreground hover:text-primary transition-colors"
                    >
                      +234 (0) 909-360-8794
                    </a>
                  </div>
                </div>
              </div>

              {/* Email & Website */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3.5 p-4 rounded-xs bg-secondary/60 border border-border">
                  <div className="p-2 rounded-xs bg-primary/10 text-primary shrink-0">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] uppercase font-bold tracking-wider text-muted-foreground block">
                      Email
                    </span>
                    <a
                      href="mailto:info@moanigeria.com"
                      className="text-xs sm:text-sm font-semibold text-foreground hover:text-primary transition-colors truncate block"
                    >
                      info@moanigeria.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-xs bg-secondary/60 border border-border">
                  <div className="p-2 rounded-xs bg-primary/10 text-primary shrink-0">
                    <Globe className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] uppercase font-bold tracking-wider text-muted-foreground block">
                      Website
                    </span>
                    <a
                      href="https://www.moanigeria.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm font-semibold text-foreground hover:text-primary transition-colors truncate block"
                    >
                      www.moanigeria.com
                    </a>
                  </div>
                </div>
              </div>
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
                  Your details stay secure and you can dispatch via your preferred mail client.
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
                  Enquiry formatted and ready
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1 mb-4 leading-relaxed">
                  Your message has been organized. Send it directly to <strong>info@moanigeria.com</strong> via your email app or download a local copy.
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <Button
                    asChild
                    size="sm"
                    className="bg-primary text-white hover:bg-primary/90 font-semibold inline-flex items-center gap-2"
                  >
                    <a href={mailtoLink}>
                      <Send className="h-4 w-4" /> Send to info@moanigeria.com
                    </a>
                  </Button>
                  <Button
                    onClick={handleDownload}
                    variant="outline"
                    size="sm"
                    className="font-semibold border-border hover:bg-secondary inline-flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" /> Download enquiry (.txt)
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
