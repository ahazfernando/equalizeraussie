import { Layout } from "@/components/layout/Layout";
import BlogPageClient from "./BlogPageClient";
import { getBlogs } from "@/lib/firebase/firestore";
import { Article } from "@/types/article";

async function getArticles(): Promise<Article[]> {
  try {
    const blogs = await getBlogs();
    
    // Convert Firestore data to Article format
    const articles = blogs.map((blog: any) => {
      // Helper to convert Firestore Timestamp to ISO string
      const toISOString = (value: any): string => {
        if (!value) return '';
        if (value.toDate && typeof value.toDate === 'function') {
          return value.toDate().toISOString();
        }
        if (typeof value === 'string') {
          return value;
        }
        return '';
      };
      
      return {
        id: blog.id,
        slug: blog.slug || '',
        title: blog.title || '',
        excerpt: blog.excerpt || '',
        imageURL: blog.imageURL || '/blogs/blog1.png',
        tags: blog.tags || [],
        content: blog.content || '',
        author: blog.author || { name: 'Unknown', avatarURL: '' },
        date: toISOString(blog.date) || toISOString(blog.createdAt),
        createdAt: toISOString(blog.createdAt),
        lastUpdated: toISOString(blog.lastUpdated),
        isPopular: blog.isPopular || false,
      } as Article;
    });

    // Sort by date (newest first)
    articles.sort((a, b) => {
      const getDate = (article: Article): number => {
        const dateValue = article.lastUpdated || article.createdAt || article.date;
        if (!dateValue) return 0;
        try {
          if (typeof dateValue === 'string') {
            return new Date(dateValue).getTime();
          }
          return 0;
        } catch {
          return 0;
        }
      };
      return getDate(b) - getDate(a);
    });

    return articles;
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

export default async function Blog() {
  const articles = await getArticles();

  return (
    <Layout>
      <BlogPageClient allArticles={articles} />
    </Layout>
  );
}


