"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useCart } from "@/lib/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"
import { ShoppingCart, CreditCard, Truck, Shield } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function CheckoutPage() {
  const { state, dispatch } = useCart()
  const { toast } = useToast()
  const [isProcessing, setIsProcessing] = useState(false)

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    paymentMethod: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    agreeToTerms: false,
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.agreeToTerms) {
      toast({
        title: "Terms required",
        description: "Please agree to the terms and conditions.",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      dispatch({ type: "CLEAR_CART" })
      toast({
        title: "Order placed successfully!",
        description: "You will receive a confirmation email shortly.",
      })
      setIsProcessing(false)
    }, 2000)
  }

  if (state.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">Add some products to get started</p>
          <Button asChild>
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Checkout</h1>
        <p className="text-muted-foreground">Complete your order</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Order Form */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  required
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="address">Street Address</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="province">Province</Label>
                  <Select value={formData.province} onValueChange={(value) => handleInputChange("province", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select province" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gauteng">Gauteng</SelectItem>
                      <SelectItem value="western-cape">Western Cape</SelectItem>
                      <SelectItem value="kwazulu-natal">KwaZulu-Natal</SelectItem>
                      <SelectItem value="eastern-cape">Eastern Cape</SelectItem>
                      <SelectItem value="free-state">Free State</SelectItem>
                      <SelectItem value="limpopo">Limpopo</SelectItem>
                      <SelectItem value="mpumalanga">Mpumalanga</SelectItem>
                      <SelectItem value="north-west">North West</SelectItem>
                      <SelectItem value="northern-cape">Northern Cape</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input
                  id="postalCode"
                  value={formData.postalCode}
                  onChange={(e) => handleInputChange("postalCode", e.target.value)}
                  required
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select
                value={formData.paymentMethod}
                onValueChange={(value) => handleInputChange("paymentMethod", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="card">Credit/Debit Card</SelectItem>
                  <SelectItem value="eft">EFT Transfer</SelectItem>
                  <SelectItem value="payfast">PayFast</SelectItem>
                </SelectContent>
              </Select>

              {formData.paymentMethod === "card" && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={(e) => handleInputChange("cvv", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {state.items.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={60}
                    height={60}
                    className="rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-sm line-clamp-2">{item.name}</h4>
                    <p className="text-xs text-muted-foreground">{item.brand}</p>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-sm">Qty: {item.quantity}</span>
                      <span className="font-medium">R{item.price * item.quantity}</span>
                    </div>
                  </div>
                </div>
              ))}

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>R{state.total}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Platform Fee (30%):</span>
                  <span>R{Math.round(state.total * 0.3)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span className="text-primary">R{Math.round(state.total * 1.3)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                  />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the{" "}
                    <Link href="/terms" className="text-primary hover:underline">
                      Terms and Conditions
                    </Link>
                  </Label>
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={isProcessing || !formData.agreeToTerms}>
                  {isProcessing ? "Processing..." : `Place Order - R${Math.round(state.total * 1.3)}`}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
