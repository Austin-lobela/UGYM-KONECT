import type { Metadata } from "next"
import { BusinessRegistrationForm } from "@/components/business/business-registration-form"

export const metadata: Metadata = {
  title: "Business Registration - UGYM-KONECT",
  description: "Register your gym, fitness service, or health product business on UGYM-KONECT.",
}

export default function BusinessRegistrationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Register Your Business</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join UGYM-KONECT and connect with thousands of fitness enthusiasts across South Africa. Register your gym,
            fitness service, or health product business today.
          </p>
        </div>

        {/* Registration Form */}
        <BusinessRegistrationForm />
      </div>
    </div>
  )
}
