"use client";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

// Create a stable QueryClient instance
let browserQueryClient: QueryClient | undefined = undefined;

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Increase stale time significantly
        staleTime: 5 * 60 * 1000, // 5 minutes
        // Increase garbage collection time
        gcTime: 30 * 60 * 1000, // 30 minutes (previously cacheTime)
        // Don't refetch on window focus
        refetchOnWindowFocus: false,
        // Don't refetch on reconnect unless data is stale
        refetchOnReconnect: 'always',
        // Retry failed requests
        retry: 2,
        // Keep data fresh longer
        refetchInterval: false,
      },
    },
  });
}

function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // NOTE: Avoid useState when initializing the query client if you don't
  // have a suspense boundary between this and the code that may
  // suspend because React will throw away the client on the initial
  // render if it suspends and there is no boundary
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
