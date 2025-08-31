"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Users, ShoppingBag, Check } from "lucide-react"
import type { BusinessFormData } from "../business-registration-form"

interface BusinessTypeStepProps {
  formData: BusinessFormData
  updateFormData: (updates: Partial<BusinessFormData>) => void
}

const businessTypes = [
  {
    id: "gym" as const,
    title: "Gym / Fitness Center",
    description: "Physical fitness facilities, gyms, studios, and fitness centers",
    icon: Building2,
    features: ["List your facilities", "Showcase equipment", "Membership pricing", "Operating hours"],
  },
  {
    id: "service" as const,
    title: "Health & Fitness Services",
    description: "Personal trainers, doctors, dietitians, coaches, and health professionals",
    icon: Users,
    features: ["Professional profile", "Service offerings", "Session pricing", "Availability calendar"],
  },
  {
    id: "product" as const,
    title: "Product Seller",
    description: "Fitness equipment, supplements, apparel, and health products",
    icon: ShoppingBag,
    features: ["Product catalog", "Inventory management", "Shipping options", "30% platform fee"],
  },
]

export function BusinessTypeStep({ formData, updateFormData }: BusinessTypeStepProps) {
  const handleTypeSelect = (type: "gym" | "service" | "product") => {
    updateFormData({ businessType: type })
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-lg font-semibold text-foreground mb-2">What type of business are you registering?</h3>
        <p className="text-muted-foreground">Choose the category that best describes your business</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {businessTypes.map((type) => {
          const Icon = type.icon
          const isSelected = formData.businessType === type.id

          return (
            <Card
              key={type.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                isSelected ? "border-primary bg-primary/5" : "hover:border-primary/50"
              }`}
              onClick={() => handleTypeSelect(type.id)}
            >
              <CardHeader className="text-center pb-4">
                <div className="relative mx-auto mb-4">
                  <div className={`p-4 rounded-full ${isSelected ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  {isSelected && (
                    <div className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full p-1">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                </div>
                <CardTitle className="text-lg">{type.title}</CardTitle>
                <CardDescription className="text-sm">{type.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {type.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {formData.businessType && (
        <div className="text-center">
          <Badge variant="secondary" className="text-sm px-4 py-2">
            Selected: {businessTypes.find((t) => t.id === formData.businessType)?.title}
          </Badge>
        </div>
      )}
    </div>
  )
}
