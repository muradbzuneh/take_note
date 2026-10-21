import { Suspense } from "react";
import { ResetPasswordForm } from "@/components/form/reset-password-form";
import { Logo } from "@/components/logo";
import Link from "next/link";

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-svh w-full flex-col items-center justify-center p-6 md:p-10 bg-muted/20">
      <div className="w-full max-w-sm flex flex-col items-center gap-6">
        <Link href="/" className="transition-transform hover:scale-105">
          <Logo size="lg" />
        </Link>
        <Suspense fallback={null}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}
