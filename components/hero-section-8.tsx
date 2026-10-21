"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Check, ShieldCheck, Zap } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { GuestDashboardPreview } from "@/components/guest-dashboard-preview";
import { cn } from "@/lib/utils";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-32 sm:pt-40 pb-16">
      {/* Decorative gradient glow behind the hero */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-emerald-500 to-emerald-300 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Subtle pill badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-6 backdrop-blur">
          <Sparkles className="size-3.5 animate-pulse" />
          <span>The Modern Notebook Experience</span>
          <span className="size-1 rounded-full bg-emerald-500" />
          <span className="opacity-80">v1.0 is live</span>
        </div>

        {/* Hero Headline */}
        <h1 className="text-balance text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight">
          Your thoughts, notes, and ideas. <br />
          <span className="bg-linear-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300 bg-clip-text text-transparent">
            Beautifully organized.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
          The distraction-free workspace for thinkers, developers, and writers.
          Organize your notes into rich notebooks, write with modern Tiptap blocks,
          and sync seamlessly across all your devices.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/signup"
            className={cn(
              buttonVariants({ size: "lg" }),
              "shadow-xl shadow-emerald-500/25 h-12 px-6 text-base font-semibold flex items-center gap-2"
            )}
          >
            <span>Start Writing — It&apos;s Free</span>
            <ArrowRight className="size-4" />
          </Link>

          <Link
            href="#demo"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-12 px-6 text-base font-medium"
            )}
          >
            Explore Guest Dashboard
          </Link>
        </div>

        {/* Value badges */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Check className="size-4 text-emerald-500" /> No credit card required
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="size-4 text-emerald-500" /> Secure user authentication
          </span>
          <span className="flex items-center gap-1.5">
            <Zap className="size-4 text-emerald-500" /> Instant cloud auto-save
          </span>
        </div>
      </div>

      {/* Guest Dashboard Interactive Showcase (Dark / Light toggleable) */}
      <GuestDashboardPreview />
    </section>
  );
}
