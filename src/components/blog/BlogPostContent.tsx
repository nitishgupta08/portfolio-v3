"use client";

import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { FaArrowLeft, FaClock } from "react-icons/fa";
import { useBlogPost } from "@/hooks/useBlogPosts";
import MarkdownRenderer from "@/components/markdown/MarkdownRenderer";
import ViewCounter from "./ViewCounter";
import type { BlogPost } from "@/types/BlogPost";

interface BlogPostContentProps {
  slug: string;
  initialBlog: BlogPost;
}

export function BlogPostContent({ slug, initialBlog }: BlogPostContentProps) {
  const { data: blog, isLoading, error } = useBlogPost(slug);

  // Use cached data or fall back to initial/server data
  const displayBlog = blog || initialBlog;

  if (error && !displayBlog) {
    return (
      <div className="min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center py-12">
            <h1 className="text-2xl font-bold text-destructive mb-4">
              Error Loading Blog Post
            </h1>
            <p className="text-muted-foreground mb-6">
              Unable to load this blog post. Please try again later.
            </p>
            <Button variant="outline" asChild>
              <Link href="/blog">
                <FaArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <div className="mb-8">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/blog">
                <FaArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>
          </div>

          {/* Blog Header */}
          <header className="space-y-6 mb-12">
            {/* Cover Image */}
            {displayBlog.coverImage && (
              <div className="relative h-64 md:h-80 overflow-hidden rounded-lg">
                <Image
                  src={displayBlog.coverImage}
                  alt={displayBlog.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 80vw"
                />
              </div>
            )}

            {/* Title and Metadata */}
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                {displayBlog.title}
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed">
                {displayBlog.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {displayBlog.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Metadata Row */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <FaClock className="h-4 w-4" />
                  <span>{formatDate(displayBlog.publishedAt)}</span>
                </div>

                <Suspense fallback={<Skeleton className="h-4 w-20" />}>
                  <ViewCounter
                    slug={displayBlog.slug}
                    initialViews={displayBlog.views}
                  />
                </Suspense>

                {displayBlog.readTime && (
                  <span>{displayBlog.readTime} min read</span>
                )}
              </div>
            </div>

            <Separator />
          </header>

          {/* Blog Content */}
          <main className="prose prose-lg dark:prose-invert max-w-none">
            {isLoading && !displayBlog.content ? (
              <BlogContentSkeleton />
            ) : (
              <MarkdownRenderer content={displayBlog.content} />
            )}
          </main>

          {/* Navigation Footer */}
          <footer className="mt-16 pt-8 border-t">
            <div className="flex justify-between items-center">
              <Button variant="outline" asChild>
                <Link href="/blog">
                  <FaArrowLeft className="mr-2 h-4 w-4" />
                  All Posts
                </Link>
              </Button>

              <div className="text-right">
                <p className="text-sm text-muted-foreground">
                  Enjoyed this post? Share it with others!
                </p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

// Helper function
function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Blog Content Skeleton Component
function BlogContentSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-4/5" />
      <Skeleton className="h-6 w-full mt-8" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <div className="bg-gray-100 dark:bg-gray-800 rounded p-4 mt-6">
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </div>
  );
}
