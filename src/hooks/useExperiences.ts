import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { ExperienceService } from '@/lib/firebase/services/experienceService';

const QUERY_KEY = ['experiences'] as const;

export function useExperiences() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: QUERY_KEY,
    queryFn: ExperienceService.getAllExperiences,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 2,
  });

  // Setup real-time listener for automatic cache invalidation
  useEffect(() => {
    const unsubscribe = ExperienceService.setupRealTimeListener(() => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    });

    return unsubscribe;
  }, [queryClient]);

  return query;
}
