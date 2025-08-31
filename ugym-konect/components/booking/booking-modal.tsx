"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { CalendarIcon, Clock, User, CreditCard } from "lucide-react"
import { format } from "date-fns"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  provider: any
  service: any
}

export function BookingModal({ isOpen, onClose, provider, service }: BookingModalProps) {
  const { toast } = useToast()
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState("")
  const [step, setStep] = useState(1)
  const [bookingData, setBookingData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    notes: "",
    paymentMethod: "",
  })

  const handleBooking = () => {
    toast({
      title: "Booking confirmed!",
      description: `Your appointment with ${provider.name} has been booked for ${format(selectedDate!, "PPP")} at ${selectedTime}.`,
    })
    onClose()
    setStep(1)
    setSelectedDate(undefined)
    setSelectedTime("")
  }

  const availableSlots = selectedDate
    ? provider.availability.find((day: any) => day.day === format(selectedDate, "EEEE"))?.slots || []
    : []

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Book Appointment - {service?.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Service Summary */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{service?.name}</h3>
                <p className="text-sm text-muted-foreground">{provider.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">{service?.duration}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">R{service?.price}</div>
              </div>
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  Select Date & Time
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-base">Choose Date</Label>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                      className="rounded-md border"
                    />
                  </div>

                  <div>
                    <Label className="text-base">Available Times</Label>
                    {selectedDate ? (
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {availableSlots.map((slot: string) => (
                          <Badge
                            key={slot}
                            variant={selectedTime === slot ? "default" : "outline"}
                            className="cursor-pointer justify-center py-2"
                            onClick={() => setSelectedTime(slot)}
                          >
                            {slot}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground mt-2">Please select a date to see available times</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => setStep(2)} disabled={!selectedDate || !selectedTime}>
                  Continue
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Your Information
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={bookingData.firstName}
                      onChange={(e) => setBookingData((prev) => ({ ...prev, firstName: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={bookingData.lastName}
                      onChange={(e) => setBookingData((prev) => ({ ...prev, lastName: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={bookingData.email}
                      onChange={(e) => setBookingData((prev) => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={bookingData.phone}
                      onChange={(e) => setBookingData((prev) => ({ ...prev, phone: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <Label htmlFor="notes">Additional Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    value={bookingData.notes}
                    onChange={(e) => setBookingData((prev) => ({ ...prev, notes: e.target.value }))}
                    placeholder="Any specific requirements or information for your appointment..."
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button onClick={() => setStep(3)}>Continue to Payment</Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment & Confirmation
                </h3>

                {/* Booking Summary */}
                <div className="bg-muted/50 p-4 rounded-lg mb-6">
                  <h4 className="font-semibold mb-2">Booking Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Service:</span>
                      <span>{service?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Provider:</span>
                      <span>{provider.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Date:</span>
                      <span>{selectedDate && format(selectedDate, "PPP")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time:</span>
                      <span>{selectedTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span>{service?.duration}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold">
                      <span>Total:</span>
                      <span>R{service?.price}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="paymentMethod">Payment Method</Label>
                  <Select
                    value={bookingData.paymentMethod}
                    onValueChange={(value) => setBookingData((prev) => ({ ...prev, paymentMethod: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="card">Credit/Debit Card</SelectItem>
                      <SelectItem value="eft">EFT Transfer</SelectItem>
                      <SelectItem value="payfast">PayFast</SelectItem>
                      <SelectItem value="cash">Pay at Appointment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button onClick={handleBooking} className="bg-primary">
                  Confirm Booking
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
