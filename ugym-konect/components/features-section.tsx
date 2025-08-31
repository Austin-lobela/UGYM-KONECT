import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Users, ShoppingBag, Star, Shield, Clock } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: MapPin,
      title: "Find Local Gyms",
      description: "Discover gyms near you with detailed information, pricing, facilities, and real user reviews.",
    },
    {
      icon: Users,
      title: "Expert Services",
      description: "Connect with certified trainers, doctors, dietitians, and health coaches in your area.",
    },
    {
      icon: ShoppingBag,
      title: "Health Products",
      description: "Browse and purchase quality fitness equipment, supplements, and health products.",
    },
    {
      icon: Star,
      title: "Verified Reviews",
      description: "Read authentic reviews from real users to make informed decisions about your fitness choices.",
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Your data and transactions are protected with enterprise-grade security measures.",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Get help whenever you need it with our dedicated customer support team.",
    },
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">What We Offer</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Everything you need to achieve your fitness goals in one comprehensive platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300 border-border/50">
                <CardHeader className="pb-6">
                  <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl mb-3">{feature.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
