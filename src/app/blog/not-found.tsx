import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FaArrowLeft, FaHome } from "react-icons/fa";

export default function BlogNotFound() {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Back Button */}
          <div className="mb-8 text-left">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/blog">
                <FaArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>
          </div>

          <div className="space-y-6">
            <Badge variant="outline" className="mx-auto">
              📝 Blog Post Not Found
            </Badge>

            <div className="space-y-4">
              <h1 className="text-4xl font-bold">
                This blog post doesn&rsquo;t exist
              </h1>
              <p className="text-muted-foreground">
                The blog post you&rsquo;re looking for might have been moved,
                deleted, or never existed.
              </p>
            </div>

            <div className="flex gap-4 justify-center pt-4">
              <Button asChild>
                <Link href="/blog">All Blog Posts</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/">
                  <FaHome className="mr-2 h-4 w-4" />
                  Home
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
