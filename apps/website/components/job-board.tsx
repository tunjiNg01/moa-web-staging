"use client";

import React, { useState, useMemo } from "react";
import {
  Briefcase,
  MapPin,
  Clock,
  GraduationCap,
  Search,
  Filter,
  CheckCircle2,
  ArrowRight,
  X,
  FileText,
  UploadCloud,
  Send,
  Building2,
  Sparkles,
  ChevronRight,
  Download,
  Mail,
  Share2,
} from "lucide-react";
import { Button, Input, Label } from "@repo/ui";
import { openPositions, JobPosition } from "@/lib/jobs-data";
import { MoaBrand } from "./moa-brand";

export function JobBoard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string>("All");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("All");
  const [selectedType, setSelectedType] = useState<string>("All");

  // Selected job for the modal
  const [activeJob, setActiveJob] = useState<JobPosition | null>(null);
  const [activeTab, setActiveTab] = useState<"details" | "apply">("details");

  // Application form state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [experienceYears, setExperienceYears] = useState("");
  const [qualification, setQualification] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [coverNote, setCoverNote] = useState("");
  const [fileName, setFileName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [appReference, setAppReference] = useState("");

  // Extract distinct departments & countries for filters
  const departments = useMemo(() => {
    const set = new Set<string>();
    openPositions.forEach((j) => set.add(j.department));
    return ["All", ...Array.from(set)];
  }, []);

  // Filtered positions
  const filteredPositions = useMemo(() => {
    return openPositions.filter((job) => {
      const matchesSearch =
        searchQuery === "" ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCountry =
        selectedCountry === "All" ||
        job.country === selectedCountry ||
        (selectedCountry === "Regional" && job.country === "Regional");

      const matchesDept =
        selectedDepartment === "All" || job.department === selectedDepartment;

      const matchesType =
        selectedType === "All" || job.type === selectedType;

      return matchesSearch && matchesCountry && matchesDept && matchesType;
    });
  }, [searchQuery, selectedCountry, selectedDepartment, selectedType]);

  function handleOpenModal(job: JobPosition, tab: "details" | "apply" = "details") {
    setActiveJob(job);
    setActiveTab(tab);
    setIsSubmitted(false);
  }

  function handleCloseModal() {
    setActiveJob(null);
    setIsSubmitted(false);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  }

  function handleSubmitApplication(e: React.FormEvent) {
    e.preventDefault();
    if (!fullName || !email) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const ref = `MOA-${Math.floor(100000 + Math.random() * 900000)}`;
      setAppReference(ref);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  }

  function handleDownloadSummary() {
    if (!activeJob) return;
    const summaryText = `MO&A CAREER APPLICATION SUMMARY
=========================================
Application Ref: ${appReference}
Position: ${activeJob.title}
Department: ${activeJob.department}
Location: ${activeJob.location}
Date: ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}

CANDIDATE INFORMATION
-----------------------------------------
Full Name: ${fullName}
Email: ${email}
Phone: ${phone || "N/A"}
Current City/Country: ${location || "N/A"}
Years of Experience: ${experienceYears || "N/A"}
Key Professional Certification: ${qualification || "N/A"}
LinkedIn / Portfolio: ${linkedIn || "N/A"}
Resume Attached: ${fileName || "Pending electronic email dispatch"}

CANDIDATE STATEMENT
-----------------------------------------
${coverNote || "Open expression of interest submitted via website portal."}

=========================================
Please dispatch your complete CV to: careers@moanigeria.com
Referencing ${appReference} in the email subject.
`;

    const blob = new Blob([summaryText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fullName.replace(/\s+/g, "_")}_${appReference}_Application.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div id="job-board" className="scroll-mt-24">
      {/* Search & Filter Header Container */}
      <div className="bg-secondary/40 border-y border-border py-10 px-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-primary text-xs uppercase tracking-widest font-bold block mb-2">
                Join our specialist practice
              </span>
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground">
                Current Vacancies &amp; Open Call
              </h2>
            </div>

            <div className="flex items-center gap-3 text-xs sm:text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                {openPositions.length} Active Positions
              </span>
              <span>•</span>
              <span>Nigeria &amp; Ghana Hubs</span>
            </div>
          </div>

          {/* Search Bar & Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3.5">
            {/* Search Input */}
            <div className="lg:col-span-5 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by role, discipline, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background border-border h-11 text-sm rounded-sm focus-visible:ring-primary"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Country / Location Filter */}
            <div className="lg:col-span-2">
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                aria-label="Filter by Location"
                className="w-full h-11 px-3 rounded-sm bg-background border border-border text-xs sm:text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="All">All Locations</option>
                <option value="Nigeria">Nigeria (Lagos)</option>
                <option value="Ghana">Ghana (Accra)</option>
                <option value="Regional">Regional / Hybrid</option>
              </select>
            </div>

            {/* Department Filter */}
            <div className="lg:col-span-3">
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                aria-label="Filter by Discipline"
                className="w-full h-11 px-3 rounded-sm bg-background border border-border text-xs sm:text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="All">All Disciplines</option>
                {departments
                  .filter((d) => d !== "All")
                  .map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
              </select>
            </div>

            {/* Contract / Type Filter */}
            <div className="lg:col-span-2">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                aria-label="Filter by Type"
                className="w-full h-11 px-3 rounded-sm bg-background border border-border text-xs sm:text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="All">All Types</option>
                <option value="Full-Time">Full-Time</option>
                <option value="Graduate Programme">Graduate Programme</option>
                <option value="Contract">Contract</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Open Application Quick Banner */}
      <div className="max-w-7xl mx-auto px-6 pt-10">
        <div className="p-6 sm:p-8 rounded-sm bg-gradient-to-r from-ink via-ink/95 to-slate-900 text-white shadow-md border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/20 text-white/90 border border-primary/30">
              <Sparkles className="h-3 w-3 text-white" />
              <span>Spontaneous &amp; General Intake</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-medium tracking-tight">
              Don’t see a role that matches your profile?
            </h3>
            <p className="text-sm text-white/80 leading-relaxed">
              We continually welcome forward-thinking structural engineers, BIM specialists, site managers, and civil consultants to join our regional talent roster.
            </p>
          </div>

          <Button
            onClick={() => {
              const generalJob = openPositions.find(
                (p) => p.id === "open-application-general"
              ) || openPositions[0];
              if (generalJob) {
                handleOpenModal(generalJob, "apply");
              }
            }}
            size="lg"
            className="shrink-0 bg-primary hover:bg-primary/90 text-white font-semibold text-xs sm:text-sm uppercase tracking-wider px-6 py-6 rounded-sm shadow-sm active:scale-[0.99]"
          >
            Submit Open Application <ArrowRight className="h-4 w-4 ml-1.5" />
          </Button>
        </div>
      </div>

      {/* Job Listings Grid */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-6">
        {filteredPositions.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-border rounded-sm bg-secondary/20">
            <Briefcase className="h-10 w-10 text-muted-foreground mx-auto mb-3 opacity-60" />
            <h3 className="text-lg font-medium text-foreground">No roles match your search filters</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto mt-1 mb-6">
              Try adjusting your query or filters, or submit a general open application to be considered for upcoming commissions.
            </p>
            <div className="flex items-center justify-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCountry("All");
                  setSelectedDepartment("All");
                  setSelectedType("All");
                }}
              >
                Reset Filters
              </Button>
              <Button
                size="sm"
                className="bg-primary text-white"
                onClick={() => {
                  const generalJob = openPositions.find((p) => p.id === "open-application-general") || openPositions[0];
                  if (generalJob) {
                    handleOpenModal(generalJob, "apply");
                  }
                }}
              >
                Submit Open Application
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5">
            {filteredPositions.map((job) => (
              <div
                key={job.id}
                className="group relative bg-card border border-border hover:border-primary/50 transition-all duration-200 rounded-sm p-6 sm:p-7 shadow-xs hover:shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-xs bg-primary/10 text-primary border border-primary/20">
                      {job.department}
                    </span>
                    <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-xs bg-secondary text-foreground/80 border border-border">
                      {job.type}
                    </span>
                    <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-xs bg-muted text-muted-foreground">
                      {job.experienceLevel}
                    </span>
                    {job.featured && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                        Priority Intake
                      </span>
                    )}
                  </div>

                  <h3
                    onClick={() => handleOpenModal(job, "details")}
                    className="text-lg sm:text-xl font-medium tracking-tight text-foreground hover:text-primary transition-colors cursor-pointer"
                  >
                    {job.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 max-w-3xl leading-relaxed">
                    {job.summary}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-1">
                    <span className="inline-flex items-center gap-1.5 font-medium text-foreground/90">
                      <MapPin className="h-3.5 w-3.5 text-primary" />
                      {job.location}
                    </span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      Posted {job.postedDate}
                    </span>
                  </div>
                </div>

                <div className="flex flex-row md:flex-col items-center md:items-end gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-border/60">
                  <Button
                    onClick={() => handleOpenModal(job, "details")}
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-auto font-medium border-border hover:bg-secondary text-xs sm:text-sm h-10 px-4"
                  >
                    Role Details
                  </Button>
                  <Button
                    onClick={() => handleOpenModal(job, "apply")}
                    size="sm"
                    className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-semibold text-xs sm:text-sm h-10 px-5 shadow-xs"
                  >
                    Apply Now <ArrowRight className="h-3.5 w-3.5 ml-1" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Role Details & Application Modal */}
      {activeJob && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-background border border-border w-full max-w-3xl rounded-sm shadow-2xl my-8 overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-6 sm:p-7 border-b border-border bg-secondary/30 flex items-start justify-between gap-4">
              <div className="space-y-1.5 pr-2">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-xs bg-primary/10 text-primary border border-primary/20">
                    {activeJob.department}
                  </span>
                  <span className="text-[11px] text-muted-foreground font-medium">
                    {activeJob.location} • {activeJob.type}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-foreground">
                  {activeJob.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={handleCloseModal}
                aria-label="Close modal"
                className="p-2 rounded-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="flex border-b border-border bg-background px-6 pt-2 gap-6">
              <button
                type="button"
                onClick={() => setActiveTab("details")}
                className={`pb-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors ${
                  activeTab === "details"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                Job Description &amp; Scope
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("apply")}
                className={`pb-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
                  activeTab === "apply"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <span>Application Form</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-primary/10 text-primary">
                  Open
                </span>
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6 text-sm leading-relaxed">
              {activeTab === "details" ? (
                /* TAB 1: Role Details */
                <div className="space-y-7">
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-primary">
                      Role Overview
                    </h4>
                    <p className="text-foreground/90">{activeJob.overview}</p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-primary">
                      Key Responsibilities
                    </h4>
                    <ul className="space-y-2.5">
                      {activeJob.responsibilities.map((resp, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-primary">
                      Candidate Profile &amp; Qualifications
                    </h4>
                    <ul className="space-y-2.5">
                      {activeJob.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-muted-foreground">
                          <ChevronRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3 p-4 rounded-xs bg-secondary/50 border border-border">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-primary">
                      What <MoaBrand /> Offers
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted-foreground">
                      {activeJob.benefits.map((ben, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                          <span>{ben}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between border-t border-border">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCloseModal}
                    >
                      Close
                    </Button>
                    <Button
                      onClick={() => setActiveTab("apply")}
                      className="bg-primary hover:bg-primary/90 text-white font-semibold text-xs sm:text-sm px-6"
                    >
                      Proceed to Application <ArrowRight className="h-4 w-4 ml-1.5" />
                    </Button>
                  </div>
                </div>
              ) : (
                /* TAB 2: Application Form */
                <div>
                  {isSubmitted ? (
                    <div className="py-10 text-center space-y-5 animate-in zoom-in-95 duration-200">
                      <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
                        <CheckCircle2 className="h-8 w-8" />
                      </div>
                      <div className="space-y-1.5">
                        <h4 className="text-2xl font-medium tracking-tight text-foreground">
                          Application Registered Successfully
                        </h4>
                        <p className="text-sm text-muted-foreground max-w-md mx-auto">
                          Thank you, <strong className="text-foreground">{fullName}</strong>. Your expression of interest for the{" "}
                          <strong className="text-foreground">{activeJob.title}</strong> role has been compiled under reference:
                        </p>
                        <div className="inline-block px-4 py-2 mt-2 bg-secondary rounded-sm font-mono font-bold text-base text-primary border border-border">
                          {appReference}
                        </div>
                      </div>

                      <p className="text-xs text-muted-foreground max-w-lg mx-auto leading-relaxed pt-2">
                        Our Practice Recruitment Team will review your application. Please ensure you also send your comprehensive CV and portfolio to{" "}
                        <a href="mailto:careers@moanigeria.com" className="text-primary font-semibold underline">
                          careers@moanigeria.com
                        </a>{" "}
                        referencing your application code.
                      </p>

                      <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                        <Button
                          onClick={handleDownloadSummary}
                          variant="outline"
                          size="sm"
                          className="gap-2"
                        >
                          <Download className="h-4 w-4" /> Download Application Record
                        </Button>
                        <Button
                          asChild
                          size="sm"
                          className="bg-primary hover:bg-primary/90 text-white gap-2"
                        >
                          <a
                            href={`mailto:careers@moanigeria.com?subject=${encodeURIComponent(
                              `[Job Application - ${appReference}] ${activeJob.title}: ${fullName}`
                            )}&body=${encodeURIComponent(
                              `Dear MO&A Recruitment Team,\n\nI have submitted my application for the position of "${activeJob.title}" (Ref: ${appReference}).\n\nCandidate: ${fullName}\nContact: ${phone} | ${email}\nLocation: ${location}\nExperience: ${experienceYears} years\nPortfolio/LinkedIn: ${linkedIn}\n\nPlease find attached my complete CV and credentials for your review.\n\nBest regards,\n${fullName}`
                            )}`}
                          >
                            <Mail className="h-4 w-4" /> Open Email Client
                          </a>
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmitApplication} className="space-y-5">
                      <div className="p-3.5 rounded-xs bg-primary/5 border border-primary/20 text-xs text-foreground/90 flex items-center justify-between">
                        <span>
                          Applying for: <strong className="font-semibold text-primary">{activeJob.title}</strong> ({activeJob.location})
                        </span>
                        <span className="text-[11px] font-mono text-muted-foreground">
                          Intake Ref: {activeJob.id}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="app-fullname" className="text-xs font-semibold">
                            Full Name <span className="text-primary">*</span>
                          </Label>
                          <Input
                            id="app-fullname"
                            required
                            placeholder="e.g. Babatunde Adeyemi"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="h-10 text-xs sm:text-sm bg-background border-border"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <Label htmlFor="app-email" className="text-xs font-semibold">
                            Email Address <span className="text-primary">*</span>
                          </Label>
                          <Input
                            id="app-email"
                            type="email"
                            required
                            placeholder="b.adeyemi@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="h-10 text-xs sm:text-sm bg-background border-border"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="app-phone" className="text-xs font-semibold">
                            Phone / WhatsApp
                          </Label>
                          <Input
                            id="app-phone"
                            placeholder="+234 800 000 0000"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="h-10 text-xs sm:text-sm bg-background border-border"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <Label htmlFor="app-location" className="text-xs font-semibold">
                            Current City &amp; Country
                          </Label>
                          <Input
                            id="app-location"
                            placeholder="e.g. Lagos, Nigeria"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="h-10 text-xs sm:text-sm bg-background border-border"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <Label htmlFor="app-exp" className="text-xs font-semibold">
                            Years of Experience
                          </Label>
                          <Input
                            id="app-exp"
                            placeholder="e.g. 5+ years"
                            value={experienceYears}
                            onChange={(e) => setExperienceYears(e.target.value)}
                            className="h-10 text-xs sm:text-sm bg-background border-border"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="app-qual" className="text-xs font-semibold">
                            Chartered Body / Certification
                          </Label>
                          <Input
                            id="app-qual"
                            placeholder="e.g. COREN, NSE, GhIE, IStructE, or NYSC"
                            value={qualification}
                            onChange={(e) => setQualification(e.target.value)}
                            className="h-10 text-xs sm:text-sm bg-background border-border"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <Label htmlFor="app-linkedin" className="text-xs font-semibold">
                            LinkedIn or Portfolio URL
                          </Label>
                          <Input
                            id="app-linkedin"
                            placeholder="https://linkedin.com/in/username"
                            value={linkedIn}
                            onChange={(e) => setLinkedIn(e.target.value)}
                            className="h-10 text-xs sm:text-sm bg-background border-border"
                          />
                        </div>
                      </div>

                      {/* Resume / Document Upload Simulator */}
                      <div className="space-y-1.5">
                        <Label className="text-xs font-semibold">
                          Upload Curriculum Vitae (PDF, DOCX)
                        </Label>
                        <div className="relative border-2 border-dashed border-border hover:border-primary/50 transition-colors rounded-sm p-4 text-center bg-secondary/20">
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                          <div className="flex flex-col items-center justify-center gap-1.5">
                            <UploadCloud className="h-6 w-6 text-primary" />
                            <span className="text-xs font-medium text-foreground">
                              {fileName ? (
                                <span className="text-primary font-bold">{fileName}</span>
                              ) : (
                                "Click or drag your CV file here (Max 10MB)"
                              )}
                            </span>
                            <span className="text-[11px] text-muted-foreground">
                              PDF, DOCX formats supported
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Brief Statement / Note */}
                      <div className="space-y-1.5">
                        <Label htmlFor="app-covernote" className="text-xs font-semibold">
                          Brief Statement / Key Project Highlights
                        </Label>
                        <textarea
                          id="app-covernote"
                          rows={3}
                          placeholder="Summarize your engineering background, key landmark projects delivered, or why you are drawn to MO&A..."
                          value={coverNote}
                          onChange={(e) => setCoverNote(e.target.value)}
                          className="w-full p-3 text-xs sm:text-sm rounded-sm bg-background border border-border focus:outline-none focus:ring-1 focus:ring-primary leading-relaxed"
                        />
                      </div>

                      <div className="pt-2 flex items-center justify-between border-t border-border">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setActiveTab("details")}
                        >
                          Back to Scope
                        </Button>
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="bg-primary hover:bg-primary/90 text-white font-semibold text-xs sm:text-sm px-7 py-5 h-auto shadow-sm"
                        >
                          {isSubmitting ? "Registering Application..." : "Submit Application"}
                        </Button>
                      </div>
                    </form>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
