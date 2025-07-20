"use client";

import { Suspense } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { FaClock, FaEye, FaChevronLeft, FaChevronRight, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import { usePaginatedBlogPosts, usePrefetchNextPage } from "@/hooks/useBlogPosts";
import { fallbackBlogData } from "@/lib/data/blogData";
import EmptyBlogState from "./EmptyBlogState";
import type { BlogPost } from "@/types/BlogPost";

const POSTS_PER_PAGE = 6;

interface BlogPageContentProps {
  initialPage: number;
}

export function BlogPageContent({ initialPage }: BlogPageContentProps) {
  const { 
    data: blogResult, 
    isLoading, 
    error, 
    isFetching 
  } = usePaginatedBlogPosts(initialPage, POSTS_PER_PAGE);

  // Prefetch next page for better UX
  usePrefetchNextPage(
    blogResult?.currentPage || initialPage, 
    blogResult?.totalPages || 1, 
    POSTS_PER_PAGE
  );

  // Fallback data if query fails
  const fallbackPosts = fallbackBlogData.filter(blog => blog.isPublished);
  const fallbackTotalPages = Math.ceil(fallbackPosts.length / POSTS_PER_PAGE);

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back to Home Button */}
          <div className="mb-8">
            <Button 
              variant="ghost" 
              size="sm"
              asChild
              className="hover:bg-primary/10"
            >
              <Link href="/">
                <FaArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>

          {/* Page Header - Always Visible */}
          <BlogHeader 
            totalPosts={blogResult?.totalCount || fallbackPosts.length} 
            currentPage={blogResult?.currentPage || initialPage} 
            totalPages={blogResult?.totalPages || fallbackTotalPages}
            isFetching={isFetching}
            isLoading={isLoading}
          />

          {/* Content Area */}
          {isLoading && (
            <BlogContentSkeleton />
          )}

          {error && !blogResult && (
            <div className="text-center py-12">
              <p className="text-destructive mb-4">Error loading blog posts.</p>
              <p className="text-muted-foreground">Showing cached content instead.</p>
            </div>
          )}

          {/* Blog Posts - Show either loaded data or fallback */}
          {!isLoading && (
            <>
              <BlogPostsList 
                posts={blogResult?.posts || fallbackPosts.slice((initialPage - 1) * POSTS_PER_PAGE, initialPage * POSTS_PER_PAGE)}
              />

              {/* Pagination - Show when we have multiple pages */}
              {(blogResult?.totalPages || fallbackTotalPages) > 1 && (
                <BlogPagination 
                  currentPage={blogResult?.currentPage || initialPage}
                  totalPages={blogResult?.totalPages || fallbackTotalPages}
                  hasNextPage={blogResult?.hasNextPage || initialPage < fallbackTotalPages}
                  hasPrevPage={blogResult?.hasPrevPage || initialPage > 1}
                />
              )}

              {/* Posts summary */}
              <PostsSummary 
                currentPage={blogResult?.currentPage || initialPage}
                totalPosts={blogResult?.totalCount || fallbackPosts.length}
                postsPerPage={POSTS_PER_PAGE}
              />
            </>
          )}

          {/* Empty State */}
          {!isLoading && (blogResult?.posts || fallbackPosts).length === 0 && (
            <EmptyBlogState />
          )}
        </div>
      </div>
    </div>
  );
}

// Blog Header Component with Loading States
function BlogHeader({ 
  totalPosts, 
  currentPage, 
  totalPages, 
  isFetching,
  isLoading
}: { 
  totalPosts: number; 
  currentPage: number; 
  totalPages: number;
  isFetching: boolean;
  isLoading: boolean;
}) {
  return (
    <div className="text-center mb-16">
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold">
          Blog
          {isFetching && !isLoading && (
            <span className="ml-2 text-sm text-muted-foreground">(updating...)</span>
          )}
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Thoughts on web development, technology trends, and programming best practices
        </p>
        
        {/* Posts count with skeleton during loading */}
        {isLoading ? (
          <Skeleton className="h-4 w-48 mx-auto" />
        ) : (
          <div className="text-sm text-muted-foreground">
            {totalPosts} {totalPosts === 1 ? 'post' : 'posts'}
          </div>
        )}
      </div>
      <Separator className="mt-8 max-w-md mx-auto" />
    </div>
  );
}

// Blog Posts List Component
function BlogPostsList({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="space-y-6">
      {posts.map((blog) => (
        <BlogListItem key={blog.id} blog={blog} />
      ))}
    </div>
  );
}

// Blog Pagination Component
function BlogPagination({ 
  currentPage, 
  totalPages, 
  hasNextPage, 
  hasPrevPage 
}: {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}) {
  // Generate pagination links
  const getPaginationLinks = () => {
    const links = [];
    const maxVisiblePages = 5;
    const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    for (let i = startPage; i <= endPage; i++) {
      links.push(i);
    }
    return links;
  };

  return (
    <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Previous Button */}
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

      {/* Page Numbers */}
      <div className="flex items-center gap-2">
        {/* First page if not visible */}
        {currentPage > 3 && (
          <>
            <Button 
              variant="ghost" 
              size="sm"
              asChild
            >
              <Link href="/blog?page=1">1</Link>
            </Button>
            {currentPage > 4 && (
              <span className="text-muted-foreground px-2">...</span>
            )}
          </>
        )}

        {/* Visible page numbers */}
        {getPaginationLinks().map((pageNum) => (
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

        {/* Last page if not visible */}
        {currentPage < totalPages - 2 && (
          <>
            {currentPage < totalPages - 3 && (
              <span className="text-muted-foreground px-2">...</span>
            )}
            <Button 
              variant="ghost" 
              size="sm"
              asChild
            >
              <Link href={`/blog?page=${totalPages}`}>{totalPages}</Link>
            </Button>
          </>
        )}
      </div>

      {/* Next Button */}
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

// Posts Summary Component
function PostsSummary({ 
  currentPage, 
  totalPosts, 
  postsPerPage 
}: {
  currentPage: number;
  totalPosts: number;
  postsPerPage: number;
}) {
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = Math.min(startIndex + postsPerPage, totalPosts);

  return (
    <div className="mt-8 text-center text-sm text-muted-foreground">
      Showing {startIndex + 1}-{endIndex} of {totalPosts} posts
    </div>
  );
}

// Blog Content Skeleton Component
function BlogContentSkeleton() {
  return (
    <div className="space-y-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Card key={i} className="transition-shadow">
          <CardHeader className="pb-4">
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
      <CardHeader className="pb-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
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
              <span>{formatDate(blog.publishedAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaEye className="h-3 w-3" />
              <span>{formatViews(blog.views)} views</span>
            </div>
            {blog.readTime && (
              <span>{blog.readTime} min read</span>
            )}
          </div>
        </div>

        <Link href={`/blog/${blog.slug}`}>
          <h2 className="text-2xl md:text-3xl font-bold hover:text-primary transition-colors cursor-pointer line-clamp-2 leading-tight">
            {blog.title}
          </h2>
        </Link>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-4">
          <p className="text-muted-foreground leading-relaxed line-clamp-3">
            {blog.description}
          </p>
          <div>
            <Link href={`/blog/${blog.slug}`}>
              <Button variant="ghost" size="sm" className="p-0 h-auto text-primary hover:text-primary/80">
                Read more →
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
