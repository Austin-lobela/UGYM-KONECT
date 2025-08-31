"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

export function ProductSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [category, setCategory] = useState("")

  const handleSearch = () => {
    console.log("Searching for:", searchQuery, "category:", category)
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="grid md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12"
          />
        </div>

        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="h-12">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="supplements">Supplements</SelectItem>
            <SelectItem value="equipment">Fitness Equipment</SelectItem>
            <SelectItem value="apparel">Fitness Apparel</SelectItem>
            <SelectItem value="accessories">Accessories</SelectItem>
            <SelectItem value="nutrition">Sports Nutrition</SelectItem>
            <SelectItem value="recovery">Recovery Products</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={handleSearch} className="h-12 px-8">
          <Search className="mr-2 h-4 w-4" />
          Search Products
        </Button>
      </div>
    </div>
  )
}
