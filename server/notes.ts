"use server"

import { and, eq } from "drizzle-orm"
import { headers } from "next/headers"
import { revalidatePath } from "next/cache"

import { db } from "@/db"
import { notebooks, notes } from "@/db/schema"
import { auth } from "@/lib/auth"

const getUserId = async () => {
  const session = await auth.api.getSession({ headers: await headers() })
  return session?.user?.id ?? null
}

const getOwnedNotebook = async (notebookId: string, userId: string) =>
  db.query.notebooks.findFirst({
    where: and(eq(notebooks.id, notebookId), eq(notebooks.userId, userId)),
    columns: { id: true },
  })

const getOwnedNote = async (id: string, userId: string) => {
  const note = await db.query.notes.findFirst({
    where: eq(notes.id, id),
    with: { notebook: true },
  })

  if (!note || note.notebook.userId !== userId) {
    return null
  }

  return note
}

export const createNote = async (input: {
  title: string
  content?: unknown
  notebookId: string
}) => {
  const userId = await getUserId()
  if (!userId) {
    return { success: false as const, message: "You must be signed in" }
  }

  const title = input.title?.trim()
  if (!title) {
    return { success: false as const, message: "Title is required" }
  }

  try {
    const notebook = await getOwnedNotebook(input.notebookId, userId)
    if (!notebook) {
      return { success: false as const, message: "Notebook not found" }
    }

    const [note] = await db
      .insert(notes)
      .values({
        title,
        content: (input.content as Record<string, unknown>) ?? {},
        notebookId: input.notebookId,
      })
      .returning()

    revalidatePath("/dashboard")
    revalidatePath(`/dashboard/notebook/${input.notebookId}`)
    return { success: true as const, message: "Note created", note }
  } catch {
    return { success: false as const, message: "Failed to create note" }
  }
}

export const getNoteById = async (id: string) => {
  const userId = await getUserId()
  if (!userId) {
    return { success: false as const, message: "You must be signed in" }
  }

  try {
    const note = await getOwnedNote(id, userId)
    if (!note) {
      return { success: false as const, message: "Note not found" }
    }

    return { success: true as const, note }
  } catch {
    return { success: false as const, message: "Failed to get note" }
  }
}

export const updateNote = async (
  id: string,
  input: { title?: string; content?: unknown },
) => {
  const userId = await getUserId()
  if (!userId) {
    return { success: false as const, message: "You must be signed in" }
  }

  const title = input.title?.trim()
  if (input.title !== undefined && !title) {
    return { success: false as const, message: "Title is required" }
  }

  try {
    const existing = await getOwnedNote(id, userId)
    if (!existing) {
      return { success: false as const, message: "Note not found" }
    }

    const [note] = await db
      .update(notes)
      .set({
        ...(title !== undefined ? { title } : {}),
        ...(input.content !== undefined
          ? { content: input.content as Record<string, unknown> }
          : {}),
      })
      .where(eq(notes.id, id))
      .returning()

    revalidatePath("/dashboard")
    revalidatePath(`/dashboard/notebook/${existing.notebookId}`)
    revalidatePath(`/dashboard/notebook/${existing.notebookId}/note/${id}`)
    return { success: true as const, message: "Note updated", note }
  } catch {
    return { success: false as const, message: "Failed to update note" }
  }
}

export const deleteNote = async (id: string) => {
  const userId = await getUserId()
  if (!userId) {
    return { success: false as const, message: "You must be signed in" }
  }

  try {
    const existing = await getOwnedNote(id, userId)
    if (!existing) {
      return { success: false as const, message: "Note not found" }
    }

    await db.delete(notes).where(eq(notes.id, id))

    revalidatePath("/dashboard")
    revalidatePath(`/dashboard/notebook/${existing.notebookId}`)
    return { success: true as const, message: "Note deleted" }
  } catch {
    return { success: false as const, message: "Failed to delete note" }
  }
}
