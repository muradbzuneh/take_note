import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Notebook — Beautiful Notes, Thoughts & Ideas",
  description: "Distraction-free workspace to capture thoughts, organize notes into notebooks, and format with modern rich text blocks.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased` }
    >
      <body className="min-h-full flex flex-col"> 
        <ThemeProvider
                 attribute="class"
                 defaultTheme="system"
                 enableSystem
                 disableTransitionOnChange
               >
               <NuqsAdapter>
                 {children}
               </NuqsAdapter>
             </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
