import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { GymDetails } from "@/components/gyms/gym-details"

export const metadata: Metadata = {
  title: "Gym Details - UGYM-KONECT",
  description: "View detailed information about this gym including facilities, pricing, and reviews.",
}

export default function GymDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <GymDetails gymId={params.id} />
    </div>
  )
}
