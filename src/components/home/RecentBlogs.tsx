"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getBlogs } from "@/lib/firebase/firestore";
import { Article } from "@/types/article";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { getCloudinaryImageUrl } from "@/lib/cloudinary-client";

const formatDate = (article: Article): string => {
  const dateValue = article.lastUpdated || article.createdAt || article.date;
  if (dateValue && typeof (dateValue as any).toDate === 'function') {
    const date = (dateValue as any).toDate();
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).toUpperCase();
  }
  if (typeof dateValue === 'string') {
    const d = new Date(dateValue);
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }).toUpperCase();
    }
  }
  return 'DATE NOT AVAILABLE';
};

// Using getCloudinaryImageUrl for images

interface BlogCardProps {
  article: Article;
  index: number; // for stagger animation
}

const BlogCard = ({ article, index }: BlogCardProps) => {
  const [imageLoading, setImageLoading] = useState(true);
  const formattedDate = formatDate(article);
  const categoryTag = article.tags && article.tags.length > 0 ? article.tags[0] : 'BLOG';

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3 } }}
      className="group relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-accent/20 transition-all duration-500 cursor-pointer"
    >
      <Link href={`/blog/${encodeURIComponent(article.slug)}`} className="block h-full">
        <div className="relative w-full aspect-[4/3] overflow-hidden rounded-3xl">
          {imageLoading && (
            <Skeleton className="absolute inset-0 w-full h-full" />
          )}
          <Image
            src={getCloudinaryImageUrl(article.imageURL, { width: 800, format: 'webp', crop: 'fill' })}
            alt={article.title}
            fill
            unoptimized
            className="object-cover transition-transform duration-700 group-hover:scale-110 rounded-3xl"
            onLoad={() => setImageLoading(false)}
            onError={() => setImageLoading(false)}
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300 rounded-3xl" />

          {/* Bottom Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent rounded-3xl" />

          {/* Category - Top Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="absolute top-4 right-4 md:top-6 md:right-6 z-20"
          >
            <span className="text-xs md:text-sm font-bold text-white uppercase tracking-widest">
              {categoryTag}
            </span>
          </motion.div>

          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 z-10">
            {/* Date */}
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="text-xs md:text-sm font-semibold text-white/90 tracking-wider mb-3"
            >
              {formattedDate}
            </motion.span>

            {/* Title */}
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="font-sans uppercase tracking-wide text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4 line-clamp-2 leading-tight group-hover:text-accent transition-colors duration-300"
            >
              {article.title}
            </motion.h3>

            {/* Tags */}
            {article.tags && article.tags.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex flex-wrap items-center gap-2 mt-2"
              >
                {article.tags.slice(1, 3).map((tag, i) => (
                  <span key={tag} className="flex items-center">
                    <span className="text-xs font-medium text-white/90">
                      {tag}
                    </span>
                    {i < article.tags.slice(1, 3).length - 1 && (
                      <span className="mx-2 text-white/60">•</span>
                    )}
                  </span>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export function RecentBlogs() {
  const [blogs, setBlogs] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const blogsData = await getBlogs();

        const toISOString = (value: any): string => {
          if (!value) return '';
          if (value.toDate && typeof value.toDate === 'function') {
            return value.toDate().toISOString();
          }
          if (typeof value === 'string') return value;
          return '';
        };

        const articles = blogsData.map((blog: any) => ({
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
        } as Article));

        articles.sort((a, b) => {
          const getDate = (article: Article): number => {
            const dateValue = article.lastUpdated || article.createdAt || article.date;
            if (!dateValue) return 0;
            if (typeof dateValue === 'string') {
              return new Date(dateValue).getTime();
            }
            return 0;
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
      <section className="section-padding bg-black py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Skeleton className="mb-5 h-12 w-64 mx-auto rounded-full" />
            <Skeleton className="h-12 w-96 mx-auto mb-4" />
            <Skeleton className="h-6 w-full max-w-3xl mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card rounded-2xl overflow-hidden flex flex-col">
                <Skeleton className="w-full aspect-[16/9]" />
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
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/blog">
              <button className="mb-5 inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-accent/15 to-accent/5 border border-accent/30 backdrop-blur-sm shadow-lg shadow-accent/10 group text-red-500 dark:text-red-400 text-base font-semibold cursor-pointer hover:scale-105 transition-transform">
                <span className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
                <span>Reader&apos;s Digest</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-5xl sm:text-6xl lg:text-6xl font-semibold leading-[1.1] mb-8"
          >
            Explore Insights in Our Blog
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-muted-foreground text-md leading-relaxed max-w-4xl mx-auto font-light"
          >
            Are you a fan of discovering more about Victoria with us? If so, here’s your chance to dive deeper into its landscapes, attractions, and unique experiences that make every journey truly special.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
        >
          {blogs.map((article, index) => (
            <BlogCard key={article.id} article={article} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}