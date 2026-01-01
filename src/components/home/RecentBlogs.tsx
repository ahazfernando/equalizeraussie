"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getBlogs } from "@/lib/firebase/firestore";
import { Article } from "@/types/article";
import { Skeleton } from "@/components/ui/skeleton";

const formatDate = (article: Article): string => {
  const dateValue = article.lastUpdated || article.createdAt || article.date;
  if (dateValue && typeof (dateValue as any).toDate === 'function') {
    const date = (dateValue as any).toDate();
    return date.toLocaleDateString('en-GB', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  }
  if (typeof dateValue === 'string') {
    const d = new Date(dateValue);
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString('en-GB', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
      });
    }
  }
  return 'Date not available';
};

const getValidImageUrl = (imageURL: string): string => {
  if (!imageURL || imageURL.trim() === '') {
    return '/blogs/blog1.png';
  }
  
  try {
    new URL(imageURL);
    return imageURL;
  } catch {
    if (imageURL.startsWith('/')) {
      return imageURL;
    }
    return `/blogs/${imageURL}`;
  }
};

interface BlogCardProps {
  article: Article;
}

const BlogCard = ({ article }: BlogCardProps) => {
  const [imageLoading, setImageLoading] = useState(true);
  const formattedDate = formatDate(article);

  return (
    <div className="bg-white rounded-2xl overflow-hidden flex flex-col">
      <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden">
        {imageLoading && (
          <Skeleton className="absolute inset-0 w-full h-full rounded-2xl" />
        )}
        <Link href={`/blog/${encodeURIComponent(article.slug)}`} className="block h-full">
          <Image
            src={getValidImageUrl(article.imageURL)}
            alt={article.title}
            fill
            className="object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
            onLoad={() => setImageLoading(false)}
            onError={() => setImageLoading(false)}
          />
        </Link>
      </div>
      <div className="pt-6 px-6 pb-6 flex-grow flex flex-col">
        <p className="text-sm text-gray-500 mb-1">{formattedDate}</p>
        <h3 className="text-xl font-bold text-black mb-3 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
          {article.title}
        </h3>
        <p className="text-base text-gray-700 mb-4 flex-grow line-clamp-3 leading-relaxed">
          {article.excerpt}
        </p>
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {article.tags.slice(0, 3).map(tag => (
              <span
                key={tag}
                className="text-sm px-3 py-1 rounded-md"
                style={{ 
                  backgroundColor: '#F1F5F9', 
                  color: '#000000',
                  fontSize: '14px'
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <Link
          href={`/blog/${encodeURIComponent(article.slug)}`}
          className="inline-flex items-center text-black font-medium hover:text-primary transition-colors"
        >
          Read more <ArrowRight className="ml-1 w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export function RecentBlogs() {
  const [blogs, setBlogs] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const blogsData = await getBlogs();
        
        // Convert Firestore data to Article format
        const articles = blogsData.map((blog: any) => {
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

        // Sort by date (newest first) and take first 3
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

        setBlogs(articles.slice(0, 3));
      } catch (error) {
        console.error('Error loading blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  if (loading) {
    return (
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Link href="/blog">
              <button className="mb-4 px-6 py-2 bg-black text-white rounded-full flex items-center gap-2 hover:bg-gray-800 transition-colors mx-auto">
                <span>Reader&apos;s Digest</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4">
              Explore Insights in Our Blog
            </h2>
            <p className="text-base md:text-lg text-black max-w-3xl mx-auto">
              Are you a fan of getting knowing more about Victoria with us, if so here&apos;s the chance
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden flex flex-col">
                <Skeleton className="w-full aspect-[16/9] rounded-2xl" />
                <div className="pt-6 px-6 pb-6 space-y-3">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (blogs.length === 0) {
    return null;
  }

  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Link href="/blog">
            <button className="mb-4 px-6 py-2 bg-black text-white rounded-full flex items-center gap-2 hover:bg-gray-800 transition-colors mx-auto">
              <span>Reader&apos;s Digest</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4">
            Explore Insights in Our Blog
          </h2>
          <p className="text-base md:text-lg text-black max-w-3xl mx-auto">
            Are you a fan of getting knowing more about Victoria with us, if so here&apos;s the chance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.map((article) => (
            <BlogCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}

