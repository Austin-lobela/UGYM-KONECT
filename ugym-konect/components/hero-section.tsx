import { Button } from "@/components/ui/button"
import { Search, Users, ArrowRight } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

      <div className="container mx-auto text-center relative">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 text-balance leading-tight">
            Connect with Your
            <span className="text-primary block sm:inline"> Fitness Journey</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty leading-relaxed">
            UGYM-KONECT is your gateway to gyms, fitness trainers, coaches, doctors, dietitians, and health products
            across South Africa.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <Link href="/gyms">
                <Search className="mr-2 h-5 w-5" />
                Find Gyms
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent" asChild>
              <Link href="/services">
                <Users className="mr-2 h-5 w-5" />
                Browse Services
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Registered Gyms</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">1000+</div>
              <div className="text-muted-foreground">Health Professionals</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">50k+</div>
              <div className="text-muted-foreground">Happy Users</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
