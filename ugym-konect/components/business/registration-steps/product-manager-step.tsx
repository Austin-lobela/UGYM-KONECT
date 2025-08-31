"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, X, Upload, ImageIcon } from "lucide-react"
import type { BusinessFormData, Product } from "../business-registration-form"

interface ProductManagerStepProps {
  formData: BusinessFormData
  updateFormData: (updates: Partial<BusinessFormData>) => void
}

export function ProductManagerStep({ formData, updateFormData }: ProductManagerStepProps) {
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: "",
    price: 0,
    description: "",
    category: "",
    tags: [],
    images: [],
  })
  const [newTag, setNewTag] = useState("")

  const productCategories = [
    "Fitness Equipment",
    "Supplements",
    "Sports Apparel",
    "Nutrition",
    "Recovery Tools",
    "Accessories",
    "Books & Guides",
    "Technology",
    "Other",
  ]

  const serviceCategories = [
    "Personal Training",
    "Group Classes",
    "Nutrition Counseling",
    "Sports Medicine",
    "Physiotherapy",
    "Massage Therapy",
    "Wellness Coaching",
    "Specialized Programs",
  ]

  const addProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.description && newProduct.category) {
      const product: Product = {
        id: Date.now().toString(),
        name: newProduct.name,
        price: newProduct.price,
        description: newProduct.description,
        category: newProduct.category,
        tags: newProduct.tags || [],
        images: newProduct.images || [],
      }

      updateFormData({
        products: [...formData.products, product],
      })

      // Reset form
      setNewProduct({
        name: "",
        price: 0,
        description: "",
        category: "",
        tags: [],
        images: [],
      })
      setShowAddProduct(false)
    }
  }

  const removeProduct = (productId: string) => {
    updateFormData({
      products: formData.products.filter((p) => p.id !== productId),
    })
  }

  const addTag = () => {
    if (newTag && !newProduct.tags?.includes(newTag)) {
      setNewProduct({
        ...newProduct,
        tags: [...(newProduct.tags || []), newTag],
      })
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setNewProduct({
      ...newProduct,
      tags: newProduct.tags?.filter((tag) => tag !== tagToRemove) || [],
    })
  }

  const handleImageUpload = (files: FileList | null) => {
    if (files) {
      const newImages = Array.from(files)
      setNewProduct({
        ...newProduct,
        images: [...(newProduct.images || []), ...newImages],
      })
    }
  }

  const removeImage = (index: number) => {
    const updatedImages = [...(newProduct.images || [])]
    updatedImages.splice(index, 1)
    setNewProduct({
      ...newProduct,
      images: updatedImages,
    })
  }

  const addService = (service: string) => {
    if (!formData.services.includes(service)) {
      updateFormData({
        services: [...formData.services, service],
      })
    }
  }

  const removeService = (service: string) => {
    updateFormData({
      services: formData.services.filter((s) => s !== service),
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Products & Services</h3>
        <p className="text-gray-600">
          Add the products you sell or services you provide. You can add multiple products with multiple images each.
        </p>
      </div>

      {/* Services Section (for service providers and gyms) */}
      {(formData.businessType === "service_provider" ||
        formData.businessType === "gym" ||
        formData.businessType === "multi") && (
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900">Services Offered</CardTitle>
            <CardDescription>Select the services you provide</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
              {serviceCategories.map((category) => (
                <Button
                  key={category}
                  variant={formData.services.includes(category) ? "default" : "outline"}
                  size="sm"
                  onClick={() =>
                    formData.services.includes(category) ? removeService(category) : addService(category)
                  }
                  className={
                    formData.services.includes(category)
                      ? "bg-[#FF9100] hover:bg-[#FF9100]/90 text-white"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
            {formData.services.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.services.map((service) => (
                  <Badge key={service} variant="secondary" className="bg-orange-100 text-orange-800">
                    {service}
                    <button onClick={() => removeService(service)} className="ml-2 hover:text-orange-600" type="button">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Products Section (for product sellers and multi-type businesses) */}
      {(formData.businessType === "product_seller" || formData.businessType === "multi") && (
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900">Products</CardTitle>
            <CardDescription>Add products you want to sell on the platform</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Existing Products */}
            {formData.products.length > 0 && (
              <div className="space-y-4 mb-6">
                {formData.products.map((product) => (
                  <Card key={product.id} className="border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900">{product.name}</h4>
                          <p className="text-[#FF9100] font-medium">R{product.price.toFixed(2)}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeProduct(product.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="border-gray-300">
                          {product.category}
                        </Badge>
                        <span className="text-sm text-gray-500">{product.images.length} images</span>
                      </div>
                      {product.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {product.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Add Product Button */}
            {!showAddProduct && (
              <Button
                onClick={() => setShowAddProduct(true)}
                className="w-full bg-[#FF9100] hover:bg-[#FF9100]/90 text-white"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            )}

            {/* Add Product Form */}
            {showAddProduct && (
              <Card className="border-[#FF9100] bg-orange-50">
                <CardHeader>
                  <CardTitle className="text-gray-900">Add New Product</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="productName" className="text-gray-900">
                        Product Name *
                      </Label>
                      <Input
                        id="productName"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        placeholder="Enter product name"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="productPrice" className="text-gray-900">
                        Price (ZAR) *
                      </Label>
                      <Input
                        id="productPrice"
                        type="number"
                        min="0"
                        step="0.01"
                        value={newProduct.price}
                        onChange={(e) =>
                          setNewProduct({ ...newProduct, price: Number.parseFloat(e.target.value) || 0 })
                        }
                        placeholder="0.00"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="productCategory" className="text-gray-900">
                      Category *
                    </Label>
                    <Select
                      value={newProduct.category}
                      onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {productCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="productDescription" className="text-gray-900">
                      Description *
                    </Label>
                    <Textarea
                      id="productDescription"
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                      placeholder="Describe your product..."
                      rows={3}
                      className="mt-1"
                    />
                  </div>

                  {/* Tags */}
                  <div>
                    <Label className="text-gray-900">Tags</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Add tag"
                        onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                      />
                      <Button
                        type="button"
                        onClick={addTag}
                        variant="outline"
                        className="border-gray-300 bg-transparent"
                      >
                        Add
                      </Button>
                    </div>
                    {newProduct.tags && newProduct.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {newProduct.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="bg-gray-100 text-gray-700">
                            {tag}
                            <button onClick={() => removeTag(tag)} className="ml-2 hover:text-gray-600" type="button">
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Image Upload */}
                  <div>
                    <Label className="text-gray-900">Product Images</Label>
                    <div className="mt-1">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e.target.files)}
                        className="hidden"
                        id="product-images"
                      />
                      <label
                        htmlFor="product-images"
                        className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#FF9100] hover:bg-orange-50 transition-colors"
                      >
                        <div className="text-center">
                          <Upload className="mx-auto h-8 w-8 text-gray-400" />
                          <p className="mt-2 text-sm text-gray-600">Click to upload images</p>
                          <p className="text-xs text-gray-500">PNG, JPG up to 10MB each</p>
                        </div>
                      </label>
                    </div>

                    {/* Image Preview */}
                    {newProduct.images && newProduct.images.length > 0 && (
                      <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mt-3">
                        {newProduct.images.map((image, index) => (
                          <div key={index} className="relative group">
                            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                              <ImageIcon className="h-8 w-8 text-gray-400" />
                            </div>
                            <button
                              onClick={() => removeImage(index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              type="button"
                            >
                              <X className="h-3 w-3" />
                            </button>
                            <p className="text-xs text-gray-600 mt-1 truncate">{image.name}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={addProduct}
                      disabled={
                        !newProduct.name || !newProduct.price || !newProduct.description || !newProduct.category
                      }
                      className="bg-[#FF9100] hover:bg-[#FF9100]/90 text-white"
                    >
                      Add Product
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowAddProduct(false)}
                      className="border-gray-300 text-gray-700"
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      )}

      {/* Summary */}
      <Card className="border-gray-200 bg-gray-50">
        <CardContent className="p-4">
          <h4 className="font-semibold text-gray-900 mb-2">Summary</h4>
          <div className="text-sm text-gray-600">
            <p>Services: {formData.services.length}</p>
            <p>Products: {formData.products.length}</p>
            <p>Total Images: {formData.products.reduce((total, product) => total + product.images.length, 0)}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
