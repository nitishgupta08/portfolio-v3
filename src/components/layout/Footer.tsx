"use client";

import Link from "next/link";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { ga_tracker } from "@/lib/analytics";
import { SITE_CONFIG, getGitHubReleaseUrl } from "@/lib/config";

export default function Footer() {
  const releaseUrl = getGitHubReleaseUrl(SITE_CONFIG.version || "latest");

  return (
    <footer className="py-8">
      <div className="container mx-auto px-4">
        <div className="rounded-[calc(var(--radius)+4px)] border border-border/80 bg-card px-6 py-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <Socials />

            <div className="text-sm text-muted-foreground">
              <p>built with next.js & shadcn </p>
              <div className="mt-2 flex flex-wrap gap-4">
                <a
                  href={releaseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-foreground"
                  aria-label={`Open release ${SITE_CONFIG.version || "latest"}`}
                >
                  v{SITE_CONFIG.version}
                </a>

                {SITE_CONFIG.previousVersions.map((version) => (
                  <a
                    key={version.version}
                    href={version.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-foreground"
                    aria-label={`Open ${version.label} version`}
                  >
                    {version.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Socials() {
  const socialLinks = [
    { name: "GitHub", url: "https://github.com/nitishgupta08", icon: FaGithub },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/nitishgupta24/",
      icon: FaLinkedin,
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/_nitishgupta/",
      icon: FaInstagram,
    },
    {
      name: "X (Twitter)",
      url: "https://x.com/_nitishgupta",
      icon: FaXTwitter,
    },
  ];

  return (
    <div className="flex items-center gap-4">
      {socialLinks.map((social) => {
        const IconComponent = social.icon;
        return (
          <Link
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.name}
            title={social.name}
            onClick={() => ga_tracker.trackExternalLink(social.url, "social")}
            className="rounded-[calc(var(--radius)-2px)] border border-border/70 p-2.5 text-muted-foreground transition-colors hover:text-foreground"
          >
            <IconComponent className="h-4 w-4" />
          </Link>
        );
      })}
    </div>
  );
}
