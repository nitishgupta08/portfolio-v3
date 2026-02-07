export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

import { type UseQueryResult } from "@tanstack/react-query";

type QueryError = UseQueryResult["error"];

export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number,
  customParameters?: Record<string, string | number | boolean | undefined>,
) => {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined") return;

  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
    ...customParameters,
  });
};

export const ga_tracker = {
  trackPageView: (url: string, title: string) => {
    if (!GA_MEASUREMENT_ID || typeof window === "undefined") return;

    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: url,
      page_title: title,
    });
  },

  trackExternalLink: (
    url: string,
    linkType: "github" | "live_demo" | "social" | "other",
  ) => {
    if (!url || typeof url !== "string") return;

    let destination: string;
    try {
      destination = new URL(url).hostname;
    } catch {
      return;
    }

    trackEvent("external_link_click", "navigation", url, undefined, {
      link_type: linkType,
      destination,
    });
  },

  trackError: (error: QueryError, context: string) => {
    if (!GA_MEASUREMENT_ID || typeof window === "undefined") return;

    window.gtag("event", "exception", {
      description: `${context}: ${error?.message || "Unknown error"}`,
      fatal: false,
      custom_map: {
        custom_parameter_1: context,
        custom_parameter_2: error?.name || "Error",
        custom_parameter_3: error?.stack?.substring(0, 100) || "No stack trace",
      },
    });
  },
};
