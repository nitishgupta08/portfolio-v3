// components/BlogPagination.tsx
import { Button } from "@/components/ui/button";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Link from "next/link";

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export function BlogPagination({
  currentPage,
  totalPages,
  hasNextPage,
  hasPrevPage,
}: BlogPaginationProps) {
  // Generate pagination links
  const getPaginationLinks = () => {
    const links = [];
    const maxVisiblePages = 5;
    const startPage = Math.max(
      1,
      currentPage - Math.floor(maxVisiblePages / 2)
    );
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    for (let i = startPage; i <= endPage; i++) {
      links.push(i);
    }
    return links;
  };

  return (
    <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Previous Button */}
      <div className="flex-1">
        {hasPrevPage ? (
          <Button variant="outline" asChild>
            <Link href={`/blog?page=${currentPage - 1}`}>
              <FaChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Link>
          </Button>
        ) : (
          <Button variant="outline" disabled>
            <FaChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
        )}
      </div>

      {/* Page Numbers */}
      <div className="flex items-center gap-2">
        {/* First page if not visible */}
        {currentPage > 3 && (
          <>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/blog?page=1">1</Link>
            </Button>
            {currentPage > 4 && (
              <span className="text-muted-foreground px-2">...</span>
            )}
          </>
        )}

        {/* Visible page numbers */}
        {getPaginationLinks().map((pageNum) => (
          <Button
            key={pageNum}
            variant={pageNum === currentPage ? "default" : "ghost"}
            size="sm"
            asChild
          >
            <Link href={`/blog?page=${pageNum}`}>{pageNum}</Link>
          </Button>
        ))}

        {/* Last page if not visible */}
        {currentPage < totalPages - 2 && (
          <>
            {currentPage < totalPages - 3 && (
              <span className="text-muted-foreground px-2">...</span>
            )}
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/blog?page=${totalPages}`}>{totalPages}</Link>
            </Button>
          </>
        )}
      </div>

      {/* Next Button */}
      <div className="flex-1 flex justify-end">
        {hasNextPage ? (
          <Button variant="outline" asChild>
            <Link href={`/blog?page=${currentPage + 1}`}>
              Next
              <FaChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        ) : (
          <Button variant="outline" disabled>
            Next
            <FaChevronRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
