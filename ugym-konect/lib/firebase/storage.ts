import { ref, uploadBytes, getDownloadURL, deleteObject, listAll } from "firebase/storage"
import { storage } from "../firebase"

// Storage paths as specified in requirements
export const STORAGE_PATHS = {
  BUSINESS_IMAGES: "images/businesses",
  PRODUCT_IMAGES: "images/products",
  SERVICE_IMAGES: "images/services",
  GYM_IMAGES: "images/gyms",
  USER_AVATARS: "images/users",
} as const

// Upload single file
export const uploadFile = async (file: File, path: string, filename?: string): Promise<string> => {
  const fileName = filename || `${Date.now()}_${file.name}`
  const fileRef = ref(storage, `${path}/${fileName}`)

  // Validate file type
  if (!file.type.startsWith("image/")) {
    throw new Error("Only image files are allowed")
  }

  // Validate file size (10MB limit)
  if (file.size > 10 * 1024 * 1024) {
    throw new Error("File size must be less than 10MB")
  }

  const snapshot = await uploadBytes(fileRef, file)
  const downloadURL = await getDownloadURL(snapshot.ref)

  return downloadURL
}

// Upload multiple files
export const uploadMultipleFiles = async (files: File[], path: string): Promise<string[]> => {
  const uploadPromises = files.map((file, index) => uploadFile(file, path, `${Date.now()}_${index}_${file.name}`))

  return Promise.all(uploadPromises)
}

// Upload business images
export const uploadBusinessImages = async (businessId: string, files: File[]): Promise<string[]> => {
  const path = `${STORAGE_PATHS.BUSINESS_IMAGES}/${businessId}`
  return uploadMultipleFiles(files, path)
}

// Upload product images
export const uploadProductImages = async (productId: string, files: File[]): Promise<string[]> => {
  const path = `${STORAGE_PATHS.PRODUCT_IMAGES}/${productId}`
  return uploadMultipleFiles(files, path)
}

// Upload service images
export const uploadServiceImages = async (serviceId: string, files: File[]): Promise<string[]> => {
  const path = `${STORAGE_PATHS.SERVICE_IMAGES}/${serviceId}`
  return uploadMultipleFiles(files, path)
}

// Upload gym images
export const uploadGymImages = async (gymId: string, files: File[]): Promise<string[]> => {
  const path = `${STORAGE_PATHS.GYM_IMAGES}/${gymId}`
  return uploadMultipleFiles(files, path)
}

// Upload user avatar
export const uploadUserAvatar = async (userId: string, file: File): Promise<string> => {
  const path = `${STORAGE_PATHS.USER_AVATARS}/${userId}`
  return uploadFile(file, path, `avatar_${Date.now()}.${file.name.split(".").pop()}`)
}

// Delete file
export const deleteFile = async (url: string): Promise<void> => {
  const fileRef = ref(storage, url)
  await deleteObject(fileRef)
}

// Delete multiple files
export const deleteMultipleFiles = async (urls: string[]): Promise<void> => {
  const deletePromises = urls.map((url) => deleteFile(url))
  await Promise.all(deletePromises)
}

// List files in a directory
export const listFiles = async (path: string): Promise<string[]> => {
  const listRef = ref(storage, path)
  const result = await listAll(listRef)

  const urlPromises = result.items.map((itemRef) => getDownloadURL(itemRef))
  return Promise.all(urlPromises)
}

// Generate thumbnail (placeholder for future implementation)
export const generateThumbnail = async (
  originalUrl: string,
  size: { width: number; height: number },
): Promise<string> => {
  // TODO: Implement thumbnail generation using Cloud Functions
  // For now, return the original URL
  return originalUrl
}
