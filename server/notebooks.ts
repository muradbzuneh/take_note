"use server"

import { and, eq } from "drizzle-orm"
import { headers } from "next/headers"
import { revalidatePath } from "next/cache"

import { db } from "@/db"
import { notebooks } from "@/db/schema"
import { auth } from "@/lib/auth"

const getUserId = async () => {
  const session = await auth.api.getSession({ headers: await headers() })
  return session?.user?.id ?? null
}

export const createNotebook = async (input: { name: string }) => {
  const userId = await getUserId()
  if (!userId) {
    return { success: false as const, message: "You must be signed in" }
  }

  const name = input.name?.trim()
  if (!name) {
    return { success: false as const, message: "Name is required" }
  }

  try {
    const [notebook] = await db
      .insert(notebooks)
      .values({ name, userId })
      .returning()

    revalidatePath("/dashboard")
    return { success: true as const, message: "Notebook created", notebook }
  } catch {
    return { success: false as const, message: "Failed to create notebook" }
  }
}

export const getNotebooks = async () => {
  const userId = await getUserId()
  if (!userId) {
    return {
      success: false as const,
      message: "You must be signed in",
      notebooks: [],
    }
  }

  try {
    const data = await db.query.notebooks.findMany({
      where: eq(notebooks.userId, userId),
      with: {
        notes: {
          orderBy: (notes, { desc }) => [desc(notes.updatedAt)],
        },
      },
      orderBy: (notebooks, { desc }) => [desc(notebooks.updatedAt)],
    })

    return { success: true as const, notebooks: data }
  } catch {
    return {
      success: false as const,
      message: "Failed to get notebooks",
      notebooks: [],
    }
  }
}

export const getNotebookById = async (id: string) => {
  const userId = await getUserId()
  if (!userId) {
    return { success: false as const, message: "You must be signed in" }
  }

  try {
    const notebook = await db.query.notebooks.findFirst({
      where: and(eq(notebooks.id, id), eq(notebooks.userId, userId)),
      with: {
        notes: {
          orderBy: (notes, { desc }) => [desc(notes.updatedAt)],
        },
      },
    })

    if (!notebook) {
      return { success: false as const, message: "Notebook not found" }
    }

    return { success: true as const, notebook }
  } catch {
    return { success: false as const, message: "Failed to get notebook" }
  }
}

export const updateNotebook = async (id: string, input: { name: string }) => {
  const userId = await getUserId()
  if (!userId) {
    return { success: false as const, message: "You must be signed in" }
  }

  const name = input.name?.trim()
  if (!name) {
    return { success: false as const, message: "Name is required" }
  }

  try {
    const [notebook] = await db
      .update(notebooks)
      .set({ name })
      .where(and(eq(notebooks.id, id), eq(notebooks.userId, userId)))
      .returning()

    if (!notebook) {
      return { success: false as const, message: "Notebook not found" }
    }

    revalidatePath("/dashboard")
    revalidatePath(`/dashboard/notebook/${id}`)
    return { success: true as const, message: "Notebook updated", notebook }
  } catch {
    return { success: false as const, message: "Failed to update notebook" }
  }
}

export const deleteNotebook = async (id: string) => {
  const userId = await getUserId()
  if (!userId) {
    return { success: false as const, message: "You must be signed in" }
  }

  try {
    const [notebook] = await db
      .delete(notebooks)
      .where(and(eq(notebooks.id, id), eq(notebooks.userId, userId)))
      .returning()

    if (!notebook) {
      return { success: false as const, message: "Notebook not found" }
    }

    revalidatePath("/dashboard")
    return { success: true as const, message: "Notebook deleted" }
  } catch {
    return { success: false as const, message: "Failed to delete notebook" }
  }
}
