import { useQuery } from "@tanstack/react-query";

import { BlogService } from "@/lib/firebase/services/blogService";
import type { PaginatedBlogResult } from "@/types/PaginatedBlogResult";
import type { BlogPost } from "@/types/BlogPost";

const BLOG_QUERY_KEY = "blog_posts";

export function usePaginatedBlogPosts(
  page: number,
  pageSize: number,
  initialData?: PaginatedBlogResult,
) {
  const query = useQuery({
    queryKey: [BLOG_QUERY_KEY, "paginated", page, pageSize],
    queryFn: () => BlogService.getPaginatedBlogPosts(page, pageSize),
    staleTime: 24 * 60 * 60 * 1000,
    initialData,
  });

  return query;
}

export function useBlogPost(slug: string, initialData?: BlogPost | null) {
  const query = useQuery({
    queryKey: [BLOG_QUERY_KEY, "single", slug],
    queryFn: () => BlogService.getBlogPostBySlug(slug),
    staleTime: 24 * 60 * 60 * 1000,
    initialData,
  });

  return query;
}
