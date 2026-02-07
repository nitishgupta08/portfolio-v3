import * as React from "react";

import { cn } from "@/lib/utils";

function Item({ className, ...props }: React.ComponentProps<"article">) {
  return (
    <article
      data-slot="item"
      className={cn(
        "rounded-[calc(var(--radius)+2px)] border border-border/80 bg-card px-5 py-5",
        className,
      )}
      {...props}
    />
  );
}

function ItemHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-header"
      className={cn("flex flex-col gap-1 md:flex-row md:items-start md:justify-between", className)}
      {...props}
    />
  );
}

function ItemTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="item-title"
      className={cn("text-lg font-semibold tracking-tight", className)}
      {...props}
    />
  );
}

function ItemDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="item-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

function ItemContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="item-content" className={cn("mt-4", className)} {...props} />;
}

export { Item, ItemHeader, ItemTitle, ItemDescription, ItemContent };
