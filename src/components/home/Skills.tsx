"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

// Skills data
const skillsData = {
  languages: [
    "C",
    "C++",
    "Python",
    "Javascript",
    "HTML",
    "CSS",
    "SQL",
    "Bash",
    "TypeScript",
    "Java",
  ],
  tech: [
    "Django",
    "DRF",
    "ReactJS",
    "NodeJS",
    "Redis",
    "Socket.io",
    "Express",
    "MUI",
    "TailwindCSS",
    "React Router",
    "Redux",
  ],
  tools: ["Git & Github", "Postman", "MongoDB", "Vite", "Apache"],
  dsa: [
    { name: "Leetcode", link: "https://leetcode.com/nitishgupta24/" },
    { name: "Codeforces", link: "https://codeforces.com/profile/ghost8_" },
  ],
};

export default function Skills() {
  return (
    <section className="w-full">
      <div className="container mx-auto px-4 my-8">
        <div className="max-w-6xl mx-auto">
          <Card className="border-0 shadow-none bg-transparent">
            <CardHeader className="pb-8 text-center">
              <Badge
                variant="outline"
                className="mb-4 uppercase tracking-wider mx-auto"
              >
                Skills
              </Badge>
              <CardTitle className="text-3xl md:text-4xl font-bold">
                My Technical Arsenal
              </CardTitle>
            </CardHeader>

            <CardContent className="px-6 pb-12 md:px-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold uppercase tracking-wide">
                    Languages
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skillsData.languages.map((language, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        {language}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold uppercase tracking-wide">
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skillsData.tech.map((technology, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        {technology}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold uppercase tracking-wide">
                    Tools
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skillsData.tools.map((tool, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold uppercase tracking-wide">
                    Coding Platforms
                  </h3>
                  <div className="space-y-3">
                    {skillsData.dsa.map((platform, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        asChild
                        className="w-full justify-between hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
                      >
                        <a
                          href={platform.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Visit ${platform.name} profile`}
                        >
                          <span>{platform.name}</span>
                          <ExternalLink className="h-4 w-4 ml-2" />
                        </a>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
