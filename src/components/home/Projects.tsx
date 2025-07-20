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
import Link from "next/link";
import Image from "next/image";
import { useFeaturedProjects } from "@/hooks/useProjects";
import type { Project } from "@/types/Project";
import { allProjectsData } from "@/lib/data/projectData";
import { portfolioTracking } from '@/lib/analytics';

export default function Projects() {
  const { data: featuredProjects, isLoading, error, isFetching } = useFeaturedProjects();

  const displayProjects = featuredProjects || allProjectsData.filter(p => p.isFeatured && p.isVisible);

  return (
    <section className="w-full">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <Card className="border-0 shadow-none bg-transparent">
            <CardHeader className="pb-8 text-center">
              <Badge variant="outline" className="mb-4 uppercase tracking-wider mx-auto">
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
                        <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/2">
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
              {error && !displayProjects.length && !isLoading && (
                <div className="text-center py-12">
                  <p className="text-destructive">Error loading projects. Please try again later.</p>
                </div>
              )}

              {/* Projects Carousel */}
              {!isLoading && displayProjects.length > 0 && (
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
                        <CarouselItem key={project.id} className="md:basis-1/2 lg:basis-1/2">
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
      portfolioTracking.trackExternalLink(project.liveLink, 'live_demo');
    }
  };

  const handleGithubClick = () => {
    portfolioTracking.trackExternalLink(project.githubLink, 'github');
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
              <h3 className="text-xl font-bold mb-2">
                {project.title}
              </h3>
              <Badge variant="secondary" className="text-xs">
                {project.date}
              </Badge>
            </div>

            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag: string, index: number) => (
                <Badge 
                  key={index} 
                  variant="outline"
                  className="text-xs"
                >
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
                <Button
                  size="sm"
                  asChild
                  className="flex-1"
                >
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
