"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, Mail, Star, Clock } from "lucide-react"
import Image from "next/image"

// Mock gym data
const mockGyms = [
  {
    id: 1,
    name: "FitZone Sandton",
    description: "Premium fitness facility with state-of-the-art equipment and expert trainers.",
    location: "Sandton, Johannesburg",
    price: "R450/month",
    rating: 4.8,
    reviews: 124,
    image: "/modern-gym-interior.png",
    facilities: ["Swimming Pool", "Sauna", "Personal Training", "Group Classes", "Parking"],
    contact: {
      phone: "+27 11 123 4567",
      email: "info@fitzonesandton.co.za",
    },
    hours: "Mon-Fri: 5AM-10PM, Sat-Sun: 6AM-8PM",
    type: "Commercial Gym",
  },
  {
    id: 2,
    name: "CrossFit Cape Town",
    description: "High-intensity functional fitness training in a supportive community environment.",
    location: "Green Point, Cape Town",
    price: "R650/month",
    rating: 4.9,
    reviews: 89,
    image: "/placeholder-0whpe.png",
    facilities: ["CrossFit Equipment", "Personal Training", "Group Classes", "Parking"],
    contact: {
      phone: "+27 21 456 7890",
      email: "hello@crossfitcpt.co.za",
    },
    hours: "Mon-Fri: 5:30AM-9PM, Sat-Sun: 7AM-6PM",
    type: "CrossFit Box",
  },
  {
    id: 3,
    name: "Yoga Bliss Studio",
    description: "Peaceful yoga studio offering various styles from beginner to advanced levels.",
    location: "Stellenbosch, Western Cape",
    price: "R380/month",
    rating: 4.7,
    reviews: 67,
    image: "/peaceful-yoga-studio.png",
    facilities: ["Yoga Props", "Meditation Room", "Air Conditioning", "Parking"],
    contact: {
      phone: "+27 21 789 0123",
      email: "namaste@yogabliss.co.za",
    },
    hours: "Mon-Fri: 6AM-9PM, Sat-Sun: 7AM-7PM",
    type: "Yoga Studio",
  },
  {
    id: 4,
    name: "Iron Temple Gym",
    description: "Hardcore bodybuilding gym with heavy-duty equipment and serious atmosphere.",
    location: "Durban North, KwaZulu-Natal",
    price: "R320/month",
    rating: 4.6,
    reviews: 156,
    image: "/placeholder-q7br8.png",
    facilities: ["Free Weights", "Cardio Equipment", "Locker Rooms", "24/7 Access"],
    contact: {
      phone: "+27 31 234 5678",
      email: "info@irontemple.co.za",
    },
    hours: "24/7 Access",
    type: "Commercial Gym",
  },
  {
    id: 5,
    name: "Aqua Fitness Center",
    description: "Full-service fitness center with Olympic-size pool and aqua aerobics classes.",
    location: "Pretoria East, Gauteng",
    price: "R520/month",
    rating: 4.5,
    reviews: 98,
    image: "/placeholder-ppeos.png",
    facilities: ["Swimming Pool", "Sauna", "Steam Room", "Group Classes", "Juice Bar"],
    contact: {
      phone: "+27 12 345 6789",
      email: "swim@aquafitness.co.za",
    },
    hours: "Mon-Fri: 5AM-10PM, Sat-Sun: 6AM-9PM",
    type: "Commercial Gym",
  },
  {
    id: 6,
    name: "Boutique Fitness Studio",
    description: "Intimate fitness studio specializing in HIIT, Pilates, and small group training.",
    location: "Camps Bay, Cape Town",
    price: "R750/month",
    rating: 4.9,
    reviews: 43,
    image: "/placeholder-k5w34.png",
    facilities: ["Personal Training", "Group Classes", "Air Conditioning", "Parking"],
    contact: {
      phone: "+27 21 567 8901",
      email: "hello@boutiquefitness.co.za",
    },
    hours: "Mon-Fri: 6AM-8PM, Sat-Sun: 7AM-6PM",
    type: "Boutique Fitness",
  },
]

export function GymList() {
  const [sortBy, setSortBy] = useState("rating")
  const [gyms] = useState(mockGyms)

  const sortedGyms = [...gyms].sort((a, b) => {
    switch (sortBy) {
      case "price":
        return Number.parseInt(a.price.replace(/\D/g, "")) - Number.parseInt(b.price.replace(/\D/g, ""))
      case "rating":
        return b.rating - a.rating
      case "name":
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">{gyms.length} Gyms Found</h2>
          <p className="text-muted-foreground">Showing results for your search</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="price">Price</SelectItem>
              <SelectItem value="name">Name</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Gym Cards */}
      <div className="space-y-6">
        {sortedGyms.map((gym) => (
          <Card key={gym.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="grid md:grid-cols-3 gap-0">
              {/* Image */}
              <div className="relative h-48 md:h-full">
                <Image src={gym.image || "/placeholder.svg"} alt={gym.name} fill className="object-cover" />
                <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">{gym.type}</Badge>
              </div>

              {/* Content */}
              <div className="md:col-span-2">
                <CardHeader className="pb-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">{gym.name}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="ml-1 font-medium">{gym.rating}</span>
                          <span className="text-muted-foreground ml-1">({gym.reviews} reviews)</span>
                        </div>
                      </div>
                      <div className="flex items-center text-muted-foreground mb-3">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">{gym.location}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{gym.price}</div>
                      <div className="text-sm text-muted-foreground">per month</div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{gym.description}</p>

                  {/* Facilities */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {gym.facilities.slice(0, 4).map((facility) => (
                        <Badge key={facility} variant="outline" className="text-xs">
                          {facility}
                        </Badge>
                      ))}
                      {gym.facilities.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{gym.facilities.length - 4} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{gym.hours}</span>
                  </div>

                  {/* Contact & Actions */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex flex-col sm:flex-row gap-4 text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <Phone className="h-4 w-4 mr-1" />
                        <span>{gym.contact.phone}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Mail className="h-4 w-4 mr-1" />
                        <span>{gym.contact.email}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button size="sm">Contact Gym</Button>
                    </div>
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center pt-8">
        <Button variant="outline" size="lg">
          Load More Gyms
        </Button>
      </div>
    </div>
  )
}
