"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { BusinessFormData } from "../business-registration-form"

interface LocationStepProps {
  formData: BusinessFormData
  updateFormData: (updates: Partial<BusinessFormData>) => void
}

const southAfricanProvinces = [
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

export function LocationStep({ formData, updateFormData }: LocationStepProps) {
  const handleChange = (field: keyof BusinessFormData, value: string) => {
    updateFormData({ [field]: value })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="address">Street Address *</Label>
        <Input
          id="address"
          value={formData.address}
          onChange={(e) => handleChange("address", e.target.value)}
          placeholder="123 Main Street, Suburb"
          required
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="city">City *</Label>
          <Input
            id="city"
            value={formData.city}
            onChange={(e) => handleChange("city", e.target.value)}
            placeholder="Johannesburg"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="province">Province *</Label>
          <Select value={formData.province} onValueChange={(value) => handleChange("province", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select province" />
            </SelectTrigger>
            <SelectContent>
              {southAfricanProvinces.map((province) => (
                <SelectItem key={province} value={province}>
                  {province}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="postalCode">Postal Code</Label>
          <Input
            id="postalCode"
            value={formData.postalCode}
            onChange={(e) => handleChange("postalCode", e.target.value)}
            placeholder="2000"
          />
        </div>
      </div>

      <div className="bg-muted/30 rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-4">Operating Hours</h4>
        <div className="space-y-3">
          {Object.entries(formData.operatingHours).map(([day, hours]) => (
            <div key={day} className="grid grid-cols-4 gap-4 items-center">
              <div className="capitalize font-medium">{day}</div>
              <div className="flex items-center space-x-2">
                <Input
                  type="time"
                  value={hours.open}
                  onChange={(e) =>
                    updateFormData({
                      operatingHours: {
                        ...formData.operatingHours,
                        [day]: { ...hours, open: e.target.value },
                      },
                    })
                  }
                  disabled={hours.closed}
                  className="text-sm"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="time"
                  value={hours.close}
                  onChange={(e) =>
                    updateFormData({
                      operatingHours: {
                        ...formData.operatingHours,
                        [day]: { ...hours, close: e.target.value },
                      },
                    })
                  }
                  disabled={hours.closed}
                  className="text-sm"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={hours.closed}
                  onChange={(e) =>
                    updateFormData({
                      operatingHours: {
                        ...formData.operatingHours,
                        [day]: { ...hours, closed: e.target.checked },
                      },
                    })
                  }
                  className="rounded"
                />
                <span className="text-sm text-muted-foreground">Closed</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
