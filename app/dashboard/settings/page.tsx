import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { PageWrapper } from "@/components/page-wrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ModeToggle } from "@/components/menu-toggle";
import Logout from "@/components/logout";
import { User, Palette, Shield } from "lucide-react";

export default async function SettingsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;

  return (
    <PageWrapper
      breadcrumbs={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Settings", href: "/dashboard/settings" },
      ]}
    >
      <div className="max-w-3xl space-y-6">
        <div className="pb-4 border-b border-border/80">
          <h1 className="text-xl font-semibold tracking-tight text-foreground">Settings</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage your account settings, workspace preferences, and security.
          </p>
        </div>

        <div className="grid gap-5">
          {/* User Profile Card */}
          <Card className="rounded-md border border-border">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <User className="size-4 text-primary" />
                <CardTitle className="text-sm font-semibold">Profile Information</CardTitle>
              </div>
              <CardDescription className="text-xs">
                Your personal account details.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-md border border-border bg-muted/20 p-3">
                  <div className="text-[11px] text-muted-foreground font-medium">Name</div>
                  <div className="text-sm font-medium mt-0.5 text-foreground">
                    {user?.name || "Not provided"}
                  </div>
                </div>

                <div className="rounded-md border border-border bg-muted/20 p-3">
                  <div className="text-[11px] text-muted-foreground font-medium">Email</div>
                  <div className="text-sm font-medium mt-0.5 text-foreground">
                    {user?.email || "Not provided"}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Appearance Card */}
          <Card className="rounded-md border border-border">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Palette className="size-4 text-primary" />
                <CardTitle className="text-sm font-semibold">Appearance</CardTitle>
              </div>
              <CardDescription className="text-xs">
                Customize how Notebook looks on your device.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-foreground">Theme Mode</p>
                  <p className="text-[11px] text-muted-foreground">
                    Switch between light, dark, or system preferences.
                  </p>
                </div>
                <ModeToggle />
              </div>
            </CardContent>
          </Card>

          {/* Session & Security */}
          <Card className="rounded-md border border-border">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Shield className="size-4 text-primary" />
                <CardTitle className="text-sm font-semibold">Account Session</CardTitle>
              </div>
              <CardDescription className="text-xs">
                Manage your active session.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Sign Out</p>
                <p className="text-xs text-muted-foreground">
                  Securely log out of this device.
                </p>
              </div>
              <div className="w-32">
                <Logout />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageWrapper>
  );
}
