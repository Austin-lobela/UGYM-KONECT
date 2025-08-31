// Firestore Data Models

export interface BusinessLocation {
  city: string
  suburb: string
  province: string
  country: string
  coordinates?: {
    lat: number
    lng: number
  }
}

export interface BusinessContact {
  phone: string
  email: string
  website?: string
  whatsapp?: string
}

export interface Business {
  id: string
  type: "gym" | "service_provider" | "product_seller" | "multi"
  name: string
  description: string
  location: BusinessLocation
  contact: BusinessContact
  status: "pending_review" | "approved" | "rejected"
  createdAt: string
  updatedAt: string
  ownerUid: string
  imageUrls?: string[]
  socialMedia?: {
    facebook?: string
    instagram?: string
    twitter?: string
  }
  operatingHours?: {
    [key: string]: {
      open: string
      close: string
      closed: boolean
    }
  }
}

export interface Product {
  id: string
  businessId: string
  name: string
  description: string
  price: number
  currency: string
  category: string
  tags: string[]
  imageUrls: string[]
  status: "pending_review" | "approved" | "rejected"
  createdAt: string
  updatedAt: string
  inStock?: boolean
  stockQuantity?: number
}

export interface Service {
  id: string
  businessId?: string
  name: string
  headline?: string
  bio?: string
  serviceTypes: string[]
  pricing?: {
    name: string
    price: number
    description: string
    duration?: string
  }[]
  location: BusinessLocation
  contact: BusinessContact
  imageUrls: string[]
  status: "pending_review" | "approved" | "rejected"
  createdAt: string
  updatedAt: string
  qualifications?: string[]
  experience?: string
  availability?: {
    [key: string]: {
      available: boolean
      timeSlots: string[]
    }
  }
}

export interface Gym {
  id: string
  name: string
  description: string
  location: BusinessLocation
  contact: BusinessContact
  pricing: {
    name: string
    price: number
    description: string
    duration: string
  }[]
  amenities: string[]
  imageUrls: string[]
  status: "pending_review" | "approved" | "rejected"
  createdAt: string
  updatedAt: string
  ownerUid: string
  capacity?: number
  operatingHours: {
    [key: string]: {
      open: string
      close: string
      closed: boolean
    }
  }
  membershipTypes?: string[]
  classSchedule?: {
    className: string
    instructor: string
    time: string
    day: string
    duration: string
  }[]
}

export interface User {
  uid: string
  email: string
  firstName: string
  lastName: string
  userType: "client" | "gym_owner" | "trainer" | "doctor" | "dietitian" | "business_owner"
  avatar?: string
  phone?: string
  location?: {
    city: string
    province: string
  }
  preferences?: {
    fitnessGoals: string[]
    preferredActivities: string[]
    experienceLevel: string
  }
  createdAt: string
  updatedAt: string
  isVerified?: boolean
  businessIds?: string[]
}

export interface Inquiry {
  id: string
  type: "booking" | "contact" | "general"
  entityType: "gym" | "service" | "product" | "business"
  entityId: string
  fromUser: {
    name: string
    email: string
    phone?: string
  }
  toBusinessId: string
  message: string
  desiredDate?: string
  desiredTime?: string
  status: "pending" | "responded" | "closed"
  createdAt: string
  updatedAt: string
  response?: {
    message: string
    respondedAt: string
    respondedBy: string
  }
}

export interface CartItem {
  id: string
  productId: string
  businessId: string
  productName: string
  productImage: string
  price: number
  quantity: number
  addedAt: string
}

export interface Cart {
  userId: string
  items: CartItem[]
  totalAmount: number
  updatedAt: string
}

// Service Taxonomy Types
export type FitnessServiceType =
  | "Personal Trainer"
  | "Strength & Conditioning Coach"
  | "Group Class Instructor"
  | "Yoga Instructor"
  | "Pilates Instructor"
  | "CrossFit Coach"
  | "Calisthenics Coach"
  | "HIIT Coach"
  | "Aerobics Instructor"
  | "Spin/Cycling Instructor"
  | "Zumba Instructor"
  | "Boxing Coach"
  | "Kickboxing Coach"
  | "MMA Coach"
  | "Martial Arts Instructor"
  | "Running Coach"
  | "Triathlon Coach"
  | "Swimming Coach"
  | "Climbing Coach"

export type HealthServiceType =
  | "Dietitian/Nutritionist"
  | "Sports Nutritionist"
  | "Physiotherapist"
  | "Biokineticist"
  | "Chiropractor"
  | "Massage Therapist"
  | "Occupational Therapist"
  | "Psychologist"
  | "Wellness Coach"
  | "Sleep Coach"
  | "Breathwork Coach"
  | "Herbalist/Traditional Healer"
  | "Naturopath"
  | "Homeopath"

export type MedicalServiceType =
  | "GP (Sports Focus)"
  | "Sports Physician"
  | "Orthopedic Specialist"
  | "Cardiologist"
  | "Podiatrist"
  | "Dermatologist"
  | "Endocrinologist"

export type TeamSportsType =
  | "Soccer Club/Academy"
  | "Rugby Club/Academy"
  | "Cricket Club/Academy"
  | "Basketball Club"
  | "Netball Club"
  | "Hockey Club"
  | "Volleyball Club"
  | "Athletics Club"
  | "Esports Team Fitness Coaching"

export type SpecialistServiceType =
  | "Performance Analyst"
  | "Sport Scientist"
  | "Biomechanist"
  | "Referee/Umpire Trainer"
  | "Life Coach (Athletes)"
  | "Injury Prevention Specialist"

export type ServiceType =
  | FitnessServiceType
  | HealthServiceType
  | MedicalServiceType
  | TeamSportsType
  | SpecialistServiceType
