import { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostContent } from "@/components/blog/BlogPostContent";
import { BlogService } from "@/lib/firebase/services/blogService";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await BlogService.getBlogPostBySlug(slug);

  if (!blog) {
    return {
      title: "Blog Post Not Found",
    };
  }

  return {
    title: `${blog.title} - Nitish Gupta`,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      images: blog.coverImage ? [blog.coverImage] : [],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const blog = await BlogService.getBlogPostBySlug(slug);

  if (!blog) {
    notFound();
  }

  return <BlogPostContent slug={slug} initialBlog={blog} />;
}
