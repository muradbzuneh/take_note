"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  ChevronRight,
  File,
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

  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>Workspace</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.url}>
                <SidebarMenuButton asChild isActive={pathname === item.url}>
                  <Link href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarGroupLabel>Notebooks</SidebarGroupLabel>
        <CreateNotebookButton>
          <SidebarGroupAction title="Create Notebook">
            <Plus className="size-4" />
            <span className="sr-only">Create Notebook</span>
          </SidebarGroupAction>
        </CreateNotebookButton>
        <SidebarGroupContent>
          <SidebarMenu>
            {filteredData.map((notebook) => {
              const isNotebookActive = pathname === notebook.url;

              return (
                <Collapsible
                  key={notebook.url}
                  defaultOpen
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        isActive={isNotebookActive}
                        tooltip={notebook.title}
                      >
                        <BookOpen className="size-4" />
                        <span className="truncate">{notebook.title}</span>
                        <ChevronRight className="ml-auto size-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton
                            asChild
                            isActive={isNotebookActive}
                          >
                            <Link href={notebook.url}>
                              <span>All Notes</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>

                        {notebook.items.map((note) => (
                          <SidebarMenuSubItem key={note.url}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={pathname === note.url}
                            >
                              <Link href={note.url}>
                                <File className="size-3.5" />
                                <span className="truncate">{note.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}

                        {notebook.id && (
                          <SidebarMenuSubItem>
                            <CreateNoteButton notebookId={notebook.id}>
                              <button
                                type="button"
                                className="flex h-7 w-full items-center gap-2 rounded-md px-2 text-xs text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                              >
                                <Plus className="size-3.5" />
                                <span>New Note</span>
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
            <div className="px-3 py-2 text-xs text-muted-foreground">
              {query ? "No notes matching your search." : "No notebooks yet."}
            </div>
          )}
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  );
}
