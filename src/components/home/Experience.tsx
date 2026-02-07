import AppMarkdown from "@/components/markdown/AppMarkdown";
import { Empty } from "@/components/ui/empty";
import { Item, ItemContent, ItemDescription, ItemHeader, ItemTitle } from "@/components/ui/item";
import type { Experience } from "@/types/Experience";

interface ExperienceProps {
  experiences: Experience[];
}

export default function Experience({ experiences }: ExperienceProps) {
  const visibleExperiences = experiences.filter((exp) => exp.isVisible);

  return (
    <section className="section-shell py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <p className="editorial-kicker">Experience</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
            Professional Journey
          </h2>

          {visibleExperiences.length === 0 ? (
            <Empty
              className="mt-10"
              title="No experiences are published yet"
              description="This section will be updated soon with recent work." 
            />
          ) : (
            <div className="mt-10 space-y-4">
              {visibleExperiences.map((item) => (
                <Item key={item.id}>
                  <ItemHeader>
                    <div>
                      <ItemTitle>{item.designation}</ItemTitle>
                      <ItemDescription className="mt-1">{item.company}</ItemDescription>
                    </div>
                    <ItemDescription className="text-sm font-medium">
                      {item.from} - {item.to}
                    </ItemDescription>
                  </ItemHeader>

                  <ItemContent>
                    <AppMarkdown
                      content={item.description}
                      className="text-muted-foreground"
                    />

                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.tags.map((tag, index) => (
                        <span
                          key={`${item.id}-${tag}-${index}`}
                          className="rounded-[calc(var(--radius)-2px)] border border-border/80 px-2.5 py-1 text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </ItemContent>
                </Item>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
