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
      <SidebarHeader className="border-b border-sidebar-border/50 pb-3">
        <Link
          href="/dashboard"
          className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-sidebar-accent transition-colors"
        >
          <LogoIcon className="size-8" />
          <div className="flex flex-col">
            <span className="font-bold text-sm leading-none flex items-center gap-1.5">
              <span>Note</span>
              <span className="text-emerald-600 dark:text-emerald-400">book</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                Pro
              </span>
            </span>
            <span className="text-xs text-muted-foreground mt-0.5">Workspace</span>
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

      <SidebarFooter className="border-t border-sidebar-border/50 p-2">
        <SidebarUser user={user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
