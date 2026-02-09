import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  QueryConstraint,
  DocumentData,
} from "firebase/firestore";
import { db } from "./config";

// Generic CRUD operations
export const createDocument = async <T extends Record<string, any>>(
  collectionName: string,
  data: Omit<T, "id" | "createdAt" | "updatedAt">
): Promise<string> => {
  const docRef = await addDoc(collection(db, collectionName), {
    ...data,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
  return docRef.id;
};

export const getDocument = async <T>(
  collectionName: string,
  documentId: string
): Promise<T | null> => {
  const docRef = doc(db, collectionName, documentId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as T;
  }
  return null;
};

export const getDocuments = async <T>(
  collectionName: string,
  constraints: QueryConstraint[] = []
): Promise<T[]> => {
  const q = query(collection(db, collectionName), ...constraints);
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as T[];
};

export const updateDocument = async <T extends Record<string, any>>(
  collectionName: string,
  documentId: string,
  data: Partial<T>
): Promise<void> => {
  const docRef = doc(db, collectionName, documentId);
  await updateDoc(docRef, {
    ...data,
    updatedAt: Timestamp.now(),
  });
};

export const deleteDocument = async (
  collectionName: string,
  documentId: string
): Promise<void> => {
  const docRef = doc(db, collectionName, documentId);
  await deleteDoc(docRef);
};

// Specific collection helpers
export const caravansCollection = "caravans";
export const bookingsCollection = "bookings";
export const reviewsCollection = "reviews";
export const articlesCollection = "articles";
export const blogsCollection = "blogs";
export const newsletterCollection = "newsletter_subscribers";

// Newsletter
export const subscribeToNewsletter = async (email: string) => {
  // Check if already subscribed
  const q = query(collection(db, newsletterCollection), where("email", "==", email));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    return { success: false, message: "Email already subscribed" };
  }

  await addDoc(collection(db, newsletterCollection), {
    email,
    createdAt: Timestamp.now(),
  });

  return { success: true };
};

export const getNewsletterSubscribers = async () => {
  return getDocuments(newsletterCollection, [orderBy("createdAt", "desc")]);
};

// Caravans
export const getCaravans = async () => {
  return getDocuments(caravansCollection, [orderBy("name")]);
};

export const getCaravanById = async (id: string) => {
  return getDocument(caravansCollection, id);
};

export const getFeaturedCaravans = async () => {
  return getDocuments(caravansCollection, [
    where("featured", "==", true),
    orderBy("name"),
  ]);
};

export const getCaravansBySeries = async (series: string) => {
  return getDocuments(caravansCollection, [
    where("series", "==", series),
    orderBy("name"),
  ]);
};

// Bookings
export const getBookings = async () => {
  return getDocuments(bookingsCollection, [orderBy("createdAt", "desc")]);
};

export const getBookingById = async (id: string) => {
  return getDocument(bookingsCollection, id);
};

export const getBookingsByStatus = async (status: string) => {
  return getDocuments(bookingsCollection, [
    where("status", "==", status),
    orderBy("createdAt", "desc"),
  ]);
};

export const createBooking = async (bookingData: any) => {
  return createDocument(bookingsCollection, bookingData);
};

export const updateBookingStatus = async (id: string, status: string) => {
  return updateDocument(bookingsCollection, id, { status });
};

// Reviews
export const getReviews = async () => {
  try {
    return getDocuments(reviewsCollection, [orderBy("date", "desc")]);
  } catch (error) {
    // If date field doesn't exist or isn't indexed, try createdAt
    try {
      return getDocuments(reviewsCollection, [orderBy("createdAt", "desc")]);
    } catch {
      // If no index, just get all and sort client-side
      const reviews = await getDocuments(reviewsCollection);
      return reviews.sort((a: any, b: any) => {
        const getDate = (review: any): number => {
          const dateValue = review.date || review.createdAt;
          if (!dateValue) return 0;
          if (dateValue.toDate && typeof dateValue.toDate === 'function') {
            return dateValue.toDate().getTime();
          }
          if (typeof dateValue === 'string') {
            return new Date(dateValue).getTime();
          }
          return 0;
        };
        return getDate(b) - getDate(a);
      });
    }
  }
};

export const getReviewById = async (id: string) => {
  return getDocument(reviewsCollection, id);
};

export const getReviewsByCaravan = async (caravanId: string) => {
  return getDocuments(reviewsCollection, [
    where("caravanId", "==", caravanId),
    orderBy("date", "desc"),
  ]);
};

export const createReview = async (reviewData: any) => {
  // Convert date string to Timestamp if provided
  const data = {
    ...reviewData,
    date: reviewData.date
      ? (typeof reviewData.date === 'string'
        ? Timestamp.fromDate(new Date(reviewData.date))
        : reviewData.date)
      : Timestamp.now(),
  };
  return createDocument(reviewsCollection, data);
};

export const updateReview = async (id: string, reviewData: any) => {
  // Convert date string to Timestamp if provided
  const data = {
    ...reviewData,
    date: reviewData.date
      ? (typeof reviewData.date === 'string'
        ? Timestamp.fromDate(new Date(reviewData.date))
        : reviewData.date)
      : undefined,
  };
  // Remove undefined values
  Object.keys(data).forEach(key => data[key] === undefined && delete data[key]);
  return updateDocument(reviewsCollection, id, data);
};

export const deleteReview = async (id: string) => {
  return deleteDocument(reviewsCollection, id);
};

// Articles
export const getArticles = async () => {
  return getDocuments(articlesCollection, [orderBy("publishedAt", "desc")]);
};

export const getArticleById = async (id: string) => {
  return getDocument(articlesCollection, id);
};

// Blogs
export const getBlogs = async () => {
  try {
    const blogs = await getDocuments(blogsCollection, [orderBy("date", "desc")]);
    return blogs;
  } catch (error) {
    // If date field doesn't exist or isn't indexed, try createdAt
    try {
      return await getDocuments(blogsCollection, [orderBy("createdAt", "desc")]);
    } catch {
      // If no index, just get all and sort client-side
      const blogs = await getDocuments(blogsCollection);
      return blogs.sort((a: any, b: any) => {
        const getDate = (blog: any): number => {
          const dateValue = blog.lastUpdated || blog.createdAt || blog.date;
          if (!dateValue) return 0;
          if (dateValue.toDate && typeof dateValue.toDate === 'function') {
            return dateValue.toDate().getTime();
          }
          if (typeof dateValue === 'string') {
            return new Date(dateValue).getTime();
          }
          return 0;
        };
        return getDate(b) - getDate(a);
      });
    }
  }
};

export const getBlogBySlug = async (slug: string) => {
  const blogs = await getDocuments(blogsCollection, [where("slug", "==", slug)]);
  if (blogs.length === 0) return null;
  return blogs[0];
};

export const getBlogById = async (id: string) => {
  return getDocument(blogsCollection, id);
};

export const createBlog = async (blogData: any) => {
  const now = Timestamp.now();
  const data = {
    ...blogData,
    date: blogData.date || now,
    createdAt: now,
    lastUpdated: now,
  };
  return createDocument(blogsCollection, data);
};

export const updateBlog = async (id: string, blogData: any) => {
  const data = {
    ...blogData,
    lastUpdated: Timestamp.now(),
  };
  return updateDocument(blogsCollection, id, data);
};

export const deleteBlog = async (id: string) => {
  return deleteDocument(blogsCollection, id);
};


