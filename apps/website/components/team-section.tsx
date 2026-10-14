"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight, X, Mail } from "lucide-react";
import { getAllTeamMembers, TeamMember } from "@/lib/site-content";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.39 9.74v-8.37H5.07v8.37h2.78z" />
    </svg>
  );
}

export function TeamSection({
  className = "",
}: {
  className?: string;
}) {
  const members = getAllTeamMembers();
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  // Close on Escape & prevent background scroll when open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedMember(null);
      }
    };

    if (selectedMember) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedMember]);

  return (
    <section className={`py-20 sm:py-24 border-t border-border bg-background ${className}`}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div>
            <span className="text-primary text-xs uppercase tracking-widest font-bold block mb-3">
              Leadership &amp; Specialist Practice
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight leading-tight text-foreground">
              The people behind
              <br />
              the thinking.
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground text-sm sm:text-base leading-relaxed">
            Good engineering is a shared effort. Meet the directors and principal engineers steering MO&amp;A’s technical advisory across Nigeria and West Africa.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {members.map((member) => (
            <article
              key={member.id}
              className="group flex flex-col cursor-pointer"
              onClick={() => setSelectedMember(member)}
            >
              {/* Portrait Image Container */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted rounded-xs shadow-xs">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-top filter grayscale contrast-105 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                />

                {/* Bottom-left Arrow Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedMember(member);
                  }}
                  aria-label={`View bio for ${member.name}`}
                  className="absolute bottom-0 left-0 w-11 h-11 bg-black text-white flex items-center justify-center hover:bg-primary transition-colors cursor-pointer group-hover:bg-primary z-10"
                >
                  <ArrowUpRight className="h-5 w-5 stroke-[2.5]" />
                </button>
              </div>

              {/* Person Details Below Image (No bio on card) */}
              <div className="pt-4">
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors leading-tight">
                  {member.name}
                </h3>
                {/* Horizontal Red Accent Line */}
                <div className="h-0.5 w-10 bg-primary my-2.5" />
                <p className="text-sm sm:text-base font-normal text-muted-foreground leading-snug">
                  {member.role}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Full-Page Bio Overlay (100% Fullscreen Immersion) */}
      {selectedMember && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="member-modal-name"
          className="fixed inset-0 z-[100] w-screen h-screen bg-black text-white overflow-y-auto animate-in fade-in duration-200"
        >
          {/* Top-Right Docked White Square with Red Close Icon */}
          <button
            type="button"
            onClick={() => setSelectedMember(null)}
            aria-label="Close details"
            className="group fixed top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 bg-white text-primary hover:bg-neutral-50 flex items-center justify-center z-[110] transition-colors cursor-pointer shadow-xl"
          >
            <X className="w-10 h-10 sm:w-12 sm:h-12 stroke-[2.75] transition-transform duration-300 ease-out group-hover:rotate-90 group-hover:scale-105" />
          </button>

          {/* Centered Full-Page Content */}
          <div className="min-h-screen w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 py-20 sm:py-24 flex items-center justify-center">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 lg:gap-20 items-center w-full">
              {/* Left Column: Large Portrait */}
              <div className="md:col-span-5 flex justify-center md:justify-end">
                <div className="relative aspect-[4/5] w-full max-w-[440px] rounded-none overflow-hidden bg-neutral-900 shadow-2xl">
                  <Image
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 440px"
                    className="object-cover object-top"
                    priority
                  />
                </div>
              </div>

              {/* Right Column: Name, Accent Line, Role, Bio & Connect */}
              <div className="md:col-span-7 flex flex-col justify-center">
                <h2
                  id="member-modal-name"
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight"
                >
                  {selectedMember.name}
                </h2>

                {/* Red Horizontal Accent Line */}
                <div className="h-0.5 w-10 bg-primary my-4" />

                <p className="text-sm sm:text-base font-semibold text-white/90">
                  {selectedMember.role}
                </p>
                <p className="text-xs font-mono text-white/50 mb-6">
                  {selectedMember.credentials}
                </p>

                {/* Detailed Biography */}
                <div className="text-sm sm:text-base text-white/80 leading-relaxed font-normal mb-8 max-w-2xl space-y-4">
                  <p>{selectedMember.bio}</p>
                </div>

                {/* Let's Connect */}
                <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                  <span className="text-xs uppercase tracking-wider text-[#22c55e] font-semibold">
                    Let&apos;s Connect
                  </span>
                  <div className="flex items-center gap-3">
                    {selectedMember.email && (
                      <a
                        href={`mailto:${selectedMember.email}`}
                        aria-label={`Email ${selectedMember.name}`}
                        className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary text-white flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <Mail className="h-5 w-5" />
                      </a>
                    )}
                    {selectedMember.linkedin && (
                      <a
                        href={selectedMember.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`LinkedIn profile of ${selectedMember.name}`}
                        className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary text-white flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <LinkedInIcon className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
