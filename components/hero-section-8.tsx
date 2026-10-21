"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { GuestDashboardPreview } from "@/components/guest-dashboard-preview";
import { cn } from "@/lib/utils";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-28 sm:pt-36 pb-16">
      {/* Precision Engineered Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        {/* Subtle dot matrix with radial falloff */}
        <div className="absolute inset-0 bg-dot-matrix mask-radial-fade opacity-60" />

        {/* Ambient navy horizon glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[48rem] h-[28rem] rounded-full bg-primary/10 blur-[100px]" />

        {/* Horizontal subtle baseline */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-border/40" />
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Release Tag */}
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground mb-6">
          <span className="size-1.5 rounded-full bg-primary" />
          <span className="font-semibold text-foreground">Notebook</span>
          <span>•</span>
          <span>Personal & Team Knowledge Base</span>
        </div>

        {/* Hero Headline */}
        <h1 className="text-balance text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
          Your thoughts and documentation. <br />
          <span className="text-primary">Engineered for clear thinking.</span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-5 max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed">
          The restrained, editorial workspace for writing, planning, and organizing knowledge.
          Structure documents into notebooks, draft with clean rich-text blocks, and sync securely in real time.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/signup"
            className={cn(
              buttonVariants({ size: "default" }),
              "h-10 px-5 text-sm font-medium flex items-center gap-2"
            )}
          >
            <span>Start Writing Free</span>
            <ArrowRight className="size-3.5" />
          </Link>

          <Link
            href="#demo"
            className={cn(
              buttonVariants({ variant: "outline", size: "default" }),
              "h-10 px-5 text-sm font-medium"
            )}
          >
            Interactive Workspace Preview
          </Link>
        </div>

        {/* Value badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Check className="size-3.5 text-primary" /> Free personal workspace
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="size-3.5 text-primary" /> End-to-end encrypted sessions
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="size-3.5 text-primary" /> Instant cloud synchronization
          </span>
        </div>
      </div>

      {/* Guest Dashboard Interactive Showcase */}
      <GuestDashboardPreview />
    </section>
  );
}
