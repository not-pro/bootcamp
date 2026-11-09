import { useLazyQuery } from "useQuery";
import type { SearchResult, UseSearchReturn } from "../types";

export function useSearch(query: string): UseSearchReturn {
  const [execute, result, cancel] = useLazyQuery<SearchResult[]>({
    endpoint: `/search/shows?q=${encodeURIComponent(query)}`,
    queryKey: `search-${query}`,
  });

  return { execute, result, cancel };
}
