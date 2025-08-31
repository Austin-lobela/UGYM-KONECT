"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { CartSheet } from "@/components/cart/cart-sheet"
import Image from "next/image"
import Link from "next/link"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/gyms", label: "Gyms" },
    { href: "/services", label: "Services" },
    { href: "/products", label: "Products" },
    { href: "/about", label: "About" },
    { href: "/register-business", label: "Register Business" },
  ]

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/images/ugym-logo.png" alt="UGYM-KONECT Logo" width={120} height={40} className="h-8 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF9100] focus:ring-offset-2 rounded-md px-2 py-1 ${
                  isActive(item.href)
                    ? "text-[#FF9100] border-b-2 border-[#FF9100]"
                    : "text-gray-700 hover:text-[#FF9100]"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex items-center space-x-2">
              <CartSheet />
              <Button
                asChild
                variant="outline"
                className="border-[#FF9100] text-[#FF9100] hover:bg-[#FF9100] hover:text-white bg-transparent"
              >
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild className="bg-[#FF9100] hover:bg-[#FF9100]/90 text-white">
                <Link href="/register">Sign Up</Link>
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-2">
            <CartSheet />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="focus:ring-2 focus:ring-[#FF9100]">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`font-medium text-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF9100] focus:ring-offset-2 rounded-md px-2 py-1 ${
                        isActive(item.href) ? "text-[#FF9100]" : "text-gray-700 hover:text-[#FF9100]"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <div className="flex flex-col space-y-2 mt-6">
                    <Button
                      asChild
                      variant="outline"
                      className="border-[#FF9100] text-[#FF9100] hover:bg-[#FF9100] hover:text-white bg-transparent"
                    >
                      <Link href="/login" onClick={() => setIsOpen(false)}>
                        Login
                      </Link>
                    </Button>
                    <Button asChild className="bg-[#FF9100] hover:bg-[#FF9100]/90 text-white">
                      <Link href="/register" onClick={() => setIsOpen(false)}>
                        Sign Up
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
