"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { BusinessFormData } from "../business-registration-form"

interface BasicInfoStepProps {
  formData: BusinessFormData
  updateFormData: (updates: Partial<BusinessFormData>) => void
}

export function BasicInfoStep({ formData, updateFormData }: BasicInfoStepProps) {
  const handleChange = (field: keyof BusinessFormData, value: string) => {
    updateFormData({ [field]: value })
  }

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="businessName">Business Name *</Label>
          <Input
            id="businessName"
            value={formData.businessName}
            onChange={(e) => handleChange("businessName", e.target.value)}
            placeholder="Enter your business name"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="website">Website (Optional)</Label>
          <Input
            id="website"
            value={formData.website}
            onChange={(e) => handleChange("website", e.target.value)}
            placeholder="https://www.yourbusiness.com"
            type="url"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Business Description *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Describe your business, services, and what makes you unique..."
          rows={4}
          required
        />
        <p className="text-sm text-muted-foreground">
          This description will be shown to potential customers. Make it engaging and informative.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="contactEmail">Contact Email *</Label>
          <Input
            id="contactEmail"
            value={formData.contactEmail}
            onChange={(e) => handleChange("contactEmail", e.target.value)}
            placeholder="contact@yourbusiness.com"
            type="email"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contactPhone">Contact Phone *</Label>
          <Input
            id="contactPhone"
            value={formData.contactPhone}
            onChange={(e) => handleChange("contactPhone", e.target.value)}
            placeholder="+27 11 123 4567"
            type="tel"
            required
          />
        </div>
      </div>

      <div className="bg-muted/30 rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-2">Social Media (Optional)</h4>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="facebook">Facebook</Label>
            <Input
              id="facebook"
              value={formData.socialMedia.facebook}
              onChange={(e) =>
                updateFormData({
                  socialMedia: { ...formData.socialMedia, facebook: e.target.value },
                })
              }
              placeholder="Facebook page URL"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="instagram">Instagram</Label>
            <Input
              id="instagram"
              value={formData.socialMedia.instagram}
              onChange={(e) =>
                updateFormData({
                  socialMedia: { ...formData.socialMedia, instagram: e.target.value },
                })
              }
              placeholder="Instagram handle"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="twitter">Twitter</Label>
            <Input
              id="twitter"
              value={formData.socialMedia.twitter}
              onChange={(e) =>
                updateFormData({
                  socialMedia: { ...formData.socialMedia, twitter: e.target.value },
                })
              }
              placeholder="Twitter handle"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
