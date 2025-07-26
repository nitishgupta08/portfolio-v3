"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { FaExternalLinkAlt, FaGithub, FaArrowLeft } from "react-icons/fa";
import { AlertCircle } from "lucide-react";
import { useProjects } from "@/hooks/useProjects";
import type { Project } from "@/types/Project";
import { useEffect } from "react";
import { ga_tracker } from "@/lib/analytics";

export default function ProjectsPage() {
  const { data: projects, isLoading, error, isFetching } = useProjects();

  // Track errors when they occur
  useEffect(() => {
    if (error) {
      ga_tracker.trackError(error, "Failed to fetch projects data");
    }
  }, [error]);

  const allProjects = projects || [];
  const featuredProjects = allProjects.filter(
    (project) => project.isFeatured && project.isVisible
  );
  const otherProjects = allProjects.filter(
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
                {isFetching && !isLoading && (
                  <span className="ml-1 text-xs opacity-60">(updating...)</span>
                )}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Complete Project Collection
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                A comprehensive showcase of all the projects I&rsquo;ve built,
                from featured works to experimental implementations
              </p>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="space-y-16">
              {/* Featured Projects Loading */}
              <div>
                <Skeleton className="h-8 w-48 mb-8" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <ProjectCardSkeleton key={i} />
                  ))}
                </div>
              </div>

              {/* All Projects Loading */}
              <div>
                <Skeleton className="h-8 w-40 mb-8" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <ProjectCardSkeleton key={i} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && !isLoading && (
            <div className="flex flex-col items-center justify-center py-16 px-6">
              <div className="relative mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/30 rounded-full flex items-center justify-center border border-red-200 dark:border-red-800/50">
                  <AlertCircle className="w-12 h-12 text-red-500 dark:text-red-400" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full animate-pulse"></div>
              </div>

              <div className="text-center space-y-4 max-w-md">
                <h3 className="text-xl md:text-2xl font-bold text-foreground">
                  Oops! Something went wrong
                </h3>

                <p className="text-muted-foreground leading-relaxed">
                  Unable to load my projects right now. This has been
                  automatically reported and I&rsquo;ll look into it.
                </p>

                <div className="mt-8 text-center">
                  <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm font-medium"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Projects Content */}
          {!isLoading && !error && (
            <>
              {featuredProjects.length > 0 && (
                <div className="mb-16">
                  <h2 className="text-2xl font-bold mb-8">Featured Projects</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredProjects.map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                </div>
              )}

              {otherProjects.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-8">All Projects</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {otherProjects.map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                </div>
              )}

              {/* No Projects State */}
              {allProjects.length === 0 && (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    No projects to show
                  </h3>
                  <p className="text-muted-foreground">
                    There are currently no projects to display.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// Loading skeleton component
function ProjectCardSkeleton() {
  return (
    <Card className="h-full border border-gray-200 dark:border-gray-700 bg-card">
      <div className="relative">
        <Skeleton className="h-48 w-full rounded-t-lg" />
        <CardContent className="p-6 space-y-4">
          <div>
            <div className="flex items-start justify-between mb-2">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-5 w-16" />
            </div>
            <Skeleton className="h-5 w-24" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/5" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-18" />
          </div>
          <div className="flex gap-3 pt-4">
            <Skeleton className="h-9 flex-1" />
            <Skeleton className="h-9 flex-1" />
          </div>
        </CardContent>
      </div>
    </Card>
  );
}

function ProjectCard({ project }: { project: Project }) {
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
