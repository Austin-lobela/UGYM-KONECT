"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BusinessDetailsStep } from "./registration-steps/business-details-step"
import { TermsConditionsStep } from "./registration-steps/terms-conditions-step"
import { ProductManagerStep } from "./registration-steps/product-manager-step"
import { PreviewPublishStep } from "./registration-steps/preview-publish-step"
import { ChevronLeft, ChevronRight } from "lucide-react"

export interface Product {
  id: string
  name: string
  price: number
  description: string
  category: string
  tags: string[]
  images: File[]
}

export interface BusinessFormData {
  // Business Details
  businessType: "gym" | "service_provider" | "product_seller" | "multi" | ""
  name: string
  description: string
  location: {
    city: string
    suburb: string
    province: string
    country: string
  }
  contact: {
    phone: string
    email: string
    website: string
    whatsapp: string
  }

  // Terms acceptance
  termsAccepted: boolean

  // Products (for product sellers and multi-type businesses)
  products: Product[]

  // Services (for service providers and gyms)
  services: string[]
  serviceTypes: string[]
  pricing: { name: string; price: string; description: string }[]
  facilities: string[]
  amenities: string[]

  // Additional
  operatingHours: { [key: string]: { open: string; close: string; closed: boolean } }
  socialMedia: { facebook: string; instagram: string; twitter: string }
}

const initialFormData: BusinessFormData = {
  businessType: "",
  name: "",
  description: "",
  location: {
    city: "",
    suburb: "",
    province: "",
    country: "South Africa",
  },
  contact: {
    phone: "",
    email: "",
    website: "",
    whatsapp: "",
  },
  termsAccepted: false,
  products: [],
  services: [],
  serviceTypes: [],
  pricing: [],
  facilities: [],
  amenities: [],
  operatingHours: {
    monday: { open: "09:00", close: "17:00", closed: false },
    tuesday: { open: "09:00", close: "17:00", closed: false },
    wednesday: { open: "09:00", close: "17:00", closed: false },
    thursday: { open: "09:00", close: "17:00", closed: false },
    friday: { open: "09:00", close: "17:00", closed: false },
    saturday: { open: "09:00", close: "17:00", closed: false },
    sunday: { open: "09:00", close: "17:00", closed: true },
  },
  socialMedia: { facebook: "", instagram: "", twitter: "" },
}

const steps = [
  { id: 1, title: "Business Details", description: "Tell us about your business" },
  { id: 2, title: "Terms & Conditions", description: "Review and accept our terms" },
  { id: 3, title: "Product Manager", description: "Add your products and services" },
  { id: 4, title: "Preview & Publish", description: "Review and submit for approval" },
]

export function BusinessRegistrationForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<BusinessFormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateFormData = (updates: Partial<BusinessFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }))
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      // TODO: Implement Firebase submission
      console.log("Submitting business registration:", formData)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Set status to pending_review
      const businessData = {
        ...formData,
        status: "pending_review",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      console.log("Business submitted for review:", businessData)

      // Show success message
      alert("Business submitted for review! You'll receive an email confirmation shortly.")

      // Redirect to dashboard or success page
      window.location.href = "/dashboard"
    } catch (error) {
      console.error("Registration failed:", error)
      alert("Registration failed. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <BusinessDetailsStep formData={formData} updateFormData={updateFormData} />
      case 2:
        return <TermsConditionsStep formData={formData} updateFormData={updateFormData} />
      case 3:
        return <ProductManagerStep formData={formData} updateFormData={updateFormData} />
      case 4:
        return <PreviewPublishStep formData={formData} onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      default:
        return null
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return (
          formData.businessType !== "" &&
          formData.name &&
          formData.description &&
          formData.location.city &&
          formData.location.suburb &&
          formData.location.province &&
          formData.contact.phone &&
          formData.contact.email
        )
      case 2:
        return formData.termsAccepted
      case 3:
        return (
          formData.products.length > 0 ||
          formData.services.length > 0 ||
          formData.serviceTypes.length > 0 ||
          formData.pricing.length > 0
        )
      case 4:
        return true
      default:
        return true
    }
  }

  const progress = (currentStep / steps.length) * 100

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Header */}
      <Card className="mb-8 border-gray-200">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <div>
              <CardTitle className="text-xl text-gray-900">
                Step {currentStep} of {steps.length}
              </CardTitle>
              <CardDescription className="text-gray-600">{steps[currentStep - 1]?.title}</CardDescription>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-[#FF9100]">{Math.round(progress)}%</div>
              <div className="text-sm text-gray-500">Complete</div>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </CardHeader>
      </Card>

      {/* Step Content */}
      <Card className="mb-8 border-gray-200">
        <CardHeader>
          <CardTitle className="text-gray-900">{steps[currentStep - 1]?.title}</CardTitle>
          <CardDescription className="text-gray-600">{steps[currentStep - 1]?.description}</CardDescription>
        </CardHeader>
        <CardContent>{renderStep()}</CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 1}
          className="flex items-center border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>

        {currentStep < steps.length ? (
          <Button
            onClick={nextStep}
            disabled={!canProceed()}
            className="flex items-center bg-[#FF9100] hover:bg-[#FF9100]/90 text-white"
          >
            Next
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex items-center bg-[#FF9100] hover:bg-[#FF9100]/90 text-white"
          >
            {isSubmitting ? "Submitting..." : "Submit for Review"}
          </Button>
        )}
      </div>
    </div>
  )
}
