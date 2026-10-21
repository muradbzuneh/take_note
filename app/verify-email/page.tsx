import { VerifyEmailForm } from "@/components/form/verify-email-form";
import { Logo } from "@/components/logo";
import Link from "next/link";

export default function VerifyEmailPage() {
  return (
    <div className="flex min-h-svh w-full flex-col items-center justify-center p-6 md:p-10 bg-muted/20">
      <div className="w-full max-w-sm flex flex-col items-center gap-6">
        <Link href="/" className="transition-transform hover:scale-105">
          <Logo size="lg" />
        </Link>
        <VerifyEmailForm />
      </div>
    </div>
  );
}
