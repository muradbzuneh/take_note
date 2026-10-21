"use client";

import Link from "next/link";
import {
  NotebookPen,
  Folder,
  Search,
  ArrowRight,
  Sparkles,
  Lock,
  Layers,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: NotebookPen,
    title: "Rich Block Editor",
    description:
      "Format with headings, code blocks, lists, quotes, and typography powered by modern Tiptap engine.",
  },
  {
    icon: Folder,
    title: "Multi-Notebook System",
    description:
      "Separate your work, thoughts, journals, and projects into structured, organized workspaces.",
  },
  {
    icon: Search,
    title: "Instant Live Search",
    description:
      "Find any note across your entire notebook library instantaneously without endless clicking.",
  },
  {
    icon: Lock,
    title: "Private & Authenticated",
    description:
      "Your notes belong exclusively to you, secured with session verification and encrypted passwords.",
  },
  {
    icon: Layers,
    title: "Cloud Synchronization",
    description:
      "All your edits and notes save automatically, keeping your knowledge in sync across devices.",
  },
  {
    icon: Sparkles,
    title: "Light & Dark Themes",
    description:
      "Designed with an editorial navy and cool neutral palette crafted for long hours of focused writing.",
  },
];

export function Features() {
  return (
    <section
      id="features"
      className="w-full px-5 py-16 sm:px-8 sm:py-20 border-t border-border bg-muted/20"
    >
      <div className="mx-auto max-w-5xl">
        {/* Section heading */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-2 text-xs font-semibold tracking-wider text-primary uppercase">
            Crafted for focused work
          </p>

          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
            Everything you need in a notebook
          </h2>

          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            Capture fleeting thoughts, draft comprehensive documents, and organize your knowledge base.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-md border border-border bg-card p-5 transition-colors hover:border-primary/50"
              >
                <div className="mb-3 flex size-8 items-center justify-center rounded-sm bg-muted text-primary border border-border/60">
                  <Icon className="size-4" />
                </div>

                <h3 className="text-sm font-semibold text-foreground">
                  {feature.title}
                </h3>

                <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Call to action */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/signup"
            className={cn(
              buttonVariants({ size: "default" }),
              "h-10 px-5 text-sm font-medium flex items-center gap-2"
            )}
          >
            <span>Start Taking Notes Today</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Features;
