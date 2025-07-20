"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useExperiences } from "@/hooks/useExperiences";
import { fallbackExperienceData } from "@/lib/data/experienceData";

export default function Experience() {
  const { data: experiences, isLoading, error, isFetching } = useExperiences();

  const displayExperiences = experiences?.filter(exp => exp.isVisible) || fallbackExperienceData;

  return (
    <section className="w-full">
      <div className="container mx-auto px-4 my-8">
        <div className="max-w-6xl mx-auto">
          <Card className="border-0 shadow-none bg-transparent">
            <CardHeader className="pb-8 text-center">
              <Badge variant="outline" className="mb-4 uppercase tracking-wider mx-auto">
                Experience
                {isFetching && !isLoading && (
                  <span className="ml-1 text-xs opacity-60">(updating...)</span>
                )}
              </Badge>
              <CardTitle className="text-3xl md:text-4xl font-bold">
                Professional Journey
              </CardTitle>
            </CardHeader>

            <CardContent className="px-6 pb-12 md:px-12">
              {/* Loading Skeleton */}
              {isLoading && (
                <div className="relative">
                  {/* Mobile Vertical Loading */}
                  <div className="block md:hidden">
                    <div className="space-y-6">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="relative">
                          <Card className="border border-gray-50 dark:border-gray-700 bg-card/50">
                            <CardContent className="space-y-3">
                              <div>
                                <Skeleton className="h-6 w-3/4 mb-2" />
                                <Skeleton className="h-5 w-1/2" />
                              </div>
                              <Skeleton className="h-5 w-24" />
                              <div className="space-y-2">
                                <Skeleton className="h-3 w-full" />
                                <Skeleton className="h-3 w-5/6" />
                              </div>
                              <div className="flex gap-1 pt-2 flex-wrap">
                                <Skeleton className="h-5 w-12" />
                                <Skeleton className="h-5 w-16" />
                                <Skeleton className="h-5 w-10" />
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Desktop Vertical Loading */}
                  <div className="hidden md:block">
                    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>
                    <div className="space-y-8">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="relative pl-20">
                          <div className="absolute left-6.5 top-2 w-3 h-3 bg-primary rounded-full border-2 border-background shadow-md"></div>
                          <Card className="border border-gray-50 dark:border-gray-700 bg-card/50">
                            <CardContent className="p-6 space-y-3">
                              <div>
                                <Skeleton className="h-7 w-3/4 mb-2" />
                                <Skeleton className="h-6 w-1/2" />
                              </div>
                              <Skeleton className="h-6 w-32" />
                              <div className="space-y-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6" />
                                <Skeleton className="h-4 w-4/5" />
                              </div>
                              <div className="flex gap-2 pt-2">
                                <Skeleton className="h-6 w-16" />
                                <Skeleton className="h-6 w-20" />
                                <Skeleton className="h-6 w-14" />
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Error State */}
              {error && !displayExperiences.length && !isLoading && (
                <div className="text-center py-12">
                  <p className="text-destructive">
                    Unable to load experience data. Please try refreshing the page.
                  </p>
                </div>
              )}

              {/* Experience Timeline */}
              {!isLoading && displayExperiences.length > 0 && (
                <div className="relative">
                  {/* Mobile Vertical Timeline */}
                  <div className="block md:hidden">
                    <div className="space-y-6">
                      {displayExperiences.map((item, index) => (
                        <div key={item.id} className="relative">
                          <Card className="border border-gray-50 dark:border-gray-700 bg-card/50 hover:bg-card/80 transition-colors">
                            <CardContent className="space-y-3">
                              <div>
                                <div>
                                  <h3 className="text-lg font-bold leading-tight">
                                    {item.designation}
                                  </h3>
                                  <h4 className="text-base font-semibold text-primary mt-1">
                                    {item.company}
                                  </h4>
                                </div>

                                <div className="flex flex-col gap-1">
                                  <Badge variant="secondary" className="text-xs uppercase tracking-wide w-fit">
                                    {item.from} - {item.to}
                                  </Badge>
                                  {item.to === "Present" && (
                                    <Badge className="text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 w-fit">
                                      Current
                                    </Badge>
                                  )}
                                </div>

                                <p className="text-sm text-muted-foreground leading-relaxed">
                                  {item.description}
                                </p>

                                <div className="flex flex-wrap gap-1 pt-2">
                                  {item.tags.map((tag, tagIndex) => (
                                    <Badge 
                                      key={tagIndex} 
                                      variant="outline"
                                      className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors"
                                    >
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Desktop Vertical Timeline */}
                  <div className="hidden md:block">
                    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>
                    <div className="space-y-8">
                      {displayExperiences.map((item) => (
                        <div key={item.id} className="relative pl-20">
                          <div className="absolute left-6.5 top-2 w-3 h-3 bg-primary rounded-full border-2 border-background shadow-md"></div>
                          <Card className="border border-gray-50 dark:border-gray-700 bg-card/50 hover:bg-card/80 transition-colors">
                            <CardContent className="p-6">
                              <div className="space-y-3">
                                <div>
                                  <h3 className="text-xl md:text-2xl font-bold">
                                    {item.designation}
                                  </h3>
                                  <h4 className="text-lg md:text-xl font-semibold text-primary mt-1">
                                    {item.company}
                                  </h4>
                                </div>

                                <div className="flex items-center gap-2">
                                  <Badge variant="secondary" className="text-xs uppercase tracking-wide">
                                    {item.from} - {item.to}
                                  </Badge>
                                  {item.to === "Present" && (
                                    <Badge className="text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                      Current
                                    </Badge>
                                  )}
                                </div>

                                <p className="text-muted-foreground leading-relaxed">
                                  {item.description}
                                </p>

                                <div className="flex flex-wrap gap-2 pt-2">
                                  {item.tags.map((tag, tagIndex) => (
                                    <Badge 
                                      key={tagIndex} 
                                      variant="outline"
                                      className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors"
                                    >
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
