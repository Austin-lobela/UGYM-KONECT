// Cloud Functions for server-side operations
// This file contains the structure for Firebase Cloud Functions

export const CLOUD_FUNCTIONS_STRUCTURE = `
// functions/src/index.ts

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';

admin.initializeApp();

// Email configuration
const transporter = nodemailer.createTransporter({
  service: 'gmail', // or your preferred email service
  auth: {
    user: functions.config().email.user,
    pass: functions.config().email.password,
  },
});

// Send inquiry email to business and admin
export const sendInquiryEmail = functions.firestore
  .document('inquiries/{inquiryId}')
  .onCreate(async (snap, context) => {
    const inquiry = snap.data();
    const inquiryId = context.params.inquiryId;
    
    try {
      // Get business details
      const businessDoc = await admin.firestore()
        .collection('businesses')
        .doc(inquiry.toBusinessId)
        .get();
      
      if (!businessDoc.exists) {
        console.error('Business not found:', inquiry.toBusinessId);
        return;
      }
      
      const business = businessDoc.data();
      
      // Email to business
      const businessEmailOptions = {
        from: functions.config().email.user,
        to: business.contact.email,
        subject: \`New Inquiry from UGYM-KONECT - \${inquiry.fromUser.name}\`,
        html: \`
          <h2>New Inquiry Received</h2>
          <p><strong>From:</strong> \${inquiry.fromUser.name}</p>
          <p><strong>Email:</strong> \${inquiry.fromUser.email}</p>
          \${inquiry.fromUser.phone ? \`<p><strong>Phone:</strong> \${inquiry.fromUser.phone}</p>\` : ''}
          <p><strong>Type:</strong> \${inquiry.type}</p>
          \${inquiry.desiredDate ? \`<p><strong>Desired Date:</strong> \${inquiry.desiredDate}</p>\` : ''}
          \${inquiry.desiredTime ? \`<p><strong>Desired Time:</strong> \${inquiry.desiredTime}</p>\` : ''}
          <p><strong>Message:</strong></p>
          <p>\${inquiry.message}</p>
          
          <hr>
          <p>Please respond to this inquiry directly by replying to this email or contacting the customer.</p>
          <p>This inquiry was sent through UGYM-KONECT platform.</p>
        \`,
      };
      
      // Email to admin
      const adminEmailOptions = {
        from: functions.config().email.user,
        to: 'admin@ugym-konect.co.za', // Admin email
        subject: \`New Inquiry - \${business.name}\`,
        html: \`
          <h2>New Inquiry Submitted</h2>
          <p><strong>Business:</strong> \${business.name}</p>
          <p><strong>Customer:</strong> \${inquiry.fromUser.name} (\${inquiry.fromUser.email})</p>
          <p><strong>Type:</strong> \${inquiry.type}</p>
          <p><strong>Inquiry ID:</strong> \${inquiryId}</p>
          
          <p>View full details in the admin dashboard.</p>
        \`,
      };
      
      // Send both emails
      await Promise.all([
        transporter.sendMail(businessEmailOptions),
        transporter.sendMail(adminEmailOptions),
      ]);
      
      console.log('Inquiry emails sent successfully for:', inquiryId);
      
    } catch (error) {
      console.error('Error sending inquiry emails:', error);
    }
  });

// Business approval notification
export const sendBusinessApprovalEmail = functions.firestore
  .document('businesses/{businessId}')
  .onUpdate(async (change, context) => {
    const before = change.before.data();
    const after = change.after.data();
    const businessId = context.params.businessId;
    
    // Check if status changed to approved
    if (before.status !== 'approved' && after.status === 'approved') {
      try {
        // Get user details
        const userDoc = await admin.firestore()
          .collection('users')
          .doc(after.ownerUid)
          .get();
        
        if (!userDoc.exists) {
          console.error('User not found:', after.ownerUid);
          return;
        }
        
        const user = userDoc.data();
        
        const emailOptions = {
          from: functions.config().email.user,
          to: user.email,
          subject: 'Your Business Has Been Approved - UGYM-KONECT',
          html: \`
            <h2>Congratulations! Your Business Has Been Approved</h2>
            <p>Dear \${user.firstName} \${user.lastName},</p>
            
            <p>We're excited to inform you that your business "<strong>\${after.name}</strong>" has been approved and is now live on UGYM-KONECT!</p>
            
            <p>Your business is now visible to thousands of fitness enthusiasts across South Africa. Customers can:</p>
            <ul>
              <li>Find your business in search results</li>
              <li>View your products and services</li>
              <li>Contact you directly through our platform</li>
              <li>Book appointments or make inquiries</li>
            </ul>
            
            <p>You can manage your business profile and view inquiries in your dashboard.</p>
            
            <p>Thank you for joining UGYM-KONECT. We look forward to helping you grow your business!</p>
            
            <p>Best regards,<br>The UGYM-KONECT Team</p>
          \`,
        };
        
        await transporter.sendMail(emailOptions);
        console.log('Business approval email sent to:', user.email);
        
      } catch (error) {
        console.error('Error sending business approval email:', error);
      }
    }
  });

// Generate thumbnails for uploaded images
export const generateThumbnails = functions.storage
  .object()
  .onFinalize(async (object) => {
    // TODO: Implement image thumbnail generation
    // This would use Sharp or similar library to create thumbnails
    console.log('File uploaded:', object.name);
  });
`
