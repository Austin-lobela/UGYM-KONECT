"use client"

import { useState } from "react"
import { ServiceSearch, type SearchData } from "@/components/services/service-search"
import { ServiceFilters, type ServiceFilters } from "@/components/services/service-filters"
import { ServiceList } from "@/components/services/service-list"

export default function ServicesPage() {
  const [filters, setFilters] = useState<ServiceFilters>({
    serviceTypes: [],
    categories: [],
    priceRange: [0, 1000],
    province: "",
    city: "",
    searchTerm: "",
  })
  const [searchData, setSearchData] = useState<SearchData>({
    searchQuery: "",
    location: "",
    serviceType: "",
    province: "",
  })

  const handleFiltersChange = (newFilters: ServiceFilters) => {
    setFilters(newFilters)
  }

  const handleSearch = (newSearchData: SearchData) => {
    setSearchData(newSearchData)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Health & Fitness Services</h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Connect with certified professionals including personal trainers, doctors, dietitians, and health coaches
            across South Africa.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <ServiceSearch onSearch={handleSearch} />
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <ServiceFilters onFiltersChange={handleFiltersChange} />
          </div>

          {/* Service Listings */}
          <div className="lg:col-span-3">
            <ServiceList filters={filters} searchData={searchData} />
          </div>
        </div>
      </div>
    </div>
  )
}
