import * as React from "react";
import Link from "next/link";
import { headers } from "next/headers";

import { LogoIcon } from "@/components/logo";
import { SearchForm } from "@/components/search-form";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { getNotebooks } from "@/server/notebooks";
import { auth } from "@/lib/auth";
import { SidebarData } from "./sidebar-data";
import { SidebarUser } from "./sidebar-user";

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const [res, session] = await Promise.all([
    getNotebooks(),
    auth.api.getSession({ headers: await headers() }),
  ]);

  const notebooks = res.notebooks ?? [];
  const user = session?.user ?? null;

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
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="border-b border-sidebar-border pb-2.5">
        <Link
          href="/dashboard"
          className="flex items-center gap-2.5 px-2 py-1.5 rounded-md hover:bg-sidebar-accent transition-colors"
        >
          <LogoIcon className="size-7" />
          <div className="flex flex-col">
            <span className="font-bold text-sm leading-none flex items-center gap-1">
              <span>Note</span>
              <span className="text-primary">book</span>
            </span>
            <span className="text-[11px] text-muted-foreground mt-0.5">Workspace</span>
          </div>
        </Link>

        <div className="mt-1">
          <React.Suspense>
            <SearchForm />
          </React.Suspense>
        </div>
      </SidebarHeader>

      <SidebarContent className="gap-0">
        <SidebarData data={data} />
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-2">
        <SidebarUser user={user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
