"use client"

import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"

export const Logout = () => {
  const router = useRouter()

  const handleLogout = async () => {
    const { error } = await authClient.signOut()

    if (error) {
      toast.error(error.message ?? "Failed to log out")
      return
    }

    toast.success("Logged out")
    router.push("/")
    router.refresh()
  }

  return (
    <Button variant="outline" onClick={handleLogout}>
      Logout
    </Button>
  )
}

export default Logout
