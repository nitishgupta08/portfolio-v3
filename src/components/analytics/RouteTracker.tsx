"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ga_tracker } from "@/lib/analytics";

export default function RouteTracker() {
  const pathname = usePathname();

  useEffect(() => {
    ga_tracker.trackPageView(pathname, document.title);
  }, [pathname]);

  return null;
}
