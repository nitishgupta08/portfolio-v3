import { Empty } from "@/components/ui/empty";

interface EmptyBlogStateProps {
  isAdmin?: boolean;
}

export default function EmptyBlogState({ isAdmin = false }: EmptyBlogStateProps) {
  return (
    <div className="w-full py-16">
      <Empty
        className="mx-auto max-w-md"
        title="No blog posts yet"
        description={
          isAdmin
            ? "Start publishing when you're ready."
            : "New posts will appear here soon."
        }
      />
    </div>
  );
}
