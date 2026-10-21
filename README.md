<div align="center">
  <img src="public/logo.png" alt="Notebook Logo" width="96" height="96" />

  # Notebook

  **A modern, distraction-free note-taking application and personal knowledge base.**  
  *Built with Next.js 16, React 19, Tailwind CSS v4, Better-Auth, Drizzle ORM, and Tiptap.*

  [![Next.js](https://img.shields.io/badge/Next.js-16.4.1-black?logo=next.js)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-19.3.0-blue?logo=react)](https://react.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
  [![Better Auth](https://img.shields.io/badge/Better_Auth-1.7-emerald)](https://www.better-auth.com/)
  [![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-0.45-C5F74F?logo=drizzle)](https://orm.drizzle.team/)
  [![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Architecture](#project-architecture)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Setup](#environment-setup)
  - [Database Migration](#database-migration)
  - [Running Locally](#running-locally)
- [Deploying to Vercel](#deploying-to-vercel)
- [Quality Assurance & Testing](#quality-assurance--testing)
- [License](#license)

---

## Overview

**Notebook** is a full-featured, responsive web application engineered for capturing fleeting thoughts, drafting in-depth specifications, and organizing notes into structured notebooks. 

The user interface is styled with a restrained, editorial productivity aesthetic featuring muted navy blue (`#244A73`), white, cool neutral gray, charcoal text, and subtle borders. It offers seamless switching between dark navy and crisp light themes, complete with an interactive workspace showcase and a secure, authenticated dashboard workspace.

---

## Key Features

### 1. Robust Authentication & Security
- **Multi-Method Authentication**: Supports email/password credentials and Google Social OAuth via [Better-Auth](https://www.better-auth.com/).
- **Route Guard Protection**: Next.js 16 `proxy.ts` middleware intercepts `/dashboard/:path*`, inspects session cookies, and redirects unauthorized visitors.
- **Defense in Depth**: Secondary server-side session checks in dashboard layouts ensure complete route isolation.
- **Password Reset & Verification**: Built-in transactional email flows using [Resend](https://resend.com/).

### 2. Multi-Notebook Organization
- **Hierarchical Workspaces**: Group individual notes within customized notebooks.
- **Fast Notebook CRUD**: Create, rename, view, and delete notebooks with automated cascade deletion of nested notes.
- **Dynamic Counters**: Live count badges show the exact number of notes per notebook in the sidebar and dashboard.

### 3. Tiptap Rich Text Editor
- **Full Typography Controls**: Headers (H1, H2, H3, Paragraph), bold, italic, strikethrough, inline code, and dividers.
- **Structure Blocks**: Bulleted lists, numbered lists, blockquotes, and syntax-highlighted code blocks.
- **History & Keyboard Shortcuts**: Undo/redo buttons and `Cmd+S` / `Ctrl+S` instant save triggers.
- **Auto-Save Status**: Real-time visual indicator displays `Saved`, `Unsaved changes`, or `Saving...`.
- **Backward Compatibility**: Automatically converts legacy text formats into structured Tiptap `JSONContent`.

### 4. Search & UI Polish
- **Instant Live Search**: URL query parameter search powered by `nuqs` immediately filters notebooks and notes in real time.
- **Interactive Guest Showcase**: Landing page features a live demo with an interactive Light/Dark preview toggle.
- **Zero Emojis**: Clean, professional Lucide React icons utilized across all interfaces.
- **Responsive Layout**: Designed for mobile, tablet, and desktop viewports with collapsible sidebar navigation.

---

## Tech Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | Next.js 16.4.1 (App Router, Turbopack, Partial Prerendering) |
| **Language** | TypeScript 5 |
| **Frontend Library** | React 19.3.0 |
| **Styling** | Tailwind CSS v4, Base UI, Class Variance Authority (CVA) |
| **Rich Text Engine** | Tiptap Editor (`@tiptap/react`, `@tiptap/starter-kit`, `@tiptap/pm`) |
| **Database & ORM** | Neon Serverless PostgreSQL + Drizzle ORM |
| **Authentication** | Better-Auth with PostgreSQL Drizzle adapter |
| **Email Service** | Resend + React Email |
| **Icons & Feedback** | Lucide React, Sonner Toaster |

---

## Project Architecture

```
notebook/
├── app/
│   ├── api/auth/[...all]/route.ts       # Better-Auth catch-all API handler
│   ├── dashboard/
│   │   ├── layout.tsx                   # Protected dashboard shell & session validation
│   │   ├── page.tsx                     # Main notebooks dashboard view
│   │   ├── notebook/[notebookId]/       # Notebook detail & note grid
│   │   │   └── note/[noteId]/page.tsx   # Note editor view with Tiptap
│   │   └── settings/page.tsx            # User profile, appearance, & session
│   ├── login/page.tsx                   # Sign-in page
│   ├── signup/page.tsx                  # Sign-up page
│   ├── forget-password/page.tsx         # Password recovery
│   ├── reset-password/page.tsx          # Password reset with token
│   ├── verify-email/page.tsx            # Email verification prompt
│   ├── globals.css                      # Tailwind v4 theme, navy tokens, ProseMirror styles
│   ├── layout.tsx                       # Root layout with theme provider and toaster
│   └── page.tsx                         # Landing page with hero & interactive demo
├── components/
│   ├── app-sidebar.tsx                  # Server component fetching notebooks & session
│   ├── sidebar-data.tsx                 # Client sidebar tree, search filter, & actions
│   ├── sidebar-user.tsx                 # User profile dropdown with theme switcher & logout
│   ├── note-editor.tsx                  # Note editor controller with status & keybindings
│   ├── rich-text-editor.tsx             # Tiptap editor engine and interactive toolbar
│   ├── guest-dashboard-preview.tsx      # Landing page live demo with light/dark toggle
│   ├── notebooks.tsx                    # Notebook card grid with rename & delete dialogs
│   ├── note-card.tsx                    # Note card component with quick delete action
│   ├── logo.tsx                         # Brand logo component
│   ├── form/                            # Zod-validated authentication forms
│   └── ui/                              # Base UI and Radix primitives (button, dialog, input)
├── db/
│   ├── index.ts                         # Neon serverless client + Drizzle initialization
│   └── schema.ts                        # Database tables: user, session, account, notebooks, notes
├── lib/
│   ├── auth.ts                          # Better-Auth server configuration & adapter
│   ├── auth-client.ts                   # Better-Auth client instance
│   ├── email.ts                         # Resend client & transactional dispatcher
│   └── utils.ts                         # Utility functions (cn class merger)
├── server/
│   ├── notebooks.ts                     # Server actions for notebook CRUD
│   ├── notes.ts                         # Server actions for note CRUD
│   └── user.ts                          # User query helpers
├── proxy.ts                             # Next.js 16 route proxy & auth middleware
└── drizzle.config.ts                    # Drizzle Kit configuration
```

---

## Getting Started

### Prerequisites

- **Node.js**: `v20.x` or later (Node.js 22+ recommended)
- **Package Manager**: `npm`, `pnpm`, or `yarn`
- **PostgreSQL Database**: Free serverless instance from [Neon](https://neon.tech/) or [Supabase](https://supabase.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/notebook.git
   cd notebook
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```

### Environment Setup

Create a `.env` file in the root directory (or copy from `.env.example`):

```bash
cp .env.example .env
```

Configure your environment variables:

```env
# Database Connection String (from Neon or PostgreSQL)
DATABASE_URL="postgresql://user:password@endpoint.neon.tech/neondb?sslmode=require"

# Better-Auth Secret (generate with `openssl rand -base64 32`)
BETTER_AUTH_SECRET="your-32-byte-secret-key"

# Base Application URLs
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"

# Optional: Google OAuth Credentials (for Google Sign-In)
GOOGLE_CLIENT_ID="your-google-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Optional: Resend API Key (for transactional verification emails)
RESEND_API_KEY="re_your_api_key"
EMAIL_FROM="Notebook <onboarding@resend.dev>"
```

### Database Migration

Push the database schema directly to your PostgreSQL instance using Drizzle Kit:

```bash
npx drizzle-kit push
```

To inspect your database records visually:
```bash
npx drizzle-kit studio
```

### Running Locally

Start the Next.js development server with Turbopack:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## Deploying to Vercel

The application is fully optimized for one-click deployment on [Vercel](https://vercel.com/):

### Step-by-Step Vercel Deployment

1. **Push your code to GitHub**:
   Ensure your latest code is pushed to your remote GitHub repository.

2. **Import Project to Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new).
   - Select your `notebook` repository and click **Import**.

3. **Configure Environment Variables**:
   In the **Environment Variables** section of the Vercel project configuration, add:

   | Variable Name | Value | Note |
   | :--- | :--- | :--- |
   | `DATABASE_URL` | `postgresql://...` | Neon connection string with `?sslmode=require` |
   | `BETTER_AUTH_SECRET` | `your-32-byte-secret` | Generate via `openssl rand -base64 32` |
   | `BETTER_AUTH_URL` | `https://your-app.vercel.app` | Your production Vercel URL |
   | `NEXT_PUBLIC_BASE_URL` | `https://your-app.vercel.app` | Same as `BETTER_AUTH_URL` |
   | `GOOGLE_CLIENT_ID` | `...` | Optional: your Google OAuth Client ID |
   | `GOOGLE_CLIENT_SECRET` | `...` | Optional: your Google OAuth Client Secret |
   | `RESEND_API_KEY` | `re_...` | Optional: your Resend API Key |
   | `EMAIL_FROM` | `Notebook <onboarding@resend.dev>` | Verified sender email |

4. **Build & Output Settings**:
   - Framework Preset: **Next.js**
   - Build Command: `next build`
   - Output Directory: `.next`

5. **Deploy**:
   Click **Deploy**. Vercel will build and deploy the application in under 2 minutes.

6. **Post-Deployment Verification**:
   - Visit `https://your-app.vercel.app/signup` and create an account.
   - Verify that notebooks can be created, edited, and deleted.
   - Verify that notes open smoothly in the Tiptap editor and auto-save.

### Troubleshooting Vercel Database & Backend Connection

If you encounter issues fetching data or authenticating on Vercel:

1. **Do you need a separate backend server?**
   **No!** Next.js is fullstack. Your Server Actions (`server/notebooks.ts`, `server/notes.ts`) and Auth API (`app/api/auth/[...all]`) are automatically deployed as Vercel Serverless Functions in the same single deployment.

2. **Database connection failed / cannot fetch:**
   - Go to your **Vercel Dashboard -> Project Settings -> Environment Variables**.
   - Make sure `DATABASE_URL` is set to your Neon PostgreSQL connection string (`postgresql://...sslmode=require`).
   - If `DATABASE_URL` was missing or added after deployment, trigger a **Redeploy** (Deployments -> `...` -> Redeploy).

3. **Authentication or "Failed to fetch" on Sign In / Sign Up:**
   - Ensure `BETTER_AUTH_URL` is set to `https://your-actual-app.vercel.app` (not `http://localhost:3000`).
   - If you leave `REQUIRE_EMAIL_VERIFICATION="false"`, you can log in immediately without setting up a custom email domain in Resend.
   - Ensure `BETTER_AUTH_SECRET` is added to Vercel Environment Variables.

4. **Database tables not created yet:**
   - From your local machine, run:
     ```bash
     npm run db:push
     ```
   - This ensures all tables (`user`, `session`, `account`, `verification`, `notebooks`, `notes`) exist in your Neon PostgreSQL database.

5. **Inspecting Server Logs on Vercel:**
   - Go to **Vercel Dashboard -> Your Project -> Logs** (or click on your latest Deployment -> **Functions** tab).
   - This will display real-time errors, database connection exceptions, or missing environment variable logs.

---

## Quality Assurance & Testing

The codebase enforces strict type safety and linting standards:

```bash
# 1. Static code analysis (0 errors, 0 warnings)
npm run lint

# 2. Strict TypeScript compiler check (0 diagnostics)
npx tsc --noEmit

# 3. Production Turbopack build verification
npm run build
```

---

## License

This project is licensed under the [MIT License](LICENSE).
