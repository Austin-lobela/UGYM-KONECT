"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, ShoppingCart, Heart, Truck } from "lucide-react"
import { useCart } from "@/lib/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"
import Link from "next/link"

// Mock product data
const mockProducts = [
  {
    id: 1,
    name: "Premium Whey Protein Powder",
    brand: "Optimum Nutrition",
    description:
      "High-quality whey protein isolate with 25g protein per serving. Perfect for muscle building and recovery.",
    price: 899,
    originalPrice: 1099,
    rating: 4.8,
    reviews: 234,
    image: "/placeholder.svg?key=protein-powder",
    category: "Supplements",
    seller: {
      name: "FitSupplements SA",
      rating: 4.9,
      contact: "sales@fitsupplements.co.za",
    },
    inStock: true,
    shipping: "Free shipping",
    features: ["25g Protein", "Low Carb", "Fast Absorption", "Multiple Flavors"],
  },
  {
    id: 2,
    name: "Adjustable Dumbbell Set",
    brand: "Bowflex",
    description: "Space-saving adjustable dumbbells that replace 15 sets of weights. Perfect for home workouts.",
    price: 4599,
    originalPrice: 5299,
    rating: 4.7,
    reviews: 89,
    image: "/placeholder.svg?key=dumbbells",
    category: "Fitness Equipment",
    seller: {
      name: "Home Gym Pro",
      rating: 4.8,
      contact: "info@homegympro.co.za",
    },
    inStock: true,
    shipping: "Free shipping",
    features: ["5-52.5 lbs per dumbbell", "Space Saving", "Quick Weight Change", "Durable Construction"],
  },
  {
    id: 3,
    name: "Resistance Band Set",
    brand: "TRX",
    description: "Complete resistance band set with multiple resistance levels and accessories for full-body workouts.",
    price: 299,
    originalPrice: 399,
    rating: 4.6,
    reviews: 156,
    image: "/placeholder.svg?key=resistance-bands",
    category: "Accessories",
    seller: {
      name: "Fitness Gear SA",
      rating: 4.7,
      contact: "support@fitnessgear.co.za",
    },
    inStock: true,
    shipping: "R50 shipping",
    features: ["5 Resistance Levels", "Door Anchor", "Handles & Ankle Straps", "Exercise Guide"],
  },
  {
    id: 4,
    name: "Yoga Mat Premium",
    brand: "Manduka",
    description: "High-quality non-slip yoga mat with superior cushioning and durability for all yoga practices.",
    price: 799,
    originalPrice: 999,
    rating: 4.9,
    reviews: 67,
    image: "/placeholder.svg?key=yoga-mat",
    category: "Yoga & Pilates",
    seller: {
      name: "Zen Fitness",
      rating: 4.9,
      contact: "hello@zenfitness.co.za",
    },
    inStock: true,
    shipping: "Free shipping",
    features: ["Non-Slip Surface", "6mm Thickness", "Eco-Friendly", "Lifetime Guarantee"],
  },
  {
    id: 5,
    name: "Pre-Workout Energy Drink",
    brand: "BSN",
    description:
      "High-energy pre-workout supplement with caffeine, beta-alanine, and creatine for enhanced performance.",
    price: 549,
    originalPrice: 649,
    rating: 4.5,
    reviews: 198,
    image: "/placeholder.svg?key=pre-workout",
    category: "Sports Nutrition",
    seller: {
      name: "Supplement Store",
      rating: 4.6,
      contact: "orders@supplementstore.co.za",
    },
    inStock: false,
    shipping: "Free shipping",
    features: ["200mg Caffeine", "Beta-Alanine", "Creatine Monohydrate", "Multiple Flavors"],
  },
  {
    id: 6,
    name: "Foam Roller",
    brand: "TriggerPoint",
    description: "High-density foam roller for muscle recovery, injury prevention, and improved flexibility.",
    price: 399,
    originalPrice: 499,
    rating: 4.7,
    reviews: 123,
    image: "/placeholder.svg?key=foam-roller",
    category: "Recovery Products",
    seller: {
      name: "Recovery Pro",
      rating: 4.8,
      contact: "info@recoverypro.co.za",
    },
    inStock: true,
    shipping: "R75 shipping",
    features: ["High-Density Foam", "Textured Surface", "Durable Construction", "Multiple Sizes"],
  },
]

export function ProductList() {
  const [sortBy, setSortBy] = useState("rating")
  const [products] = useState(mockProducts)
  const { dispatch } = useCart()
  const { toast } = useToast()

  const addToCart = (product: (typeof mockProducts)[0]) => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        image: product.image,
        seller: product.seller,
      },
    })

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "name":
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">{products.length} Products Found</h2>
          <p className="text-muted-foreground">Quality fitness and health products</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="name">Name</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">{product.category}</Badge>
              {!product.inStock && (
                <Badge className="absolute top-3 right-3 bg-destructive text-destructive-foreground">
                  Out of Stock
                </Badge>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-3 right-3 bg-background/80 hover:bg-background"
              >
                <Heart className="h-4 w-4" />
              </Button>
            </div>

            <CardHeader className="pb-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    {product.brand}
                  </Badge>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-sm font-medium">{product.rating}</span>
                    <span className="text-muted-foreground text-xs ml-1">({product.reviews})</span>
                  </div>
                </div>
                <h3 className="font-bold text-foreground line-clamp-2">{product.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              {/* Features */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {product.features.slice(0, 2).map((feature) => (
                    <Badge key={feature} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                  {product.features.length > 2 && (
                    <Badge variant="secondary" className="text-xs">
                      +{product.features.length - 2}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Price */}
              <div className="mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-primary">R{product.price}</span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-muted-foreground line-through">R{product.originalPrice}</span>
                  )}
                </div>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <Truck className="h-4 w-4 mr-1" />
                  <span>{product.shipping}</span>
                </div>
              </div>

              {/* Seller */}
              <div className="mb-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Sold by:</span>
                  <div className="flex items-center">
                    <span className="font-medium">{product.seller.name}</span>
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 ml-1" />
                    <span className="text-xs ml-1">{product.seller.rating}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <Button className="w-full" disabled={!product.inStock} onClick={() => addToCart(product)}>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
                <Button variant="outline" className="w-full bg-transparent" size="sm" asChild>
                  <Link href={`/products/${product.id}`}>View Details</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center pt-8">
        <Button variant="outline" size="lg">
          Load More Products
        </Button>
      </div>
    </div>
  )
}
