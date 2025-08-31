import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/gyms", label: "Find Gyms" },
    { href: "/services", label: "Services" },
    { href: "/products", label: "Products" },
    { href: "/about", label: "About Us" },
    { href: "/register-business", label: "Register Business" },
  ]

  const categories = [
    { href: "/services?category=fitness", label: "Personal Trainers" },
    { href: "/services?category=health", label: "Nutritionists" },
    { href: "/services?category=medical", label: "Sports Medicine" },
    { href: "/products?category=equipment", label: "Fitness Equipment" },
    { href: "/products?category=supplements", label: "Supplements" },
    { href: "/products?category=apparel", label: "Sports Apparel" },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold text-[#FF9100] mb-4">UGYM-KONECT</h3>
            <p className="text-gray-300 mb-4 text-sm leading-relaxed">
              Connecting South Africa with the best gyms, fitness professionals, and health products. Your journey to
              better health starts here.
            </p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-[#FF9100] transition-colors cursor-pointer">
                <span className="text-xs">f</span>
              </div>
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-[#FF9100] transition-colors cursor-pointer">
                <span className="text-xs">t</span>
              </div>
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-[#FF9100] transition-colors cursor-pointer">
                <span className="text-xs">in</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-[#FF9100]">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-[#FF9100] transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9100] focus:ring-offset-2 focus:ring-offset-gray-900 rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4 text-[#FF9100]">Popular Categories</h4>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.href}>
                  <Link
                    href={category.href}
                    className="text-gray-300 hover:text-[#FF9100] transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9100] focus:ring-offset-2 focus:ring-offset-gray-900 rounded"
                  >
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4 text-[#FF9100]">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-[#FF9100]" />
                <span className="text-gray-300 text-sm">info@ugym-konect.co.za</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-[#FF9100]" />
                <span className="text-gray-300 text-sm">+27 11 123 4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-[#FF9100]" />
                <span className="text-gray-300 text-sm">Johannesburg, South Africa</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">© 2024 UGYM-KONECT. All rights reserved.</p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-gray-400 hover:text-[#FF9100] text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-[#FF9100] text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-[#FF9100] text-sm transition-colors">
                Contact
              </Link>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-gray-500 text-xs">
              Disclaimer: UGYM-KONECT is a platform connecting users with fitness and health services. We are not
              responsible for the quality of services provided by third-party businesses.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
