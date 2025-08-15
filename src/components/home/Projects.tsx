"use client";

import { useEffect } from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { AlertCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";

import ProjectCard from "@/components/home/ProjectCard";
import ProjectCardSkeleton from "@/components/home/ProjectCardSkeleton";
import { useProjects } from "@/hooks/useProjects";
import { ga_tracker } from "@/lib/analytics";

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
                Things I&rsquo;ve Built
              </CardTitle>
            </CardHeader>

            <CardContent className="px-0">
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
                          <ProjectCardSkeleton />
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
                          className="basis-[90%] sm:basis-1/2"
                        >
                          <ProjectCard project={project} />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="hidden sm:flex" />
                    <CarouselNext className="hidden sm:flex" />
                  </Carousel>

                  <div className="mt-12 text-center">
                    <Button
                      variant="outline"
                      size="lg"
                      className="group hover:bg-primary dark:hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
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
