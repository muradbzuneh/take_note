"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronsUpDown,
  LogOut,
  Moon,
  Settings,
  Sun,
  User,
} from "lucide-react";
import { useTheme } from "next-themes";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";

interface SidebarUserProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;
}

export function SidebarUser({ user }: SidebarUserProps) {
  const router = useRouter();
  const { isMobile } = useSidebar();
  const { theme, setTheme } = useTheme();

  const handleLogout = async () => {
    try {
      const { error } = await authClient.signOut();
      if (error) {
        toast.error(error.message ?? "Failed to log out");
        return;
      }
      toast.success("Signed out successfully");
      router.push("/login");
      router.refresh();
    } catch {
      toast.error("Failed to log out");
    }
  };

  const displayName = user?.name || "My Account";
  const displayEmail = user?.email || "";
  const initials = displayName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "U";

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-medium text-xs">
                {user?.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.image}
                    alt={displayName}
                    className="size-8 rounded-lg object-cover"
                  />
                ) : (
                  initials
                )}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{displayName}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {displayEmail}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-medium text-xs">
                  {initials}
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{displayName}</span>
                  <span className="truncate text-xs text-muted-foreground">
                    {displayEmail}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings" className="flex items-center">
                  <Settings className="mr-2 size-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? (
                  <Sun className="mr-2 size-4" />
                ) : (
                  <Moon className="mr-2 size-4" />
                )}
                <span>Toggle {theme === "dark" ? "Light" : "Dark"} mode</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 size-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
