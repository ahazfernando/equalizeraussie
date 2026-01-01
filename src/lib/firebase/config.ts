import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyC_e897bcl1djTTX_DVpLawKGn74VeqghQ",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "equalizerrv-395fe.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "equalizerrv-395fe",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "equalizerrv-395fe.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "290137009452",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:290137009452:web:178410655f4bbea8079089",
};

// Validate that all required environment variables are set
const requiredEnvVars = [
  "NEXT_PUBLIC_FIREBASE_API_KEY",
  "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
  "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
  "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
  "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
  "NEXT_PUBLIC_FIREBASE_APP_ID",
];

const missingVars = requiredEnvVars.filter(
  (varName) => !process.env[varName]
);

if (missingVars.length > 0 && typeof window !== "undefined") {
  console.warn(
    "Missing Firebase environment variables:",
    missingVars.join(", ")
  );
}

// Initialize Firebase only if config is valid
let app: FirebaseApp;

if (!getApps().length) {
  // Check if we have minimum required config
  if (firebaseConfig.apiKey && firebaseConfig.projectId) {
    try {
      app = initializeApp(firebaseConfig);
    } catch (error) {
      console.error("Firebase initialization error:", error);
      // Only throw on client side where it matters
      if (typeof window !== "undefined") {
        throw error;
      }
      // On server side, try to initialize anyway (might work with partial config)
      app = initializeApp(firebaseConfig);
    }
  } else {
    // Only throw error on client side
    if (typeof window !== "undefined") {
      const errorMsg = "Firebase configuration is incomplete. Please check your environment variables.";
      console.error(errorMsg);
      throw new Error(errorMsg);
    }
    // On server side, initialize with what we have (will fail gracefully)
    app = initializeApp(firebaseConfig);
  }
} else {
  app = getApps()[0];
}

// Initialize Firebase services
export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);
export const storage: FirebaseStorage = getStorage(app);

export default app;


