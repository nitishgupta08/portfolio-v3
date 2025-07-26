"use client";

import { Button } from "@/components/ui/button";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import { usePaginatedBlogPosts } from "@/hooks/useBlogPosts";
import { useEffect } from "react";
import { BlogHeader } from "@/components/blog/BlogHeader";
import { BlogContentSkeleton } from "@/components/blog/BlogContentSkeleton";
import { BlogErrorState } from "@/components/blog/BlogErrorState";
import { BlogPostsList } from "@/components/blog/BlogPostsList";
import { BlogPagination } from "@/components/blog/BlogPagination";
import { PostsSummary } from "@/components/blog/PostsSummary";
import EmptyBlogState from "./EmptyBlogState";

const POSTS_PER_PAGE = 6;

interface BlogPageContentProps {
  initialPage: number;
}

export function BlogPageContent({ initialPage }: BlogPageContentProps) {
  const {
    data: blogResult,
    isLoading,
    error,
    isFetching,
  } = usePaginatedBlogPosts(initialPage, POSTS_PER_PAGE);

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

          {/* Page Header */}
          <BlogHeader
            totalPosts={blogResult?.totalCount || 0}
            currentPage={blogResult?.currentPage || initialPage}
            totalPages={blogResult?.totalPages || 1}
            isFetching={isFetching}
            isLoading={isLoading}
          />

          {/* Loading State */}
          {isLoading && <BlogContentSkeleton />}

          {/* Error State */}
          {error && !isLoading && <BlogErrorState />}

          {/* Blog Posts Content */}
          {!isLoading && !error && (
            <>
              <BlogPostsList posts={blogResult?.posts || []} />

              {/* Pagination - Show when we have multiple pages */}
              {(blogResult?.totalPages || 0) > 1 && (
                <BlogPagination
                  currentPage={blogResult?.currentPage || initialPage}
                  totalPages={blogResult?.totalPages || 1}
                  hasNextPage={blogResult?.hasNextPage || false}
                  hasPrevPage={blogResult?.hasPrevPage || false}
                />
              )}

              {/* Posts summary */}
              <PostsSummary
                currentPage={blogResult?.currentPage || initialPage}
                totalPosts={blogResult?.totalCount || 0}
                postsPerPage={POSTS_PER_PAGE}
              />
            </>
          )}

          {/* Empty State */}
          {!isLoading && !error && (blogResult?.posts || []).length === 0 && (
            <EmptyBlogState />
          )}
        </div>
      </div>
    </div>
  );
}
