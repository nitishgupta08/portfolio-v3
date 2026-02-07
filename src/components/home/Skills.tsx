import { ExternalLink } from "lucide-react";

const skillsData = {
  technical: [
    "C",
    "C++",
    "Python",
    "JavaScript",
    "TypeScript",
    "Django",
    "DRF",
    "React",
    "Node.js",
    "MongoDB",
    "Redis",
    "Docker",
    "Linux",
    "WebSockets",
    "REST APIs",
  ],
  platforms: [
    { name: "GitHub", link: "https://github.com/nitishgupta08" },
    { name: "LeetCode", link: "https://leetcode.com/nitishgupta24/" },
  ],
};

export default function Skills() {
  return (
    <section className="section-shell py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <p className="editorial-kicker">Skills</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
            Toolkit and Interests
          </h2>

          <div className="mt-10 grid gap-10 md:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Technical
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {skillsData.technical.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-[calc(var(--radius)-2px)] border border-border/80 px-3 py-1.5 text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Profiles
              </h3>
              <div className="mt-4 space-y-3">
                {skillsData.platforms.map((platform) => (
                  <a
                    key={platform.name}
                    href={platform.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${platform.name}`}
                    className="flex items-center justify-between rounded-[calc(var(--radius)-2px)] border border-border/70 px-4 py-3 text-base transition-colors hover:bg-accent"
                  >
                    <span>{platform.name}</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
