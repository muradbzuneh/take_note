import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { nextCookies } from "better-auth/next-js"

import { ResetEmail } from "@/components/emails/reset-email"
import { VerificationEmail } from "@/components/emails/vertification-email"
import { db } from "@/db"
import * as schema from "@/db/schema"
import { sendEmail } from "@/lib/email"

export const auth = betterAuth({
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
    requireEmailVerification: true,
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
          google: { 
              clientId: process.env.GOOGLE_CLIENT_ID as string, 
              clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
          }, 
      },
  emailVerification: {
    sendOnSignUp: true,
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
