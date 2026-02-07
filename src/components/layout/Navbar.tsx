"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "../ui/theme-toggle";

export default function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/80 bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center transition-opacity hover:opacity-85"
        >
          <Image
            src="/logo.svg"
            alt="Nitish Kumar Gupta"
            width={120}
            height={32}
            priority
            className="h-10 w-auto"
          />
        </Link>

        <nav className="flex items-center gap-2">
          {/*<Link
            href="/projects"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "font-medium",
            )}
            aria-label="Projects"
          >
            Projects
          </Link>

          <Link
            href="/blog"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "font-medium",
            )}
            aria-label="Blog"
          >
            Blog
          </Link>*/}

          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
