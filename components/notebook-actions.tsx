"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { MoreVertical, Pencil, Trash2, Loader2 } from "lucide-react";
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

interface NotebookActionsProps {
  notebookId: string;
  notebookName: string;
}

export function NotebookActions({ notebookId, notebookName }: NotebookActionsProps) {
  const router = useRouter();
  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [name, setName] = useState(notebookName);
  const [isPending, startTransition] = useTransition();

  const handleRename = () => {
    if (!name.trim()) return;

    startTransition(async () => {
      const res = await updateNotebook(notebookId, { name });
      if (res.success) {
        toast.success("Notebook renamed");
        setIsRenameOpen(false);
        router.refresh();
      } else {
        toast.error(res.message);
      }
    });
  };

  const handleDelete = () => {
    startTransition(async () => {
      const res = await deleteNotebook(notebookId);
      if (res.success) {
        toast.success("Notebook deleted");
        setIsDeleteOpen(false);
        router.push("/dashboard");
        router.refresh();
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="size-8">
            <MoreVertical className="size-3.5" />
            <span className="sr-only">Notebook settings</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="rounded-md">
          <DropdownMenuItem onClick={() => {
            setName(notebookName);
            setIsRenameOpen(true);
          }}>
            <Pencil className="mr-2 size-3.5" />
            Rename Notebook
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive focus:text-destructive"
            onClick={() => setIsDeleteOpen(true)}
          >
            <Trash2 className="mr-2 size-3.5" />
            Delete Notebook
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Rename Dialog */}
      <Dialog open={isRenameOpen} onOpenChange={setIsRenameOpen}>
        <DialogContent className="rounded-md sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base font-semibold">Rename Notebook</DialogTitle>
            <DialogDescription className="text-xs">
              Change the title of this notebook.
            </DialogDescription>
          </DialogHeader>
          <div className="py-2 space-y-1.5">
            <Label htmlFor="notebook-name" className="text-xs">Notebook Name</Label>
            <Input
              id="notebook-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") handleRename();
              }}
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsRenameOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button size="sm" onClick={handleRename} disabled={isPending || !name.trim()}>
              {isPending ? <Loader2 className="size-3.5 animate-spin mr-1.5" /> : null}
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="rounded-md sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base font-semibold">Delete Notebook</DialogTitle>
            <DialogDescription className="text-xs">
              Are you sure you want to delete &quot;{notebookName}&quot;? All notes inside this notebook will be permanently deleted.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsDeleteOpen(false)}
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
              Delete Notebook
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
