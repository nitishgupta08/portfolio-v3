"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { FaRss, FaCamera } from "react-icons/fa";

export default function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 border-b bg-background/90 backdrop-blur">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">

        <Link
          href="/"
          className="flex items-center hover:opacity-80 transition-opacity"
        >
          <Image
            src="/logo.svg"
            alt="nkg logo"
            width={120}
            height={32}
            priority
            className="h-12 w-auto"
          />
        </Link>

        <nav className="flex items-center gap-2">
          <Link
            href="/blog"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "hover:text-primary transition-colors"
            )}
            aria-label="Blog"
          >
            <FaRss className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Blog</span>
          </Link>

          <Link
            href="/gallery"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "hover:text-primary transition-colors"
            )}
            aria-label="Gallery"
          >
            <FaCamera className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Gallery</span>
          </Link>

          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
