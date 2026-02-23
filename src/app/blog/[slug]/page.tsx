import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Article } from '@/types/article';
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { getCloudinaryUrl } from "@/lib/cloudinary";

// Fetch article by slug
async function getArticle(slug: string): Promise<Article | null> {
    try {
        const articlesRef = collection(db, 'blogs');
        const q = query(articlesRef, where("slug", "==", slug));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            return null;
        }
        const doc = querySnapshot.docs[0];
        const data = doc.data();
        const article: Article = {
            id: doc.id,
            title: data.title || '',
            excerpt: data.excerpt || '',
            content: data.content || '',
            slug: data.slug || '',
            imageURL: data.imageURL || '',
            tags: data.tags || [],
            author: data.author || { name: 'Unknown', avatarURL: '' },
            date: data.date?.toDate?.().toISOString() || new Date().toISOString(),
            createdAt: data.createdAt?.toDate?.().toISOString() || new Date().toISOString(),
            lastUpdated: data.lastUpdated?.toDate?.().toISOString() || new Date().toISOString(),
        };
        return article;
    } catch (error) {
        console.error('Error fetching article:', error);
        return null;
    }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const decodedSlug = decodeURIComponent(slug);
    const article = await getArticle(decodedSlug);
    if (!article) {
        return {
            title: 'Article Not Found',
            description: 'The article you are looking for does not exist.',
        };
    }
    return {
        title: article.title,
        description: article.excerpt,
        keywords: article.tags,
        alternates: {
            canonical: `https://equalizerrv.com/blog/${decodedSlug}`,
        },
        openGraph: {
            title: article.title,
            description: article.excerpt,
            url: `https://equalizerrv.com/blog/${decodedSlug}`,
            type: 'article',
            images: [{
                url: getCloudinaryUrl(article.imageURL, { width: 1200, crop: 'fill' }),
                width: 1200,
                height: 630,
                alt: article.title,
            }],
        },
    };
}

// Format date helper
const formatDate = (dateString: string | Timestamp | undefined): string => {
    if (!dateString) return 'Date not available';
    if (dateString && typeof (dateString as Timestamp).toDate === 'function') {
        return (dateString as Timestamp).toDate().toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    }
    return new Date(dateString as string).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
};

// Get tag background color
const getTagBgColor = (tag: string): string => {
    // Customize colors based on your tags
    switch (tag.toLowerCase()) {
        case 'boba': return '#EFFBF3';
        case 'tea': return '#D6EBFF';
        case 'coffee': return '#FFF4E6';
        case 'recipe': return '#F3E8FF';
        case 'tips': return '#FCE7F3';
        default: return '#F1F5F9';
    }
};

// Main Blog Article Page Component
const BlogArticlePage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    const decodedSlug = decodeURIComponent(slug);
    const article = await getArticle(decodedSlug);

    if (!article) {
        notFound();
    }

    // Helper to get valid image URL handled by getCloudinaryUrl

    return (
        <main className="min-h-screen bg-white">
            <section className="relative pt-4 md:pt-4 pb-8 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-12 gap-y-12 lg:gap-8">
                        <div className="col-span-12">
                            {/* Header Section */}
                            <header className="mb-12 mx-auto text-center max-w-3xl">
                                {/* Go Back Button */}
                                <div className="flex justify-center mb-6">
                                    <Link href="/blog">
                                        <Button variant="ghost" className="gap-2 border border-gray-300 rounded-md px-4 py-2">
                                            <ArrowLeft className="h-4 w-4" />
                                            Go Back
                                        </Button>
                                    </Link>
                                </div>

                                {/* Tags */}
                                <div className="flex items-center gap-4 mb-4 flex-wrap justify-center">
                                    {article.tags.map(tag => (
                                        <Badge
                                            key={tag}
                                            variant="outline"
                                            className="text-sm border-none"
                                            style={{ backgroundColor: getTagBgColor(tag) }}
                                        >
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>

                                {/* Title */}
                                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                                    {article.title}
                                </h1>

                                {/* Author and Date */}
                                <div className="flex items-center gap-4 text-gray-500 mt-4 justify-center">
                                    <div className="flex items-center">
                                        <Avatar className="h-8 w-8 mr-2">
                                            <AvatarImage src={article.author.avatarURL} alt={article.author.name} />
                                            <AvatarFallback>
                                                {article.author.name.split(' ').map(n => n[0]).join('')}
                                            </AvatarFallback>
                                        </Avatar>
                                        <span>{article.author.name}</span>
                                    </div>
                                    <span>•</span>
                                    <span>{formatDate(article.date)}</span>
                                </div>
                            </header>

                            {/* Featured Image */}
                            <div className="rounded-2xl overflow-hidden mb-12 aspect-video w-full">
                                <Image
                                    src={getCloudinaryUrl(article.imageURL, { width: 1200, crop: 'fill', format: 'webp' })}
                                    alt={article.title}
                                    width={1200}
                                    height={630}
                                    unoptimized
                                    className="w-full h-auto object-cover"
                                    priority
                                />
                            </div>

                            {/* Article Content */}
                            <article className="prose lg:prose-xl max-w-none mx-auto">
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mb-6 mt-8 border-b pb-2" {...props} />,
                                        h2: ({ node, ...props }) => <h2 className="text-2xl font-semibold mb-4 mt-6" {...props} />,
                                        h3: ({ node, ...props }) => <h3 className="text-xl font-semibold mb-3 mt-5" {...props} />,
                                        p: ({ node, ...props }) => <p className="leading-relaxed mb-4" {...props} />,
                                        ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-4 space-y-2" {...props} />,
                                        ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />,
                                        a: ({ node, ...props }) => <a className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
                                        blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4" {...props} />,
                                        pre: ({ node, ...props }) => <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto text-sm font-mono my-4" {...props} />,
                                        code: ({ node, className, children, ...props }) => {
                                            const match = /language-(\w+)/.exec(className || '');
                                            return !match ? (
                                                <code className="bg-gray-200 text-gray-800 px-1.5 py-1 rounded text-sm font-mono" {...props}>
                                                    {children}
                                                </code>
                                            ) : (
                                                <code className={className} {...props}>
                                                    {children}
                                                </code>
                                            );
                                        },
                                    }}
                                >
                                    {article.content}
                                </ReactMarkdown>
                            </article>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default BlogArticlePage;
