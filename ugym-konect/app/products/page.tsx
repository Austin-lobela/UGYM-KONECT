import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { ProductSearch } from "@/components/products/product-search"
import { ProductFilters } from "@/components/products/product-filters"
import { ProductList } from "@/components/products/product-list"

export const metadata: Metadata = {
  title: "Health & Fitness Products - UGYM-KONECT",
  description: "Shop quality fitness equipment, supplements, and health products from trusted sellers.",
}

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Health & Fitness Products</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Discover quality fitness equipment, supplements, and health products from verified sellers across South
            Africa.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <ProductSearch />
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <ProductFilters />
          </div>

          {/* Product Listings */}
          <div className="lg:col-span-3">
            <ProductList />
          </div>
        </div>
      </div>
    </div>
  )
}
