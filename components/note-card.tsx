"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { FileText, MoreVertical, Trash2, Loader2, ArrowRight } from "lucide-react";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Note } from "@/db/schema";
import { deleteNote } from "@/server/notes";

type NoteCardProps = {
  note: Pick<Note, "id" | "title" | "updatedAt" | "notebookId">;
};

export default function NoteCard({ note }: NoteCardProps) {
  const router = useRouter();
  const [showDelete, setShowDelete] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const res = await deleteNote(note.id);
      if (res.success) {
        toast.success("Note deleted");
        setShowDelete(false);
        router.refresh();
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <>
      <div className="relative group">
        <Link
          href={`/dashboard/notebook/${note.notebookId}/note/${note.id}`}
          className="flex flex-col justify-between h-32 p-4 rounded-md border border-border bg-card hover:border-primary/50 transition-colors"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="size-7 rounded-sm bg-muted text-primary flex items-center justify-center shrink-0">
                <FileText className="size-3.5" />
              </div>
              <h3 className="font-medium text-sm text-foreground truncate group-hover:text-primary transition-colors">
                {note.title || "Untitled Note"}
              </h3>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger
                asChild
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-6 p-0 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground transition-opacity"
                >
                  <MoreVertical className="size-3.5" />
                  <span className="sr-only">Actions</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowDelete(true);
                  }}
                >
                  <Trash2 className="mr-2 size-3.5" />
                  Delete Note
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border/50">
            <span className="text-[11px]">
              {new Date(note.updatedAt).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
              })}
            </span>

            <span className="flex items-center gap-1 text-[11px] group-hover:text-foreground transition-colors">
              Open <ArrowRight className="size-3" />
            </span>
          </div>
        </Link>
      </div>

      <Dialog open={showDelete} onOpenChange={setShowDelete}>
        <DialogContent className="rounded-md sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base font-semibold">Delete Note</DialogTitle>
            <DialogDescription className="text-xs">
              Are you sure you want to delete &quot;{note.title}&quot;? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDelete(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDelete}
              disabled={isPending}
            >
              {isPending ? <Loader2 className="size-3.5 animate-spin mr-1.5" /> : null}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
