"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight, ArrowDown } from "lucide-react";
import { Button } from "@repo/ui";

export interface ValuePropSlide {
  id: string;
  badge: string;
  tag: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  statLabel: string;
  statValue: string;
}

const slides: ValuePropSlide[] = [
  {
    id: "engineering",
    badge: "01 · Structural Engineering",
    tag: "MO&A · ENGINEERING WITH PURPOSE",
    titleLine1: "Structural engineering.",
    titleLine2: "Lasting impact.",
    description:
      "We turn bold architectural visions into resilient, buildable structures. Combining thoughtful design with rigorous technical excellence for a stronger built environment.",
    ctaText: "Explore our work",
    ctaHref: "/projects",
    statLabel: "Focus",
    statValue: "Design & Buildability",
  },
  {
    id: "consultancy",
    badge: "02 · Strategic Consultancy",
    tag: "MO&A · STRATEGIC CONSULTANCY",
    titleLine1: "Insightful consultancy.",
    titleLine2: "Informed decisions.",
    description:
      "Clear, authoritative guidance from early concept to project handover. We partner with architects, developers, and contractors to resolve complexity and de-risk investments.",
    ctaText: "Consultancy services",
    ctaHref: "/services",
    statLabel: "Focus",
    statValue: "Clarity & Risk Mitigation",
  },
];

const AUTOPLAY_INTERVAL = 7000;

export function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating || index === currentIndex) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [currentIndex, isAnimating]
  );

  const nextSlide = useCallback(() => {
    goToSlide((currentIndex + 1) % slides.length);
  }, [currentIndex, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((currentIndex - 1 + slides.length) % slides.length);
  }, [currentIndex, goToSlide]);

  // Autoplay timer
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      nextSlide();
    }, AUTOPLAY_INTERVAL);

    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  const currentSlide = (slides[currentIndex] ?? slides[0])!;

  return (
    <div
      className="relative z-20 max-w-7xl mx-auto px-6 w-full h-full flex flex-col justify-between pt-28 sm:pt-32 pb-10"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Top slide selector pills */}
      <div className="flex items-center gap-3">
        {slides.map((slide, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={slide.id}
              type="button"
              onClick={() => goToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}: ${slide.badge}`}
              className={`group flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 border ${
                isActive
                  ? "bg-white/15 border-white/40 text-white backdrop-blur-xs shadow-xs"
                  : "bg-black/20 border-white/10 text-white/60 hover:text-white hover:border-white/25"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  isActive ? "bg-primary" : "bg-white/40 group-hover:bg-white"
                }`}
              />
              <span>{slide.badge}</span>
            </button>
          );
        })}
      </div>

      {/* Main Content Area */}
      <div className="my-auto py-8">
        <div
          key={currentSlide.id}
          className="min-h-[340px] sm:min-h-[380px] flex flex-col justify-center"
        >
          {/* Eyebrow */}
          <div className="animate-hero-eyebrow flex items-center gap-3 text-xs uppercase tracking-widest font-semibold text-white/90 mb-6 before:content-[''] before:h-px before:w-7 before:bg-primary">
            {currentSlide.tag}
          </div>

          {/* Heading */}
          <h1 className="animate-hero-heading text-4xl sm:text-6xl lg:text-7xl font-medium tracking-tight text-white max-w-3xl leading-[1.05]">
            {currentSlide.titleLine1}
            <br />
            {currentSlide.titleLine2}
          </h1>

          {/* Description */}
          <p className="animate-hero-desc mt-6 text-base sm:text-lg text-white/90 max-w-xl leading-relaxed font-normal">
            {currentSlide.description}
          </p>

          {/* CTA + Navigation Controls */}
          <div className="animate-hero-actions mt-8 flex flex-wrap items-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-primary text-white hover:bg-primary/90 font-semibold px-6 shadow-lg transition-transform active:scale-95"
            >
              <Link href={currentSlide.ctaHref} className="inline-flex items-center gap-2">
                {currentSlide.ctaText} <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>

            {/* Slider Next/Prev Arrows */}
            <div className="flex items-center gap-1.5 pl-2">
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous slide"
                className="w-10 h-10 rounded-full border border-white/20 bg-white/5 hover:bg-white/20 text-white flex items-center justify-center transition-colors backdrop-blur-xs cursor-pointer active:scale-95"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next slide"
                className="w-10 h-10 rounded-full border border-white/20 bg-white/5 hover:bg-white/20 text-white flex items-center justify-center transition-colors backdrop-blur-xs cursor-pointer active:scale-95"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom status & indicator bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs uppercase tracking-widest text-white/70 border-t border-white/10 pt-4">
        <span className="flex items-center gap-2.5">
          <ArrowDown className="h-3.5 w-3.5 text-primary" />
          <span>A foundation for what’s next</span>
        </span>

        {/* Progress bar + Slide counter */}
        <div className="flex items-center gap-4">
          <div className="relative w-28 h-1 bg-white/15 rounded-full overflow-hidden">
            <div
              key={`progress-${currentSlide.id}`}
              className={`h-full bg-primary rounded-full animate-hero-timer ${
                isPaused ? "paused-timer" : ""
              }`}
            />
          </div>
          <span className="font-mono text-white/80">
            0{currentIndex + 1} / 0{slides.length}
          </span>
        </div>
      </div>
    </div>
  );
}
