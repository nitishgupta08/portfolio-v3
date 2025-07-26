import { useQuery } from "@tanstack/react-query";
import { ExperienceService } from "@/lib/firebase/services/experienceService";

const QUERY_KEY = ["experiences"] as const;

export function useExperiences() {
  const query = useQuery({
    queryKey: QUERY_KEY,
    queryFn: ExperienceService.getAllExperiences,
    staleTime: 24 * 60 * 60 * 1000, // 24 hours

    // refetchOnMount: false,
    // refetchOnWindowFocus: false,
    // refetchOnReconnect: true,
  });

  return query;
}
