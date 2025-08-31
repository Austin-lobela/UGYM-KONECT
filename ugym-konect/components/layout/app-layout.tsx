"use client"

import type React from "react"
import { CartProvider } from "@/lib/contexts/cart-context"
import { Toaster } from "@/components/ui/toaster"
import { Header } from "./header"
import { Footer } from "./footer"

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster />
      </div>
    </CartProvider>
  )
}
