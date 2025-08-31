"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, Mail, Star, Clock, Award, MessageCircle, Calendar } from "lucide-react"
import Image from "next/image"
import type { ServiceFilters } from "./service-filters"
import type { SearchData } from "./service-search"

const mockServices = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    title: "Sports Medicine Doctor",
    serviceTypes: ["Sports Physician", "GP (Sports Focus)"],
    category: "Medical",
    specializations: ["Sports Performance", "Injury Rehabilitation", "Chronic Disease Management"],
    description:
      "Board-certified sports medicine physician with 10+ years of experience helping athletes and fitness enthusiasts achieve their goals safely.",
    location: { city: "Sandton", province: "Gauteng" },
    pricing: { min: 350, max: 500, currency: "ZAR" },
    rating: 4.9,
    reviews: 87,
    image: "/professional-doctor-woman.png",
    contact: { phone: "+27 11 234 5678", email: "dr.sarah@sportsmed.co.za" },
    availability: "Mon-Fri: 8AM-6PM",
    experience: "10+ years",
    qualifications: ["MBChB", "Sports Medicine Specialist", "FIFA Medical Certificate"],
    verified: true,
    languages: ["English", "Afrikaans"],
  },
  {
    id: 2,
    name: "Mike Thompson",
    title: "Certified Personal Trainer",
    serviceTypes: ["Personal Trainer", "Strength & Conditioning Coach"],
    category: "Fitness & Coaching",
    specializations: ["Weight Loss", "Muscle Building", "Functional Movement"],
    description: "ACSM certified personal trainer specializing in strength training and body transformation programs.",
    location: { city: "Cape Town", province: "Western Cape" },
    pricing: { min: 180, max: 250, currency: "ZAR" },
    rating: 4.8,
    reviews: 124,
    image: "/professional-man-cto.png",
    contact: { phone: "+27 21 345 6789", email: "mike@fitnessfirst.co.za" },
    availability: "Mon-Sat: 6AM-8PM",
    experience: "7 years",
    qualifications: ["ACSM Certified", "Nutrition Specialist", "TRX Instructor"],
    verified: true,
    languages: ["English"],
  },
  {
    id: 3,
    name: "Lisa Chen",
    title: "Registered Dietitian",
    serviceTypes: ["Dietitian/Nutritionist", "Sports Nutritionist"],
    category: "Health & Wellness",
    specializations: ["Nutrition Planning", "Weight Loss", "Sports Nutrition"],
    description:
      "Registered dietitian helping clients achieve optimal health through personalized nutrition plans and lifestyle coaching.",
    location: { city: "Durban", province: "KwaZulu-Natal" },
    pricing: { min: 220, max: 300, currency: "ZAR" },
    rating: 4.7,
    reviews: 96,
    image: "/professional-woman-ceo.png",
    contact: { phone: "+27 31 456 7890", email: "lisa@nutritionpro.co.za" },
    availability: "Tue-Sat: 9AM-5PM",
    experience: "8 years",
    qualifications: ["BSc Dietetics", "Sports Nutrition Certified", "Diabetes Educator"],
    verified: true,
    languages: ["English", "Mandarin"],
  },
  {
    id: 4,
    name: "James Wilson",
    title: "Physiotherapist",
    serviceTypes: ["Physiotherapist"],
    category: "Health & Wellness",
    specializations: ["Injury Rehabilitation", "Sports Performance", "Flexibility & Mobility"],
    description:
      "Experienced physiotherapist specializing in sports injuries and movement rehabilitation for athletes and active individuals.",
    location: { city: "Pretoria", province: "Gauteng" },
    pricing: { min: 280, max: 350, currency: "ZAR" },
    rating: 4.8,
    reviews: 73,
    image: "/placeholder.svg?height=200&width=200&text=James+Wilson",
    contact: { phone: "+27 12 567 8901", email: "james@physiocare.co.za" },
    availability: "Mon-Fri: 7AM-7PM",
    experience: "12 years",
    qualifications: ["BSc Physiotherapy", "Sports Physiotherapy", "Dry Needling Certified"],
    verified: true,
    languages: ["English", "Afrikaans"],
  },
  {
    id: 5,
    name: "Priya Patel",
    title: "Yoga Instructor & Wellness Coach",
    serviceTypes: ["Yoga Instructor", "Wellness Coach"],
    category: "Fitness & Coaching",
    specializations: ["Stress Management", "Flexibility & Mobility", "Mental Health"],
    description:
      "Certified yoga instructor and wellness coach with expertise in mindfulness, stress reduction, and holistic health approaches.",
    location: { city: "Johannesburg", province: "Gauteng" },
    pricing: { min: 150, max: 200, currency: "ZAR" },
    rating: 4.9,
    reviews: 156,
    image: "/placeholder.svg?height=200&width=200&text=Priya+Patel",
    contact: { phone: "+27 11 789 0123", email: "priya@mindfulmovement.co.za" },
    availability: "Mon-Sun: 6AM-8PM",
    experience: "6 years",
    qualifications: ["RYT-500", "Wellness Coach Certified", "Mindfulness Instructor"],
    verified: true,
    languages: ["English", "Hindi", "Gujarati"],
  },
  {
    id: 6,
    name: "Thabo Mthembu",
    title: "Biokineticist",
    serviceTypes: ["Biokineticist"],
    category: "Health & Wellness",
    specializations: ["Injury Prevention", "Chronic Disease Management", "Sports Performance"],
    description:
      "Qualified biokineticist specializing in exercise therapy and rehabilitation for chronic conditions and sports injuries.",
    location: { city: "Bloemfontein", province: "Free State" },
    pricing: { min: 200, max: 280, currency: "ZAR" },
    rating: 4.6,
    reviews: 42,
    image: "/placeholder.svg?height=200&width=200&text=Thabo+Mthembu",
    contact: { phone: "+27 51 234 5678", email: "thabo@biokinetics.co.za" },
    availability: "Mon-Fri: 8AM-5PM",
    experience: "9 years",
    qualifications: ["BSc Biokinetics", "ACSM Certified", "Chronic Disease Specialist"],
    verified: true,
    languages: ["English", "Sesotho", "Zulu"],
  },
]

interface ServiceListProps {
  filters?: ServiceFilters
  searchData?: SearchData
}

export function ServiceList({ filters, searchData }: ServiceListProps) {
  const [sortBy, setSortBy] = useState("rating")
  const [filteredServices, setFilteredServices] = useState(mockServices)

  useEffect(() => {
    let filtered = [...mockServices]

    // Apply search term filter
    if (searchData?.searchQuery) {
      const searchLower = searchData.searchQuery.toLowerCase()
      filtered = filtered.filter(
        (service) =>
          service.name.toLowerCase().includes(searchLower) ||
          service.title.toLowerCase().includes(searchLower) ||
          service.description.toLowerCase().includes(searchLower) ||
          service.serviceTypes.some((type) => type.toLowerCase().includes(searchLower)) ||
          service.specializations.some((spec) => spec.toLowerCase().includes(searchLower)),
      )
    }

    // Apply service type filter from search
    if (searchData?.serviceType) {
      filtered = filtered.filter((service) => service.serviceTypes.includes(searchData.serviceType))
    }

    // Apply province filter from search
    if (searchData?.province) {
      filtered = filtered.filter((service) => service.location.province === searchData.province)
    }

    // Apply advanced filters
    if (filters) {
      // Service types filter
      if (filters.serviceTypes.length > 0) {
        filtered = filtered.filter((service) =>
          service.serviceTypes.some((type) => filters.serviceTypes.includes(type)),
        )
      }

      // Categories filter
      if (filters.categories.length > 0) {
        filtered = filtered.filter((service) => filters.categories.includes(service.category as any))
      }

      // Price range filter
      if (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) {
        filtered = filtered.filter(
          (service) => service.pricing.min >= filters.priceRange[0] && service.pricing.min <= filters.priceRange[1],
        )
      }

      // Province filter
      if (filters.province) {
        filtered = filtered.filter((service) => service.location.province === filters.province)
      }

      // City filter
      if (filters.city) {
        filtered = filtered.filter((service) => service.location.city === filters.city)
      }

      // Search term filter
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase()
        filtered = filtered.filter(
          (service) =>
            service.name.toLowerCase().includes(searchLower) ||
            service.title.toLowerCase().includes(searchLower) ||
            service.description.toLowerCase().includes(searchLower) ||
            service.serviceTypes.some((type) => type.toLowerCase().includes(searchLower)) ||
            service.specializations.some((spec) => spec.toLowerCase().includes(searchLower)),
        )
      }
    }

    setFilteredServices(filtered)
  }, [filters, searchData])

  const sortedServices = [...filteredServices].sort((a, b) => {
    switch (sortBy) {
      case "price":
        return a.pricing.min - b.pricing.min
      case "rating":
        return b.rating - a.rating
      case "name":
        return a.name.localeCompare(b.name)
      case "experience":
        return Number.parseInt(b.experience.replace(/\D/g, "")) - Number.parseInt(a.experience.replace(/\D/g, ""))
      case "reviews":
        return b.reviews - a.reviews
      default:
        return 0
    }
  })

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{filteredServices.length} Professionals Found</h2>
          <p className="text-gray-600">Certified health and fitness professionals</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Sort by:</span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[140px] border-gray-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="price">Price</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="experience">Experience</SelectItem>
              <SelectItem value="reviews">Reviews</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* No Results */}
      {filteredServices.length === 0 && (
        <Card className="border-gray-200">
          <CardContent className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No professionals found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Clear All Filters
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Service Cards */}
      <div className="space-y-6">
        {sortedServices.map((service) => (
          <Card
            key={service.id}
            className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-gray-200"
          >
            <div className="grid md:grid-cols-4 gap-0">
              {/* Image */}
              <div className="relative h-48 md:h-full">
                <Image src={service.image || "/placeholder.svg"} alt={service.name} fill className="object-cover" />
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  <Badge className="bg-[#FF9100] text-white">{service.category}</Badge>
                  {service.verified && <Badge className="bg-green-500 text-white text-xs">Verified</Badge>}
                </div>
              </div>

              {/* Content */}
              <div className="md:col-span-3">
                <CardHeader className="pb-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{service.name}</h3>
                      <p className="text-[#FF9100] font-medium mb-2">{service.title}</p>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="ml-1 font-medium">{service.rating}</span>
                          <span className="text-gray-500 ml-1">({service.reviews} reviews)</span>
                        </div>
                      </div>
                      <div className="flex items-center text-gray-500 mb-3">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">
                          {service.location.city}, {service.location.province}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-[#FF9100]">
                        R{service.pricing.min}
                        {service.pricing.max > service.pricing.min && `-${service.pricing.max}`}
                      </div>
                      <div className="text-sm text-gray-500">per session</div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{service.description}</p>

                  {/* Service Types */}
                  <div className="mb-3">
                    <span className="text-xs font-medium text-gray-700 mb-2 block">Services:</span>
                    <div className="flex flex-wrap gap-1">
                      {service.serviceTypes.map((type) => (
                        <Badge key={type} variant="outline" className="text-xs border-[#FF9100] text-[#FF9100]">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Specializations */}
                  <div className="mb-4">
                    <span className="text-xs font-medium text-gray-700 mb-2 block">Specializations:</span>
                    <div className="flex flex-wrap gap-1">
                      {service.specializations.slice(0, 3).map((spec) => (
                        <Badge key={spec} variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                          {spec}
                        </Badge>
                      ))}
                      {service.specializations.length > 3 && (
                        <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                          +{service.specializations.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Experience & Availability */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="flex items-center text-gray-500">
                      <Award className="h-4 w-4 mr-2 text-[#FF9100]" />
                      <span>{service.experience} experience</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Clock className="h-4 w-4 mr-2 text-[#FF9100]" />
                      <span>{service.availability}</span>
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="mb-4">
                    <span className="text-xs font-medium text-gray-700 mr-2">Languages:</span>
                    <span className="text-sm text-gray-600">{service.languages.join(", ")}</span>
                  </div>

                  {/* Contact & Actions */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row gap-4 text-sm">
                      <div className="flex items-center text-gray-500">
                        <Phone className="h-4 w-4 mr-1 text-[#FF9100]" />
                        <span>{service.contact.phone}</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <Mail className="h-4 w-4 mr-1 text-[#FF9100]" />
                        <span>{service.contact.email}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                      >
                        View Profile
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[#FF9100] text-[#FF9100] hover:bg-orange-50 bg-transparent"
                      >
                        <MessageCircle className="mr-1 h-4 w-4" />
                        Contact
                      </Button>
                      <Button size="sm" className="bg-[#FF9100] hover:bg-[#FF9100]/90 text-white">
                        <Calendar className="mr-1 h-4 w-4" />
                        Book
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Load More */}
      {filteredServices.length > 0 && (
        <div className="text-center pt-8">
          <Button variant="outline" size="lg" className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent">
            Load More Professionals
          </Button>
        </div>
      )}
    </div>
  )
}
