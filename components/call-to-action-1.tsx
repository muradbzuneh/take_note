"use client";

import { buttonVariants } from "@/components/ui/button";
import { LogoIcon } from "@/components/logo";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CallToAction() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28 border-t border-border bg-background">
      {/* Precision Dot Matrix Texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-dot-matrix mask-radial-fade opacity-60"
      />

      {/* Subtle horizon glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 left-1/2 -z-10 h-72 w-[48rem] -translate-x-1/2 rounded-full bg-primary/10 blur-[90px]"
      />

      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center flex flex-col items-center">
          <LogoIcon className="size-12 rounded-md mb-6 border border-border/80" />

          <h2 className="text-balance text-2xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground">
            Structure your knowledge base with{" "}
            <span className="text-primary">Notebook</span>
          </h2>

          <p className="mt-4 max-w-lg text-sm sm:text-base text-muted-foreground leading-relaxed">
            Distraction-free document editing, hierarchical notebooks, and live cloud synchronization.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/signup"
              className={cn(
                buttonVariants({ size: "default" }),
                "h-10 px-5 text-sm font-medium gap-2"
              )}
            >
              <span>Create Free Account</span>
              <ArrowRight className="size-3.5" />
            </Link>

            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "outline", size: "default" }),
                "h-10 px-5 text-sm font-medium"
              )}
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
