import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, writeBatch } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyC_e897bcl1djTTX_DVpLawKGn74VeqghQ",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "equalizerrv-395fe.firebaseapp.com",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "equalizerrv-395fe",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "equalizerrv-395fe.firebasestorage.app",
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "290137009452",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:290137009452:web:178410655f4bbea8079089",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const clearBlogs = async () => {
    console.log(`\n🗑️ Clearing mock blogs collection...`);
    const snapshot = await getDocs(collection(db, 'blogs'));

    // Process in batches of 500 (Firestore limit)
    const batches = [];
    let currentBatch = writeBatch(db);
    let operationCount = 0;

    snapshot.docs.forEach((docSnap) => {
        currentBatch.delete(docSnap.ref);
        operationCount++;

        if (operationCount === 500) {
            batches.push(currentBatch.commit());
            currentBatch = writeBatch(db);
            operationCount = 0;
        }
    });

    if (operationCount > 0) {
        batches.push(currentBatch.commit());
    }

    await Promise.all(batches);
    console.log(`✅ Cleared ${snapshot.size} documents from blogs collection!`);
    process.exit(0);
};

clearBlogs().catch(console.error);
