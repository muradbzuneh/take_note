import { CreateNotebookButton } from "@/components/create-notebook-button";
import { Notebooks } from "@/components/notebooks";
import { PageWrapper } from "@/components/page-wrapper";
import { getNotebooks } from "@/server/notebooks";

export const instant = false;

export default async function DashboardPage() {
  const result = await getNotebooks();

  return (
    <PageWrapper breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }]}>
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border/80">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">Notebooks</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Organized workspaces and personal documents
          </p>
        </div>
        <CreateNotebookButton />
      </div>

      <div className="pt-6">
        {result.success ? (
          <Notebooks notebooks={result.notebooks} />
        ) : (
          <p className="text-sm text-destructive">{result.message}</p>
        )}
      </div>
    </PageWrapper>
  );
}
