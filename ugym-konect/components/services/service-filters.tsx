"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { X, MapPin, DollarSign, Filter } from "lucide-react"
import {
  SERVICE_CATEGORIES,
  SOUTH_AFRICAN_PROVINCES,
  MAJOR_CITIES,
  type ServiceCategory,
} from "@/lib/constants/service-taxonomy"

interface ServiceFiltersProps {
  onFiltersChange?: (filters: ServiceFilters) => void
}

export interface ServiceFilters {
  serviceTypes: string[]
  categories: ServiceCategory[]
  priceRange: [number, number]
  province: string
  city: string
  searchTerm: string
}

export function ServiceFilters({ onFiltersChange }: ServiceFiltersProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  const [selectedServiceTypes, setSelectedServiceTypes] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<ServiceCategory[]>([])
  const [selectedProvince, setSelectedProvince] = useState<string>("")
  const [selectedCity, setSelectedCity] = useState<string>("")
  const [searchTerm, setSearchTerm] = useState<string>("")

  const handleServiceTypeChange = (serviceType: string, checked: boolean) => {
    const updated = checked
      ? [...selectedServiceTypes, serviceType]
      : selectedServiceTypes.filter((s) => s !== serviceType)

    setSelectedServiceTypes(updated)
    notifyFiltersChange({ serviceTypes: updated })
  }

  const handleCategoryChange = (category: ServiceCategory, checked: boolean) => {
    const updated = checked ? [...selectedCategories, category] : selectedCategories.filter((c) => c !== category)

    setSelectedCategories(updated)
    notifyFiltersChange({ categories: updated })
  }

  const handlePriceRangeChange = (newRange: [number, number]) => {
    setPriceRange(newRange)
    notifyFiltersChange({ priceRange: newRange })
  }

  const handleProvinceChange = (province: string) => {
    setSelectedProvince(province)
    setSelectedCity("") // Reset city when province changes
    notifyFiltersChange({ province, city: "" })
  }

  const handleCityChange = (city: string) => {
    setSelectedCity(city)
    notifyFiltersChange({ city })
  }

  const handleSearchChange = (term: string) => {
    setSearchTerm(term)
    notifyFiltersChange({ searchTerm: term })
  }

  const notifyFiltersChange = (partialFilters: Partial<ServiceFilters>) => {
    if (onFiltersChange) {
      onFiltersChange({
        serviceTypes: selectedServiceTypes,
        categories: selectedCategories,
        priceRange,
        province: selectedProvince,
        city: selectedCity,
        searchTerm,
        ...partialFilters,
      })
    }
  }

  const clearFilters = () => {
    setPriceRange([0, 1000])
    setSelectedServiceTypes([])
    setSelectedCategories([])
    setSelectedProvince("")
    setSelectedCity("")
    setSearchTerm("")

    if (onFiltersChange) {
      onFiltersChange({
        serviceTypes: [],
        categories: [],
        priceRange: [0, 1000],
        province: "",
        city: "",
        searchTerm: "",
      })
    }
  }

  const activeFiltersCount =
    selectedServiceTypes.length +
    selectedCategories.length +
    (priceRange[0] > 0 || priceRange[1] < 1000 ? 1 : 0) +
    (selectedProvince ? 1 : 0) +
    (selectedCity ? 1 : 0) +
    (searchTerm ? 1 : 0)

  const availableCities =
    selectedProvince && selectedProvince in MAJOR_CITIES
      ? MAJOR_CITIES[selectedProvince as keyof typeof MAJOR_CITIES]
      : []

  return (
    <div className="space-y-6">
      {/* Search */}
      <Card className="border-gray-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-gray-900 flex items-center">
            <Filter className="mr-2 h-5 w-5 text-[#FF9100]" />
            Search & Filter
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <Input
            placeholder="Search services, specializations..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full"
          />
        </CardContent>
      </Card>

      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <Card className="border-[#FF9100] bg-orange-50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-gray-900">Active Filters ({activeFiltersCount})</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-[#FF9100] hover:text-[#FF9100]/80 hover:bg-orange-100"
              >
                Clear All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-2">
              {selectedCategories.map((category) => (
                <Badge key={category} variant="secondary" className="bg-[#FF9100] text-white">
                  {category}
                  <X
                    className="ml-1 h-3 w-3 cursor-pointer hover:text-gray-200"
                    onClick={() => handleCategoryChange(category, false)}
                  />
                </Badge>
              ))}
              {selectedServiceTypes.map((type) => (
                <Badge key={type} variant="secondary" className="bg-orange-200 text-orange-800">
                  {type}
                  <X
                    className="ml-1 h-3 w-3 cursor-pointer hover:text-orange-600"
                    onClick={() => handleServiceTypeChange(type, false)}
                  />
                </Badge>
              ))}
              {selectedProvince && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  {selectedProvince}
                  <X
                    className="ml-1 h-3 w-3 cursor-pointer hover:text-blue-600"
                    onClick={() => handleProvinceChange("")}
                  />
                </Badge>
              )}
              {selectedCity && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {selectedCity}
                  <X
                    className="ml-1 h-3 w-3 cursor-pointer hover:text-green-600"
                    onClick={() => handleCityChange("")}
                  />
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Location */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg text-gray-900 flex items-center">
            <MapPin className="mr-2 h-5 w-5 text-[#FF9100]" />
            Location
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-gray-700 mb-2 block">Province</Label>
            <Select value={selectedProvince} onValueChange={handleProvinceChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select province" />
              </SelectTrigger>
              <SelectContent>
                {SOUTH_AFRICAN_PROVINCES.map((province) => (
                  <SelectItem key={province} value={province}>
                    {province}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {availableCities.length > 0 && (
            <div>
              <Label className="text-gray-700 mb-2 block">City</Label>
              <Select value={selectedCity} onValueChange={handleCityChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  {availableCities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Price Range */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg text-gray-900 flex items-center">
            <DollarSign className="mr-2 h-5 w-5 text-[#FF9100]" />
            Price Range
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Slider
              value={priceRange}
              onValueChange={handlePriceRangeChange}
              max={1000}
              min={0}
              step={50}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>R{priceRange[0]}</span>
              <span>R{priceRange[1]}+ per session</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Service Categories */}
      {Object.entries(SERVICE_CATEGORIES).map(([categoryName, services]) => (
        <Card key={categoryName} className="border-gray-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-gray-900">{categoryName}</CardTitle>
              <Checkbox
                checked={selectedCategories.includes(categoryName as ServiceCategory)}
                onCheckedChange={(checked) => handleCategoryChange(categoryName as ServiceCategory, checked as boolean)}
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-48 overflow-y-auto">
              {services.map((service) => (
                <div key={service} className="flex items-center space-x-2">
                  <Checkbox
                    id={`service-${service}`}
                    checked={selectedServiceTypes.includes(service)}
                    onCheckedChange={(checked) => handleServiceTypeChange(service, checked as boolean)}
                  />
                  <Label htmlFor={`service-${service}`} className="text-sm font-normal text-gray-700 cursor-pointer">
                    {service}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
