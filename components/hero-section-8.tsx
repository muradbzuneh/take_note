"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { GuestDashboardPreview } from "@/components/guest-dashboard-preview";
import { cn } from "@/lib/utils";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-16 sm:pt-20">
      {/* Hero Showcase with Realistic Desk Setup Background */}
      <div className="relative min-h-[540px] sm:min-h-[620px] lg:min-h-[660px] flex items-center border-b border-border">
        {/* Background Desk Image */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <Image
            src="/hero-desk.webp"
            alt="Notebook desk workspace with physical notebook and laptop"
            fill
            priority
            sizes="100vw"
            className="object-cover object-right lg:object-[80%_center]"
          />
          {/* Subtle directional gradient for flawless text readability in light & dark */}
          <div className="absolute inset-0 bg-linear-to-r from-background via-background/95 sm:via-background/85 to-background/25 dark:from-[#0B1120] dark:via-[#0B1120]/92 dark:to-[#0B1120]/65" />
          {/* Subtle bottom fade */}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-background to-transparent dark:from-[#0B1120]" />
        </div>

        <div className="mx-auto max-w-7xl px-6 sm:px-8 w-full py-16 sm:py-24">
          <div className="max-w-xl">
            {/* Direct, confident headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.12]">
              Clear thinking. <br />
              <span className="text-primary">Structured notes.</span>
            </h1>

            {/* Single crisp sentence — unnecessary paragraphs removed */}
            <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-md">
              Capture fleeting thoughts, organize documentation into notebooks, and write with distraction-free rich blocks.
            </p>

            {/* Clean, functional action buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/signup"
                className={cn(
                  buttonVariants({ size: "default" }),
                  "h-11 px-6 text-sm font-semibold flex items-center gap-2"
                )}
              >
                <span>Start Writing Free</span>
                <ArrowRight className="size-4" />
              </Link>

              <Link
                href="#demo"
                className={cn(
                  buttonVariants({ variant: "outline", size: "default" }),
                  "h-11 px-6 text-sm font-medium bg-background/80 backdrop-blur-xs hover:bg-background"
                )}
              >
                Interactive Sandbox
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Guest Dashboard Interactive Showcase */}
      <GuestDashboardPreview />
    </section>
  );
}

export { HeroSection };
