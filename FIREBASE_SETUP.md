# Firebase Setup Guide

This project uses Firebase for authentication, database (Firestore), and file storage. Follow these steps to set up Firebase for your project.

## Prerequisites

1. A Google account
2. Access to [Firebase Console](https://console.firebase.google.com/)

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard:
   - Enter a project name
   - Enable/disable Google Analytics (optional)
   - Click "Create project"

## Step 2: Enable Firebase Services

### Enable Authentication

1. In Firebase Console, go to **Authentication** > **Get started**
2. Click on **Sign-in method** tab
3. Enable **Email/Password** authentication
4. Click **Save**

### Enable Firestore Database

1. Go to **Firestore Database** > **Create database**
2. Choose **Start in test mode** (for development) or **Start in production mode**
3. Select a location for your database
4. Click **Enable**

### Enable Storage

1. Go to **Storage** > **Get started**
2. Start in test mode (for development) or production mode
3. Choose a location (preferably same as Firestore)
4. Click **Done**

## Step 3: Get Firebase Configuration

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll down to **Your apps** section
3. Click the **Web** icon (`</>`) to add a web app
4. Register your app with a nickname (e.g., "Equalizer RV Web")
5. Copy the Firebase configuration object

## Step 4: Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Open `.env.local` and fill in your Firebase configuration:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

## Step 5: Set Up Firestore Security Rules (Production)

For production, update your Firestore security rules:

1. Go to **Firestore Database** > **Rules**
2. Update rules based on your needs. Example:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Caravans - public read, admin write
    match /caravans/{caravanId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Bookings - authenticated users can create, admins can read/write
    match /bookings/{bookingId} {
      allow create: if request.auth != null;
      allow read, update, delete: if request.auth != null;
    }
    
    // Reviews - public read, authenticated users can create
    match /reviews/{reviewId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null;
    }
    
    // Articles - public read, admin write
    match /articles/{articleId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Step 6: Set Up Storage Security Rules (Production)

1. Go to **Storage** > **Rules**
2. Update rules. Example:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Step 7: Create Admin User (Optional)

To create an admin user for testing:

1. Go to **Authentication** > **Users**
2. Click **Add user**
3. Enter email and password
4. Click **Add user**

Or use the registration function in your app and then manually set admin permissions in Firestore.

## Usage Examples

### Authentication

```typescript
import { login, logout, useAuth } from "@/lib/firebase";

// In a component
const { user, loading } = useAuth();

// Login
const handleLogin = async () => {
  const { user, error } = await login(email, password);
  if (error) {
    console.error(error);
  }
};

// Logout
const handleLogout = async () => {
  await logout();
};
```

### Firestore

```typescript
import { 
  getCaravans, 
  getCaravanById, 
  createBooking,
  getBookings 
} from "@/lib/firebase";

// Get all caravans
const caravans = await getCaravans();

// Get single caravan
const caravan = await getCaravanById("caravan-id");

// Create booking
const bookingId = await createBooking({
  customerName: "John Doe",
  email: "john@example.com",
  // ... other fields
});
```

### Storage

```typescript
import { uploadImage } from "@/lib/firebase";

// Upload image
const file = event.target.files[0];
const { url, error } = await uploadImage(file, "caravans");
if (url) {
  console.log("Image URL:", url);
}
```

## Collections Structure

### Caravans
- Collection: `caravans`
- Fields: id, name, series, tagline, price, length, berth, tare, atm, features, description, images, specs, variants, available, featured, createdAt, updatedAt

### Bookings
- Collection: `bookings`
- Fields: id, customerName, email, phone, caravanModel, caravanId, preferredDate, status, notes, createdAt, updatedAt

### Reviews
- Collection: `reviews`
- Fields: id, author, location, caravanModel, caravanId, rating, title, content, date, verified, tripHighlight, createdAt, updatedAt

### Articles
- Collection: `articles`
- Fields: id, title, slug, content, excerpt, author, publishedAt, image, tags, createdAt, updatedAt

## Troubleshooting

1. **"Firebase: Error (auth/configuration-not-found)"**
   - Check that all environment variables are set correctly
   - Restart your development server after adding environment variables

2. **"Permission denied" errors**
   - Check Firestore/Storage security rules
   - Ensure user is authenticated for write operations

3. **Images not loading**
   - Verify Storage bucket is configured
   - Check Next.js image configuration in `next.config.ts`
   - Ensure Firebase Storage URLs are in `remotePatterns`

## Next Steps

- Migrate existing data from static files to Firestore
- Implement admin authentication checks
- Set up proper security rules for production
- Configure Firebase Hosting (optional)


