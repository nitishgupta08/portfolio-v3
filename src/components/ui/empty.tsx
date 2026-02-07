import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface EmptyProps {
  title: string;
  description?: string;
  className?: string;
  action?: ReactNode;
}

export function Empty({ title, description, className, action }: EmptyProps) {
  return (
    <div
      className={cn(
        "rounded-[calc(var(--radius)+2px)] border border-dashed border-border/80 bg-card/60 p-8 text-center",
        className,
      )}
    >
      <h3 className="text-lg font-semibold">{title}</h3>
      {description ? (
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      ) : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
