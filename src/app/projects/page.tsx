import Link from "next/link";
import { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Empty } from "@/components/ui/empty";
import { getProjects } from "@/lib/server/portfolioData";
import ProjectCard from "@/components/home/ProjectCard";

export const metadata: Metadata = {
  title: "Projects - Nitish Gupta",
  description: "A full collection of featured and production projects.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  const featuredProjects = projects.filter((project) => project.isFeatured);
  const otherProjects = projects.filter((project) => !project.isFeatured);

  return (
    <div className="min-h-screen pb-14 pt-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <Button variant="ghost" size="sm" asChild className="mb-8">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>

          <header className="py-6">
            <p className="editorial-kicker">Projects</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
              Complete Project Collection
            </h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Featured launches and supporting implementations in one place.
            </p>
          </header>

          {featuredProjects.length > 0 && (
            <section className="py-10">
              <h2 className="text-2xl font-semibold">Featured</h2>
              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {featuredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </section>
          )}

          {otherProjects.length > 0 && (
            <section className="py-10">
              <h2 className="text-2xl font-semibold">All Projects</h2>
              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {otherProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </section>
          )}

          {projects.length === 0 && (
            <Empty
              className="mt-12"
              title="No projects are available"
              description="This page will be updated as new work is published."
            />
          )}
        </div>
      </div>
    </div>
  );
}
