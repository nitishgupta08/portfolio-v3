"use client";

import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import { getClientMarkdownRenderOptions } from "@/lib/markdown/renderMarkdown";
import { blogMarkdownComponents } from "@/components/blog/markdown/components";

interface AppMarkdownProps {
  content: string;
  className?: string;
}

export default function AppMarkdown({ content, className }: AppMarkdownProps) {
  const { remarkPlugins, rehypePlugins } = getClientMarkdownRenderOptions();

  return (
    <article className={cn("blog-md", className)}>
      <ReactMarkdown
        skipHtml
        remarkPlugins={remarkPlugins}
        rehypePlugins={rehypePlugins}
        components={blogMarkdownComponents}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
