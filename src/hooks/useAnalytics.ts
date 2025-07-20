'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackPageView } from '@/lib/analytics';

export function useRouteTracking() {
  const pathname = usePathname();

  useEffect(() => {
    // Track page view on route change
    trackPageView(pathname, document.title);
  }, [pathname]);
}

export function useTimeTracking(sectionName: string) {
  useEffect(() => {
    const startTime = Date.now();

    return () => {
      const timeSpent = Date.now() - startTime;
      if (timeSpent > 3000) { // Only track if spent more than 3 seconds
        import('@/lib/analytics').then(({ portfolioTracking }) => {
          portfolioTracking.trackSectionTime(sectionName, timeSpent);
        });
      }
    };
  }, [sectionName]);
}
