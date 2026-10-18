import { Suspense } from "react"

import { ResetPasswordForm } from "@/components/form/reset-password-form"

const ResetPassword = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Suspense fallback={null}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  )
}

export default ResetPassword
