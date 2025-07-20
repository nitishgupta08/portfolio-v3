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
                I am a hardworking college student, driven by a deep sense of
                motivation and armed with an impressive array of powerful
                skills. I bring to the table a commitment to utilize my
                abilities in order to contribute to and advance the mission of
                any organization I am a part of. My goal is to develop
                applications that are, behind the scenes, both scalable and
                efficient, while at the same time offering users experiences
                that are pixel-perfect and engaging.
              </p>

              <Separator />

              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                When I'm not working, I like to explore new places, relax by
                watching films, and whip up delicious meals for my loved ones.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
