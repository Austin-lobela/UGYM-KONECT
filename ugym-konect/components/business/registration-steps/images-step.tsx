"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, X, ImageIcon } from "lucide-react"
import Image from "next/image"
import type { BusinessFormData } from "../business-registration-form"

interface ImagesStepProps {
  formData: BusinessFormData
  updateFormData: (updates: Partial<BusinessFormData>) => void
}

export function ImagesStep({ formData, updateFormData }: ImagesStepProps) {
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFiles = (files: FileList) => {
    const newFiles = Array.from(files).filter(
      (file) => file.type.startsWith("image/") && file.size <= 5 * 1024 * 1024, // 5MB limit
    )

    updateFormData({
      images: [...formData.images, ...newFiles].slice(0, 10), // Max 10 images
    })
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files)
    }
  }

  const removeImage = (index: number) => {
    updateFormData({
      images: formData.images.filter((_, i) => i !== index),
    })
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-foreground mb-2">Showcase Your Business</h3>
        <p className="text-muted-foreground">
          Upload high-quality images of your facilities, equipment, or products. You can upload up to 10 images.
        </p>
      </div>

      {/* Upload Area */}
      <Card>
        <CardContent className="pt-6">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h4 className="text-lg font-medium text-foreground mb-2">Drag and drop images here</h4>
            <p className="text-muted-foreground mb-4">or click to browse your files</p>
            <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
              Choose Files
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
            />
            <p className="text-xs text-muted-foreground mt-2">
              Maximum file size: 5MB per image. Supported formats: JPG, PNG, WebP
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Image Preview */}
      {formData.images.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Uploaded Images ({formData.images.length}/10)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {formData.images.map((file, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                    <Image
                      src={URL.createObjectURL(file) || "/placeholder.svg"}
                      alt={`Upload ${index + 1}`}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeImage(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                    {index === 0 ? "Main" : `${index + 1}`}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              The first image will be used as your main business photo. You can reorder images by uploading them in your
              preferred order.
            </p>
          </CardContent>
        </Card>
      )}

      {formData.images.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="pt-6 text-center">
            <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              No images uploaded yet. Images help customers understand what you offer and can significantly increase
              engagement.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
