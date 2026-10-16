
"use client";

import {
  NotebookPen,
  Folder,
  Search,
  ArrowRight,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

const features = [
  {
    icon: NotebookPen,
    title: "Rich notes",
    description:
      "Capture ideas, write notes, and keep important information in one place.",
  },
  {
    icon: Folder,
    title: "Stay organized",
    description:
      "Organize your notes into a structure that makes sense for your workflow.",
  },
  {
    icon: Search,
    title: "Quick search",
    description:
      "Find the notes and ideas you need quickly, without searching manually.",
  },
];

export function Features() {
  return (
    <section
      id="features"
      className="w-full px-5 py-20 sm:px-8 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section heading */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-3 text-sm font-medium tracking-widest text-primary uppercase">
            Made for your workflow
          </p>

          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            Everything for your notes
          </h2>

          <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
            Capture your thoughts, stay organized, and find
            what matters — all in one place.
          </p>
        </div>

        {/* Three feature cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Card
                key={feature.title}
                className="group h-full border-border/70 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
              >
                <CardHeader className="items-start gap-4 pb-3">
                  <div className="flex size-12 items-center justify-center rounded-xl border bg-muted/60 transition-colors group-hover:bg-primary/10">
                    <Icon
                      className="size-6 text-primary"
                      aria-hidden="true"
                    />
                  </div>

                  <CardTitle className="text-xl">
                    {feature.title}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <CardDescription className="text-sm leading-6 sm:text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to action */}
        <div className="mt-10 flex justify-center">
          <Button
            size="lg"
            className="group"
            onClick={() => {
              document
                .getElementById("features")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Explore the features
            <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
}
