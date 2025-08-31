// Firestore Security Rules (to be applied in Firebase Console)
// This file serves as documentation for the security rules

export const FIRESTORE_SECURITY_RULES = `
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read and write their own user document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      // User's cart subcollection
      match /cart/{document=**} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
    
    // Businesses - public read for approved, owner write
    match /businesses/{businessId} {
      allow read: if resource.data.status == 'approved';
      allow create: if request.auth != null && 
                   request.auth.uid == request.resource.data.ownerUid;
      allow update: if request.auth != null && 
                   request.auth.uid == resource.data.ownerUid;
      allow delete: if request.auth != null && 
                   request.auth.uid == resource.data.ownerUid;
    }
    
    // Products - public read for approved, business owner write
    match /products/{productId} {
      allow read: if resource.data.status == 'approved';
      allow create, update, delete: if request.auth != null && 
                                   isBusinessOwner(request.auth.uid, resource.data.businessId);
    }
    
    // Services - public read for approved, owner write
    match /services/{serviceId} {
      allow read: if resource.data.status == 'approved';
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
                           (resource.data.businessId == null || 
                            isBusinessOwner(request.auth.uid, resource.data.businessId));
    }
    
    // Gyms - public read for approved, owner write
    match /gyms/{gymId} {
      allow read: if resource.data.status == 'approved';
      allow create: if request.auth != null && 
                   request.auth.uid == request.resource.data.ownerUid;
      allow update, delete: if request.auth != null && 
                           request.auth.uid == resource.data.ownerUid;
    }
    
    // Inquiries - create for authenticated users, read/update for business owners
    match /inquiries/{inquiryId} {
      allow create: if request.auth != null;
      allow read, update: if request.auth != null && 
                         (isBusinessOwner(request.auth.uid, resource.data.toBusinessId) ||
                          request.auth.token.email == resource.data.fromUser.email);
    }
    
    // Helper function to check if user owns a business
    function isBusinessOwner(uid, businessId) {
      return exists(/databases/$(database)/documents/businesses/$(businessId)) &&
             get(/databases/$(database)/documents/businesses/$(businessId)).data.ownerUid == uid;
    }
  }
}
`

export const STORAGE_SECURITY_RULES = `
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Images can be read by anyone, but only uploaded by authenticated users
    match /images/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null &&
                   request.resource.size < 10 * 1024 * 1024 && // 10MB limit
                   request.resource.contentType.matches('image/.*');
    }
    
    // Business images - only business owner can upload
    match /images/businesses/{businessId}/{fileName} {
      allow write: if request.auth != null &&
                   isBusinessOwner(request.auth.uid, businessId);
    }
    
    // Product images - only business owner can upload
    match /images/products/{productId}/{fileName} {
      allow write: if request.auth != null &&
                   isProductOwner(request.auth.uid, productId);
    }
    
    // User avatars - only user can upload their own avatar
    match /images/users/{userId}/{fileName} {
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Helper functions would need to be implemented with Firestore lookups
    function isBusinessOwner(uid, businessId) {
      return true; // Simplified for now - would need Firestore lookup
    }
    
    function isProductOwner(uid, productId) {
      return true; // Simplified for now - would need Firestore lookup
    }
  }
}
`
