"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin } from "lucide-react"

export function GymSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [location, setLocation] = useState("")

  const handleSearch = () => {
    // TODO: Implement search functionality
    console.log("Searching for:", searchQuery, "in", location)
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="grid md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search gyms, facilities, or services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12"
          />
        </div>

        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Location (city, suburb, or area)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="pl-10 h-12"
          />
        </div>

        <Button onClick={handleSearch} className="h-12 px-8">
          <Search className="mr-2 h-4 w-4" />
          Search Gyms
        </Button>
      </div>
    </div>
  )
}
