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
      <div className="max-w-4xl space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
          <p className="text-muted-foreground text-sm">
            Manage your account settings, workspace preferences, and security.
          </p>
        </div>

        <div className="grid gap-6">
          {/* User Profile Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <User className="size-4 text-primary" />
                <CardTitle className="text-base">Profile Information</CardTitle>
              </div>
              <CardDescription>
                Your personal account details.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-lg border p-3">
                  <div className="text-xs text-muted-foreground font-medium">Name</div>
                  <div className="text-sm font-semibold mt-1">
                    {user?.name || "Not provided"}
                  </div>
                </div>

                <div className="rounded-lg border p-3">
                  <div className="text-xs text-muted-foreground font-medium">Email</div>
                  <div className="text-sm font-semibold mt-1">
                    {user?.email || "Not provided"}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Appearance Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Palette className="size-4 text-primary" />
                <CardTitle className="text-base">Appearance</CardTitle>
              </div>
              <CardDescription>
                Customize how Notebook looks on your device.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Theme Mode</p>
                  <p className="text-xs text-muted-foreground">
                    Switch between light, dark, or system preferences.
                  </p>
                </div>
                <ModeToggle />
              </div>
            </CardContent>
          </Card>

          {/* Session & Security */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="size-4 text-primary" />
                <CardTitle className="text-base">Account Session</CardTitle>
              </div>
              <CardDescription>
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
