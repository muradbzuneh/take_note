import { SignUpForm } from "@/components/form/sign-up-form";
import { Logo } from "@/components/logo";
import Link from "next/link";
import React from "react";

export default function SignUpPage() {
  return (
    <div className="flex min-h-svh w-full flex-col items-center justify-center p-6 md:p-10 bg-muted/20">
      <div className="w-full max-w-sm flex flex-col items-center gap-6">
        <Link href="/" className="transition-transform hover:scale-105">
          <Logo size="lg" />
        </Link>
        <SignUpForm />
      </div>
    </div>
  );
}
