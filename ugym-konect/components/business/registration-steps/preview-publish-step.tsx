"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MapPin, Phone, Mail, Globe, MessageCircle, Building2, Package, Users } from "lucide-react"
import type { BusinessFormData } from "../business-registration-form"

interface PreviewPublishStepProps {
  formData: BusinessFormData
  onSubmit: () => void
  isSubmitting: boolean
}

export function PreviewPublishStep({ formData, onSubmit, isSubmitting }: PreviewPublishStepProps) {
  const getBusinessTypeIcon = () => {
    switch (formData.businessType) {
      case "gym":
        return <Building2 className="h-5 w-5 text-[#FF9100]" />
      case "service_provider":
        return <Users className="h-5 w-5 text-[#FF9100]" />
      case "product_seller":
        return <Package className="h-5 w-5 text-[#FF9100]" />
      case "multi":
        return <Building2 className="h-5 w-5 text-[#FF9100]" />
      default:
        return null
    }
  }

  const getBusinessTypeLabel = () => {
    switch (formData.businessType) {
      case "gym":
        return "Gym"
      case "service_provider":
        return "Service Provider"
      case "product_seller":
        return "Product Seller"
      case "multi":
        return "Multi-Service Business"
      default:
        return ""
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Review Your Business Profile</h3>
        <p className="text-gray-600">
          Please review all information before submitting. Your business will be reviewed and approved before going
          live.
        </p>
      </div>

      {/* Business Overview */}
      <Card className="border-gray-200">
        <CardHeader>
          <div className="flex items-center space-x-3">
            {getBusinessTypeIcon()}
            <div>
              <CardTitle className="text-gray-900">{formData.name}</CardTitle>
              <CardDescription>{getBusinessTypeLabel()}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700">{formData.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-gray-700">
                  {formData.location.suburb}, {formData.location.city}, {formData.location.province}
                </span>
              </div>

              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4 text-gray-500" />
                <span className="text-gray-700">{formData.contact.phone}</span>
              </div>

              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4 text-gray-500" />
                <span className="text-gray-700">{formData.contact.email}</span>
              </div>
            </div>

            <div className="space-y-3">
              {formData.contact.website && (
                <div className="flex items-center space-x-2 text-sm">
                  <Globe className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">{formData.contact.website}</span>
                </div>
              )}

              {formData.contact.whatsapp && (
                <div className="flex items-center space-x-2 text-sm">
                  <MessageCircle className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">{formData.contact.whatsapp}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Services */}
      {formData.services.length > 0 && (
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900">Services Offered</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {formData.services.map((service) => (
                <Badge key={service} variant="secondary" className="bg-orange-100 text-orange-800">
                  {service}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Products */}
      {formData.products.length > 0 && (
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900">Products ({formData.products.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {formData.products.map((product, index) => (
                <div key={product.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">{product.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-[#FF9100] font-semibold">R{product.price.toFixed(2)}</span>
                        <Badge variant="outline" className="border-gray-300 text-xs">
                          {product.category}
                        </Badge>
                        <span className="text-xs text-gray-500">{product.images.length} images</span>
                      </div>
                      {product.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {product.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  {index < formData.products.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Submission Notice */}
      <Card className="border-[#FF9100] bg-orange-50">
        <CardContent className="p-6">
          <h4 className="font-semibold text-gray-900 mb-2">What happens next?</h4>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>• Your business will be submitted for review with status "pending_review"</li>
            <li>• Our team will verify your information and credentials</li>
            <li>• You'll receive an email confirmation once approved</li>
            <li>• Approved businesses appear in search results and can receive bookings</li>
            <li>• The review process typically takes 1-3 business days</li>
          </ul>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-center">
        <Button
          onClick={onSubmit}
          disabled={isSubmitting}
          size="lg"
          className="bg-[#FF9100] hover:bg-[#FF9100]/90 text-white px-8"
        >
          {isSubmitting ? "Submitting for Review..." : "Submit for Review"}
        </Button>
      </div>
    </div>
  )
}
