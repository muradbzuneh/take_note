"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { FileText, MoreVertical, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
          className="block h-full"
        >
          <Card className="h-full transition-all duration-200 hover:shadow-md hover:border-primary/40 group-hover:bg-muted/40">
            <CardHeader className="p-5">
              <div className="flex items-start justify-between gap-2">
                <div className="size-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0">
                  <FileText className="size-4" />
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
                      className="size-7 p-0 opacity-70 group-hover:opacity-100 hover:bg-muted"
                    >
                      <MoreVertical className="size-4" />
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

              <CardTitle className="truncate mt-3 text-base font-semibold">
                {note.title || "Untitled Note"}
              </CardTitle>
              <CardDescription className="text-xs">
                Updated {new Date(note.updatedAt).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>

      <Dialog open={showDelete} onOpenChange={setShowDelete}>
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
              onClick={() => setShowDelete(false)}
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
