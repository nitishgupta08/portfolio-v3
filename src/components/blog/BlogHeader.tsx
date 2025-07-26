// components/BlogHeader.tsx
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

interface BlogHeaderProps {
  totalPosts: number;
  currentPage: number;
  totalPages: number;
  isFetching: boolean;
  isLoading: boolean;
}

export function BlogHeader({
  totalPosts,
  isFetching,
  isLoading,
}: BlogHeaderProps) {
  return (
    <div className="text-center mb-16">
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold">
          Blog
          {isFetching && !isLoading && (
            <span className="ml-2 text-sm text-muted-foreground">
              (updating...)
            </span>
          )}
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Thoughts on web development, technology trends, and programming best
          practices
        </p>

        {/* Posts count with skeleton during loading */}
        {isLoading ? (
          <Skeleton className="h-4 w-48 mx-auto" />
        ) : (
          <div className="text-sm text-muted-foreground">
            {totalPosts} {totalPosts === 1 ? "post" : "posts"}
          </div>
        )}
      </div>
      <Separator className="mt-8 max-w-md mx-auto" />
    </div>
  );
}
