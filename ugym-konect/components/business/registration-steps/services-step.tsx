"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, X } from "lucide-react"
import type { BusinessFormData } from "../business-registration-form"

interface ServicesStepProps {
  formData: BusinessFormData
  updateFormData: (updates: Partial<BusinessFormData>) => void
}

const gymFacilities = [
  "Swimming Pool",
  "Sauna",
  "Steam Room",
  "Personal Training",
  "Group Classes",
  "Cardio Equipment",
  "Free Weights",
  "Parking",
  "Locker Rooms",
  "Juice Bar",
  "24/7 Access",
  "Air Conditioning",
  "Yoga Studio",
  "Spin Studio",
  "Rock Climbing Wall",
]

const serviceSpecializations = [
  "Weight Loss",
  "Muscle Building",
  "Sports Performance",
  "Injury Rehabilitation",
  "Nutrition Planning",
  "Mental Health",
  "Chronic Disease Management",
  "Senior Fitness",
  "Youth Training",
  "Prenatal/Postnatal",
  "Functional Movement",
  "Flexibility & Mobility",
]

export function ServicesStep({ formData, updateFormData }: ServicesStepProps) {
  const [newPricing, setNewPricing] = useState({ name: "", price: "", description: "" })

  const addPricing = () => {
    if (newPricing.name && newPricing.price) {
      updateFormData({
        pricing: [...formData.pricing, newPricing],
      })
      setNewPricing({ name: "", price: "", description: "" })
    }
  }

  const removePricing = (index: number) => {
    updateFormData({
      pricing: formData.pricing.filter((_, i) => i !== index),
    })
  }

  const handleFacilityChange = (facility: string, checked: boolean) => {
    if (checked) {
      updateFormData({ facilities: [...formData.facilities, facility] })
    } else {
      updateFormData({ facilities: formData.facilities.filter((f) => f !== facility) })
    }
  }

  const handleSpecializationChange = (spec: string, checked: boolean) => {
    if (checked) {
      updateFormData({ specializations: [...formData.specializations, spec] })
    } else {
      updateFormData({ specializations: formData.specializations.filter((s) => s !== spec) })
    }
  }

  return (
    <div className="space-y-6">
      {/* Pricing */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Pricing & Services</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Add New Pricing */}
          <div className="grid md:grid-cols-4 gap-4 items-end">
            <div className="space-y-2">
              <Label htmlFor="pricingName">Service/Package Name</Label>
              <Input
                id="pricingName"
                value={newPricing.name}
                onChange={(e) => setNewPricing({ ...newPricing, name: e.target.value })}
                placeholder="Basic Membership"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pricingPrice">Price</Label>
              <Input
                id="pricingPrice"
                value={newPricing.price}
                onChange={(e) => setNewPricing({ ...newPricing, price: e.target.value })}
                placeholder="R450/month"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pricingDescription">Description</Label>
              <Input
                id="pricingDescription"
                value={newPricing.description}
                onChange={(e) => setNewPricing({ ...newPricing, description: e.target.value })}
                placeholder="Access to gym and pool"
              />
            </div>
            <Button onClick={addPricing} disabled={!newPricing.name || !newPricing.price}>
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>

          {/* Existing Pricing */}
          {formData.pricing.length > 0 && (
            <div className="space-y-2">
              <Label>Current Pricing</Label>
              <div className="space-y-2">
                {formData.pricing.map((pricing, index) => (
                  <div key={index} className="flex items-center justify-between bg-muted/30 rounded-lg p-3">
                    <div>
                      <div className="font-medium">
                        {pricing.name} - {pricing.price}
                      </div>
                      {pricing.description && (
                        <div className="text-sm text-muted-foreground">{pricing.description}</div>
                      )}
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => removePricing(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Facilities (for gyms) */}
      {formData.businessType === "gym" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Facilities & Equipment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-3">
              {gymFacilities.map((facility) => (
                <div key={facility} className="flex items-center space-x-2">
                  <Checkbox
                    id={`facility-${facility}`}
                    checked={formData.facilities.includes(facility)}
                    onCheckedChange={(checked) => handleFacilityChange(facility, checked as boolean)}
                  />
                  <Label htmlFor={`facility-${facility}`} className="text-sm font-normal">
                    {facility}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Specializations (for services) */}
      {formData.businessType === "service" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Specializations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-3">
              {serviceSpecializations.map((spec) => (
                <div key={spec} className="flex items-center space-x-2">
                  <Checkbox
                    id={`spec-${spec}`}
                    checked={formData.specializations.includes(spec)}
                    onCheckedChange={(checked) => handleSpecializationChange(spec, checked as boolean)}
                  />
                  <Label htmlFor={`spec-${spec}`} className="text-sm font-normal">
                    {spec}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
