#!/usr/bin/env tsx

/**
 * Firebase Seeding Script
 * 
 * Populates Firebase with mock data for:
 * - Caravans (10-15 entries)
 * - Blogs (15 entries)
 * - Reviews (15 entries)
 * - Newsletter subscriptions (12 entries)
 */

import { initializeApp } from 'firebase/app';
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    Timestamp,
    writeBatch
} from 'firebase/firestore';
import * as readline from 'readline';

// Firebase configuration (using same config as the app)
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyC_e897bcl1djTTX_DVpLawKGn74VeqghQ",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "equalizerrv-395fe.firebaseapp.com",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "equalizerrv-395fe",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "equalizerrv-395fe.firebasestorage.app",
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "290137009452",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:290137009452:web:178410655f4bbea8079089",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Utility: Generate random date in past N days
const randomPastDate = (maxDaysAgo: number): Timestamp => {
    const now = new Date();
    const daysAgo = Math.floor(Math.random() * maxDaysAgo);
    const date = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
    return Timestamp.fromDate(date);
};

// Utility: Random pick from array
const pickRandom = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// Utility: Random number between min and max
const randomInt = (min: number, max: number): number =>
    Math.floor(Math.random() * (max - min + 1)) + min;

// Australian Names
const firstNames = ['James', 'Sarah', 'Michael', 'Emma', 'Chris', 'Olivia', 'Daniel', 'Sophie', 'Matthew', 'Emily', 'Andrew', 'Jessica', 'David', 'Rachel', 'Tom', 'Kate', 'Ben', 'Laura', 'Sam', 'Amy'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Wilson', 'Anderson', 'Taylor', 'Thomas', 'Moore', 'Jackson', 'Martin', 'Lee', 'Thompson', 'White', 'Harris', 'Clark', 'Lewis'];

// Australian locations
const locations = [
    { city: 'Melbourne', state: 'VIC' },
    { city: 'Sydney', state: 'NSW' },
    { city: 'Brisbane', state: 'QLD' },
    { city: 'Perth', state: 'WA' },
    { city: 'Adelaide', state: 'SA' },
    { city: 'Hobart', state: 'TAS' },
    { city: 'Darwin', state: 'NT' },
    { city: 'Canberra', state: 'ACT' },
    { city: 'Gold Coast', state: 'QLD' },
    { city: 'Newcastle', state: 'NSW' },
    { city: 'Geelong', state: 'VIC' },
    { city: 'Townsville', state: 'QLD' },
];

// Trip highlights
const tripHighlights = [
    'Great Ocean Road, VIC',
    'Cape York, QLD',
    'Uluru, NT',
    'The Kimberley, WA',
    'Tasmania East Coast',
    'Flinders Ranges, SA',
    'Blue Mountains, NSW',
    'Kakadu National Park, NT',
    'Fraser Island, QLD',
    'Margaret River, WA',
];

// ============================================================================
// CARAVAN DATA
// ============================================================================

const caravanSeries = ['Explorer', 'Outback', 'Horizon', 'Summit', 'Compact'] as const;

const generateCaravans = (count: number) => {
    const caravans = [];

    for (let i = 0; i < count; i++) {
        const series = pickRandom([...caravanSeries]);
        const modelNumber = 21 + i;
        const name = `${series} ${modelNumber}`;
        const berth = pickRandom([2, 4] as const);
        const basePrice = randomInt(55000, 95000);

        caravans.push({
            name,
            series,
            tagline: `${berth}-berth luxury caravan built for Australian adventures`,
            price: basePrice,
            length: `${randomInt(18, 24)}.${randomInt(0, 9)}ft`,
            berth,
            tare: `${randomInt(1800, 2400)}kg`,
            atm: `${randomInt(2400, 3200)}kg`,
            features: [
                'Ensuite bathroom',
                'Full kitchen with gas cooktop',
                'Air conditioning',
                'Solar panels',
                'Queen bed',
                'LED lighting',
            ],
            description: `The ${name} is designed for comfort and adventure. Perfect for families exploring Australia's diverse landscapes.`,
            images: [
                'https://placehold.co/800x600/1a1a1a/white?text=Exterior+View',
                'https://placehold.co/800x600/1a1a1a/white?text=Interior+View',
                'https://placehold.co/800x600/1a1a1a/white?text=Kitchen',
            ],
            specs: [
                {
                    category: 'Dimensions',
                    items: [
                        { label: 'Overall Length', value: `${randomInt(6, 7)}.${randomInt(0, 9)}m` },
                        { label: 'Overall Width', value: '2.4m' },
                        { label: 'Overall Height', value: '3.2m' },
                    ],
                },
                {
                    category: 'Weights',
                    items: [
                        { label: 'Tare Weight', value: `${randomInt(1800, 2400)}kg` },
                        { label: 'ATM', value: `${randomInt(2400, 3200)}kg` },
                        { label: 'Ball Weight', value: '180kg' },
                    ],
                },
            ],
            variants: [
                { name: 'Standard', priceModifier: 0 },
                { name: 'Premium', priceModifier: 8000 },
            ],
            available: Math.random() > 0.2,
            featured: Math.random() > 0.6,
            createdAt: randomPastDate(180),
            lastUpdated: randomPastDate(30),
        });
    }

    return caravans;
};

// ============================================================================
// BLOG DATA
// ============================================================================

const blogTitles = [
    'Top 10 Caravan Parks on the East Coast',
    'Essential Maintenance Tips for Your RV',
    'How to Prepare Your Caravan for Winter',
    'Best Camping Spots in the Outback',
    'Family Road Trip: Sydney to Brisbane',
    'Solo Traveller Guide to Caravanning',
    'Understanding Caravan Weights and Towing',
    'Solar Power Setup for Your RV',
    'Pet-Friendly Caravan Parks in Australia',
    'Caravan Insurance: What You Need to Know',
    'Cooking on the Road: Easy Camping Recipes',
    'Off-Grid Adventures in the Northern Territory',
    'Upgrading Your Caravan Interior',
    'Safety Tips for Towing a Caravan',
    'The Ultimate Australian Caravan Road Trip',
];

const generateSlug = (title: string): string => {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
};

const generateBlogs = (count: number) => {
    const blogs = [];
    const authors = ['Alex Thompson', 'Sarah Mitchell', 'David Chen', 'Emma Wilson'];

    for (let i = 0; i < count; i++) {
        const title = blogTitles[i % blogTitles.length];
        const author = pickRandom(authors);
        const publishedDate = randomPastDate(120);

        blogs.push({
            title,
            slug: generateSlug(title),
            excerpt: 'Discover essential tips and insights for your next caravanning adventure across Australia.',
            content: `# ${title}\n\nExplore the beauty of Australia with your caravan. This comprehensive guide covers everything you need to know.\n\n## Getting Started\n\nWhether you're a seasoned caravanner or just starting out, these tips will help you make the most of your journey.\n\n## Key Takeaways\n\n- Plan your route carefully\n- Check your equipment regularly\n- Stay safe on the road\n- Enjoy the journey\n\nHappy travels!`,
            author,
            authorAvatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(author)}&background=random`,
            category: pickRandom(['Tips', 'Travel', 'Maintenance', 'Lifestyle']),
            tags: pickRandom([
                ['caravanning', 'travel', 'australia'],
                ['maintenance', 'tips', 'diy'],
                ['family', 'road-trip', 'adventure'],
                ['solo-travel', 'budget', 'planning'],
            ]),
            imageURL: `https://placehold.co/1200x600/1a1a1a/white?text=${encodeURIComponent(title.substring(0, 20))}`,
            publishedAt: publishedDate,
            createdAt: publishedDate,
            updatedAt: randomPastDate(10),
            views: randomInt(100, 5000),
            readTime: `${randomInt(3, 10)} min read`,
        });
    }

    return blogs;
};

// ============================================================================
// REVIEW DATA
// ============================================================================

const reviewTitles = [
    'Best purchase we ever made!',
    'Perfect for our family adventures',
    'Quality craftsmanship and design',
    'Exceeded our expectations',
    'Love our new home on wheels',
    'Outstanding customer service',
    'Built to last',
    'Our kids call it their adventure home',
    'Couldn\'t be happier',
    'Worth every penny',
    'Amazing build quality',
    'Perfect for long trips',
    'Comfortable and spacious',
    'Great for full-time living',
    'Highly recommend',
];

const reviewContents = [
    'We\'ve taken our caravan across Australia and it\'s performed brilliantly in all conditions. The build quality is outstanding and the layout is perfect for our family.',
    'After months of research, we chose this caravan and haven\'t looked back. It\'s comfortable, well-designed, and has everything we need for extended trips.',
    'The attention to detail is incredible. Every feature has been thoughtfully designed. We\'ve been living in it full-time for 6 months and love it.',
    'This caravan has opened up so many adventures for our family. The kids love having their own space and we appreciate the quality construction.',
    'Excellent value for money. The standard features that come included would be expensive upgrades elsewhere. Very happy with our purchase.',
];

const generateReviews = (count: number, caravanIds: string[] = []) => {
    const reviews = [];

    for (let i = 0; i < count; i++) {
        const firstName = pickRandom(firstNames);
        const lastName = pickRandom(lastNames);
        const location = pickRandom(locations);
        const rating = pickRandom([4, 4, 5, 5, 5]); // More 5-star reviews
        const hasTripHighlight = Math.random() > 0.5;

        const review: any = {
            author: `${firstName} ${lastName}`,
            location: `${location.city}, ${location.state}`,
            caravanModel: `${pickRandom([...caravanSeries])} ${randomInt(21, 25)}`,
            caravanId: caravanIds.length > 0 ? pickRandom(caravanIds) : '',
            rating,
            title: reviewTitles[i % reviewTitles.length],
            content: pickRandom(reviewContents),
            date: randomPastDate(365),
            verified: Math.random() > 0.3, // 70% verified
        };

        // Only add tripHighlight if it should be included
        if (hasTripHighlight) {
            review.tripHighlight = pickRandom(tripHighlights);
        }

        reviews.push(review);
    }

    return reviews;
};

// ============================================================================
// NEWSLETTER DATA
// ============================================================================

const generateNewsletterSubscriptions = (count: number) => {
    const subscriptions = [];

    for (let i = 0; i < count; i++) {
        const firstName = pickRandom(firstNames);
        const lastName = pickRandom(lastNames);
        const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;

        subscriptions.push({
            email,
            createdAt: randomPastDate(180),
            source: pickRandom(['footer', 'popup', 'blog']),
        });
    }

    return subscriptions;
};

// ============================================================================
// MAIN SEEDING FUNCTIONS
// ============================================================================

const askQuestion = (query: string): Promise<string> => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => rl.question(query, (answer) => {
        rl.close();
        resolve(answer);
    }));
};

const clearCollection = async (collectionName: string) => {
    console.log(`\n🗑️  Clearing existing ${collectionName}...`);
    const snapshot = await getDocs(collection(db, collectionName));
    const batch = writeBatch(db);

    snapshot.docs.forEach((docSnap) => {
        batch.delete(docSnap.ref);
    });

    await batch.commit();
    console.log(`✅ Cleared ${snapshot.size} documents from ${collectionName}`);
};

const seedCollection = async (collectionName: string, data: any[]) => {
    console.log(`\n🌱 Seeding ${collectionName}...`);
    let count = 0;

    for (const item of data) {
        await addDoc(collection(db, collectionName), item);
        count++;
        process.stdout.write(`\r   Added ${count}/${data.length} documents...`);
    }

    console.log(`\n✅ Successfully seeded ${count} ${collectionName}`);
    return data;
};

const main = async () => {
    console.log('\n🚀 Firebase Seeding Script for Equalizer RV\n');
    console.log('This will populate your Firebase with mock data for:');
    console.log('  - Caravans (12 entries)');
    console.log('  - Blogs (15 entries)');
    console.log('  - Reviews (15 entries)');
    console.log('  - Newsletter (12 entries)');
    console.log('\n⚠️  WARNING: This will DELETE existing data in these collections!\n');

    const answer = await askQuestion('Continue? (yes/no): ');

    if (answer.toLowerCase() !== 'yes') {
        console.log('\n❌ Seeding cancelled.');
        process.exit(0);
    }

    try {
        // Clear existing data
        await clearCollection('caravans');
        await clearCollection('blogs');
        await clearCollection('reviews');
        await clearCollection('newsletter');

        // Generate and seed data
        console.log('\n📊 Generating mock data...');
        const caravans = generateCaravans(12);
        const blogs = generateBlogs(15);

        // Seed caravans first to get IDs
        const seededCaravans = await seedCollection('caravans', caravans);

        // Get caravan IDs (note: in real Firestore, we'd need to fetch these)
        // For mock purposes, we'll use the model names
        const caravanModels = caravans.map(c => c.name);

        const reviews = generateReviews(15, caravanModels);
        const newsletter = generateNewsletterSubscriptions(12);

        // Seed remaining collections
        await seedCollection('blogs', blogs);
        await seedCollection('reviews', reviews);
        await seedCollection('newsletter', newsletter);

        console.log('\n\n🎉 Seeding completed successfully!');
        console.log('\n📈 Summary:');
        console.log(`   - ${caravans.length} caravans`);
        console.log(`   - ${blogs.length} blogs`);
        console.log(`   - ${reviews.length} reviews`);
        console.log(`   - ${newsletter.length} newsletter subscriptions`);
        console.log('\n✨ Your admin pages should now display mock data!');
        console.log('\nNext steps:');
        console.log('  1. Visit http://localhost:3000/admin/dashboard');
        console.log('  2. Check each admin page to verify the data');
        console.log('  3. Test filtering and search functionality\n');

    } catch (error) {
        console.error('\n❌ Error during seeding:', error);
        process.exit(1);
    }

    process.exit(0);
};

main();
