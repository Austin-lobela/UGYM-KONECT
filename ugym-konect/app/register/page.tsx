import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { RegisterForm } from "@/components/auth/register-form"

export const metadata: Metadata = {
  title: "Register - UGYM-KONECT",
  description: "Create your UGYM-KONECT account",
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Hero Image/Content */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary/10 via-primary/5 to-accent/5 items-center justify-center p-12">
        <div className="max-w-md text-center">
          <div className="text-6xl font-bold text-primary mb-6">🏋️</div>
          <h3 className="text-2xl font-bold text-foreground mb-4">Start Your Journey</h3>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Join thousands of fitness enthusiasts and discover the best gyms, trainers, and health products in South
            Africa.
          </p>
        </div>
      </div>

      {/* Right side - Register Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <Link href="/" className="inline-block">
              <Image
                src="/images/ugym-logo.png"
                alt="UGYM-KONECT Logo"
                width={150}
                height={50}
                className="h-12 w-auto mx-auto"
              />
            </Link>
            <h2 className="mt-6 text-3xl font-bold text-foreground">Create your account</h2>
            <p className="mt-2 text-muted-foreground">Join the UGYM-KONECT community today</p>
          </div>

          <RegisterForm />

          <div className="text-center">
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:text-primary/80 font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
