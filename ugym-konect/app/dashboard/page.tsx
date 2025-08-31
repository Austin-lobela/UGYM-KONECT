import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard - UGYM-KONECT",
  description: "Your UGYM-KONECT dashboard",
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-6">Welcome to your Dashboard</h1>
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-muted-foreground">
            This is a placeholder dashboard. Firebase authentication will be integrated in the next phase.
          </p>
        </div>
      </div>
    </div>
  )
}
