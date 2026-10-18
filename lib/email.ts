import { render } from "@react-email/render"
import type { ReactElement } from "react"
import { Resend } from "resend"

export const resend = new Resend(process.env.RESEND_API_KEY)

const FROM = process.env.EMAIL_FROM ?? "Acme <onboarding@resend.dev>"

export type SendEmailOptions = {
  to: string
  subject: string
  react: ReactElement
  text?: string
}

export async function sendEmail({ to, subject, react, text }: SendEmailOptions) {
  const html = await render(react)

  const { data, error } = await resend.emails.send({
    from: FROM,
    to,
    subject,
    html,
    ...(text ? { text } : {}),
  })

  if (error) {
    throw new Error(error.message)
  }

  return data
}
