"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { MapPin, Phone, Mail, Calendar, Star, Edit, Save, ShoppingBag, Heart, Clock } from "lucide-react"

export default function ProfilePage() {
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+27 82 123 4567",
    location: "Cape Town, Western Cape",
    userType: "fitness-enthusiast",
    bio: "Passionate about fitness and healthy living. Always looking for new challenges and ways to improve my physical and mental well-being.",
    fitnessGoals: ["Weight Loss", "Muscle Building", "Endurance"],
    experience: "Intermediate",
    preferredActivities: ["Gym Training", "Running", "Yoga"],
  })

  const handleSave = () => {
    setIsEditing(false)
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    })
  }

  const mockBookings = [
    {
      id: 1,
      type: "Personal Training",
      provider: "Sarah Johnson",
      date: "2024-01-15",
      time: "10:00 AM",
      status: "confirmed",
      location: "FitLife Gym, Cape Town",
    },
    {
      id: 2,
      type: "Yoga Class",
      provider: "Zen Wellness Studio",
      date: "2024-01-18",
      time: "6:00 PM",
      status: "pending",
      location: "Zen Wellness Studio, Cape Town",
    },
  ]

  const mockOrders = [
    {
      id: 1,
      items: ["Premium Whey Protein", "Resistance Bands"],
      total: 1198,
      date: "2024-01-10",
      status: "delivered",
    },
    {
      id: 2,
      items: ["Yoga Mat Premium"],
      total: 799,
      date: "2024-01-12",
      status: "shipped",
    },
  ]

  const mockFavorites = [
    {
      id: 1,
      name: "PowerHouse Gym",
      type: "gym",
      location: "Cape Town CBD",
      rating: 4.8,
    },
    {
      id: 2,
      name: "Dr. Michael Smith",
      type: "service",
      specialty: "Sports Medicine",
      rating: 4.9,
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">My Profile</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" />
                  <AvatarFallback className="text-lg">
                    {profileData.firstName[0]}
                    {profileData.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold mb-1">
                  {profileData.firstName} {profileData.lastName}
                </h2>
                <Badge variant="secondary" className="mb-4">
                  {profileData.userType.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                </Badge>

                <div className="w-full space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>{profileData.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>{profileData.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{profileData.location}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Fitness Goals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {profileData.fitnessGoals.map((goal) => (
                  <Badge key={goal} variant="outline">
                    {goal}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Profile Information</CardTitle>
                    <Button variant="outline" size="sm" onClick={() => (isEditing ? handleSave() : setIsEditing(true))}>
                      {isEditing ? <Save className="h-4 w-4 mr-2" /> : <Edit className="h-4 w-4 mr-2" />}
                      {isEditing ? "Save" : "Edit"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={profileData.firstName}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, firstName: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={profileData.lastName}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, lastName: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, bio: e.target.value }))}
                      disabled={!isEditing}
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="experience">Experience Level</Label>
                    <Select
                      value={profileData.experience}
                      onValueChange={(value) => setProfileData((prev) => ({ ...prev, experience: value }))}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                        <SelectItem value="Expert">Expert</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Preferred Activities</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {profileData.preferredActivities.map((activity) => (
                        <Badge key={activity} variant="secondary">
                          {activity}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bookings">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    My Bookings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockBookings.map((booking) => (
                      <div key={booking.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold">{booking.type}</h3>
                            <p className="text-sm text-muted-foreground">{booking.provider}</p>
                          </div>
                          <Badge variant={booking.status === "confirmed" ? "default" : "secondary"}>
                            {booking.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{booking.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{booking.time}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{booking.location}</span>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" variant="outline">
                            Reschedule
                          </Button>
                          <Button size="sm" variant="outline">
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5" />
                    Order History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockOrders.map((order) => (
                      <div key={order.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold">Order #{order.id}</h3>
                            <p className="text-sm text-muted-foreground">{order.items.join(", ")}</p>
                          </div>
                          <Badge variant={order.status === "delivered" ? "default" : "secondary"}>{order.status}</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">{order.date}</span>
                          <span className="font-semibold">R{order.total}</span>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                          <Button size="sm" variant="outline">
                            Reorder
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="favorites">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    My Favorites
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockFavorites.map((favorite) => (
                      <div key={favorite.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{favorite.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {favorite.type === "gym" ? favorite.location : favorite.specialty}
                            </p>
                            <div className="flex items-center gap-1 mt-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm">{favorite.rating}</span>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, email: e.target.value }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={profileData.location}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, location: e.target.value }))}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Privacy & Security</h3>
                    <Button variant="outline">Change Password</Button>
                    <Button variant="outline">Privacy Settings</Button>
                    <Button variant="destructive">Delete Account</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
