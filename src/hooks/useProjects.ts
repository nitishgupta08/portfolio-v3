import { useQuery } from "@tanstack/react-query";
import { ProjectService } from "@/lib/firebase/services/projectService";

const FEATURED_QUERY_KEY = ["projects"] as const;

export function useProjects() {
  const query = useQuery({
    queryKey: FEATURED_QUERY_KEY,
    queryFn: ProjectService.getAllProjects,
    staleTime: 24 * 60 * 60 * 1000, // 24 hours

    // gcTime: 60 * 60 * 1000,
    // retry: 2,
    // refetchOnMount: false,
    // refetchOnWindowFocus: false,
    // refetchOnReconnect: true,
  });

  return query;
}
