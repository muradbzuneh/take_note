"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Undo,
  Redo,
  Bold,
  Italic,
  Strikethrough,
  Code,
  List,
  ListOrdered,
  Quote,
  Moon,
  Sun,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  FileText,
  BookOpen,
  Search,
  Plus,
  ChevronDown,
  SquareCheck,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { LogoIcon } from "@/components/logo";
import { cn } from "@/lib/utils";

interface NoteTab {
  id: string;
  name: string;
  icon: string;
  title: string;
  tag: string;
  content: {
    heading: string;
    description: string;
    items: string[];
    quote?: string;
  };
}

const DEMO_TABS: NoteTab[] = [
  {
    id: "notion-editor",
    name: "Notion-like Editor",
    icon: "📓",
    title: "Project Strategy & Ideas 💡",
    tag: "Workspace",
    content: {
      heading: "Building our next-generation notebook app",
      description:
        "Capture your thoughts, structure thoughts into notebooks, and format every note with rich Tiptap blocks.",
      items: [
        "Rich text typography with headers, lists, code & quotes",
        "Instant search across all your notebooks and pages",
        "Multi-notebook hierarchy designed for focused work",
        "Cloud auto-save with instant synchronization",
      ],
      quote:
        "The simplest way to organize ideas, track projects, and keep your mind clear.",
    },
  },
  {
    id: "quick-notes",
    name: "Quick Notes",
    icon: "⚡",
    title: "Weekly Sprint & Meeting Notes 🎯",
    tag: "Team",
    content: {
      heading: "Q4 Launch Checklist & Sprint Goals",
      description:
        "Priorities and milestones for this sprint to deliver top-tier productivity features.",
      items: [
        "Complete user authentication with email verification",
        "Fine-tune dark and light theme contrast",
        "Test rich text markdown block conversions",
        "Launch to early beta subscribers",
      ],
      quote:
        "Focus on velocity, simplicity, and delighting users at every step.",
    },
  },
  {
    id: "journal",
    name: "Daily Journal",
    icon: "🌿",
    title: "Thoughts & Daily Reflections 🍃",
    tag: "Personal",
    content: {
      heading: "Morning mindfulness & creative routine",
      description:
        "Starting each day by writing down 3 key intentions in a calm, distraction-free environment.",
      items: [
        "Drink coffee while reviewing today's priority list",
        "30 minutes of uninterrupted writing in Notebook",
        "Organize notes into designated folders before lunch",
      ],
      quote:
        "Clear writing leads to clear thinking.",
    },
  },
];

export function GuestDashboardPreview() {
  const [activeTab, setActiveTab] = useState(DEMO_TABS[0].id);
  const [previewTheme, setPreviewTheme] = useState<"light" | "dark">("dark");
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({
    0: true,
    1: true,
  });

  const currentTab = DEMO_TABS.find((t) => t.id === activeTab) || DEMO_TABS[0];

  const toggleCheck = (idx: number) => {
    setCheckedItems((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  return (
    <div id="demo" className="relative mx-auto max-w-6xl px-4 sm:px-6 py-12">
      {/* Background glow matching the green logo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-12 left-1/2 -z-10 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-emerald-500/15 blur-3xl"
      />

      {/* Main Preview Container with Theme Simulation */}
      <div
        className={`relative overflow-hidden rounded-2xl border shadow-2xl transition-colors duration-300 ${
          previewTheme === "dark"
            ? "border-zinc-800 bg-[#0d121c] text-zinc-100 shadow-emerald-950/20"
            : "border-zinc-200 bg-white text-zinc-900 shadow-zinc-200/50"
        }`}
      >
        {/* Top Window Bar */}
        <div
          className={`flex flex-wrap items-center justify-between border-b px-4 py-3 gap-3 ${
            previewTheme === "dark"
              ? "border-zinc-800/80 bg-[#121824]"
              : "border-zinc-200/80 bg-zinc-50/90"
          }`}
        >
          {/* Window dots & Branding */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="size-3 rounded-full bg-rose-500/80" />
              <span className="size-3 rounded-full bg-amber-500/80" />
              <span className="size-3 rounded-full bg-emerald-500/80" />
            </div>

            <div className="hidden sm:flex items-center gap-2 pl-2 text-xs font-semibold">
              <LogoIcon className="size-5 rounded-md" />
              <span>
                Note<span className="text-emerald-500">book</span> App Preview
              </span>
            </div>
          </div>

          {/* Interactive Document Tabs (Inspired by Image 2) */}
          <div className="flex items-center gap-1 overflow-x-auto rounded-lg p-1 bg-black/5 dark:bg-white/5 text-xs font-medium">
            {DEMO_TABS.map((tab) => {
              const isActive = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  type="button"
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? previewTheme === "dark"
                        ? "bg-emerald-500/20 text-emerald-400 font-semibold shadow-xs"
                        : "bg-white text-emerald-700 font-semibold shadow-xs"
                      : "text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5"
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>

          {/* Theme switcher for the preview */}
          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-lg border border-border/80 bg-background/80 p-0.5 text-xs">
              <button
                type="button"
                onClick={() => setPreviewTheme("light")}
                className={`flex items-center gap-1 px-2 py-1 rounded-md transition-colors cursor-pointer ${
                  previewTheme === "light"
                    ? "bg-emerald-600 text-white font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                title="Preview Light Theme"
              >
                <Sun className="size-3.5" />
                <span className="hidden md:inline">Light</span>
              </button>

              <button
                type="button"
                onClick={() => setPreviewTheme("dark")}
                className={`flex items-center gap-1 px-2 py-1 rounded-md transition-colors cursor-pointer ${
                  previewTheme === "dark"
                    ? "bg-emerald-600 text-white font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                title="Preview Dark Theme"
              >
                <Moon className="size-3.5" />
                <span className="hidden md:inline">Dark</span>
              </button>
            </div>
          </div>
        </div>

        {/* Toolbar Bar (Matching Image 2 & Tiptap) */}
        <div
          className={`flex flex-wrap items-center gap-1 px-4 py-2 border-b text-xs select-none ${
            previewTheme === "dark"
              ? "border-zinc-800 bg-[#0f1522] text-zinc-300"
              : "border-zinc-200 bg-zinc-100/70 text-zinc-700"
          }`}
        >
          <div className="flex items-center gap-0.5">
            <button
              type="button"
              className="size-7 flex items-center justify-center rounded hover:bg-black/5 dark:hover:bg-white/10"
              title="Undo"
            >
              <Undo className="size-3.5" />
            </button>
            <button
              type="button"
              className="size-7 flex items-center justify-center rounded hover:bg-black/5 dark:hover:bg-white/10"
              title="Redo"
            >
              <Redo className="size-3.5" />
            </button>
          </div>

          <div className="h-4 w-px bg-border mx-1" />

          <div className="flex items-center gap-1 px-2 py-1 rounded bg-black/5 dark:bg-white/5 font-semibold text-xs">
            <span>Heading 1</span>
            <ChevronDown className="size-3 opacity-60" />
          </div>

          <div className="h-4 w-px bg-border mx-1" />

          {/* Formatting buttons */}
          <div className="flex items-center gap-0.5">
            <button
              type="button"
              className="size-7 flex items-center justify-center rounded bg-emerald-500/20 text-emerald-500 font-bold"
              title="Bold"
            >
              <Bold className="size-3.5" />
            </button>
            <button
              type="button"
              className="size-7 flex items-center justify-center rounded hover:bg-black/5 dark:hover:bg-white/10"
              title="Italic"
            >
              <Italic className="size-3.5" />
            </button>
            <button
              type="button"
              className="size-7 flex items-center justify-center rounded hover:bg-black/5 dark:hover:bg-white/10"
              title="Strikethrough"
            >
              <Strikethrough className="size-3.5" />
            </button>
            <button
              type="button"
              className="size-7 flex items-center justify-center rounded hover:bg-black/5 dark:hover:bg-white/10"
              title="Inline Code"
            >
              <Code className="size-3.5" />
            </button>
          </div>

          <div className="h-4 w-px bg-border mx-1" />

          <div className="flex items-center gap-0.5">
            <button
              type="button"
              className="size-7 flex items-center justify-center rounded hover:bg-black/5 dark:hover:bg-white/10"
              title="Bullet list"
            >
              <List className="size-3.5" />
            </button>
            <button
              type="button"
              className="size-7 flex items-center justify-center rounded hover:bg-black/5 dark:hover:bg-white/10"
              title="Numbered list"
            >
              <ListOrdered className="size-3.5" />
            </button>
            <button
              type="button"
              className="size-7 flex items-center justify-center rounded hover:bg-black/5 dark:hover:bg-white/10"
              title="Blockquote"
            >
              <Quote className="size-3.5" />
            </button>
          </div>

          <div className="ml-auto hidden sm:flex items-center gap-2">
            <span className="flex items-center gap-1 text-[11px] text-emerald-500 font-medium">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Preview
            </span>
          </div>
        </div>

        {/* Live Document Body */}
        <div className="p-6 sm:p-10 min-h-[380px]">
          {/* Note Metadata */}
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <Sparkles className="size-3" />
              {currentTab.tag}
            </span>
            <span className="text-xs text-muted-foreground">
              Updated 2 minutes ago
            </span>
          </div>

          {/* Document Title */}
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
            {currentTab.title}
          </h1>

          {/* Document Content */}
          <div className="space-y-4 max-w-3xl text-sm sm:text-base leading-relaxed">
            <p className="text-muted-foreground font-medium">
              {currentTab.content.description}
            </p>

            {/* Checklist / Action items */}
            <div className="space-y-2.5 pt-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Key Highlights
              </div>
              {currentTab.content.items.map((item, index) => {
                const isChecked = !!checkedItems[index];
                return (
                  <div
                    key={item}
                    onClick={() => toggleCheck(index)}
                    className={`flex items-start gap-3 p-2.5 rounded-lg border transition-all cursor-pointer ${
                      isChecked
                        ? previewTheme === "dark"
                          ? "bg-emerald-950/20 border-emerald-800/40 text-zinc-200"
                          : "bg-emerald-50/70 border-emerald-200 text-emerald-950"
                        : previewTheme === "dark"
                        ? "bg-zinc-900/50 border-zinc-800/80 text-zinc-400"
                        : "bg-zinc-50 border-zinc-200 text-zinc-600"
                    }`}
                  >
                    <button
                      type="button"
                      className="mt-0.5 text-emerald-500 shrink-0"
                    >
                      <CheckCircle2
                        className={`size-4 ${
                          isChecked ? "text-emerald-500 fill-emerald-500/20" : "text-muted-foreground"
                        }`}
                      />
                    </button>
                    <span className={isChecked ? "font-medium" : ""}>
                      {item}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Blockquote */}
            {currentTab.content.quote && (
              <blockquote className="border-l-3 border-emerald-500 pl-4 py-1 italic text-muted-foreground text-sm bg-emerald-500/5 rounded-r-lg">
                &ldquo;{currentTab.content.quote}&rdquo;
              </blockquote>
            )}
          </div>
        </div>

        {/* Floating Call to Action banner prompting guest to register */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-between gap-4 p-5 sm:p-6 border-t ${
            previewTheme === "dark"
              ? "border-zinc-800 bg-[#121824]/90"
              : "border-zinc-200 bg-emerald-50/50"
          }`}
        >
          <div className="text-center sm:text-left">
            <h3 className="font-semibold text-base sm:text-lg flex items-center justify-center sm:justify-start gap-2">
              <span>Ready to start your own notebook?</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500 text-white font-bold">
                Free
              </span>
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              Create unlimited notebooks, write rich notes, and access them from anywhere.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-center">
            <Link
              href="/signup"
              className={cn(
                buttonVariants({ size: "lg" }),
                "shadow-lg shadow-emerald-500/20 w-full sm:w-auto flex items-center justify-center gap-2 font-semibold"
              )}
            >
              <span>Create Free Account</span>
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "hidden md:inline-flex"
              )}
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuestDashboardPreview;
