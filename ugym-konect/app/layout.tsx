import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { AppLayout } from "@/components/layout/app-layout"
import "./globals.css"

export const metadata: Metadata = {
  title: "UGYM-KONECT - Connect with Gyms, Trainers & Health Products",
  description:
    "UGYM-KONECT is a platform that connects people with gyms, fitness trainers, coaches, doctors, dietitians, sports businesses, and health products in South Africa.",
  generator: "UGYM-KONECT",
  keywords: "gym, fitness, trainer, health, products, South Africa, workout, exercise",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <AppLayout>
          <Suspense fallback={null}>{children}</Suspense>
        </AppLayout>
        <Analytics />
      </body>
    </html>
  )
}
