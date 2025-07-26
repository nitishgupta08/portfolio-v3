import { useQuery } from "@tanstack/react-query";

import { BlogService } from "@/lib/firebase/services/blogService";

// Query keys for different types of blog queries
const BLOG_QUERY_KEY = "blog_posts";

export function usePaginatedBlogPosts(page: number, pageSize: number) {
  const query = useQuery({
    queryKey: [BLOG_QUERY_KEY, "paginated", page, pageSize],
    queryFn: () => BlogService.getPaginatedBlogPosts(page, pageSize),
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
  });

  return query;
}

// Enhanced hook for individual blog post with fallback handling
export function useBlogPost(slug: string) {
  const query = useQuery({
    queryKey: [BLOG_QUERY_KEY, "single", slug],
    queryFn: () => BlogService.getBlogPostBySlug(slug),
    staleTime: 24 * 60 * 60 * 1000, // 24 hours

    // gcTime: 45 * 60 * 1000, // Keep individual posts longer in cache
    // retry: 2,
    // enabled: !!slug, // Only run if slug exists
  });

  return query;
}
