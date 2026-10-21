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

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

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
    title: "Light & Dark Modes",
    description:
      "Designed with an emerald aesthetic that looks crisp in light mode and easy on the eyes in dark mode.",
  },
];

export function Features() {
  return (
    <section
      id="features"
      className="w-full px-5 py-20 sm:px-8 sm:py-24 border-t border-border/50 bg-muted/15"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section heading */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-3 text-xs font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase">
            Crafted for focused work
          </p>

          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Everything you need in a notebook
          </h2>

          <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
            Capture fleeting thoughts, draft comprehensive documents, and organize your knowledge base.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Card
                key={feature.title}
                className="h-full border border-border/60 bg-card/60 backdrop-blur-xs transition-all duration-200 hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/5 hover:-translate-y-1"
              >
                <CardHeader>
                  <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    <Icon className="size-5" />
                  </div>

                  <CardTitle className="text-lg font-bold">
                    {feature.title}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <CardDescription className="text-sm leading-6">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to action */}
        <div className="mt-14 flex justify-center">
          <Link
            href="/signup"
            className={cn(
              buttonVariants({ size: "lg" }),
              "group shadow-xl shadow-emerald-500/20 h-12 px-7 text-base font-semibold flex items-center gap-2"
            )}
          >
            <span>Start Taking Notes Today</span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Features;
