import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FaHome, FaArrowLeft, FaSearch } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background Grid Effect (matching your hero section) */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-16 [mask-image:radial-gradient(ellipse_at_center,black,transparent)]" />
      
      <div className="relative z-10 w-full max-w-2xl mx-auto px-6 text-center">
        <div className="space-y-8">
          {/* Error Badge */}
          <Badge variant="outline" className="mx-auto">
            ❌ Page Not Found
          </Badge>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight text-primary/20">
              404
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold">
              Oops! This page got lost in cyberspace
            </h2>
            
            {/* Description */}
            <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
              The page you're looking for doesn't exist or has been moved to a new location.
            </p>
          </div>

          <Separator className="max-w-xs mx-auto" />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="min-w-[140px]">
              <Link href="/">
                <FaHome className="mr-2 h-4 w-4" />
                Go Home
              </Link>
            </Button>

            <Button asChild variant="outline" size="lg" className="min-w-[140px]">
              <Link href="/blog">
                <FaSearch className="mr-2 h-4 w-4" />
                Browse Blog
              </Link>
            </Button>
          </div>

          {/* Quick Links */}
          <div className="pt-8">
            <p className="text-sm text-muted-foreground mb-4">
              Maybe you were looking for:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/projects">Projects</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/blog">Blog</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/gallery">Gallery</Link>
              </Button>
            </div>
          </div>

          {/* Fun Element */}
          <div className="text-4xl opacity-50">
            🧑‍💻
          </div>
        </div>
      </div>
    </div>
  );
}
