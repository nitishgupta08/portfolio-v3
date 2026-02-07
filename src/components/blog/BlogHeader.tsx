import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";

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
    <div className="mb-12">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h1 className="text-4xl font-semibold md:text-5xl">Blog</h1>
          {isFetching && !isLoading ? <Spinner className="size-4" /> : null}
        </div>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Notes on software, ideas, and maybe rant.
        </p>

        {isLoading ? (
          <Skeleton className="h-4 w-48" />
        ) : (
          <div className="text-sm text-muted-foreground">
            {totalPosts} {totalPosts === 1 ? "post" : "posts"}
          </div>
        )}
      </div>
    </div>
  );
}
