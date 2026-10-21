import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "./ui/sidebar";
import { Logout } from "./logout";
import { ModeToggle } from "./menu-toggle";
import { Fragment } from "react";

interface PageWrapperProps {
  children: React.ReactNode;
  breadcrumbs: {
    label: string;
    href: string;
  }[];
}

export function PageWrapper({ children, breadcrumbs }: PageWrapperProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="flex h-12 items-center px-4 md:px-6 border-b border-border bg-background shrink-0">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="size-7" />

            <Breadcrumb>
              <BreadcrumbList className="text-xs">
                {breadcrumbs.map((breadcrumb, index) => (
                  <Fragment key={breadcrumb.label}>
                    <BreadcrumbItem>
                      <BreadcrumbLink
                        href={breadcrumb.href}
                        className={
                          index === breadcrumbs.length - 1
                            ? "font-medium text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        }
                      >
                        {breadcrumb.label}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    {index !== breadcrumbs.length - 1 && (
                      <BreadcrumbSeparator className="text-muted-foreground/40" />
                    )}
                  </Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="flex items-center gap-2">
            <ModeToggle />
            <Logout />
          </div>
        </div>
      </header>

      <main className="flex-1 p-6 md:p-8 max-w-6xl w-full mx-auto">{children}</main>
    </div>
  );
}
