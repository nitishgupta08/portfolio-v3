import { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostContent } from "@/components/blog/BlogPostContent";
import { fallbackBlogData } from "@/lib/data/blogData";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  // Always use fallback data for static generation to ensure routes exist
  console.log('Generating static params for blog posts...');
  
  const publishedPosts = fallbackBlogData.filter(blog => blog.isPublished);
  const params = publishedPosts.map((blog) => ({
    slug: blog.slug,
  }));
  
  console.log('Generated params:', params);
  return params;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  
  // Always look in fallback data first
  const blog = fallbackBlogData.find(blog => blog.slug === slug && blog.isPublished);
  
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
  
  console.log('Loading blog post with slug:', slug);
  
  // Always check fallback data first
  const blog = fallbackBlogData.find(blog => blog.slug === slug && blog.isPublished);
  
  if (!blog) {
    console.log('Blog post not found in fallback data:', slug);
    notFound();
  }

  console.log('Found blog post:', blog.title);
  return <BlogPostContent slug={slug} initialBlog={blog} />;
}
