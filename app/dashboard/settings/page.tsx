import { PageWrapper } from "@/components/page-wrapper"

export default function SettingsPage() {
  return (
    <PageWrapper
      breadcrumbs={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Settings", href: "/dashboard/settings" },
      ]}
    >
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and workspace settings.
        </p>
      </div>
    </PageWrapper>
  )
}
