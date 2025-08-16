import Image from "next/image";
import type { Project } from "@/types/Project";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ga_tracker } from "@/lib/analytics";
import MarkdownRenderer from "@/components/markdown/MarkdownRenderer";
export default function ProjectCard({ project }: { project: Project }) {
  const handleLiveDemoClick = () => {
    if (project.liveLink) {
      ga_tracker.trackExternalLink(project.liveLink, "live_demo");
    }
  };

  const handleGithubClick = () => {
    ga_tracker.trackExternalLink(project.githubLink, "github");
  };

  return (
    <Card className="pt-0 h-full border border-gray-200 dark:border-gray-700 bg-card hover:shadow-lg transition-all">
      <div className="relative">
        {project.imgSrc && (
          <div className="relative aspect-[16/9] overflow-hidden rounded-t-lg bg-gray-100 dark:bg-gray-800">
            <Image
              src={project.imgSrc}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
        )}

        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
            </div>

            <MarkdownRenderer
              content={project.description}
              className="text-muted-foreground text-sm leading-relaxed line-clamp-3"
            />

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag: string, index: number) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                size="sm"
                asChild
                className="flex-1 hover:bg-primary dark:hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.title} source code`}
                  onClick={handleGithubClick}
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
                    onClick={handleLiveDemoClick}
                  >
                    <FaExternalLinkAlt className="mr-2 h-4 w-4" />
                    Live Demo
                  </a>
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
