import * as React from "react";
import Link from "next/link";
import { BookOpen } from "lucide-react";

import { SearchForm } from "@/components/search-form";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { getNotebooks } from "@/server/notebooks";
import { SidebarData } from "./sidebar-data";

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const res = await getNotebooks();
  const notebooks = res.notebooks ?? [];

  const data = {
    navMain: notebooks.map((notebook) => ({
      id: notebook.id,
      title: notebook.name,
      url: `/dashboard/notebook/${notebook.id}`,
      items: (notebook.notes ?? []).map((note) => ({
        id: note.id,
        title: note.title,
        url: `/dashboard/notebook/${notebook.id}/note/${note.id}`,
      })),
    })),
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Link href="/dashboard" className="flex items-center gap-2 pl-2">
          <span className="flex size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <BookOpen className="size-4" />
          </span>
          <h2 className="font-semibold">Notebook</h2>
        </Link>

        <React.Suspense>
          <SearchForm />
        </React.Suspense>
      </SidebarHeader>
      <SidebarContent className="gap-0">
        <SidebarData data={data} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
