"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MapPin, Phone, Mail, Globe, Loader2 } from "lucide-react"
import Image from "next/image"
import type { BusinessFormData } from "../business-registration-form"

interface ReviewStepProps {
  formData: BusinessFormData
  onSubmit: () => void
  isSubmitting: boolean
}

export function ReviewStep({ formData, onSubmit, isSubmitting }: ReviewStepProps) {
  const getBusinessTypeLabel = (type: string) => {
    switch (type) {
      case "gym":
        return "Gym / Fitness Center"
      case "service":
        return "Health & Fitness Services"
      case "product":
        return "Product Seller"
      default:
        return type
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-foreground mb-2">Review Your Registration</h3>
        <p className="text-muted-foreground">
          Please review all information before submitting. You can edit details later from your business dashboard.
        </p>
      </div>

      {/* Business Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            {formData.businessName}
            <Badge variant="secondary">{getBusinessTypeLabel(formData.businessType)}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">{formData.description}</p>

          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>
                {formData.address}, {formData.city}, {formData.province}
              </span>
            </div>
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{formData.contactPhone}</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{formData.contactEmail}</span>
            </div>
            {formData.website && (
              <div className="flex items-center">
                <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{formData.website}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Pricing */}
      {formData.pricing.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Pricing & Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {formData.pricing.map((pricing, index) => (
                <div key={index} className="flex justify-between items-start">
                  <div>
                    <div className="font-medium">{pricing.name}</div>
                    {pricing.description && <div className="text-sm text-muted-foreground">{pricing.description}</div>}
                  </div>
                  <div className="font-bold text-primary">{pricing.price}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Facilities/Specializations */}
      {(formData.facilities.length > 0 || formData.specializations.length > 0) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {formData.businessType === "gym" ? "Facilities" : "Specializations"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {(formData.facilities.length > 0 ? formData.facilities : formData.specializations).map((item, index) => (
                <Badge key={index} variant="outline">
                  {item}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Operating Hours */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Operating Hours</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Object.entries(formData.operatingHours).map(([day, hours]) => (
              <div key={day} className="flex justify-between items-center">
                <span className="capitalize font-medium">{day}</span>
                <span className="text-muted-foreground">
                  {hours.closed ? "Closed" : `${hours.open} - ${hours.close}`}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Images */}
      {formData.images.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Business Images ({formData.images.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
              {formData.images.slice(0, 8).map((file, index) => (
                <div key={index} className="aspect-square bg-muted rounded-lg overflow-hidden">
                  <Image
                    src={URL.createObjectURL(file) || "/placeholder.svg"}
                    alt={`Business image ${index + 1}`}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              {formData.images.length > 8 && (
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                  <span className="text-sm text-muted-foreground">+{formData.images.length - 8} more</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <Separator />

      {/* Terms and Submit */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground">
              <p className="mb-2">By submitting this registration, you agree to:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>UGYM-KONECT's Terms of Service and Privacy Policy</li>
                <li>Platform commission fees (30% for product sales)</li>
                <li>Maintaining accurate and up-to-date business information</li>
                <li>Providing quality services to platform users</li>
              </ul>
            </div>

            <Button onClick={onSubmit} disabled={isSubmitting} size="lg" className="w-full">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting Registration...
                </>
              ) : (
                "Submit Business Registration"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
