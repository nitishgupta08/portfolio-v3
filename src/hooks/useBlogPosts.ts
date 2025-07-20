import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { BlogService, PaginatedBlogResult } from '@/lib/firebase/services/blogService';
import { fallbackBlogData } from '@/lib/data/blogData';
import type { BlogPost } from '@/types/BlogPost';

// Query keys for different types of blog queries
const BLOG_QUERY_KEY = 'blog_posts';

export function usePaginatedBlogPosts(page: number, pageSize: number = 6) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: [BLOG_QUERY_KEY, 'paginated', page, pageSize],
    queryFn: () => BlogService.getPaginatedBlogPosts(page, pageSize),
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: 2,
  });

  // Setup real-time listener for automatic cache invalidation
  useEffect(() => {
    const unsubscribe = BlogService.setupRealTimeListener(() => {
      queryClient.invalidateQueries({ 
        queryKey: [BLOG_QUERY_KEY] 
      });
    });

    return unsubscribe;
  }, [queryClient]);

  return query;
}

// Enhanced hook for individual blog post with fallback handling
export function useBlogPost(slug: string) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: [BLOG_QUERY_KEY, 'single', slug],
    queryFn: async () => {
      try {
        return await BlogService.getBlogPostBySlug(slug);
      } catch (error) {
        console.error('Firebase fetch failed, using fallback data:', error);
        // Return fallback data instead of throwing error
        const fallbackPost = fallbackBlogData.find(blog => blog.slug === slug && blog.isPublished);
        if (fallbackPost) {
          return fallbackPost;
        }
        throw error; // Only throw if not found in fallback either
      }
    },
    staleTime: 15 * 60 * 1000, // 15 minutes for individual posts
    gcTime: 45 * 60 * 1000, // Keep individual posts longer in cache
    retry: 2,
    enabled: !!slug, // Only run if slug exists
  });

  // Setup real-time listener for this specific post
  useEffect(() => {
    if (!slug) return;

    const unsubscribe = BlogService.setupRealTimeListener(() => {
      // Invalidate this specific blog post query
      queryClient.invalidateQueries({ 
        queryKey: [BLOG_QUERY_KEY, 'single', slug] 
      });
    });

    return unsubscribe;
  }, [slug, queryClient]);

  return query;
}

// Hook for prefetching next page
export function usePrefetchNextPage(currentPage: number, totalPages: number, pageSize: number = 6) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (currentPage < totalPages) {
      // Prefetch next page
      queryClient.prefetchQuery({
        queryKey: [BLOG_QUERY_KEY, 'paginated', currentPage + 1, pageSize],
        queryFn: () => BlogService.getPaginatedBlogPosts(currentPage + 1, pageSize),
        staleTime: 10 * 60 * 1000,
      });
    }
  }, [currentPage, totalPages, pageSize, queryClient]);
}
