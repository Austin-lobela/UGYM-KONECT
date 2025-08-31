import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { GymSearch } from "@/components/gyms/gym-search"
import { GymFilters } from "@/components/gyms/gym-filters"
import { GymList } from "@/components/gyms/gym-list"

export const metadata: Metadata = {
  title: "Find Gyms - UGYM-KONECT",
  description: "Discover the best gyms near you with detailed information, pricing, and facilities.",
}

export default function GymsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Find Your Perfect Gym</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Discover gyms near you with detailed information about facilities, pricing, and member reviews.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <GymSearch />
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <GymFilters />
          </div>

          {/* Gym Listings */}
          <div className="lg:col-span-3">
            <GymList />
          </div>
        </div>
      </div>
    </div>
  )
}
