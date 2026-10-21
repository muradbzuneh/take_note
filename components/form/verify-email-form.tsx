"use client"

import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"

import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const verifyEmailSchema = z.object({
  email: z.email("Enter a valid email address"),
})

type VerifyEmailValues = z.infer<typeof verifyEmailSchema>

export function VerifyEmailForm() {
  const [isPending, setIsPending] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyEmailValues>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: { email: "" },
  })

  const onSubmit = async (values: VerifyEmailValues) => {
    setIsPending(true)
    try {
      const { error } = await authClient.sendVerificationEmail({
        email: values.email,
        callbackURL: "/",
      })

      if (error) {
        toast.error(error.message ?? "Failed to send verification email")
        return
      }

      toast.success("Verification email sent. Please check your inbox.")
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      )
    } finally {
      setIsPending(false)
    }
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Verify your email</CardTitle>
        <CardDescription>
          Enter your email and we&apos;ll send you a new verification link.
        </CardDescription>
        <CardAction>
          <Button
            variant="link"
            nativeButton={false}
            render={
              <Link href="/login">
                <span>Login</span>
              </Link>
            }
          />
        </CardAction>
      </CardHeader>
      <CardContent>
        <form
          id="verify-email-form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col gap-6"
        >
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              autoComplete="email"
              aria-invalid={!!errors.email}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-destructive text-sm">{errors.email.message}</p>
            )}
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          type="submit"
          form="verify-email-form"
          className="w-full font-medium"
          disabled={isPending}
        >
          {isPending ? "Sending..." : "Resend verification email"}
        </Button>
      </CardFooter>
    </Card>
  )
}
