// components/BlogPostsList.tsx
import type { BlogPost } from "@/types/BlogPost";
import { BlogListItem } from "@/components/blog/BlogListItem";

interface BlogPostsListProps {
  posts: BlogPost[];
}

export function BlogPostsList({ posts }: BlogPostsListProps) {
  return (
    <div className="space-y-6">
      {posts.map((blog) => (
        <BlogListItem key={blog.id} blog={blog} />
      ))}
    </div>
  );
}
