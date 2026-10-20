"use client";

import { useState, useTransition, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, Save, Trash2, ArrowLeft, Check, Clock } from "lucide-react";
import { toast } from "sonner";
import type { JSONContent } from "@tiptap/react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Note } from "@/db/schema";
import { deleteNote, updateNote } from "@/server/notes";
import { RichTextEditor } from "@/components/rich-text-editor";
import { cn } from "@/lib/utils";

// Normalizes note content to valid Tiptap JSONContent
function parseNoteContent(raw: unknown): JSONContent {
  if (raw && typeof raw === "object") {
    // If it's already a Tiptap document
    if ("type" in raw && (raw as { type: string }).type === "doc") {
      return raw as JSONContent;
    }
    // If it was stored as legacy { text: string }
    if ("text" in raw && typeof (raw as { text: unknown }).text === "string") {
      const text = (raw as { text: string }).text;
      if (!text.trim()) {
        return { type: "doc", content: [{ type: "paragraph" }] };
      }
      return {
        type: "doc",
        content: text.split("\n").map((line) => ({
          type: "paragraph",
          content: line ? [{ type: "text", text: line }] : [],
        })),
      };
    }
  }

  return {
    type: "doc",
    content: [{ type: "paragraph" }],
  };
}

export function NoteEditor({ note }: { note: Note }) {
  const router = useRouter();
  const [title, setTitle] = useState(note.title);
  
  const initialContent = useMemo(() => parseNoteContent(note.content), [note.content]);
  const [content, setContent] = useState<JSONContent>(initialContent);
  
  const [isPending, startTransition] = useTransition();
  const [isDirty, setIsDirty] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(new Date(note.updatedAt));
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    setIsDirty(true);
  };

  const handleContentChange = useCallback((newContent: JSONContent) => {
    setContent(newContent);
    setIsDirty(true);
  }, []);

  const handleSave = useCallback(() => {
    if (!title.trim()) {
      toast.error("Note title cannot be empty");
      return;
    }

    startTransition(async () => {
      const result = await updateNote(note.id, {
        title: title.trim(),
        content: content as Record<string, unknown>,
      });

      if (result.success) {
        toast.success("Note saved");
        setIsDirty(false);
        setLastSaved(new Date());
        router.refresh();
      } else {
        toast.error(result.message);
      }
    });
  }, [note.id, title, content, router]);

  // Keyboard shortcut Ctrl+S / Cmd+S
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        handleSave();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleSave]);

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteNote(note.id);

      if (result.success) {
        toast.success("Note deleted");
        setShowDeleteConfirm(false);
        router.push(`/dashboard/notebook/${note.notebookId}`);
        router.refresh();
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <>
      <div className="space-y-4 max-w-5xl mx-auto">
        {/* Note Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b">
          <div className="flex items-center gap-3 flex-1 min-w-[280px]">
            <Link
              href={`/dashboard/notebook/${note.notebookId}`}
              className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "shrink-0")}
              title="Back to notebook"
            >
              <ArrowLeft className="size-4" />
              <span className="sr-only">Back to notebook</span>
            </Link>

            <Input
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Untitled Note"
              className="text-xl font-bold tracking-tight h-10 border-transparent hover:border-input focus:border-input px-2 shadow-none"
            />
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Status indicator */}
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground mr-1">
              {isPending ? (
                <>
                  <Loader2 className="size-3 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : isDirty ? (
                <>
                  <Clock className="size-3 text-amber-500" />
                  <span className="text-amber-500">Unsaved changes</span>
                </>
              ) : lastSaved ? (
                <>
                  <Check className="size-3 text-emerald-500" />
                  <span>Saved</span>
                </>
              ) : null}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDeleteConfirm(true)}
              disabled={isPending}
            >
              <Trash2 className="size-3.5 mr-1 text-destructive" />
              <span className="hidden sm:inline">Delete</span>
            </Button>

            <Button
              size="sm"
              onClick={handleSave}
              disabled={isPending || !title.trim()}
              className="gap-1.5"
            >
              {isPending ? (
                <Loader2 className="size-3.5 animate-spin" />
              ) : (
                <Save className="size-3.5" />
              )}
              <span>Save</span>
              <kbd className="hidden md:inline-flex text-[10px] opacity-60 ml-0.5 px-1 py-0.5 rounded bg-primary-foreground/20">
                ⌘S
              </kbd>
            </Button>
          </div>
        </div>

        {/* Tiptap Rich Text Editor */}
        <div className="pt-2">
          <RichTextEditor
            initialContent={initialContent}
            onChange={handleContentChange}
          />
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Note</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{note.title || "this note"}&quot;? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteConfirm(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isPending}
            >
              {isPending ? <Loader2 className="size-4 animate-spin" /> : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default NoteEditor;
