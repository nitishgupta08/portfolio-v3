declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Initialize Google Analytics
export const initGA = () => {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };

  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, {
    page_title: document.title,
    page_location: window.location.href,
  });
};

// Track page views
export const trackPageView = (url: string, title: string) => {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined") return;

  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
    page_title: title,
  });
};

// Track custom events
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number,
  customParameters?: Record<string, any>
) => {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined") return;

  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
    ...customParameters,
  });
};

// Portfolio-specific tracking functions
export const portfolioTracking = {
  // Track blog post views
  trackBlogView: (slug: string, title: string, readTime?: number) => {
    trackEvent("blog_view", "engagement", slug, readTime, {
      blog_title: title,
      content_type: "blog_post",
    });
  },

  // Track project interactions
  trackProjectView: (
    projectName: string,
    projectType: "featured" | "archive"
  ) => {
    trackEvent("project_view", "portfolio", projectName, undefined, {
      project_type: projectType,
    });
  },

  // Track external links
  trackExternalLink: (
    url: string,
    linkType: "github" | "live_demo" | "social" | "other"
  ) => {
    trackEvent("external_link_click", "navigation", url, undefined, {
      link_type: linkType,
      destination: new URL(url).hostname,
    });
  },

  // Track resume downloads
  trackResumeDownload: () => {
    trackEvent("resume_download", "engagement", "resume_pdf");
  },

  // Track contact form interactions
  trackContactInteraction: (
    action: "form_start" | "form_submit" | "email_click"
  ) => {
    trackEvent("contact_interaction", "engagement", action);
  },

  // Track skill/experience interactions
  trackExperienceView: (company: string, position: string) => {
    trackEvent(
      "experience_view",
      "portfolio",
      `${company}_${position}`,
      undefined,
      {
        company: company,
        position: position,
      }
    );
  },

  // Track gallery interactions
  trackGalleryInteraction: (
    action: "photo_view" | "photo_like" | "photo_navigation",
    photoId?: string
  ) => {
    trackEvent("gallery_interaction", "engagement", action, undefined, {
      photo_id: photoId,
    });
  },

  // Track search and filtering
  trackSearch: (query: string, section: "blog" | "projects" | "global") => {
    trackEvent("search", "engagement", query, undefined, {
      search_section: section,
    });
  },

  // Track theme changes
  trackThemeChange: (theme: "light" | "dark") => {
    trackEvent("theme_change", "user_preference", theme);
  },

  // Track time spent on sections
  trackSectionTime: (section: string, timeSpent: number) => {
    trackEvent(
      "section_time",
      "engagement",
      section,
      Math.round(timeSpent / 1000),
      {
        time_seconds: Math.round(timeSpent / 1000),
      }
    );
  },
};
