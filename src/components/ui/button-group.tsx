import * as React from "react";

import { cn } from "@/lib/utils";

function ButtonGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="button-group"
      className={cn("flex flex-col gap-3 sm:flex-row sm:items-center", className)}
      {...props}
    />
  );
}

export { ButtonGroup };
