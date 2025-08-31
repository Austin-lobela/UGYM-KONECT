"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Building2, Users, Package, Layers } from "lucide-react"
import type { BusinessFormData } from "../business-registration-form"

interface BusinessDetailsStepProps {
  formData: BusinessFormData
  updateFormData: (updates: Partial<BusinessFormData>) => void
}

export function BusinessDetailsStep({ formData, updateFormData }: BusinessDetailsStepProps) {
  const businessTypes = [
    {
      value: "gym",
      label: "Gym",
      description: "Fitness facilities and gym memberships",
      icon: <Building2 className="h-6 w-6 text-[#FF9100]" />,
    },
    {
      value: "service_provider",
      label: "Service Provider",
      description: "Personal trainers, nutritionists, coaches",
      icon: <Users className="h-6 w-6 text-[#FF9100]" />,
    },
    {
      value: "product_seller",
      label: "Product Seller",
      description: "Fitness equipment, supplements, apparel",
      icon: <Package className="h-6 w-6 text-[#FF9100]" />,
    },
    {
      value: "multi",
      label: "Multi-Service",
      description: "Combination of services and products",
      icon: <Layers className="h-6 w-6 text-[#FF9100]" />,
    },
  ]

  const provinces = [
    "Eastern Cape",
    "Free State",
    "Gauteng",
    "KwaZulu-Natal",
    "Limpopo",
    "Mpumalanga",
    "Northern Cape",
    "North West",
    "Western Cape",
  ]

  return (
    <div className="space-y-6">
      {/* Business Type Selection */}
      <div>
        <Label className="text-base font-semibold text-gray-900 mb-4 block">Business Type</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {businessTypes.map((type) => (
            <Card
              key={type.value}
              className={`cursor-pointer transition-all hover:shadow-md ${
                formData.businessType === type.value
                  ? "border-[#FF9100] bg-orange-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => updateFormData({ businessType: type.value as any })}
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  {type.icon}
                  <div>
                    <h3 className="font-semibold text-gray-900">{type.label}</h3>
                    <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="businessName" className="text-gray-900">
              Business Name *
            </Label>
            <Input
              id="businessName"
              value={formData.name}
              onChange={(e) => updateFormData({ name: e.target.value })}
              placeholder="Enter your business name"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="contactEmail" className="text-gray-900">
              Contact Email *
            </Label>
            <Input
              id="contactEmail"
              type="email"
              value={formData.contact.email}
              onChange={(e) => updateFormData({ contact: { ...formData.contact, email: e.target.value } })}
              placeholder="business@example.com"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="contactPhone" className="text-gray-900">
              Contact Phone *
            </Label>
            <Input
              id="contactPhone"
              value={formData.contact.phone}
              onChange={(e) => updateFormData({ contact: { ...formData.contact, phone: e.target.value } })}
              placeholder="+27 11 123 4567"
              className="mt-1"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="website" className="text-gray-900">
              Website
            </Label>
            <Input
              id="website"
              value={formData.contact.website}
              onChange={(e) => updateFormData({ contact: { ...formData.contact, website: e.target.value } })}
              placeholder="https://www.yourwebsite.com"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="whatsapp" className="text-gray-900">
              WhatsApp Number
            </Label>
            <Input
              id="whatsapp"
              value={formData.contact.whatsapp}
              onChange={(e) => updateFormData({ contact: { ...formData.contact, whatsapp: e.target.value } })}
              placeholder="+27 82 123 4567"
              className="mt-1"
            />
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <Label htmlFor="description" className="text-gray-900">
          Business Description *
        </Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => updateFormData({ description: e.target.value })}
          placeholder="Describe your business, services, and what makes you unique..."
          rows={4}
          className="mt-1"
        />
      </div>

      {/* Location */}
      <div>
        <Label className="text-base font-semibold text-gray-900 mb-4 block">Location</Label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="city" className="text-gray-900">
              City *
            </Label>
            <Input
              id="city"
              value={formData.location.city}
              onChange={(e) => updateFormData({ location: { ...formData.location, city: e.target.value } })}
              placeholder="Johannesburg"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="suburb" className="text-gray-900">
              Suburb *
            </Label>
            <Input
              id="suburb"
              value={formData.location.suburb}
              onChange={(e) => updateFormData({ location: { ...formData.location, suburb: e.target.value } })}
              placeholder="Sandton"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="province" className="text-gray-900">
              Province *
            </Label>
            <Select
              value={formData.location.province}
              onValueChange={(value) => updateFormData({ location: { ...formData.location, province: value } })}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select province" />
              </SelectTrigger>
              <SelectContent>
                {provinces.map((province) => (
                  <SelectItem key={province} value={province}>
                    {province}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  )
}
