import {
  collection,
  doc,
  addDoc,
  updateDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  type QueryConstraint,
} from "firebase/firestore"
import { db } from "../firebase"
import type { Business, Product, Service, Gym, User, Inquiry, Cart } from "../types/firestore"

// Collection references
export const businessesCollection = collection(db, "businesses")
export const productsCollection = collection(db, "products")
export const servicesCollection = collection(db, "services")
export const gymsCollection = collection(db, "gyms")
export const usersCollection = collection(db, "users")
export const inquiriesCollection = collection(db, "inquiries")

// Business operations
export const createBusiness = async (businessData: Omit<Business, "id">) => {
  const docRef = await addDoc(businessesCollection, {
    ...businessData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })
  return docRef.id
}

export const updateBusiness = async (businessId: string, updates: Partial<Business>) => {
  const businessRef = doc(db, "businesses", businessId)
  await updateDoc(businessRef, {
    ...updates,
    updatedAt: new Date().toISOString(),
  })
}

export const getBusiness = async (businessId: string): Promise<Business | null> => {
  const businessRef = doc(db, "businesses", businessId)
  const businessSnap = await getDoc(businessRef)

  if (businessSnap.exists()) {
    return { id: businessSnap.id, ...businessSnap.data() } as Business
  }
  return null
}

export const getBusinessesByStatus = async (status: Business["status"] = "approved") => {
  const q = query(businessesCollection, where("status", "==", status), orderBy("createdAt", "desc"))
  const querySnapshot = await getDocs(q)

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Business[]
}

export const getBusinessesByOwner = async (ownerUid: string) => {
  const q = query(businessesCollection, where("ownerUid", "==", ownerUid), orderBy("createdAt", "desc"))
  const querySnapshot = await getDocs(q)

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Business[]
}

// Product operations
export const createProduct = async (productData: Omit<Product, "id">) => {
  const docRef = await addDoc(productsCollection, {
    ...productData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })
  return docRef.id
}

export const updateProduct = async (productId: string, updates: Partial<Product>) => {
  const productRef = doc(db, "products", productId)
  await updateDoc(productRef, {
    ...updates,
    updatedAt: new Date().toISOString(),
  })
}

export const getProduct = async (productId: string): Promise<Product | null> => {
  const productRef = doc(db, "products", productId)
  const productSnap = await getDoc(productRef)

  if (productSnap.exists()) {
    return { id: productSnap.id, ...productSnap.data() } as Product
  }
  return null
}

export const getProductsByBusiness = async (businessId: string) => {
  const q = query(
    productsCollection,
    where("businessId", "==", businessId),
    where("status", "==", "approved"),
    orderBy("createdAt", "desc"),
  )
  const querySnapshot = await getDocs(q)

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Product[]
}

export const getProductsByCategory = async (category: string, limitCount = 20) => {
  const q = query(
    productsCollection,
    where("category", "==", category),
    where("status", "==", "approved"),
    orderBy("createdAt", "desc"),
    limit(limitCount),
  )
  const querySnapshot = await getDocs(q)

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Product[]
}

// Service operations
export const createService = async (serviceData: Omit<Service, "id">) => {
  const docRef = await addDoc(servicesCollection, {
    ...serviceData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })
  return docRef.id
}

export const getServicesByType = async (serviceTypes: string[], limitCount = 20) => {
  const q = query(
    servicesCollection,
    where("serviceTypes", "array-contains-any", serviceTypes),
    where("status", "==", "approved"),
    orderBy("createdAt", "desc"),
    limit(limitCount),
  )
  const querySnapshot = await getDocs(q)

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Service[]
}

// Gym operations
export const createGym = async (gymData: Omit<Gym, "id">) => {
  const docRef = await addDoc(gymsCollection, {
    ...gymData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })
  return docRef.id
}

export const getGymsByLocation = async (city: string, province: string) => {
  const q = query(
    gymsCollection,
    where("location.city", "==", city),
    where("location.province", "==", province),
    where("status", "==", "approved"),
    orderBy("createdAt", "desc"),
  )
  const querySnapshot = await getDocs(q)

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Gym[]
}

// User operations
export const createUser = async (userData: Omit<User, "uid">, uid: string) => {
  const userRef = doc(db, "users", uid)
  await updateDoc(userRef, {
    ...userData,
    uid,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })
}

export const getUser = async (uid: string): Promise<User | null> => {
  const userRef = doc(db, "users", uid)
  const userSnap = await getDoc(userRef)

  if (userSnap.exists()) {
    return { uid: userSnap.id, ...userSnap.data() } as User
  }
  return null
}

// Inquiry operations
export const createInquiry = async (inquiryData: Omit<Inquiry, "id">) => {
  const docRef = await addDoc(inquiriesCollection, {
    ...inquiryData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })
  return docRef.id
}

export const getInquiriesByBusiness = async (businessId: string) => {
  const q = query(inquiriesCollection, where("toBusinessId", "==", businessId), orderBy("createdAt", "desc"))
  const querySnapshot = await getDocs(q)

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Inquiry[]
}

// Cart operations
export const getUserCart = async (userId: string): Promise<Cart | null> => {
  const cartRef = doc(db, "users", userId, "cart", "items")
  const cartSnap = await getDoc(cartRef)

  if (cartSnap.exists()) {
    return cartSnap.data() as Cart
  }
  return null
}

export const updateUserCart = async (userId: string, cartData: Cart) => {
  const cartRef = doc(db, "users", userId, "cart", "items")
  await updateDoc(cartRef, {
    ...cartData,
    updatedAt: new Date().toISOString(),
  })
}

// Search and filtering utilities
export const searchBusinesses = async (
  searchTerm: string,
  filters: {
    type?: Business["type"]
    city?: string
    province?: string
  } = {},
  limitCount = 20,
) => {
  const constraints: QueryConstraint[] = [
    where("status", "==", "approved"),
    orderBy("createdAt", "desc"),
    limit(limitCount),
  ]

  if (filters.type) {
    constraints.unshift(where("type", "==", filters.type))
  }
  if (filters.city) {
    constraints.unshift(where("location.city", "==", filters.city))
  }
  if (filters.province) {
    constraints.unshift(where("location.province", "==", filters.province))
  }

  const q = query(businessesCollection, ...constraints)
  const querySnapshot = await getDocs(q)

  let results = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Business[]

  // Client-side text search (for simple implementation)
  if (searchTerm) {
    const searchLower = searchTerm.toLowerCase()
    results = results.filter(
      (business) =>
        business.name.toLowerCase().includes(searchLower) || business.description.toLowerCase().includes(searchLower),
    )
  }

  return results
}
