import { notFound } from "next/navigation";

import { CreateNoteButton } from "@/components/create-note-button";
import NoteCard from "@/components/note-card";
import { PageWrapper } from "@/components/page-wrapper";
import { NotebookActions } from "@/components/notebook-actions";
import { getNotebookById } from "@/server/notebooks";

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
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            {notebook.name}
          </h1>
          <p className="text-muted-foreground text-sm">
            {notebook.notes.length}{" "}
            {notebook.notes.length === 1 ? "note" : "notes"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <NotebookActions notebookId={notebookId} notebookName={notebook.name} />
          <CreateNoteButton notebookId={notebookId} />
        </div>
      </div>

      {notebook.notes.length === 0 ? (
        <div className="rounded-xl border border-dashed p-12 text-center mt-4">
          <p className="font-medium">No notes yet</p>
          <p className="text-sm text-muted-foreground mt-1 mb-4">
            Create your first note in this notebook.
          </p>
          <CreateNoteButton notebookId={notebookId} />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-2">
          {notebook.notes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      )}
    </PageWrapper>
  );
}
