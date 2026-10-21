"use client";

import { Search } from "lucide-react";

import { Label } from "@/components/ui/label";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarInput,
} from "@/components/ui/sidebar";
import { useQueryState } from "nuqs";

export function SearchForm({ ...props }: React.ComponentProps<"form">) {
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });

  return (
    <form {...props}>
      <SidebarGroup className="py-0">
        <SidebarGroupContent className="relative">
          <Label htmlFor="search" className="sr-only">
            Search
          </Label>
          <SidebarInput
            id="search"
            placeholder="Search notes..."
            className="pl-8 h-8 text-xs rounded-md bg-background border-border"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 opacity-50 select-none text-muted-foreground" />
        </SidebarGroupContent>
      </SidebarGroup>
    </form>
  );
}
