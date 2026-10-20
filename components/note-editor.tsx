"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save, Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
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

const getText = (content: unknown) => {
  if (content && typeof content === "object" && "text" in content) {
    const text = (content as { text?: unknown }).text;
    return typeof text === "string" ? text : "";
  }
  return "";
};

export function NoteEditor({ note }: { note: Note }) {
  const router = useRouter();
  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(getText(note.content));
  const [isPending, startTransition] = useTransition();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleSave = () => {
    startTransition(async () => {
      const result = await updateNote(note.id, { title, content: { text } });

      if (result.success) {
        toast.success("Note saved");
        router.refresh();
      } else {
        toast.error(result.message);
      }
    });
  };

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
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b">
          <div className="flex items-center gap-3 flex-1 max-w-xl">
            <Link
              href={`/dashboard/notebook/${note.notebookId}`}
              className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "shrink-0")}
            >
              <ArrowLeft className="size-4" />
              <span className="sr-only">Back to notebook</span>
            </Link>
            <Input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              aria-label="Note title"
              placeholder="Note title..."
              className="text-lg font-semibold h-10 border-transparent hover:border-input focus:border-input"
            />
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setShowDeleteConfirm(true)}
              disabled={isPending}
            >
              <Trash2 className="size-4 mr-1 text-destructive" />
              Delete
            </Button>
            <Button
              onClick={handleSave}
              disabled={isPending || !title.trim()}
            >
              {isPending ? (
                <Loader2 className="size-4 animate-spin mr-1" />
              ) : (
                <Save className="size-4 mr-1" />
              )}
              Save
            </Button>
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="note-content" className="sr-only">
            Content
          </Label>
          <textarea
            id="note-content"
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Start typing your note here..."
            className="min-h-[500px] w-full resize-y rounded-xl border bg-transparent p-5 text-sm leading-relaxed outline-none focus-visible:ring-1 focus-visible:ring-ring font-sans"
          />
        </div>
      </div>

      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Note</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{note.title}&quot;? This action cannot be undone.
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
