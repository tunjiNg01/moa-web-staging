"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { HeroCarousel } from "@/components/hero-carousel";

export function HeroParallaxSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check if user prefers reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", handleMediaChange);

    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    let rafId: number | null = null;

    const onScroll = () => {
      if (rafId !== null) return;

      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        const scrollY = window.scrollY;

        // If hero is scrolled out of view, don't calculate
        if (scrollY > 1100) return;

        // Parallax video background: moves at ~38% scroll speed
        if (videoContainerRef.current) {
          const videoY = scrollY * 0.38;
          videoContainerRef.current.style.transform = `translate3d(0, ${videoY}px, 0)`;
        }

        // Parallax foreground content: drifts slightly upward & fades smoothly
        if (contentRef.current) {
          const contentY = scrollY * -0.12;
          const opacity = Math.max(0, 1 - scrollY / 620);
          contentRef.current.style.transform = `translate3d(0, ${contentY}px, 0)`;
          contentRef.current.style.opacity = `${opacity}`;
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Initial call
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[640px] h-screen max-h-[920px] overflow-hidden bg-ink text-white flex items-center"
      aria-label="Hero Section"
    >
      {/* Parallax Video Background Canvas */}
      <div
        ref={videoContainerRef}
        className="absolute -top-[12%] left-0 right-0 h-[124%] w-full will-change-transform pointer-events-none"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/images/engineering-hero.jpg"
          className="absolute inset-0 w-full h-full object-cover object-center scale-105"
        >
          <source src="/videos/hero-bg-optimized.webm" type="video/webm" />
          {/* Fallback image */}
          <Image
            src="/images/engineering-hero.jpg"
            alt="Sculptural concrete and glass building with a sweeping cantilevered roof"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </video>

        {/* Cinematic Multi-Layer Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/75 to-black/35 z-10" />
        <div className="absolute inset-0 bg-black/25 z-10" />
      </div>

      {/* Foreground Content with subtle parallax drift and fade */}
      <div
        ref={contentRef}
        className="relative z-20 w-full h-full flex flex-col justify-between will-change-transform"
      >
        <HeroCarousel />
      </div>
    </section>
  );
}
