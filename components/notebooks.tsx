"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, MoreVertical, Pencil, Trash2, Loader2 } from "lucide-react";
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
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed p-10 text-center">
        <BookOpen className="mb-3 size-8 text-muted-foreground" />
        <p className="font-medium">No notebooks yet</p>
        <p className="text-sm text-muted-foreground">
          Create your first notebook to start writing notes.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {notebooks.map((notebook) => (
          <div key={notebook.id} className="relative group">
            <Link
              href={`/dashboard/notebook/${notebook.id}`}
              className="block h-full"
            >
              <Card className="h-full transition-all duration-200 hover:shadow-md hover:border-primary/40 group-hover:bg-muted/40">
                <CardHeader className="p-5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <BookOpen className="size-4" />
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

                  <CardTitle className="truncate mt-3 text-base font-semibold">
                    {notebook.name}
                  </CardTitle>
                  <CardDescription className="text-xs">
                    {notebook.notes.length}{" "}
                    {notebook.notes.length === 1 ? "note" : "notes"}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        ))}
      </div>

      {/* Rename Dialog */}
      <Dialog
        open={!!editingNotebook}
        onOpenChange={(open) => !open && setEditingNotebook(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename Notebook</DialogTitle>
            <DialogDescription>
              Enter a new name for this notebook.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="rename-input">Notebook Name</Label>
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
              onClick={() => setEditingNotebook(null)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmRename}
              disabled={isPending || !renameValue.trim()}
            >
              {isPending ? <Loader2 className="size-4 animate-spin" /> : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog
        open={!!deletingNotebook}
        onOpenChange={(open) => !open && setDeletingNotebook(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Notebook</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{deletingNotebook?.name}&quot;? All notes inside it will also be permanently deleted.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeletingNotebook(null)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmDelete}
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
