import { Metadata } from "next";
import { BlogPageContent } from "@/components/blog/BlogPageContent";
import { getBlogPage } from "@/lib/server/portfolioData";

export const metadata: Metadata = {
  title: "Blog - Nitish Gupta",
  description:
    "Read my latest thoughts on web development, technology, and programming.",
};

interface BlogPageProps {
  searchParams: Promise<{ page?: string }>;
}

const POSTS_PER_PAGE = 6;

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const resolvedSearchParams = await searchParams;
  const parsedPage = Number(resolvedSearchParams.page);
  const currentPage =
    Number.isFinite(parsedPage) && parsedPage > 0 ? Math.floor(parsedPage) : 1;

  const initialResult = await getBlogPage({
    page: currentPage,
    pageSize: POSTS_PER_PAGE,
  });

  return <BlogPageContent initialPage={currentPage} initialResult={initialResult} />;
}
