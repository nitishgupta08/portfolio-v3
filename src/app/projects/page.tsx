import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FaExternalLinkAlt, FaGithub, FaArrowLeft } from "react-icons/fa";
import { allProjectsData } from "@/lib/data/projectData";

export const metadata: Metadata = {
  title: "All Projects - Nitish Gupta",
  description:
    "A comprehensive collection of all the projects I've built over the years",
};

export default function ProjectsPage() {
  const featuredProjects = allProjectsData.filter(
    (project) => project.isFeatured && project.isVisible
  );
  const otherProjects = allProjectsData.filter(
    (project) => !project.isFeatured && project.isVisible
  );

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="mb-6 hover:bg-primary/10"
            >
              <Link href="/">
                <FaArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>

            <div className="text-center">
              <Badge
                variant="outline"
                className="mb-4 uppercase tracking-wider"
              >
                All Projects
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Complete Project Collection
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                A comprehensive showcase of all the projects I've built, from
                featured works to experimental implementations
              </p>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8">Featured Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-8">All Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: any }) {
  return (
    <Card className="h-full border border-gray-200 dark:border-gray-700 bg-card hover:shadow-lg transition-all">
      <div className="relative">
        {project.imgSrc && (
          <div className="relative h-48 overflow-hidden rounded-t-lg bg-gray-100 dark:bg-gray-800">
            <Image
              src={project.imgSrc}
              alt={project.title}
              fill
              className="object-cover transition-transform hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}

        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-xl font-bold">{project.title}</h3>
                {project.isFeatured && (
                  <Badge className="ml-2 bg-primary/10 text-primary text-xs">
                    Featured
                  </Badge>
                )}
              </div>
              <Badge variant="secondary" className="text-xs">
                {project.date}
              </Badge>
            </div>

            <p className="text-muted-foreground text-sm leading-relaxed">
              {project.description}
            </p>

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
                className="flex-1 hover:bg-primary hover:text-primary-foreground transition-colors"
              >
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
