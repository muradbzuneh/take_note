import { notFound } from "next/navigation";

import { CreateNoteButton } from "@/components/create-note-button";
import NoteCard from "@/components/note-card";
import { PageWrapper } from "@/components/page-wrapper";
import { NotebookActions } from "@/components/notebook-actions";
import { getNotebookById } from "@/server/notebooks";
import { FileText } from "lucide-react";

export const instant = false;

type Params = Promise<{
  notebookId: string;
}>;

export default async function NotebookPage({ params }: { params: Params }) {
  const { notebookId } = await params;

  const result = await getNotebookById(notebookId);

  if (!result.success || !result.notebook) {
    return notFound();
  }

  const notebook = result.notebook;

  return (
    <PageWrapper
      breadcrumbs={[
        { label: "Dashboard", href: "/dashboard" },
        { label: notebook.name, href: `/dashboard/notebook/${notebookId}` },
      ]}
    >
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border/80">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            {notebook.name}
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            {notebook.notes.length}{" "}
            {notebook.notes.length === 1 ? "document" : "documents"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <NotebookActions notebookId={notebookId} notebookName={notebook.name} />
          <CreateNoteButton notebookId={notebookId} />
        </div>
      </div>

      {notebook.notes.length === 0 ? (
        <div className="rounded-md border border-border p-12 text-center mt-6 bg-card">
          <div className="size-9 rounded-md bg-muted text-muted-foreground flex items-center justify-center mx-auto mb-3">
            <FileText className="size-4" />
          </div>
          <p className="text-sm font-medium text-foreground">No notes in this notebook</p>
          <p className="text-xs text-muted-foreground mt-1 mb-4">
            Start writing notes and structuring your documents.
          </p>
          <CreateNoteButton notebookId={notebookId} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mt-6">
          {notebook.notes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      )}
    </PageWrapper>
  );
}
