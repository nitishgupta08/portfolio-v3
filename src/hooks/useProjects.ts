import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { ProjectService } from '@/lib/firebase/services/projectService';
import type { Project } from '@/types/Project';

const FEATURED_QUERY_KEY = ['projects', 'featured'] as const;
const ALL_QUERY_KEY = ['projects', 'all'] as const;

export function useFeaturedProjects() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: FEATURED_QUERY_KEY,
    queryFn: ProjectService.getFeaturedProjects,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 2,
  });

  useEffect(() => {
    const unsubscribe = ProjectService.setupRealTimeListener(() => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    });

    return unsubscribe;
  }, [queryClient]);

  return query;
}

export function useAllProjects() {
  return useQuery({
    queryKey: ALL_QUERY_KEY,
    queryFn: ProjectService.getAllProjects,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 2,
  });
}
