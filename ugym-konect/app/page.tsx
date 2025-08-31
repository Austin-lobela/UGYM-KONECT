import { Button } from "@/components/ui/button"
import { Phone, Mail } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <HeroSection />

      {/* Vision & Mission */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Our Vision</h2>
                <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
                  To create the most comprehensive fitness and health ecosystem in South Africa, connecting every
                  individual with the resources they need for their wellness journey.
                </p>
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Our Mission</h2>
                <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
                  We bridge the gap between fitness enthusiasts and health professionals, making quality fitness
                  services and products accessible to everyone through our innovative platform.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/10 to-accent/5 rounded-2xl p-8 text-center border border-primary/20">
                <div className="text-6xl md:text-7xl font-bold text-primary mb-4">1000+</div>
                <p className="text-lg md:text-xl text-foreground font-medium">Connected Businesses</p>
                <p className="text-muted-foreground mt-2">Growing every day</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <FeaturesSection />

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Fitness Journey?</h2>
          <p className="text-xl mb-8 opacity-90 text-pretty max-w-2xl mx-auto leading-relaxed">
            Join thousands of South Africans who trust UGYM-KONECT for their fitness needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
              <Link href="/register">Get Started Today</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent text-lg px-8 py-6"
            >
              <Link href="/gyms">Explore Gyms</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <Image
                src="/images/ugym-logo.png"
                alt="UGYM-KONECT Logo"
                width={120}
                height={40}
                className="h-8 w-auto mb-4 brightness-0 invert"
              />
              <p className="text-secondary-foreground/80 text-pretty leading-relaxed">
                Connecting South Africa's fitness community with quality gyms, trainers, and health products.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-lg">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/gyms"
                    className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                  >
                    Find Gyms
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products"
                    className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    href="/register"
                    className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                  >
                    Register Business
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-lg">Support</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/help"
                    className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-lg">Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <span className="text-secondary-foreground/80">info@ugym-konect.co.za</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-primary" />
                  <span className="text-secondary-foreground/80">+27 11 123 4567</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-secondary-foreground/20 mt-8 pt-8 text-center">
            <p className="text-secondary-foreground/60">© 2025 UGYM-KONECT. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
