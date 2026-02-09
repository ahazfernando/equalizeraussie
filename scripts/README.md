# Firebase Seeding Guide

## Quick Start

Run the seeding script to populate your Firebase database with mock data:

```bash
npm run seed
```

The script will prompt you for confirmation before clearing existing data.

## What Gets Seeded

- **Caravans** (12 entries): Diverse RV models across all series with realistic specs
- **Blogs** (15 entries): Articles about RV lifestyle, maintenance, and travel tips
- **Reviews** (15 entries): Customer testimonials with ratings and locations
- **Newsletter** (12 entries): Email subscriptions

## Data Features

All mock data includes:
- ✅ Realistic Australian names and locations
- ✅ Proper timestamps (past 6 months)
- ✅ Varied statuses and ratings
- ✅ Relationships between data (reviews → caravans)
- ✅ Placeholder images

## Verify the Data

After running the script, visit:
- Dashboard: `http://localhost:3000/admin/dashboard`
- Caravans: `http://localhost:3000/admin/caravans`
- Blogs: `http://localhost:3000/admin/blogs`
- Reviews: `http://localhost:3000/admin/reviews`

## Safety

⚠️ **WARNING**: The script will DELETE all existing data in the seeded collections. It will prompt for confirmation before proceeding.

## Troubleshooting

If you encounter Firebase authentication errors:
1. Ensure your `.env.local` file has the correct Firebase credentials
2. Check that your Firebase project allows the operation
3. Verify you have the necessary permissions in Firebase Console
