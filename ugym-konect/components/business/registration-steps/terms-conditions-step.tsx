"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import type { BusinessFormData } from "../business-registration-form"

interface TermsConditionsStepProps {
  formData: BusinessFormData
  updateFormData: (updates: Partial<BusinessFormData>) => void
}

export function TermsConditionsStep({ formData, updateFormData }: TermsConditionsStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Terms & Conditions</h3>
        <p className="text-gray-600 mb-6">
          Please read and accept our terms and conditions to continue with your business registration.
        </p>
      </div>

      {/* Scrollable Terms Content */}
      <Card className="border-gray-200">
        <CardContent className="p-0">
          <ScrollArea className="h-96 p-6">
            <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
              <h4 className="font-semibold text-gray-900">1. Business Registration Agreement</h4>
              <p>
                By registering your business on UGYM-KONECT, you agree to provide accurate and up-to-date information
                about your services, products, and business operations. You are responsible for maintaining the accuracy
                of your business profile and promptly updating any changes.
              </p>

              <h4 className="font-semibold text-gray-900">2. Platform Commission</h4>
              <p>
                UGYM-KONECT charges a 30% commission on all transactions processed through our platform. This commission
                is automatically deducted from payments made by customers for your products or services. Commission
                rates may be subject to change with 30 days written notice.
              </p>

              <h4 className="font-semibold text-gray-900">3. Content and Listing Standards</h4>
              <p>
                All business listings, product descriptions, and images must be accurate, appropriate, and comply with
                South African laws and regulations. We reserve the right to review, edit, or remove any content that
                violates our community standards or terms of service.
              </p>

              <h4 className="font-semibold text-gray-900">4. Business Verification</h4>
              <p>
                All business registrations are subject to verification and approval. We may request additional
                documentation to verify your business credentials, qualifications, and compliance with relevant
                regulations. Approval is not guaranteed and may be revoked at any time.
              </p>

              <h4 className="font-semibold text-gray-900">5. Professional Standards</h4>
              <p>
                Service providers must maintain appropriate professional qualifications and certifications for their
                respective fields. You agree to provide services in accordance with industry best practices and
                applicable professional standards.
              </p>

              <h4 className="font-semibold text-gray-900">6. Customer Interactions</h4>
              <p>
                You are responsible for all interactions with customers, including service delivery, customer support,
                and dispute resolution. UGYM-KONECT facilitates connections but is not responsible for the quality of
                services or products provided.
              </p>

              <h4 className="font-semibold text-gray-900">7. Payment Terms</h4>
              <p>
                Payments for services and products will be processed through our secure payment system. Funds will be
                transferred to your designated account within 7-14 business days after successful completion of the
                transaction, minus applicable fees and commissions.
              </p>

              <h4 className="font-semibold text-gray-900">8. Liability and Insurance</h4>
              <p>
                You are responsible for maintaining appropriate insurance coverage for your business activities.
                UGYM-KONECT is not liable for any injuries, damages, or losses that may occur during the provision of
                your services or use of your products.
              </p>

              <h4 className="font-semibold text-gray-900">9. Intellectual Property</h4>
              <p>
                You retain ownership of your business content, images, and intellectual property. By uploading content
                to our platform, you grant UGYM-KONECT a non-exclusive license to display and promote your business
                listings.
              </p>

              <h4 className="font-semibold text-gray-900">10. Termination</h4>
              <p>
                Either party may terminate this agreement with 30 days written notice. UGYM-KONECT reserves the right to
                immediately suspend or terminate accounts that violate these terms or engage in fraudulent activities.
              </p>

              <h4 className="font-semibold text-gray-900">11. Privacy and Data Protection</h4>
              <p>
                We are committed to protecting your privacy and personal information in accordance with the Protection
                of Personal Information Act (POPIA) and other applicable privacy laws. Please review our Privacy Policy
                for detailed information about how we collect, use, and protect your data.
              </p>

              <h4 className="font-semibold text-gray-900">12. Governing Law</h4>
              <p>
                This agreement is governed by the laws of South Africa. Any disputes arising from this agreement will be
                subject to the jurisdiction of South African courts.
              </p>

              <p className="text-xs text-gray-500 mt-6">Last updated: {new Date().toLocaleDateString("en-ZA")}</p>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Acceptance Checkbox */}
      <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
        <Checkbox
          id="terms-acceptance"
          checked={formData.termsAccepted}
          onCheckedChange={(checked) => updateFormData({ termsAccepted: checked as boolean })}
          className="mt-1"
        />
        <div className="flex-1">
          <Label htmlFor="terms-acceptance" className="text-sm font-medium text-gray-900 cursor-pointer">
            I have read and agree to the Terms & Conditions *
          </Label>
          <p className="text-xs text-gray-600 mt-1">
            By checking this box, you acknowledge that you have read, understood, and agree to be bound by these terms
            and conditions.
          </p>
        </div>
      </div>
    </div>
  )
}
