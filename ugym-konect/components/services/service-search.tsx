"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import { ALL_SERVICES, SOUTH_AFRICAN_PROVINCES } from "@/lib/constants/service-taxonomy"

interface ServiceSearchProps {
  onSearch?: (searchData: SearchData) => void
}

export interface SearchData {
  searchQuery: string
  location: string
  serviceType: string
  province: string
}

export function ServiceSearch({ onSearch }: ServiceSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [location, setLocation] = useState("")
  const [serviceType, setServiceType] = useState("All Services")
  const [province, setProvince] = useState("All Provinces")

  const handleSearch = () => {
    const searchData: SearchData = {
      searchQuery,
      location,
      serviceType,
      province,
    }

    console.log("Searching for:", searchData)

    if (onSearch) {
      onSearch(searchData)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div className="grid md:grid-cols-5 gap-4">
        {/* Search Query */}
        <div className="relative md:col-span-2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search services, professionals, specializations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pl-10 h-12 border-gray-300 focus:border-[#FF9100] focus:ring-[#FF9100]"
          />
        </div>

        {/* Service Type */}
        <Select value={serviceType} onValueChange={setServiceType}>
          <SelectTrigger className="h-12 border-gray-300 focus:border-[#FF9100] focus:ring-[#FF9100]">
            <SelectValue placeholder="Service Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Services">All Services</SelectItem>
            {ALL_SERVICES.map((service) => (
              <SelectItem key={service} value={service}>
                {service}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Province */}
        <Select value={province} onValueChange={setProvince}>
          <SelectTrigger className="h-12 border-gray-300 focus:border-[#FF9100] focus:ring-[#FF9100]">
            <SelectValue placeholder="Province" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Provinces">All Provinces</SelectItem>
            {SOUTH_AFRICAN_PROVINCES.map((prov) => (
              <SelectItem key={prov} value={prov}>
                {prov}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Search Button */}
        <Button onClick={handleSearch} className="h-12 px-8 bg-[#FF9100] hover:bg-[#FF9100]/90 text-white">
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
      </div>

      {/* Quick Filters */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-gray-600 mr-2">Popular:</span>
          {["Personal Trainer", "Physiotherapist", "Dietitian/Nutritionist", "Sports Physician", "Yoga Instructor"].map(
            (popular) => (
              <Button
                key={popular}
                variant="outline"
                size="sm"
                onClick={() => setServiceType(popular)}
                className="text-xs border-gray-300 text-gray-700 hover:border-[#FF9100] hover:text-[#FF9100] hover:bg-orange-50"
              >
                {popular}
              </Button>
            ),
          )}
        </div>
      </div>
    </div>
  )
}
