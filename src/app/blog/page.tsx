import { Metadata } from "next";
import { BlogPageContent } from "@/components/blog/BlogPageContent";

export const metadata: Metadata = {
  title: "Blog - Nitish Gupta",
  description: "Read my latest thoughts on web development, technology, and programming.",
};

interface BlogPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams.page) || 1;

  return <BlogPageContent initialPage={currentPage} />;
}
