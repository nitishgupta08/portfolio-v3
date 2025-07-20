"use client";

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Image from 'next/image';

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="markdown-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
        components={{
          // Custom code block rendering
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            
            return !inline && match ? (
              <SyntaxHighlighter
                style={oneDark}
                language={match[1]}
                PreTag="div"
                className="rounded-lg my-6"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code 
                className={`${className} bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono`} 
                {...props}
              >
                {children}
              </code>
            );
          },
          
          // Custom image rendering - use figure instead of div
          img({ src, alt, ...props }) {
            if (!src) return null;
            
            // Handle image positioning based on alt text
            const isFloatRight = alt?.includes('>');
            const isFloatLeft = alt?.includes('<');
            const cleanAlt = alt?.replace(/[<>]/g, '').trim();
            
            let className = 'rounded-lg my-8 not-prose';
            if (isFloatRight) {
              className += ' float-right ml-8 mb-4 max-w-sm';
            } else if (isFloatLeft) {
              className += ' float-left mr-8 mb-4 max-w-sm';
            } else {
              className += ' mx-auto max-w-full block';
            }
            
            return (
              <span className={className}>
                <Image
                  src={src}
                  alt={cleanAlt || ''}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover rounded-lg"
                  {...props}
                />
              </span>
            );
          },
          
          // Custom headings with better spacing
          h1: ({ children }) => (
            <h1 className="text-4xl font-bold mt-12 mb-6 first:mt-0 text-foreground">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-3xl font-bold mt-10 mb-5 text-foreground">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-2xl font-bold mt-8 mb-4 text-foreground">{children}</h3>
          ),
          
          // Custom paragraph - ensure no block elements inside
          p: ({ children }) => (
            <p className="mb-6 leading-7 text-lg text-foreground">{children}</p>
          ),
          
          // Custom blockquote
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-primary pl-6 my-8 italic text-lg bg-muted/30 py-4 rounded-r-lg">
              {children}
            </blockquote>
          ),
          
          // Custom list styling
          ul: ({ children }) => (
            <ul className="list-disc list-inside mb-6 space-y-2 text-foreground">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside mb-6 space-y-2 text-foreground">{children}</ol>
          ),
          
          // Custom pre for code blocks
          pre: ({ children }) => (
            <div className="my-6">
              {children}
            </div>
          ),
          
          // Custom strong/bold
          strong: ({ children }) => (
            <strong className="font-semibold text-foreground">{children}</strong>
          ),
          
          // Custom emphasis/italic
          em: ({ children }) => (
            <em className="italic text-foreground">{children}</em>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
