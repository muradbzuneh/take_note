import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { nextCookies } from "better-auth/next-js"

import { ResetEmail } from "@/components/emails/reset-email"
import { VerificationEmail } from "@/components/emails/vertification-email"
import { db } from "@/db"
import * as schema from "@/db/schema"
import { sendEmail } from "@/lib/email"

const getProductionBaseUrl = () => {
  if (process.env.BETTER_AUTH_URL) return process.env.BETTER_AUTH_URL
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  return undefined
}

export const auth = betterAuth({
  baseURL: getProductionBaseUrl(),
  trustedOrigins: [
    process.env.BETTER_AUTH_URL,
    process.env.NEXT_PUBLIC_BASE_URL,
    "https://*.vercel.app",
  ].filter(Boolean) as string[],
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: schema.user,
      session: schema.session,
      account: schema.account,
      verification: schema.verification,
    },
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: process.env.REQUIRE_EMAIL_VERIFICATION === "true",
    resetPasswordTokenExpiresIn: 60 * 60,
    sendResetPassword: async ({ user, url }) => {
      try {
        await sendEmail({
          to: user.email,
          subject: "Reset your password",
          react: ResetEmail({ url, name: user.name }),
        })
      } catch (error) {
        console.error("[auth] failed to send reset password email:", error)
      }
    },
    onPasswordReset: async ({ user }) => {
      console.log(`[auth] password reset for ${user.email}`)
    },
  },
  socialProviders: {
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? {
          google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          },
        }
      : {}),
  },
  emailVerification: {
    sendOnSignUp: process.env.REQUIRE_EMAIL_VERIFICATION === "true",
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      try {
        await sendEmail({
          to: user.email,
          subject: "Verify your email address",
          react: VerificationEmail({ url, name: user.name }),
        })
      } catch (error) {
        console.error("[auth] failed to send verification email:", error)
      }
    },
  },
  plugins: [nextCookies()],
})
