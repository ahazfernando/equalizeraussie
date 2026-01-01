"use client";

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface BlogDetailClientProps {
  content: string;
  excerpt: string;
}

export default function BlogDetailClient({ content, excerpt }: BlogDetailClientProps) {
  return (
    <div className="prose prose-lg max-w-none">
      {/* Excerpt */}
      <div className="text-base md:text-lg text-gray-700 leading-relaxed mb-8 p-4 bg-gray-50 rounded-lg">
        {excerpt}
      </div>
      
      {/* Markdown Content */}
      <div className="prose prose-lg prose-headings:text-black prose-p:text-gray-700 prose-a:text-primary prose-strong:text-black prose-code:text-primary prose-pre:bg-gray-900 prose-pre:text-gray-100 max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}

