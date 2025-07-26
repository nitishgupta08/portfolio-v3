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
                I am a software engineer with about two years of experience,
                focused on building scalable and efficient applications. I enjoy
                creating solutions that combine strong technical foundations
                with user-friendly designs.
              </p>

              <Separator />

              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Outside of work, I like to explore new places, watch films, and
                cook meals for family and friends.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
