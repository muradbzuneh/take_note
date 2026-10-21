"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"

import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Google } from "@/components/ui/svgs/google"
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

const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

type SignUpValues = z.infer<typeof signUpSchema>

export function SignUpForm() {
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)
  const [isGooglePending, setIsGooglePending] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: "", email: "", password: "" },
  })

  const onSubmit = async (values: SignUpValues) => {
    setIsPending(true)
    try {
      const { error } = await authClient.signUp.email({
        name: values.name,
        email: values.email,
        password: values.password,
      })

      if (error) {
        toast.error(error.message ?? "Failed to create account")
        return
      }

      toast.success(
        "Account created. Check your email to verify your account."
      )
      router.push("/login")
      router.refresh()
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      )
    } finally {
      setIsPending(false)
    }
  }

  const signUp = async () => {
    try {
      setIsGooglePending(true)
      const res = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      })
      if (res?.error) {
        toast.error(res.error.message ?? "Google sign up failed")
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to initiate Google sign in"
      )
    } finally {
      setIsGooglePending(false)
    }
  }
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Create your account</CardTitle>
        <CardDescription>
          Enter your details below to create your account
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
          id="signup-form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col gap-6"
        >
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              autoComplete="name"
              aria-invalid={!!errors.name}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-destructive text-sm">{errors.name.message}</p>
            )}
          </div>
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
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              aria-invalid={!!errors.password}
              {...register("password")}
            />
            {errors.password && (
              <p className="text-destructive text-sm">
                {errors.password.message}
              </p>
            )}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-3">
        <Button
          type="submit"
          form="signup-form"
          className="w-full shadow-lg shadow-emerald-500/20 font-semibold"
          disabled={isPending}
        >
          {isPending ? "Creating account..." : "Create Account with Email"}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="w-full flex items-center justify-center gap-2"
          onClick={() => signUp()}
          disabled={isPending || isGooglePending}
        >
          <Google className="size-4" />
          <span>{isGooglePending ? "Connecting to Google..." : "Continue with Google"}</span>
        </Button>
      </CardFooter>
    </Card>
  )
}
