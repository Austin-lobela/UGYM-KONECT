"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

export function ProductFilters() {
  const [priceRange, setPriceRange] = useState([0, 2000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])

  const categories = [
    "Supplements",
    "Fitness Equipment",
    "Fitness Apparel",
    "Accessories",
    "Sports Nutrition",
    "Recovery Products",
    "Home Gym",
    "Cardio Equipment",
    "Strength Training",
    "Yoga & Pilates",
  ]

  const brands = [
    "Nike",
    "Adidas",
    "Under Armour",
    "Optimum Nutrition",
    "BSN",
    "Dymatize",
    "Reebok",
    "Puma",
    "TRX",
    "Bowflex",
  ]

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category])
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    }
  }

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brand])
    } else {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand))
    }
  }

  const clearFilters = () => {
    setPriceRange([0, 2000])
    setSelectedCategories([])
    setSelectedBrands([])
  }

  const activeFiltersCount =
    selectedCategories.length + selectedBrands.length + (priceRange[0] > 0 || priceRange[1] < 2000 ? 1 : 0)

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
              {selectedCategories.map((category) => (
                <Badge key={category} variant="secondary" className="text-xs">
                  {category}
                  <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => handleCategoryChange(category, false)} />
                </Badge>
              ))}
              {selectedBrands.map((brand) => (
                <Badge key={brand} variant="secondary" className="text-xs">
                  {brand}
                  <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => handleBrandChange(brand, false)} />
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
            <Slider value={priceRange} onValueChange={setPriceRange} max={2000} min={0} step={50} className="w-full" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>R{priceRange[0]}</span>
              <span>R{priceRange[1]}+</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category}`}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                />
                <Label htmlFor={`category-${category}`} className="text-sm font-normal">
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Brands */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Brands</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {brands.map((brand) => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox
                  id={`brand-${brand}`}
                  checked={selectedBrands.includes(brand)}
                  onCheckedChange={(checked) => handleBrandChange(brand, checked as boolean)}
                />
                <Label htmlFor={`brand-${brand}`} className="text-sm font-normal">
                  {brand}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
