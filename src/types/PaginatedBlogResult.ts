import { BlogPost } from "@/types/BlogPost";
import { QueryDocumentSnapshot } from "firebase/firestore";

export interface PaginatedBlogResult {
  posts: BlogPost[];
  totalCount: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  currentPage: number;
  totalPages: number;
  lastDoc?: QueryDocumentSnapshot;
}
