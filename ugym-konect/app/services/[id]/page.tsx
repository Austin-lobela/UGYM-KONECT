"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { BookingModal } from "@/components/booking/booking-modal"
import { Star, MapPin, Phone, Mail, Calendar, Clock, Award, CheckCircle, Heart, Share2 } from "lucide-react"
import Image from "next/image"

// Mock service provider data
const mockProvider = {
  id: 1,
  name: "Dr. Sarah Johnson",
  title: "Sports Medicine Physician & Personal Trainer",
  specializations: ["Sports Medicine", "Injury Rehabilitation", "Performance Optimization"],
  rating: 4.9,
  reviewCount: 127,
  experience: "8 years",
  location: "Cape Town, Western Cape",
  phone: "+27 21 123 4567",
  email: "sarah@sportsmedicine.co.za",
  bio: "Dr. Sarah Johnson is a qualified sports medicine physician with over 8 years of experience helping athletes and fitness enthusiasts achieve their goals while preventing and treating injuries. She combines medical expertise with practical training knowledge to provide comprehensive care.",
  qualifications: [
    "MBChB - University of Cape Town",
    "Sports Medicine Diploma - SASMA",
    "ACSM Certified Personal Trainer",
    "First Aid & CPR Certified",
  ],
  services: [
    {
      name: "Sports Medicine Consultation",
      duration: "60 minutes",
      price: 850,
      description: "Comprehensive assessment and treatment of sports-related injuries",
    },
    {
      name: "Personal Training Session",
      duration: "60 minutes",
      price: 650,
      description: "One-on-one training session focused on your specific goals",
    },
    {
      name: "Injury Rehabilitation",
      duration: "45 minutes",
      price: 750,
      description: "Specialized rehabilitation program for injury recovery",
    },
  ],
  availability: [
    { day: "Monday", slots: ["09:00", "11:00", "14:00", "16:00"] },
    { day: "Tuesday", slots: ["09:00", "11:00", "14:00", "16:00"] },
    { day: "Wednesday", slots: ["09:00", "11:00", "14:00"] },
    { day: "Thursday", slots: ["09:00", "11:00", "14:00", "16:00"] },
    { day: "Friday", slots: ["09:00", "11:00", "14:00"] },
  ],
  images: [
    "/placeholder.svg?height=400&width=600&text=Consultation+Room",
    "/placeholder.svg?height=400&width=600&text=Training+Area",
    "/placeholder.svg?height=400&width=600&text=Equipment",
  ],
}

const mockReviews = [
  {
    id: 1,
    user: "Michael Chen",
    rating: 5,
    date: "2024-01-10",
    comment:
      "Dr. Johnson helped me recover from a running injury and get back to training stronger than before. Highly professional and knowledgeable.",
  },
  {
    id: 2,
    user: "Lisa Williams",
    rating: 5,
    date: "2024-01-08",
    comment:
      "Excellent personal trainer! Sarah's medical background gives her a unique perspective on safe and effective training methods.",
  },
  {
    id: 3,
    user: "David Thompson",
    rating: 4,
    date: "2024-01-05",
    comment:
      "Great consultation and treatment plan. The rehabilitation program was exactly what I needed for my shoulder injury.",
  },
]

export default function ServiceProviderPage() {
  const [selectedService, setSelectedService] = useState(mockProvider.services[0])
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="grid lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <div className="flex flex-col md:flex-row gap-6">
            <Avatar className="h-32 w-32 mx-auto md:mx-0">
              <AvatarImage src="/placeholder.svg?height=128&width=128" />
              <AvatarFallback className="text-2xl">SJ</AvatarFallback>
            </Avatar>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold mb-2">{mockProvider.name}</h1>
              <p className="text-lg text-muted-foreground mb-3">{mockProvider.title}</p>

              <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                {mockProvider.specializations.map((spec) => (
                  <Badge key={spec} variant="secondary">
                    {spec}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center gap-4 justify-center md:justify-start text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{mockProvider.rating}</span>
                  <span>({mockProvider.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Award className="h-4 w-4" />
                  <span>{mockProvider.experience} experience</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{mockProvider.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{mockProvider.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{mockProvider.email}</span>
                </div>
                <Separator />
                <div className="flex gap-2">
                  <Button className="flex-1" onClick={() => setIsBookingOpen(true)}>
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Appointment
                  </Button>
                  <Button variant="outline" size="icon">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="availability">Availability</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{mockProvider.bio}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Qualifications & Certifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockProvider.qualifications.map((qual, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">{qual}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="services">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockProvider.services.map((service, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{service.name}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{service.duration}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary">R{service.price}</span>
                    <Button
                      size="sm"
                      onClick={() => {
                        setSelectedService(service)
                        setIsBookingOpen(true)
                      }}
                    >
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="gallery">
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="mb-4">
                  <Image
                    src={mockProvider.images[currentImageIndex] || "/placeholder.svg"}
                    alt="Service provider facility"
                    width={800}
                    height={400}
                    className="w-full h-64 md:h-96 object-cover rounded-lg"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {mockProvider.images.map((image, index) => (
                    <Image
                      key={index}
                      src={image || "/placeholder.svg"}
                      alt={`Gallery image ${index + 1}`}
                      width={200}
                      height={150}
                      className={`w-full h-20 object-cover rounded cursor-pointer ${
                        currentImageIndex === index ? "ring-2 ring-primary" : ""
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reviews">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Reviews & Ratings</CardTitle>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-2xl font-bold">{mockProvider.rating}</span>
                  </div>
                  <div className="text-muted-foreground">Based on {mockProvider.reviewCount} reviews</div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {mockReviews.map((review) => (
                    <div key={review.id} className="border-b pb-4 last:border-b-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">{review.user}</h4>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">{review.date}</span>
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="availability">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Availability</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockProvider.availability.map((day) => (
                  <div key={day.day} className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="w-24 font-medium">{day.day}</div>
                    <div className="flex flex-wrap gap-2">
                      {day.slots.map((slot) => (
                        <Badge
                          key={slot}
                          variant="outline"
                          className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                        >
                          {slot}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        provider={mockProvider}
        service={selectedService}
      />
    </div>
  )
}
