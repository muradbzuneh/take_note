"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, MoreVertical, Pencil, Trash2, Loader2, ArrowRight } from "lucide-react";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { deleteNotebook, updateNotebook } from "@/server/notebooks";

export type NotebookListItem = {
  id: string;
  name: string;
  notes: { id: string }[];
  updatedAt?: Date | string;
};

export function Notebooks({ notebooks }: { notebooks: NotebookListItem[] }) {
  const router = useRouter();
  const [editingNotebook, setEditingNotebook] = useState<NotebookListItem | null>(null);
  const [deletingNotebook, setDeletingNotebook] = useState<NotebookListItem | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleOpenRename = (notebook: NotebookListItem, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setEditingNotebook(notebook);
    setRenameValue(notebook.name);
  };

  const handleOpenDelete = (notebook: NotebookListItem, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDeletingNotebook(notebook);
  };

  const handleConfirmRename = () => {
    if (!editingNotebook || !renameValue.trim()) return;

    startTransition(async () => {
      const res = await updateNotebook(editingNotebook.id, { name: renameValue });
      if (res.success) {
        toast.success("Notebook renamed");
        setEditingNotebook(null);
        router.refresh();
      } else {
        toast.error(res.message);
      }
    });
  };

  const handleConfirmDelete = () => {
    if (!deletingNotebook) return;

    startTransition(async () => {
      const res = await deleteNotebook(deletingNotebook.id);
      if (res.success) {
        toast.success("Notebook deleted");
        setDeletingNotebook(null);
        router.refresh();
      } else {
        toast.error(res.message);
      }
    });
  };

  if (notebooks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-md border border-border p-12 text-center bg-card">
        <div className="size-9 rounded-md bg-muted text-muted-foreground flex items-center justify-center mb-3">
          <BookOpen className="size-4" />
        </div>
        <p className="text-sm font-medium text-foreground">No notebooks yet</p>
        <p className="text-xs text-muted-foreground mt-1 max-w-sm">
          Create a notebook to organize your documentation, research, and notes.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {notebooks.map((notebook) => (
          <div key={notebook.id} className="relative group">
            <Link
              href={`/dashboard/notebook/${notebook.id}`}
              className="flex flex-col justify-between h-32 p-4 rounded-md border border-border bg-card hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="size-7 rounded-sm bg-muted text-primary flex items-center justify-center shrink-0">
                    <BookOpen className="size-3.5" />
                  </div>
                  <h3 className="font-medium text-sm text-foreground truncate group-hover:text-primary transition-colors">
                    {notebook.name}
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
                    <DropdownMenuItem onClick={(e) => handleOpenRename(notebook, e)}>
                      <Pencil className="mr-2 size-3.5" />
                      Rename
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive"
                      onClick={(e) => handleOpenDelete(notebook, e)}
                    >
                      <Trash2 className="mr-2 size-3.5" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border/50">
                <span className="px-1.5 py-0.5 rounded-xs bg-muted text-[11px] font-medium">
                  {notebook.notes.length} {notebook.notes.length === 1 ? "note" : "notes"}
                </span>

                <span className="flex items-center gap-1 text-[11px] group-hover:text-foreground transition-colors">
                  Open <ArrowRight className="size-3" />
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Rename Dialog */}
      <Dialog
        open={!!editingNotebook}
        onOpenChange={(open) => !open && setEditingNotebook(null)}
      >
        <DialogContent className="rounded-md sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base font-semibold">Rename Notebook</DialogTitle>
            <DialogDescription className="text-xs">
              Enter a new name for this notebook.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="rename-input" className="text-xs">Notebook Name</Label>
              <Input
                id="rename-input"
                value={renameValue}
                onChange={(e) => setRenameValue(e.target.value)}
                placeholder="Notebook Name"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleConfirmRename();
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setEditingNotebook(null)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleConfirmRename}
              disabled={isPending || !renameValue.trim()}
            >
              {isPending ? (
                <Loader2 className="size-3.5 animate-spin mr-1.5" />
              ) : null}
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog
        open={!!deletingNotebook}
        onOpenChange={(open) => !open && setDeletingNotebook(null)}
      >
        <DialogContent className="rounded-md sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base font-semibold">Delete Notebook</DialogTitle>
            <DialogDescription className="text-xs">
              Are you sure you want to delete &quot;{deletingNotebook?.name}&quot;? All notes inside will be permanently deleted.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDeletingNotebook(null)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleConfirmDelete}
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 className="size-3.5 animate-spin mr-1.5" />
              ) : null}
              Delete Notebook
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
