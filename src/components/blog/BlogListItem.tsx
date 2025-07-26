// components/BlogListItem.tsx
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FaClock, FaEye } from "react-icons/fa";
import Link from "next/link";
import type { BlogPost } from "@/types/BlogPost";

interface BlogListItemProps {
  blog: BlogPost;
}

export function BlogListItem({ blog }: BlogListItemProps) {
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
            {blog.readTime && <span>{blog.readTime} min read</span>}
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
              <Button
                variant="ghost"
                size="sm"
                className="p-0 h-auto text-primary hover:text-primary/80"
              >
                Read more →
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
