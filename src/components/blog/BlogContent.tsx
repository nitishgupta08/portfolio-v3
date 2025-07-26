"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { FaClock, FaEye, FaChevronLeft, FaChevronRight, FaExclamationTriangle } from "react-icons/fa";
import { BlogService } from "@/lib/firebase/services/blogService";
import { fallbackBlogData } from "@/lib/data/blogData";
import type { BlogPost } from "@/types/BlogPost";

const POSTS_PER_PAGE = 6;

interface BlogContentProps {
  currentPage: number;
}

interface BlogState {
  posts: BlogPost[];
  totalPosts: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
}

export default function BlogContent({ currentPage }: BlogContentProps) {
  const [state, setState] = useState<BlogState>({
    posts: [],
    totalPosts: 0,
    totalPages: 0,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    async function fetchBlogs() {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      try {
        const allBlogs = await BlogService.getAllBlogPosts();
        const publishedBlogs = allBlogs.filter(blog => blog.isPublished);
        
        // Sort by published date (newest first)
        const sortedBlogs = publishedBlogs.sort((a, b) => 
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        );

        // Pagination logic
        const totalPosts = sortedBlogs.length;
        const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
        const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
        const endIndex = startIndex + POSTS_PER_PAGE;
        const posts = sortedBlogs.slice(startIndex, endIndex);

        setState({
          posts,
          totalPosts,
          totalPages,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: 'Failed to fetch blog posts',
        }));
      }
    }

    fetchBlogs();
  }, [currentPage]);

  if (state.isLoading) {
    return <BlogSkeleton />;
  }

  if (state.error) {
    return <BlogErrorState onRetry={() => window.location.reload()} />;
  }

  if (state.posts.length === 0) {
    return <EmptyBlogState />;
  }

  return (
    <>
      {/* Header */}
      <BlogHeader 
        totalPosts={state.totalPosts} 
        currentPage={currentPage} 
        totalPages={state.totalPages}
      />

      {/* Posts List */}
      <div className="space-y-6">
        {state.posts.map((blog) => (
          <BlogListItem key={blog.id} blog={blog} />
        ))}
      </div>

      {/* Pagination */}
      {state.totalPages > 1 && (
        <BlogPagination 
          currentPage={currentPage}
          totalPages={state.totalPages}
        />
      )}

      {/* Posts Summary */}
      <div className="mt-8 text-center text-sm text-muted-foreground">
        Showing {((currentPage - 1) * POSTS_PER_PAGE) + 1}-{Math.min(currentPage * POSTS_PER_PAGE, state.totalPosts)} of {state.totalPosts} posts
      </div>
    </>
  );
}

// Blog Error State Component
function BlogErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="text-center py-16">
      <div className="max-w-md mx-auto">
        <div className="w-20 h-20 mx-auto bg-destructive/10 rounded-full flex items-center justify-center mb-6">
          <FaExclamationTriangle className="h-8 w-8 text-destructive" />
        </div>
        
        <h2 className="text-2xl font-bold mb-4">
          Unable to Load Blog Posts
        </h2>
        
        <p className="text-muted-foreground mb-6 leading-relaxed">
          We're having trouble connecting to our servers right now. This might be a temporary issue.
        </p>
        
        <div className="space-y-3">
          <Button onClick={onRetry} className="w-full">
            Try Again
          </Button>
          
          <div className="text-xs text-muted-foreground">
            If the problem persists, please check your internet connection
          </div>
        </div>
      </div>
    </div>
  );
}

// Empty Blog State Component  
function EmptyBlogState() {
  return (
    <div className="text-center py-16">
      <div className="max-w-md mx-auto">
        <div className="w-20 h-20 mx-auto bg-muted/50 rounded-full flex items-center justify-center mb-6">
          <FaClock className="h-8 w-8 text-muted-foreground" />
        </div>
        
        <h2 className="text-2xl font-bold mb-4">
          No Blog Posts Yet
        </h2>
        
        <p className="text-muted-foreground leading-relaxed">
          I'm working on some exciting content. Check back soon for updates!
        </p>
      </div>
    </div>
  );
}

// Blog Header Component
function BlogHeader({ totalPosts, currentPage, totalPages }: {
  totalPosts: number;
  currentPage: number; 
  totalPages: number;
}) {
  return (
    <div className="text-center mb-16">
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold">Blog</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Thoughts on web development, technology trends, and programming best practices
        </p>
        {totalPosts > 0 && (
          <div className="text-sm text-muted-foreground">
            {totalPosts} {totalPosts === 1 ? 'post' : 'posts'} • Page {currentPage} of {totalPages}
          </div>
        )}
      </div>
      <Separator className="mt-8 max-w-md mx-auto" />
    </div>
  );
}

// Blog Pagination Component
function BlogPagination({ currentPage, totalPages }: {
  currentPage: number;
  totalPages: number;
}) {
  const hasPrevPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  return (
    <div className="mt-12 flex items-center justify-between">
      <div className="flex-1">
        {hasPrevPage ? (
          <Button variant="outline" asChild>
            <Link href={`/blog?page=${currentPage - 1}`}>
              <FaChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Link>
          </Button>
        ) : (
          <Button variant="outline" disabled>
            <FaChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <Button
            key={pageNum}
            variant={pageNum === currentPage ? "default" : "ghost"}
            size="sm"
            asChild
          >
            <Link href={`/blog?page=${pageNum}`}>
              {pageNum}
            </Link>
          </Button>
        ))}
      </div>

      <div className="flex-1 flex justify-end">
        {hasNextPage ? (
          <Button variant="outline" asChild>
            <Link href={`/blog?page=${currentPage + 1}`}>
              Next
              <FaChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        ) : (
          <Button variant="outline" disabled>
            Next
            <FaChevronRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}

// Blog Skeleton Component
function BlogSkeleton() {
  return (
    <div className="space-y-8">
      {/* Header Skeleton */}
      <div className="text-center mb-16">
        <Skeleton className="h-12 w-32 mx-auto mb-4" />
        <Skeleton className="h-6 w-96 mx-auto mb-2" />
        <Skeleton className="h-4 w-48 mx-auto" />
        <Skeleton className="h-px w-64 mx-auto mt-8" />
      </div>

      {/* Posts Skeleton */}
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Card key={i}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="flex gap-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-20" />
              </div>
              <div className="flex gap-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
            <Skeleton className="h-8 w-3/4 mt-2" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/5" />
            </div>
            <Skeleton className="h-4 w-20 mt-4" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// Blog List Item Component
function BlogListItem({ blog }: { blog: BlogPost }) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long", 
      day: "numeric",
    });
  };

  const formatViews = (views: number) => {
    return views >= 1000 ? `${(views / 1000).toFixed(1)}k` : views.toString();
  };

  return (
    <Card className="transition-shadow hover:shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex gap-2">
            {blog.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {blog.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{blog.tags.length - 3}
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <FaClock className="h-3 w-3" />
              {formatDate(blog.publishedAt)}
            </div>
            <div className="flex items-center gap-1">
              <FaEye className="h-3 w-3" />
              {formatViews(blog.views)} views
            </div>
            {blog.readTime && <span>{blog.readTime} min read</span>}
          </div>
        </div>

        <Link href={`/blog/${blog.slug}`}>
          <h2 className="text-2xl font-bold hover:text-primary transition-colors cursor-pointer line-clamp-2 leading-tight">
            {blog.title}
          </h2>
        </Link>
      </CardHeader>

      <CardContent>
        <p className="text-muted-foreground leading-relaxed line-clamp-3 mb-4">
          {blog.description}
        </p>
        <Link href={`/blog/${blog.slug}`}>
          <Button variant="ghost" size="sm" className="p-0 h-auto text-primary hover:text-primary/80">
            Read more →
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
