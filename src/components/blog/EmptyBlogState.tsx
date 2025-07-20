import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaPen, FaRss } from "react-icons/fa";

interface EmptyBlogStateProps {
  isAdmin?: boolean;
}

export default function EmptyBlogState({ isAdmin = false }: EmptyBlogStateProps) {
  return (
    <div className="w-full py-16">
      <Card className="max-w-md mx-auto border-dashed border-2 border-muted-foreground/25">
        <CardContent className="p-12 text-center space-y-6">
          {/* Icon */}
          <div className="w-20 h-20 mx-auto bg-muted/50 rounded-full flex items-center justify-center">
            <FaRss className="h-8 w-8 text-muted-foreground" />
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-foreground">
              No Blog Posts Yet
            </h3>
            <p className="text-muted-foreground">
              {isAdmin 
                ? "Start sharing your thoughts by creating your first blog post."
                : "Stay tuned! New blog posts are coming soon."
              }
            </p>
          </div>

          {/* Action Button */}
          {isAdmin ? (
            <Button className="mt-4">
              <FaPen className="mr-2 h-4 w-4" />
              Write Your First Post
            </Button>
          ) : (
            <div className="text-sm text-muted-foreground/75">
              Check back later for updates
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
