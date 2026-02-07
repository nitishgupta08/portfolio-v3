import { BlogPost } from "@/types/BlogPost";

export interface PaginatedBlogResult {
  posts: BlogPost[];
  totalCount: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  currentPage: number;
  totalPages: number;
}
