import { notFound } from "next/navigation"

import { NoteEditor } from "@/components/note-editor"
import { PageWrapper } from "@/components/page-wrapper"
import { getNoteById } from "@/server/notes"

export const instant = false

type Params = Promise<{
  notebookId: string
  noteId: string
}>

export default async function NotePage({ params }: { params: Params }) {
  const { notebookId, noteId } = await params

  const result = await getNoteById(noteId)

  if (!result.success) {
    return notFound()
  }

  const note = result.note

  return (
    <PageWrapper
      breadcrumbs={[
        { label: "Dashboard", href: "/dashboard" },
        {
          label: note.notebook.name,
          href: `/dashboard/notebook/${notebookId}`,
        },
        {
          label: note.title,
          href: `/dashboard/notebook/${notebookId}/note/${noteId}`,
        },
      ]}
    >
      <NoteEditor note={note} />
    </PageWrapper>
  )
}
