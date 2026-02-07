import { ArrowUpRight } from "lucide-react";

export default function Contact() {
  return (
    <section className="section-shell py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          <p className="editorial-kicker">Contact</p>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">
            Open to meaningful collaborations, ideas, and conversations.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Whether it&apos;s a product challenge, a creative project, or simply a
            thoughtful exchange, I&apos;d be glad to connect.
          </p>

          <a
            href="mailto:nitishkg.88@gmail.com"
            aria-label="Send email"
            className="mt-10 inline-flex items-center gap-2 rounded-[calc(var(--radius)-2px)] border border-primary/60 px-4 py-2 text-base font-medium text-primary transition-colors hover:bg-primary/10"
          >
            nitishkg.88@gmail.com
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
