"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Phone, Mail, Star, Globe } from "lucide-react"
import Image from "next/image"

interface GymDetailsProps {
  gymId: string
}

export function GymDetails({ gymId }: GymDetailsProps) {
  // Mock gym data - in real app, this would be fetched based on gymId
  const gym = {
    id: gymId,
    name: "FitZone Sandton",
    description:
      "Premium fitness facility with state-of-the-art equipment and expert trainers. We offer a comprehensive range of fitness services including personal training, group classes, and specialized programs for all fitness levels.",
    location: "123 Rivonia Road, Sandton, Johannesburg, 2196",
    price: "R450/month",
    rating: 4.8,
    reviews: 124,
    images: [
      "/placeholder-kunh4.png",
      "/placeholder-gn78u.png",
      "/gym-weight-training-area.png",
      "/gym-swimming-pool.png",
    ],
    facilities: [
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
    ],
    contact: {
      phone: "+27 11 123 4567",
      email: "info@fitzonesandton.co.za",
      website: "www.fitzonesandton.co.za",
    },
    hours: {
      weekdays: "5:00 AM - 10:00 PM",
      weekends: "6:00 AM - 8:00 PM",
    },
    type: "Commercial Gym",
    membershipOptions: [
      { name: "Basic", price: "R350/month", features: ["Gym Access", "Locker Room"] },
      { name: "Standard", price: "R450/month", features: ["Gym Access", "Pool Access", "Group Classes"] },
      { name: "Premium", price: "R650/month", features: ["All Access", "Personal Training Sessions", "Sauna & Steam"] },
    ],
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{gym.name}</h1>
            <div className="flex items-center gap-4 mb-2">
              <div className="flex items-center">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="ml-1 font-medium text-lg">{gym.rating}</span>
                <span className="text-muted-foreground ml-1">({gym.reviews} reviews)</span>
              </div>
              <Badge variant="secondary">{gym.type}</Badge>
            </div>
            <div className="flex items-center text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{gym.location}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-primary mb-1">{gym.price}</div>
            <div className="text-muted-foreground">starting from</div>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {gym.images.map((image, index) => (
          <div
            key={index}
            className={`relative ${index === 0 ? "md:col-span-2 lg:col-span-2" : ""} h-48 ${index === 0 ? "md:h-96" : ""}`}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`${gym.name} - Image ${index + 1}`}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="facilities">Facilities</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>About This Gym</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{gym.description}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Opening Hours</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Monday - Friday</span>
                      <span className="text-muted-foreground">{gym.hours.weekdays}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Saturday - Sunday</span>
                      <span className="text-muted-foreground">{gym.hours.weekends}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="facilities" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Available Facilities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {gym.facilities.map((facility) => (
                      <Badge key={facility} variant="outline" className="justify-center py-2">
                        {facility}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pricing" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                {gym.membershipOptions.map((option, index) => (
                  <Card key={index} className={index === 1 ? "border-primary" : ""}>
                    <CardHeader>
                      <CardTitle className="text-center">{option.name}</CardTitle>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{option.price}</div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {option.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="text-sm text-muted-foreground">
                            • {feature}
                          </li>
                        ))}
                      </ul>
                      <Button className="w-full mt-4" variant={index === 1 ? "default" : "outline"}>
                        Choose Plan
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Member Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Reviews feature coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-3 text-muted-foreground" />
                <span>{gym.contact.phone}</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-3 text-muted-foreground" />
                <span>{gym.contact.email}</span>
              </div>
              <div className="flex items-center">
                <Globe className="h-4 w-4 mr-3 text-muted-foreground" />
                <span>{gym.contact.website}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <Button className="w-full" size="lg">
                  Contact Gym
                </Button>
                <Button variant="outline" className="w-full bg-transparent" size="lg">
                  Get Directions
                </Button>
                <Button variant="outline" className="w-full bg-transparent" size="lg">
                  Save to Favorites
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
