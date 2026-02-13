"use client";

import Image from "next/image";
import type { Project } from "@/types/Project";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import AppMarkdown from "@/components/markdown/AppMarkdown";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="h-full rounded-[calc(var(--radius)+2px)] border border-border/80 bg-card">
      {project.imgSrc && (
        <div className="relative aspect-[16/9] overflow-hidden rounded-t-[calc(var(--radius)+2px)] border-b border-border/70 bg-muted">
          <Image
            src={project.imgSrc}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
      )}

      <div className="p-6">
        <h3 className="text-xl font-semibold leading-tight">{project.title}</h3>

        <AppMarkdown
          content={project.description}
          className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground"
        />

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag: string, index: number) => (
            <span
              key={index}
              className="rounded-[calc(var(--radius)-2px)] border border-border/80 px-2.5 py-1 text-xs"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-6 flex gap-3">
          <Button variant="outline" size="sm" asChild className="flex-1">
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} source code`}
            >
              <FaGithub className="mr-2 h-4 w-4" />
              Code
            </a>
          </Button>

          {project.liveLink && (
            <Button size="sm" asChild className="flex-1">
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} live demo`}
              >
                <FaExternalLinkAlt className="mr-2 h-4 w-4" />
                Live
              </a>
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
