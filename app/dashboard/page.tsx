import { CreateNotebookButton } from "@/components/create-notebook-button"
import { Notebooks } from "@/components/notebooks"
import { PageWrapper } from "@/components/page-wrapper"
import { getNotebooks } from "@/server/notebooks"

export const instant = false

export default async function DashboardPage() {
  const result = await getNotebooks()

  return (
    <PageWrapper breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }]}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Notebooks</h1>
          <p className="text-muted-foreground">
            Your notebooks and notes, all in one place.
          </p>
        </div>
        <CreateNotebookButton />
      </div>

      {result.success ? (
        <Notebooks notebooks={result.notebooks} />
      ) : (
        <p className="text-sm text-destructive">{result.message}</p>
      )}
    </PageWrapper>
  )
}
