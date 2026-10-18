import Logout from "@/components/logout"

const dashboard = () => {
  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
      <p className="text-muted-foreground">
        Welcome to your notebook workspace.
      </p>
      <Logout />
    </div>
  )
}

export default dashboard
