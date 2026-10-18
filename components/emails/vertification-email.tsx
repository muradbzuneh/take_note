import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components"

export type VerificationEmailProps = {
  url: string
  name?: string
}

export function VerificationEmail({ url, name }: VerificationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Verify your email address</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Verify your email</Heading>
          <Text style={paragraph}>
            Hi {name || "there"}, thanks for signing up. Please confirm your
            email address to activate your account.
          </Text>
          <Section style={buttonContainer}>
            <Button href={url} style={button}>
              Verify email
            </Button>
          </Section>
          <Text style={paragraph}>
            Or copy and paste this link into your browser:
          </Text>
          <Text style={link}>{url}</Text>
          <Hr style={hr} />
          <Text style={footer}>
            If you didn&apos;t create an account, you can safely ignore this
            email.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export default VerificationEmail

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
}

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #e6ebf1",
  borderRadius: "8px",
  margin: "40px auto",
  maxWidth: "480px",
  padding: "32px",
}

const heading = {
  color: "#0f172a",
  fontSize: "22px",
  fontWeight: 600 as const,
  margin: "0 0 16px",
}

const paragraph = {
  color: "#334155",
  fontSize: "14px",
  lineHeight: "22px",
  margin: "0 0 16px",
}

const buttonContainer = { margin: "0 0 16px" }

const button = {
  backgroundColor: "#0f172a",
  borderRadius: "6px",
  color: "#ffffff",
  display: "inline-block",
  fontSize: "14px",
  fontWeight: 600 as const,
  padding: "12px 20px",
  textDecoration: "none",
}

const link = {
  color: "#2563eb",
  fontSize: "13px",
  lineHeight: "20px",
  margin: "0 0 16px",
  wordBreak: "break-all" as const,
}

const hr = { borderColor: "#e6ebf1", margin: "24px 0" }

const footer = {
  color: "#64748b",
  fontSize: "12px",
  lineHeight: "18px",
  margin: 0,
}
