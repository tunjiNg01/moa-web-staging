"use client";

import React, { useState, useMemo } from "react";
import {
  Users,
  Search,
  Star,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  GraduationCap,
  ExternalLink,
  Download,
  CheckCircle2,
  Clock,
  ArrowRight,
  Filter,
  Check,
  X,
  FileText,
  MessageSquare,
  Sparkles,
  Shield,
  ThumbsUp,
  UserCheck,
  AlertCircle,
  Eye,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  Button,
  Input,
  Badge,
  Label,
} from "@repo/ui";
import type {
  JobCandidate,
  CandidateStage,
  AdminJobPosition,
} from "@/lib/admin-data";

interface CandidateReviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  candidates: JobCandidate[];
  jobFilter?: AdminJobPosition | null;
  onUpdateCandidate: (candidate: JobCandidate) => void;
}

const STAGES: CandidateStage[] = [
  "Under Review",
  "Shortlisted",
  "Interviewing",
  "Offered",
  "Rejected",
];

export function CandidateReviewModal({
  open,
  onOpenChange,
  candidates,
  jobFilter,
  onUpdateCandidate,
}: CandidateReviewModalProps) {
  const [selectedStage, setSelectedStage] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);

  // Notes scratchpad state for currently selected candidate
  const [notesDraft, setNotesDraft] = useState<string>("");
  const [ratingDraft, setRatingDraft] = useState<number>(0);
  const [notesSavedSuccess, setNotesSavedSuccess] = useState(false);

  // Filter candidates by job (if specified), stage, and search query
  const filteredCandidates = useMemo(() => {
    return candidates.filter((cand) => {
      // Job filter
      if (jobFilter && cand.jobId !== jobFilter.id) {
        return false;
      }
      // Stage filter
      if (selectedStage !== "All" && cand.stage !== selectedStage) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = cand.name.toLowerCase().includes(q);
        const matchEmail = cand.email.toLowerCase().includes(q);
        const matchRole = cand.jobTitle.toLowerCase().includes(q);
        const matchSkills = cand.keySkills.some((s) => s.toLowerCase().includes(q));
        if (!matchName && !matchEmail && !matchRole && !matchSkills) {
          return false;
        }
      }
      return true;
    });
  }, [candidates, jobFilter, selectedStage, searchQuery]);

  // Set active candidate to first filtered if current is invalid
  const activeCandidate = useMemo(() => {
    if (selectedCandidateId) {
      const found = candidates.find((c) => c.id === selectedCandidateId);
      if (found) return found;
    }
    return filteredCandidates[0] || null;
  }, [candidates, selectedCandidateId, filteredCandidates]);

  // Sync draft notes whenever active candidate changes
  React.useEffect(() => {
    if (activeCandidate) {
      setNotesDraft(activeCandidate.interviewerNotes || "");
      setRatingDraft(activeCandidate.rating || 0);
      setNotesSavedSuccess(false);

      // Auto mark candidate as read when opened
      if (activeCandidate.isUnread) {
        onUpdateCandidate({ ...activeCandidate, isUnread: false });
      }
    }
  }, [activeCandidate?.id]);

  // Handle stage change
  const handleStageTransition = (newStage: CandidateStage) => {
    if (!activeCandidate) return;
    const updated = {
      ...activeCandidate,
      stage: newStage,
      isUnread: false,
    };
    onUpdateCandidate(updated);
  };

  // Handle saving notes & rating
  const handleSaveNotes = () => {
    if (!activeCandidate) return;
    const updated = {
      ...activeCandidate,
      interviewerNotes: notesDraft.trim(),
      rating: ratingDraft,
    };
    onUpdateCandidate(updated);
    setNotesSavedSuccess(true);
    setTimeout(() => setNotesSavedSuccess(false), 2500);
  };

  const getStageBadgeClass = (stage: CandidateStage) => {
    switch (stage) {
      case "Under Review":
        return "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30";
      case "Shortlisted":
        return "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/30";
      case "Interviewing":
        return "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/30";
      case "Offered":
        return "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30";
      case "Rejected":
        return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-w-6xl w-full h-[90vh] p-0 flex flex-col bg-card border border-border shadow-2xl overflow-hidden rounded-xs focus:outline-hidden"
      >
        {/* Top Header Bar */}
        <div className="shrink-0 px-6 py-4 border-b border-border bg-card/90 backdrop-blur-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-xs bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
              <Users className="size-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                  Applicant Tracking System (ATS)
                </span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">
                  {jobFilter ? jobFilter.title : "All Engineering Requisitions"}
                </span>
              </div>
              <h2 className="text-lg font-serif font-bold text-foreground">
                Candidate Submissions &amp; Dossiers
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative w-48 sm:w-64">
              <Search className="size-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search candidates, skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-8 pl-8 text-xs bg-background rounded-xs"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="h-8 text-xs rounded-xs"
            >
              Close
            </Button>
          </div>
        </div>

        {/* Stage Filter Ribbon */}
        <div className="shrink-0 px-6 py-2.5 border-b border-border bg-muted/30 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mr-1 shrink-0">
            Stages:
          </span>
          <button
            onClick={() => setSelectedStage("All")}
            className={`px-3 py-1 rounded-xs text-xs font-medium whitespace-nowrap transition-colors ${
              selectedStage === "All"
                ? "bg-primary text-primary-foreground font-semibold"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            All Candidates ({candidates.filter((c) => !jobFilter || c.jobId === jobFilter.id).length})
          </button>
          {STAGES.map((stage) => {
            const count = candidates.filter(
              (c) => (!jobFilter || c.jobId === jobFilter.id) && c.stage === stage
            ).length;
            const isSelected = selectedStage === stage;
            return (
              <button
                key={stage}
                onClick={() => setSelectedStage(stage)}
                className={`px-3 py-1 rounded-xs text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-primary text-primary-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <span>{stage}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? "bg-white/20 text-white" : "bg-muted border border-border"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Two-Pane ATS Workspace */}
        <div className="flex-1 min-h-0 flex flex-col md:flex-row overflow-hidden">
          {/* Left Column: Candidates Stream */}
          <div className="w-full md:w-80 lg:w-96 border-r border-border shrink-0 flex flex-col bg-background/50 overflow-y-auto">
            {filteredCandidates.length === 0 ? (
              <div className="p-8 text-center text-xs text-muted-foreground">
                <Users className="size-8 mx-auto mb-2 opacity-40" />
                <p>No candidates found matching filter criteria.</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {filteredCandidates.map((cand) => {
                  const isSelected = activeCandidate?.id === cand.id;
                  return (
                    <button
                      key={cand.id}
                      onClick={() => setSelectedCandidateId(cand.id)}
                      className={`w-full text-left p-4 transition-colors relative flex flex-col gap-2 ${
                        isSelected
                          ? "bg-card border-l-4 border-l-primary shadow-xs"
                          : "hover:bg-muted/40"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          {cand.isUnread && (
                            <span
                              className="size-2 rounded-full bg-emerald-500 shrink-0"
                              title="Unread Application"
                            />
                          )}
                          <span className="font-semibold text-xs text-foreground truncate max-w-[170px]">
                            {cand.name}
                          </span>
                        </div>
                        <Badge
                          variant="outline"
                          className={`text-[9px] px-1.5 py-0.5 shrink-0 ${getStageBadgeClass(
                            cand.stage
                          )}`}
                        >
                          {cand.stage}
                        </Badge>
                      </div>

                      <div className="text-[11px] text-muted-foreground truncate">
                        {cand.jobTitle}
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-muted-foreground mt-1">
                        <span className="font-medium bg-muted px-1.5 py-0.5 rounded-xs border border-border">
                          {cand.yearsExperience} yrs exp
                        </span>
                        <div className="flex items-center gap-1">
                          <Calendar className="size-3" />
                          <span>{cand.appliedDate}</span>
                        </div>
                      </div>

                      {/* Key Skills Pills */}
                      <div className="flex flex-wrap gap-1 mt-1">
                        {cand.keySkills.slice(0, 3).map((skill) => (
                          <span
                            key={skill}
                            className="text-[9px] px-1.5 py-0.5 bg-muted/60 text-muted-foreground rounded-xs"
                          >
                            {skill}
                          </span>
                        ))}
                        {cand.keySkills.length > 3 && (
                          <span className="text-[9px] text-muted-foreground">
                            +{cand.keySkills.length - 3}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Column: Selected Candidate Dossier & ATS Pipeline Progression */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-card">
            {activeCandidate ? (
              <div className="space-y-6">
                {/* Dossier Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-border">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-serif font-bold text-foreground">
                        {activeCandidate.name}
                      </h3>
                      <Badge
                        variant="outline"
                        className={`text-[10px] font-semibold ${getStageBadgeClass(
                          activeCandidate.stage
                        )}`}
                      >
                        {activeCandidate.stage}
                      </Badge>
                    </div>
                    <p className="text-xs text-primary font-medium mt-0.5">
                      Target Requisition: {activeCandidate.jobTitle}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mt-2">
                      <span className="flex items-center gap-1">
                        <Mail className="size-3 text-muted-foreground" />
                        <a
                          href={`mailto:${activeCandidate.email}`}
                          className="hover:underline text-foreground"
                        >
                          {activeCandidate.email}
                        </a>
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="size-3 text-muted-foreground" />
                        <span>{activeCandidate.phone}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="size-3 text-muted-foreground" />
                        <span>{activeCandidate.location}</span>
                      </span>
                    </div>
                  </div>

                  {/* External Links */}
                  <div className="flex items-center gap-2 shrink-0">
                    {activeCandidate.linkedinUrl && (
                      <a
                        href={activeCandidate.linkedinUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1.5 rounded-xs border border-border text-xs text-muted-foreground hover:text-foreground hover:bg-muted flex items-center gap-1 transition-colors"
                      >
                        <ExternalLink className="size-3" />
                        <span>LinkedIn</span>
                      </a>
                    )}
                    {activeCandidate.portfolioUrl && (
                      <a
                        href={activeCandidate.portfolioUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1.5 rounded-xs border border-border text-xs text-muted-foreground hover:text-foreground hover:bg-muted flex items-center gap-1 transition-colors"
                      >
                        <ExternalLink className="size-3" />
                        <span>Portfolio</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Interactive Stage Transition Bar */}
                <div className="p-4 bg-muted/40 border border-border rounded-xs space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    <span>Recruitment Pipeline Stage</span>
                    <span className="text-[11px] font-mono lowercase text-foreground">
                      current: {activeCandidate.stage}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <Button
                      type="button"
                      size="sm"
                      variant={activeCandidate.stage === "Under Review" ? "default" : "outline"}
                      onClick={() => handleStageTransition("Under Review")}
                      className="h-8 text-xs rounded-xs"
                    >
                      <Clock className="size-3.5 mr-1 text-amber-500" />
                      <span>Under Review</span>
                    </Button>

                    <Button
                      type="button"
                      size="sm"
                      variant={activeCandidate.stage === "Shortlisted" ? "default" : "outline"}
                      onClick={() => handleStageTransition("Shortlisted")}
                      className="h-8 text-xs rounded-xs"
                    >
                      <CheckCircle2 className="size-3.5 mr-1 text-blue-500" />
                      <span>Shortlist</span>
                    </Button>

                    <Button
                      type="button"
                      size="sm"
                      variant={activeCandidate.stage === "Interviewing" ? "default" : "outline"}
                      onClick={() => handleStageTransition("Interviewing")}
                      className="h-8 text-xs rounded-xs"
                    >
                      <MessageSquare className="size-3.5 mr-1 text-purple-500" />
                      <span>Interviewing</span>
                    </Button>

                    <Button
                      type="button"
                      size="sm"
                      variant={activeCandidate.stage === "Offered" ? "default" : "outline"}
                      onClick={() => handleStageTransition("Offered")}
                      className="h-8 text-xs rounded-xs"
                    >
                      <ThumbsUp className="size-3.5 mr-1 text-emerald-500" />
                      <span>Extend Offer</span>
                    </Button>

                    <Button
                      type="button"
                      size="sm"
                      variant={activeCandidate.stage === "Rejected" ? "default" : "outline"}
                      onClick={() => handleStageTransition("Rejected")}
                      className="h-8 text-xs rounded-xs text-muted-foreground hover:text-destructive"
                    >
                      <X className="size-3.5 mr-1" />
                      <span>Archive / Decline</span>
                    </Button>
                  </div>
                </div>

                {/* Academic Credentials & Skills */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-card border border-border rounded-xs space-y-2">
                    <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                      <GraduationCap className="size-3.5 text-primary" />
                      <span>Education &amp; Qualifications</span>
                    </div>
                    <p className="text-xs text-foreground font-medium leading-relaxed">
                      {activeCandidate.education}
                    </p>
                    <div className="text-[11px] text-muted-foreground pt-1 flex items-center gap-1">
                      <Briefcase className="size-3" />
                      <span>{activeCandidate.yearsExperience} Years Engineering Practice</span>
                    </div>
                  </div>

                  <div className="p-4 bg-card border border-border rounded-xs space-y-2">
                    <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="size-3.5 text-primary" />
                      <span>Engineering Skills &amp; Tools</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {activeCandidate.keySkills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 bg-muted text-foreground border border-border rounded-xs text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Candidate Cover Statement */}
                {activeCandidate.coverNote && (
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Candidate Statement / Cover Note
                    </Label>
                    <div className="p-4 bg-muted/20 border border-border rounded-xs text-xs text-foreground leading-relaxed italic">
                      "{activeCandidate.coverNote}"
                    </div>
                  </div>
                )}

                {/* Resume Card & Download */}
                <div className="space-y-2">
                  <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Attached Engineering Resume / CV
                  </Label>
                  <div className="p-4 bg-card border border-border rounded-xs flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-xs bg-red-500/10 text-red-600 border border-red-500/20 flex items-center justify-center shrink-0">
                        <FileText className="size-5" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-foreground">
                          {activeCandidate.resumeFileName || "Candidate_Engineering_Resume.pdf"}
                        </div>
                        <div className="text-[11px] text-muted-foreground">
                          PDF Document • Verified 1.8 MB • Applied {activeCandidate.appliedDate}
                        </div>
                      </div>
                    </div>

                    <a
                      href={activeCandidate.resumeUrl || "#"}
                      download={activeCandidate.resumeFileName || "resume.pdf"}
                      onClick={(e) => {
                        if (!activeCandidate.resumeUrl) {
                          e.preventDefault();
                          alert("Opening candidate curriculum vitae in viewer window.");
                        }
                      }}
                      className="px-3 py-1.5 rounded-xs bg-muted hover:bg-muted/80 text-foreground text-xs font-medium border border-border flex items-center gap-1.5 transition-colors"
                    >
                      <Download className="size-3.5" />
                      <span>Download CV</span>
                    </a>
                  </div>
                </div>

                {/* Interviewer Evaluation Scratchpad */}
                <div className="p-5 bg-card border border-border rounded-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                        Interviewer Technical Rating &amp; Internal Notes
                      </h4>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        Private feedback visible only to MO&A executive partners and recruiters.
                      </p>
                    </div>

                    {/* Star Rating Selector */}
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRatingDraft(star)}
                          className="p-1 hover:scale-110 transition-transform"
                          title={`Rate ${star} / 5 stars`}
                        >
                          <Star
                            className={`size-4 ${
                              star <= ratingDraft
                                ? "fill-amber-400 text-amber-500"
                                : "text-muted-foreground/40"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <textarea
                    rows={3}
                    value={notesDraft}
                    onChange={(e) => setNotesDraft(e.target.value)}
                    placeholder="Record notes on finite-element proficiency, structural code mastery, communication skills, or partner interview feedback..."
                    className="w-full p-3 bg-background border border-border rounded-xs text-xs text-foreground focus:outline-hidden focus:ring-1 focus:ring-primary leading-relaxed"
                  />

                  <div className="flex items-center justify-between">
                    {notesSavedSuccess ? (
                      <span className="text-xs text-emerald-600 font-medium flex items-center gap-1 animate-in fade-in">
                        <CheckCircle2 className="size-3.5" />
                        <span>Evaluation saved to candidate dossier</span>
                      </span>
                    ) : (
                      <span className="text-[11px] text-muted-foreground">
                        Last reviewed by executive committee
                      </span>
                    )}

                    <Button
                      type="button"
                      size="sm"
                      onClick={handleSaveNotes}
                      className="text-xs h-8 px-4 rounded-xs gap-1.5"
                    >
                      <Check className="size-3.5" />
                      <span>Save Assessment</span>
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-12 text-muted-foreground">
                <Users className="size-10 mb-2 opacity-30" />
                <p className="text-sm">Select a candidate on the left to inspect their dossier.</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

