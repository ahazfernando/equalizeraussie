"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from "next/image";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Timestamp } from 'firebase/firestore';
import { Article } from '@/types/article';
import { Skeleton } from "@/components/ui/skeleton";

// Map categories to tags for filtering
const categoryToTags: Record<string, string[]> = {
    'All': [],
    'Boba Tea': ['boba', 'tea'],
    'Coffee': ['coffee'],
    'Recipes': ['recipe'],
    'Tips': ['tips'],
};

const formatDate = (article: Article): string => {
    const dateValue = article.lastUpdated || article.createdAt || article.date;
    if (dateValue && typeof (dateValue as Timestamp).toDate === 'function') {
        const date = (dateValue as Timestamp).toDate();
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

interface BlogCardProps {
    article: Article;
    getValidImageUrl: (imageURL: string) => string;
}

// Featured Blog Card (Large)
const FeaturedBlogCard: React.FC<BlogCardProps> = ({ article, getValidImageUrl }) => {
    const [imageLoading, setImageLoading] = useState(true);
    const formattedDate = formatDate(article);

    return (
        <Link href={`/blog/${encodeURIComponent(article.slug)}`} className="block h-full group">
            <div className="bg-white rounded-2xl overflow-hidden flex flex-col h-full">
                <div className="relative w-full aspect-[3/1] rounded-2xl overflow-hidden">
                    {imageLoading && (
                        <Skeleton className="absolute inset-0 w-full h-full rounded-2xl" />
                    )}
                    <Image
                        src={getValidImageUrl(article.imageURL)}
                        alt={article.title}
                        fill
                        className="object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
                        onLoad={() => setImageLoading(false)}
                        onError={() => setImageLoading(false)}
                    />
                </div>
                <div className="pt-6 px-6 pb-6 flex-grow flex flex-col">
                    <p className="text-sm text-gray-500 mb-2">{formattedDate}</p>
                    <h3 className="text-2xl md:text-3xl font-bold text-black mb-4 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
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
                    <div className="inline-flex items-center text-black font-medium hover:text-primary transition-colors">
                        Read more <ArrowRight className="ml-1 w-4 h-4" />
                    </div>
                </div>
            </div>
        </Link>
    );
};

// Small Blog Card (for right column)
const SmallBlogCard: React.FC<BlogCardProps> = ({ article, getValidImageUrl }) => {
    const [imageLoading, setImageLoading] = useState(true);
    const formattedDate = formatDate(article);

    return (
        <Link href={`/blog/${encodeURIComponent(article.slug)}`} className="block h-full group">
            <div className="bg-white rounded-xl overflow-hidden flex gap-4 h-full">
                <div className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0 rounded-xl overflow-hidden">
                    {imageLoading && (
                        <Skeleton className="absolute inset-0 w-full h-full rounded-xl" />
                    )}
                    <Image
                        src={getValidImageUrl(article.imageURL)}
                        alt={article.title}
                        fill
                        className="object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                        onLoad={() => setImageLoading(false)}
                        onError={() => setImageLoading(false)}
                    />
                </div>
                <div className="flex-1 py-4 pr-4 flex flex-col justify-between min-w-0">
                    <div>
                        {article.tags && article.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-2">
                                {article.tags.slice(0, 1).map(tag => (
                                    <span
                                        key={tag}
                                        className="text-xs px-2 py-1 rounded-md"
                                        style={{ 
                                            backgroundColor: '#F1F5F9', 
                                            color: '#000000',
                                            fontSize: '12px'
                                        }}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                        <h3 className="text-base md:text-lg font-bold text-black mb-2 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                            {article.title}
                        </h3>
                        <p className="text-sm text-gray-500 mb-1">{formattedDate}</p>
                    </div>
                    <div className="inline-flex items-center text-black font-medium hover:text-primary transition-colors text-sm mt-auto">
                        Read more <ArrowRight className="ml-1 w-3 h-3" />
                    </div>
                </div>
            </div>
        </Link>
    );
};

// Regular Blog Card (for grid below)
const BlogCard: React.FC<BlogCardProps> = ({ article, getValidImageUrl }) => {
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

interface BlogListingPageProps {
    allArticles: Article[];
}

const BlogListingPage: React.FC<BlogListingPageProps> = ({ allArticles }) => {
    const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
    const [category, setCategory] = useState<string>('All');
    const [page, setPage] = useState<number>(1);
    const pageSize = 6;

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

    const filteredArticles = useMemo(() => {
        const normalizeTag = (tag: string) => tag.trim().toLowerCase();

        let items = category === 'All'
            ? allArticles
            : allArticles.filter(article => {
                const allowedTags = new Set(categoryToTags[category]?.map(normalizeTag) || []);
                return article.tags.some(tag => allowedTags.has(normalizeTag(tag)));
            });

        const parseDate = (article: Article): Date => {
            const dateValue = article.lastUpdated ?? article.createdAt ?? article.date;
            if (dateValue && typeof (dateValue as any).toDate === 'function') {
                return (dateValue as any).toDate();
            }
            if (typeof dateValue === 'string') {
                const d = new Date(dateValue);
                if (!isNaN(d.getTime())) return d;
            }
            return new Date(0);
        };

        items.sort((a, b) => {
            const dateA = parseDate(a).getTime();
            const dateB = parseDate(b).getTime();
            return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
        });

        return items;
    }, [allArticles, sortOrder, category]);

    useEffect(() => {
        setPage(1);
    }, [sortOrder, category]);

    const totalPages = Math.max(1, Math.ceil(filteredArticles.length / pageSize));
    const pagedArticles = filteredArticles.slice((page - 1) * pageSize, page * pageSize);
    
    // Hero section: first 4 articles (1 featured + 3 small)
    const heroArticles = filteredArticles.slice(0, 4);
    const featuredArticle = heroArticles[0];
    const smallArticles = heroArticles.slice(1, 4);

    if (filteredArticles.length === 0) {
        return (
            <main>
                <section className="pt-5 pb-8 md:pt-20 md:pb-12 bg-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col items-center text-center mb-12">
                            <Link href="/blog">
                                <button className="mb-4 px-6 py-2 bg-black text-white rounded-full flex items-center gap-2 hover:bg-gray-800 transition-colors">
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
                        <div className="text-center py-20">
                            <h2 className="text-2xl font-semibold mb-2">No articles found.</h2>
                            <p className="text-muted-foreground">Check back soon for new blog posts!</p>
                        </div>
                    </div>
                </section>
            </main>
        );
    }

  return (
        <main>
            <section className="pt-5 pb-8 md:pt-20 md:pb-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-12">
                        {/* Reader's Digest Button */}
                        <Link href="/blog">
                            <button className="mb-4 px-6 py-2 bg-black text-white rounded-full flex items-center gap-2 hover:bg-gray-800 transition-colors">
                                <span>Reader&apos;s Digest</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </Link>
                        
          {/* Main Title */}
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4">
            Explore Insights in Our Blog
                        </h2>
          
          {/* Subtitle */}
          <p className="text-base md:text-lg text-black max-w-3xl mx-auto">
            Are you a fan of getting knowing more about Victoria with us, if so here&apos;s the chance
          </p>
        </div>

                    {/* Hero Section - Featured Blogs */}
                    {heroArticles.length > 0 && (
                        <div className="mb-16">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
                                {/* Featured Blog (Left - Large) */}
                                {featuredArticle && (
                                    <div className="lg:col-span-2 h-full">
                                        <FeaturedBlogCard article={featuredArticle} getValidImageUrl={getValidImageUrl} />
                                    </div>
                                )}
                                
                                {/* Small Blogs (Right - Stacked) */}
                                <div className="flex flex-col gap-6 h-full">
                                    {smallArticles.map(article => (
                                        <div key={article.id} className="flex-1">
                                            <SmallBlogCard article={article} getValidImageUrl={getValidImageUrl} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Section Title */}
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-black mb-4">
                        Dive into Our Top Blogs
                    </h2>
                    <p className="text-base md:text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
                        Explore our curated selection of top blogs, offering expert insights and valuable tips for project management success.
                    </p>

                    {/* Filter Section */}
                    <div className="mb-8">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="text-sm font-semibold text-gray-800">Filter By</div>
                            <div className="flex items-center gap-3">
                                <Select value={sortOrder} onValueChange={(v) => setSortOrder(v as 'newest' | 'oldest')}>
                                    <SelectTrigger className="min-w-44">
                                        <SelectValue placeholder="Sort by" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="newest">Newest</SelectItem>
                                        <SelectItem value="oldest">Oldest</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Select value={category} onValueChange={(v) => setCategory(v as string)}>
                                    <SelectTrigger className="min-w-60">
                                        <SelectValue placeholder="Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.keys(categoryToTags).map(cat => (
                                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    {/* Blog Cards Grid - All Articles */}
                    {pagedArticles.length > 0 && (
                        <div className={`grid grid-cols-1 ${pagedArticles.length === 1 ? 'md:grid-cols-1' : pagedArticles.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-6 lg:gap-6 mb-8`}>
                            {pagedArticles.map(article => (
                                <BlogCard key={article.id} article={article} getValidImageUrl={getValidImageUrl} />
          ))}
        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-4 py-12">
                            <Button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
                                Previous
                            </Button>
                            <span className="text-sm font-medium">Page {page} of {totalPages}</span>
                            <Button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
                                Next
                            </Button>
          </div>
        )}
      </div>
    </section>
        </main>
  );
};

export default BlogListingPage;
