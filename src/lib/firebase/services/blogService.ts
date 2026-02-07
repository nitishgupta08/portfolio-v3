import { fallbackBlogData } from "@/lib/data/blogData";
import { db } from "@/lib/firebase/firebase";
import type { BlogPost } from "@/types/BlogPost";
import { PaginatedBlogResult } from "@/types/PaginatedBlogResult";
import {
  collection,
  doc,
  getDocs,
  increment,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

const COLLECTION_NAME = "blog_posts";

export class BlogService {
  private static getPublishedFallbackPosts(): BlogPost[] {
    return fallbackBlogData
      .filter((post) => post.isPublished !== false && post.isDraft !== true)
      .sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
      );
  }

  static async getPaginatedBlogPosts(
    page: number,
    pageSize: number,
  ): Promise<PaginatedBlogResult> {
    const safePageSize = Math.max(1, pageSize);

    try {
      let publishedPosts: BlogPost[];

      if (process.env.NEXT_PUBLIC_USE_FALLBACK_DATA === "true") {
        publishedPosts = this.getPublishedFallbackPosts();
      } else {
        const q = query(
          collection(db, COLLECTION_NAME),
          where("isPublished", "==", true),
          orderBy("publishedAt", "desc"),
        );
        const postsSnapshot = await getDocs(q);

        publishedPosts = postsSnapshot.docs.map((snapshot) => ({
          id: snapshot.id,
          ...snapshot.data(),
        })) as BlogPost[];
      }

      const totalCount = publishedPosts.length;
      const totalPages = Math.max(1, Math.ceil(totalCount / safePageSize));
      const currentPage = Math.min(Math.max(page, 1), totalPages);
      const startIndex = (currentPage - 1) * safePageSize;
      const posts = publishedPosts.slice(startIndex, startIndex + safePageSize);

      return {
        posts,
        totalCount,
        hasNextPage: currentPage < totalPages,
        hasPrevPage: currentPage > 1,
        currentPage,
        totalPages,
      };
    } catch (error) {
      console.error("Error fetching paginated blog posts:", error);
      throw new Error("Failed to fetch blog posts");
    }
  }

  static async getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    if (process.env.NEXT_PUBLIC_USE_FALLBACK_DATA === "true") {
      return (
        this.getPublishedFallbackPosts().find((post) => post.slug === slug) ??
        null
      );
    }

    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where("slug", "==", slug),
        where("isPublished", "==", true),
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const record = querySnapshot.docs[0];
        return {
          id: record.id,
          ...record.data(),
        } as BlogPost;
      }

      return null;
    } catch (error) {
      console.error("Error fetching blog post:", error);
      throw new Error("Failed to fetch blog post");
    }
  }

  static async incrementViewCount(slug: string): Promise<void> {
    if (process.env.NEXT_PUBLIC_USE_FALLBACK_DATA === "true") {
      return;
    }

    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where("slug", "==", slug),
        where("isPublished", "==", true),
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docRef = doc(db, COLLECTION_NAME, querySnapshot.docs[0].id);
        await updateDoc(docRef, {
          views: increment(1),
          updatedAt: new Date().toISOString(),
        });
      }
    } catch (error) {
      console.error("Error incrementing view count:", error);
    }
  }
}
