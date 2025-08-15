"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function AboutMe() {
  return (
    <section className="w-full">
      <div className="container mx-auto px-4 my-8">
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-none bg-transparent">
            <CardHeader className="pb-6 text-center">
              <Badge
                variant="outline"
                className="mb-4 uppercase tracking-wider mx-auto"
              >
                About Me
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Get to know me better
              </h2>
            </CardHeader>

            <CardContent className="px-8 pb-12 md:px-12 space-y-8">
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                I am a software engineer with two years of experience
                specializing in backend development, primarily using C/C++ and
                Django. I focus on building scalable, high-performance systems
                with robust technical foundations. While my professional
                expertise lies in backend technologies, I have also explored
                frontend development through personal side projects, enabling me
                to approach solutions with a holistic understanding of the
                software stack.
              </p>

              <Separator />

              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                When I&rsquo;m not with my laptop, I enjoy exploring new places,
                enjoying great stories in theatres or in video games,
                experimenting in the kitchen, and staying active with sports &
                gym.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
