"use client";

import React, { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// import a highlight.js theme globally in your app (or here):
// import "highlight.js/styles/github-dark.css"

/** Strip common indentation from template literals so `- item` works */
function stripCommonIndent(input: string) {
  if (!input) return input;
  const src = input.replace(/^\n/, "");
  const lines = src.split("\n");
  let min = Infinity;
  for (const l of lines) {
    if (!l.trim()) continue;
    const m = l.match(/^(\s+)/);
    const n = m ? m[1].length : 0;
    if (n < min) min = n;
    if (min === 0) break;
  }
  if (!isFinite(min) || min === 0) return src;
  return lines
    .map((l) => (l.startsWith(" ".repeat(min)) ? l.slice(min) : l))
    .join("\n");
}

// Extend sanitize schema to allow code classes + safe attrs
const sanitizeSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    code: [...(defaultSchema.attributes?.code || []), ["className"]],
    pre: [...(defaultSchema.attributes?.pre || []), ["className"]],
    span: [...(defaultSchema.attributes?.span || []), ["className"]],
    a: [...(defaultSchema.attributes?.a || []), ["target", "rel"]],
    img: [
      ...(defaultSchema.attributes?.img || []),
      ["alt"],
      ["title"],
      ["className"],
      ["width"],
      ["height"],
      ["loading"],
      ["decoding"],
    ],
  },
  protocols: {
    ...defaultSchema.protocols,
    href: ["http", "https", "mailto", "tel"],
    src: ["http", "https"], // remove "data" for safety
  },
};

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({
  content,
  className,
}: MarkdownRendererProps) {
  const safeContent = useMemo(() => stripCommonIndent(content), [content]);

  return (
    <div
      className={cn(
        "prose prose-neutral dark:prose-invert max-w-none",
        className
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        rehypePlugins={[
          rehypeRaw,
          rehypeHighlight,
          [rehypeSanitize, sanitizeSchema],
        ]}
        components={{
          ul: (props) => (
            <ul className="list-disc pl-6 my-4 space-y-1" {...props} />
          ),
          ol: (props) => (
            <ol className="list-decimal pl-6 my-4 space-y-1" {...props} />
          ),
          li: (props) => <li className="whitespace-pre-wrap" {...props} />,
          p: (props) => (
            <p className="whitespace-pre-wrap break-words my-3" {...props} />
          ),
          a: (props) => (
            <a
              {...props}
              className="text-blue-600 dark:text-blue-400 underline hover:opacity-80"
              target="_blank"
              rel="noopener noreferrer"
            />
          ),
          img: (props) => (
            <img
              {...props}
              className="rounded-xl shadow my-4 mx-auto"
              alt={props.alt ?? ""}
              loading="lazy"
              decoding="async"
            />
          ),
          code: ({ className, children, ...props }) => {
            const isBlock = /language-/.test(className || "");
            if (isBlock) {
              return (
                <Card className="p-0 my-4 overflow-hidden">
                  <pre className="overflow-x-auto text-sm p-4">
                    <code className={className} {...props}>
                      {children}
                    </code>
                  </pre>
                </Card>
              );
            }
            return (
              <code
                className="px-1 py-0.5 rounded bg-muted text-sm whitespace-pre"
                {...props}
              >
                {children}
              </code>
            );
          },
        }}
      >
        {safeContent}
      </ReactMarkdown>
    </div>
  );
}
