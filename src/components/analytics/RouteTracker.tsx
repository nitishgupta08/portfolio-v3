'use client';

import { useRouteTracking } from '@/hooks/useAnalytics';

export default function RouteTracker() {
  useRouteTracking();
  return null;
}
