import { db } from '@/lib/firebase/firebase';
import type { BlogPost } from '@/types/BlogPost';
import { PaginatedBlogResult } from '@/types/PaginatedBlogResult';
import {
  QueryDocumentSnapshot,
  collection,
  doc,
  getDocs,
  increment,
  limit,
  onSnapshot,
  query,
  startAfter,
  updateDoc,
  where
} from 'firebase/firestore';

const COLLECTION_NAME = 'blog_posts';

export class BlogService {
  // Get paginated blog posts
  static async getPaginatedBlogPosts(
    page: number = 1, 
    pageSize: number = 6,
    lastDoc?: QueryDocumentSnapshot
  ): Promise<PaginatedBlogResult> {
    try {

      if (process.env.NEXT_PUBLIC_USE_FALLBACK_DATA === 'true') {
        throw new Error('Using fallback data for testing');
      }

      // Build base query
      let q = query(
        collection(db, COLLECTION_NAME),
        where('isPublished', '==', true),
        // orderBy('publishedAt', 'desc'),
        limit(pageSize)
      );

      // Add pagination cursor for pages beyond first
      if (lastDoc) {
        q = query(q, startAfter(lastDoc));
      }

      const [postsSnapshot, totalCountSnapshot] = await Promise.all([
        getDocs(q),
        this.getTotalPublishedCount()
      ]);

      const posts: BlogPost[] = [];
      postsSnapshot.forEach((doc) => {
        posts.push({
          id: doc.id,
          ...doc.data()
        } as BlogPost);
      });

      const totalCount = totalCountSnapshot;
      const totalPages = Math.ceil(totalCount / pageSize);
      const hasNextPage = page < totalPages;
      const hasPrevPage = page > 1;
      const lastDocument = postsSnapshot.docs[postsSnapshot.docs.length - 1];

      return {
        posts,
        totalCount,
        hasNextPage,
        hasPrevPage,
        currentPage: page,
        totalPages,
        lastDoc: lastDocument
      };
    } catch (error) {
      console.error('Error fetching paginated blog posts:', error);
      throw new Error('Failed to fetch blog posts');
    }
  }

  // Get total count of published posts (for pagination info)
  private static async getTotalPublishedCount(): Promise<number> {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where('isPublished', '==', true)
      );
      const snapshot = await getDocs(q);
      return snapshot.size;
    } catch (error) {
      console.error('Error getting total count:', error);
      return 0;
    }
  }

  // Get single blog post by slug
  static async getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where('slug', '==', slug),
        where('isPublished', '==', true)
      );
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return {
          id: doc.id,
          ...doc.data()
        } as BlogPost;
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching blog post:', error);
      throw new Error('Failed to fetch blog post');
    }
  }

    static async incrementViewCount(slug: string): Promise<void> {
    // Skip Firebase update if using fallback data
    if (process.env.NEXT_PUBLIC_USE_FALLBACK_DATA === 'true') {
      console.log('Skipping view count increment - using fallback data');
      return;
    }

    try {
      // Find the document by slug
      const q = query(
        collection(db, COLLECTION_NAME),
        where('slug', '==', slug),
        where('isPublished', '==', true)
      );
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const docRef = doc(db, COLLECTION_NAME, querySnapshot.docs[0].id);
        await updateDoc(docRef, {
          views: increment(1),
          updatedAt: new Date().toISOString()
        });
        console.log(`View count incremented for blog post: ${slug}`);
      } else {
        console.warn(`Blog post not found for view count increment: ${slug}`);
      }
    } catch (error) {
      console.error('Error incrementing view count:', error);
      // Don't throw error for view count increment failures
      // This is a non-critical operation
    }
  }

  // Get all posts (for backward compatibility)
  static async getAllBlogPosts(): Promise<BlogPost[]> {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where('isPublished', '==', true),
        // orderBy('publishedAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      const posts: BlogPost[] = [];
      querySnapshot.forEach((doc) => {
        posts.push({
          id: doc.id,
          ...doc.data()
        } as BlogPost);
      });
      
      return posts;
    } catch (error) {
      console.error('Error fetching all blog posts:', error);
      throw new Error('Failed to fetch blog posts');
    }
  }

  // Real-time listener for cache invalidation
  static setupRealTimeListener(onDataChange: () => void) {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('isPublished', '==', true)
    );
    
    return onSnapshot(q, (snapshot) => {
      if (!snapshot.empty && !snapshot.metadata.fromCache) {
        console.log('Blog posts data changed, invalidating cache');
        onDataChange();
      }
    }, (error) => {
      console.error('Blog real-time listener error:', error);
    });
  }
}
