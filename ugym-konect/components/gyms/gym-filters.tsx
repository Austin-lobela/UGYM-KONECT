"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

export function GymFilters() {
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])

  const facilities = [
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
  ]

  const gymTypes = [
    "Commercial Gym",
    "Boutique Fitness",
    "CrossFit Box",
    "Yoga Studio",
    "Martial Arts",
    "Boxing Gym",
    "Pilates Studio",
    "Rock Climbing",
  ]

  const handleFacilityChange = (facility: string, checked: boolean) => {
    if (checked) {
      setSelectedFacilities([...selectedFacilities, facility])
    } else {
      setSelectedFacilities(selectedFacilities.filter((f) => f !== facility))
    }
  }

  const handleTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setSelectedTypes([...selectedTypes, type])
    } else {
      setSelectedTypes(selectedTypes.filter((t) => t !== type))
    }
  }

  const clearFilters = () => {
    setPriceRange([0, 1000])
    setSelectedFacilities([])
    setSelectedTypes([])
  }

  const activeFiltersCount =
    selectedFacilities.length + selectedTypes.length + (priceRange[0] > 0 || priceRange[1] < 1000 ? 1 : 0)

  return (
    <div className="space-y-6">
      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Active Filters</CardTitle>
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-2">
              {selectedFacilities.map((facility) => (
                <Badge key={facility} variant="secondary" className="text-xs">
                  {facility}
                  <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => handleFacilityChange(facility, false)} />
                </Badge>
              ))}
              {selectedTypes.map((type) => (
                <Badge key={type} variant="secondary" className="text-xs">
                  {type}
                  <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => handleTypeChange(type, false)} />
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Price Range */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Price Range</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Slider value={priceRange} onValueChange={setPriceRange} max={1000} min={0} step={50} className="w-full" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>R{priceRange[0]}</span>
              <span>R{priceRange[1]}+ per month</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gym Type */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Gym Type</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {gymTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={`type-${type}`}
                  checked={selectedTypes.includes(type)}
                  onCheckedChange={(checked) => handleTypeChange(type, checked as boolean)}
                />
                <Label htmlFor={`type-${type}`} className="text-sm font-normal">
                  {type}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Facilities */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Facilities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {facilities.map((facility) => (
              <div key={facility} className="flex items-center space-x-2">
                <Checkbox
                  id={`facility-${facility}`}
                  checked={selectedFacilities.includes(facility)}
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
    </div>
  )
}
