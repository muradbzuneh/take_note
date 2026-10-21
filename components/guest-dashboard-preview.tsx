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
  ArrowRight,
  FileText,
  Search,
  ChevronRight,
  Folder,
  Check,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { LogoIcon } from "@/components/logo";
import { cn } from "@/lib/utils";

interface DemoNote {
  id: string;
  notebook: string;
  notebookIcon: string;
  title: string;
  updatedAt: string;
  wordCount: number;
  readTime: string;
  category: string;
  content: {
    summary: string;
    tasks: { text: string; done: boolean }[];
    codeSnippet?: { language: string; code: string };
    quote?: string;
  };
}

const DEMO_NOTEBOOKS = [
  { id: "engineering", name: "Engineering & Specs", count: 3 },
  { id: "workspace", name: "Team Workspaces", count: 4 },
  { id: "personal", name: "Personal Knowledge", count: 2 },
];

const DEMO_NOTES: Record<string, DemoNote> = {
  "architecture-spec": {
    id: "architecture-spec",
    notebook: "Engineering & Specs",
    notebookIcon: "folder",
    title: "System Architecture & Core Engine",
    updatedAt: "Today at 10:45 AM",
    wordCount: 384,
    readTime: "2 min read",
    category: "Architecture",
    content: {
      summary:
        "The Notebook web platform is designed around a modular architecture that separates server-rendered workspace trees from client-side interactive Tiptap editing blocks.",
      tasks: [
        { text: "Implement Next.js 16 route proxy with session verification", done: true },
        { text: "Configure PostgreSQL schema with cascade deletions on notebooks", done: true },
        { text: "Integrate Tiptap rich-text extensions with backward compatibility", done: true },
        { text: "Deploy production build with partial prerendering and edge routing", done: false },
      ],
      codeSnippet: {
        language: "typescript",
        code: `// Server action with revalidation and session defense
export async function saveNote(noteId: string, content: JSONContent) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) return { success: false, message: "Unauthorized" };

  await db.update(notes).set({ content }).where(eq(notes.id, noteId));
  revalidatePath(\`/dashboard/notebook/\${notebookId}\`);
  return { success: true };
}`,
      },
      quote:
        "Architecture should reflect clear domain boundaries: keep state localized, cache where appropriate, and protect user data by default.",
    },
  },
  "sprint-checklist": {
    id: "sprint-checklist",
    notebook: "Team Workspaces",
    notebookIcon: "folder",
    title: "Weekly Sprint & Deliverables",
    updatedAt: "Yesterday at 4:15 PM",
    wordCount: 260,
    readTime: "1 min read",
    category: "Milestones",
    content: {
      summary:
        "Current sprint objectives focused on delivering ultra-fast UI feedback, zero-warning code quality, and production-grade accessibility.",
      tasks: [
        { text: "Eliminate all emoji placeholders in favor of Lucide icon system", done: true },
        { text: "Test Google social OAuth asynchronous pending state and error toast", done: true },
        { text: "Verify dark and light mode contrast ratio standards (WCAG AAA)", done: true },
        { text: "Publish comprehensive deployment guidelines in README.md", done: true },
      ],
      quote:
        "Velocity and quality are mutually reinforcing when software is built on clean foundations.",
    },
  },
  "personal-ideas": {
    id: "personal-ideas",
    notebook: "Personal Knowledge",
    notebookIcon: "folder",
    title: "Product Vision & Personal Reflections",
    updatedAt: "Oct 19, 2026",
    wordCount: 310,
    readTime: "2 min read",
    category: "Philosophy",
    content: {
      summary:
        "A notebook should not feel like an enterprise spreadsheet or a cluttered database. It should feel like a luxurious, distraction-free sheet of paper that happens to have infinite capacity.",
      tasks: [
        { text: "Morning writing session: 30 minutes of uninterrupted focus", done: true },
        { text: "Organize raw notes into structured notebooks before afternoon review", done: true },
        { text: "Review key takeaways from weekly reading list", done: false },
      ],
      quote:
        "The simpler the tool, the clearer the thoughts that flow through it.",
    },
  },
};

export function GuestDashboardPreview() {
  const [selectedNoteId, setSelectedNoteId] = useState<string>("architecture-spec");
  const [sandboxTheme, setSandboxTheme] = useState<"dark" | "light">("dark");
  const [taskState, setTaskState] = useState<Record<string, Record<number, boolean>>>({
    "architecture-spec": { 0: true, 1: true, 2: true, 3: false },
    "sprint-checklist": { 0: true, 1: true, 2: true, 3: true },
    "personal-ideas": { 0: true, 1: true, 2: false },
  });

  const activeNote = DEMO_NOTES[selectedNoteId] || DEMO_NOTES["architecture-spec"];

  const handleToggleTask = (noteId: string, taskIdx: number) => {
    setTaskState((prev) => ({
      ...prev,
      [noteId]: {
        ...prev[noteId],
        [taskIdx]: !prev[noteId]?.[taskIdx],
      },
    }));
  };

  return (
    <div id="demo" className="relative mx-auto max-w-6xl px-4 sm:px-6 py-12">
      {/* Precision Frame with Real Elevation Shadows (No AI-blob blur) */}
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border transition-all duration-300",
          sandboxTheme === "dark"
            ? "border-zinc-800 bg-[#0c1017] text-zinc-100 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] ring-1 ring-white/10"
            : "border-zinc-200 bg-white text-zinc-900 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.1)] ring-1 ring-black/5"
        )}
      >
        {/* Authentic Top Window Chrome */}
        <div
          className={cn(
            "flex flex-wrap items-center justify-between border-b px-4 py-2.5 gap-3 select-none text-xs",
            sandboxTheme === "dark"
              ? "border-zinc-800/80 bg-[#10151f]"
              : "border-zinc-200 bg-zinc-50"
          )}
        >
          {/* Breadcrumbs & App Identity */}
          <div className="flex items-center gap-2.5">
            <LogoIcon className="size-5 rounded-md" />
            <div className="flex items-center gap-1.5 font-medium text-muted-foreground">
              <span className="font-semibold text-foreground">Notebook</span>
              <ChevronRight className="size-3 opacity-50" />
              <span>{activeNote.notebook}</span>
              <ChevronRight className="size-3 opacity-50" />
              <span className="text-foreground truncate max-w-[140px] sm:max-w-[200px]">
                {activeNote.title}
              </span>
            </div>
          </div>

          {/* Controls: Live Status & Interactive Theme Switcher */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-medium text-primary">
              <span className="size-1.5 rounded-full bg-primary animate-pulse" />
              <span>Interactive Sandbox</span>
            </div>

            {/* Realistic Light/Dark Sandbox Mode Switcher */}
            <div className="flex items-center rounded-md border border-border bg-background p-0.5 text-xs">
              <button
                type="button"
                onClick={() => setSandboxTheme("light")}
                className={cn(
                  "flex items-center gap-1 px-2.5 py-1 rounded-sm transition-all cursor-pointer font-medium",
                  sandboxTheme === "light"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
                title="View Light Theme"
              >
                <Sun className="size-3" />
                <span>Light</span>
              </button>

              <button
                type="button"
                onClick={() => setSandboxTheme("dark")}
                className={cn(
                  "flex items-center gap-1 px-2.5 py-1 rounded-sm transition-all cursor-pointer font-medium",
                  sandboxTheme === "dark"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
                title="View Dark Theme"
              >
                <Moon className="size-3" />
                <span>Dark</span>
              </button>
            </div>
          </div>
        </div>

        {/* Real 2-Pane Workspace Layout (Sidebar + Editor Canvas) */}
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[520px]">
          {/* Left Mini Explorer Pane (4 cols) */}
          <div
            className={cn(
              "md:col-span-4 border-b md:border-b-0 md:border-r p-4 flex flex-col justify-between select-none",
              sandboxTheme === "dark"
                ? "border-zinc-800/80 bg-[#090d14]"
                : "border-zinc-200 bg-zinc-50/70"
            )}
          >
            <div className="space-y-4">
              {/* Mini Search Bar */}
              <div
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs text-muted-foreground",
                  sandboxTheme === "dark" ? "border-zinc-800 bg-black/20" : "border-zinc-200 bg-white"
                )}
              >
                <Search className="size-3.5 opacity-60" />
                <span className="truncate">Search notes & notebooks...</span>
                <kbd className="ml-auto text-[10px] font-mono px-1 py-0.5 rounded bg-muted/60 opacity-80">
                  ⌘K
                </kbd>
              </div>

              {/* Notebooks Hierarchy List */}
              <div className="space-y-1">
                <div className="px-2 pb-1 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  Notebooks ({DEMO_NOTEBOOKS.length})
                </div>

                {DEMO_NOTEBOOKS.map((nb) => {
                  const hasActiveNote = activeNote.notebook === nb.name;
                  return (
                    <div
                      key={nb.id}
                      className={cn(
                        "flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer",
                        hasActiveNote
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5"
                      )}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <Folder className="size-3.5 shrink-0 opacity-80" />
                        <span className="truncate">{nb.name}</span>
                      </div>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-xs bg-black/5 dark:bg-white/10 font-mono">
                        {nb.count}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Interactive Notes List */}
              <div className="space-y-1 pt-2 border-t border-border/40">
                <div className="px-2 pb-1 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  Active Notes
                </div>

                {Object.values(DEMO_NOTES).map((note) => {
                  const isSelected = selectedNoteId === note.id;
                  return (
                    <button
                      key={note.id}
                      type="button"
                      onClick={() => setSelectedNoteId(note.id)}
                      className={cn(
                        "w-full text-left flex items-start gap-2 px-2.5 py-2 rounded-md text-xs transition-colors cursor-pointer",
                        isSelected
                          ? sandboxTheme === "dark"
                            ? "bg-zinc-800 text-white font-medium border border-zinc-700"
                            : "bg-white text-foreground border border-border font-medium"
                          : "text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5"
                      )}
                    >
                      <FileText className="size-3.5 mt-0.5 shrink-0 text-primary" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate leading-tight">{note.title}</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5 font-normal">
                          {note.updatedAt}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sidebar Bottom CTA */}
            <div className="pt-4 border-t border-border/40 mt-4">
              <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-2">
                <span>Cloud Storage</span>
                <span className="font-medium text-foreground">100% Free</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
                <div className="h-full w-1/4 rounded-full bg-primary" />
              </div>
            </div>
          </div>

          {/* Right Main Editor Canvas Pane (8 cols) */}
          <div
            className={cn(
              "md:col-span-8 flex flex-col justify-between",
              sandboxTheme === "dark" ? "bg-[#0d121c]" : "bg-white"
            )}
          >
            <div>
              {/* Professional Tiptap-Style Toolbar */}
              <div
                className={cn(
                  "flex flex-wrap items-center gap-1 px-4 py-2 border-b text-xs select-none",
                  sandboxTheme === "dark"
                    ? "border-zinc-800/80 bg-[#111723] text-zinc-300"
                    : "border-zinc-200 bg-zinc-100/60 text-zinc-700"
                )}
              >
                <div className="flex items-center gap-0.5">
                  <button
                    type="button"
                    className="size-7 flex items-center justify-center rounded hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer"
                    title="Undo"
                  >
                    <Undo className="size-3.5" />
                  </button>
                  <button
                    type="button"
                    className="size-7 flex items-center justify-center rounded hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer"
                    title="Redo"
                  >
                    <Redo className="size-3.5" />
                  </button>
                </div>

                <div className="h-4 w-px bg-border mx-1" />

                <div className="flex items-center gap-1 px-2 py-1 rounded bg-black/5 dark:bg-white/5 font-semibold text-xs">
                  <span>Heading 1</span>
                </div>

                <div className="h-4 w-px bg-border mx-1" />

                <div className="flex items-center gap-0.5">
                  <button
                    type="button"
                    className="size-7 flex items-center justify-center rounded bg-primary/10 text-primary font-bold cursor-pointer"
                    title="Bold"
                  >
                    <Bold className="size-3.5" />
                  </button>
                  <button
                    type="button"
                    className="size-7 flex items-center justify-center rounded hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer"
                    title="Italic"
                  >
                    <Italic className="size-3.5" />
                  </button>
                  <button
                    type="button"
                    className="size-7 flex items-center justify-center rounded hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer"
                    title="Strikethrough"
                  >
                    <Strikethrough className="size-3.5" />
                  </button>
                  <button
                    type="button"
                    className="size-7 flex items-center justify-center rounded hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer"
                    title="Inline Code"
                  >
                    <Code className="size-3.5" />
                  </button>
                </div>

                <div className="h-4 w-px bg-border mx-1" />

                <div className="flex items-center gap-0.5">
                  <button
                    type="button"
                    className="size-7 flex items-center justify-center rounded hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer"
                    title="Bullet list"
                  >
                    <List className="size-3.5" />
                  </button>
                  <button
                    type="button"
                    className="size-7 flex items-center justify-center rounded hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer"
                    title="Numbered list"
                  >
                    <ListOrdered className="size-3.5" />
                  </button>
                  <button
                    type="button"
                    className="size-7 flex items-center justify-center rounded hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer"
                    title="Blockquote"
                  >
                    <Quote className="size-3.5" />
                  </button>
                </div>

                <div className="ml-auto hidden sm:flex items-center gap-2 text-[11px] text-muted-foreground font-mono">
                  <span>Auto-save active</span>
                </div>
              </div>

              {/* Document Header & Metadata */}
              <div className="p-6 sm:p-8 pb-4">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                    <span className="size-1.5 rounded-full bg-primary" />
                    {activeNote.category}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {activeNote.wordCount} words • {activeNote.readTime} • {activeNote.updatedAt}
                  </span>
                </div>

                <h1 className="text-xl sm:text-2xl font-bold tracking-tight mb-3 text-foreground">
                  {activeNote.title}
                </h1>

                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {activeNote.content.summary}
                </p>

                {/* Interactive Checklist (Clickable!) */}
                <div className="space-y-2 mb-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Action Items (Click to toggle)
                  </p>
                  {activeNote.content.tasks.map((task, idx) => {
                    const isDone = taskState[activeNote.id]?.[idx] ?? task.done;
                    return (
                      <div
                        key={task.text}
                        onClick={() => handleToggleTask(activeNote.id, idx)}
                        className={cn(
                          "flex items-start gap-2.5 p-2 rounded-md border text-xs sm:text-sm transition-colors cursor-pointer select-none",
                          isDone
                            ? "border-border/80 bg-muted/30 text-muted-foreground"
                            : "border-border bg-card text-foreground"
                        )}
                      >
                        <div
                          className={cn(
                            "mt-0.5 size-4 rounded-xs flex items-center justify-center shrink-0 border transition-colors",
                            isDone
                              ? "bg-primary border-primary text-primary-foreground"
                              : "border-muted-foreground/30 bg-transparent"
                          )}
                        >
                          {isDone && <Check className="size-3 stroke-[3]" />}
                        </div>
                        <span className={cn(isDone && "line-through opacity-70")}>
                          {task.text}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Formatted Code Block */}
                {activeNote.content.codeSnippet && (
                  <div className="mb-6 rounded-md border border-border bg-muted/40 p-3.5 text-xs font-mono overflow-x-auto text-foreground">
                    <div className="flex items-center justify-between text-[10px] text-muted-foreground pb-2 mb-2 border-b border-border/60">
                      <span>{activeNote.content.codeSnippet.language}</span>
                      <span>Read-only snippet</span>
                    </div>
                    <pre className="leading-relaxed">
                      <code>{activeNote.content.codeSnippet.code}</code>
                    </pre>
                  </div>
                )}

                {/* Blockquote */}
                {activeNote.content.quote && (
                  <blockquote className="border-l-2 border-primary pl-3 py-1 italic text-muted-foreground text-xs sm:text-sm bg-muted/30 rounded-r-xs">
                    &ldquo;{activeNote.content.quote}&rdquo;
                  </blockquote>
                )}
              </div>
            </div>

            {/* Bottom Sandbox Conversion Bar */}
            <div
              className={cn(
                "flex flex-col sm:flex-row items-center justify-between gap-3 p-4 px-6 border-t border-border text-xs",
                sandboxTheme === "dark"
                  ? "bg-[#111723]/90"
                  : "bg-muted/30"
              )}
            >
              <div className="flex items-center gap-2 text-muted-foreground text-center sm:text-left">
                <span className="size-2 rounded-full bg-amber-500 shrink-0" />
                <span>
                  Guest sandbox changes are stored locally in memory.
                </span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <Link
                  href="/signup"
                  className={cn(
                    buttonVariants({ size: "sm" }),
                    "font-medium gap-1.5 whitespace-nowrap"
                  )}
                >
                  <span>Create Account & Save</span>
                  <ArrowRight className="size-3.5" />
                </Link>
                <Link
                  href="/login"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" }),
                    "whitespace-nowrap"
                  )}
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuestDashboardPreview;
