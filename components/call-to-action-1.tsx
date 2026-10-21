"use client";

import { buttonVariants } from "@/components/ui/button";
import { LogoIcon } from "@/components/logo";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CallToAction() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28 border-t border-border/50">
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 left-1/2 -z-10 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl"
      />

      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-4xl text-center flex flex-col items-center">
          <LogoIcon className="size-14 rounded-2xl mb-6 shadow-xl border-emerald-500/30" />

          <h2 className="text-balance text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Ready to organize your mind in{" "}
            <span className="text-emerald-600 dark:text-emerald-400">Notebook</span>?
          </h2>

          <p className="mt-4 max-w-xl text-base sm:text-lg text-muted-foreground">
            Join thousands of users capturing their thoughts and organizing their ideas.
            Set up in less than 30 seconds.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/signup"
              className={cn(
                buttonVariants({ size: "lg" }),
                "shadow-xl shadow-emerald-500/20 h-12 px-7 text-base font-semibold gap-2"
              )}
            >
              <span>Create Free Account</span>
              <ArrowRight className="size-4" />
            </Link>

            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-12 px-7 text-base font-medium"
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
