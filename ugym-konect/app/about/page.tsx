import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Target, Heart, Award, MapPin, Phone, Mail } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AboutPage() {
  const values = [
    {
      icon: <Users className="h-8 w-8 text-[#FF9100]" />,
      title: "Community First",
      description:
        "Building strong connections between fitness enthusiasts and health professionals across South Africa.",
    },
    {
      icon: <Target className="h-8 w-8 text-[#FF9100]" />,
      title: "Quality Assurance",
      description:
        "Every business and service provider is carefully vetted to ensure the highest standards for our users.",
    },
    {
      icon: <Heart className="h-8 w-8 text-[#FF9100]" />,
      title: "Health & Wellness",
      description: "Promoting healthier lifestyles by making fitness and wellness services accessible to everyone.",
    },
    {
      icon: <Award className="h-8 w-8 text-[#FF9100]" />,
      title: "Excellence",
      description:
        "Committed to providing exceptional user experiences and supporting business growth in the fitness industry.",
    },
  ]

  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "/professional-woman-ceo.png",
      bio: "Former fitness trainer with 10+ years in the health industry, passionate about connecting communities.",
    },
    {
      name: "Michael Chen",
      role: "Head of Technology",
      image: "/professional-man-cto.png",
      bio: "Tech entrepreneur with expertise in building scalable platforms for health and fitness businesses.",
    },
    {
      name: "Dr. Amara Okafor",
      role: "Health & Wellness Advisor",
      image: "/professional-doctor-woman.png",
      bio: "Sports medicine physician dedicated to promoting safe and effective fitness practices.",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 text-balance">
              About <span className="text-[#FF9100]">UGYM-KONECT</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 text-pretty leading-relaxed">
              We're on a mission to transform South Africa's fitness landscape by connecting people with the best gyms,
              trainers, and health products in their communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-[#FF9100] hover:bg-[#FF9100]/90 text-white">
                <Link href="/register-business">Join Our Platform</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-[#FF9100] text-[#FF9100] hover:bg-[#FF9100] hover:text-white bg-transparent"
              >
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                To create a comprehensive platform that makes fitness and wellness accessible to every South African,
                while empowering local businesses to grow and thrive in the digital age.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We believe that everyone deserves access to quality fitness facilities, professional guidance, and
                health products that support their wellness journey.
              </p>
            </div>
            <div className="relative">
              <Image
                src="/diverse-people-exercising-together.png"
                alt="People exercising together"
                width={600}
                height={400}
                className="rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at UGYM-KONECT
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">{value.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The passionate individuals working to revolutionize South Africa's fitness industry
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-[#FF9100] font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#FF9100] py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Our Impact</h2>
            <p className="text-lg text-orange-100 max-w-2xl mx-auto">
              Growing the fitness community across South Africa
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2">500+</div>
              <div className="text-orange-100">Registered Gyms</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2">1,200+</div>
              <div className="text-orange-100">Health Professionals</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2">10,000+</div>
              <div className="text-orange-100">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2">9</div>
              <div className="text-orange-100">Provinces Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Ready to Get Started?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Whether you're looking to find the perfect gym or grow your fitness business, we're here to help you
              succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button asChild size="lg" className="bg-[#FF9100] hover:bg-[#FF9100]/90 text-white">
                <Link href="/gyms">Find Gyms</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-[#FF9100] text-[#FF9100] hover:bg-[#FF9100] hover:text-white bg-transparent"
              >
                <Link href="/register-business">List Your Business</Link>
              </Button>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="flex items-center justify-center space-x-3">
                <Mail className="h-5 w-5 text-[#FF9100]" />
                <span className="text-gray-600">info@ugym-konect.co.za</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Phone className="h-5 w-5 text-[#FF9100]" />
                <span className="text-gray-600">+27 11 123 4567</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <MapPin className="h-5 w-5 text-[#FF9100]" />
                <span className="text-gray-600">Johannesburg, SA</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
