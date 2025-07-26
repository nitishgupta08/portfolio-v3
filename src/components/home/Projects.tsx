"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { FaExternalLinkAlt, FaGithub, FaArrowRight } from "react-icons/fa";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useProjects } from "@/hooks/useProjects";
import type { Project } from "@/types/Project";
import { ga_tracker } from "@/lib/analytics";
import { useEffect } from "react";

export default function Projects() {
  const {
    data: featuredProjects,
    isLoading,
    error,
    isFetching,
  } = useProjects();

  // Track errors when they occur
  useEffect(() => {
    if (error) {
      ga_tracker.trackError(error, "Error while fetching projects data!");
    }
  }, [error]);

  const displayProjects =
    featuredProjects?.filter((project) => project.isFeatured) || [];

  return (
    <section className="w-full">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <Card className="border-0 shadow-none bg-transparent">
            <CardHeader className="pb-8 text-center">
              <Badge
                variant="outline"
                className="mb-4 uppercase tracking-wider mx-auto"
              >
                Featured Projects
                {isFetching && !isLoading && (
                  <span className="ml-1 text-xs opacity-60">(updating...)</span>
                )}
              </Badge>
              <CardTitle className="text-3xl md:text-4xl font-bold">
                Things I've Built
              </CardTitle>
            </CardHeader>

            <CardContent className="px-6 pb-12 md:px-12">
              {/* Loading Skeleton */}
              {isLoading && (
                <div className="space-y-8">
                  <Carousel className="w-full">
                    <CarouselContent>
                      {[1, 2, 3].map((i) => (
                        <CarouselItem
                          key={i}
                          className="md:basis-1/2 lg:basis-1/2"
                        >
                          <div className="p-2">
                            <Card className="h-full border border-gray-200 dark:border-gray-700 bg-card">
                              <div className="relative">
                                <Skeleton className="h-48 w-full rounded-t-lg" />
                                <CardContent className="p-6 space-y-4">
                                  <div>
                                    <Skeleton className="h-6 w-3/4 mb-2" />
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
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                  <div className="text-center">
                    <Skeleton className="h-12 w-40 mx-auto" />
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
                      automatically reported and I'll look into it.
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

              {/* Projects Carousel */}
              {!isLoading && !error && displayProjects.length > 0 && (
                <>
                  <Carousel
                    opts={{
                      align: "start",
                      loop: true,
                    }}
                    className="w-full"
                  >
                    <CarouselContent>
                      {displayProjects.map((project) => (
                        <CarouselItem
                          key={project.id}
                          className="md:basis-1/2 lg:basis-1/2"
                        >
                          <div className="p-2">
                            <ProjectCard project={project} />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>

                  <div className="mt-12 text-center">
                    <Button
                      variant="outline"
                      size="lg"
                      className="group hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
                      asChild
                    >
                      <Link href="/projects">
                        <span>View All Projects</span>
                        <FaArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </>
              )}

              {/* No Data State (when successfully loaded but no projects) */}
              {!isLoading && !error && displayProjects.length === 0 && (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    No projects to show
                  </h3>
                  <p className="text-muted-foreground">
                    There are currently no featured projects to display.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

// ProjectCard component remains the same...
function ProjectCard({ project }: { project: Project }) {
  const handleLiveDemoClick = () => {
    if (project.liveLink) {
      ga_tracker.trackExternalLink(project.liveLink, "live_demo");
    }
  };

  const handleGithubClick = () => {
    ga_tracker.trackExternalLink(project.githubLink, "github");
  };

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
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <Badge variant="secondary" className="text-xs">
                {project.date}
              </Badge>
            </div>

            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
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
