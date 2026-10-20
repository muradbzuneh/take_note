"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  ChevronRight,
  FileText,
  LayoutDashboard,
  Plus,
  Settings,
} from "lucide-react";
import { useQueryState } from "nuqs";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { CreateNotebookButton } from "@/components/create-notebook-button";
import { CreateNoteButton } from "@/components/create-note-button";

interface SidebarDataProps {
  data: {
    navMain: {
      id?: string;
      title: string;
      url: string;
      items: { id?: string; title: string; url: string }[];
    }[];
  };
}

const navItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
];

export function SidebarData({ data }: SidebarDataProps) {
  const pathname = usePathname();
  const [search] = useQueryState("search", { defaultValue: "" });
  const query = search.trim().toLowerCase();

  const filteredData = data.navMain
    .map((notebook) => ({
      ...notebook,
      items: notebook.items.filter((note) =>
        note.title.toLowerCase().includes(query)
      ),
    }))
    .filter(
      (notebook) =>
        !query ||
        notebook.title.toLowerCase().includes(query) ||
        notebook.items.length > 0
    );

  const totalNotes = data.navMain.reduce(
    (acc, nb) => acc + (nb.items?.length || 0),
    0
  );

  return (
    <div className="flex flex-col gap-1 py-1">
      <SidebarGroup className="py-1">
        <SidebarGroupLabel className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">
          Workspace
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {navItems.map((item) => {
              const isActive = pathname === item.url;
              return (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={isActive}>
                    <Link href={item.url}>
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <SidebarGroup className="py-1">
        <div className="flex items-center justify-between px-2">
          <SidebarGroupLabel className="text-xs font-semibold tracking-wider uppercase text-muted-foreground p-0">
            Notebooks ({data.navMain.length})
          </SidebarGroupLabel>
          <CreateNotebookButton>
            <button
              type="button"
              className="flex size-5 items-center justify-center rounded-sm text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
              title="Create Notebook"
            >
              <Plus className="size-3.5" />
              <span className="sr-only">Create Notebook</span>
            </button>
          </CreateNotebookButton>
        </div>

        <SidebarGroupContent className="mt-1">
          <SidebarMenu>
            {filteredData.map((notebook) => {
              const isNotebookExactActive = pathname === notebook.url;
              const isChildActive = pathname.startsWith(`${notebook.url}/note/`);
              const isNotebookActive = isNotebookExactActive || isChildActive;

              return (
                <Collapsible
                  key={notebook.url}
                  defaultOpen={isNotebookActive || true}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <div className="flex items-center w-full">
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          isActive={isNotebookExactActive}
                          tooltip={notebook.title}
                          className="flex-1 font-medium"
                        >
                          <ChevronRight className="size-3.5 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 shrink-0 text-muted-foreground" />
                          <BookOpen className="size-4 shrink-0 text-primary/80" />
                          <span className="truncate flex-1">{notebook.title}</span>
                          <span className="text-[11px] text-muted-foreground px-1.5 py-0.5 rounded-full bg-sidebar-accent">
                            {notebook.items.length}
                          </span>
                        </SidebarMenuButton>
                      </CollapsibleTrigger>

                      {notebook.id && (
                        <CreateNoteButton notebookId={notebook.id}>
                          <button
                            type="button"
                            title="New Note in this Notebook"
                            className="opacity-0 group-hover/collapsible:opacity-100 size-6 flex items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-opacity mr-1"
                          >
                            <Plus className="size-3.5" />
                          </button>
                        </CreateNoteButton>
                      )}
                    </div>

                    <CollapsibleContent>
                      <SidebarMenuSub className="mr-0 pr-0 border-l border-sidebar-border ml-3.5 pl-2">
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton
                            asChild
                            isActive={isNotebookExactActive}
                          >
                            <Link href={notebook.url} className="text-xs text-muted-foreground hover:text-foreground">
                              <span>All Notes ({notebook.items.length})</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>

                        {notebook.items.map((note) => (
                          <SidebarMenuSubItem key={note.url}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={pathname === note.url}
                            >
                              <Link href={note.url} title={note.title}>
                                <FileText className="size-3.5 shrink-0" />
                                <span className="truncate">{note.title || "Untitled"}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}

                        {notebook.id && (
                          <SidebarMenuSubItem>
                            <CreateNoteButton notebookId={notebook.id}>
                              <button
                                type="button"
                                className="flex h-7 w-full items-center gap-1.5 rounded-md px-2 text-xs text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                              >
                                <Plus className="size-3" />
                                <span>Add Note</span>
                              </button>
                            </CreateNoteButton>
                          </SidebarMenuSubItem>
                        )}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              );
            })}
          </SidebarMenu>

          {filteredData.length === 0 && (
            <div className="px-3 py-4 text-center">
              <p className="text-xs text-muted-foreground">
                {query ? "No notes matching search" : "No notebooks yet"}
              </p>
              {!query && (
                <div className="mt-2">
                  <CreateNotebookButton>
                    <button
                      type="button"
                      className="text-xs text-primary hover:underline inline-flex items-center gap-1"
                    >
                      <Plus className="size-3" />
                      Create one
                    </button>
                  </CreateNotebookButton>
                </div>
              )}
            </div>
          )}
        </SidebarGroupContent>
      </SidebarGroup>
    </div>
  );
}
