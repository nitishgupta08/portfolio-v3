"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { ga_tracker } from "@/lib/analytics";
import { SITE_CONFIG, getGitHubReleaseUrl } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-8 lg:px-8">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <Socials />

            <div className="flex flex-col items-center md:items-end gap-3">
              <div className="flex flex-wrap items-center justify-center md:justify-end gap-2">
                <Badge
                  variant="default"
                  className="cursor-pointer hover:bg-primary/90 transition-colors"
                  onClick={() => {
                    const releaseUrl = getGitHubReleaseUrl(
                      SITE_CONFIG.version || "latest"
                    );
                    window.open(releaseUrl, "_blank", "noopener,noreferrer");
                  }}
                >
                  v{SITE_CONFIG.version}
                </Badge>

                {SITE_CONFIG.previousVersions.map((version) => (
                  <Badge
                    key={version.version}
                    variant="outline"
                    className="cursor-pointer hover:bg-muted transition-colors"
                    onClick={() => {
                      window.open(version.url, "_blank", "noopener,noreferrer");
                    }}
                  >
                    {version.label}
                  </Badge>
                ))}
              </div>

              <p className="text-xs text-muted-foreground text-center md:text-right">
                Built with Next.js • Tailwind CSS • shadcn/ui • Firebase •
                Perplexity AI
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Socials() {
  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/nitishgupta08",
      icon: FaGithub,
      hoverColor: "hover:text-gray-900 dark:hover:text-gray-100",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/nitishgupta24/",
      icon: FaLinkedin,
      hoverColor: "hover:text-blue-600 dark:hover:text-blue-400",
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/_nitishgupta/",
      icon: FaInstagram,
      hoverColor: "hover:text-pink-600 dark:hover:text-pink-400",
    },
    {
      name: "X (Twitter)",
      url: "https://x.com/_nitishgupta",
      icon: FaXTwitter,
      hoverColor: "hover:text-blue-500 dark:hover:text-blue-300",
    },
  ];

  const handleSocialClick = (url: string, platform: string) => {
    ga_tracker.trackExternalLink(url, "social");
  };

  return (
    <div className="flex justify-center md:justify-start gap-2">
      {socialLinks.map((social) => {
        const IconComponent = social.icon;
        return (
          <Button
            key={social.name}
            variant="ghost"
            size="icon"
            asChild
            className={`transition-colors ${social.hoverColor}`}
          >
            <a
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              title={social.name}
              onClick={() => handleSocialClick(social.url, social.name)}
            >
              <IconComponent className="h-5 w-5" />
            </a>
          </Button>
        );
      })}
    </div>
  );
}
