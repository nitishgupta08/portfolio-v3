"use client";

// import Link from "next/link";
// import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-16 [mask-image:radial-gradient(ellipse_at_center,black,transparent)]" />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="flex flex-col items-center text-center space-y-8">
          <Badge variant="outline">✨ Welcome to my digital space</Badge>

          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
              Hey there! <span className="inline-block">👋</span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-3xl leading-relaxed">
              I&rsquo;m{" "}
              <span className="text-primary font-semibold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Nitish Kumar Gupta
              </span>
              , a software engineer who loves creating beautiful code to power
              beautiful designs <span className="inline-block">🧑‍💻</span>
            </p>
          </div>

          {/* Add them when they are ready */}

          {/* <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="min-w-[140px]"
            >
              <Link href="/blog">Read Blog</Link>
            </Button>

            <Button asChild size="lg" className="min-w-[140px]">
              <Link href="/gallery">View Gallery</Link>
            </Button>
          </div> */}
        </div>
      </div>
    </section>
  );
}
